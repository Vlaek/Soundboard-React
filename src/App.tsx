import { FC, useEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import Player from './components/Player/Player'
import DataService from './API/DataService'
import { useFilter } from './hooks/useFilter'
import { useFetching } from './hooks/useFetching'
import { IFilters, ITrack, IUseFetching } from './types/types'

const App: FC = () => {
	const [items, setItems] = useState([])
	const [likes, setLikes] = useState<ITrack[]>([])
	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

	const [trackIndex, setTrackIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	const [filters, setFilters] = useState<IFilters>({
		authorFilter: [],
		explicitFilter: false,
		likesFilter: false,
		sort: '',
		searchQuery: '',
	})

	const { fetchItems, isLoading, itemsError }: IUseFetching = useFetching(async () => {
		const response = await DataService.getAll()
		setItems(response.data)
	})

	useEffect(() => {
		fetchItems()
	}, [])

	const sortedAndFilteredItems = useFilter(items, filters, likes)

	useEffect(() => {
		const index = sortedAndFilteredItems.findIndex(track => track.id === currentTrack?.id)
		setTrackIndex(index)
	}, [sortedAndFilteredItems, currentTrack?.id])

	const onSetLike = (item: ITrack) => {
		let isInArray = false
		likes.forEach(like => {
			if (like.id === item.id) isInArray = true
			setLikes(likes.filter(like => like.id !== item.id))
		})
		if (!isInArray) setLikes([...likes, item])
	}

	return (
		<div className='container'>
			<Layout
				aside={<Aside />}
				header={<Header {...{ filters, setFilters }} />}
				footer={<Footer />}
				main={
					<Items
						{...{
							likes,
							currentTrack,
							setCurrentTrack,
							isPlaying,
							setIsPlaying,
							setTrackIndex,
							filters,
							setFilters,
							isLoading,
							itemsError,
						}}
						tracks={sortedAndFilteredItems}
						setLike={onSetLike}
					/>
				}
			/>
			<Player
				{...{
					likes,
					currentTrack,
					setCurrentTrack,
					isPlaying,
					setIsPlaying,
					trackIndex,
					setTrackIndex,
				}}
				tracks={sortedAndFilteredItems}
				setLike={onSetLike}
			/>
		</div>
	)
}

export default App
