import { BalanceType } from '@/interfaces/instructor.interface'
import { withInstructorLayout } from '@/layouts/instructor'
import { InstructorRevenuePageComponent } from '@/page-component'
import { AuthService } from '@/services/auth.service'
import { PaymentService } from '@/services/payment.service'
import { GetServerSideProps, NextPage } from 'next'

const Revenue: NextPage<RevenuePageType> = ({ balance }) => {
	return <InstructorRevenuePageComponent balance={balance} />
}

export default withInstructorLayout(Revenue)

export const getServerSideProps: GetServerSideProps<RevenuePageType> = async ({
	req,
}) => {
	let balance
	const instructor = await AuthService.checkInstructor(req.cookies.refresh)

	if (!instructor) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		}
	} else {
		balance = await PaymentService.getInstructorBalancce(req.cookies.refresh)
	}

	return {
		props: { balance },
	}
}

interface RevenuePageType extends Record<string, unknown> {
	balance: BalanceType
}
