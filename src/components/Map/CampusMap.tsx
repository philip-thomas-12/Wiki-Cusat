import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';
import { Users, Briefcase } from 'lucide-react';
import './CampusMap.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Premium Map Marker (Invisible actual marker, we rely on the popup or custom divIcon)
const createCustomIcon = (color: string) => {
    return L.divIcon({
        className: 'custom-leaflet-marker',
        html: `<div class="marker-pin" style="background-color: ${color}; box-shadow: 0 0 15px ${color}"></div>`,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
    });
};

import { institutions } from '../../data/institutions';

/* --- MOCK DATA --- */
const CUSAT_BOUNDS: L.LatLngBoundsExpression = [
    [10.025, 76.310], // Southwest coordinate
    [10.055, 76.340]  // Northeast coordinate
];

const CUSAT_CENTER: L.LatLngExpression = [10.041, 76.326];

// Helper to enforce bounds
const MapBoundsEnforcer = () => {
    const map = useMap();
    useEffect(() => {
        map.setMaxBounds(CUSAT_BOUNDS);
    }, [map]);
    return null;
};

export const CampusMap: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="campus-map-wrapper">
            <MapContainer
                center={CUSAT_CENTER}
                zoom={16}
                minZoom={15}
                maxZoom={18}
                scrollWheelZoom={true}
                attributionControl={false}
                className="leaflet-container-custom glass-panel"
                style={{ height: '100%', width: '100%', borderRadius: 'inherit' }}
            >
                <MapBoundsEnforcer />

                {/* Satellite Map Tiles (Esri World Imagery) */}
                <TileLayer
                    attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                />

                {institutions.map((inst) => (
                    <Marker
                        key={inst.id}
                        position={inst.position}
                        icon={createCustomIcon(inst.color)}
                        eventHandlers={{
                            mouseover: (e) => {
                                e.target.openPopup();
                            },
                        }}
                    >
                        <Popup
                            className="premium-popup"
                            closeButton={false}
                            autoPanPadding={[50, 50]}
                        >
                            <div
                                className="popup-content-card"
                                onClick={() => navigate(`/institution/${inst.id}`)}
                            >
                                <div className="popup-category" style={{ color: inst.color }}>
                                    {inst.category}
                                </div>
                                <h3 className="popup-title">{inst.name}</h3>
                                <p className="popup-desc">{inst.description}</p>

                                <div className="popup-stats">
                                    <div className="stat-item">
                                        <Users size={14} />
                                        <span>{inst.facultyCount}</span>
                                    </div>
                                    {inst.placementRate !== 'N/A' && (
                                        <div className="stat-item">
                                            <Briefcase size={14} />
                                            <span>{inst.placementRate}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="popup-action">
                                    Click to view details &rarr;
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};
