import { IFilters } from './../../types/types'

export const setFilters = (filters: IFilters) => ({
	type: 'SET_FILTERS',
	payload: filters,
})
