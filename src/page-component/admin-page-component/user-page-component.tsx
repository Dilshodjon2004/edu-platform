import SectionTitle from '@/components/section-title/section-title'
import { courseusers } from '@/config/constants'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import {
	Box,
	Button,
	Card,
	CardBody,
	Heading,
	Input,
	Stack,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
} from '@chakra-ui/react'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai'
import { format } from 'date-fns'
import { useActions } from '@/hooks/useActions'
import Cookies from 'js-cookie'
import { ErrorAlert } from '@/components'

const UserPageComponent = () => {
	const [limit, setLimit] = useState<number>(4)
	const [query, setQuery] = useState<string>('')
	const [chartData, setChartData] = useState({
		labels: courseusers.map(data => data.year),
		datasets: [
			{
				label: 'Users Gained ',
				data: courseusers.map(data => data.userGain),
				backgroundColor: [
					'rgba(75,192,192,1)',
					'#50AF95',
					'#f3ba2f',
					'#2a71d0',
				],
				borderColor: 'black',
				borderWidth: 2,
			},
		],
	})

	const { users } = useTypedSelector(state => state.admin)
	const { t } = useTranslation()
	const { searchAdminUsers, moreAdminUsers, clearAdminError } = useActions()
	const { isLoading, error } = useTypedSelector(state => state.admin)

	const moreAdminUsersHandler = () => {
		setLimit(prev => prev + 1)
		const token = Cookies.get('refresh')
		moreAdminUsers({ limit: String(limit), token })
	}

	const searchUserHandler = () => {
		searchAdminUsers({ query, limit: String(limit) })
	}

	return (
		<>
			<Card>
				<CardBody>
					<Stack>
						<SectionTitle
							title={t('user_section_title', { ns: 'admin' })}
							subtitle={t('user_section_descr', { ns: 'admin' })}
						/>
						<Box className='chart-container'>
							<Line
								data={chartData}
								options={{
									plugins: {
										title: { display: false },
										legend: { display: false },
									},
								}}
							/>
						</Box>
					</Stack>
				</CardBody>
			</Card>
			<Box mt={10}>
				<Heading>{t('all_users', { ns: 'instructor' })}</Heading>
				<Box pos={'relative'} mt={5}>
					<Input
						h={14}
						w={'full'}
						bg={'white'}
						color={'gray.900'}
						placeholder={t('search_input_placeholder', { ns: 'courses' }) || ''}
						_placeholder={{ color: 'gray.500' }}
						value={query}
						onChange={e => setQuery(e.target.value)}
					/>
					<Button
						pos={'absolute'}
						right={2}
						top={2}
						colorScheme={'blue'}
						zIndex={999}
						onClick={searchUserHandler}
					>
						{t('search_input_btn', { ns: 'courses' })}
					</Button>
				</Box>
				{typeof error === 'string' && (
					<ErrorAlert title={error} clearHandler={clearAdminError} />
				)}
				<TableContainer mt={10}>
					<Table variant='striped' colorScheme='teal'>
						<TableCaption>
							<Button
								colorScheme={'facebook'}
								variant={'outline'}
								rightIcon={<AiOutlineReload />}
								isLoading={isLoading}
								onClick={moreAdminUsersHandler}
							>
								{t('more', { ns: 'instructor' })}...
							</Button>
						</TableCaption>
						<Thead>
							<Tr>
								<Th isNumeric>
									<AiOutlineFieldNumber fontSize={20} />
								</Th>
								<Th>{t('email', { ns: 'instructor' })}</Th>
								<Th>{t('full_name', { ns: 'instructor' })}</Th>
								<Th>{t('role', { ns: 'admin' })}</Th>
								<Th>{t('enrolled_date', { ns: 'instructor' })}</Th>
							</Tr>
						</Thead>
						<Tbody>
							{users.map((user, idx) => (
								<Tr key={idx}>
									<Td>{idx + 1}</Td>
									<Td>{user.email}</Td>
									<Td>{user.fullName || t('not_found', { ns: 'admin' })}</Td>
									<Td>{user.role || 'USER'}</Td>
									<Td>
										{user.createdAt &&
											format(new Date(user.createdAt), 'dd MMMM, yyyy')}
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	)
}

export default UserPageComponent
