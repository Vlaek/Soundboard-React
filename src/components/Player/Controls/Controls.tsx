import { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
	IoRepeatOutline,
	IoShuffle,
	IoCloseSharp,
	IoPlayBackSharp,
	IoPlayForwardSharp,
	IoPlaySkipBackSharp,
	IoPlaySkipForwardSharp,
	IoPlaySharp,
	IoPauseSharp,
} from 'react-icons/io5'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import Display from '../Display/Display'
import Volume from './../Volume/Volume'
import { RootState } from 'store/types'
import { setLike } from 'store/actions/likes'
import styles from './Controls.module.scss'
import usePlayerControls from 'hooks/usePlayerControls'
import {
	togglePlayPause,
	setRepeat,
	setRandom,
	setCurrentTrack,
	nextTrack,
	previousTrack,
} from 'store/actions/player'

interface ControlsProps {
	audioRef: React.RefObject<HTMLAudioElement>
	progressBarRef: React.RefObject<HTMLInputElement>
	progressRef: React.RefObject<HTMLDivElement>
}

const Controls: FC<ControlsProps> = ({
	audioRef,
	progressBarRef,
	progressRef,
}) => {
	const dispatch = useDispatch()

	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
	const isRepeat = useSelector((state: RootState) => state.player.isRepeat)
	const isRandom = useSelector((state: RootState) => state.player.isRandom)
	const currentTrack = useSelector(
		(state: RootState) => state.player.currentTrack,
	)
	const isLiked = useSelector((state: RootState) =>
		state.likes.some(like => like.id === currentTrack?.id),
	)

	const { handleRepeat, skipForward, skipBackward } = usePlayerControls(
		audioRef,
		progressBarRef,
		progressRef,
	)

	return (
		<div className={styles.wrapper}>
			<div>
				<div className={styles.buttons}>
					<button onClick={() => dispatch(previousTrack())}>
						<IoPlaySkipBackSharp />
					</button>
					<button onClick={skipBackward} title='Перемотать назад'>
						<IoPlayBackSharp />
					</button>
					<button
						onClick={() => dispatch(togglePlayPause())}
						title='Включить / выключить'
					>
						{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
					</button>
					<button onClick={skipForward} title='Перемотать вперед'>
						<IoPlayForwardSharp />
					</button>
					<button
						onClick={() => dispatch(nextTrack())}
						title='Включить следующий трек'
					>
						<IoPlaySkipForwardSharp />
					</button>
				</div>
				<Display
					{...{
						audioRef,
						progressBarRef,
						isRepeat,
						handleRepeat,
					}}
				/>
			</div>
			<div className={styles.buttons}>
				<button
					className={isLiked ? styles.active : ''}
					onClick={() => {
						currentTrack && dispatch(setLike(currentTrack))
					}}
				>
					{isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
				</button>
				<button
					className={isRepeat ? styles.active : ''}
					onClick={() => dispatch(setRepeat(!isRepeat))}
					title='Повторять'
				>
					<IoRepeatOutline />
				</button>
				<button
					className={isRandom ? styles.active : ''}
					onClick={() => dispatch(setRandom(!isRandom))}
					title='В случайном порядке'
				>
					<IoShuffle />
				</button>
				<Volume audioRef={audioRef} />
				<button
					onClick={() => {
						dispatch(togglePlayPause())
						dispatch(setCurrentTrack(null))
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
