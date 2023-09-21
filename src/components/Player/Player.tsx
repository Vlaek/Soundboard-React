import { FC, useRef, useState } from 'react'
import styles from './Player.module.scss'
import { data as tracks } from '../Items/data'
import Controls from './Controls/Controls'
import ProgressBar from './ProgressBar/ProgressBar'
import { ITrack } from '../../types/types'

interface PlayerProps {
	currentTrack: ITrack
	setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack>>
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

const Player: FC<PlayerProps> = ({
	currentTrack,
	setCurrentTrack,
	trackIndex,
	setTrackIndex,
	isPlaying,
	setIsPlaying,
}) => {
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
					isPlaying,
					setIsPlaying,
				}}
			/>
		</div>
	)
}

export default Player
