import React, { ReactElement } from 'react'
import styles from './search.module.css'
import { SearchProps } from './search.props'

export const Search = ({ onChange }: SearchProps): ReactElement => {
	return <input className={styles.search} type="text" onChange={onChange} placeholder="Search by the title ..." />
}
