import { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineClose } from 'react-icons/ai'
import {
	IoRepeatOutline,
	IoShuffle,
	IoPlayBackSharp,
	IoPlayForwardSharp,
	IoPlaySkipBackSharp,
	IoPlaySkipForwardSharp,
	IoPlaySharp,
	IoPauseSharp,
} from 'react-icons/io5'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { RootState } from 'store/types'
import styles from './Modal.module.scss'
import ProgressBar from './../ProgressBar/ProgressBar'
import usePlayerControls from './../../../hooks/usePlayerControls'
import {
	nextTrack,
	previousTrack,
	setRandom,
	setRepeat,
	togglePlayPause,
} from 'store/actions/player'
import { setLike } from 'store/actions/likes'
import Volume from 'components/Player/Volume/Volume'

interface ModalProps {
	audioRef: React.RefObject<HTMLAudioElement>
	showModal: boolean
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>
	progressBarRef: React.RefObject<HTMLInputElement>
	progressRef: React.RefObject<HTMLDivElement>
}

const Modal: FC<ModalProps> = ({
	audioRef,
	showModal,
	setShowModal,
	progressBarRef,
	progressRef,
}) => {
	const dispatch = useDispatch()

	const tracks = useSelector((state: RootState) => state.player.tracks)
	const isPlaying = useSelector((state: RootState) => state.player.isPlaying)
	const isRepeat = useSelector((state: RootState) => state.player.isRepeat)
	const isRandom = useSelector((state: RootState) => state.player.isRandom)
	const trackIndex = useSelector((state: RootState) => state.player.trackIndex)
	const currentTrack = useSelector(
		(state: RootState) => state.player.currentTrack,
	)
	const isLiked = useSelector((state: RootState) =>
		state.likes.some(like => like.id === currentTrack?.id),
	)

	const { skipForward, skipBackward } = usePlayerControls(
		audioRef,
		progressBarRef,
		progressRef,
	)

	useEffect(() => {}, [audioRef])

	useEffect(() => {
		if (!showModal) document.body.style.overflow = 'visible'
		else document.body.style.overflow = 'hidden'
	}, [showModal])

	const previousImg =
		trackIndex === 0
			? tracks[tracks.length - 1]?.author
			: tracks[trackIndex - 1]?.author

	const nextImg =
		trackIndex >= tracks.length - 1
			? tracks[0]?.author
			: tracks[trackIndex + 1]?.author

	return (
		<>
			<div className={styles.header}>
				<div className={styles.imgs}>
					<div className={styles.img}>
						<img
							src={`./img/${previousImg}.png`}
							alt='img'
							draggable={false}
							onClick={() => dispatch(previousTrack())}
						/>
					</div>
					<div className={styles.img}>
						<img
							src={`./img/${currentTrack?.author}.png`}
							alt='img'
							draggable={false}
							onClick={() => dispatch(togglePlayPause())}
						/>
					</div>
					<div className={styles.img}>
						<img
							src={`./img/${nextImg}.png`}
							alt='img'
							draggable={false}
							onClick={() => dispatch(nextTrack())}
						/>
					</div>
				</div>
				<div className={styles.btn_close} onClick={() => setShowModal(false)}>
					<AiOutlineClose />
				</div>
			</div>
			<div className={styles.display} onClick={e => e.stopPropagation()}>
				<div className={styles.name}>{currentTrack?.name}</div>
				{/* <div className={styles.name}>{String(progressRef.current)}</div> */}
				<div className={styles.author}>{currentTrack?.author}</div>
				<ProgressBar {...{ audioRef, progressBarRef, progressRef }} />
			</div>
			<div className={styles.buttons}>
				<button
					onClick={() => dispatch(previousTrack())}
					title='Включить предыдущий трек'
				>
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
				<Volume posL={0} />
			</div>
		</>
	)
}

export default Modal
