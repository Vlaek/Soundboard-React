import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './MultiSelect.module.scss'
import Select, { MultiValue, StylesConfig, GroupBase } from 'react-select'
import makeAnimated from 'react-select/animated'
import { RootState } from 'store/types'
import { setFilters } from 'store/actions/filters'

interface IOption {
	value: string
	label: string
}

const options: IOption[] = [
	{ value: 'Геральт', label: 'Геральт из Ривии' },
	{ value: 'Крестьянин', label: 'Крестьянин' },
	{ value: 'Бандит', label: 'Бандит' },
	{ value: 'Стражник', label: 'Стражник' },
	{ value: 'Крестьянка', label: 'Крестьянка' },
]

const MultiSelect: FC = () => {
	const dispatch = useDispatch()
	const filters = useSelector((state: RootState) => state.filters)

	const [option, setOption] = useState<MultiValue<IOption> | null>(null)

	const noOptionsMessage = () => 'Нет доступных вариантов'

	const animatedComponents = makeAnimated()

	const handleChange = (option: readonly IOption[]) => {
		if (option && option.length <= 3) {
			setOption(option)
			const values = option.map(item => item.value)
			dispatch(setFilters({ ...filters, authorFilter: values }))
		}
	}

	const colorStyles: StylesConfig<IOption, true, GroupBase<IOption>> = {
		control: (base, state) => ({
			...base,
			border: state.isFocused ? 0 : 0,
			boxShadow: state.isFocused ? 'none' : 'none',
		}),
		menuList: base => ({
			...base,
			padding: 0,
		}),
	}

	return (
		<Select
			className={styles.select}
			options={options}
			defaultValue={option}
			onChange={handleChange}
			isMulti
			styles={colorStyles}
			isSearchable={false}
			placeholder='Выбрать...'
			components={animatedComponents}
			noOptionsMessage={noOptionsMessage}
			isOptionDisabled={() => (option && option.length >= 3 ? true : false)}
		/>
	)
}

export default MultiSelect
