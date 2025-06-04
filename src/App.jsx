import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PhylogeneticTree, PhylogeneticTreeUI } from './components/PhylogeneticTree';
import { ForceGraphTree3DView } from './components/ForceGraphTree3D';
import './App.css';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const [view, setView] = useState('tree'); // 'tree' ou 'explorer'

  const handleNodeHover = (node) => {
    setSelectedNode(node);
  };

  const handleNodeUnhover = () => {
    setSelectedNode(null);
  };

  const handleExplore = () => {
    setView('explorer');
  };

  const handleBack = () => {
    setView('tree');
  };

  if (view === 'explorer') {
    return <ForceGraphTree3DView onBack={handleBack} />;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 8, 0], fov: 35 }}
        style={{ background: '#0a0a2e' }}
      >
        <PhylogeneticTree
          onNodeHover={handleNodeHover}
          onNodeUnhover={handleNodeUnhover}
        />
      </Canvas>

      <PhylogeneticTreeUI
        selectedNode={selectedNode}
        onExplore={handleExplore}
      />
    </div>
  );
}

export default App;
