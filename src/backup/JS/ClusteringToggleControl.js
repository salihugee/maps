import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
const ClusteringToggleControl = ({ isClusteringEnabled, setIsClusteringEnabled, }) => {
    const map = useMap();
    useEffect(() => {
        const controlDiv = L.DomUtil.create("div", "leaflet-control leaflet-bar");
        controlDiv.style.background = "white";
        controlDiv.style.padding = "10px";
        controlDiv.style.borderRadius = "8px";
        controlDiv.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.3)";
        controlDiv.style.fontFamily = "Arial, sans-serif";
        controlDiv.style.fontSize = "14px";
        controlDiv.style.color = "#333";
        const label = L.DomUtil.create("label", "", controlDiv);
        label.style.display = "flex";
        label.style.alignItems = "center";
        label.style.gap = "8px";
        const checkbox = L.DomUtil.create("input", "", label);
        checkbox.type = "checkbox";
        checkbox.checked = isClusteringEnabled;
        checkbox.style.width = "16px";
        checkbox.style.height = "16px";
        checkbox.style.cursor = "pointer";
        checkbox.onchange = () => setIsClusteringEnabled(checkbox.checked);
        const text = L.DomUtil.create("span", "", label);
        text.innerText = "Enable Clustering";
        text.style.color = "#333";
        text.style.cursor = "pointer";
        const customControl = L.control({ position: "topright" });
        customControl.onAdd = () => controlDiv;
        customControl.addTo(map);
        return () => {
            customControl.remove();
        };
    }, [isClusteringEnabled, setIsClusteringEnabled, map]);
    return null;
};
export default ClusteringToggleControl;
