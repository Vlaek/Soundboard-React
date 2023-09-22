import { FC, useRef, useState } from 'react'
import styles from './Player.module.scss'
import Controls from './Controls/Controls'
import ProgressBar from './ProgressBar/ProgressBar'
import { ITrack } from '../../types/types'
import { CSSTransition } from 'react-transition-group'

interface PlayerProps {
	currentTrack: ITrack | null
	setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack | null>>
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	tracks: ITrack[]
	likes: ITrack[]
	setLike: (like: ITrack) => void
}

const Player: FC<PlayerProps> = ({
	currentTrack,
	setCurrentTrack,
	trackIndex,
	setTrackIndex,
	isPlaying,
	setIsPlaying,
	tracks,
	likes,
	setLike,
}) => {
	const [timeProgress, setTimeProgress] = useState(0)
	const [duration, setDuration] = useState(0)

	const playerRef = useRef(null)
	const audioRef = useRef<HTMLAudioElement>(null)
	const progressBarRef = useRef<HTMLInputElement>(null)
	const progressRef = useRef<HTMLDivElement>(null)

	return (
		<CSSTransition
			in={Boolean(currentTrack)}
			timeout={300}
			nodeRef={playerRef}
			classNames={{
				enterDone: styles.player_enter_done,
				exit: styles.player_exit,
				exitActive: styles.player_exit_active,
			}}
		>
			<div className={styles.player} ref={playerRef}>
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
						setLike,
					}}
					isLike={likes.some(like => currentTrack?.id === like.id)}
				/>
			</div>
		</CSSTransition>
	)
}

export default Player
