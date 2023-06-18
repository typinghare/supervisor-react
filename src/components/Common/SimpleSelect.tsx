import { FormControl, FormControlProps, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { v4 } from 'uuid'
import { find } from 'lodash'

export interface ValueItemEntry {
    value: any
    item: string
}

export interface SimpleSelectProps extends FormControlProps {
    // The label displayed.
    label: string

    // Map associating values with corresponding items (string).
    valueItemList: ValueItemEntry[]

    // The default value.
    defaultValue?: any

    // Callback fired when the value to be changed.
    onValueChange: (value: any, item: string) => void
}

export function SimpleSelect(props: SimpleSelectProps): JSX.Element {
    const { label, valueItemList, defaultValue, onValueChange, ...otherProps } = props
    const [value, setValue] = useState(defaultValue || '')

    const labelId = v4()

    function handleSelectChange(event: SelectChangeEvent) {
        const value = event.target.value
        setValue(value)

        const valueItemEntry = find(valueItemList, entry => entry.value === value)
        onValueChange(value, valueItemEntry!.item)
    }

    return (
        <FormControl fullWidth {...otherProps}>
            <InputLabel id={labelId}> {label} </InputLabel>
            <Select
                labelId={labelId}
                value={value}
                label={label}
                onChange={handleSelectChange}
            >
                {valueItemList.map(({ value, item }) => (
                    <MenuItem key={value} value={value}>
                        {item}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}