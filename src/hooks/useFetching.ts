import { useState } from 'react'
import { IUseFetching } from '../types/types'

export const useFetching = (callback: () => Promise<void>): IUseFetching => {
	const [isLoading, setIsLoading] = useState(false)
	const [itemsError, setError] = useState<string | boolean>(false)

	const fetchItems = async () => {
		try {
			setIsLoading(true)
			await callback()
		} catch (e) {
			setError(typeof e === 'string' ? e : true)
		} finally {
			setIsLoading(false)
		}
	}

	return { isLoading, itemsError, fetchItems }
}
