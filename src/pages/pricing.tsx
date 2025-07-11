import { withLayout } from '@/layouts/layout'
import Seo from '@/layouts/seo/seo'
import { PricingPageComponent } from '@/page-component'
import React from 'react'
import { useTranslation } from 'react-i18next'

const PricingPage = () => {
	const { t } = useTranslation()

	return (
		<Seo
			metaTitle={
				`Sammi | ${t('pricing_page_title', { ns: 'seo' })}` ||
				'Sammi | Pricing Package'
			}
			metaDescription={
				`Sammi | ${t('pricing_page_description', { ns: 'seo' })}` ||
				'The best package for using and doing lesson on sammi academy'
			}
		>
			<PricingPageComponent />
		</Seo
	)
}

export default withLayout(PricingPage)
