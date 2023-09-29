import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	AiOutlineHeart,
	AiFillHeart,
	AiFillPlayCircle,
	AiFillPauseCircle,
} from 'react-icons/ai'
import { MdExplicit } from 'react-icons/md'
import styles from './Item.module.scss'
import cn from 'classnames'
import { ITrack } from '../../../types/types'
import { RootState } from '../../../store/store'
// import { setTrackIndex } from './../../../store/actions/trackIndex'
import { setLike } from './../../../store/actions/likes'
// import { setCurrentTrack } from './../../../store/actions/currentTrack'
import {
	setPlaying,
	setCurrentTrack,
	setTrackIndex,
} from './../../../store/actions/player'

interface ItemProps {
	item: ITrack
	index: number
}

const Item: FC<ItemProps> = ({ item, index }) => {
	const dispatch = useDispatch()

	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
	const isLiked = useSelector((state: RootState) =>
		state.likes.some(like => like.id === item.id),
	)
	const currentTrack = useSelector(
		(state: RootState) => state.player.currentTrack,
	)

	const handleClick = (item: ITrack) => {
		if (currentTrack !== item) {
			dispatch(setCurrentTrack(item))
			dispatch(setTrackIndex(item.id))
			dispatch(setPlaying(true))
		} else {
			dispatch(setPlaying(!isPlaying))
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
						dispatch(setLike(item))
					}}
					title={
						isLiked
							? 'Вам нравится этот трек, а еще он добавлен в раздел "Коллекция"'
							: 'Добавьте трек в раздел "Коллекция"'
					}
				>
					{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
				</div>
				<div className={styles.duration}>{item.duration}</div>
			</div>
		</div>
	)
}

export default Item
