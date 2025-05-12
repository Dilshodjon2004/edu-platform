import { sponsorshipCarousel } from '@/config/carousel'
import SectionTitle from '../section-title/section-title'
import Carousel from 'react-multi-carousel'
import { trustedCompany } from '@/config/constants'
import { Icon } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
const Sponsorship = () => {
	const { t } = useTranslation()
	return (
		<>
			<SectionTitle
				title=''
				subtitle={t('sponsor_title', { ns: 'home' })}
				textAlign={'center'}
			/>
			<Carousel
				responsive={sponsorshipCarousel}
				arrows={false}
				showDots={false}
				infinite
				autoPlay={true}
				autoPlaySpeed={1000}
			>
				{trustedCompany.map((item, index) => (
					<Icon key={index} as={item} fontSize={80} />
				))}
			</Carousel>
		</>
	)
}

export default Sponsorship
