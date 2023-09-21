import { FC } from 'react'
import { data } from './data'
import Item from './Item/Item'
import classNames from 'classnames'
import styles from './Items.module.scss'
import { ITrack } from '../../types/types'

interface ItemsProps {
	likes: ITrack[]
	setLike: (like: ITrack) => void
	currentTrack: ITrack
	setCurrentTrack: (like: ITrack) => void
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
}

const Items: FC<ItemsProps> = ({
	likes,
	setLike,
	currentTrack,
	setCurrentTrack,
	isPlaying,
	setIsPlaying,
	setTrackIndex,
}) => {
	return (
		<div className={styles.items}>
			<div className={styles.buttons}>
				<div className={classNames(styles.button, styles.active)}>Главное</div>
				<div className={styles.button}>Коллекция</div>
				<div className={styles.button}>Для детей</div>
			</div>
			<div className={styles.info}>
				<div className={styles.id}>#</div>
				<div className={styles.name}>Название трека</div>
				<div className={styles.author}>Исполнитель</div>
			</div>
			{data.map((item, index) => (
				<Item
					key={item.id}
					item={item}
					index={index}
					like={likes.some(like => item === like)}
					likes={likes}
					setLike={setLike}
					currentTrack={currentTrack}
					setCurrentTrack={setCurrentTrack}
					isPlaying={isPlaying}
					setIsPlaying={setIsPlaying}
					setTrackIndex={setTrackIndex}
				/>
			))}
		</div>
	)
}

export default Items
