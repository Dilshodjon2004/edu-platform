import SectionTitle from '@/components/section-title/section-title'
import { booksCategory } from '@/config/constants'
import {
	Box,
	Button,
	Flex,
	Grid,
	HStack,
	Text,
	useColorModeValue,
	useToast,
} from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiFillShopping } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { loadImage } from '@/helpers/image.helper'
import Image from 'next/image'
import { useActions } from '@/hooks/useActions'
import { IBooksType } from '@/interfaces/books.interface'

const BooksPageComponent = () => {
	const [filter, setFilter] = useState<string>('all-categories')
	const backgroundColor = useColorModeValue('gray.200', 'gray.900')
	const { t } = useTranslation()
	const { books } = useTypedSelector(state => state.books)
	const cart = useTypedSelector(state => state.cart)
	const { addBookToCart } = useActions()
	const toast = useToast()

	const filteredData = useCallback(() => {
		switch (filter) {
			case 'programming':
				return books.filter(c => c.category === 'programming')
			case 'design':
				return books.filter(c => c.category === 'design')
			case 'business':
				return books.filter(c => c.category === 'business')
			case 'history':
				return books.filter(c => c.category === 'history')
			case 'writing':
				return books.filter(c => c.category === 'writing')
			case 'lifestyle':
				return books.filter(c => c.category === 'lifestyle')
			default:
				return books
		}
	}, [filter, books])

	const addToCart = (book: IBooksType) => {
		const existingProduct = cart.books.find(c => c._id === book._id)
		if (existingProduct) {
			toast({
				title: 'Book already exists in cart',
				position: 'bottom-right',
				status: 'warning',
				duration: 1500,
			})
			return
		}
		addBookToCart(book)
		toast({
			title: 'Book added successfully',
			position: 'bottom-right',
			duration: 1500,
		})
	}
	return (
		<Box mb={20}>
			<SectionTitle
				title={t('title', { ns: 'books' })}
				subtitle={t('description', { ns: 'books' })}
			/>
			<Flex justify={'center'} mt={5} flexWrap={'wrap'}>
				{booksCategory.map((item, idx) => (
					<Button
						key={item.id}
						colorScheme='blue'
						variant={filter === item.id ? 'solid' : 'outline'}
						borderRadius={0}
						borderLeftRadius={idx === 0 ? 'md' : 0}
						borderRightRadius={booksCategory.length - 1 === idx ? 'md' : 0}
						onClick={() => setFilter(item.id)}
					>
						{t(item.label, { ns: 'books' })}
					</Button>
				))}
			</Flex>

			<Grid
				gridTemplateColumns={{
					base: 'repeat(1, 1fr)',
					md: 'repeat(2, 1fr)',
					xl: 'repeat(3, 1fr)',
				}}
				rowGap={20}
				gap={4}
				mt={5}
			>
				{filteredData().map((item, idx) => (
					<motion.div key={idx} layout>
						<Box pos={'relative'}>
							<Box pos={'relative'} w={'full'} h={'250px'}>
								<Image
									src={loadImage(item.image)}
									alt={item.title}
									fill
									style={{ objectFit: 'cover', borderRadius: '10px' }}
								/>
							</Box>
							<HStack
								pos={'absolute'}
								minH={'90px'}
								borderRadius={'lg'}
								boxShadow={'dark-lg'}
								bg={backgroundColor}
								left={2}
								right={2}
								bottom={-10}
								p={2}
								justify={'space-between'}
							>
								<Box>
									<Text fontSize={'md'}>{item.title}</Text>
									<Text fontWeight={'bold'} fontSize={'xl'}>
										{item.price.toLocaleString('en-Us', {
											style: 'currency',
											currency: 'USD',
										})}
									</Text>
								</Box>
								<Button
									colorScheme='blue'
									rightIcon={<AiFillShopping />}
									onClick={() => addToCart(item)}
									isDisabled={cart.books.map(c => c._id).includes(item._id)}
								>
									Buy
								</Button>
							</HStack>
						</Box>
					</motion.div>
				))}
			</Grid>
		</Box>
	)
}

export default BooksPageComponent

const data = [
	{
		name: 'JavaScript - Design Pattern',
		image: 'https://ucarecdn.com/01292099-b782-4b74-a05e-f902be3feecd/',
		category: 'programming',
		price: 10,
	},
	{
		name: 'Proffessional ReactJS',
		image:
			'https://miro.medium.com/v2/resize:fit:1400/1*RqP74lo8sDgMwZ4JXo9xBw.png',
		category: 'programming',
		price: 40,
	},
	{
		name: 'HTML CSS - Web',
		image:
			'https://t3.ftcdn.net/jpg/04/86/60/44/360_F_486604480_EKKklldKqiwmvAunlEeF4QdI0dfjDojA.jpg',
		category: 'programming',
		price: 15,
	},
	{
		name: 'Backend Programming',
		image:
			'https://form.io/wp-content/uploads/thumbnail-formio-backend-api-integration-1360x765.webp',
		category: 'programming',
		price: 30,
	},

	{
		name: 'Proffessional Photoshop',
		image: 'https://wallpaperaccess.com/full/1533478.jpg',
		category: 'design',
		price: 90,
	},
	{
		name: 'Illustrator',
		image:
			'https://i.pcmag.com/imagery/reviews/02PEWVd7SffmQ1JYgfC48uV-38..v1635886470.png',
		category: 'design',
		price: 20,
	},
	{
		name: 'Premier Pro',
		image: 'https://wallpaperaccess.com/full/3539123.jpg',
		category: 'design',
		price: 15,
	},

	{
		name: 'Startup',
		image:
			'https://img.freepik.com/free-vector/illustration-startup-business_53876-18154.jpg',
		category: 'business',
		price: 30,
	},
	{
		name: 'Business idea',
		image:
			'https://c0.wallpaperflare.com/preview/931/296/849/business-idea-planning-board-business-plan-thumbnail.jpg',
		category: 'business',
		price: 24,
	},
	{
		name: 'Growth your plan',
		image:
			'https://online.stanford.edu/sites/default/files/styles/figure_default/public/you-have-a-business-idea-webinar-hero-image.jpg?itok=OaDnVEt0',
		category: 'business',
		price: 15,
	},

	{
		name: 'The History Of Website',
		image:
			'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d2ViJTIwd2FsbHBhcGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
		category: 'history',
		price: 30,
	},
	{
		name: 'Internet',
		image: 'https://wallpapercave.com/wp/G2c4FdC.jpg',
		category: 'history',
		price: 54,
	},
	{
		name: 'Difference Web And Web-app',
		image: 'https://wallpapercave.com/wp/wp4312426.jpg',
		category: 'history',
		price: 12,
	},

	{
		name: 'Writing An Essay',
		image:
			'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d3JpdGluZyUyMGhhbmR8ZW58MHx8MHx8&w=1000&q=80',
		category: 'writing',
		price: 54,
	},
	{
		name: 'Professional Essay',
		image: 'https://wallpapercave.com/wp/wp7110644.jpg',
		category: 'writing',
		price: 12,
	},
]
