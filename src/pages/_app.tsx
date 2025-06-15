import '@/styles/globals.css'
import '@fontsource/roboto'
import 'react-multi-carousel/lib/styles.css'
import 'nprogress/nprogress.css'

import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { theme } from '@/config/theme'
import { I18nextProvider } from 'react-i18next'
import i18n from '@/i18n'
import NProgress from 'nprogress'
import { Client, HydrationProvider } from 'react-hydration-provider'
import Router from 'next/router'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store/store'
import AuthProvider from '@/provider/auth.provider'

NProgress.configure({ showSpinner: false })

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	useEffect(() => {
		const handleStart = () => NProgress.start()
		const handleStop = () => NProgress.done()

		Router.events.on('routeChangeStart', handleStart)
		Router.events.on('routeChangeComplete', handleStop)
		Router.events.on('routeChangeError', handleStop)

		return () => {
			Router.events.off('routeChangeStart', handleStart)
			Router.events.off('routeChangeComplete', handleStop)
			Router.events.off('routeChangeError', handleStop)
		}
	}, [])
	return (
		<HydrationProvider>
			<Provider store={store}>
				<SessionProvider session={session}>
					<I18nextProvider i18n={i18n}> 
						<ChakraProvider theme={theme}>
							<Client>
								<AuthProvider>
									<Component {...pageProps} />
								</AuthProvider>
							</Client>
						</ChakraProvider>
					</I18nextProvider>
				</SessionProvider>
			</Provider>
		</HydrationProvider>
	)
}
