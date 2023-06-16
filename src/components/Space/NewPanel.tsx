import { Alert } from '@mui/material'

export interface NewPanelProps {
    userId: number
}

export function NewPanel(props: NewPanelProps): JSX.Element {
    const { userId } = props

    return (
        <>
            <Alert >
                This is a new panel.
            </Alert>
        </>
    )
}