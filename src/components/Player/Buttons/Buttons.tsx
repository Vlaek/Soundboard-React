import { FC, memo } from 'react'
import {
	IoPlayBackSharp,
	IoPlayForwardSharp,
	IoPlaySkipBackSharp,
	IoPlaySkipForwardSharp,
	IoPlaySharp,
	IoPauseSharp,
} from 'react-icons/io5'
import styles from './Buttons.module.scss'

interface ButtonsProps {
	handleNext: () => void
	handlePrevious: () => void
	skipForward: () => void
	skipBackward: () => void
	togglePlayPause: () => void
	isPlaying: boolean
}

const Buttons: FC<ButtonsProps> = memo(
	({ handleNext, handlePrevious, skipForward, skipBackward, togglePlayPause, isPlaying }) => {
		return (
			<div className={styles.buttons}>
				<button onClick={handlePrevious}>
					<IoPlaySkipBackSharp />
				</button>
				<button onClick={skipBackward}>
					<IoPlayBackSharp />
				</button>
				<button onClick={togglePlayPause}>{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}</button>
				<button onClick={skipForward}>
					<IoPlayForwardSharp />
				</button>
				<button onClick={handleNext}>
					<IoPlaySkipForwardSharp />
				</button>
			</div>
		)
	},
)

export default Buttons
