import React, { useMemo } from 'react';
import { Box } from '@mui/material';
import { GoogleMap, MarkerF, useLoadScript, LoadScript } from "@react-google-maps/api";
//import hent from '../../services/location';

export default function MapPage({ geoLocations }) {
    //console.log(process.env.REACT_APP_GOOGLE_API_KEY)
    /*const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY || ""
    });
    const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);*/


    const mapStyles = {
        height: '50vh',
        width: '100%',
    };

    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        heigth: '100vh',
        width: '100vw',
        flexDirection: 'column',
        mt: 2
    }

    return (
        <Box sx={centrer}>
            <GoogleMap
                mapContainerStyle={mapStyles}
                zoom={12}
                center={geoLocations}
            >
                <MarkerF position={geoLocations} />
            </GoogleMap>
        </Box>
    );
}