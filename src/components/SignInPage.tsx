import React from 'react'
import { Box, Button, InputAdornment, TextField, Theme } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { userSignIn } from '../api/user.api'
import { UserTokenDto } from '../dto/UserTokenDto'
import { AccountCircle } from '@mui/icons-material'
import { UserSignInDto } from '../dto/UserSignInDto'
import { HttpResponse } from '../common/api'
import { useUser } from '../state/user'
import { Url } from '../common/constant'
import { Page } from './Layout/Page'

export const SignInPage: React.FC = function(): JSX.Element {
    const navigate = useNavigate()
    const user = useUser()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    React.useEffect((): void => {
        if (user.hasSignedIn()) {
            navigate(Url.Space)
        }
    }, [user, navigate])

    const style = (theme: Theme) => ({
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: 0,
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 15%',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 30%',
        },
    })

    return <Page>
        <Box sx={style}>
            <UsernameTextField username={username} onChange={username => setUsername(username)} />
            <PasswordTextField password={password} onChange={password => setPassword(password)} />
            <SubmitButton username={username} password={password} />
        </Box>
    </Page>
}

export type UsernameTextFieldProps = {
    username: string,
    onChange: (username: string) => void
}

export const UsernameTextField: React.FC<UsernameTextFieldProps> = function(props): JSX.Element {
    const { username, onChange } = props

    const startAdornment: JSX.Element =
        <InputAdornment position='start'>
            <AccountCircle sx={{ color: 'action.active' }} />
        </InputAdornment>

    return <TextField
        label='username'
        role='username'
        variant='standard'
        sx={{ width: '100%', marginBottom: '1em' }}
        value={username}
        onChange={function(event: React.ChangeEvent<HTMLInputElement>): void {
            onChange(event.target.value as string)
        }}
        InputProps={{ startAdornment }}
    />
}

export type PasswordTextFieldProps = {
    password: string,
    onChange: (password: string) => void
}

export const PasswordTextField: React.FC<PasswordTextFieldProps> = function(props): JSX.Element {
    const { password, onChange } = props

    const startAdornment: JSX.Element =
        <InputAdornment position='start'>
            <KeyIcon sx={{ color: 'action.active' }} />
        </InputAdornment>

    return <TextField
        label='password'
        role='password'
        type='password'
        variant='standard'
        sx={{ width: '100%', marginBottom: '1em' }}
        value={password}
        onChange={function(event: React.ChangeEvent<HTMLInputElement>): void {
            onChange(event.target.value as string)
        }}
        InputProps={{ startAdornment }}
    />
}

export type SubmitButtonProps = {
    username: string,
    password: string,
}

export const SubmitButton: React.FC<SubmitButtonProps> = function(props): JSX.Element {
    const { username, password } = props
    const user = useUser()
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(userSignIn, {
        onSuccess: (response: HttpResponse<UserTokenDto>): void => {
            user.signIn(response.data)

            // Redirect to space page.
            navigate(Url.Space)
        },
    })

    function handleSubmit(): void {
        mutate({ username, password } as UserSignInDto)
    }

    return <Button
        variant='contained'
        color='info'
        role='submit'
        sx={{ width: '100%' }}
        onClick={handleSubmit}
        disabled={isLoading}
        children='SIGN IN'
    />
}