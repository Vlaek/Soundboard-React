import { FC, memo } from 'react'
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io'
import styles from './Volume.module.scss'

interface VolumeProps {
	volume: number
	setVolume: React.Dispatch<React.SetStateAction<number>>
	muteVolume: boolean
	setMuteVolume: React.Dispatch<React.SetStateAction<boolean>>
}

const Volume: FC<VolumeProps> = memo(({ volume, setVolume, muteVolume, setMuteVolume }) => {
	return (
		<div className={styles.volume}>
			<button className={styles.btn_volume} onClick={() => setMuteVolume(prev => !prev)}>
				{muteVolume || volume === 0 ? (
					<IoMdVolumeOff />
				) : volume < 40 ? (
					<IoMdVolumeLow />
				) : (
					<IoMdVolumeHigh />
				)}
			</button>
			<div className={styles.volumeContainer}>
				<div className={styles.inputContainer}>
					<input
						type='range'
						min={0}
						max={100}
						value={volume}
						onChange={e => setVolume(+e.target.value)}
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
