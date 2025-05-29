import {
	Button,
	Heading,
	HStack,
	PinInput,
	PinInputField,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const Verification = () => {
	const { t } = useTranslation()
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
			>
				{t('verification_btn', { ns: 'global' })}
			</Button>
		</Stack>
	)
}

export default Verification
