import { SectionType } from '@/interfaces/instructor.interface'

export interface ISectionInitialStateType {
	isLoading: boolean
	pendingSection: boolean
	error: string | null | unknown
	sections: SectionType[]
}

export interface ISectionBodyType {
	title?: string
	courseId?: string
	sectionId?: string
	callback: () => void
}
