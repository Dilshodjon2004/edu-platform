import { CheckoutForm } from '@/components'
import SectionTitle from '@/components/section-title/section-title'
import { loadImage } from '@/helpers/image.helper'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { CardType } from '@/interfaces/constants.interface'
import {
	Box,
	Divider,
	Grid,
	GridItem,
	HStack,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Image from 'next/image'
import { Fragment } from 'react'

const stripePromise = loadStripe(
	process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
)

const CheckoutPageComponent = ({ cards }: { cards: CardType[] }) => {
	const { books, courses, product } = useTypedSelector(state => state.cart)
	const { colorMode } = useColorMode()

	return (
		<>
			<SectionTitle
				title={'Checkout'}
				subtitle={
					'We’re on a mission to deliver engaging, curated courses at a reasonable price.'
				}
			/>
			<Grid gridTemplateColumns={'70% 30%'} gap={5}>
				<GridItem>
					<Divider my={5} />
					<Elements
						stripe={stripePromise}
						options={{
							appearance: { theme: colorMode === 'dark' ? 'night' : 'stripe' },
						}}
					>
						<CheckoutForm cards={cards} />
					</Elements>
				</GridItem>
				<GridItem
					mt={10}
					borderLeft={'1px'}
					p={5}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
				>
					<Text fontSize={'2xl'} fontWeight={'bold'}>
						Order details
					</Text>

					{product.id ? (
						<>
							<Divider my={5} />
							<HStack justify={'space-between'}>
								<Text>
									{product.name} -{' '}
									<Box as={'span'} fontWeight={'bold'}>
										Plan
									</Box>
								</Text>
								<Text fontWeight={'bold'} color={'facebook.500'}>
									{(product.default_price.unit_amount / 100).toLocaleString(
										'en-US',
										{
											style: 'currency',
											currency: 'USD',
										}
									)}
								</Text>
							</HStack>
						</>
					) : (
						<>
							{books.map(book => (
								<Fragment key={book._id}>
									<OrderedDetailedCard item={book} image={book.image} />
									<Divider my={5} />
								</Fragment>
							))}
							{courses.map(course => (
								<Fragment key={course._id}>
									<OrderedDetailedCard
										item={course}
										image={course.previewImage}
									/>
									<Divider my={5} />
								</Fragment>
							))}
						</>
					)}
				</GridItem>
			</Grid>
		</>
	)
}

export default CheckoutPageComponent

const OrderedDetailedCard = ({ item, image }) => (
	<HStack justify={'space-between'}>
		<HStack>
			<Box pos={'relative'} w={'40px'} h={'30px'}>
				<Image
					src={loadImage(image)}
					fill
					alt={item.title}
					style={{ objectFit: 'cover' }}
				/>
			</Box>
			<Text>{item.title}</Text>
		</HStack>
		<Text fontWeight={'bold'} color={'blue.500'}>
			{item.price.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD',
			})}
		</Text>
	</HStack>
)
