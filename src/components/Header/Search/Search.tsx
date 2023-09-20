import { FC, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from './Search.module.scss'

const Search: FC = () => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const inputRef = useRef<HTMLInputElement>(null)

	const handleButtonClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		event.stopPropagation()
		setIsActive(true)
		setTimeout(() => {
			if (inputRef.current) {
				inputRef.current.focus()
			}
		}, 0)
	}

	const handleInputBlur = () => {
		if (inputRef.current && inputRef.current.value.trim() === '') {
			setIsActive(false)
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.btn} onClick={handleButtonClick}>
				<AiOutlineSearch />
			</div>

			<input
				type='text'
				className={styles.search}
				placeholder='Найти...'
				ref={inputRef}
				onBlur={handleInputBlur}
				style={{ visibility: isActive ? 'visible' : 'hidden' }}
			/>
		</div>
	)
}

export default Search
