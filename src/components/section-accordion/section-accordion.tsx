import {
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Button,
	Center,
	Collapse,
	Flex,
	Icon,
	List,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdDelete, MdEdit } from 'react-icons/md'
import LessonAccordionItem from '../lesson-accordion-item/lesson-accordion-item'
import LessonForm from '../lesson-form/lesson-form'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import ErrorAlert from '../error-alert/error-alert'
import { SectionAccordionProps } from './section-accordion.props'
import { DragEvent } from 'react'
import { useTranslation } from 'react-i18next'

const SectionAccordion = ({
	section,
	setSectionData,
	onOpen,
	sectionIndex,
}: SectionAccordionProps) => {
	const { t } = useTranslation()
	const toast = useToast()
	const { isOpen, onToggle } = useDisclosure()
	const { deleteSection, clearSectionError, dragSection } = useActions()
	const { error, isLoading, sections } = useTypedSelector(
		state => state.section
	)
	const { course } = useTypedSelector(state => state.instructor)

	const onDelete = () => {
		const isAgree = confirm('Are you sure?')

		if (isAgree) {
			deleteSection({
				sectionId: section._id,
				courseId: course?._id,
				callback: () => {
					toast({
						title: t('successfully_deleted', { ns: 'instructor' }),
						position: 'top-right',
						duration: 1500,
						isClosable: true,
					})
				},
			})
		}
	}

	const onEditSection = () => {
		onOpen()
		setSectionData({ title: section.title, id: section._id })
	}

	const onDragStartSection = (e: DragEvent<HTMLButtonElement>) => {
		e.dataTransfer.setData('sectionIndex', String(sectionIndex))
	}

	const onDropSection = (e: DragEvent<HTMLButtonElement>) => {
		const movingSectionIndex = Number(e.dataTransfer.getData('sectionIndex'))
		const allSections = [...sections]
		const movingItem = allSections[movingSectionIndex]
		allSections.splice(movingSectionIndex, 1)
		allSections.splice(sectionIndex, 0, movingItem)
		const editedIndex = allSections.map(c => c._id)
		dragSection({
			sections: editedIndex,
			courseId: course?._id,
			callback: () => {},
		})
	}
	return (
		<AccordionItem>
			{typeof error === 'string' && (
				<ErrorAlert title={error} clearHandler={clearSectionError} />
			)}
			<AccordionButton
				h={14}
				p={2}
				fontWeight={'bold'}
				cursor={isLoading ? 'progress' : 'pointer'}
				draggable
				onDragStart={onDragStartSection}
				onDrop={onDropSection}
			>
				<Flex w={'100%'} align={'center'} justify={'space-between'}>
					<Flex align={'center'} gap={2}>
						<Icon as={AiOutlineMenu} w={5} h={5} />
						{section.title}
					</Flex>
					<Flex fontSize={'15px'} align={'center'} gap={3}>
						<Icon as={MdEdit} w={5} h={5} onClick={onEditSection} />
						<Icon as={MdDelete} w={5} h={5} onClick={onDelete} />
						<AccordionIcon />
					</Flex>
				</Flex>
			</AccordionButton>
			<AccordionPanel pb={4}>
				<List onDragOver={e => e.preventDefault()}>
					{section.lessons.map((lesson, index) => (
						<LessonAccordionItem
							key={lesson._id}
							lessonIndex={index}
							lesson={lesson}
							sectionId={section._id}
						/>
					))}
				</List>
				<Center>
					<Button
						variant={'unstyled'}
						color={'blue.200'}
						_hover={{ textDecoration: 'underline' }}
						onClick={onToggle}
					>
						{isOpen
							? t('close_form', { ns: 'instructor' })
							: t('create_lesson', { ns: 'instructor' })}
					</Button>
				</Center>
				<Collapse in={isOpen} animateOpacity>
					<LessonForm sectionId={section._id} onToggle={onToggle} />
				</Collapse>
			</AccordionPanel>
		</AccordionItem>
	)
}

export default SectionAccordion
