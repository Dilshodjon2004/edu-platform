import { language } from '@/config/constants'
import { DarkLogo, LightLogo } from '@/icons'
import {
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
import { MdOutlineContactSupport } from 'react-icons/md'
import { TbWorld } from 'react-icons/tb'
import { HeaderProps } from './header.props'
const Header = ({ onToggle }: HeaderProps) => {
	const { toggleColorMode, colorMode } = useColorMode()
	const { t, i18n } = useTranslation()

	const onLanguage = (lng: string) => {
		i18n.changeLanguage(lng)
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
					<IconButton
						aria-label='support'
						icon={<MdOutlineContactSupport />}
						colorScheme='blue'
						variant={'ghost'}
					/>
					<Menu placement='bottom'>
						<MenuButton
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
					<Button rightIcon={<BiUserCircle />}>
						{t('login', { ns: 'layout' })}
					</Button>
				</HStack>
			</Flex>
		</Box>
	)
}

export default Header
