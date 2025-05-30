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
} from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { LoginProps } from './login.props'

const Login = ({ onNavigateStateComponent }: LoginProps) => {
	const [show, setShow] = useState<boolean>(false)
	const toggleShow = () => setShow(prev => !prev)
	const { t } = useTranslation()
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
			<FormControl isRequired>
				<FormLabel>{t('login_input_email_label', { ns: 'global' })}</FormLabel>
				<Input
					focusBorderColor='blue.500'
					type='text'
					placeholder='example@sammi.ac'
					h={14}
				/>
			</FormControl>
			<FormControl isRequired>
				<FormLabel>
					{t('login_input_password_label', { ns: 'global' })}
				</FormLabel>
				<InputGroup>
					<Input
						focusBorderColor='blue.500'
						type={!show ? 'password' : 'text'}
						placeholder={
							t('login_input_password_label', { ns: 'global' }) || ''
						}
						h={14}
					/>
					<InputRightElement pt={4}>
						<Icon
							as={!show ? AiOutlineEye : AiOutlineEyeInvisible}
							cursor={'pointer'}
							onClick={toggleShow}
						/>
					</InputRightElement>
				</InputGroup>
			</FormControl>
			<HStack justify={'space-between'}>
				<Checkbox colorScheme='blue'>
					{t('auth_remember_me', { ns: 'global' })}
				</Checkbox>
				<Link href={'account-recovery'}>
					<Box
						as='a'
						color={'teal.500'}
						_hover={{ textDecoration: 'underline' }}
					>
						{t('auth_forgot_password', { ns: 'global' })}?
					</Box>
				</Link>
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
			>
				{t('login_btn', { ns: 'global' })}
			</Button>
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
