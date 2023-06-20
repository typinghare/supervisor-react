import { Page } from './Common/Page'
import { Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'
import { selectUserId } from '../redux/slice/UserSlice'
import { Frontend } from '../common/constants/frontend'
import { useEffect } from 'react'

export function HomePage(): JSX.Element {
    const userId = useAppSelector(selectUserId)
    const navigate = useNavigate()

    useEffect(() => {
        if (userId) {
            navigate(Frontend.Url.Space)
        }
    }, [userId, navigate])

    return (
        <Page>
            <Alert severity='info'>
                Welcome to Supervisor 2! I haven't yet designed the home page.
            </Alert>
        </Page>
    )
}