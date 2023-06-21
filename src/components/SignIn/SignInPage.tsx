import { useNavigate } from 'react-router-dom'
import { Page } from '../Common/Page'
import { useAppSelector } from '../../redux/hooks'
import { selectUserId, signIn } from '../../redux/slice/UserSlice'
import { useEffect, useState } from 'react'
import { Frontend } from '../../common/constants/frontend'
import { collectStyles } from '../../common/functions/style'
import { Alert, Box, Button } from '@mui/material'
import { UsernameInput } from '../Common/UsernameInput'
import { PasswordInput } from '../Common/PasswordInput'
import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { UserTokenDto } from '../../dto/UserTokenDto'
import { useCookies } from 'react-cookie'
import Api from '../../common/api'
import useSwitch from '../../hook/useSwitch'
import CookieKey = Frontend.CookieKey

export function SignInPage(): JSX.Element {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [, setCookies] = useCookies([CookieKey.UserId, CookieKey.Token, CookieKey.Username])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isAlertShow, openAlert, closeAlert] = useSwitch()

    const userId = useAppSelector(selectUserId)

    const { mutate, isLoading } = useMutation(Api.signIn, {
        onSuccess: (response: Api.HttpResponse<UserTokenDto>) => {
            const data = response.data
            dispatch(signIn({
                userId: data.id,
                token: data.token,
                username: data.username,
            }))

            const config = {
                path: Frontend.Basename,
                expires: Frontend.DEFAULT_COOKIE_EXPIRE_TIME,
            }
            setCookies(CookieKey.UserId, data.id, config)
            setCookies(CookieKey.Token, data.token, config)
            setCookies(CookieKey.Username, data.username, config)

            // Redirect to space page.
            navigate(Frontend.Url.Space)
        },
        onError: () => {
            openAlert()
        },
    })

    function handleSubmit() {
        closeAlert()
        mutate({ username, password })
    }

    useEffect(() => {
        if (userId !== undefined) {
            navigate(Frontend.Url.Home)
        }
    }, []) // eslint-disable-line

    const styles = collectStyles({
        alert: {
            marginBottom: '1em',
        },
        content: (theme) => ({
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
        }),
    })

    return (
        <Page>
            <Box sx={styles.content}>
                {isAlertShow && (
                    <Alert severity='error' sx={styles.alert}>
                        The username or password is incorrect. Please try again.
                    </Alert>
                )}

                <UsernameInput username={username} onChange={setUsername} />
                <PasswordInput password={password} onChange={setPassword} />

                <Button
                    variant='contained'
                    color='info'
                    role='submit'
                    type='submit'
                    sx={{ width: '100%' }}
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    SIGN IN
                </Button>
            </Box>
        </Page>
    )
}
