import Seo from '@/layouts/seo/seo'
import { AuthPageComponent } from '@/page-component'
import React from 'react'
import { useTranslation } from 'react-i18next'

const AuthPage = () => {
	const { t } = useTranslation()

	return (
		<Seo
			metaTitle={
				`Sammi | ${t('auth_page_title', { ns: 'seo' })}` || 'Sammi | Auth'
			}
			metaDescription={
				`Sammi | ${t('auth_page_description', { ns: 'seo' })}` ||
				'Login or create your account for using sammi platform'
			}
		>
			<AuthPageComponent />
		</Seo>
	)
}

export default AuthPage
