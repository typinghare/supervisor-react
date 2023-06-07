import React from 'react'
import { Box, Button, InputAdornment, TextField, Theme } from '@mui/material'
import KeyIcon from '@mui/icons-material/Key'
import { useNavigate } from 'react-router-dom'
import { LocalUser } from '../util/LocalUser'
import { BASE_URL, CookieKey, DEFAULT_COOKIE_EXPIRE_TIME, RedirectUrl } from '../common/constant'
import { useCookies } from 'react-cookie'
import { useMutation } from '@tanstack/react-query'
import { userSignIn } from '../api/user.api'
import { UserTokenDto } from '../dto/UserTokenDto'
import { AccountCircle } from '@mui/icons-material'
import { SupervisorContainer } from './SupervisorContainer'
import { UserSignInDto } from '../dto/UserSignInDto'
import { HttpResponse } from '../common/api'

export const SignInPage: React.FC = function(): JSX.Element {
    const navigate = useNavigate()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    React.useEffect((): void => {
        // If the user has signed in, redirect to the space page.
        if (LocalUser.INSTANCE().isSignedIn) {
            navigate(RedirectUrl.SPACE)
        }
    }, [navigate])

    const style = (theme: Theme) => ({
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            padding: 0
        },
        [theme.breakpoints.up('md')]: {
            padding: '0 15%'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '0 30%'
        },
    })

    return <SupervisorContainer>
        <Box sx={style}>
            <UsernameTextField username={username} onChange={username => setUsername(username)} />
            <PasswordTextField password={password} onChange={password => setPassword(password)} />
            <SubmitButton username={username} password={password} />
        </Box>
    </SupervisorContainer>
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, setCookie] = useCookies([CookieKey.USER_ID, CookieKey.TOKEN, CookieKey.USERNAME])
    const navigate = useNavigate()

    const { mutate, isLoading } = useMutation(userSignIn, {
        onSuccess: (response: HttpResponse<UserTokenDto>): void => {
            const { id, username, token } = response.data

            LocalUser.INSTANCE().signIn(id, username, token)
            setCookie(CookieKey.USER_ID, id, { path: BASE_URL, expires: DEFAULT_COOKIE_EXPIRE_TIME })
            setCookie(CookieKey.USERNAME, username, { path: BASE_URL, expires: DEFAULT_COOKIE_EXPIRE_TIME })
            setCookie(CookieKey.TOKEN, token, { path: BASE_URL, expires: DEFAULT_COOKIE_EXPIRE_TIME })

            // Redirect to space page.
            navigate(RedirectUrl.SPACE)
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