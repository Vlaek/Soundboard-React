export interface IBanner {
	id: number
	img: string
	link: string
}

export interface ITrack {
	id: number
	file: string
	name: string
	author: string
	duration: string
	explicit: boolean
}

export interface IFilters {
	authorFilter: string[]
	explicitFilter: boolean
	likesFilter: boolean
	sort: string
	searchQuery: string
}
