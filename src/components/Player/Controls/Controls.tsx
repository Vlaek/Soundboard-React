import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { IoRepeatOutline, IoShuffle, IoCloseSharp } from 'react-icons/io5'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { ITrack } from '../../../types/types'
import Display from '../Display/Display'
import Buttons from '../Buttons/Buttons'
import Volume from './../Volume/Volume'
import cn from 'classnames'
import styles from './Controls.module.scss'

interface ControlsProps {
	audioRef: React.RefObject<HTMLAudioElement>
	progressBarRef: React.RefObject<HTMLInputElement>
	duration: number
	setTimeProgress: (duration: number) => void
	tracks: ITrack[]
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	setCurrentTrack: React.Dispatch<React.SetStateAction<ITrack | null>>
	progressRef: React.RefObject<HTMLDivElement>
	currentTrack: ITrack | null
	setDuration: React.Dispatch<React.SetStateAction<number>>
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	isLike: boolean
	setLike: (like: ITrack) => void
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
	isLike,
	setLike,
}) => {
	const [volume, setVolume] = useState(10)
	const [muteVolume, setMuteVolume] = useState(false)

	const [isRandom, setIsRandom] = useState(false)
	const [isRepeat, setIsRepeat] = useState(false)

	const playAnimationRef = useRef<number | null>(null)

	const togglePlayPause = useCallback(() => {
		setIsPlaying(prev => !prev)
	}, [setIsPlaying])

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

	const getRandomTrack = useCallback(() => {
		let randomIndex

		do {
			randomIndex = Math.floor(Math.random() * tracks.length)
		} while (randomIndex === trackIndex)

		setTrackIndex(randomIndex)
		setCurrentTrack(tracks[randomIndex])
	}, [setCurrentTrack, setTrackIndex, trackIndex, tracks])

	const handleNext = useCallback(() => {
		if (trackIndex >= tracks.length - 1) {
			setTrackIndex(0)
			setCurrentTrack(tracks[0])
		} else {
			if (isRandom) {
				getRandomTrack()
			} else {
				setTrackIndex(prev => prev + 1)
				setCurrentTrack(tracks[trackIndex + 1])
			}
		}
	}, [getRandomTrack, isRandom, setCurrentTrack, setTrackIndex, trackIndex, tracks])

	const handleRepeat = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0
			audioRef.current.play()
		}
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
						handleNext,
						isRepeat,
						handleRepeat,
					}}
				/>
			</div>
			<div className={styles.right}>
				<button
					className={cn(styles.button, { [styles.active]: isLike })}
					onClick={() => {
						currentTrack && setLike(currentTrack)
					}}
				>
					{isLike ? <AiFillHeart /> : <AiOutlineHeart />}
				</button>
				<button
					className={cn(styles.button, { [styles.active]: isRepeat })}
					onClick={() => setIsRepeat(!isRepeat)}
					title='Повторять'
				>
					<IoRepeatOutline />
				</button>

				<button
					className={cn(styles.button, { [styles.active]: isRandom })}
					onClick={() => setIsRandom(!isRandom)}
					title='В случайном порядке'
				>
					<IoShuffle />
				</button>

				<Volume
					{...{
						volume,
						setVolume,
						muteVolume,
						setMuteVolume,
					}}
				/>
				<button
					className={styles.button}
					onClick={() => {
						togglePlayPause()
						setCurrentTrack(null)
					}}
					title='Закрыть плеер'
				>
					<IoCloseSharp />
				</button>
			</div>
		</div>
	)
}

export default Controls
