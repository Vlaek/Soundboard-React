import { FC, useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import useDebounce from '../../../hooks/useDebounce'
import { IFilters } from '../../../types/types'
import styles from './Search.module.scss'

interface SearchProps {
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
}

const Search: FC<SearchProps> = ({ filters, setFilters }) => {
	const [isActive, setIsActive] = useState<boolean>(false)
	const [query, setQuery] = useState<string>('')

	const debouncedQuery = useDebounce(query, 500)

	useEffect(() => {
		setFilters({ ...filters, searchQuery: debouncedQuery })
	}, [debouncedQuery, filters, setFilters])

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
		setQuery(e.target.value)
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
				value={query}
				onChange={handleChange}
			/>
		</div>
	)
}

export default Search
