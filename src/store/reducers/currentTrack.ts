import { ITrack } from '../../types/types'
import { CurrentTrackState } from '../store'

const initialState: ITrack | null = null

export const currentTrackReducer = (state = initialState, action: CurrentTrackState) => {
	switch (action.type) {
		case 'SET_CURRENT_TRACK':
			return action.payload
		default:
			return state
	}
}
