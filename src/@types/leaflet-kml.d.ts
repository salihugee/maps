// src/types/leaflet-plugins.d.ts
import * as L from "leaflet";

declare module "leaflet" {
    class KML extends L.FeatureGroup {
        constructor(kml: Document, options?: L.PathOptions);
    }

    namespace KML { }
}
