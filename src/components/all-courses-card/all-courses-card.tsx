import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Stack,
	Text,
} from '@chakra-ui/react'
import { AllCoursesCardProps } from './all-courses-card.props'
import ReactStars from 'react-stars'
import { CiViewList } from 'react-icons/ci'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'
import { BsMinecartLoaded } from 'react-icons/bs'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AllCoursesCard = ({ course }: AllCoursesCardProps) => {
	const router = useRouter()

	const onDetailedCourse = () => router.push(`/courses/${course.slug}`)
	return (
		<>
			<Box py={4}>
				<Flex gap={4} direction={{ base: 'column', md: 'row' }}>
					<Image
						src={course.image}
						alt={course.title}
						w={{ base: '100%', md: '250px' }}
						h={'250px'}
						borderRadius={'lg'}
						objectFit={'cover'}
						cursor={'pointer'}
						onClick={onDetailedCourse}
					/>

					<Stack>
						<HStack>
							<Text color={'#e59819'}>{course.reviewAvarage.toFixed(1)}</Text>
							<ReactStars
								edit={false}
								value={course.reviewAvarage}
								color2='#e59819'
							/>
							<Text opacity={'.8'}>({course.reviewCount})</Text>
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
							<HStack align={'center'}>
								<Image
									src={course.author.avatar}
									alt={course.author.firstName}
									w={50}
									h={50}
									borderRadius={'full'}
								/>
								<Text>
									{course.author.firstName} {course.author.lastName[0]}
								</Text>
							</HStack>
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
								<Button rightIcon={<BsMinecartLoaded />} colorScheme='blue'>
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
