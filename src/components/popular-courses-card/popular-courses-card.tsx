import {
	Avatar,
	Box,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import { PopularCoursesCardProps } from './popular-courses-card.props'
import ReactStars from 'react-stars'
import { CiViewList } from 'react-icons/ci'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'

const PopularCoursesCard = ({ item }: PopularCoursesCardProps) => {
	return (
		<Stack key={item.title} spacing={3} p={3} cursor={'pointer'}>
			<Box position={'relative'} w={'full'} h={'210px'}>
				<Image
					src={loadImage(item.previewImage)}
					alt={item.title}
					fill
					style={{ objectFit: 'cover', borderRadius: '10px' }}
				/>
			</Box>
			<HStack>
				<Text color={'#e59819'}>10</Text>
				<ReactStars edit={false} value={5} color2={'#e59819'} />
				<Text opacity={'.8'}>(3)</Text>
			</HStack>
			<Heading fontSize={'xl'}>{item.title}</Heading>
			<HStack gap={1}>
				<Flex align={'center'} gap={1}>
					<Icon as={CiViewList} />
					<Text>{item.lessonCount} Lessons</Text>
				</Flex>
				<Flex align={'center'} gap={1}>
					<Icon as={AiOutlineClockCircle} />
					<Text>{item.totalHour} Hours</Text>
				</Flex>
				<Flex align={'center'} gap={1}>
					<Icon as={SiGoogleanalytics} />
					<Text>{item.level}</Text>
				</Flex>
			</HStack>
			<Divider />
			<Flex justifyContent={'space-between'} align={'center'}>
				<HStack align={'center'}>
					<Avatar src={item.author.avatar} name={item.author.fullName} />
					<Text>{item.author.fullName}</Text>
				</HStack>
				<Text>
					{item.price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</Text>
			</Flex>
		</Stack>
	)
}

export default PopularCoursesCard
