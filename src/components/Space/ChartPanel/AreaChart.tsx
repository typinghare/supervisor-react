import { AxisOptions, Chart } from 'react-charts'
import { ChartOptions } from 'react-charts/types/types'
import { useMemo } from 'react'
import { ChartBox } from '../../Common/Chart/ChartBox'
import moment from 'moment'

export type DateMinutesDatum = {
    date: Date,

    // Minutes in minutes.
    minutes: number
}

export interface AreaChartProps {
    data: DateMinutesDatum[]
}

export function AreaChart(props: AreaChartProps): JSX.Element {
    const { data } = props

    const primaryAxis = useMemo<AxisOptions<DateMinutesDatum>>(() => {
        return {
            getValue: (datum: DateMinutesDatum) => {
                return moment(datum.date).format('MMM Do')
            },
        }
    }, [])

    const secondaryAxes = useMemo<AxisOptions<DateMinutesDatum>[]>(() => {
        return [{
            getValue: (datum: DateMinutesDatum) => datum.minutes,
            elementType: 'area',
        }]
    }, [])

    const options: ChartOptions<DateMinutesDatum> = {
        data: [
            { data },
        ], primaryAxis, secondaryAxes,
    }

    return (
        <ChartBox title={'Total Duration of Each Day'}>
            <Chart options={options} />
        </ChartBox>
    )
}