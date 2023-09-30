import { FC, memo } from 'react'
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io'
import styles from './Volume.module.scss'
import { RootState } from 'store/types'
import { useSelector, useDispatch } from 'react-redux'
import { setMute, setVolume } from './../../../store/actions/player'

const Volume: FC = memo(() => {
	const dispatch = useDispatch()

	const volume = useSelector((state: RootState) => state.player.volume)
	const isMute = useSelector((state: RootState) => state.player.isMute)

	return (
		<div className={styles.volume} onClick={e => e.stopPropagation()}>
			<button
				className={styles.button}
				onClick={() => dispatch(setMute(!isMute))}
				title='Громкость'
			>
				{isMute || volume === 0 ? (
					<IoMdVolumeOff />
				) : volume < 40 ? (
					<IoMdVolumeLow />
				) : (
					<IoMdVolumeHigh />
				)}
			</button>
			<div className={styles.volumeContainer}>
				<div className={styles.inputContainer}>
					<div className={styles.percent}>{volume}</div>
					<input
						type='range'
						min={0}
						max={100}
						value={volume}
						onChange={e => dispatch(setVolume(+e.target.value))}
						style={{
							background: `linear-gradient(to right, #d5ac05 ${volume}%, #777 ${volume}%)`,
						}}
					/>
				</div>
			</div>
		</div>
	)
})

export default Volume
