import {
	Box,
	Card,
	CardBody,
	Container,
	Divider,
	Heading,
} from '@chakra-ui/react'
import Header from './header'
import Sidebar from './sidebar'
import { useTypedSelector } from '@/hooks/useTypedSelector'

const DashboardPageComponent = () => {
	const { lesson } = useTypedSelector(state => state.lesson)
	return (
		<>
			<Header />
			<Box display={{ base: 'none', lg: 'block' }}>
				<Sidebar
					position={'fixed'}
					top={'12vh'}
					right={'2vh'}
					bottom={'2vh'}
					w={'400px'}
				/>
			</Box>
			<Box
				mt={'12vh'}
				marginRight={{ base: 2, lg: '450px' }}
				marginLeft={{ base: 2, lg: 5 }}
			>
				<Container maxW={'container.lg'}>
					<Card>
						<CardBody>
							<Box
								dangerouslySetInnerHTML={{
									__html: lesson.embedVideo,
								}}
							/>
						</CardBody>
					</Card>

					<Heading mt={5} as={'h2'}>
						{lesson.name}
					</Heading>
					<Divider mt={5} />
					<Box
						mb={10}
						mt={5}
						css={{
							a: { color: 'teal', textDecoration: 'underline' },
							li: { listStyle: 'none' },
						}}
						dangerouslySetInnerHTML={{
							__html: lesson.material,
						}}
					/>
					<Box display={{ base: 'block', lg: 'none' }}>
						<Sidebar
							display={'block'}
							pos={'relative'}
							width={'100%'}
							mb={10}
						/>
					</Box>
				</Container>
			</Box>
		</>
	)
}

export default DashboardPageComponent
