import { FC } from 'react'
import styles from './Footer.module.scss'

const Footer: FC = () => {
	return (
		<div className={styles.footer}>
			<div className={styles.footer__left}>
				<div className={styles.buttons}>
					<div className={styles.button}>Правообладателям</div>
					<div className={styles.button}>Пользовательское соглашение</div>
					<div className={styles.button}>Справка</div>
					<div className={styles.button}>Подписаться</div>
				</div>
				<div className={styles.info}>
					Сервис может содержать информацию, не предназначенную для несовершеннолетних
				</div>
			</div>
			<div className={styles.footer__right}>
				<div className={styles.copyright}>
					<span className={styles.link}>© 2023 ООО «Soundboard»</span>
					<div className={styles.link}>Пет-проект Vlaek GitHub</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
