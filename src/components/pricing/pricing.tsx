import React from 'react'
import { PricingProps } from './pricing.props'
import {
	Button,
	Heading,
	List,
	ListIcon,
	ListItem,
	Stack,
	useColorModeValue,
} from '@chakra-ui/react'
import { FaCheckCircle } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const Pricing = ({ options, price, title, checked }: PricingProps) => {
	const colorTextLight = checked ? 'white' : 'blue.600'
	const bgColorLight = checked ? 'blue.400' : 'gray.300'

	const colorTextDark = checked ? 'white' : 'blue.500'
	const bgColorDark = checked ? 'blue.400' : 'gray.300'

	const { t } = useTranslation()
	return (
		<Stack
			p={3}
			py={3}
			justifyContent={{ base: 'flex-start', md: 'space-around' }}
			direction={{ base: 'column', md: 'row' }}
			alignItems={{ md: 'center' }}
		>
			<Heading size={'md'}>{title}</Heading>
			<List spacing={3} textAlign={'center'}>
				{options.map(item => (
					<ListItem key={item.id}>
						<ListIcon as={FaCheckCircle} color={'green.500'} />
						{item.desc}
					</ListItem>
				))}
			</List>
			<Heading size={'xl'}>
				{price.toLocaleString('en-US', { currency: 'USD', style: 'currency' })}
			</Heading>
			<Stack>
				<Button
					size={'md'}
					color={useColorModeValue(colorTextLight, colorTextDark)}
					bgColor={useColorModeValue(bgColorLight, bgColorDark)}
				>
					{t('pricing_btn', { ns: 'global' })}
				</Button>
			</Stack>
		</Stack>
	)
}

export default Pricing
