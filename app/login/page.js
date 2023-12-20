"use client"
import React, { useState } from 'react';
import { authentication } from '@/api/login';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppContext } from '$/AppContext';
import { useRouter } from 'next/navigation';
import { user } from '@/helpers/users';
import * as Yup from 'yup';
import { Text, CustomizedButtons, Title } from '$/Components';
import { Box } from '@/lib/mui';

export default function Login() {
	const { setIsLoggedIn, setUser } = useAppContext();

	//til at sende videre til en anden side
	const router = useRouter();
	//til validering så man ikke sender tomt data
	/*const schema = Yup.object().shape({
		email: Yup.string().required(`What about your E-mail`),
		password: Yup.string().required('You need a password to log in')
	})*/

	const defaultValues = {
		email: '',
		password: ''
	}
	//variabler
	const [message, setMessage] = useState({})

	const [status, setStatus] = useState('');
	const [isLoading, setIsLoading] = useState('');

	const loginAPI = authentication.login
	//til login formlaren
	const { handleSubmit, formState: { errors }, control } = useForm({
		defaultValues,
		//resolver: yupResolver(schema)
	});
	//login funktionen når man har trykket login og at der står noget i de vigtige felter
	const onSubmit = async (data) => {
		let rolle;
		//setIsLoading(true)
		setIsLoggedIn(true)
		setUser(user.users[0])
		//navigerer til forsiden
		router.push('./frontpage');
		//kalder funktionen der laver apikaldet tol login
		/*let cancel = false
		await loginAPI(data, setMessage).then(t => {
			//setUser()
			setIsLoggedIn(true)
			console.log(t)
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
							rules={{ required: false }}
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
								required: false,
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