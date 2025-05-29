import {
	Box,
	Button,
	Checkbox,
	Flex,
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
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { RegisterProps } from './register.props'
import useShowPassword from '@/hooks/useShowPassword'
import { t } from 'i18next'

const Register = ({ onNavigateStateComponent }: RegisterProps) => {
	const { show, toggleShow, showConfirm, toggleShowConfirm } = useShowPassword()
	return (
		<Stack spacing={4}>
			<Heading
				color={useColorModeValue('gray.500', 'gray.200')}
				lineHeight={1.1}
				fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
			>
				{t('register_title', { ns: 'global' })}
				<Text
					as={'span'}
					bgGradient={'linear(to-r, gray.400, blue.400)'}
					bgClip={'text'}
				>
					!
				</Text>
			</Heading>
			<Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
				{t('register_description', { ns: 'global' })}
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
			<Flex gap={4}>
				<FormControl isRequired>
					<FormLabel>
						{t('login_input_password_label', { ns: 'global' })}
					</FormLabel>
					<InputGroup>
						<Input
							focusBorderColor='blue.500'
							type={!show ? 'password' : 'text'}
							placeholder='Password'
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
				<FormControl isRequired>
					<FormLabel>
						{t('register_input_confirm_password_label', { ns: 'global' })}
					</FormLabel>
					<InputGroup>
						<Input
							focusBorderColor='blue.500'
							type={!showConfirm ? 'password' : 'text'}
							placeholder='Password'
							h={14}
						/>
						<InputRightElement pt={4}>
							<Icon
								as={!showConfirm ? AiOutlineEye : AiOutlineEyeInvisible}
								cursor={'pointer'}
								onClick={toggleShowConfirm}
							/>
						</InputRightElement>
					</InputGroup>
				</FormControl>
			</Flex>
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
				{t('register_btn', { ns: 'global' })}
			</Button>
			<Text>
				{t('register_already_have_account', { ns: 'global' })}{' '}
				<Box
					as='span'
					color={'teal.500'}
					cursor={'pointer'}
					_hover={{ textDecoration: 'underline' }}
					onClick={() => onNavigateStateComponent('login')}
				>
					{t('register_redirect_to_login', { ns: 'global' })}
				</Box>
			</Text>
		</Stack>
	)
}

export default Register
