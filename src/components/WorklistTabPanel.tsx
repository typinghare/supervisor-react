import { Worklist } from './Worklist'

export interface WorklistTabProps {
    userId: number
}

export function WorklistTab(props: WorklistTabProps): JSX.Element {
    const { userId } = props

    return (
        <Worklist userId={userId}>

        </Worklist>
    )
}