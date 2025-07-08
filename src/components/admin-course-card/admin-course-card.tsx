import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Flex,
	Heading,
	Stack,
	Text,
	useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { FC } from 'react'
import { BsTrash } from 'react-icons/bs'
import { VscOpenPreview } from 'react-icons/vsc'
import { loadImage } from 'src/helpers/image.helper'
import { AdminCourseCardProps } from './admin-course-card.props'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'

const AdminCourseCard: FC<AdminCourseCardProps> = ({ course }): JSX.Element => {
	const { deleteAdminCourse } = useActions()
	const { isLoading } = useTypedSelector(state => state.admin)
	const toast = useToast()
	const { t } = useTranslation()

	const deleteCourseHandler = () => {
		const isAgree = confirm('Are you sure you want to delete this course?')

		if (isAgree) {
			deleteAdminCourse({
				courseId: course._id,
				callback: () => {
					toast({
						title: t('successfully_deleted', { ns: 'instructor' }),
						duration: 1500,
						isClosable: true,
						position: 'top-right',
					})
				},
			})
		}
	}
	return (
		<Box p={5} boxShadow={'dark-lg'} mt={5} borderRadius={'lg'}>
			<Stack spacing={2}>
				<Box pos={'relative'} w={'100%'} h={'200px'}>
					<Image
						fill
						src={loadImage(course.previewImage)}
						style={{ objectFit: 'cover', borderRadius: '10px' }}
						alt={course.title}
					/>
				</Box>
				<Heading fontSize={'xl'}>{course.title}</Heading>
				<Divider />
				<Flex
					align={'center'}
					gap={2}
					fontSize={'16px'}
					color={'blue.200'}
					fontWeight={'bold'}
				>
					{t('language', { ns: 'instructor' })}: {course.language}
				</Flex>
				<Text fontWeight={'bold'} color={'blue.500'}>
					{t('status', { ns: 'instructor' })}:{' '}
					<Box as={'span'} color={course.isActive ? 'green.500' : 'red.500'}>
						{course.isActive ? 'Active' : 'Draft'}
					</Box>
				</Text>
				<ButtonGroup>
					<Button
						w={'full'}
						rightIcon={<VscOpenPreview />}
						colorScheme={'blue'}
					>
						{t('preview', { ns: 'instructor' })}
					</Button>
					<Button
						w={'full'}
						colorScheme={'red'}
						rightIcon={<BsTrash />}
						onClick={deleteCourseHandler}
						isLoading={isLoading}
					>
						{t('delete_course', { ns: 'instructor' })}
					</Button>
				</ButtonGroup>
			</Stack>
		</Box>
	)
}

export default AdminCourseCard
