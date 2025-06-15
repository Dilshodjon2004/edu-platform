import { getAuthUrl } from '@/config/api.config'
import { AuthService } from '@/services/auth.service'
import { IAuthUserResponse } from '@/store/user/user.interface'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { serialize } from 'cookie'
import $axios from '@/api/axios'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	return NextAuth(req, res, {
		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID as string,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			}),
			GithubProvider({
				clientId: process.env.GITHUB_CLIENT_ID as string,
				clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
			}),
		],
		secret: process.env.NEXT_PUBLIC_SECRET_AUTH,
		callbacks: {
			async signIn({ user }) {
				if (user) {
					const email = user.email as string
					const checkUser = await AuthService.checkUser(email)

					if (checkUser === 'user') {
						const response = await $axios.post<IAuthUserResponse>(
							`${getAuthUrl('login')}`,
							{
								email,
								password: '',
							}
						)
						res.setHeader('Set-Cookie', [
							serialize('access', response.data.accessToken, {
								secure: true,
								path: '/',
							}),
							serialize('refresh', response.data.refreshToken, {
								secure: true,
								path: '/',
							}),
						])
					} else if (checkUser === 'not-user') {
						const response = await $axios.post<IAuthUserResponse>(
							`${getAuthUrl('register')}`,
							{
								email,
								password: '',
							}
						)

						res.setHeader('Set-Cookie', [
							serialize('access', response.data.accessToken, {
								secure: true,
								path: '/',
							}),
							serialize('refresh', response.data.refreshToken, {
								secure: true,
								path: '/',
							}),
						])
					}
					return true
				}
				return false
			},
		},
	})
}
