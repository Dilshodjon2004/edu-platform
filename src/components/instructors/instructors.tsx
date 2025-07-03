import {
	Box,
	Flex,
	Grid,
	GridItem,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import SectionTitle from '../section-title/section-title'
import { FaUserGraduate } from 'react-icons/fa'
import { AiOutlinePlayCircle } from 'react-icons/ai'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'

const Instructors = () => {
	const { t } = useTranslation()
	const { instructors } = useTypedSelector(state => state.instructor)
	return (
		<>
			<SectionTitle
				title={t('instructor_title', { ns: 'home' })}
				subtitle={t('instructor_description', { ns: 'home' })}
			/>

			<Grid
				gap={3}
				gridTemplateColumns={{
					base: 'repeat(1, 1fr)',
					md: 'repeat(2, 1fr)',
					xl: 'repeat(4, 1fr)',
				}}
				mt={5}
			>
				{instructors.map((item, index) => (
					<GridItem key={index}>
						<Stack spacing={3}>
							<Box position={'relative'} w={'full'} h={'330px'}>
								<Image
									src={item.avatar}
									alt={item.fullName}
									fill
									style={{ objectFit: 'cover', borderRadius: '8px' }}
								/>
							</Box>
							<Heading fontSize={'xl'}>{item.fullName}</Heading>
							<Text color={'gray.500'}>Software Engineer</Text>
							<HStack opacity={'.6'}>
								<Flex align={'center'} gap={1}>
									<Icon as={FaUserGraduate} />
									<Text>200 students</Text>
								</Flex>
								<Flex align={'center'} gap={1}>
									<Icon as={AiOutlinePlayCircle} />
									<Text>3 courses</Text>
								</Flex>
							</HStack>
						</Stack>
					</GridItem>
				))}
			</Grid>

			<Text align={'center'}>
				{t('instructor_link_title', { ns: 'home' })}{' '}
				<Box as='span' color={'teal'} _hover={{ textDecoration: 'underline' }}>
					<Link href={'/become-instructor'}>
						{t('instructor_link_router', { ns: 'home' })}
					</Link>
				</Box>
			</Text>
		</>
	)
}
export default Instructors

const data = [
	{
		firstName: 'Samar',
		lastName: 'Badrddinov',
		job: 'Software Engineer',
		students: 230,
		courses: 20,
		avatar:
			'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
	},
	{
		firstName: 'Samar',
		lastName: 'Badrddinov',
		job: 'Software Engineer',
		students: 230,
		courses: 20,
		avatar:
			'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
	},
	{
		firstName: 'Samar',
		lastName: 'Badrddinov',
		job: 'Software Engineer',
		students: 230,
		courses: 20,
		avatar:
			'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
	},
	{
		firstName: 'Samar',
		lastName: 'Badrddinov',
		job: 'Software Engineer',
		students: 230,
		courses: 20,
		avatar:
			'https://static.vecteezy.com/system/resources/thumbnails/027/951/137/small_2x/stylish-spectacles-guy-3d-avatar-character-illustrations-png.png',
	},
]
