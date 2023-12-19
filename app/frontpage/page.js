"use client"
import React, { useEffect, useState } from 'react';
import { CustomizedButtons, Title } from '$/Components';
import { Box } from '@/lib/mui';
import { useAppContext } from '$/AppContext';
import { GoogleMap, MarkerF, useLoadScript, LoadScript } from "@react-google-maps/api";
import { useRouter } from 'next/navigation';
import withAuth from '$/withAuth';
import { format } from 'date-fns'
import dynamic from "next/dynamic";
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false, })
import hent from '@/api/location';
import billede from '@/media/dBSendor_front_bg.jpg';
import MapPage from '../Components/map';
import Image from 'next/image';
import FrontpageAdmin from './admin';
import PostComment from './postComments';

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
    const [x, setX] = useState([])
    const [y, setY] = useState([])
    const [showMeasurements, setShowMeasurements] = useState(false)
    const [comment, setComment] = useState({})
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const datoFormat = (dato) => format(new Date(dato), 'dd/MM/yyyy HH:mm');

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
        setShowMeasurements(false)
    }

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

    const showMesurementSet = (Geoid, locationId) => {
        hent(setMeasurementSets, setError, `/GeoLocation/MeasurementSet?GeoLocationID=${Geoid}&LocationID=${locationId}`).then((d) => {
            console.log(d)
            if (d.length > 0) {
                //setMeasurementSetsData(d)
                setShowMeasurementSets(true)
                setError('')
            } else {
                setShowMeasurementSets(false)
                setError('No Data sets')
            }
        })
    }

    const showMesurementplot = async (Geoid, locationId, setId) => {
        setShowMeasurements(false)
        await hent(setMeasurements, setError, `/GeoLocation/MeasurementSet/${setId}?GeoLocationID=${Geoid}&LocationID=${locationId}`).then((d) => {
            console.log(d)
            setX(() => [])
            setY(() => [])
            setTitleString('')
            setStartDate('')
            setEndDate('')
            const sorted = d.measurements?.sort((p1, p2) => (p1.dateTime > p2.dateTime) ? 1 : (p1.dateTime < p2.dateTime) ? -1 : 0)

            if (showMap) { setShowMap(false) }
            //console.log(sorted, 'test')
            if (sorted?.length > 1) {
                setStartDate(datoFormat(d.startDate))
                setEndDate(datoFormat(d.endDate))
                setTitleString(`start: ${datoFormat(d.startDate)} slut: ${datoFormat(d.endDate)}`)
                console.log('test')
                sorted?.map((m) => {
                    setX(x => [
                        ...x,
                        m.dateTime
                    ])
                    setY(y => [
                        ...y,
                        m.decibel
                    ])
                    //return { x, y }
                })
                setShowMeasurements(true)
            } else {
                setShowMeasurements(false)
                setTitleString('no mesurrements')
            }
            hent(setComment, setError, `/GeoLocation/MeasurementSet/Comment?LocationID=${locationId}&GeoLocationID=${Geoid}&MeasurementSetID=${setId}`).then(t => {
                const data = { ...t, locationId, Geoid, setId }
                console.log(data)
                setComment(data)
            })
        })
    }
    //console.log(x, 'test2')

    const postComment = (data) => {
        return (
            <PostComment setResponse={setComment} data={data} />
        )
    }

    const visDato = (startDate, endDate) => {
        return (
            <Box sx={{ color: 'blue' }}>start: {startDate} slut: {endDate} </Box>
        )
    }

    const plotly = () => {
        return (
            <Box>
                <Plot
                    data={[
                        {
                            x: x,
                            y: y,
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: { color: 'red' },
                        },
                    ]}
                    layout={{ width: 1200, height: 500, title: titleString }}
                />
                {
                    comment.id ? <Box>
                        <Title size={10} color='white'>{comment.topic}</Title>
                        <Box>
                            <Box>{comment.lastEdited}</Box>
                            <Box>{comment.message}</Box>
                        </Box>
                    </Box> : <Box>{postComment(comment)}</Box>
                }

            </Box>
        )
    }

    const grafButton = (geoid, locationId) => {
        const sort = measurementSets?.sort((p1, p2) => (p1.startDate > p2.startDate) ? 1 : (p1.startDate < p2.startDate) ? -1 : 0)
        return sort.map((sets) => {
            const start = datoFormat(sets.startDate)
            const end = datoFormat(sets.endDate)
            return (
                <Box key={sets.id}>
                    {visDato(start, end)}
                    <CustomizedButtons type='button' onClick={() => showMesurementplot(geoid, locationId, sets.id, start, end)}>Show on graf</CustomizedButtons>
                </Box>
            )
        })
    }

    const position = (geo, locationId) => <Box sx={{ color: 'blue' }} >
        latitude: {geo.latitude} longtitude: {geo.longitude}
        <CustomizedButtons onClick={() => handleMap(geo.longitude, geo.latitude)}>Show on map</CustomizedButtons>
        <CustomizedButtons onClick={() => showMesurementSet(geo.id, locationId)}>Sets</CustomizedButtons>
        <Box>
            {showMeasurementSets && <Box>
                {
                    grafButton(geo.id, locationId)
                }
            </Box>}
        </Box>
    </Box>
    //tjekker om brugeren er admin og viser en knap hvis man er admin
    const admin = () => {
        if (user.isAdmin) {
            return (
                <Box>
                    <FrontpageAdmin
                        setGeoLocations={setGeoLocations}
                        setShowGeoLocations={setShowGeoLocations}
                        allLocations={allLocations}
                        geoLocations={geoLocations}
                        showGeoLocations={showGeoLocations}
                        showMesurementplot={showMesurementplot}
                        setMeasurementSets={setMeasurementSets}
                        measurementSets={measurementSets}
                        setError={setError}
                        datoFormat={datoFormat}
                        handleMap={handleMap}
                        setMap={setShowMap}
                        setPlot={setShowMeasurements}
                    />
                </Box>
            )
        }
    }

    return (
        <Box sx={centrer}>
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
            <Image src={billede} alt='test' height={50} />
            <Box>{error}</Box>
            {
                showMap ? <MapPage geoLocations={locations} /> : <Box></Box>
            }
            {
                showMeasurements && plotly()
            }
            <Box>{error}</Box>
        </Box>

    );
}
//tjekker om brugeren er logget ind
export default withAuth(Frontpage);