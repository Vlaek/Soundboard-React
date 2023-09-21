import { FC, useState } from 'react'
import { AiOutlineHeart, AiFillHeart, AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
import { MdExplicit } from 'react-icons/md'
import styles from './Item.module.scss'
import { ITrack } from '../../../types/types'

interface ItemProps {
	item: ITrack
	index: number
	like: boolean
	likes: ITrack[]
	setLike: (like: ITrack) => void
	currentTrack: ITrack | null
	setCurrentTrack: (like: ITrack) => void
}

const Item: FC<ItemProps> = ({ item, index, like, setLike, currentTrack, setCurrentTrack }) => {
	const [isFocused, setIsFocused] = useState<boolean>(false)
	const active = true

	const handleClick = (item: ITrack) => {
		new Audio(`/tracks/${item.file}`).play()
		setCurrentTrack(item)
		console.log(currentTrack)
	}

	return (
		<div
			className={styles.item}
			onClick={() => handleClick(item)}
			onMouseEnter={() => setIsFocused(true)}
			onMouseLeave={() => setIsFocused(false)}
		>
			<div className={styles.id}>
				{isFocused ? (
					active ? (
						<AiFillPauseCircle className={styles.play} />
					) : (
						<AiFillPlayCircle className={styles.play} />
					)
				) : active ? (
					<div className={styles.is_play}></div>
				) : (
					index + 1
				)}
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
