"use client";
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Box } from '@/lib/mui';
import { nyPost } from '@/api';
//import Title from '/Components/title';
import { CustomizedButtons, Text } from '$/Components';
import { format } from 'date-fns';

export default function PostComment({ setResponse, data }) {
    const schema = Yup.object().shape({
        topic: Yup.string().required('There need to be a title'),
        message: Yup.string().required('There need to be a text'),
    })
    const result = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

    const defaultValues = {
        userID: data.locationId,
        topic: '',
        message: '',
        dato: result
    }

    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('');
    //const navigate = useNavigate();

    const { handleSubmit, formState: { errors }, control } = useForm({
        defaultValues,
        resolver: yupResolver(schema)
    });


    const onSubmit = async (formData) => {
        setIsLoading(true)
        //const dato = { ...formData, dato: result }
        console.log(formData)
        try {
            await nyPost(formData, setResponse, `/GeoLocation/MeasurementSet/Comment?LocationID=${data.locationId}&GeoLocationID=${data.Geoid}&MeasurementSetID=${data.setId}`)
            //console.log(message)
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
            //console.log(message)
            setStatus(err)
        } finally {
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
                        name="topic"
                        render={({ field: { onChange } }) =>
                            <Text
                                width={300}
                                label='Topic'
                                type='text'
                                onChange={onChange}
                                errors={errors?.password}
                            />
                        }
                        rules={{
                            required: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                {errors && errors.topic?.message}
                <Box sx={centrer}>
                    <Controller
                        control={control}
                        name="message"
                        render={({ field: { onChange } }) =>
                            <Text
                                width={300}
                                label='Message'
                                type='multiline'
                                rows={4}
                                onChange={onChange}
                                errors={errors?.password}
                            />
                        }
                        rules={{
                            required: true,
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <div>
                    <CustomizedButtons type="submit" disabled={isLoading}>Send</CustomizedButtons>
                </div>
                <label>{status}</label>
            </Box>
        </form >
    );
}