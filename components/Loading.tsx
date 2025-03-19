import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-background">
     <Image 
     src={'/sprinting.gif'}
     width={120}
     height={120}
     alt="loading"
     />
    </div>
  );
};

export default Loading; 