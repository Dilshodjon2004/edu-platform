import { Box, Button, Center, HStack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { signIn } from 'next-auth/react'

const SocialMedia = () => {
	const { t } = useTranslation()

	const google = () => {
		signIn('google', {
			callbackUrl: '/',
		})
	}

	const github = () => {
		signIn('github', {
			callbackUrl: '/',
		})
	}
	return (
		<>
			<Box
				pos={'relative'}
				textAlign={'center'}
				_before={{
					content: '""',
					position: 'absolute',
					width: '45%',
					left: 0,
					top: '50%',
					transform: 'translateY(-50%)',
					height: '1px',
					bg: 'gray.600',
				}}
				_after={{
					content: '""',
					position: 'absolute',
					width: '45%',
					right: 0,
					top: '50%',
					transform: 'translateY(-50%)',
					height: '1px',
					bg: 'gray.600',
				}}
			>
				{t('social_media_or', { ns: 'global' }).toUpperCase()}
			</Box>
			<HStack>
				<Button
					w={'full'}
					colorScheme={'gray'}
					leftIcon={<FaGithub />}
					onClick={github}
				>
					<Center>
						<Text>{t('social_media_github', { ns: 'global' })}</Text>
					</Center>
				</Button>

				<Button
					w={'full'}
					colorScheme='red'
					variant={'outline'}
					leftIcon={<FaGoogle />}
					onClick={google}
				>
					<Center>
						<Text>{t('social_media_google', { ns: 'global' })}</Text>
					</Center>
				</Button>
			</HStack>
		</>
	)
}

export default SocialMedia
