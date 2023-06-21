import { collectStyles } from '../../common/functions/style'
import { InputAdornment, TextField, TextFieldProps } from '@mui/material'
import { ChangeEvent } from 'react'
import KeyIcon from '@mui/icons-material/Key'

export type PasswordInputProps = Omit<TextFieldProps, 'onChange'> & {
    password: string
    onChange: (password: string) => void
}

export function PasswordInput(props: PasswordInputProps): JSX.Element {
    const { password, onChange, ...otherProps } = props

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
            <KeyIcon sx={styles.icon} />
        </InputAdornment>

    function handleTextChange(event: ChangeEvent<HTMLInputElement>) {
        onChange(event.target.value)
    }

    return (
        <TextField
            label='password'
            role='password'
            type='password'
            variant='standard'
            sx={styles.textField}
            value={password}
            onChange={handleTextChange}
            InputProps={{ startAdornment }}
            {...otherProps}
        />
    )
}