import { createContext, useContext } from 'react'

// type ProgressBarRefs = {
// 	progressBarRef: React.RefObject<HTMLInputElement>
// 	progressRef: React.RefObject<HTMLDivElement>
// }

// const ProgressBarContext = createContext<ProgressBarRefs | null>(null)

// type ProgressBarProviderProps = {
// 	children: React.ReactNode
// }

// export const useProgressBar = () => {
// 	const context = useContext(ProgressBarContext)
// 	if (!context) {
// 		throw new Error(
// 			'useProgressBar должен использоваться внутри ProgressBarProvider',
// 		)
// 	}
// 	return context as ProgressBarRefs // Утверждение типа здесь
// }

// export const ProgressBarProvider = ({ children }: ProgressBarProviderProps) => {
// 	const progressBarRef = useRef<HTMLInputElement>(null)
// 	const progressRef = useRef<HTMLDivElement>(null)

// 	return (
// 		<ProgressBarContext.Provider value={{ progressBarRef, progressRef }}>
// 			{children}
// 		</ProgressBarContext.Provider>
// 	)
// }

const MyContext = createContext<{
	progressBarRef: React.RefObject<HTMLInputElement> | null
	progressRef: React.RefObject<HTMLDivElement> | null
}>({
	progressBarRef: null,
	progressRef: null,
})

export function useMyContext() {
	return useContext(MyContext)
}

export default MyContext
