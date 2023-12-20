"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Box } from '@/lib/mui';
import { nyPost } from '@/api';
//import Title from '/Components/title';
import { CustomizedButtons, DatoValger, Text, Title } from '$/Components';
import { format } from 'date-fns';

export default function PostMessurementSet({ setResponse, geoId, locationId }) {
    const result = new Date()
    const defaultstart = format(result, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

    const oneday = new Date(Date.now() + (3600 * 1000 * 24))
    const defaultend = format(oneday, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

    const defaultValues = {
        name: '',
        startDate: result,
        endDate: oneday
    }

    const measurements = []

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    //const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control, setValue } = useForm({
        defaultValues,
        //resolver: yupResolver(schema)
    });


    const onSubmit = async (formData) => {
        setIsLoading(true)
        const opdateretData = { ...formData, measurements }
        console.log(opdateretData, 'datasent')
        try {
            await nyPost(opdateretData, setResponse, `/GeoLocation/MeasurementSet?geoLocationID=${geoId}&locationID=${locationId}`)
            //console.log(message)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            //console.log(message)
            setStatus(err)
        } finally {
            setStatus('Done')
            //console.log(message)
            setIsLoading(false)
        }
    }

    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={centrer}>
                <Box sx={centrer}>
                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange } }) =>
                            <Text
                                width={300}
                                label='Messurment name'
                                type='text'
                                onChange={onChange}
                                errors={errors?.password}
                            />
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={centrer}>
                    <Controller
                        control={control}
                        name="startDate"
                        defaultValue={defaultstart}
                        render={({ field: { onChange } }) =>
                            <DatoValger onChange={onChange} setValue={setValue} dato={result} name='startDate' />
                        }
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box sx={centrer}>
                    <Controller
                        control={control}
                        name="endDate"
                        defaultValue={defaultend}
                        render={({ field: { onChange } }) =>
                            <DatoValger onChange={onChange} setValue={setValue} dato={oneday} name='endDate' />
                        }
                        type="text"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <div>
                    <CustomizedButtons type="submit" disabled={isLoading}>Send</CustomizedButtons>
                </div>
                <Title>{status}</Title>
            </Box>
        </form >
    );
}