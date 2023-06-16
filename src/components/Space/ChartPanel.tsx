import { Alert } from '@mui/material'

export interface ChartPanelProps {
    userId: number
}

export function ChartPanel(props: ChartPanelProps): JSX.Element {
    const { userId } = props

    return (
        <>
            <Alert >
                This is a chart panel.
            </Alert>
        </>
    )
}