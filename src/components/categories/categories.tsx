import { categoryCarousel } from '@/config/carousel'
import SectionTitle from '../section-title/section-title'
import Carousel from 'react-multi-carousel'
import { categories } from '@/config/constants'
import { Box, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
const Categories = () => {
	const backgroundColor = useColorModeValue('gary.100', 'gray.900')
	const fill = useColorModeValue('#020288', 'gray.600')
	const { t } = useTranslation()
	return (
		<>
			<SectionTitle
				title={t('category_title', { ns: 'home' })}
				subtitle={t('category_description', { ns: 'home' })}
			/>
			<Carousel
				responsive={categoryCarousel}
				showDots={false}
				arrows={false}
				autoPlay={true}
				autoPlaySpeed={2000}
				infinite
			>
				{categories.map(category => (
					<Box
						minH={'200px'}
						mx={2}
						key={category.id}
						backgroundColor={backgroundColor}
						textAlign={'center'}
						padding={5}
						borderRadius={'lg'}
						cursor={'pointer'}
					>
						<Icon as={category.icon} w={20} h={20} fill={fill} />
						<Text mt={2} fontSize={'lg'}>
							{t(category.name, { ns: 'home' })}
						</Text>
					</Box>
				))}
			</Carousel>
		</>
	)
}

export default Categories
