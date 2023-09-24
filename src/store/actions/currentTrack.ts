import { ITrack } from '../../types/types'

export const setCurrentTrack = (track: ITrack | null) => ({
	type: 'SET_CURRENT_TRACK',
	payload: track,
})
