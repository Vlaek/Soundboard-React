import { FC, useState } from 'react'
import styles from './MultiSelect.module.scss'
import Select, { MultiValue, StylesConfig, GroupBase } from 'react-select'
import makeAnimated from 'react-select/animated'

interface IOption {
	value: string
	label: string
}

const options: IOption[] = [
	{ value: 'geralt', label: 'Геральт из Ривии' },
	{ value: 'npc', label: 'НПС' },
	{ value: 'zoltan', label: 'Золтан' },
]

const MultiSelect: FC = () => {
	const [option, setOption] = useState<MultiValue<IOption> | null>(null)

	const noOptionsMessage = () => 'Нет доступных вариантов'

	const animatedComponents = makeAnimated()

	const handleChange = (option: readonly IOption[]) => {
		if (option && option.length <= 3) {
			setOption(option)
		}
	}

	const colorStyles: StylesConfig<IOption, true, GroupBase<IOption>> = {
		control: (base, state) => ({
			...base,
			border: state.isFocused ? 0 : 0,
			boxShadow: state.isFocused ? 'none' : 'none',
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
		/>
	)
}

export default MultiSelect
