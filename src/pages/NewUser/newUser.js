import React, { useState } from "react";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
//import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { Text, Title } from "../../components";
import * as Yup from 'yup';
import { MdOutlineAdminPanelSettings, MdAdminPanelSettings } from "react-icons/md";
import { yupResolver } from '@hookform/resolvers/yup';

const NewUser = ({ user }) => {
    //variabler
    const [isAdmin, setIsAdmin] = useState(false);
    /*const [error, setError] = useState(false);
    const [message, setMessage] = useState(false);
    //til navigering
    const router = useNavigate();*/

    //tekst til validering
    const fornavnFejl = `Don't you have a name?`;
    const efternavnFejl = `Don't you have a surname??`;
    const brugernavnFejl = `Don't you want a cool nickname?`;
    const emailfejl = 'you need an e-mail to log in';
    const passwordFejl = 'You forgot to write a password';
    const passwordlength = 'Your password must be longer (6 symbols)';
    const passNumber = 'You need to have a number in your password';
    const falskemail = `that's not an email`;
    //validering
    const schema = Yup.object().shape({
        brugernavn: Yup.string().required(brugernavnFejl),
        email: Yup.string().email(falskemail).required(emailfejl),
        password: Yup.string().required(passwordFejl)
            .min(6, passwordlength).matches(/[0-9]/, passNumber),
        gentagPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password')], 'Passwords must match'),
        fornavn: Yup.string().required(fornavnFejl),
        efternavn: Yup.string().required(efternavnFejl),
    })

    //til formularen
    const { handleSubmit, formState: { errors }, control } = useForm({
        resolver: yupResolver(schema)
    });
    //håndterer chekboxen til om brugeren skal være admin
    const adminChange = () => {
        setIsAdmin(!isAdmin)
    }

    //bliver kaldt når man trykker create og valideringen er ok
    const onSubmit = async (data) => {
        //kalder funktionen der laver api kaldet til at oprette en bruger(ikke funktionel endnu)
        /*await opretBruger(data, setMessage, setError).then(() => {
            router.push('/login')
        }).catch(() => {
            console.log(message)
        })*/
    }

    //tekst til siden
    const brugernavn = 'Username';
    const fornavn = 'Given name';
    const mellem = 'Middle name';
    const efternavn = 'Family name';
    const isAdaminLabel = 'If the new user is an admin click here'
    const gentag = 'Gentag Password';
    const centrer = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        mt: 2
    }

    return (
        <Box>
            {//ser om brugeren er admin
                user.isAdmin ? <Box sx={centrer}>
                    <Title>Create new user</Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={centrer}>
                            <Box sx={centrer}>
                                <Controller
                                    control={control}
                                    name="brugernavn"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            autoFocus
                                            label={brugernavn}
                                            onChange={onChange}
                                            type="text"
                                            errors={errors.brugernavn}
                                        />
                                    }
                                    rules={{ required: true }}
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={centrer}>
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value, ref } }) =>
                                        <Text
                                            width={300}
                                            label="E-mail"
                                            onChange={onChange}
                                            type="email"
                                            errors={errors.email}
                                        />
                                    }
                                    rules={{ required: true }}
                                    type="email"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={centrer}>
                                <Controller
                                    id='password'
                                    control={control}
                                    name="password"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            label='Password'
                                            onChange={onChange}
                                            type="password"
                                            errors={errors.password}
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
                            <Box sx={centrer}>
                                <Controller
                                    id='gentagpassword'
                                    control={control}
                                    name="gentagPassword"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            label={gentag}
                                            onChange={onChange}
                                            type="password"
                                            errors={errors?.gentagPassword}
                                        />
                                    }
                                    rules={{
                                        required: true
                                    }}

                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={centrer}>
                                <Controller
                                    control={control}
                                    name="fornavn"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            label={fornavn}
                                            onChange={onChange}
                                            type="text"
                                            errors={errors.fornavn}
                                        />
                                    }
                                    rules={{ required: true }}
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={centrer}>
                                <Controller
                                    control={control}
                                    name="mellemnavn"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            label={mellem}
                                            onChange={onChange}
                                            type="text"
                                            errors={false}
                                        />
                                    }
                                    rules={{ required: false }}
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box sx={centrer}>
                                <Controller
                                    control={control}
                                    name="efternavn"
                                    render={({ field: { onChange } }) =>
                                        <Text
                                            width={300}
                                            label={efternavn}
                                            onChange={onChange}
                                            type="text"
                                            errors={errors.efternavn}
                                        />
                                    }
                                    rules={{ required: true }}
                                    type="text"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Box>
                            <Box>
                                <Controller
                                    control={control}
                                    name="isAdmin"
                                    render={({ field: { onChange, value, ref } }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isAdmin}
                                                    value={value}
                                                    onChange={adminChange}
                                                    name="isAdmin"
                                                    icon={<MdOutlineAdminPanelSettings size={75} color="blue" />}
                                                    checkedIcon={<MdAdminPanelSettings size={75} color="blue" />}
                                                />
                                            }
                                            label={isAdaminLabel}
                                            labelPlacement="top"
                                        />
                                    )}
                                />
                            </Box>
                        </Box>
                    </form>
                </Box> : <Title>
                    You don't have the authentication to see this page
                </Title>
            }
        </Box>
    );
};

export default NewUser;