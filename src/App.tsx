import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { IssueDetailScreen } from './screens/issue-detail/issue-detail'
import { IssuesScreen } from './screens/issues/issues'

function App() {
	return (
		<Routes>
			<Route path="/">
				<Route index element={<IssuesScreen />} />
				<Route path=":number" element={<IssueDetailScreen />} />
			</Route>
		</Routes>
	)
}

export default App
