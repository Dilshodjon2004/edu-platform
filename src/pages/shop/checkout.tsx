import { API_URL } from '@/config/api.config'
import { CardType } from '@/interfaces/constants.interface'
import { withLayout } from '@/layouts/layout'
import { CheckoutPageComponent } from '@/page-component'
import axios from 'axios'
import { GetServerSideProps } from 'next'

const CheckoutPage = ({ cards }) => {
	return <CheckoutPageComponent cards={cards} />
}

export default withLayout(CheckoutPage)

export const getServerSideProps: GetServerSideProps<
	CheckoutPageProps
> = async ({ req }) => {
	const { data } = await axios.get(`${API_URL}/customer/saved-cards`, {
		headers: {
			Authorization: `Bearer ${req.cookies.refresh}`,
		},
	})

	return {
		props: {
			cards: data,
		},
	}
}

interface CheckoutPageProps extends Record<string, unknown> {
	cards: CardType[]
}
