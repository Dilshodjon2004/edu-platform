import {
	Collapse,
	Flex,
	Icon,
	Text,
	useColorModeValue,
	useDisclosure,
} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { FiDelete } from 'react-icons/fi'
import { LessonAccordionItemProps } from './lesson-accordion-item.props'
import LessonForm from '../lesson-form/lesson-form'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { DragEvent } from 'react'
import { LessonType, SectionType } from '@/interfaces/instructor.interface'

const LessonAccordionItem = ({
	lesson,
	sectionId,
	lessonIndex,
}: LessonAccordionItemProps) => {
	const { isOpen, onToggle } = useDisclosure()
	const { deleteLesson, getSection, editSection } = useActions()
	const { isLoading } = useTypedSelector(state => state.lesson)
	const { course } = useTypedSelector(state => state.instructor)
	const { sections } = useTypedSelector(state => state.section)

	const onDeleteLesson = () => {
		const isAgree = confirm('Are you sure?')

		if (isAgree) {
			deleteLesson({
				lessonId: lesson._id,
				sectionId: sectionId,
				callback: () => {
					getSection({ courseId: course?._id, callback: () => {} })
				},
			})
		}
	}

	const onDragStartLesson = (e: DragEvent<HTMLDivElement>) => {
		e.dataTransfer.setData('lessonIndex', String(lessonIndex))
	}

	const onDropLesson = (e: DragEvent<HTMLDivElement>) => {
		const movingLessonIndex = Number(e.dataTransfer.getData('lessonIndex'))
		const currentSection = sections.find(
			c => c._id === sectionId
		) as SectionType
		const allLessons = [...currentSection.lessons] as LessonType[]
		const movingItem = allLessons[movingLessonIndex]
		allLessons.splice(movingLessonIndex, 1)
		allLessons.splice(lessonIndex, 0, movingItem)
		const editedIndex = allLessons.map(c => c._id)
		editSection({
			sectionId,
			lessons: editedIndex,
			callback: () => {
				getSection({ courseId: course?._id, callback: () => {} })
			},
		})
	}

	return (
		<>
			<Flex
				draggable
				onDragStart={onDragStartLesson}
				onDrop={onDropLesson}
				py={3}
				w={'full'}
				cursor={isLoading ? 'progress' : 'pointer'}
				justify={'space-between'}
				align={'center'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
			>
				<Flex align={'center'} gap={2} w={'80%'}>
					<Icon as={FaEdit} onClick={onToggle} />
					<Text>{lesson.name}</Text>
				</Flex>
				<Flex gap={3}>
					<Icon as={FiDelete} cursor={'pointer'} onClick={onDeleteLesson} />
				</Flex>
			</Flex>
			<Collapse in={isOpen} animateOpacity>
				<LessonForm values={lesson} />
			</Collapse>
		</>
	)
}

export default LessonAccordionItem
