import { FC, useState, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import styles from './Player.module.scss'
import Controls from './Controls/Controls'
import ProgressBar from './ProgressBar/ProgressBar'
import { CSSTransition } from 'react-transition-group'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/types'
import { nextTrack, setDuration } from 'store/actions/player'
import Modal from './Modal/Modal'

const Player: FC = () => {
	const dispatch = useDispatch()

	const isRepeat = useSelector((state: RootState) => state.player.isRepeat)
	const isRandom = useSelector((state: RootState) => state.player.isRandom)
	const currentTrack = useSelector(
		(state: RootState) => state.player.currentTrack,
	)

	const [showModal, setShowModal] = useState(false)

	const playerRef = useRef(null)
	const modalRef = useRef(null)

	const audioRef = useRef<HTMLAudioElement>(null)
	const progressBarRef = useRef<HTMLInputElement>(null)
	const progressRef = useRef<HTMLDivElement>(null)

	const ModalProgressBarRef = useRef<HTMLInputElement>(null)
	const ModalProgressRef = useRef<HTMLDivElement>(null)

	const onLoadedMetadata = () => {
		const seconds = audioRef.current?.duration
		if (seconds) {
			dispatch(setDuration(seconds - 1))
		}
		if (progressBarRef.current && ModalProgressBarRef.current) {
			progressBarRef.current.max = String(seconds)
			ModalProgressBarRef.current.max = String(seconds)
		}
	}

	const handleRepeat = () => {
		if (audioRef.current) {
			audioRef.current.currentTime = 0
			audioRef.current.play()
		}
	}

	const isMobile = useMediaQuery({ query: '(max-width: 650px)' })

	return (
		<>
			<CSSTransition
				in={Boolean(currentTrack)}
				timeout={300}
				nodeRef={playerRef}
				classNames={{
					enterDone: styles.player_enter_done,
					exit: styles.player_exit,
					exitActive: styles.player_exit_active,
				}}
			>
				<div
					className={styles.player}
					ref={playerRef}
					onClick={() => isMobile && setShowModal(!showModal)}
				>
					<ProgressBar {...{ audioRef, progressBarRef, progressRef }} />
					<Controls {...{ audioRef, progressBarRef, progressRef }} />
				</div>
			</CSSTransition>
			<div
				className={styles.modal}
				ref={modalRef}
				style={{
					visibility: showModal ? 'visible' : 'hidden',
					opacity: showModal ? 1 : 0,
				}}
			>
				<Modal
					audioRef={audioRef}
					progressBarRef={ModalProgressBarRef}
					progressRef={ModalProgressRef}
					showModal={showModal}
					setShowModal={setShowModal}
				/>
			</div>
			{currentTrack && (
				<audio
					src={`./tracks/${currentTrack.file}`}
					ref={audioRef}
					onLoadedMetadata={onLoadedMetadata}
					onEnded={() =>
						isRepeat ? handleRepeat() : dispatch(nextTrack(isRandom))
					}
				/>
			)}
		</>
	)
}

export default Player
