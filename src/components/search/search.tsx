import React, { ReactElement, useState } from 'react'
import styles from './search.module.css'
import { SearchProps } from './search.props'

export const Search = ({ onChange, placeholder }: SearchProps): ReactElement => {
	const [searchTerm, setSearchTerm] = useState('')
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (searchTerm !== '' && event.key === 'Enter') {
			onChange(searchTerm)
		}
	}

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const searchTerm = e.target.value
		setSearchTerm(searchTerm)
		if (searchTerm === '') {
			onChange(searchTerm)
		}
	}

	return (
		<input
			className={styles.search}
			value={searchTerm}
			onChange={handleOnChange}
			type="text"
			onKeyDown={handleKeyDown}
			placeholder={placeholder}
		/>
	)
}
