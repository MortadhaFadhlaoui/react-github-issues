import React, { ReactElement } from 'react'
import styles from './load-more.module.css'
import { LoadMoreProps } from './load-more.props'

export const LoadMore = ({ onClick, disabled, title }: LoadMoreProps): ReactElement | null => {
	if (disabled) return null
	return (
		<div onClick={onClick} className={styles.wrapper}>
			{title}
		</div>
	)
}
