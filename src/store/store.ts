import { createStore, combineReducers } from 'redux'
import { likesReducer } from './reducers/likes'
import { currentTrackReducer } from './reducers/currentTrack'
import { trackIndexReducer } from './reducers/trackIndex'
import { isPlayingReducer } from './reducers/isPlaying'
import { filtersReducer } from './reducers/filters'
import { IFilters, ITrack } from '../types/types'

export type LikesState = {
	type: 'SET_LIKE'
	payload: ITrack
}

export type CurrentTrackState = {
	type: 'SET_CURRENT_TRACK'
	payload: ITrack | null
}

export type TrackIndexState = {
	type: 'SET_TRACK_INDEX'
	payload: number
}

export type IsPlayingState = {
	type: 'SET_IS_PLAYING'
	payload: boolean
}

export type FiltersState = {
	type: 'SET_FILTERS'
	payload: IFilters
}

export type RootState = {
	items: ITrack[]
	likes: ITrack[]
	currentTrack: ITrack | null
	trackIndex: number
	isPlaying: boolean
	filters: IFilters
}

const rootReducer = combineReducers({
	likes: likesReducer,
	currentTrack: currentTrackReducer,
	trackIndex: trackIndexReducer,
	isPlaying: isPlayingReducer,
	filters: filtersReducer,
})

const store = createStore(rootReducer)

export default store
