import {
	Box,
	Flex,
	IconButton,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import { useTranslation } from 'react-i18next'
import { FaInstagram, FaTelegram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
	const { t } = useTranslation()
	return (
		<Box
			pl={{ base: 0, lg: '320px' }}
			mt={10}
			w={'full'}
			h={'10vh'}
			borderTop={'1px'}
			bg={useColorModeValue('gray.50', 'gray.900')}
			color={useColorModeValue('gray.700', 'gray.200')}
			borderTopColor={useColorModeValue('gray.200', 'gray.700')}
		>
			<Flex justify={'space-between'} align={'center'} h={'full'}>
				<Text>
					© {format(new Date(), 'yyyy')} {t('footer', { ns: 'layout' })}
				</Text>
				<Flex gap={3} mr={10}>
					<IconButton
						icon={<FaTelegram />}
						colorScheme='blue'
						variant={'outline'}
						aria-label='telegram'
					/>
					<IconButton
						icon={<FaInstagram />}
						colorScheme='blue'
						variant={'outline'}
						aria-label='instagram'
					/>
					<IconButton
						icon={<FaYoutube />}
						colorScheme='blue'
						variant={'outline'}
						aria-label='youtube'
					/>
				</Flex>
			</Flex>
		</Box>
	)
}

export default Footer
