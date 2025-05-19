import SectionTitle from '@/components/section-title/section-title'
import {
	Button,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	Text,
	Textarea,
} from '@chakra-ui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

const ContactPageComponent = () => {
	const { t } = useTranslation()
	return (
		<Flex
			h={'90vh'}
			justify={'flex-start'}
			direction={{ base: 'column', lg: 'row' }}
			align={'center'}
			gap={4}
		>
			<SectionTitle
				w={{ base: '100%', lg: '40%' }}
				title={t('contact_title', { ns: 'global' })}
				subtitle={t('contact_description', { ns: 'global' })}
			/>
			<Card w={{ base: '100%', lg: '60%' }}>
				<CardBody>
					<Heading fontSize={'xl'}>
						{t('contact_heading', { ns: 'global' })}
					</Heading>
					<Text>{t('contact_text', { ns: 'global' })}</Text>
					<Stack spacing={4} mt={5}>
						<FormControl>
							<FormLabel>{t('contact_name', { ns: 'global' })}</FormLabel>
							<Input type='text' placeholder='Omar' h={14} />
						</FormControl>
						<FormControl>
							<FormLabel>{t('contact_email', { ns: 'global' })}</FormLabel>
							<Input type='text' placeholder='example@sammi.com' h={14} />
						</FormControl>
						<FormControl>
							<FormLabel>{t('contact_message', { ns: 'global' })}</FormLabel>
							<Textarea placeholder='body' h={'150px'} />
						</FormControl>
						<Button colorScheme='blue' h={14} w={'full'}>
							{t('contact_btn', { ns: 'global' })}
						</Button>
					</Stack>
				</CardBody>
			</Card>
		</Flex>
	)
}

export default ContactPageComponent
