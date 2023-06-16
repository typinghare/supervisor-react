import { StoryObj } from '@storybook/react'
import { TaskCardHeader } from '../components/TaskCard/TaskCardHeader'
import { TaskStage } from '../common/enum/TaskStage'

const meta = {
    title: 'Task/TaskCardHeader',
    component: TaskCardHeader,
    tags: ['task-card'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        taskStage: TaskStage.PENDING,
        duration: 0,
        subjectName: 'English',
        categoryName: 'Reading',
    },
}

export const Pending: Story = {
    args: {
        taskStage: TaskStage.PENDING,
        duration: 0,
        subjectName: 'English',
        categoryName: 'Reading',
    },
}

export const Ongoing: Story = {
    args: {
        taskStage: TaskStage.ONGOING,
        duration: 25,
        subjectName: 'English',
        categoryName: 'Reading',
    },
}

export const Paused: Story = {
    args: {
        taskStage: TaskStage.PAUSED,
        duration: 25,
        subjectName: 'English',
        categoryName: 'Reading',
    },
}

export const Ended: Story = {
    args: {
        taskStage: TaskStage.ENDED,
        duration: 25,
        subjectName: 'English',
        categoryName: 'Reading',
    },
}