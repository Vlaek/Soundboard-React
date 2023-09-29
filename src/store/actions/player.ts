import { ITrack } from 'types/types'

export const loadTracks = (tracks: ITrack[]) => {
	return {
		type: 'LOAD_TRACKS',
		payload: tracks,
	}
}

export const togglePlayPause = () => ({
	type: 'TOGGLE_PLAY_PAUSE',
})

export const setPlaying = (isPlaying: boolean) => ({
	type: 'SET_PLAYING',
	payload: isPlaying,
})

export const setRepeat = (isRepeat: boolean) => ({
	type: 'SET_REPEAT',
	payload: isRepeat,
})

export const setRandom = (isRandom: boolean) => ({
	type: 'SET_RANDOM',
	payload: isRandom,
})

export const setCurrentTrack = (track: ITrack | null) => ({
	type: 'SET_CURRENT_TRACK',
	payload: track,
})

export const nextTrack = (isRandom: boolean = false) => {
	return {
		type: 'NEXT_TRACK',
		payload: {
			isRandom,
		},
	}
}

export const previousTrack = () => ({
	type: 'PREVIOUS_TRACK',
})

export const setTrackIndex = (index: number) => ({
	type: 'SET_TRACK_INDEX',
	payload: index,
})
