import { language } from '@/config/constants'
import { DarkLogo, LightLogo } from '@/icons'
import {
	Avatar,
	Box,
	Button,
	Flex,
	HStack,
	Icon,
	IconButton,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { BiMenuAltLeft, BiUserCircle } from 'react-icons/bi'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { TbWorld } from 'react-icons/tb'
import { HeaderProps } from './header.props'
import { useRouter } from 'next/router'
import { AiOutlineLogin } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { CiLogout } from 'react-icons/ci'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'

const Header = ({ onToggle }: HeaderProps) => {
	const { toggleColorMode, colorMode } = useColorMode()
	const { t, i18n } = useTranslation()
	const router = useRouter()
	const { user } = useAuth()
	const { logout } = useActions()

	const onLanguage = (lng: string) => {
		router.replace(router.asPath)
		i18n.changeLanguage(lng)
	}

	const logoutHandler = () => {
		logout()
		router.push('/auth')
	}
	return (
		<Box
			zIndex={1001}
			w={'full'}
			h={'10vh'}
			px={10}
			pos={'fixed'}
			top={0}
			left={0}
			right={0}
			borderBottom={'1px'}
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
		>
			<Flex h={'full'} justify={'space-between'} align={'center'}>
				<Box>
					<HStack>
						<Icon
							display={{ base: 'flex', md: 'none' }}
							as={BiMenuAltLeft}
							onClick={onToggle}
							w={6}
							h={6}
							cursor={'pointer'}
						/>
						<Link href={'/'}>
							{colorMode === 'light' ? <DarkLogo /> : <LightLogo />}
						</Link>
					</HStack>
				</Box>
				<HStack>
					<Menu placement='bottom'>
						<MenuButton
							display={{ base: 'none', md: 'block' }}
							as={Button}
							textTransform={'capitalize'}
							rightIcon={<TbWorld />}
							colorScheme='blue'
							variant={'solid'}
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
						icon={
							colorMode === 'light' ? <BsFillMoonFill /> : <BsFillSunFill />
						}
						colorScheme={'blue'}
						onClick={toggleColorMode}
						variant={'outline'}
					/>
					{user ? (
						<Menu>
							<MenuButton
								as={Button}
								rounded={'full'}
								variant={'link'}
								cursor={'pointer'}
								minW={0}
							>
								<Avatar backgroundColor={'blue.500'} src={user.avatar} />
							</MenuButton>
							<MenuList p={0} m={0}>
								<MenuItem
									h={14}
									// onClick={() => router.push('/setting')}
									fontWeight={'bold'}
									icon={<FiSettings fontSize={17} />}
								>
									{t('settings', { ns: 'global' })}
								</MenuItem>
								<MenuItem
									h={14}
									onClick={logoutHandler}
									fontWeight={'bold'}
									icon={<CiLogout fontSize={17} />}
								>
									{t('logout', { ns: 'global' })}
								</MenuItem>
							</MenuList>
						</Menu>
					) : (
						<>
							<Button
								display={{ base: 'none', md: 'flex' }}
								rightIcon={<BiUserCircle />}
								colorScheme='blue'
								onClick={() => router.push('/auth')}
							>
								{t('login', { ns: 'layout' })}
							</Button>
							<IconButton
								display={{ base: 'flex', md: 'none' }}
								aria-label='login'
								icon={<AiOutlineLogin />}
								colorScheme={'blue'}
								onClick={() => router.push('/auth')}
								variant={'outline'}
							/>
						</>
					)}
				</HStack>
			</Flex>
		</Box>
	)
}

export default Header
