import { FC, useEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import { IFilters, ITrack } from './types/types'
import Player from './components/Player/Player'
import { data } from './components/Items/data'
import { useFilter } from './hooks/useFilter'

const App: FC = () => {
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

	const sortedAndFilteredItems = useFilter(data, filters, likes)

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
						}}
						tracks={sortedAndFilteredItems}
						setLike={onSetLike}
					/>
				}
			/>
			<Player
				{...{
					trackIndex,
					setTrackIndex,
					setCurrentTrack,
					currentTrack,
					isPlaying,
					setIsPlaying,
					likes,
				}}
				tracks={sortedAndFilteredItems}
				setLike={onSetLike}
			/>
		</div>
	)
}

export default App
