import SectionTitle from '@/components/section-title/section-title'
import { coursesFilter } from '@/config/constants'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	Flex,
	Input,
	Radio,
	RadioGroup,
	Spinner,
	Stack,
	Text,
	useColorModeValue,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import ReactStars from 'react-stars'
import {
	FilterCourseType,
	FilterItemProps,
} from './courses-page-component.props'
import { AllCoursesCard } from '@/components'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ICourseType } from '@/interfaces/course.interface'
import { AppService } from '@/services/app.service'

const CoursesPageComponent = () => {
	const [filter, setFilter] = useState<FilterCourseType>({
		id: '',
		category: '',
	})
	const [allCourses, setAllCourses] = useState<ICourseType[]>([])
	const [isLoading, setIsLoading] = useState(false)

	const { t } = useTranslation()
	const { courses } = useTypedSelector(state => state.course)

	useEffect(() => {
		const getCoursesByLng = async (lng: string) => {
			setIsLoading(true)
			return await AppService.getCourses(lng)
		}

		if (filter.id == 'category') {
			setAllCourses(courses.filter(c => c.category === filter.category))
		} else if (filter.id == 'rating') {
			setAllCourses(
				courses.filter(c => c.reviewAvarage >= Number(filter.category))
			)
		} else if (filter.id == 'level') {
			setAllCourses(courses.filter(c => c.level == filter.category))
		} else if (filter.id == 'language') {
			getCoursesByLng(filter.category).then(res => {
				setIsLoading(false)
				setAllCourses(res)
			})
		}
	}, [filter])

	useEffect(() => {
		setAllCourses(courses)
	}, [courses])

	return (
		<>
			<SectionTitle
				title={t('title', { ns: 'courses' })}
				subtitle={t('description', { ns: 'courses' })}
			/>
			<Box pos={'relative'} mt={5}>
				<Input
					h={14}
					w={'full'}
					bg={'white'}
					color={'gray.900'}
					placeholder={
						t('search_input_placeholder', {
							ns: 'courses',
						}) || ''
					}
					_placeholder={{ color: 'gray.500' }}
				/>
				<Button
					pos={'absolute'}
					right={2}
					top={2}
					colorScheme={'blue'}
					zIndex={9}
				>
					{t('search_input_btn', { ns: 'courses' })}
				</Button>
			</Box>
			<Flex mt={5} gap={5} direction={{ base: 'column', xl: 'row' }}>
				<Box
					w={{ base: '100%', xl: '30%' }}
					h={'fit-content'}
					p={5}
					border={'1px'}
					borderRadius={'lg'}
					borderColor={useColorModeValue('gray.200', 'gray.700')}
				>
					{coursesFilter.map((item, idx) => (
						<FilterItem
							item={item}
							idx={idx}
							key={item.id}
							setFilter={setFilter}
						/>
					))}
				</Box>
				<Box w={{ base: '100%', xl: '70%' }}>
					{isLoading ? (
						<Flex h={'60vh'} justifyContent={'center'} alignItems={'center'}>
							<Spinner />
						</Flex>
					) : (
						<>
							{allCourses.map(item => (
								<AllCoursesCard key={item.title} course={item} />
							))}
						</>
					)}
				</Box>
			</Flex>
		</>
	)
}

export default CoursesPageComponent

const FilterItem = ({
	item,
	idx,
	setFilter,
}: {
	item: FilterItemProps
	idx: number
	setFilter: Dispatch<SetStateAction<FilterCourseType>>
}) => {
	const { t } = useTranslation()

	const renderFilterItem = () => (
		<>
			{item.categoryList.map((c, idx) => (
				<Radio
					colorScheme='blue'
					onChange={() => setFilter({ category: c.id, id: item.id })}
					value={c.id}
					key={idx}
				>
					<Flex gap={2}>
						{item.id === 'rating' && (
							<ReactStars value={Number(c.id)} edit={false} color2='#e59819' />
						)}
						{t(c.name, { ns: 'courses' })}
					</Flex>
				</Radio>
			))}
		</>
	)
	return (
		<Accordion allowToggle key={idx} defaultIndex={idx === 0 ? 0 : idx}>
			<AccordionItem borderTop={'none'}>
				<AccordionButton>
					<Text fontSize={'xl'} flex={'1'} textAlign={'left'}>
						{t(item.title, {
							ns: 'courses',
						})}
					</Text>
					<AccordionIcon />
				</AccordionButton>
				<AccordionPanel pb={4}>
					<RadioGroup>
						<Stack>{renderFilterItem()}</Stack>
					</RadioGroup>
				</AccordionPanel>
			</AccordionItem>
		</Accordion>
	)
}
