import { ITrack } from 'types/types'

export const setLike = (item: ITrack) => ({
	type: 'SET_LIKE',
	payload: item,
})
