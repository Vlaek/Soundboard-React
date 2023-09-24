import { IsPlayingState } from '../store'

const initialState = false

export const isPlayingReducer = (state = initialState, action: IsPlayingState) => {
	switch (action.type) {
		case 'SET_IS_PLAYING':
			return action.payload
		default:
			return state
	}
}
