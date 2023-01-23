import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import styles from './card.module.css'
import { CardProps } from './card.props'

export const Card = ({ title, borderColor }: CardProps): ReactElement => {
	return (
		<motion.div className={styles.wrapper} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
			<div
				className={styles.circle}
				style={{
					borderColor,
				}}></div>
			<h3 className={styles.title}>{title}</h3>
		</motion.div>
	)
}
