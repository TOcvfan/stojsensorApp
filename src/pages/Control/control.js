import React, { useEffect, useState } from 'react';
//import { useNavigate } from "react-router-dom";
//import { Text, CustomizedButtons, Title, DatoValger } from '../../components';
import { format } from 'date-fns'
import Plot from 'react-plotly.js';
import { data } from '../../helpers/messurements';
import { Box } from '@mui/material';
//import hent from '../../services/location';

export default function ControlPage({ user }) {
    //const [data, setData] = useState([]);
    const [titleString, setTitleString] = useState('');
    const [dataInfo, setData] = useState([])
    /*const [error, setError] = useState({});
    const [startDate, setStartDate] = useState();
    const [userlocations, setUserLocations] = useState({});
    const [endDate, setEndDate] = useState();*/
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
        const fetchData = () => {
            const result = data.filter(d => {
                console.log(d)
                return d.id === id
            })
            return result
        }
        //Henter data fra api
        /*hent(setData, setError, '/Location/GeoLocation/1?LocationID=3').then((d) => {
            console.log(d)
        })*/
        const result = fetchData()
        //lægger data i en useState
        setData(result)
        //console.log(result)
    }, [id]);

    useEffect(() => {
        //setData(dataInfo) 'test'
        //sætter titel til plotly
        const title = () => dataInfo?.map(g => {
            return g.geoLocations.map(p => {
                const dato = p.mesurrementSets[0]
                //console.log(dato.startDate)
                //setStartDate(dato.startDate)
                //setEndDate(dato.endDate)
                setTitleString(`start: ${datoFormat(dato.startDate)} slut: ${datoFormat(dato.endDate)}`)
                return dato
            })
        })
        title()
        //setTitleString(`start: ${datoFormat(startDate)} slut: ${datoFormat(endDate)}`)
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
            dataInfo?.map(g => {
                return g.geoLocations.map(p => {
                    const sort = p.mesurrementSets[0].messurements.sort((p1, p2) => (p1.dateTime > p2.dateTime) ? 1 : (p1.dateTime < p2.dateTime) ? -1 : 0)
                    return sort.map((DB) => {
                        y.push(DB.decibel)
                        x.push(DB.dateTime)
                        return { x, y }
                    })
                })
            })
        }
    }
    //viser start og slut dato på valgte målinger
    const visDato = () => {
        if (dataInfo) {
            return dataInfo?.map(g => {
                return g.geoLocations.map(p => {
                    const dato = p.mesurrementSets[0]
                    return (
                        <Box sx={{ color: 'blue' }} key={dato.id}>start: {datoFormat(dato.startDate)} slut: {datoFormat(dato.endDate)} </Box>
                    )
                })
            })
        }
    }
    //viser geolokation på valgte måling
    const position = () => {
        if (dataInfo) {
            return dataInfo?.map(g => {
                return g.geoLocations.map(p => {
                    console.log(p)
                    return (
                        <Box sx={{ color: 'blue' }} key={p.id}>latitude: {p.latitude} longtitude: {p.longtitude} </Box>
                    )
                })
            })
        }
    }

    //console.log(x);*/
    if (dataInfo) {
        nydata()
    }

    return (
        <Box sx={centrer}>
            {position()}
            <Box>2023</Box>
            {visDato()}
            <Plot
                data={[
                    {
                        x,
                        y,
                        type: 'scatter',
                        mode: 'lines+markers',
                        marker: { color: 'red' },
                    },
                    //{ type: 'bar', x: [1, 2, 3], y: [2, 5, 3] },
                ]}
                layout={{ width: 1200, height: 500, title: titleString }}
            />
        </Box>
    );
}