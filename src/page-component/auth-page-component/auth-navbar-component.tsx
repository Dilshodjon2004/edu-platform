import { language, navigation } from '@/config/constants'
import { DarkLogo, LightLogo } from '@/icons'
import {
	Box,
	Button,
	Container,
	Flex,
	HStack,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'

const AuthNavbarComponent = () => {
	const { colorMode, toggleColorMode } = useColorMode()
	const { t, i18n } = useTranslation()

	const router = useRouter()

	const onLanguage = (lng: string) => {
		router.replace(router.asPath)
		i18n.changeLanguage(lng)
	}
	return (
		<Box zIndex={10} w={'full'} h={'10vh'}>
			<Container maxW={'container.lg'}>
				<Flex align={'center'} justify={'space-between'} h={'10vh'}>
					<Link href={'/'}>
						{colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
					</Link>
					<HStack gap={5}>
						{navigation[1].links.map(nav => (
							<Link href={nav.route}>
								<Box
									color={'blue.300'}
									_hover={{ textDecoration: 'underline', color: 'white' }}
									as='a'
								>
									{t(nav.label, { ns: 'layout' })}
								</Box>
							</Link>
						))}
						<Menu placement='bottom'>
							<MenuButton
								as={Button}
								textTransform={'capitalize'}
								rightIcon={<TbWorld />}
								colorScheme='blue'
								variant={'outline'}
							>
								{i18n.resolvedLanguage}
							</MenuButton>
							<MenuList p={0}>
								{language.map(lang => (
									<MenuItem
										key={lang.lng}
										onClick={() => onLanguage(lang.lng)}
										icon={<lang.icon />}
										backgroundColor={
											i18n.resolvedLanguage === lang.lng ? 'blue.500' : ''
										}
									>
										{lang.nativeLng}
									</MenuItem>
								))}
							</MenuList>
						</Menu>
						<IconButton
							aria-label='color-mode'
							onClick={toggleColorMode}
							icon={
								colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
							}
							colorScheme={'facebook'}
							variant={'outline'}
						/>
					</HStack>
				</Flex>
			</Container>
		</Box>
	)
}

export default AuthNavbarComponent
