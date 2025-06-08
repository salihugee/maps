import React from "react";
interface ClusteringToggleControlProps {
    isClusteringEnabled: boolean;
    setIsClusteringEnabled: (enabled: boolean) => void;
}
declare const ClusteringToggleControl: React.FC<ClusteringToggleControlProps>;
export default ClusteringToggleControl;
