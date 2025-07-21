import { API_URL } from '@/config/api.config'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { CardType } from '@/interfaces/constants.interface'
import { withLayout } from '@/layouts/layout'
import { CheckoutPageComponent } from '@/page-component'
import axios from 'axios'
import { GetServerSideProps } from 'next'

const CheckoutPage = ({ cards }) => {
	const { books, courses, product } = useTypedSelector(state => state.cart)

	const checkCard = () => books.length || courses.length || product.id

	return (
		<>
			{checkCard() ? <CheckoutPageComponent cards={cards} /> : <>Empty cart</>}
		</>
	)
}

export default withLayout(CheckoutPage)

export const getServerSideProps: GetServerSideProps<
	CheckoutPageProps
> = async ({ req }) => {
	if (!req.cookies.refresh) {
		return {
			redirect: {
				destination: '/auth',
				permanent: true,
			},
		}
	}

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
