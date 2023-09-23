import { FC, useCallback, useState } from 'react'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Item from './Item/Item'
import cn from 'classnames'
import styles from './Items.module.scss'
import { ITrack } from '../../types/types'
import { IFilters } from './../../types/types'

interface ItemsProps {
	likes: ITrack[]
	setLike: (like: ITrack) => void
	currentTrack: ITrack | null
	setCurrentTrack: (like: ITrack) => void
	isPlaying: boolean
	setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
	setTrackIndex: React.Dispatch<React.SetStateAction<number>>
	tracks: ITrack[]
	filters: IFilters
	setFilters: React.Dispatch<React.SetStateAction<IFilters>>
	isLoading: boolean
	itemsError: string | boolean
}

const Items: FC<ItemsProps> = ({
	likes,
	setLike,
	currentTrack,
	setCurrentTrack,
	isPlaying,
	setIsPlaying,
	setTrackIndex,
	tracks,
	filters,
	setFilters,
	isLoading,
	itemsError,
}) => {
	const [activeTab, setActiveTab] = useState('Главное')
	const [activeSort, setActiveSort] = useState('')

	const handleTabClick = useCallback(
		(tab: string) => {
			switch (tab) {
				case 'Коллекция':
					setFilters({ ...filters, likesFilter: true, explicitFilter: false })
					break
				case 'Для детей':
					setFilters({ ...filters, explicitFilter: true, likesFilter: false })
					break
				default:
					setFilters({ ...filters, explicitFilter: false, likesFilter: false })
					break
			}
			setActiveTab(tab)
		},
		[filters, setFilters],
	)

	const handleSortClick = useCallback(
		(sort: string) => {
			setFilters({ ...filters, sort: sort })
			setActiveSort(sort)
		},
		[filters, setFilters],
	)

	return (
		<div className={styles.items}>
			<div className={styles.buttons}>
				<div
					className={cn(styles.button, activeTab === 'Главное' && styles.active)}
					onClick={() => handleTabClick('Главное')}
				>
					Главное
				</div>
				<div
					className={cn(styles.button, activeTab === 'Коллекция' && styles.active)}
					onClick={() => handleTabClick('Коллекция')}
				>
					Коллекция
				</div>
				<div
					className={cn(styles.button, activeTab === 'Для детей' && styles.active)}
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
								className={cn(styles.arrow)}
								onClick={() => handleSortClick('UpName')}
							/>
						)
					) : (
						<IoIosArrowUp className={cn(styles.arrow)} onClick={() => handleSortClick('UpName')} />
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
								className={cn(styles.arrow)}
								onClick={() => handleSortClick('UpAuthor')}
							/>
						)
					) : (
						<IoIosArrowUp
							className={cn(styles.arrow)}
							onClick={() => handleSortClick('UpAuthor')}
						/>
					)}
				</div>
			</div>
			{!isLoading ? (
				!itemsError ? (
					tracks.map((item, index) => (
						<Item
							key={item.id}
							item={item}
							index={index}
							like={likes.some(like => item === like)}
							likes={likes}
							setLike={setLike}
							currentTrack={currentTrack}
							setCurrentTrack={setCurrentTrack}
							isPlaying={isPlaying}
							setIsPlaying={setIsPlaying}
							setTrackIndex={setTrackIndex}
						/>
					))
				) : (
					<div className={styles.error}>Произошла ошибка при загрузке</div>
				)
			) : (
				<SkeletonTheme baseColor='#202020' highlightColor='#444' height={40} enableAnimation={true}>
					<Skeleton count={12} />
				</SkeletonTheme>
			)}
		</div>
	)
}

export default Items
