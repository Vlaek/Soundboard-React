import { FC } from 'react'
import { data } from './data'
import Item from './Item/Item'
import classNames from 'classnames'
import styles from './Items.module.scss'

const Items: FC = () => {
	return (
		<div className={styles.items}>
			<div className={styles.buttons}>
				<div className={classNames(styles.button, styles.active)}>Главное</div>
				<div className={styles.button}>Коллекция</div>
				<div className={styles.button}>Для детей</div>
			</div>
			<div className={styles.info}>
				<div className={styles.id}>#</div>
				<div className={styles.name}>Название трека</div>
				<div className={styles.author}>Исполнитель</div>
			</div>
			{data.map((item, index) => (
				<Item key={item.id} item={item} index={index} />
			))}
		</div>
	)
}

export default Items
