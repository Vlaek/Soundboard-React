import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { ITrack } from '../../../types/types'
import styles from './Controls.module.scss'
import Display from '../Display/Display'
import Buttons from '../Buttons/Buttons'
import Volume from './../Volume/Volume'

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
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
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
	isPlaying,
	setIsPlaying,
}) => {
	const [volume, setVolume] = useState(10)
	const [muteVolume, setMuteVolume] = useState(false)

	const togglePlayPause = useCallback(() => {
		setIsPlaying(prev => !prev)
	}, [setIsPlaying])

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

	const handleNext = useCallback(() => {
		if (trackIndex >= tracks.length - 1) {
			setTrackIndex(0)
			setCurrentTrack(tracks[0])
		} else {
			setTrackIndex(prev => prev + 1)
			setCurrentTrack(tracks[trackIndex + 1])
		}
	}, [setCurrentTrack, setTrackIndex, trackIndex, tracks])

	const handlePrevious = () => {
		if (trackIndex === 0) {
			const lastTrackIndex = tracks.length - 1
			setTrackIndex(lastTrackIndex)
			setCurrentTrack(tracks[lastTrackIndex])
		} else {
			setTrackIndex(prev => prev - 1)
			setCurrentTrack(tracks[trackIndex - 1])
		}
		if (!isPlaying) {
			setIsPlaying(true)
		}
	}

	const skipForward = useCallback(() => {
		if (audioRef.current) {
			if (duration <= audioRef.current.currentTime + 5) {
				handleNext()
			} else {
				audioRef.current.currentTime += 10
			}
		}
	}, [audioRef, duration, handleNext])

	const skipBackward = useCallback(() => {
		if (audioRef.current) audioRef.current.currentTime -= 5
	}, [audioRef])

	useEffect(() => {
		if (audioRef) {
			if (audioRef.current) {
				audioRef.current.volume = volume / 100
				audioRef.current.muted = muteVolume
			}
		}
	}, [volume, audioRef, muteVolume])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					skipForward()
					break
				case 'ArrowLeft':
					skipBackward()
					break
				case ' ': {
					e.preventDefault()
					togglePlayPause()
					break
				}
				default:
					return
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [skipBackward, skipForward, togglePlayPause])

	return (
		<div className={styles.wrapper}>
			<div className={styles.controls}>
				<Buttons
					{...{
						handleNext,
						handlePrevious,
						skipForward,
						skipBackward,
						togglePlayPause,
						isPlaying,
					}}
				/>
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
			<Volume
				{...{
					volume,
					setVolume,
					muteVolume,
					setMuteVolume,
				}}
			/>
		</div>
	)
}

export default Controls
