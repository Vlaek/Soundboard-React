import { TrackIndexState } from '../store'

const initialState = 0

export const trackIndexReducer = (state = initialState, action: TrackIndexState) => {
	switch (action.type) {
		case 'SET_TRACK_INDEX':
			return action.payload
		default:
			return state
	}
}
