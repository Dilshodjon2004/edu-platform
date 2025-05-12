import { sponsorshipCarousel } from '@/config/carousel'
import SectionTitle from '../section-title/section-title'
import Carousel from 'react-multi-carousel'
import { trustedCompany } from '@/config/constants'
import { Icon } from '@chakra-ui/react'
const Sponsorship = () => {
	return (
		<>
			<SectionTitle
				title=''
				subtitle="Trusted by the world's best"
				textAlign={'center'}
			/>
			<Carousel responsive={sponsorshipCarousel} arrows={false} showDots={false} infinite autoPlay={true} autoPlaySpeed={1000}>
				{trustedCompany.map((item, index) => (
					<Icon key={index} as={item} fontSize={80} />
				))}
			</Carousel>
		</>
	)
}

export default Sponsorship
