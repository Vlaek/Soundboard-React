import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from 'store/types'
import styles from './Display.module.scss'

const Display: FC = memo(() => {
	const currentTrack = useSelector(
		(state: RootState) => state.player.currentTrack,
	)
	return (
		<div className={styles.wrapper}>
			{currentTrack && (
				<>
					<div className={styles.img}>
						<img
							src={`./img/${currentTrack.author}.png`}
							alt=''
							draggable={false}
						/>
					</div>
					<div className={styles.text}>
						<p className={styles.name}>{currentTrack && currentTrack.name}</p>
						<p className={styles.author}>
							{currentTrack && currentTrack.author}
						</p>
					</div>
				</>
			)}
		</div>
	)
})

export default Display
