import { AdminCourseCard, ErrorAlert } from '@/components'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Box, Card, CardBody, Flex, Grid, HStack, Text } from '@chakra-ui/react'
import SectionTitle from 'src/components/section-title/section-title'
import { LaunchCourseIcon } from 'src/icons'

const CoursesPageComponent = () => {
	const { courses, error } = useTypedSelector(state => state.admin)
	const { clearAdminError } = useActions()

	return (
		<>
			<Card mt={10}>
				<CardBody>
					<HStack>
						<Box w={'30%'}>
							<SectionTitle
								title='Courses'
								subtitle='All courses and managing on platform'
							/>
						</Box>
						<Flex w={'70%'} justify={'flex-end'}>
							<LaunchCourseIcon />
						</Flex>
					</HStack>
				</CardBody>
			</Card>
			{typeof error === 'string' && (
				<ErrorAlert title={error} clearHandler={clearAdminError} />
			)}
			<Grid gridTemplateColumns={'repeat(3, 1fr)'} gap={4}>
				{courses.map(course => (
					<AdminCourseCard course={course} key={course._id} />
				))}
			</Grid>
		</>
	)
}

export default CoursesPageComponent
