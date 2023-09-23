import { FC } from 'react'
import styles from './ProgressBar.module.scss'

interface ProgressBarProps {
	progressBarRef: React.RefObject<HTMLInputElement>
	audioRef: React.RefObject<HTMLAudioElement | null>
	timeProgress: number
	duration: number
	progressRef: React.RefObject<HTMLDivElement>
}

const ProgressBar: FC<ProgressBarProps> = ({
	progressBarRef,
	audioRef,
	timeProgress,
	duration,
	progressRef,
}) => {
	const handleProgressChange = () => {
		if (audioRef.current && progressBarRef.current) {
			audioRef.current.currentTime = +progressBarRef.current.value
		}
	}

	const formatTime = (time: number) => {
		if (time && !isNaN(time)) {
			const minutes = Math.floor(time / 60)
			const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
			const seconds = Math.ceil(time % 60)
			const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
			return `${formatMinutes}:${formatSeconds}`
		}
		return '00:00'
	}

	return (
		<div className={styles.progressBar}>
			<div className={styles.progressContainer}>
				<div className={styles.progress} ref={progressRef}></div>
			</div>

			<span className={styles.currentTime}>{formatTime(timeProgress)}</span>
			<span className={styles.time}>{formatTime(duration + 1)}</span>
			<div className={styles.input}>
				<input type='range' ref={progressBarRef} defaultValue='0' onChange={handleProgressChange} />
			</div>
		</div>
	)
}

export default ProgressBar
