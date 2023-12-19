"use client"
import React, { useEffect, useState } from 'react';
import { CustomizedButtons } from '$/Components';
import { useAppContext } from '$/AppContext';
import Plot from 'react-plotly.js';
import { Box } from '@/lib/mui';
import hent from '@/api';

export default function ControlPage() {
    const { user } = useAppContext();

    //const [data, setData] = useState([]);
    const [titleString, setTitleString] = useState('');
    const [dataInfo, setData] = useState({})
    const [locations, setLocations] = useState({});
    const [userlocations, setUserLocations] = useState({});
    const [showMap, setShowMap] = useState(false);
    const [error, setError] = useState({});
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const id = user.id;
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    return (
        <Box sx={centrer}>

            <Box>2023</Box>
            <Plot
                data={[
                    {
                        x,
                        y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ width: 1200, height: 500, title: titleString }}
            />

        </Box>
    );
}