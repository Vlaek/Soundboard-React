import { ITrack } from '../../types/types'
import { LikesState } from '../store'

const initialState: ITrack[] = []

export const likesReducer = (state = initialState, action: LikesState): ITrack[] | boolean => {
	switch (action.type) {
		case 'SET_LIKE': {
			let isInArray = false

			state.forEach((like, index) => {
				if (like.id === action.payload.id) {
					state.splice(index, 1)
					isInArray = true
				}
			})

			if (!isInArray) {
				return [...state, action.payload]
			} else {
				return [...state]
			}
		}
		default:
			return state
	}
}
