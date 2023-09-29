import { createStore, combineReducers } from 'redux'
import { likesReducer } from './reducers/likes'
import { filtersReducer } from './reducers/filters'
import { playerReducer } from './reducers/player'

const rootReducer = combineReducers({
	likes: likesReducer,
	filters: filtersReducer,
	player: playerReducer,
})

const store = createStore(rootReducer)

export default store
