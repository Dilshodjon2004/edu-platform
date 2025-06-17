import {
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	PinInput,
	PinInputField,
	Progress,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { AccountRecoveryProps } from './account-recovery.props'
import { useState } from 'react'
import useShowPassword from '@/hooks/useShowPassword'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import { AuthValidation } from '@/validations/auth.validation'
import TextField from '../text-field/text-field'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ErrorAlert from '../error-alert/error-alert'

const AccountRecovery = ({
	onNavigateStateComponent,
}: AccountRecoveryProps) => {
	const [progress, setProgress] = useState<33.33 | 66.66 | 100>(33.33)
	const [step, setStep] = useState<1 | 2 | 3>(1)
	const [email, setEmail] = useState<string>('')

	const { show, toggleShow, showConfirm, toggleShowConfirm } = useShowPassword()
	const toast = useToast()
	const { t } = useTranslation()
	const {
		sendVerificationCode,
		verifyVerificationCode,
		editUserPassword,
		clearError,
	} = useActions()
	const { error, isLoading } = useTypedSelector(state => state.user)

	const onForm1Submit = (formData: { email: string }) => {
		sendVerificationCode({
			email: formData.email,
			isUser: true,
			callback: () => {
				setEmail(formData.email)
				setProgress(66.66)
				setStep(2)
			},
		})
	}

	const onForm2Submit = (formData: { otp: string }) => {
		verifyVerificationCode({
			email: email,
			otpVerification: formData.otp,
			callback: () => {
				setProgress(100)
				setStep(3)
			},
		})
	}

	const onForm3Submit = (formData: { password: string }) => {
		editUserPassword({
			email,
			password: formData.password,
			callback: () => {
				onNavigateStateComponent('login')
				toast({
					title: `${t('successfully_edited', { ns: 'global' })}`,
					description: `${t('login_with_new_password', { ns: 'global' })}`,
					status: 'success',
					position: 'top-right',
					isClosable: true,
				})
			},
		})
	}
	const form1 = (
		<>
			<Heading
				color={useColorModeValue('gray.500', 'gray.200')}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				{t('account_recovery_title_form1', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text>{t('account_recovery_description_form1', { ns: 'global' })}</Text>
			{typeof error === 'string' && (
				<ErrorAlert title={error} clearHandler={clearError} />
			)}
			<Formik
				onSubmit={onForm1Submit}
				initialValues={{ email: '' }}
				validationSchema={AuthValidation.onlyEmail}
			>
				<Form>
					<TextField
						name='email'
						label={t('login_input_email_label', { ns: 'global' })}
						type='text'
						placeholder='example@sammi.ac'
					/>
					<Button
						mt={4}
						w={'full'}
						bgGradient={'linear(to-r, blue.400, gray.400)'}
						color={'white'}
						h={14}
						_hover={{
							bgGradient: 'linear(to-r, blue.500, gray.500)',
							boxShadow: 'xl',
						}}
						isLoading={isLoading}
						loadingText={`${t('loading', { ns: 'global' })}`}
						type='submit'
					>
						{t('account_recovery_btn_form1', { ns: 'global' })}
					</Button>
				</Form>
			</Formik>
		</>
	)

	const form2 = (
		<>
			<Heading
				color={useColorModeValue('gray.500', 'gray.200')}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				{t('account_recovery_title_form2', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text>{t('account_recovery_description_form2', { ns: 'global' })}</Text>
			{typeof error === 'string' && (
				<ErrorAlert title={error} clearHandler={clearError} />
			)}
			<Formik
				onSubmit={onForm2Submit}
				initialValues={{ otp: '' }}
				validationSchema={AuthValidation.otp}
			>
				{formik => (
					<Form>
						<HStack justify={'center'} direction={'column'}>
							<PinInput
								onChange={value => formik.setFieldValue('otp', value)}
								otp
								size={'lg'}
								colorScheme='blue'
								focusBorderColor='blue.500'
							>
								{new Array(6).fill(1).map((_, index) => (
									<PinInputField
										borderColor={
											formik.errors.otp && formik.touched.otp ? 'red.500' : ''
										}
										mx={1}
										key={index}
									/>
								))}
							</PinInput>
						</HStack>
						{formik.errors.otp && formik.touched.otp && (
							<Text
								textAlign={'center'}
								mt={2}
								fontSize={'14px'}
								color={'red.500'}
							>
								{formik.errors.otp as string}
							</Text>
						)}
						<Button
							mt={4}
							w={'full'}
							bgGradient={'linear(to-r, blue.400, gray.400)'}
							color={'white'}
							h={14}
							_hover={{
								bgGradient: 'linear(to-r, blue.500, gray.500)',
								boxShadow: 'xl',
							}}
							type='submit'
							isLoading={isLoading}
							loadingText={`${t('loading', { ns: 'global' })}`}
						>
							{t('account_recovery_btn_form2', { ns: 'global' })}
						</Button>
					</Form>
				)}
			</Formik>
		</>
	)

	const form3 = (
		<>
			<Heading
				color={useColorModeValue('gray.500', 'gray.200')}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				{t('account_recovery_title_form3', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text>{t('account_recovery_description_form3', { ns: 'global' })}</Text>
			<Formik
				onSubmit={onForm3Submit}
				initialValues={{ password: '', confirmPassword: '' }}
				validationSchema={AuthValidation.editPassword}
			>
				<Form>
					{typeof error === 'string' && (
						<ErrorAlert title={error} clearHandler={clearError} />
					)}
					<TextField
						name='password'
						label={t('account_recovery_title_form3', { ns: 'global' })}
						type={!show ? 'password' : 'text'}
						placeholder='******'
					>
						<InputRightElement pt={4}>
							<Icon
								as={!show ? AiOutlineEye : AiOutlineEyeInvisible}
								cursor={'pointer'}
								onClick={toggleShow}
							/>
						</InputRightElement>
					</TextField>
					<TextField
						name='confirmPassword'
						label={t('register_input_confirm_password_label', {
							ns: 'global',
						})}
						type={!showConfirm ? 'password' : 'text'}
						placeholder='******'
					>
						<InputRightElement pt={4}>
							<Icon
								as={!showConfirm ? AiOutlineEye : AiOutlineEyeInvisible}
								cursor={'pointer'}
								onClick={toggleShowConfirm}
							/>
						</InputRightElement>
					</TextField>
					<Button
						mt={4}
						w={'full'}
						bgGradient={'linear(to-r, blue.400, gray.400)'}
						color={'white'}
						h={14}
						_hover={{
							bgGradient: 'linear(to-r, blue.500, gray.500)',
							boxShadow: 'xl',
						}}
						type='submit'
						isLoading={isLoading}
						loadingText={`${t('loading', { ns: 'global' })}`}
					>
						{t('account_recovery_btn_form3', { ns: 'global' })}
					</Button>
				</Form>
			</Formik>
		</>
	)
	return (
		<>
			<Progress value={progress} colorScheme='blue' hasStripe isAnimated />

			<Stack spacing={4}>
				{step === 1 && form1} {step === 2 && form2} {step === 3 && form3}
			</Stack>
		</>
	)
}

export default AccountRecovery
