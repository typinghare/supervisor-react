import { Worklist } from './Worklist'

export interface WorklistTabPanelProps {
    userId: number
}

export function WorklistTabPanel(props: WorklistTabPanelProps): JSX.Element {
    const { userId } = props

    return (
        <Worklist userId={userId}>

        </Worklist>
    )
}