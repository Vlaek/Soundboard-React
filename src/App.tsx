import { FC, useState } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import { ITrack } from './types/types'
import Player from './components/Player/Player'
import { data as tracks } from './components/Items/data'

const App: FC = () => {
	const [likes, setLikes] = useState<ITrack[]>([])
	const [currentTrack, setCurrentTrack] = useState<ITrack>(tracks[0])

	const [trackIndex, setTrackIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)

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
				header={<Header />}
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
					/>
				}
			/>
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
		</div>
	)
}

export default App
