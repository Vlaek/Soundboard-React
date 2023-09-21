import { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
	IoPlayBackSharp,
	IoPlayForwardSharp,
	IoPlaySkipBackSharp,
	IoPlaySkipForwardSharp,
	IoPlaySharp,
	IoPauseSharp,
} from 'react-icons/io5'
import { IoMdVolumeHigh, IoMdVolumeOff, IoMdVolumeLow } from 'react-icons/io'
import { ITrack } from '../../../types/types'
import styles from './Controls.module.scss'
import Display from '../Display/Display'

interface ControlsProps {
	audioRef: React.RefObject<HTMLAudioElement>
	progressBarRef: React.RefObject<HTMLInputElement>
	duration: number
	setTimeProgress: (duration: number) => void
	tracks: ITrack[]
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	setCurrentTrack: (track: ITrack) => void
	progressRef: React.RefObject<HTMLDivElement>
	currentTrack: ITrack
	setDuration: React.Dispatch<React.SetStateAction<number>>
}

const Controls: FC<ControlsProps> = ({
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
}) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolume] = useState(60)
	const [muteVolume, setMuteVolume] = useState(false)

	const handleNext = () => {
		if (trackIndex >= tracks.length - 1) {
			setTrackIndex(0)
			setCurrentTrack(tracks[0])
		} else {
			setTrackIndex(prev => prev + 1)
			setCurrentTrack(tracks[trackIndex + 1])
		}
	}

	const togglePlayPause = () => {
		setIsPlaying(prev => !prev)
	}

	const playAnimationRef = useRef<number | null>(null)

	const repeat = useCallback(() => {
		const currentTime = audioRef.current?.currentTime
		if (currentTime) {
			setTimeProgress(currentTime)
		}
		if (progressBarRef.current && progressRef.current) {
			progressBarRef.current.value = String(currentTime)
			progressBarRef.current.style.setProperty(
				'--range-progress',
				`${(+progressBarRef.current.value / duration) * 100}%`,
			)
			progressRef.current.style.width = `${(+progressBarRef.current.value / duration) * 100}%`

			playAnimationRef.current = requestAnimationFrame(repeat)
		}
	}, [audioRef, duration, progressBarRef, setTimeProgress, progressRef])

	useEffect(() => {
		if (isPlaying) {
			audioRef.current?.play()
		} else {
			audioRef.current?.pause()
		}
		playAnimationRef.current = requestAnimationFrame(repeat)
	}, [isPlaying, audioRef, repeat])

	const skipForward = () => {
		if (audioRef.current) audioRef.current.currentTime += 10
	}

	const skipBackward = () => {
		if (audioRef.current) audioRef.current.currentTime -= 10
	}

	const handlePrevious = () => {
		if (trackIndex === 0) {
			const lastTrackIndex = tracks.length - 1
			setTrackIndex(lastTrackIndex)
			setCurrentTrack(tracks[lastTrackIndex])
		} else {
			setTrackIndex(prev => prev - 1)
			setCurrentTrack(tracks[trackIndex - 1])
		}
	}

	useEffect(() => {
		if (audioRef) {
			if (audioRef.current) {
				audioRef.current.volume = volume / 100
				audioRef.current.muted = muteVolume
			}
		}
	}, [volume, audioRef, muteVolume])

	return (
		<div className={styles.wrapper}>
			<div className={styles.controls}>
				<div className={styles.buttons}>
					<button onClick={handlePrevious}>
						<IoPlaySkipBackSharp />
					</button>
					<button onClick={skipBackward}>
						<IoPlayBackSharp />
					</button>

					<button onClick={togglePlayPause}>
						{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
					</button>
					<button onClick={skipForward}>
						<IoPlayForwardSharp />
					</button>
					<button onClick={handleNext}>
						<IoPlaySkipForwardSharp />
					</button>
				</div>
				<Display
					{...{
						currentTrack,
						audioRef,
						setDuration,
						progressBarRef,
						tracks,
						trackIndex,
						setTrackIndex,
						setCurrentTrack,
					}}
				/>
			</div>

			<div className={styles.volume}>
				<div className={styles.volumeContainer}>
					<button onClick={() => setMuteVolume(prev => !prev)}>
						{muteVolume || volume < 5 ? (
							<IoMdVolumeOff />
						) : volume < 40 ? (
							<IoMdVolumeLow />
						) : (
							<IoMdVolumeHigh />
						)}
					</button>
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
		</div>
	)
}

export default Controls
