import React, { useEffect, useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { CustomizedButtons } from '../../components';
import { format } from 'date-fns'
import Plot from 'react-plotly.js';
import { data } from '../../helpers/messurements';
import { Box } from '@mui/material';
import MapPage from './map';
import hent from '../../services/location';

export default function ControlPage({ user }) {
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
    const datoFormat = (dato) => format(new Date(dato), 'dd/MM/yyyy HH:mm');
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    useEffect(() => {
        //Henter data fra json fil
        /*const fetchData = () => {
            const result = data.filter(d => {
                //console.log(d)
                return d.id === id
            })
            return result
        }*/
        //Henter data fra api
        hent(setLocations, setError, `/Location/${id}`).then((d) => {
            //console.log(d.geoLocations[0])
            //console.log(locations)
            setUserLocations(d.geoLocations[0])
        })
        hent(setData, setError, `/Location/GeoLocation/MeasurementSet/${id}?GeoLocationID=${2}&LocationID=${2}`).then((d) => {
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
    const handleMap = (p) => {
        console.log(p)
        setLocations({ lng: p?.longitude, lat: p?.latitude })
        setShowMap(true)
    }

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
    const visDato = <Box sx={{ color: 'blue' }}>start: {startDate} slut: {endDate} </Box>

    //viser geolokation på valgte måling og sætter dem til kort

    const position = <Box sx={{ color: 'blue' }} >
        latitude: {userlocations?.latitude} longtitude: {userlocations?.longitude}
        <CustomizedButtons onClick={() => handleMap(userlocations)}>Show on map</CustomizedButtons>
    </Box>

    //console.log(x);*/
    if (dataInfo) {
        nydata()
    }

    return (
        <Box sx={centrer}>
            {position}
            <Box>2023</Box>
            {visDato}
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
            {
                showMap ? <MapPage geoLocations={locations} /> : <Box></Box>
            }
        </Box>
    );
}