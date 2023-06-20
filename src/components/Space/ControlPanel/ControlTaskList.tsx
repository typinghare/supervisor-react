import { TaskDto } from '../../../dto/TaskDto'
import { TaskCardWrapperCollection } from '../../TaskCard/TaskCardWrapperCollection'
import { convertTaskDtoToTask } from '../../../common/functions/conversion'

export interface ControlTaskListProps {
    taskDtoList?: TaskDto[]
    selectedTaskId?: number
    onSelect: (selectedTaskId: number) => void
}

export function ControlTaskList(props: ControlTaskListProps): JSX.Element {
    const { taskDtoList, selectedTaskId, onSelect } = props

    function handleSelect(selectedTaskId: number) {
        onSelect(selectedTaskId)
    }

    if (taskDtoList === undefined || selectedTaskId === undefined) {
        return <></>
    }

    return (
        <TaskCardWrapperCollection
            taskList={taskDtoList.map(convertTaskDtoToTask)}
            selectedTaskId={selectedTaskId}
            onSelect={handleSelect}
        />
    )
}