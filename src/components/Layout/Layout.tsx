import { FC } from 'react'
import styles from './Layout.module.scss'

interface LayoutProps {
	header: React.ReactNode
	main: React.ReactNode
	aside: React.ReactNode
	footer: React.ReactNode
}

const Layout: FC<LayoutProps> = ({ header, main, aside, footer }) => {
	return (
		<div className={styles.layout}>
			<header>{header}</header>
			<main>{main}</main>
			<aside>{aside}</aside>
			<footer>{footer}</footer>
		</div>
	)
}

export default Layout
