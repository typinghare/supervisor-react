import { StoryObj } from '@storybook/react'
import { TaskStage } from '../common/enum/TaskStage'
import { TaskCard } from '../components/TaskCard/TaskCard'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

const meta = {
    title: 'Task/TaskCard',
    component: TaskCard,
    tags: ['task-card'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        id: 1,
        taskStage: TaskStage.PENDING,
        duration: 0,
        subjectName: 'English',
        categoryName: 'Reading',
        expectedDuration: 45,
        commentArray: ['This is a comment'],
    },
}

export const Pending: Story = {
    args: {
        id: 1,
        taskStage: TaskStage.PENDING,
        duration: 0,
        subjectName: 'English',
        categoryName: 'Reading',
        expectedDuration: 45,
        commentArray: ['This is a comment'],
    },
}

export const Ongoing: Story = {
    args: {
        id: 1,
        taskStage: TaskStage.ONGOING,
        duration: 25,
        subjectName: 'English',
        categoryName: 'Reading',
        startedAt: SlowHourMinuteSecond.ofMinutes(710),
        expectedDuration: 45,
        commentArray: ['This is a comment'],
    },
}

export const Paused: Story = {
    args: {
        id: 1,
        taskStage: TaskStage.PAUSED,
        duration: 25,
        subjectName: 'English',
        categoryName: 'Reading',
        startedAt: SlowHourMinuteSecond.ofMinutes(710),
        expectedDuration: 45,
        commentArray: ['This is a comment'],
    },
}

export const Ended: Story = {
    args: {
        id: 1,
        taskStage: TaskStage.ENDED,
        duration: 40,
        subjectName: 'English',
        categoryName: 'Reading',
        startedAt: SlowHourMinuteSecond.ofMinutes(710),
        endedAt: SlowHourMinuteSecond.ofMinutes(750),
        expectedDuration: 45,
        commentArray: ['This is a comment'],
    },
}