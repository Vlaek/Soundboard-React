import { IFilters, ITrack } from 'types/types'

export type LikesState = {
	type: 'SET_LIKE'
	payload: ITrack
}

export type FiltersState = {
	type: 'SET_FILTERS'
	payload: IFilters
}

interface LoadTracksAction {
	type: 'LOAD_TRACKS'
	payload: ITrack[]
}

export type DurationState = {
	type: 'SET_DURATION'
	payload: number
}

export type TimeProgressState = {
	type: 'SET_TIME_PROGRESS'
	payload: number
}

export type VolumeState = {
	type: 'SET_VOLUME'
	payload: number
}

export type MuteState = {
	type: 'SET_MUTE'
	payload: boolean
}

interface TogglePlayPauseAction {
	type: 'TOGGLE_PLAY_PAUSE'
}

interface SetPlayingAction {
	type: 'SET_PLAYING'
	payload: boolean
}

interface SetRepeatAction {
	type: 'SET_REPEAT'
	payload: boolean
}

interface SetRandomAction {
	type: 'SET_RANDOM'
	payload: boolean
}

export type CurrentTrackState = {
	type: 'SET_CURRENT_TRACK'
	payload: ITrack | null
}

export type NextTrackState = {
	type: 'NEXT_TRACK'
	payload: {
		isRandom: boolean
	}
}

export type PreviousTrackState = {
	type: 'PREVIOUS_TRACK'
}

export type TrackIndexState = {
	type: 'SET_TRACK_INDEX'
	payload: number
}

export type PlayerActionTypes =
	| LoadTracksAction
	| DurationState
	| TimeProgressState
	| VolumeState
	| MuteState
	| TogglePlayPauseAction
	| SetPlayingAction
	| SetRepeatAction
	| SetRandomAction
	| CurrentTrackState
	| NextTrackState
	| PreviousTrackState
	| TrackIndexState

export interface PlayerState {
	tracks: ITrack[]
	duration: number
	timeProgress: number
	volume: number
	isMute: boolean
	isPlaying: boolean
	isRepeat: boolean
	isRandom: boolean
	currentTrack: ITrack | null
	trackIndex: number
}

export type RootState = {
	items: ITrack[]
	likes: ITrack[]
	currentTrack: ITrack | null
	trackIndex: number
	filters: IFilters
	player: PlayerState
}
