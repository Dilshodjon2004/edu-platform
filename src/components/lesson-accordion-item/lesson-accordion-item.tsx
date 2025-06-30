import { Flex, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'
import { FiDelete } from 'react-icons/fi'

const LessonAccordionItem = ({ lesson }) => {
	return (
		<>
			<Flex
				py={3}
				w={'full'}
				cursor={'pointer'}
				justify={'space-between'}
				align={'center'}
				borderColor={useColorModeValue('gray.200', 'gray.600')}
			>
				<Flex align={'center'} gap={2} w={'80%'}>
					<Icon as={FaEdit} />
					<Text>{lesson.name}</Text>
				</Flex>
				<Flex gap={3}>
					<Icon as={FiDelete} cursor={'pointer'} />
				</Flex>
			</Flex>
		</>
	)
}

export default LessonAccordionItem
