import { ICourseType } from '@/interfaces/course.interface'
import { withLayout } from '@/layouts/layout'
import Seo from '@/layouts/seo/seo'
import { DetailedCourseComponent } from '@/page-component'
import { AppService } from '@/services/app.service'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

const DetailedCoursePage = () => {
	const router = useRouter()

	return (
		<Seo metaTitle={`Sammi course | ${router.query.slug}`}>
			<DetailedCourseComponent />
		</Seo>
	)
}

export default withLayout(DetailedCoursePage)

export const getServerSideProps: GetServerSideProps<MainPageProps> = async ({
	query,
}) => {
	const course = await AppService.getDetailedCourse(query.slug as string)

	return {
		props: { course },
	}
}

interface MainPageProps {
	course: ICourseType
}
