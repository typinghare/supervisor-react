import { Worklist } from './Worklist'

export interface WorklistPanelProps {
    userId: number,
}

export function WorklistPanel(props: WorklistPanelProps): JSX.Element {
    const { userId } = props

    return (
        <Worklist userId={userId} />
    )
}