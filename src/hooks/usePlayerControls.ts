import { useCallback, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	nextTrack,
	setTimeProgress,
	togglePlayPause,
} from 'store/actions/player'
import { RootState } from 'store/types'
import { previousTrack } from './../store/actions/player'

function usePlayerControls(
	audioRef: React.RefObject<HTMLAudioElement>,
	progressBarRef: React.RefObject<HTMLInputElement>,
	progressRef: React.RefObject<HTMLDivElement>,
) {
	const dispatch = useDispatch()

	const duration = useSelector((state: RootState) => state.player.duration)
	const volume = useSelector((state: RootState) => state.player.volume)
	const isMute = useSelector((state: RootState) => state.player.isMute)
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
	const isRandom = useSelector((state: RootState) => state.player.isRandom)

	const playAnimationRef = useRef<number | null>(null)

	const repeat = useCallback(() => {
		const currentTime = audioRef.current?.currentTime
		if (currentTime) {
			dispatch(setTimeProgress(currentTime))
		}
		if (progressBarRef?.current && progressRef?.current) {
			progressBarRef.current.value = String(currentTime)
			// progressBarRef.current.style.setProperty(
			// 	'--range-progress',
			// 	`${(+progressBarRef.current.value / duration) * 0}%`,
			// )
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
				case 'MediaPlayPause':
					dispatch(togglePlayPause())
					break
				case 'MediaTrackNext':
					dispatch(nextTrack())
					break
				case 'MediaTrackPrevious':
					dispatch(previousTrack())
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

	useEffect(() => {
		if (audioRef) {
			if (audioRef.current) {
				audioRef.current.volume = volume / 100
				audioRef.current.muted = isMute
			}
		}
	}, [volume, audioRef, isMute, isPlaying])

	return {
		skipForward,
		skipBackward,
	}
}

export default usePlayerControls
