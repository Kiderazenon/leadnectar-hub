
import React from 'react';
import PipelineComponent from '@/components/pipeline/Pipeline';

const Pipeline: React.FC = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto animate-fade-in">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold">Pipeline de vente</h1>
      </div>
      
      <PipelineComponent />
    </div>
  );
};

export default Pipeline;
