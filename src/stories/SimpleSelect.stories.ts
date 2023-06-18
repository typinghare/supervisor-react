import { StoryObj } from '@storybook/react'
import { SimpleSelect } from '../components/Common/SimpleSelect'

const meta = {
    title: 'Common/SimpleSelect',
    component: SimpleSelect,
    tags: ['select'],
    argTypes: {
        backgroundColor: { control: 'color' },
    },
}

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        label: 'age',
        valueItemList: [
            {
                value: 20,
                item: 'Twenty',
            },
            {
                value: 25,
                item: 'Twenty-five',
            },
            {
                value: 30,
                item: 'Thirty',
            },
            {
                value: 40,
                item: 'Forty',
            },
        ],
        defaultValue: 25,
    },
}