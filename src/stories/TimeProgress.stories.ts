import { TimeProgress } from '../components/TaskCard/TimeProgress'
import { StoryObj } from '@storybook/react'
import { TaskStage } from '../common/enum/TaskStage'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'


const meta = {
    title: 'Common/TimeProgress',
    component: TimeProgress,
    tags: ['time'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        taskStage: TaskStage.ONGOING,
        startedAt: SlowHourMinuteSecond.ofMinutes(620),
        duration: 18,
        expectedDuration: 60,
    },
}

export const Pending: Story = {
    args: {
        taskStage: TaskStage.PENDING,
        startedAt: SlowHourMinuteSecond.ofMinutes(620),
        duration: 18,
        expectedDuration: 60,
    },
}