import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
	uri: process.env.REACT_APP_GITHUB_API_URL,
	headers: {
		authorization: `Token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
	},
	cache: new InMemoryCache(),
})
