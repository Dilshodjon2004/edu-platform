import {
	Button,
	ButtonGroup,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	useToast,
} from '@chakra-ui/react'
import { FC } from 'react'
import { AiOutlineFieldNumber, AiOutlineReload } from 'react-icons/ai'
import { AdminInstructorTableProps } from './admin-instructor-table.props'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import ErrorAlert from '../error-alert/error-alert'

const AdminInstructorTable: FC<AdminInstructorTableProps> = ({
	instructors,
	approved,
}): JSX.Element => {
	const { t } = useTranslation()
	const router = useRouter()
	const toast = useToast()
	const { approveInstructor, deleteInstructor, clearAdminError } = useActions()
	const { isLoading, error } = useTypedSelector(state => state.admin)

	const approveInstructorHandler = (instructorId: string) => {
		approveInstructor({
			instructorId,
			callback: () => {
				router.replace(router.asPath)
				toast({
					title: t('successfully_approve', { ns: 'admin' }),
					status: 'success',
					position: 'top-right',
					isClosable: true,
					duration: 1500,
				})
			},
		})
	}

	const deleteInstructorHandler = (instructorId: string) => {
		deleteInstructor({
			instructorId,
			callback: () => {
				router.replace(router.asPath)
				toast({
					title: t('successfully_deleted', { ns: 'instructor' }),
					status: 'info',
					position: 'top-right',
					isClosable: true,
					duration: 1500,
				})
			},
		})
	}
	return (
		<TableContainer>
			<Table variant='striped' colorScheme='teal'>
				<TableCaption>
					<Button
						colorScheme={'facebook'}
						variant={'outline'}
						rightIcon={<AiOutlineReload />}
					>
						{t('more', { ns: 'instructor' })}...
					</Button>
				</TableCaption>
				{typeof error === 'string' && (
					<ErrorAlert title={error} clearHandler={clearAdminError} />
				)}
				<Thead>
					<Tr>
						<Th isNumeric>
							<AiOutlineFieldNumber fontSize={20} />
						</Th>
						<Th>{t('email', { ns: 'instructor' })}</Th>
						<Th>{t('full_name', { ns: 'instructor' })}</Th>
						<Th>{t('job', { ns: 'admin' })}</Th>
						<Th>{t('social_media', { ns: 'admin' })}</Th>
						<Th>{t('actions', { ns: 'admin' })}</Th>
					</Tr>
				</Thead>
				<Tbody>
					{instructors.map((instructor, idx) => (
						<Tr key={idx}>
							<Td>{idx + 1}</Td>
							<Td>{instructor.author.email}</Td>
							<Td>{instructor.author.fullName}</Td>
							<Td>{instructor.author.job}</Td>
							<Td>{instructor.socialMedia}</Td>
							<Td>
								<ButtonGroup variant='outline'>
									{approved ? (
										<Button
											size={'sm'}
											colorScheme={'red'}
											isLoading={isLoading}
											onClick={() => deleteInstructorHandler(instructor._id)}
										>
											{t('del', { ns: 'admin' })}
										</Button>
									) : (
										<Button
											size={'sm'}
											colorScheme='blue'
											isLoading={isLoading}
											onClick={() => approveInstructorHandler(instructor._id)}
										>
											{t('appr', { ns: 'admin' })}
										</Button>
									)}
								</ButtonGroup>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</TableContainer>
	)
}

export default AdminInstructorTable
