import { FC } from 'react'
import Logo from './Logo/Logo'
import MultiSelect from './MultiSelect/MultiSelect'
import Search from './Search/Search'
import styles from './Header.module.scss'

const Header: FC = () => {
	return (
		<div className={styles.header}>
			<Logo />
			<MultiSelect />
			<Search />
		</div>
	)
}

export default Header
