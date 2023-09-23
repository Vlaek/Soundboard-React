import { FC, memo } from 'react'
import { ITrack } from '../../../types/types'
import styles from './Display.module.scss'

interface DisplayProps {
	currentTrack: ITrack | null
	audioRef: React.RefObject<HTMLAudioElement>
	setDuration: (duration: number) => void
	progressBarRef: React.RefObject<HTMLInputElement>
	handleNext: () => void
	isRepeat: boolean
	handleRepeat: () => void
}

const Display: FC<DisplayProps> = memo(
	({ currentTrack, audioRef, setDuration, progressBarRef, handleNext, isRepeat, handleRepeat }) => {
		const onLoadedMetadata = () => {
			const seconds = audioRef.current?.duration
			if (seconds) {
				setDuration(seconds - 1)
			}
			if (progressBarRef.current) {
				progressBarRef.current.max = String(seconds)
			}
		}

		return (
			<div className={styles.wrapper}>
				{currentTrack && (
					<>
						<div className={styles.img}>
							<img src={`./img/${currentTrack.author}.png`} alt='' draggable={false} />
						</div>
						<div className={styles.text}>
							<p className={styles.name}>{currentTrack && currentTrack.name}</p>
							<p className={styles.author}>{currentTrack && currentTrack.author}</p>
						</div>

						<audio
							src={`./tracks/${currentTrack.file}`}
							ref={audioRef}
							onLoadedMetadata={onLoadedMetadata}
							onEnded={() => (isRepeat ? handleRepeat() : handleNext())}
						/>
					</>
				)}
			</div>
		)
	},
)

export default Display
