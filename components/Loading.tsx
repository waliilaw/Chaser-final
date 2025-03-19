import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      <p className="mt-4 text-lg text-muted-foreground">Loading...</p>
    </div>
  );
};

export default Loading; 