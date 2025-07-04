import { withAdminLayout } from '@/layouts/admin'
import { AdminBooksPageComponent } from '@/page-component'

const Books = () => {
	return <AdminBooksPageComponent />
}

export default withAdminLayout(Books)
