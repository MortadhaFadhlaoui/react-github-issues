import React, { ReactElement } from 'react'
import { motion } from 'framer-motion'
import styles from './card.module.css'
import { CardProps } from './card.props'
import { AvatarUser } from '../avatar/avatar'

export const Card = ({ title, src, name, onClick, date, status }: CardProps): ReactElement => {
	return (
		<motion.div
			onClick={onClick}
			className={styles.wrapper}
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}>
			<AvatarUser date={date} name={name} src={src} status={status} />
			<h3 className={styles.title}>{title}</h3>
		</motion.div>
	)
}
