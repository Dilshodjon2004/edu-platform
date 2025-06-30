import { SectionAccordion, SectionForm } from '@/components'
import SectionTitle from '@/components/section-title/section-title'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	Accordion,
	Card,
	CardBody,
	Divider,
	Flex,
	HStack,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Skeleton,
	Stack,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { BsFillPlusCircleFill } from 'react-icons/bs'

const CurriculumPageComponent = () => {
	const { course } = useTypedSelector(state => state.instructor)
	const { isOpen, onOpen, onClose } = useDisclosure()
	const toast = useToast()
	const { getSection } = useActions()
	const { pendingSection, sections } = useTypedSelector(state => state.section)

	useEffect(() => {
		getSection({
			courseId: course?._id,
			callback: () => {
				toast({
					title: 'Sections fetched successfully',
					position: 'top-right',
					duration: 1500,
					isClosable: true,
				})
			},
		})
	}, [course])
	return (
		<>
			<Card>
				<CardBody p={0}>
					<HStack justify={'center'}>
						<Image
							width={480}
							height={480}
							src={'/images/curriculum.png'}
							alt='photo'
						/>
						<Stack>
							<SectionTitle
								title={course?.title as string}
								subtitle='Manage Curriculum for your course'
							/>
						</Stack>
					</HStack>
				</CardBody>
			</Card>

			<Card mt={10}>
				<CardBody>
					<Flex mb={5} justify={'space-between'} align={'center'}>
						<Text fontSize={'2xl'}>Create section</Text>
						<Icon
							as={BsFillPlusCircleFill}
							w={6}
							h={6}
							cursor={'pointer'}
							onClick={onOpen}
						/>
					</Flex>
					{pendingSection ? (
						<Stack>
							<Skeleton height='20px' />
							<Skeleton height='20px' />
							<Skeleton height='20px' />
						</Stack>
					) : (
						<Accordion allowToggle>
							{sections.map((section, index) => (
								<SectionAccordion key={index} section={section} />
							))}
						</Accordion>
					)}
				</CardBody>
			</Card>

			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Create section</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<ModalBody pb={5}>
						<SectionForm onClose={onClose} />
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	)
}

export default CurriculumPageComponent
