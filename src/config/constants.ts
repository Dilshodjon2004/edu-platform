import {
	AnnouncementIcons,
	CodingIcons,
	DesignIcons,
	LaptopIcons,
	PersonIcons,
	PrintIcons,
} from '@/icons'
import {
	AiFillAmazonCircle,
	AiOutlineDashboard,
	AiOutlineDollar,
} from 'react-icons/ai'
import { CiViewList } from 'react-icons/ci'
import {
	FaApplePay,
	FaBookReader,
	FaDraftingCompass,
	FaQuestionCircle,
} from 'react-icons/fa'
import { MdImportContacts, MdOutlineContactMail } from 'react-icons/md'
import { SiAmd, SiCisco, SiLogitech, SiSpotify } from 'react-icons/si'

export const navigation = [
	{
		title: 'General',
		links: [
			{
				label: 'Explore',
				route: '/',
				icon: AiOutlineDashboard,
			},
			{
				label: 'Courses',
				route: '/courses',
				icon: CiViewList,
			},
			{
				label: 'Books',
				route: '/books',
				icon: FaBookReader,
			},
			{
				label: 'Articles',
				route: '/articles',
				icon: MdImportContacts,
			},
		],
	},
	{
		title: 'Pages',
		links: [
			{
				label: 'About',
				route: '/about',
				icon: FaDraftingCompass,
			},
			{
				label: 'Contact',
				route: '/contact',
				icon: MdOutlineContactMail,
			},
			{
				label: 'Pricing',
				route: '/pricing',
				icon: AiOutlineDollar,
			},
			{
				label: 'FAQ',
				route: '/faq',
				icon: FaQuestionCircle,
			},
		],
	},
]

export const categories = [
	{
		name: 'Creative Design',
		id: 1,
		icon: DesignIcons,
	},
	{
		name: 'Sales Marketing',
		id: 2,
		icon: AnnouncementIcons,
	},
	{
		name: 'Development IT',
		id: 3,
		icon: CodingIcons,
	},
	{
		name: 'Engineering Architecture',
		id: 4,
		icon: PrintIcons,
	},
	{
		name: 'Personl Development',
		id: 5,
		icon: PersonIcons,
	},
	{
		name: 'Finance Accounting',
		id: 6,
		icon: LaptopIcons,
	},
]

export const trustedCompany = [
	AiFillAmazonCircle,
	SiAmd,
	SiCisco,
	FaApplePay,
	SiLogitech,
	SiSpotify,
]
