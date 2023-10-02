import { ITrack } from 'types/types'
import { LikesState } from '../types'

const getFromLocalStorage = (key: string) => {
	const value = localStorage.getItem(key)
	if (value) {
		return JSON.parse(value)
	}
	return []
}

const initialState: ITrack[] = getFromLocalStorage('likes')

export const likesReducer = (
	state = initialState,
	action: LikesState,
): ITrack[] | boolean => {
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
				localStorage.setItem(
					'likes',
					JSON.stringify([...state, action.payload]),
				)
				return [...state, action.payload]
			} else {
				localStorage.setItem('likes', JSON.stringify([...state]))
				return [...state]
			}
		}
		default:
			return state
	}
}
