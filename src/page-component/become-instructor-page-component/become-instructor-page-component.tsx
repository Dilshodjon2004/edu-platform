import { ErrorAlert } from '@/components'
import SectionTitle from '@/components/section-title/section-title'
import TextField from '@/components/text-field/text-field'
import { teachValues } from '@/config/constants'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { LaunchCourseIcon, PlanCurriculumIcon, RecordVideoIcon } from '@/icons'
import { IInstructorApplyBody } from '@/store/instructor/instructor.interface'
import { InstructorValidation } from '@/validations/instructor.validation'
import {
	Box,
	Button,
	Card,
	CardBody,
	Divider,
	Flex,
	Grid,
	Heading,
	HStack,
	Icon,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
	useDisclosure,
	useToast,
} from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { GoVerified } from 'react-icons/go'

const BecomeInstructorPageComponent = () => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const { t } = useTranslation()
	const toast = useToast()
	const { applyInstructor, clearInstructorError } = useActions()
	const { error, isLoading } = useTypedSelector(state => state.instructor)

	const onSubmit = (formData: IInstructorApplyBody) => {
		applyInstructor({
			...formData,
			callback: () => {
				toast({
					title: 'Successfully sent',
					description: "We'll contact with you coming",
					isClosable: true,
					position: 'top-right',
					duration: 1500,
				})
				onClose()
			},
		})
	}
	return (
		<Stack spacing={16}>
			<Card>
				<CardBody>
					<HStack>
						<Stack px={5}>
							<SectionTitle
								textAlign={'center'}
								title={t('instructor_page_title', { ns: 'instructor' })}
								subtitle={t('instructor_page_description', {
									ns: 'instructor',
								})}
							/>
							<Button onClick={onOpen} h={14} colorScheme='blue'>
								{t('instructor_page_get_started', { ns: 'instructor' })}
							</Button>
						</Stack>
						<Image src='/images/instructor.png' alt='instructor photo' />
					</HStack>
				</CardBody>
			</Card>
			<Heading mt={10} textAlign={'center'}>
				{t('instructor_page_many_resaon', { ns: 'instructor' })}
			</Heading>
			<Grid gridTemplateColumns={'1fr 1fr 1fr'}>
				{teachValues.map((item, idx) => (
					<TeachValueCard key={idx} item={item} idx={idx} />
				))}
			</Grid>
			<Heading>{t('how_to_begin', { ns: 'instructor' })}</Heading>

			<Tabs isFitted variant={'enclosed'}>
				<TabList mb={'1em'}>
					<Tab>{t('how_to_begin_1', { ns: 'instructor' })}</Tab>
					<Tab>{t('how_to_begin_2', { ns: 'instructor' })}</Tab>
					<Tab>{t('how_to_begin_3', { ns: 'instructor' })}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						<HStack>
							<Stack w={'50%'}>
								<Text>{t('how_to_begin_1_text_1', { ns: 'instructor' })}</Text>
								<Text>{t('how_to_begin_1_text_2', { ns: 'instructor' })}</Text>
								<Text fontWeight={'bold'}>
									{t('how_we_help_you', { ns: 'instructor' })}
								</Text>
								<Text>{t('how_to_begin_1_text_3', { ns: 'instructor' })}</Text>
							</Stack>
							<Box w={'50%'}>
								<PlanCurriculumIcon />
							</Box>
						</HStack>
					</TabPanel>
					<TabPanel>
						<HStack>
							<Stack w={'50%'}>
								<Text>{t('how_to_begin_2_text_1', { ns: 'instructor' })}</Text>
								<Text>{t('how_to_begin_2_text_2', { ns: 'instructor' })}</Text>
								<Text fontWeight={'bold'}>
									{t('how_we_help_you', { ns: 'instructor' })}
								</Text>
								<Text>{t('how_to_begin_2_text_3', { ns: 'instructor' })}</Text>
							</Stack>
							<Box w={'50%'}>
								<RecordVideoIcon />
							</Box>
						</HStack>
					</TabPanel>
					<TabPanel>
						<HStack>
							<Stack w={'50%'}>
								<Text>{t('how_to_begin_3_text_1', { ns: 'instructor' })}</Text>
								<Text>{t('how_to_begin_3_text_2', { ns: 'instructor' })}</Text>
								<Text fontWeight={'bold'}>
									{t('how_we_help_you', { ns: 'instructor' })}
								</Text>
								<Text>{t('how_to_begin_3_text_3', { ns: 'instructor' })}</Text>
							</Stack>
							<Box w={'50%'}>
								<LaunchCourseIcon />
							</Box>
						</HStack>
					</TabPanel>
				</TabPanels>
			</Tabs>
			<Card>
				<CardBody>
					<Stack textAlign={'center'} w={'500px'} mx={'auto'}>
						<SectionTitle
							title={t('become_instructor_today', { ns: 'instructor' })}
							subtitle={t('become_instructor_today_descritpion', {
								ns: 'instructor',
							})}
						/>
						<Button onClick={onOpen} w={'full'} h={14} colorScheme='blue'>
							{t('instructor_page_get_started', { ns: 'instructor' })}
						</Button>
					</Stack>
				</CardBody>
			</Card>

			<Modal isOpen={isOpen} onClose={onClose} size={'4xl'} isCentered={true}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						{t('become_instructor_today', { ns: 'instructor' })}
					</ModalHeader>
					<ModalCloseButton />
					<Divider />
					<Formik
						onSubmit={onSubmit}
						initialValues={InstructorValidation.applyInstructorValue()}
						validationSchema={InstructorValidation.applyInstructorValidation}
					>
						<Form>
							<ModalBody>
								<Stack spacing={4}>
									{typeof error === 'string' && (
										<ErrorAlert
											title={error}
											clearHandler={clearInstructorError}
										/>
									)}
									<Flex gap={4}>
										<TextField
											name={'firstName'}
											label={t('first_name', { ns: 'global' })}
											placeholder='Ali'
											type='text'
										/>
										<TextField
											name={'lastName'}
											label={t('last_name', { ns: 'global' })}
											placeholder='Osman'
											type='text'
										/>
									</Flex>
									<TextField
										name='email'
										label={t('login_input_email_label', { ns: 'global' })}
										placeholder='info@sammi.ac'
										type='email'
									/>
									<TextField
										name='socialMedia'
										label={`${t('social_media', { ns: 'global' })} (YouTube)`}
										placeholder='Link to your lesson'
										type='text'
									/>
								</Stack>
							</ModalBody>
							<ModalFooter>
								<Button
									type='submit'
									colorScheme='blue'
									h={14}
									rightIcon={<GoVerified />}
									isLoading={isLoading}
									loadingText={`${t('loading', { ns: 'global' })}`}
								>
									{t('send_to_verify_btn', { ns: 'global' })}
								</Button>
							</ModalFooter>
						</Form>
					</Formik>
				</ModalContent>
			</Modal>
		</Stack>
	)
}

interface TeachValueCardProps {
	idx: number
	item: {
		title: string
		description: string
		icon: FC
	}
}

const TeachValueCard = ({ item, idx }: TeachValueCardProps) => {
	const { t } = useTranslation()
	return (
		<Stack key={idx} align={'center'} textAlign={'center'} p={4}>
			<Icon as={item.icon} fontSize={100} />
			<Text fontSize={20} fontWeight={'bold'}>
				{t(item.title, { ns: 'instructor' })}
			</Text>
			<Text>{t(item.description, { ns: 'instructor' })}</Text>
		</Stack>
	)
}

export default BecomeInstructorPageComponent
