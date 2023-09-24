import { FC, useRef, useState } from 'react'
import styles from './Player.module.scss'
import Controls from './Controls/Controls'
import ProgressBar from './ProgressBar/ProgressBar'
import { ITrack } from '../../types/types'
import { CSSTransition } from 'react-transition-group'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

interface PlayerProps {
	tracks: ITrack[]
}

const Player: FC<PlayerProps> = ({ tracks }) => {
	const currentTrack = useSelector((state: RootState) => state.currentTrack)

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
						progressRef,
						setDuration,
					}}
				/>
			</div>
		</CSSTransition>
	)
}

export default Player
