import { Pricing } from '@/components'
import { ProductsType } from '@/interfaces/constants.interface'
import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
import React, { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const PricingPageComponent = ({ products }: { products: ProductsType[] }) => {
	const { t } = useTranslation()
	return (
		<>
			<Stack spacing={4} width={'100%'} direction={'column'}>
				<Stack
					p={5}
					alignItems={'center'}
					justifyContent={{ base: 'flex-start', md: 'space-around' }}
					direction={{ base: 'column', md: 'row' }}
				>
					<Stack width={{ base: '100%', md: '40%' }} textAlign={'center'}>
						<Heading>
							{t('pricing_title', { ns: 'global' })}
							<Text color='green.400'>
								{t('pricing_title_green', { ns: 'global' })}
							</Text>
						</Heading>
					</Stack>
					<Stack width={{ base: '100%', md: '60%' }}>
						<Text textAlign={'center'}>
							{t('pricing_description', { ns: 'global' })}
						</Text>
					</Stack>
				</Stack>
				{/* <Divider />
				<Pricing title={'Standard'} price={20} options={options} />
				<Divider />
				<Pricing title={'Premium'} price={32} options={options} checked />
				<Divider />
				<Pricing title={'Business'} price={45} options={options} /> */}

				{products.map(product => (
					<Fragment key={product.id}>
						<Divider />
						<Pricing
							title={product.name}
							price={product.default_price.unit_amount / 100}
							options={product.description
								.split(', ')
								.map((c, idx) => ({ id: idx, desc: c }))}
							product={product}
						/>
					</Fragment>
				))}
			</Stack>
		</>
	)
}

export default PricingPageComponent
