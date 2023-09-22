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
			<div className={styles.buttons} title='Включить предыдущий трек'>
				<button onClick={handlePrevious}>
					<IoPlaySkipBackSharp />
				</button>
				<button onClick={skipBackward} title='Перемотать назад'>
					<IoPlayBackSharp />
				</button>
				<button onClick={togglePlayPause} title='Включить / выключить'>
					{isPlaying ? <IoPauseSharp /> : <IoPlaySharp />}
				</button>
				<button onClick={skipForward} title='Перемотать вперед'>
					<IoPlayForwardSharp />
				</button>
				<button onClick={handleNext} title='Включить следующий трек'>
					<IoPlaySkipForwardSharp />
				</button>
			</div>
		)
	},
)

export default Buttons
