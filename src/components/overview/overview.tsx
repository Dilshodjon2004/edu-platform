import { Box, Flex, Grid, Heading, Icon, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsCheck } from 'react-icons/bs'
import { GoDotFill } from 'react-icons/go'
const Overview = () => {
	const { t } = useTranslation()

	const whatYouLearn = 'AJAX, React, Chakra UI, NodeJS, Redux'.split(', ')
	const required =
		'Basic HTML, CSS, SASS, JavaScript, SASS, Advanced API'.split(', ')
	return (
		<>
			<Heading mt={10}>{t('overview', { ns: 'courses' })}</Heading>
			<Text>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum sequi
				perspiciatis totam tempore recusandae quia sed maiores consectetur. Qui
				quam praesentium ex maiores quaerat fuga.
			</Text>
			<Heading mt={10}>{t('what_you_will_learn', { ns: 'courses' })}</Heading>
			<Grid
				mt={5}
				gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
			>
				{whatYouLearn.map((text, idx) => (
					<Flex key={idx} gap={3} align={'center'}>
						<Icon as={BsCheck} w={6} h={6} borderRadius={'100%'} p={1} />
						<Text>{text}</Text>
					</Flex>
				))}
			</Grid>
			<Heading mt={10}>{t('required', { ns: 'courses' })}</Heading>
			<Box mt={3}>
				{required.map((text, idx) => (
					<Flex key={idx} gap={3} align={'center'}>
						<Icon as={GoDotFill} w={5} h={5} />
						<Text>{text}</Text>
					</Flex>
				))}
			</Box>
		</>
	)
}

export default Overview
