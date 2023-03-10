import React, { ReactElement } from 'react'
import styles from './filter.module.css'
import { FilterProps } from './filter.props'
import { capitalize } from '../../utils/functions/functions'

export const Filter = ({ title, isActive, borderColor, onClick }: FilterProps): ReactElement => {
	return (
		<div
			className={styles.wrapper}
			onClick={onClick}
			style={{
				backgroundColor: isActive !== undefined ? `${isActive ? 'gray' : 'white'}` : undefined,
			}}>
			<div
				className={styles.circle}
				style={{
					borderColor,
				}}></div>
			<h3 className={styles.title}>{capitalize(title)}</h3>
		</div>
	)
}
