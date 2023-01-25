import React from 'react'
import { format } from 'date-fns'
import Avatar from 'react-avatar'
import styles from './avatar.module.css'
import { AvatarProps } from './avatar.props'
import { statusColor } from '../../services/issues'
import { Filter } from '../filter/filter'

export const AvatarUser = ({ name, src, date, status }: AvatarProps) => {
	return (
		<div className={styles.avatarContainer}>
			<Avatar className={styles.avatar} round="100px" src={src} />
			<div>
				<h2 className={styles.name}>{name}</h2>
				{date && <p>{format(new Date(date), 'do MMMM Y')}</p>}
				{status && <Filter title={status.toString()} borderColor={statusColor(status)} />}
			</div>
		</div>
	)
}
