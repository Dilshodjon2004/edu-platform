import SectionTitle from '@/components/section-title/section-title'
import { Button, Grid, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const AboutPageComponent = () => {
	const { t } = useTranslation()
	return (
		<>
			<SectionTitle
				textAlign={'center'}
				title={t('about_title', { ns: 'global' })}
				subtitle={t('about_descrption', { ns: 'global' })}
			/>

			<Grid
				gridTemplateColumns={{ base: '100%', lg: '50% 50%' }}
				mt={10}
				gap={5}
			>
				<Image src={'/images/about.png'} alt='about.png' />
				<Stack justifySelf={'center'} spacing={4} alignSelf={'center'}>
					<Heading>{t('about_heading', { ns: 'global' })}</Heading>
					<Text>{t('about_text_1', { ns: 'global' })}</Text>
					<Text>{t('about_text_2', { ns: 'global' })}</Text>
					<Button colorScheme='blue' variant={'outline'} w={'fit-content'}>
						{t('about_btn', { ns: 'global' })}
					</Button>
				</Stack>
			</Grid>
		</>
	)
}

export default AboutPageComponent
