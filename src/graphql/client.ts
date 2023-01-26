import { ApolloClient, InMemoryCache } from '@apollo/client'
import { REACT_APP_GITHUB_API_URL } from '../utils/constants'

export const client = new ApolloClient({
	uri: REACT_APP_GITHUB_API_URL,
	headers: {
		authorization: `Token ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
	},
	cache: new InMemoryCache(),
})
