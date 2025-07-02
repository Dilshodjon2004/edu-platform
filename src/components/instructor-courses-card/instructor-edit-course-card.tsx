import { FC } from 'react'
import { InstructorCoursesCardProps } from './instructor-courses-card.props'
import {
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
import Image from 'next/image'
import { CiViewList } from 'react-icons/ci'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'
import { VscOpenPreview } from 'react-icons/vsc'
import { FiEdit2 } from 'react-icons/fi'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineStatusOnline } from 'react-icons/hi'
import { useRouter } from 'next/router'
import { loadImage } from '@/helpers/image.helper'
import { useActions } from '@/hooks/useActions'
import { useTranslation } from 'react-i18next'

const InstructorEditCourseCard: FC<InstructorCoursesCardProps> = ({
	item,
}): JSX.Element => {
	const router = useRouter()
	const toast = useToast()
	const { deleteCourse } = useActions()
	const { t } = useTranslation()

	const onDelete = () => {
		const isAgree = confirm('Are you sure?')
		if (isAgree) {
			deleteCourse({
				courseId: item._id,
				callback: () => {
					toast({
						title: t('successfully_deleted', { ns: 'instructor' }),
						description: item.title,
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
					router.replace(router.asPath)
				},
			})
		}
	}
	return (
		<HStack
			key={item.title}
			p={5}
			boxShadow={'dark-lg'}
			mt={5}
			borderRadius={'lg'}
		>
			<Stack spacing={5}>
				<Box pos={'relative'} w={'100%'} h={'300px'}>
					<Image
						fill
						src={loadImage(item.previewImage)}
						style={{ objectFit: 'cover', borderRadius: '10px' }}
						alt={item.title}
					/>
				</Box>
				<Text fontSize={'20px'} color={'facebook.500'} fontWeight={'bold'}>
					{item.level}
				</Text>
				<Heading>{item.title}</Heading>
				<HStack>
					<Flex align={'center'} gap={1}>
						<Icon as={CiViewList} />
						<Text>
							{item.lessonCount} {t('lessons', { ns: 'courses' })}
						</Text>
					</Flex>
					<Flex align={'center'} gap={1}>
						<Icon as={AiOutlineClockCircle} />
						<Text>
							{item.totalHour} {t('hour', { ns: 'courses' })}
						</Text>
					</Flex>
					<Flex align={'center'} gap={1}>
						<Icon as={SiGoogleanalytics} />
						<Text>{item.level}</Text>
					</Flex>
				</HStack>
				<Divider />
				<Flex flexWrap={'wrap'} gap={5}>
					<Button rightIcon={<VscOpenPreview />}>
						{t('preview', { ns: 'instructor' })}
					</Button>
					<Button
						rightIcon={<FiEdit2 />}
						onClick={() => router.push(`/instructor/edit-courses/${item.slug}`)}
					>
						{t('edit_course', { ns: 'instructor' })}
					</Button>
					<Button rightIcon={<BsTrash />} onClick={onDelete}>
						{t('delete_course', { ns: 'instructor' })}
					</Button>
					<Button
						rightIcon={<HiOutlineStatusOnline />}
						onClick={() => router.push(`/instructor/curriculum/${item.slug}`)}
					>
						Curriculum
					</Button>
				</Flex>
			</Stack>
		</HStack>
	)
}

export default InstructorEditCourseCard
