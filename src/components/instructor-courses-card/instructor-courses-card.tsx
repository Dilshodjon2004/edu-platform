import { FC } from 'react'
import { InstructorCoursesCardProps } from './instructor-courses-card.props'
import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	HStack,
	Icon,
	Stack,
	Text,
} from '@chakra-ui/react'
import { CiViewList } from 'react-icons/ci'
import { AiOutlineClockCircle } from 'react-icons/ai'
import { SiGoogleanalytics } from 'react-icons/si'
import { VscOpenPreview } from 'react-icons/vsc'
import Image from 'next/image'
import { loadImage } from '@/helpers/image.helper'
import { useTranslation } from 'react-i18next'

const InstructorCoursesCard: FC<InstructorCoursesCardProps> = ({
	item,
}): JSX.Element => {
	const { t } = useTranslation()
	return (
		<HStack
			key={item.title}
			p={5}
			boxShadow={'dark-lg'}
			mt={5}
			borderRadius={'lg'}
		>
			<Stack spacing={5} w={'70%'}>
				<Text fontSize={'20px'} color={'facebook.500'} fontWeight={'bold'}>
					{item.level}
				</Text>
				<Heading>{item.title}</Heading>
				<HStack>
					<Flex align={'center'} gap={1}>
						<Icon as={CiViewList} />
						<Text>
							{item.lessonCount} {t('lessons', { ns: 'courses' })}
						</Text>
					</Flex>
					<Flex align={'center'} gap={1}>
						<Icon as={AiOutlineClockCircle} />
						<Text>
							{item.totalHour} {t('hour', { ns: 'courses' })}
						</Text>
					</Flex>
					<Flex align={'center'} gap={1}>
						<Icon as={SiGoogleanalytics} />
						<Text>{item.level}</Text>
					</Flex>
				</HStack>
				<Divider />
				<HStack>
					<Button
						rightIcon={<VscOpenPreview />}
						w={'full'}
						h={16}
						colorScheme='blue'
					>
						{t('preview', { ns: 'instructor' })}
					</Button>
				</HStack>
			</Stack>
			<Box w={'30%'} h={'300px'} position={'relative'}>
				<Image
					fill
					src={loadImage(item.previewImage)}
					alt={item.title}
					style={{ objectFit: 'cover', borderRadius: '10px' }}
				/>
			</Box>
		</HStack>
	)
}

export default InstructorCoursesCard
