import { useState, useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { ITrack } from '../types/types'
import useDebounce from './useDebounce'

export const useFilter = (tracks: ITrack[]) => {
	const likes = useSelector((state: RootState) => state.likes)
	const filters = useSelector((state: RootState) => state.filters)

	const [items, setItems] = useState<ITrack[]>(tracks)

	const debouncedQuery = useDebounce(filters.searchQuery, 500)

	const applyFilters = useCallback(() => {
		let filteredTracks = [...tracks]

		if (debouncedQuery) {
			filteredTracks = filteredTracks.filter(
				track =>
					track.author.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
					track.name.toLowerCase().includes(debouncedQuery.toLowerCase()),
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

		return filteredTracks
	}, [filters, tracks, likes, debouncedQuery])

	useEffect(() => {
		const filteredTracks = applyFilters()
		setItems(filteredTracks)
	}, [applyFilters])

	return items
}
