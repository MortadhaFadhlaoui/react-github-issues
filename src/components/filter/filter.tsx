import React, { ReactElement } from 'react'
import styles from './filter.module.css'
import { FilterProps } from './filter.props'
import { capitalize, randomColor } from '../../utils/function'

export const Filter = ({ title, isActive, onClick }: FilterProps): ReactElement => {
	const borderColor = randomColor()

	return (
		<div className={styles.wrapper} onClick={onClick} style={{ backgroundColor: `${isActive ? 'lavender' : 'white'}` }}>
			<div
				className={styles.circle}
				style={{
					borderColor,
				}}></div>
			<h3 className={styles.title}>{capitalize(title)}</h3>
		</div>
	)
}
