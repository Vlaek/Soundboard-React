import { FC, useState } from 'react'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import { ITrack } from './types/types'
import Player from './components/Player/Player'

const App: FC = () => {
	const [likes, setLikes] = useState<ITrack[]>([])
	const [currentTrack, setCurrentTrack] = useState<ITrack | null>(null)

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
					/>
				}
			/>
			<Player />
		</div>
	)
}

export default App
