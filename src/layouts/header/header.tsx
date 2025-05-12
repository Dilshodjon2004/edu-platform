import { DarkLogo, EngIcons, LightLogo, RusIcons, UzbIcons } from '@/icons'
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
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
import { BiUserCircle, BiMenuAltLeft } from 'react-icons/bi'
import { MdOutlineContactSupport } from 'react-icons/md'
import { BsTranslate } from 'react-icons/bs'
import { HeaderProps } from './header.props'
const Header = ({ onToggle, toggle }: HeaderProps) => {
	const { toggleColorMode, colorMode } = useColorMode()
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
					<Menu>
						<MenuButton
							as={IconButton}
							icon={<BsTranslate />}
							colorScheme='blue'
							variant={'solid'}
						/>
						<MenuList>
							<MenuItem icon={<UzbIcons />}>UZB</MenuItem>
							<MenuItem icon={<RusIcons />}>RUS</MenuItem>
							<MenuItem icon={<EngIcons />}>ENG</MenuItem>
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
					<Button rightIcon={<BiUserCircle />}>Login</Button>
				</HStack>
			</Flex>
		</Box>
	)
}

export default Header
