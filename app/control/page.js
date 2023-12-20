"use client"
import React, { useEffect, useState } from 'react';
import { CustomizedButtons } from '$/Components';
import { useAppContext } from '$/AppContext';
import Plot from 'react-plotly.js';
import { Box } from '@/lib/mui';
import hent from '@/api/location';
import PostMessurementSet from './messurementsetform';

export default function ControlPage() {
    const { user, locations } = useAppContext();
    const [userLocations, setUserLocations] = useState({})
    const [showForm, setShowForm] = useState(false)
    const [error, setError] = useState({})

    const data = {
        locationId: 2,
        Geoid: 2
    }
    console.log(locations, 'alle')
    const id = user.id;
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        mt: 2
    }

    const createSet = (geoid, locationId) => {
        console.log(geoid)
        return (
            <PostMessurementSet setResponse={setUserLocations} geoId={geoid} locationId={locationId} />
        )
    }

    const messurementSets = (geo, locationId) => {
        return (
            <Box sx={{ color: 'blue' }} >
                latitude: {geo.latitude} longtitude: {geo.longitude}
                <CustomizedButtons onClick={() => setShowForm(true)}>Create set on this location</CustomizedButtons>
                {showForm && createSet(geo.id, locationId)}
            </Box>
        )
    }

    return (
        <Box>
            <Box>Your Geolocations</Box><br />
            {locations.name}
            {locations.geoLocations?.map((geo) => {
                return (
                    <Box key={geo.id}>{messurementSets(geo, locations.id)}</Box>
                )
            })}
        </Box>
    );
}