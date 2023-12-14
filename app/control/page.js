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

    useEffect(() => {
        //Henter data fra api*/
        hent(setLocations, setError, `/${id}`).then((d) => {
            console.log(d)
            //console.log(locations)
            setUserLocations(d.geoLocations[0])
        })
        hent(setData, setError, `/GeoLocation/MeasurementSet/${id}?GeoLocationID=${2}&LocationID=${2}`).then((d) => {
            setStartDate(datoFormat(d.startDate))
            setEndDate(datoFormat(d.endDate))
        })
        //const result = fetchData()
        //lægger data i en useState
        //setData(result)
        //console.log(result)
    }, []);

    useEffect(() => {
        //sætter titel til plotly
        const title = () => {
            setTitleString(`start: ${startDate} slut: ${endDate}`)
        }
        title()
    }, [dataInfo]);
    //console.log(dataInfo)
    //Ændrer dato til plotly (virker ikke lige nu)
    /*const changeDate = (date, setDato) => {
        return (
            <DatoValger dato={date} setDato={setDato} />
        )
    }*/


    let x = [];
    let y = [];
    //lægger valgte data i array til plotly
    const nydata = () => {
        if (dataInfo) {
            const sort = dataInfo.measurements//?.sort((p1, p2) => (p1.arduinoID > p2.arduinoID) ? 1 : (p1.arduinoID < p2.arduinoID) ? -1 : 0)
            //console.log(sort?.sort((p1, p2) => (p1.arduinoID > p2.arduinoID) ? 1 : (p1.arduinoID < p2.arduinoID) ? -1 : 0))
            sort?.shift()
            sort?.map((DB) => {
                y.push(DB.decibel)
                x.push(DB.dateTime)
                return { x, y }
            })
        }
    }
    //viser start og slut dato på valgte målinger



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