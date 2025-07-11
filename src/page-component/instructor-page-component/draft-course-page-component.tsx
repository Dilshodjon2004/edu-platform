import { InstructorDraftCourseCard } from '@/components'
import SectionTitle from '@/components/section-title/section-title'
// import { courses } from '@/config/constants'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	Box,
	Card,
	CardBody,
	Grid,
	HStack,
	Stack,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

const DraftCoursePageComponent = () => {
	const { t } = useTranslation()
	const { courses } = useTypedSelector(state => state.instructor)
	return (
		<>
			<Card>
				<CardBody p={0}>
					<HStack justify={'center'}>
						<Stack>
							<SectionTitle
								title={t('draft_courses', { ns: 'instructor' })}
								subtitle={t('draft_courses_description', { ns: 'instructor' })}
							/>
						</Stack>
						<Image
							width={480}
							height={480}
							src='/images/draft.png'
							alt='instructor'
						/>
					</HStack>
				</CardBody>
			</Card>

			<Box mt={10}>
				<Tabs isFitted variant='enclosed'>
					<TabList mb='1em'>
						<Tab>{t('draft', { ns: 'instructor' })}</Tab>
						<Tab>{t('active', { ns: 'instructor' })}</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
								{courses
									.filter(c => !c.isActive)
									.map(item => (
										<InstructorDraftCourseCard key={item.slug} item={item} />
									))}
							</Grid>
						</TabPanel>
						<TabPanel>
							<Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
								{courses
									.filter(c => c.isActive)
									.map(item => (
										<InstructorDraftCourseCard key={item.slug} item={item} />
									))}
							</Grid>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	)
}

export default DraftCoursePageComponent
