import { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	nextTrack,
	setTimeProgress,
	togglePlayPause,
} from 'store/actions/player'
import { RootState } from 'store/types'

function usePlayerControls(
	audioRef: React.RefObject<HTMLAudioElement>,
	progressBarRef: React.RefObject<HTMLInputElement>,
	progressRef: React.RefObject<HTMLDivElement>,
) {
	const dispatch = useDispatch()

	const duration = useSelector((state: RootState) => state.player.duration)
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
	const isRandom = useSelector((state: RootState) => state.player.isRandom)

	const playAnimationRef = useRef<number | null>(null)

	const repeat = useCallback(() => {
		const currentTime = audioRef.current?.currentTime
		if (currentTime) {
			dispatch(setTimeProgress(currentTime))
		}
		if (progressBarRef.current && progressRef.current) {
			progressBarRef.current.value = String(currentTime)
			progressBarRef.current.style.setProperty(
				'--range-progress',
				`${(+progressBarRef.current.value / duration) * 100}%`,
			)
			progressRef.current.style.width = `${
				(+progressBarRef.current.value / duration) * 100
			}%`

			playAnimationRef.current = requestAnimationFrame(repeat)
		}
	}, [audioRef, progressBarRef, progressRef, dispatch, duration])

	useEffect(() => {
		if (isPlaying) {
			audioRef.current?.play()
		} else {
			audioRef.current?.pause()
		}
		playAnimationRef.current = requestAnimationFrame(repeat)
	}, [isPlaying, audioRef, repeat, playAnimationRef])

	const handleRepeat = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0
			audioRef.current.play()
		}
	}

	const skipForward = useCallback(() => {
		if (audioRef.current) {
			if (duration <= audioRef.current.currentTime + 5) {
				dispatch(nextTrack(isRandom))
			} else {
				audioRef.current.currentTime += 10
			}
		}
	}, [audioRef, dispatch, duration, isRandom])

	const skipBackward = useCallback(() => {
		if (audioRef.current) audioRef.current.currentTime -= 5
	}, [audioRef])

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowRight':
					skipForward()
					break
				case 'ArrowLeft':
					skipBackward()
					break
				case ' ':
					e.preventDefault()
					dispatch(togglePlayPause())
					break
				default:
					return
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [dispatch, skipBackward, skipForward])

	return {
		handleRepeat,
		skipForward,
		skipBackward,
	}
}

export default usePlayerControls
