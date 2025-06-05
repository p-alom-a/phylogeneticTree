import React, { useMemo, useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, Center } from '@react-three/drei';
import * as THREE from 'three';
import { taxonomyGroups, taxonomyData, phylogeneticRelations } from '../data/taxonomyData';

// Fonction pour obtenir la couleur d'un taxon
function getTaxonColor(name) {
  const group = taxonomyData[name]?.group || "LUCA";
  return taxonomyGroups[group] || "#6495ED";
}

// Composant pour une branche entre deux taxons
function PhyloBranch({ start, end, color = 'white', thickness = 0.05 }) {
  const points = useMemo(() => [start, end], [start, end]);

  return (
    <line>
      <bufferGeometry attach="geometry" {...new THREE.BufferGeometry().setFromPoints(points)} />
      <lineBasicMaterial attach="material" color={color} linewidth={thickness} />
    </line>
  );
}

// Composant pour un nœud de taxon
function TaxonNode({ position, name, scale = 1, onHover, onUnhover }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    onHover && onHover({ ...taxonomyData[name], name });
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    onUnhover && onUnhover();
  };

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <sphereGeometry args={[0.15 * scale * (hovered ? 1.2 : 1), 16, 16]} />
      <meshStandardMaterial
        color={getTaxonColor(name)}
        emissive={hovered ? getTaxonColor(name) : "#000000"}
        emissiveIntensity={hovered ? 0.3 : 0}
      />
    </mesh>
  );
}

// Composant pour gérer l'animation de la caméra
function CameraAnimation({ controlsRef }) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const startTime = useRef(Date.now());
  const duration = 3000;

  useFrame(() => {
    if (!animationComplete && controlsRef.current) {
      const elapsed = Date.now() - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const startPos = new THREE.Vector3(0, 8, 0);
      const endPos = new THREE.Vector3(12, 0, 0);
      const currentPos = new THREE.Vector3().lerpVectors(startPos, endPos, easedProgress);
      
      controlsRef.current.object.position.copy(currentPos);
      
      const startRotation = new THREE.Euler(0, 0, 0);
      const endRotation = new THREE.Euler(0, -Math.PI / 2, 0);
      const currentRotation = new THREE.Euler(
        startRotation.x + (endRotation.x - startRotation.x) * easedProgress,
        startRotation.y + (endRotation.y - startRotation.y) * easedProgress,
        startRotation.z + (endRotation.z - startRotation.z) * easedProgress
      );
      
      controlsRef.current.object.rotation.copy(currentRotation);
      controlsRef.current.update();

      if (progress === 1) {
        setAnimationComplete(true);
      }
    }
  });

  return null;
}

