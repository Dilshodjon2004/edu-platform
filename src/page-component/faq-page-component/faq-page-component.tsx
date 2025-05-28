import SectionTitle from '@/components/section-title/section-title'
import { faq } from '@/config/constants'
import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Card,
	CardBody,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const FaqPageComponent = () => {
	const { t } = useTranslation()
	return (
		<>
			<SectionTitle
				title={t('faq_title', { ns: 'global' })}
				subtitle=''
				textAlign={'center'}
			/>
			<Box mt={5} minH={'89vh'} maxW={'container.md'} mx={'auto'}>
				<Card boxShadow={'dark-lg'}>
					<CardBody>
						{faq.map((item, index) => (
							<Accordion
								mt={5}
								key={index}
								defaultIndex={index === 0 ? 0 : index}
								allowToggle
							>
								<AccordionItem borderBottom={'none'}>
									<AccordionButton>
										<Box
											as='span'
											flex={'1'}
											fontSize={'lg'}
											textAlign={'left'}
										>
											{t(item.question, { ns: 'global' })}
										</Box>
										<AccordionIcon color={'blue.500'} />
									</AccordionButton>
									<AccordionPanel
										pl={10}
										borderLeft={'4px'}
										borderLeftColor={'blue.500'}
									>
										{t(item.answer, { ns: 'global' })}
									</AccordionPanel>
								</AccordionItem>
							</Accordion>
						))}
					</CardBody>
				</Card>
			</Box>
		</>
	)
}

export default FaqPageComponent
