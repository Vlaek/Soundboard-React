import { FiltersState } from '../store'
import { IFilters } from './../../types/types'

const initialState: IFilters = {
	authorFilter: [],
	explicitFilter: false,
	likesFilter: false,
	sort: '',
	searchQuery: '',
}

export const filtersReducer = (state = initialState, action: FiltersState) => {
	switch (action.type) {
		case 'SET_FILTERS':
			return action.payload
		default:
			return state
	}
}