// Fonction pour construire l'arbre phylogénétique
function buildPhylogeneticTree() {
  function applyRepulsion(nodes, repulsionStrength = 0.5, minDistance = 1.5) {
    const nodesCopy = [...nodes];
    for (let i = 0; i < nodesCopy.length; i++) {
      for (let j = i + 1; j < nodesCopy.length; j++) {
        const node1 = nodesCopy[i];
        const node2 = nodesCopy[j];
        const distance = node1.position.distanceTo(node2.position);

        if (distance < minDistance && distance > 0) {
          const repulsionVector = new THREE.Vector3()
            .subVectors(node1.position, node2.position)
            .normalize()
            .multiplyScalar((minDistance - distance) * repulsionStrength);

          node1.position.x += repulsionVector.x;
          node1.position.z += repulsionVector.z;
          node2.position.x -= repulsionVector.x;
          node2.position.z -= repulsionVector.z;
        }
      }
    }
    return nodesCopy;
  }

  function calculateNodePositions() {
    const nodePositions = {};
    const nodes = [];
    const branches = [];

    // Niveaux taxonomiques à afficher
    const mainGroups = ["LUCA", "Bacteria", "Archaea", "Eukaryota"];
    const secondLevel = {
      "Bacteria": ["Proteobacteria", "Firmicutes", "Cyanobacteria", "Actinobacteria"],
      "Archaea": ["Euryarchaeota", "Crenarchaeota", "Thaumarchaeota", "Korarchaeota"],
      "Eukaryota": ["Animals", "Plants", "Fungi", "Protists"]
    };
    const thirdLevel = {
      "Proteobacteria": ["Alpha", "Beta", "Gamma", "Delta", "Epsilon"],
      "Firmicutes": ["Bacilli", "Clostridia", "Mollicutes", "Negativicutes"],
      "Cyanobacteria": ["Oscillatoriales", "Nostocales", "Chroococcales", "Pleurocapsales"],
      "Actinobacteria": ["Actinomycetales", "Bifidobacteriales", "Corynebacteriales", "Streptomycetales"],
      "Euryarchaeota": ["Methanogens", "Halophiles", "Thermophiles", "Acidophiles"],
      "Crenarchaeota": ["Thermoproteales", "Desulfurococcales", "Sulfolobales", "Fervidicoccales"],
      "Thaumarchaeota": ["Nitrososphaerales", "Nitrosopumilales", "Nitrosocaldales", "Nitrosotaleales"],
      "Korarchaeota": ["Korarchaeales", "Geothermarchaeales", "Thermofilales", "Vulcanarchaeales"],
      "Animals": ["Vertebrates", "Invertebrates", "Cnidarians", "Sponges"],
      "Plants": ["Angiosperms", "Gymnosperms", "Ferns", "Mosses"],
      "Fungi": ["Ascomycota", "Basidiomycota", "Zygomycota", "Chytridiomycota"],
      "Protists": ["Algae", "Amoebas", "Ciliates", "Flagellates"]
    };

    // Position initiale de LUCA
    const lucaPosition = new THREE.Vector3(0, -5, 0);
    nodes.push({
      name: "LUCA",
      position: lucaPosition.clone(),
      depth: 0,
      period: taxonomyData["LUCA"]?.period || 0
    });
    nodePositions["LUCA"] = lucaPosition.clone();

    // Positionner les groupes principaux
    mainGroups.forEach((group, index) => {
      if (group === "LUCA") return;

      const angle = (index - 1) * (360 / (mainGroups.length - 1)); // Répartition sur 360°
      const rad = THREE.MathUtils.degToRad(angle);
      const radius = 2; // Distance depuis LUCA très réduite
      const verticalOffset = 1.5; // Décalage vertical très réduit

      const position = new THREE.Vector3(
        lucaPosition.x + radius * Math.cos(rad),
        lucaPosition.y + verticalOffset,
        lucaPosition.z + radius * Math.sin(rad)
      );

      nodes.push({
        name: group,
        position: position.clone(),
        depth: 1,
        period: taxonomyData[group]?.period || 0
      });
      nodePositions[group] = position.clone();

      // Créer la branche depuis LUCA
      branches.push({
        start: lucaPosition.clone(),
        end: position.clone(),
        parentSpecies: "LUCA",
        childSpecies: group,
        color: getTaxonColor("LUCA")
      });

      // Ajouter les sous-groupes de second niveau
      const subGroups = secondLevel[group] || [];
      subGroups.forEach((subGroup, subIndex) => {
        const subAngle = angle + (subIndex - (subGroups.length - 1) / 2) * (360 / subGroups.length);
        const subRad = THREE.MathUtils.degToRad(subAngle);
        const subRadius = 1; // Rayon très réduit
        const subVerticalOffset = 1; // Décalage vertical très réduit

        const subPosition = new THREE.Vector3(
          position.x + subRadius * Math.cos(subRad),
          position.y + subVerticalOffset,
          position.z + subRadius * Math.sin(subRad)
        );

        nodes.push({
          name: subGroup,
          position: subPosition.clone(),
          depth: 2,
          period: taxonomyData[subGroup]?.period || 0
        });
        nodePositions[subGroup] = subPosition.clone();

        branches.push({
          start: position.clone(),
          end: subPosition.clone(),
          parentSpecies: group,
          childSpecies: subGroup,
          color: getTaxonColor(group)
        });

        // Ajouter les sous-groupes de troisième niveau
        const thirdLevelGroups = thirdLevel[subGroup] || [];
        thirdLevelGroups.forEach((thirdGroup, thirdIndex) => {
          const thirdAngle = subAngle + (thirdIndex - (thirdLevelGroups.length - 1) / 2) * (360 / thirdLevelGroups.length);
          const thirdRad = THREE.MathUtils.degToRad(thirdAngle);
          const thirdRadius = 0.3; // Rayon encore plus réduit
          const thirdVerticalOffset = 0.5; // Décalage vertical encore plus réduit

          const thirdPosition = new THREE.Vector3(
            subPosition.x + thirdRadius * Math.cos(thirdRad),
            subPosition.y + thirdVerticalOffset,
            subPosition.z + thirdRadius * Math.sin(thirdRad)
          );

          nodes.push({
            name: thirdGroup,
            position: thirdPosition.clone(),
            depth: 3,
            period: taxonomyData[thirdGroup]?.period || 0
          });
          nodePositions[thirdGroup] = thirdPosition.clone();

          branches.push({
            start: subPosition.clone(),
            end: thirdPosition.clone(),
            parentSpecies: subGroup,
            childSpecies: thirdGroup,
            color: getTaxonColor(subGroup)
          });
        });
      });
    });

    const repulsedNodes = applyRepulsion(nodes, 0.15, 2.0);

    const nodePositionMap = {};
    repulsedNodes.forEach(node => {
      nodePositionMap[node.name] = node.position;
    });

    const updatedBranches = branches.map(branch => {
      const startPos = nodePositionMap[branch.parentSpecies];
      const endPos = nodePositionMap[branch.childSpecies];

      return {
        ...branch,
        start: startPos || branch.start,
        end: endPos || branch.end
      };
    }).filter(branch => branch.start && branch.end);

    return { branches: updatedBranches, nodes: repulsedNodes };
  }

  return calculateNodePositions();
}

