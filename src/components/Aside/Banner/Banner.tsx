import { FC } from 'react'
import { IBanner } from '../../../types/types'
import styles from './Banner.module.scss'

type BannerProps = {
	item: IBanner
}

const Banner: FC<BannerProps> = ({ item }) => {
	return (
		<div className={styles.banner}>
			<a href={item.link} target='_blank'>
				<img src={`./img/${item.img}`} alt='banner' draggable={false} />
			</a>
		</div>
	)
}

export default Banner
