import {
	Box,
	Button,
	Checkbox,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Icon,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { LoginProps } from './login.props'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Form, Formik } from 'formik'
import { AuthValidation } from '@/validations/auth.validation'
import ErrorAlert from '../error-alert/error-alert'
import TextField from '../text-field/text-field'
import { IEmailAndPassword } from '@/store/user/user.interface'
import { useRouter } from 'next/router'

const Login = ({ onNavigateStateComponent }: LoginProps) => {
	const [show, setShow] = useState<boolean>(false)
	const toggleShow = () => setShow(prev => !prev)
	const { error, isLoading } = useTypedSelector(state => state.user)
	const { t } = useTranslation()
	const { login } = useActions()
	const router = useRouter()
	const toast = useToast()

	const onSubmit = (formData: IEmailAndPassword) => {
		login({
			email: formData.email,
			password: formData.password,
			callback: () => {
				router.push('/')
				toast({
					title: 'Successfully logged in!',
					status: 'info',
					isClosable: true,
					position: 'top-right',
					duration: 1000,
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
				{t('login_title', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
				{t('login_description', { ns: 'global' })}
			</Text>
			<Formik
				onSubmit={onSubmit}
				initialValues={{ email: '', password: '' }}
				validationSchema={AuthValidation.login}
			>
				<Form>
					{typeof error === 'string' && <ErrorAlert title={error} />}
					<TextField
						name='email'
						type='text'
						label={t('login_input_email_label', { ns: 'global' })}
						placeholder='example@sammi.ac'
					/>
					<TextField
						name='password'
						label={t('login_input_password_label', { ns: 'global' })}
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
					<HStack my={4} justify={'space-between'}>
						<Checkbox colorScheme='blue'>
							{t('auth_remember_me', { ns: 'global' })}
						</Checkbox>

						<Box
							as='a'
							onClick={() => onNavigateStateComponent('account-recovery')}
							color={'teal.500'}
							_hover={{ textDecoration: 'underline' }}
						>
							{t('auth_forgot_password', { ns: 'global' })}?
						</Box>
					</HStack>
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
						loadingText={'Loading...'}
					>
						{t('login_btn', { ns: 'global' })}
					</Button>
				</Form>
			</Formik>
			<Text>
				{t('login_not_account_yet', { ns: 'global' })}{' '}
				<Box
					as='span'
					color={'teal.500'}
					cursor={'pointer'}
					_hover={{ textDecoration: 'underline' }}
					onClick={() => onNavigateStateComponent('register')}
				>
					{t('login_redirect_to_register', { ns: 'global' })}
				</Box>
			</Text>
		</Stack>
	)
}

export default Login
