import { FC, memo } from 'react'
import Logo from './Logo/Logo'
import MultiSelect from './MultiSelect/MultiSelect'
import Search from './Search/Search'
import styles from './Header.module.scss'
import { IFilters } from '../../types/types'

interface HeaderProps {
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
}

const Header: FC<HeaderProps> = memo(({ filters, setFilters }) => {
	return (
		<div className={styles.header}>
			<Logo />
			<MultiSelect {...{ filters, setFilters }} />
			<Search {...{ filters, setFilters }} />
		</div>
	)
})

export default Header
