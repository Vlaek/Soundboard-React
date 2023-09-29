import { FC, memo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { nextTrack, setDuration } from 'store/actions/player'
import { RootState } from 'store/types'
import styles from './Display.module.scss'

interface DisplayProps {
	audioRef: React.RefObject<HTMLAudioElement>
	progressBarRef: React.RefObject<HTMLInputElement>
	isRepeat: boolean
	handleRepeat: () => void
}

const Display: FC<DisplayProps> = memo(
	({ audioRef, progressBarRef, isRepeat, handleRepeat }) => {
		const dispatch = useDispatch()

		const currentTrack = useSelector(
			(state: RootState) => state.player.currentTrack,
		)

		const onLoadedMetadata = () => {
			const seconds = audioRef.current?.duration
			if (seconds) {
				dispatch(setDuration(seconds - 1))
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
							<img
								src={`./img/${currentTrack.author}.png`}
								alt=''
								draggable={false}
							/>
						</div>
						<div className={styles.text}>
							<p className={styles.name}>{currentTrack && currentTrack.name}</p>
							<p className={styles.author}>
								{currentTrack && currentTrack.author}
							</p>
						</div>

						<audio
							src={`./tracks/${currentTrack.file}`}
							ref={audioRef}
							onLoadedMetadata={onLoadedMetadata}
							onEnded={() =>
								isRepeat ? handleRepeat() : dispatch(nextTrack())
							}
						/>
					</>
				)}
			</div>
		)
	},
)

export default Display
