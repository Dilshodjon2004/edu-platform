import { InstructorDraftCourseCard } from '@/components'
import SectionTitle from '@/components/section-title/section-title'
import { courses } from '@/config/constants'
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

const DraftCoursePageComponent = () => {
	return (
		<>
			<Card>
				<CardBody p={0}>
					<HStack justify={'center'}>
						<Stack>
							<SectionTitle
								title='Draft courses'
								subtitle='Manage your draft courses and activated it'
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
						<Tab>Draft</Tab>
						<Tab>Active</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
								{courses
									.map(item => (
										<InstructorDraftCourseCard
											key={item.slug}
											item={item}
											status={'Draft'}
										/>
									))
									.splice(2, 4)}
							</Grid>
						</TabPanel>
						<TabPanel>
							<Grid gridTemplateColumns={'1fr 1fr'} gap={4}>
								{courses.map(item => (
										<InstructorDraftCourseCard
											key={item.slug}
											item={item}
											status={'Active'}
										/>
									))
									.splice(0, 2)}
							</Grid>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</>
	)
}

export default DraftCoursePageComponent
