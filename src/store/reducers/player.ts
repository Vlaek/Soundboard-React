import { PlayerActionTypes, PlayerState } from '../types'

const initialState: PlayerState = {
	tracks: [],
	duration: 0,
	timeProgress: 0,
	volume: 50,
	isMute: false,
	isPlaying: false,
	isRepeat: false,
	isRandom: false,
	currentTrack: null,
	trackIndex: 0,
}

export const playerReducer = (
	state = initialState,
	action: PlayerActionTypes,
) => {
	switch (action.type) {
		case 'LOAD_TRACKS':
			return {
				...state,
				tracks: action.payload,
			}
		case 'SET_DURATION':
			return {
				...state,
				duration: action.payload,
			}
		case 'SET_TIME_PROGRESS':
			return {
				...state,
				timeProgress: action.payload,
			}
		case 'SET_VOLUME':
			return {
				...state,
				volume: action.payload,
			}
		case 'SET_MUTE':
			return {
				...state,
				volume: action.payload,
			}
		case 'TOGGLE_PLAY_PAUSE':
			return {
				...state,
				isPlaying: !state.isPlaying,
			}
		case 'SET_PLAYING':
			return {
				...state,
				isPlaying: action.payload,
			}
		case 'SET_REPEAT':
			return {
				...state,
				isRepeat: action.payload,
			}
		case 'SET_RANDOM':
			return {
				...state,
				isRandom: action.payload,
			}
		case 'SET_CURRENT_TRACK':
			return {
				...state,
				currentTrack: action.payload,
			}
		case 'NEXT_TRACK': {
			const { isRandom } = action.payload
			const { tracks, trackIndex } = state

			if (trackIndex >= tracks.length - 1) {
				return {
					...state,
					trackIndex: 0,
					currentTrack: tracks[0],
				}
			} else {
				if (isRandom) {
					let randomIndex

					do {
						randomIndex = Math.floor(Math.random() * tracks.length)
					} while (randomIndex === trackIndex)

					return {
						...state,
						trackIndex: randomIndex,
						currentTrack: tracks[randomIndex],
					}
				} else {
					return {
						...state,
						trackIndex: trackIndex + 1,
						currentTrack: tracks[trackIndex + 1],
					}
				}
			}
		}
		case 'PREVIOUS_TRACK': {
			const { tracks, trackIndex } = state
			if (trackIndex === 0) {
				const lastTrackIndex = tracks.length - 1
				return {
					...state,
					trackIndex: lastTrackIndex,
					currentTrack: tracks[lastTrackIndex],
					isPlaying: true,
				}
			} else {
				return {
					...state,
					trackIndex: trackIndex - 1,
					currentTrack: tracks[trackIndex - 1],
					isPlaying: true,
				}
			}
		}
		case 'SET_TRACK_INDEX':
			return {
				...state,
				trackIndex: action.payload,
			}
		default:
			return state
	}
}
