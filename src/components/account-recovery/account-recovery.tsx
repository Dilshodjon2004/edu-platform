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

const AccountRecovery = ({
	onNavigateStateComponent,
}: AccountRecoveryProps) => {
	const [progress, setProgress] = useState<33.33 | 66.66 | 100>(33.33)
	const [step, setStep] = useState<1 | 2 | 3>(1)

	const { show, toggleShow, showConfirm, toggleShowConfirm } = useShowPassword()
	const toast = useToast()

	const { t } = useTranslation()

	const onForm1Submit = () => {
		setProgress(66.66)
		setStep(2)
	}

	const onForm2Submit = () => {
		setProgress(100)
		setStep(3)
	}

	const onForm3Submit = () => {
		onNavigateStateComponent('login')
		toast({
			title: 'Successfully updated!',
			description: 'You can login to your account with new password.',
			status: 'success',
			position: 'top-right',
			isClosable: true,
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
			<FormControl isRequired>
				<FormLabel>{t('login_input_email_label', { ns: 'global' })}</FormLabel>
				<Input
					focusBorderColor='blue.500'
					type='text'
					placeholder='example@sammi.ac'
					h={14}
				/>
			</FormControl>
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
				onClick={onForm1Submit}
			>
				{t('account_recovery_btn_form1', { ns: 'global' })}
			</Button>
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
			<HStack justify={'center'}>
				<PinInput
					otp
					size={'lg'}
					colorScheme='blue'
					focusBorderColor='blue.500'
				>
					{new Array(6).fill(1).map((_, index) => (
						<PinInputField key={index} />
					))}
				</PinInput>
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
				onClick={onForm2Submit}
			>
				{t('account_recovery_btn_form2', { ns: 'global' })}
			</Button>
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
			<FormControl isRequired>
				<FormLabel>
					{t('account_recovery_title_form3', { ns: 'global' })}
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
				onClick={onForm3Submit}
			>
				{t('account_recovery_btn_form3', { ns: 'global' })}
			</Button>
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
