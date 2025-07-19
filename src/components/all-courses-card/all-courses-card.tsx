import {
	Avatar,
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react'
import { AllCoursesCardProps } from './all-courses-card.props'
import ReactStars from 'react-stars'
import { CiViewList } from 'react-icons/ci'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'
import { BsMinecartLoaded } from 'react-icons/bs'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
	const router = useRouter()
	const { addCourseToCart } = useActions()
	const { courses } = useTypedSelector(state => state.cart)
	const toast = useToast()

	const onDetailedCourse = () => router.push(`/courses/${course.slug}`)

	const addCourseToCardHandler = () => {
		const existingProduct = courses.find(c => c._id === course._id)

		if (existingProduct) {
			toast({
				title: 'Course already exist in cart',
				position: 'bottom',
				status: 'warning',
			})
			return
		}
		addCourseToCart(course)
		toast({ title: 'Course added successfully', position: 'bottom' })
	}
	return (
		<>
			<Box py={4}>
				<Flex gap={4} direction={{ base: 'column', md: 'row' }}>
					<Box
						width={{ base: '100%', md: '250px' }}
						height='250px'
						borderRadius='lg'
						cursor='pointer'
						onClick={onDetailedCourse}
						position='relative'
						flexShrink={0}
					>
						<Image
							src={loadImage(course.previewImage)}
							alt={course.title}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</Box>

					<Stack>
						<HStack>
							<Text color={'#e59819'}>5</Text>
							<ReactStars edit={false} value={5} color2='#e59819' />
							<Text opacity={'.8'}>(5)</Text>
						</HStack>
						<Heading fontSize={'xl'}>{course.title}</Heading>
						<Text>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit.
							Blanditiis, excepturi velit dolore soluta recusandae corporis.
						</Text>
						<Flex
							gap={2}
							fontSize={'14px'}
							direction={{ base: 'column', sm: 'row' }}
							justifyContent={'space-between'}
						>
							<Avatar
								src={course.author.avatar}
								name={course.author.fullName}
							/>
							<HStack>
								<Flex align={'center'} gap={1}>
									<Icon as={CiViewList} />
									<Text>{course.lessonCount} lessons</Text>
								</Flex>
								<Flex align={'center'} gap={1}>
									<Icon as={AiOutlineClockCircle} />
									<Text>{course.totalHour} hours</Text>
								</Flex>
								<Flex align={'center'} gap={1}>
									<Icon as={SiGoogleanalytics} />
									<Text>{course.level}</Text>
								</Flex>
							</HStack>
						</Flex>
						<Divider />
						<Flex
							align={{ base: 'flex-start', sm: 'center' }}
							justify={'space-between'}
							direction={{ base: 'column', sm: 'row' }}
						>
							<Text fontSize={'xl'} fontWeight={'bold'}>
								{course.price.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD',
								})}
							</Text>
							<Flex gap={4} mt={{ base: 5, sm: 0 }}>
								<Button
									rightIcon={<BsMinecartLoaded />}
									colorScheme='blue'
									onClick={addCourseToCardHandler}
									isDisabled={
										courses.map(c => c._id).includes(course._id) ? true : false
									}
								>
									Add to cart
								</Button>
								<Button colorScheme='blue' onClick={onDetailedCourse}>
									Detail
								</Button>
							</Flex>
						</Flex>
					</Stack>
				</Flex>
			</Box>
			<Divider />
		</>
	)
}

export default AllCoursesCard
