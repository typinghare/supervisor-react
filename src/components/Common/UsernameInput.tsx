import { collectStyles } from '../../common/functions/style'
import { InputAdornment, TextField } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { ChangeEvent } from 'react'

export interface UsernameInputProps {
    username: string
    onChange: (username: string) => void
}

export function UsernameInput(props: UsernameInputProps): JSX.Element {
    const { username, onChange } = props

    const styles = collectStyles({
        icon: {
            color: 'action.active',
        },
        textField: {
            width: '100%',
            marginBottom: '1em',
        },
    })

    const startAdornment: JSX.Element =
        <InputAdornment position='start'>
            <AccountCircle sx={styles.icon} />
        </InputAdornment>

    function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }

    return (
        <TextField
            label='username'
            role='username'
            variant='standard'
            sx={styles.textField}
            value={username}
            onChange={handleTextChange}
            InputProps={{ startAdornment }}
        />
    )
}