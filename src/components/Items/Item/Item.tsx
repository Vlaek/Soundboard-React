import { FC } from 'react'
import { AiOutlineHeart, AiFillHeart, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { MdExplicit } from 'react-icons/md'
import styles from './Item.module.scss'
import cn from 'classnames'
import { ITrack } from '../../../types/types'

interface ItemProps {
	item: ITrack
	index: number
	like: boolean
	likes: ITrack[]
	setLike: (like: ITrack) => void
	currentTrack: ITrack | null
	setCurrentTrack: (like: ITrack) => void
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
}

const Item: FC<ItemProps> = ({
	item,
	index,
	like,
	setLike,
	currentTrack,
	setCurrentTrack,
	isPlaying,
	setIsPlaying,
	setTrackIndex,
}) => {
	const handleClick = (item: ITrack) => {
		if (currentTrack !== item) {
			setCurrentTrack(item)
			setTrackIndex(item.id)
			setIsPlaying(true)
		} else {
			setIsPlaying(!isPlaying)
		}
	}

	return (
		<div className={styles.item} onClick={() => handleClick(item)}>
			<div className={styles.idContainer}>
				<div className={styles.idIsFocused}>
					{item.id === currentTrack?.id ? (
						isPlaying ? (
							<AiFillPauseCircle className={styles.play} />
						) : (
							<AiFillPlayCircle className={cn(styles.play, styles.active)} />
						)
					) : (
						<AiFillPlayCircle className={styles.play} />
					)}
				</div>
				<div className={styles.idIsNotFocused}>
					{item.id === currentTrack?.id ? (
						isPlaying ? (
							<div className={styles.is_play}></div>
						) : (
							<AiFillPlayCircle className={styles.play} />
						)
					) : (
						<div className={styles.id}>{index + 1}</div>
					)}
				</div>
			</div>
			<div className={styles.name} title={item.name}>
				{item.name}
			</div>
			<div className={styles.last_column}>
				<div className={styles.author} title={item.author}>
					{item.author}
				</div>
				<div
					className={styles.info}
					style={{ opacity: item.explicit ? '1' : '0' }}
					title={
						item.explicit
							? 'Может содержать информацию, не предназначенную для несовершеннолетних'
							: ''
					}
				>
					<MdExplicit />
				</div>
				<div
					className={styles.like}
					onClick={e => {
						e.stopPropagation()
						setLike(item)
					}}
					title={
						like
							? 'Вам нравится этот трек, а еще он добавлен в раздел "Коллекция"'
							: 'Добавьте трек в раздел "Коллекция"'
					}
				>
					{like ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
				<div className={styles.duration}>{item.duration}</div>
			</div>
		</div>
	)
}

export default Item
