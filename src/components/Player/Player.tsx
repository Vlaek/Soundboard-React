import { FC, useRef, useState } from 'react'
import styles from './Player.module.scss'
import { data as tracks } from '../Items/data'
import Controls from './Controls/Controls'
import ProgressBar from './ProgressBar/ProgressBar'

const Player: FC = () => {
	const [trackIndex, setTrackIndex] = useState(0)
	const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex])
	const [timeProgress, setTimeProgress] = useState(0)
	const [duration, setDuration] = useState(0)

	const audioRef = useRef<HTMLAudioElement>(null)
	const progressBarRef = useRef<HTMLInputElement>(null)
	const progressRef = useRef<HTMLDivElement>(null)

	return (
		<div className={styles.player}>
			<ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration, progressRef }} />
			<Controls
				{...{
					audioRef,
					progressBarRef,
					duration,
					setTimeProgress,
					tracks,
					trackIndex,
					setTrackIndex,
					setCurrentTrack,
					progressRef,
					currentTrack,
					setDuration,
				}}
			/>
		</div>
	)
}

export default Player
