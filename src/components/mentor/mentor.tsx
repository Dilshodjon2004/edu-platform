import { useTypedSelector } from '@/hooks/useTypedSelector'
import { Avatar, Box, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BsPlayCircle } from 'react-icons/bs'
import { FaStar, FaUserGraduate } from 'react-icons/fa'

const Mentor = () => {
	const { t } = useTranslation()
	const { course } = useTypedSelector(state => state.course)
	return (
		<>
			<Heading mt={5}>{t('mentor', { ns: 'courses' })}</Heading>
			<Flex mt={5} gap={5} align={'center'}>
				<Avatar
					display={{ base: 'none', md: 'block' }}
					src={course?.author.avatar}
					name={course?.author.fullName}
					size={'2xl'}
				/>
				<Box>
					<Text fontWeight={'bold'} fontSize={'20px'}>
						{course?.author.fullName}
					</Text>
					<Text>{course?.author.job}</Text>
					<Stack
						direction={{ base: 'column', md: 'row' }}
						mt={2}
						gap={2}
						align={{ base: 'flex-start', md: 'center' }}
					>
						<Flex align={'center'} gap={1}>
							<Icon as={FaStar} color={'blue.500'} />
							<Text as={'span'}>4.8 Reyting</Text>
						</Flex>
						<Flex align={'center'} gap={1}>
							<Icon as={FaUserGraduate} color={'blue.500'} />
							<Text as={'span'}>+1,000 O'quvchi</Text>
						</Flex>
						<Flex align={'center'} gap={1}>
							<Icon as={BsPlayCircle} color={'blue.500'} />
							<Text as={'span'}>10 Kurslar</Text>
						</Flex>
					</Stack>
				</Box>
			</Flex>
			<Text mt={4}>
				<Box as='span' fontWeight={'bold'} color={'blue.500'}>
					{course?.author.fullName}
				</Box>{' '}
				- Sammi platformasi asoschisi hamda Amerika, Tunis, va Rossiya
				davlatlarida bir nechta Startup loyihalarda ishtirok etgan. Hozirgi
				kunda Amerikadagi sug'urta kompaniyasida ishlaydi.
			</Text>
			<Text mt={4}>
				<Box as='span' fontWeight={'bold'} color={'blue.500'}>
					Stack
				</Box>{' '}
				- O'z tajribam davomida men bir nechta stacklardan foydalanganman,
				MERN(TypeScript, NextJS), Angular, VueJS, AWS, React Native.Ushbu
				platformaning asosiy maqsadi o'z bilimlarimni bo'lishish.
			</Text>
		</>
	)
}

export default Mentor
