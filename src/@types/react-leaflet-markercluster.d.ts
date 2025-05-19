declare module 'react-leaflet-markercluster' {
  import { FC } from 'react';
  import * as L from 'leaflet';
  
  interface MarkerClusterGroupProps {
    children?: React.ReactNode;
    showCoverageOnHover?: boolean;
    iconCreateFunction?: (cluster: L.MarkerCluster) => L.DivIcon;
    chunkedLoading?: boolean;
    removeOutsideVisibleBounds?: boolean;
    animate?: boolean;
    maxClusterRadius?: number;
    disableClusteringAtZoom?: number;
  }

  const MarkerClusterGroup: FC<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}