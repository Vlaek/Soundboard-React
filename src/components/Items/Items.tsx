import { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Item from './Item/Item'
import cn from 'classnames'
import styles from './Items.module.scss'
import { RootState } from 'store/types'
import { setFilters } from 'store/actions/filters'

interface ItemsProps {
	isLoading: boolean
	itemsError: string | boolean
}

const Items: FC<ItemsProps> = ({ isLoading, itemsError }) => {
	const dispatch = useDispatch()

	const tracks = useSelector((state: RootState) => state.player.tracks)
	const filters = useSelector((state: RootState) => state.filters)

	const [activeTab, setActiveTab] = useState('Главное')
	const [activeSort, setActiveSort] = useState('')

	const handleTabClick = useCallback(
		(tab: string) => {
			switch (tab) {
				case 'Коллекция':
					dispatch(
						setFilters({
							...filters,
							likesFilter: true,
							explicitFilter: false,
						}),
					)
					break
				case 'Для детей':
					dispatch(
						setFilters({
							...filters,
							explicitFilter: true,
							likesFilter: false,
						}),
					)
					break
				default:
					dispatch(
						setFilters({
							...filters,
							explicitFilter: false,
							likesFilter: false,
						}),
					)
					break
			}
			setActiveTab(tab)
		},
		[dispatch, filters],
	)

	const handleSortClick = useCallback(
		(sort: string) => {
			dispatch(setFilters({ ...filters, sort: sort }))
			setActiveSort(sort)
		},
		[dispatch, filters],
	)

	return (
		<div className={styles.items}>
			<div className={styles.buttons}>
				<div
					className={cn(
						styles.button,
						activeTab === 'Главное' && styles.active,
					)}
					onClick={() => handleTabClick('Главное')}
				>
					Главное
				</div>
				<div
					className={cn(
						styles.button,
						activeTab === 'Коллекция' && styles.active,
					)}
					onClick={() => handleTabClick('Коллекция')}
				>
					Коллекция
				</div>
				<div
					className={cn(
						styles.button,
						activeTab === 'Для детей' && styles.active,
					)}
					onClick={() => handleTabClick('Для детей')}
				>
					Для детей
				</div>
			</div>
			<div className={styles.info}>
				<div className={styles.id}>#</div>
				<div className={styles.name}>
					Название трека
					{activeSort ? (
						activeSort === 'UpName' ? (
							<IoIosArrowUp
								className={cn(styles.arrow, styles.active)}
								onClick={() => handleSortClick('DownName')}
							/>
						) : activeSort === 'DownName' ? (
							<IoIosArrowDown
								className={cn(styles.arrow, styles.active)}
								onClick={() => handleSortClick('UpName')}
							/>
						) : (
							<IoIosArrowUp
								className={styles.arrow}
								onClick={() => handleSortClick('UpName')}
							/>
						)
					) : (
						<IoIosArrowUp
							className={styles.arrow}
							onClick={() => handleSortClick('UpName')}
						/>
					)}
				</div>
				<div className={styles.author}>
					Исполнитель
					{activeSort ? (
						activeSort === 'UpAuthor' ? (
							<IoIosArrowUp
								className={cn(styles.arrow, styles.active)}
								onClick={() => handleSortClick('DownAuthor')}
							/>
						) : activeSort === 'DownAuthor' ? (
							<IoIosArrowDown
								className={cn(styles.arrow, styles.active)}
								onClick={() => handleSortClick('UpAuthor')}
							/>
						) : (
							<IoIosArrowUp
								className={styles.arrow}
								onClick={() => handleSortClick('UpAuthor')}
							/>
						)
					) : (
						<IoIosArrowUp
							className={styles.arrow}
							onClick={() => handleSortClick('UpAuthor')}
						/>
					)}
				</div>
			</div>
			{tracks !== undefined && !isLoading ? (
				!itemsError ? (
					tracks.map((item, index) => (
						<Item key={item.id} item={item} index={index} />
					))
				) : (
					<div className={styles.error}>Произошла ошибка при загрузке</div>
				)
			) : (
				<SkeletonTheme
					baseColor='#202020'
					highlightColor='#444'
					height={40}
					enableAnimation={true}
				>
					<Skeleton count={12} />
				</SkeletonTheme>
			)}
		</div>
	)
}

export default Items
