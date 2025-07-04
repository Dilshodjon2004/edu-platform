import { withAdminLayout } from '@/layouts/admin'
import { AdminUserPageComponent } from '@/page-component'

const Users = () => {
	return <AdminUserPageComponent />
}

export default withAdminLayout(Users)
