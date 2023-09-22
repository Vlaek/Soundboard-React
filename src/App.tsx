import { FC, useCallback, useEffect, useState } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import { IFilters, ITrack } from './types/types'
import Player from './components/Player/Player'
import { data } from './components/Items/data'

const App: FC = () => {
	const [likes, setLikes] = useState<ITrack[]>([])
	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

	const [trackIndex, setTrackIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

	const [tracks, setTracks] = useState(data)

	const onSetLike = (item: ITrack) => {
		let isInArray = false
		likes.forEach(like => {
			if (like.id === item.id) isInArray = true
			setLikes(likes.filter(like => like.id !== item.id))
		})
		if (!isInArray) setLikes([...likes, item])
	}

	const [filters, setFilters] = useState<IFilters>({
		authorFilter: [],
		explicitFilter: false,
		likesFilter: false,
		sort: '',
		searchQuery: '',
	})

	const applyFilters = useCallback(() => {
		let filteredTracks = [...data]

		if (filters.searchQuery) {
			filteredTracks = filteredTracks.filter(
				track =>
					track.author.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
					track.name.toLowerCase().includes(filters.searchQuery.toLowerCase()),
			)
		}

		if (filters.authorFilter.length > 0) {
			filteredTracks = filteredTracks.filter(track => filters.authorFilter.includes(track.author))
		}

		if (filters.explicitFilter) {
			filteredTracks = filteredTracks.filter(track => !track.explicit)
		}

		if (filters.likesFilter) {
			filteredTracks = filteredTracks.filter(track => likes.some(like => like.id === track.id))
		}

		switch (filters.sort) {
			case 'UpName':
				filteredTracks.sort((a, b) => a.name.localeCompare(b.name))
				break
			case 'DownName':
				filteredTracks.sort((a, b) => b.name.localeCompare(a.name))
				break
			case 'UpAuthor':
				filteredTracks.sort((a, b) => a.author.localeCompare(b.author))
				break
			case 'DownAuthor':
				filteredTracks.sort((a, b) => b.author.localeCompare(a.author))
				break
			default:
				break
		}

		const index = filteredTracks.findIndex(track => track.id === currentTrack?.id)
		setTrackIndex(index)

		return filteredTracks
	}, [currentTrack, filters, likes])

	const updateFilteredTracks = useCallback(() => {
		const filteredTracks = applyFilters()
		setTracks(filteredTracks)
	}, [applyFilters])

	useEffect(() => {
		updateFilteredTracks()
	}, [filters, likes, updateFilteredTracks])

	return (
		<div className='container'>
			<Layout
				aside={<Aside />}
				header={<Header {...{ filters, setFilters }} />}
				footer={<Footer />}
				main={
					<Items
						likes={likes}
						setLike={onSetLike}
						currentTrack={currentTrack}
						setCurrentTrack={setCurrentTrack}
						isPlaying={isPlaying}
						setIsPlaying={setIsPlaying}
						setTrackIndex={setTrackIndex}
						tracks={tracks}
						filters={filters}
						setFilters={setFilters}
					/>
				}
			/>
			{currentTrack && (
				<Player
					{...{
						tracks,
						trackIndex,
						setTrackIndex,
						setCurrentTrack,
						currentTrack,
						isPlaying,
						setIsPlaying,
					}}
				/>
			)}
		</div>
	)
}

export default App
