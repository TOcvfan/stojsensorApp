"use client"
import React, { useEffect, useState } from 'react';
import { CustomizedButtons, Title } from '$/Components';
import { Box } from '@/lib/mui';
import { useAppContext } from '$/AppContext';
import { GoogleMap, MarkerF, useLoadScript, LoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/navigation';
import withAuth from '$/withAuth';
import { format } from 'date-fns'
import Plot from 'react-plotly.js';
import hent from '@/api/location';
import billede from '@/media/dBSendor_front_bg.jpg';
import MapPage from '../Components/map';
import Image from 'next/image';

const Frontpage = () => {
    const { user } = useAppContext();
    const [showMap, setShowMap] = useState(false);
    const [titleString, setTitleString] = useState('');
    const [error, setError] = useState(false)
    const [locations, setLocations] = useState({ lat: 18.52043, lng: 73.856743 })
    const [allLocations, setAllLocations] = useState([])
    const [userLocations, setUserLocations] = useState({})
    const [geoLocations, setGeoLocations] = useState()
    const [showGeoLocations, setShowGeoLocations] = useState(false)
    const [measurementSets, setMeasurementSets] = useState([])
    const [showMeasurementSets, setShowMeasurementSets] = useState(false)
    const [measurements, setMeasurements] = useState([])
    const [showMeasurements, setShowMeasurements] = useState(false)
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const datoFormat = (dato) => format(new Date(dato), 'dd/MM/yyyy HH:mm');
    let x = [];
    let y = [];
    //
    useEffect(() => {
        //Henter data fra apihvis bruger er admin
        if (user.isAdmin) {
            hent(setAllLocations, setError, `/`).then((d) => {
                console.log(d)
                //console.log(locations)
                //setUserLocations(d.geoLocations[0])
            })
        }
        hent(setUserLocations, setError, `/${user.locationId}`).then((d) => {
            console.log(d)
        })

    }, []);
    const handleMap = (lng, lat) => {
        //console.log(p)
        setLocations({ lng, lat })
        setShowMap(true)
    }

    //til at navigere på siden
    const router = useRouter();
    //css til forsiden
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY
    });

    if (loadError) {
        return <div>Error loading maps</div>;
    }

    if (!isLoaded) {
        return <div>Loading maps</div>;
    }


    const getMapCord = (id) => {
        hent(setGeoLocations, setError, `/${id}`).then((d) => {
            console.log(d)
            setShowGeoLocations(true)
        })
    }
    const showMesurementSet = (Geoid, locationId) => {
        hent(setMeasurementSets, setError, `/GeoLocation/MeasurementSet?GeoLocationID=${Geoid}&LocationID=${locationId}`).then((d) => {
            console.log(d)
            setShowMeasurementSets(true)
        })
    }

    const showMesurementplot = (Geoid, locationId, setId) => {
        hent(setMeasurements, setError, `/GeoLocation/MeasurementSet/${setId}?GeoLocationID=${Geoid}&LocationID=${locationId}`).then((d) => {
            console.log(d, 'plot')
            setShowMeasurements(true)
            //setStartDate(datoFormat(measurements.startDate))
            //setEndDate(datoFormat(measurements.endDate))
            if (showMap) { setShowMap(false) }
            const sorted = measurements.measurements?.sort((p1, p2) => (p1.arduinoID > p2.arduinoID) ? 1 : (p1.arduinoID < p2.arduinoID) ? -1 : 0)
            console.log(sorted, 'test')
            if (sorted.length > 1) {
                setTitleString(`start: ${measurements.startDate} slut: ${measurements.endDate}`)
                sorted?.map((m) => {
                    y.push(m.decibel)
                    x.push(m.dateTime)
                    return { x, y }
                })
            } else {
                setTitleString('no mesurrements')
            }
            console.log(x, 'ost')
        })
    }
    //console.log(user)

    const visDato = (startDate, endDate) => <Box sx={{ color: 'blue' }}>start: {startDate} slut: {endDate} </Box>

    const position = (geo, locationId) => <Box sx={{ color: 'blue' }} >
        latitude: {geo.latitude} longtitude: {geo.longitude}
        <CustomizedButtons onClick={() => handleMap(geo.longitude, geo.latitude)}>Show on map</CustomizedButtons>
        <CustomizedButtons onClick={() => showMesurementSet(geo.id, locationId)}>Sets</CustomizedButtons>
        <Box>
            {showMeasurementSets && <Box>
                {
                    measurementSets.map((sets) => {
                        return (
                            <Box key={sets.id}>
                                {visDato(datoFormat(sets.startDate), datoFormat(sets.endDate))}
                                <CustomizedButtons onClick={() => showMesurementplot(geo.id, locationId, sets.id)}>Show on graf</CustomizedButtons>
                            </Box>
                        )
                    })
                }
            </Box>}
        </Box>
    </Box>
    //tjekker om brugeren er admin og viser en knap hvis man er admin
    const admin = () => {
        if (user.isAdmin) {
            return (
                <Box>
                    <Box>
                        {allLocations?.map(all => {
                            return (
                                <Box key={all.id}>
                                    <Box>{all.name}</Box>
                                    <CustomizedButtons onClick={() => getMapCord(all.id)}>Show geo locations</CustomizedButtons>
                                </Box>
                            )
                        })}
                    </Box>
                    <CustomizedButtons onClick={() => router.push('./createuser')}>new user</CustomizedButtons>
                </Box>
            )
        }
    }

    return (
        <Box sx={{
            centrer
        }}>
            <Title color='blue'>Welcome to your frontpage {user.firstname}</Title>
            <br />
            <Box>Your Geolocations</Box><br />
            {userLocations.name}
            {userLocations.geoLocations?.map((geo) => {
                return (
                    <Box key={geo.id}>{position(geo, userLocations.id)}</Box>
                )
            })}
            {admin()}
            {showGeoLocations && <Box><Box>{geoLocations.name}</Box>{geoLocations.geoLocations?.map((geo) => {
                return (
                    <Box key={geo.id}>{position(geo, geoLocations.id)}</Box>
                )
            })}</Box>}
            <Image src={billede} alt='test' height={50} />
            {
                showMap ? <MapPage geoLocations={locations} /> : <Box></Box>
            }
            {
                showMeasurements ? <Plot
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
                /> : <Box></Box>
            }
        </Box>

    );
}
//tjekker om brugeren er logget ind
export default withAuth(Frontpage);