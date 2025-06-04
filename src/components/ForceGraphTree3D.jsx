import React, { useMemo, useCallback, useState } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { taxonomyData, phylogeneticRelations } from '../data/taxonomyData';

export function ForceGraphTree3DView({ onBack }) {
  // États pour les filtres
  const [selectedGroups, setSelectedGroups] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoot, setSelectedRoot] = useState("LUCA");
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [showGraph, setShowGraph] = useState(false);

  // États pour les filtres en cours d'édition
  const [editingSelectedGroups, setEditingSelectedGroups] = useState(new Set());
  const [editingSearchTerm, setEditingSearchTerm] = useState("");
  const [editingSelectedRoot, setEditingSelectedRoot] = useState("LUCA");

  // Fonction pour obtenir la couleur d'un taxon
  const getTaxonColor = useCallback((name) => {
    const group = taxonomyData[name]?.group || "LUCA";
    const colors = {
      "LUCA": "#6495ED",
      "Bacteria": "#FF6B6B",
      "Archaea": "#4ECDC4",
      "Eukaryota": "#45B7D1"
    };
    return colors[group] || "#6495ED";
  }, []);

  // Fonction pour obtenir les groupes hiérarchiques
  const getHierarchicalGroups = useCallback((selectedGroups) => {
    const hierarchicalGroups = new Set(selectedGroups);
    
    // Définir la hiérarchie des groupes
    const groupHierarchy = {
      "Eukaryota": ["Protista", "Fungi", "Plantae", "Animalia"]
    };
    
    // Si Eukaryota est sélectionné, inclure tous ses sous-groupes
    if (selectedGroups.has("Eukaryota")) {
      groupHierarchy["Eukaryota"].forEach(subGroup => {
        hierarchicalGroups.add(subGroup);
      });
    }
    
    return hierarchicalGroups;
  }, []);

  // Fonction pour obtenir tous les descendants d'un nœud
  const getAllDescendants = useCallback((nodeName) => {
    console.log('Recherche des descendants pour:', nodeName);
    const descendants = new Set();
    const queue = [nodeName];

    while (queue.length > 0) {
      const current = queue.shift();
      console.log('Traitement du nœud:', current);
      
      // Vérifier si le nœud existe dans les relations
      if (!phylogeneticRelations[current]) {
        console.log('Aucune relation trouvée pour:', current);
        continue;
      }

      const children = phylogeneticRelations[current];
      console.log('Enfants trouvés pour', current, ':', children);
      
      children.forEach(child => {
        if (!descendants.has(child)) {
          console.log('Ajout du descendant:', child);
          descendants.add(child);
          queue.push(child);
        }
      });
    }

    const allDescendants = Array.from(descendants);
    console.log('Tous les descendants trouvés:', allDescendants);
    return descendants;
  }, []);

  // Obtenir les groupes uniques
  const uniqueGroups = useMemo(() => {
    const groups = new Set();
    Object.values(taxonomyData).forEach(taxon => {
      if (taxon.group) groups.add(taxon.group);
    });
    return Array.from(groups);
  }, []);

  // Filtrer les nœuds selon les critères
  const filteredNodes = useMemo(() => {
    // Obtenir tous les descendants du nœud sélectionné
    const descendants = getAllDescendants(selectedRoot);
    descendants.add(selectedRoot);
    
    // Convertir en tableau
    let nodes = Array.from(descendants);
    console.log('Tous les nœuds trouvés:', nodes);

    // Filtre par groupe avec hiérarchie
    if (selectedGroups.size > 0) {
      const hierarchicalGroups = getHierarchicalGroups(selectedGroups);
      nodes = nodes.filter(name => {
        const taxonGroup = taxonomyData[name]?.group;
        console.log(`Vérification du groupe pour ${name}:`, taxonGroup);
        return hierarchicalGroups.has(taxonGroup);
      });
      console.log('Nœuds après filtrage par groupe:', nodes);
    }

    // Filtre par recherche
    if (searchTerm) {
      nodes = nodes.filter(name => 
        name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log('Nœuds après filtrage par recherche:', nodes);
    }

    // S'assurer que le nœud racine est toujours inclus
    if (!nodes.includes(selectedRoot)) {
      nodes.push(selectedRoot);
    }

    console.log('Nœuds finaux après tous les filtres:', nodes);
    return nodes;
  }, [selectedGroups, searchTerm, selectedRoot, getAllDescendants, getHierarchicalGroups]);

  // Appliquer les filtres
  const applyFilters = () => {
    setSelectedGroups(editingSelectedGroups);
    setSearchTerm(editingSearchTerm);
    setSelectedRoot(editingSelectedRoot);
    setShowGraph(true);
  };

  // Réinitialiser les filtres
  const resetFilters = () => {
    setEditingSelectedGroups(new Set());
    setEditingSearchTerm("");
    setEditingSelectedRoot("LUCA");
    setShowGraph(false);
  };

  const graphData = useMemo(() => {
    console.log('Début de la création du graphData');
    console.log('selectedRoot:', selectedRoot);
    
    const nodes = [];
    const links = [];

    // Créer les nœuds filtrés
    filteredNodes.forEach(name => {
      console.log(`Création du nœud: ${name}`);
      const node = {
        id: name,
        name: name,
        group: taxonomyData[name]?.group,
        color: getTaxonColor(name),
        val: 1
      };
      console.log('Nœud créé:', node);
      nodes.push(node);
    });

    console.log('Nombre total de nœuds créés:', nodes.length);
    console.log('Liste des nœuds:', nodes.map(n => n.id));

    // Créer les liens entre les nœuds filtrés
    Object.entries(phylogeneticRelations).forEach(([parent, children]) => {
      if (filteredNodes.includes(parent)) {
        children.forEach(child => {
          if (filteredNodes.includes(child)) {
            console.log(`Création du lien: ${parent} -> ${child}`);
            links.push({
              source: parent,
              target: child,
              color: getTaxonColor(parent)
            });
          }
        });
      }
    });

    console.log('Nombre total de liens créés:', links.length);
    console.log('Liste des liens:', links.map(l => `${l.source}->${l.target}`));

    const graphData = { nodes, links };
    console.log('GraphData final:', graphData);
    return graphData;
  }, [filteredNodes, getTaxonColor]);

  return (
    <div style={{ 
      width: '100vw', 
      height: '100vh',
      position: 'relative',
      backgroundColor: '#0a0a2e',
      margin: 0,
      padding: 0,
      overflow: 'hidden'
    }}>
      {/* Bouton de retour */}
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '30px',
          padding: '12px 24px',
          backgroundColor: '#4ECDC4',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px',
          zIndex: 100,
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          transition: 'all 0.2s ease',
          margin: '20px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#45B7D1'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4ECDC4'}
      >
        Retour à l'arbre
      </button>

      {/* Panneau de filtres */}
      <div style={{
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        zIndex: 1000,
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        padding: isPanelCollapsed ? '10px' : '25px',
        borderRadius: '16px',
        color: 'white',
        width: isPanelCollapsed ? '40px' : '350px',
        maxHeight: '80vh',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isPanelCollapsed ? 'center' : 'stretch',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        margin: '20px'
      }}>
        {isPanelCollapsed ? (
          <button
            onClick={() => setIsPanelCollapsed(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '24px',
              padding: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
          >
            +
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsPanelCollapsed(true)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                cursor: 'pointer',
                fontSize: '20px',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
            >
              ×
            </button>

            <h3 style={{ 
              margin: '0 0 20px 0',
              color: '#4ECDC4',
              fontSize: '1.5em',
              fontWeight: '500'
            }}>Filtres</h3>

            {/* Filtre par groupe */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ 
                margin: '0 0 12px 0',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1em'
              }}>Groupes</h4>
              <div style={{ 
                maxHeight: '150px', 
                overflowY: 'auto',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)',
              }}>
                <style>
                  {`
                    .groups-container::-webkit-scrollbar {
                      width: 8px;
                    }
                    .groups-container::-webkit-scrollbar-track {
                      background: rgba(255, 255, 255, 0.1);
                      border-radius: 4px;
                    }
                    .groups-container::-webkit-scrollbar-thumb {
                      background: rgba(255, 255, 255, 0.3);
                      border-radius: 4px;
                    }
                    .groups-container::-webkit-scrollbar-thumb:hover {
                      background: rgba(255, 255, 255, 0.4);
                    }
                  `}
                </style>
                <div className="groups-container" style={{ 
                  maxHeight: '150px', 
                  overflowY: 'auto',
                  paddingRight: '8px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px'
                }}>
                  {uniqueGroups.map(group => (
                    <div key={group} style={{ 
                      marginBottom: '0',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      <label style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '0.95em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        <input
                          type="checkbox"
                          checked={editingSelectedGroups.has(group)}
                          onChange={(e) => {
                            const newGroups = new Set(editingSelectedGroups);
                            if (e.target.checked) {
                              newGroups.add(group);
                            } else {
                              newGroups.delete(group);
                            }
                            setEditingSelectedGroups(newGroups);
                          }}
                          style={{
                            width: '14px',
                            height: '14px',
                            cursor: 'pointer',
                            margin: '0'
                          }}
                        />
                        <span style={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {group}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Filtre par recherche */}
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{ 
                margin: '0 0 12px 0',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '1.1em'
              }}>Recherche</h4>
              <input
                type="text"
                placeholder="Rechercher un taxon..."
                value={editingSearchTerm}
                onChange={(e) => setEditingSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  backdropFilter: 'blur(5px)',
                  WebkitBackdropFilter: 'blur(5px)'
                }}
              />
            </div>

            {/* Boutons d'action */}
            <div style={{ 
              display: 'flex', 
              gap: '12px', 
              marginTop: '20px',
              justifyContent: 'space-between'
            }}>
              <button
                onClick={resetFilters}
                style={{
                  padding: '12px 20px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'}
              >
                Réinitialiser
              </button>
              <button
                onClick={applyFilters}
                style={{
                  padding: '12px 20px',
                  background: '#4ECDC4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  flex: 1,
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#45B7D1'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4ECDC4'}
              >
                Générer le graphe
              </button>
            </div>

            {/* Statistiques */}
            {showGraph && (
              <div style={{ 
                marginTop: '25px', 
                fontSize: '0.9em',
                padding: '15px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{ margin: '5px 0', color: 'rgba(255, 255, 255, 0.9)' }}>Nœuds affichés : {graphData.nodes.length}</p>
                <p style={{ margin: '5px 0', color: 'rgba(255, 255, 255, 0.9)' }}>Liens affichés : {graphData.links.length}</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Graphique */}
      {showGraph && (
        <div style={{ width: '100%', height: '100%' }}>
          <ForceGraph3D
            graphData={graphData}
            nodeLabel="name"
            nodeColor="color"
            nodeRelSize={8}
            linkColor={link => link.color}
            linkWidth={2}
            linkDirectionalParticles={2}
            linkDirectionalParticleSpeed={0.005}
            backgroundColor="#0a0a2e"
            onNodeClick={(node) => {
              console.log('Node clicked:', node);
            }}
            d3AlphaDecay={0.01}
            d3VelocityDecay={0.3}
            cameraPosition={{ x: 0, y: 0, z: 300 }}
            cooldownTicks={100}
            onEngineStop={() => {
              console.log('Engine stopped');
            }}
            warmupTicks={100}
            minZoom={0.1}
            maxZoom={4}
            onRenderFramePre={() => {
              console.log('Frame rendered');
            }}
          />
        </div>
      )}
    </div>
  );
} 