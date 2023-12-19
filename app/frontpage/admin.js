"use client"
import React, { useState } from 'react';
import { CustomizedButtons } from '$/Components';
import { Box } from '@/lib/mui';
import { useRouter } from 'next/navigation';
import hent from '@/api/location';

const FrontpageAdmin = (props) => {
    const { allLocations, setGeoLocations, setShowGeoLocations, geoLocations, showGeoLocations, showMesurementplot, setPlot, setMap, setError, datoFormat, handleMap } = props;
    const [showMeasurementSets, setShowMeasurementSets] = useState(false)
    const [measurementSetsAdmin, setMeasurementSetsAdmin] = useState(false)

    //
    //css
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    //til at navigere på siden
    const router = useRouter();
    const getMapCord = (id) => {
        hent(setGeoLocations, setError, `/${id}`).then((d) => {
            console.log(d)
            setShowGeoLocations(true)
            setShowMeasurementSets(false)
        })
    }

    const showMesurementSet = (Geoid, locationId) => {
        hent(setMeasurementSetsAdmin, setError, `/GeoLocation/MeasurementSet?GeoLocationID=${Geoid}&LocationID=${locationId}`).then((sets) => {
            console.log(sets)
            setPlot(false)
            setMap(false)
            if (sets.length > 0) {
                //setMeasurementSetsData(sets)
                setShowMeasurementSets(true)
                setError('')
            } else {
                setShowMeasurementSets(false)
                setError('No Data sets')
            }
        })
    }
    //console.log(x, 'test2')

    const visDato = (startDate, endDate) => {
        return (
            <Box sx={{ color: 'blue' }}>start: {startDate} slut: {endDate} </Box>
        )
    }

    const grafButton = (geoid, locationId) => {
        const sort = measurementSetsAdmin?.sort((p1, p2) => (p1.startDate > p2.startDate) ? 1 : (p1.startDate < p2.startDate) ? -1 : 0)
        return sort.map((sets) => {
            const start = datoFormat(sets.startDate)
            const end = datoFormat(sets.endDate)
            return (
                <Box key={sets.id}>
                    {visDato(start, end)}
                    <CustomizedButtons onClick={() => showMesurementplot(geoid, locationId, sets.id, start, end)}>Show on graf</CustomizedButtons>
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
            </Box>
            }
        </Box>
    </Box>

    return (
        <Box sx={{
            centrer
        }}>
            <Box>
                <CustomizedButtons onClick={() => router.push('./createuser')}>new user</CustomizedButtons>
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
            </Box>
            {showGeoLocations && <Box><Box>{geoLocations.name}</Box>{geoLocations.geoLocations?.map((geo) => {
                return (
                    <Box key={geo.id}>{position(geo, geoLocations.id)}</Box>
                )
            })}</Box>}

        </Box>

    );
}
//tjekker om brugeren er logget ind
export default FrontpageAdmin;