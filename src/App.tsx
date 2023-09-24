import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from './components/Layout/Layout'
import Aside from './components/Aside/Aside'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Items from './components/Items/Items'
import Player from './components/Player/Player'
import DataService from './API/DataService'
import { useFilter } from './hooks/useFilter'
import { useFetching } from './hooks/useFetching'
import { ITrack, IUseFetching } from './types/types'
import { setTrackIndex } from './store/actions/trackIndex'
import { RootState } from './store/store'

const App: FC = () => {
	const dispatch = useDispatch()

	const currentTrack = useSelector((state: RootState) => state.currentTrack)

	const [items, setItems] = useState<ITrack[]>([])

	const { fetchItems, isLoading, itemsError }: IUseFetching = useFetching(async () => {
		const response = await DataService.getAll()
		setItems(response.data)
	})

	useEffect(() => {
		fetchItems()
	}, [])

	const sortedAndFilteredItems = useFilter(items)

	useEffect(() => {
		const index = sortedAndFilteredItems.findIndex(track => track.id === currentTrack?.id)
		dispatch(setTrackIndex(index))
	}, [sortedAndFilteredItems, currentTrack?.id, dispatch])

	return (
		<div className='container'>
			<Layout
				aside={<Aside />}
				header={<Header />}
				footer={<Footer />}
				main={
					<Items isLoading={isLoading} itemsError={itemsError} tracks={sortedAndFilteredItems} />
				}
			/>
			<Player tracks={sortedAndFilteredItems} />
		</div>
	)
}

export default App
