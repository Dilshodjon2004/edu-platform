import { IUserType } from '@/interfaces/user.interface'
import { withAdminLayout } from '@/layouts/admin'
import { AdminUserPageComponent } from '@/page-component'
import { AdminService } from '@/services/admin.service'
import { GetServerSideProps } from 'next'

const Users = () => {
	return <AdminUserPageComponent />
}

export default withAdminLayout(Users)

export const getServerSideProps: GetServerSideProps<UserPageType> = async ({
	req,
}) => {
	const users = await AdminService.getUsers('3', req.cookies.refresh)
	return {
		props: {
			users,
		},
	}
}

interface UserPageType extends Record<string, unknown> {
	users: IUserType[]
}
