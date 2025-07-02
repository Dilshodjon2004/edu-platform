import { SectionType } from '@/interfaces/instructor.interface'
import { Dispatch, SetStateAction } from 'react'

export interface SectionAccordionProps {
	section: SectionType
	setSectionData: Dispatch<SetStateAction<{ title: string; id: string } | null>>
	onOpen: () => void
	sectionIndex: number
}
