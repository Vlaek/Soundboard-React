import { FC, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineSearch } from 'react-icons/ai'
import styles from './Search.module.scss'
import { RootState } from '../../../store/store'
import { setFilters } from './../../../store/actions/filters'

const Search: FC = () => {
	const dispatch = useDispatch()
	const filters = useSelector((state: RootState) => state.filters)

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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setFilters({ ...filters, searchQuery: e.target.value }))
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
				value={filters.searchQuery}
				onChange={handleChange}
			/>
		</div>
	)
}

export default Search
