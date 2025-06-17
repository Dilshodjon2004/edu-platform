import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { AuthValidation } from '@/validations/auth.validation'
import {
	Button,
	Heading,
	HStack,
	PinInput,
	PinInputField,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import ErrorAlert from '../error-alert/error-alert'
import { useRouter } from 'next/router'

const Verification = () => {
	const { t } = useTranslation()
	const { verifyVerificationCode, register, clearError } = useActions()
	const { error, isLoading, user } = useTypedSelector(state => state.user)
	const router = useRouter()
	const toast = useToast()

	const onSubmit = async (formData: { otp: string }) => {
		const email = user?.email as string
		const password = user?.password as string
		verifyVerificationCode({
			email,
			otpVerification: formData.otp,
			callback: () => {
				register({
					email,
					password,
					callback: () => {
						router.push('/')
						toast({
							title: `${t('successfully_logged', { ns: 'global' })}`,
							position: 'top-right',
							duration: 1000,
							isClosable: true,
						})
					},
				})
			},
		})
	}
	return (
		<Stack spacing={4}>
			<Heading
				color={useColorModeValue('gray.500', 'gray.200')}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				{t('verification_title', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
				{t('verification_description', { ns: 'global' })}
			</Text>
			{typeof error === 'string' && (
				<ErrorAlert title={error} clearHandler={clearError} />
			)}
			<Formik
				onSubmit={onSubmit}
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
							{t('verification_btn', { ns: 'global' })}
						</Button>
					</Form>
				)}
			</Formik>
		</Stack>
	)
}

export default Verification
