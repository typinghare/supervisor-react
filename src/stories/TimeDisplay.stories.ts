import { StoryObj } from '@storybook/react'
import { TimeDisplay } from '../components/Common/TimeDisplay'
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'
import '../index.css'

const meta = {
    title: 'Common/TimeDisplay',
    component: TimeDisplay,
    tags: ['time'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        time: SlowHourMinuteSecond.ofMinutes(78),
    },
}

export const TimeIsUndefined: Story = {
    args: {},
}

export const FlashStandard: Story = {
    args: {
        time: SlowHourMinuteSecond.ofMinutes(78),
        flash: true,
    },
}

export const FlashFast: Story = {
    args: {
        time: SlowHourMinuteSecond.ofMinutes(78),
        flash: true,
        flashInterval: 500,
    },
}

export const FlashSlow: Story = {
    args: {
        time: SlowHourMinuteSecond.ofMinutes(78),
        flash: true,
        flashInterval: 1500,
    },
}