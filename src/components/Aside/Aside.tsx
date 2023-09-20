import { FC } from 'react'
import Banner from './Banner/Banner'
import { data } from './data'
import { IBanner } from '../../types/types'
import styles from './Aside.module.scss'

const Aside: FC = () => {
	function getRandomObjects(arr: IBanner[]) {
		const index1 = Math.floor(Math.random() * arr.length)
		let index2 = Math.floor(Math.random() * arr.length)
		while (index2 === index1) {
			index2 = Math.floor(Math.random() * arr.length)
		}
		return [arr[index1], arr[index2]]
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				{getRandomObjects(data).map(item => (
					<Banner key={item.id} item={item} />
				))}
			</div>
		</div>
	)
}

export default Aside
