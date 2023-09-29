import { FC, memo, useEffect, useState } from 'react'
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io'
import styles from './Volume.module.scss'

interface VolumeProps {
	audioRef: React.RefObject<HTMLAudioElement>
}

const Volume: FC<VolumeProps> = memo(({ audioRef }) => {
	const [volume, setVolume] = useState(50)
	const [muteVolume, setMuteVolume] = useState(false)

	useEffect(() => {
		if (audioRef) {
			if (audioRef.current) {
				audioRef.current.volume = volume / 100
				audioRef.current.muted = muteVolume
			}
		}
	}, [volume, audioRef, muteVolume])

	return (
		<div className={styles.volume}>
			<button
				className={styles.button}
				onClick={() => setMuteVolume(prev => !prev)}
				title='Громкость'
			>
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
					<div className={styles.percent}>{volume}</div>
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
