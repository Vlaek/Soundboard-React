import { FC } from 'react'
import { ITrack } from '../../../types/types'
import styles from './Display.module.scss'

interface DisplayProps {
	currentTrack: ITrack
	audioRef: React.RefObject<HTMLAudioElement>
	setDuration: (duration: number) => void
	progressBarRef: React.RefObject<HTMLInputElement>
	tracks: ITrack[]
	trackIndex: number
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	setCurrentTrack: (track: ITrack) => void
}

const Display: FC<DisplayProps> = ({
	currentTrack,
	audioRef,
	setDuration,
	progressBarRef,
	tracks,
	trackIndex,
	setTrackIndex,
	setCurrentTrack,
}) => {
	const onLoadedMetadata = () => {
		const seconds = audioRef.current?.duration
		if (seconds) {
			setDuration(seconds)
		}
		if (progressBarRef.current) {
			progressBarRef.current.max = String(seconds)
		}
	}

	const handleNext = () => {
		if (trackIndex >= tracks.length - 1) {
			setTrackIndex(0)
			setCurrentTrack(tracks[0])
		} else {
			setTrackIndex(prev => prev + 1)
			setCurrentTrack(tracks[trackIndex + 1])
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.text}>
				<p className={styles.name}>{currentTrack.name}</p>
				<p className={styles.author}>{currentTrack.author}</p>
			</div>
			<audio
				src={`/tracks/${currentTrack.file}`}
				ref={audioRef}
				onLoadedMetadata={onLoadedMetadata}
				onEnded={handleNext}
			/>
		</div>
	)
}

export default Display
