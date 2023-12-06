import React/*, { useState }*/ from 'react';
//import { authentication } from '../../services/login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Text, CustomizedButtons, Title } from '../../components';
import { Box } from '@mui/material';

export default function Login({ setIsLoggedIn/*, setUser*/ }) {
	//til at sende videre til en anden side
	const navigate = useNavigate();
	//til validering så man ikke sender tomt data
	const schema = Yup.object().shape({
		email: Yup.string().required(`What about your E-mail`),
		password: Yup.string().required('You need a password to log in')
	})

	const defaultValues = {
		email: '',
		password: ''
	}
	//variabler
	/*const [message, setMessage] = useState({})
	const [status, setStatus] = useState('');
	const [isLoading, setIsLoading] = useState('');
	const loginAPI = authentication.login*/
	//til login formlaren
	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues,
		resolver: yupResolver(schema)
	});
	//login funktionen når man har trykket login og at der står noget i de vigtige felter
	const onSubmit = async (data) => {
		/*let cancel = false
		let rolle;*/
		//setIsLoading(true)
		setIsLoggedIn(true)
		//navigerer til forsiden
		navigate('../forside')
		//kalder funktionen der laver apikaldet tol login
		/*await loginAPI(data, setMessage).then(t => {
			rolle = authentication.currentUserValue.isAdmin
			setUser(authentication.currentUserValue)
			setIsLoggedIn(true)
			//console.log(rolle)
			setUser(message)
		}).catch(err => {
			setIsLoading(false)
			if (err.name === 'user') {
				const bruger = err.errorMessage
				setStatus(`the user ${bruger} doesn't exist`)
			} else if (err.name === 'password') {
				const password = err.errorMessage
				setStatus(password)
			} else {
				setStatus(err)
			}
		})
		//console.log(message)
		setIsLoading(false)

		return () => {
			cancel = true;
		}*/
	}
	//css til loginsiden
	const centrer = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'column',
		mt: 2
	}

	return (
		<Box sx={centrer}>
			<Title>Login</Title>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={
					centrer
				}>
					<Box sx={
						centrer
					}>
						<Controller
							control={control}
							name="email"
							render={({ field: { onChange } }) =>
								<Text
									autoFocus
									width={300}
									label='E-mail'
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
					{errors && errors.brugernavn?.message}
					<Box sx={
						centrer
					}>
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
					{errors && errors.password?.message}
					<div>
						<CustomizedButtons type="submit" >Login</CustomizedButtons>
					</div>
					{/* <label>{status.message}</label> */}
				</Box>
			</form>
		</Box>
	);
}