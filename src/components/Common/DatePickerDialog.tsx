import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { StaticDatePicker } from '@mui/x-date-pickers'
import { Dialog } from '@mui/material'
import { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'

export interface DatePickerDialogProps {
    // Whether the dialog is open.
    open: boolean

    // The default date selected when the dialog to be opened.
    defaultDate?: Date

    // Callback fired when the dialog to be closed.
    onClose: () => void

    // Callback fired when a date is selected.
    onDateSelected: (date: Date) => void
}

export function DatePickerDialog(props: DatePickerDialogProps): JSX.Element {
    const { open, defaultDate, onClose, onDateSelected } = props
    const [date, setDate] = useState(defaultDate || new Date())

    function handleDialogClose() {
        onClose()
    }

    function handleDatePickerChange(date: Dayjs | null) {
        if (date) {
            setDate(date.toDate())
            onDateSelected(date.toDate())
        }
    }

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
        >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    disableFuture
                    value={dayjs(date)}
                    onChange={handleDatePickerChange}
                />
            </LocalizationProvider>
        </Dialog>
    )
}