// Composant principal de l'arbre phylogénétique
export function PhylogeneticTree({ onNodeHover, onNodeUnhover }) {
  const { branches, nodes } = useMemo(() => buildPhylogeneticTree(), []);
  const controlsRef = useRef();

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -5, -5]} intensity={0.6} color="#4477ff" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#ffffff" />

      <Center>
        {branches.map((branch, index) => (
          <PhyloBranch
            key={`branch-${index}`}
            start={branch.start}
            end={branch.end}
            color={branch.color}
            thickness={0.01}
          />
        ))}
        {nodes.map((node, index) => (
          <TaxonNode
            key={`node-${index}`}
            position={node.position}
            name={node.name}
            scale={Math.max(0.3, 0.4 + (8 - node.depth) * 0.03)}
            onHover={onNodeHover}
            onUnhover={onNodeUnhover}
          />
        ))}
      </Center>

      <OrbitControls
        ref={controlsRef}
        autoRotate
        autoRotateSpeed={0.2}
        enableZoom={true}
        minDistance={8}
        maxDistance={20}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        rotateSpeed={0.5}
        target={[0, 0, 0]}
        enablePan={false}
      />

      <CameraAnimation controlsRef={controlsRef} />
    </>
  );
}

// Composant pour l'interface utilisateur
export function PhylogeneticTreeUI({ selectedNode, onExplore }) {
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInstructions(true);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div style={{
        position: 'absolute',
        bottom: '60px',
        right: '60px',
        display: 'flex',
        gap: '20px'
      }}>
        <button
          onClick={onExplore}
          style={{
            padding: '12px 24px',
            backgroundColor: '#4ECDC4',
            color: 'white',
            border: 'none',
            marginRight: '50px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            zIndex: 100,
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#45B7D1'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4ECDC4'}
        >
          Faire une recherche
        </button>
      </div>

      {showInstructions && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '16px',
          color: 'white',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          zIndex: 1000,
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            margin: '0 0 15px 0',
            color: '#4ECDC4',
            fontSize: '1.2em'
          }}>Explorez l'arbre phylogénétique</h3>
          <p style={{ 
            margin: '0 0 15px 0',
            fontSize: '0.95em',
            opacity: 0.9,
            lineHeight: '1.4'
          }}>
            Utilisez votre souris pour naviguer dans l'arbre phylogénétique. 
            Survolez les nœuds pour découvrir les espèces et leurs caractéristiques.
          </p>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '15px',
            marginBottom: '20px',
            textAlign: 'left',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '15px',
            borderRadius: '12px'
          }}>
            <div>
              <p style={{ margin: '5px 0', fontSize: '0.9em' }}>🖱️ Clic gauche + déplacer : Rotation</p>
              <p style={{ margin: '5px 0', fontSize: '0.9em' }}>🖱️ Molette : Zoom</p>
            </div>
            <div>
              <p style={{ margin: '5px 0', fontSize: '0.9em' }}>🖱️ Clic droit + déplacer : Pan</p>
              <p style={{ margin: '5px 0', fontSize: '0.9em' }}>🖱️ Survol : Informations</p>
            </div>
          </div>
          <button
            onClick={() => setShowInstructions(false)}
            style={{
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '0.9em'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            Commencer l'exploration
          </button>
        </div>
      )}
      
      {selectedNode && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(10, 10, 46, 0.9)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          maxWidth: '300px',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: '#4ECDC4' }}>{selectedNode.name}</h3>
          <p style={{ margin: '5px 0' }}>Groupe: {selectedNode.group}</p>
          <p style={{ margin: '5px 0' }}>Période: {selectedNode.period}</p>
        </div>
      )}
    </>
  );
} 