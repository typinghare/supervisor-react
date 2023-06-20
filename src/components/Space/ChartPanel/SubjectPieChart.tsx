import Chart from 'react-apexcharts'
import { ChartBox } from '../../Common/Chart/ChartBox'
import { ApexOptions } from 'apexcharts'

export interface SubjectMinuteDatum {
    subjectName: string
    minutes: number
}

export interface SubjectPieChartProps {
    data: SubjectMinuteDatum[]
}

export function SubjectPieChart(props: SubjectPieChartProps): JSX.Element {
    const { data } = props

    if (data.length === 0) {
        return <></>
    }

    const subjectList: SubjectMinuteDatum['subjectName'][] = []
    const minutesList: SubjectMinuteDatum['minutes'][] = []
    data.forEach(datum => {
        subjectList.push(datum.subjectName)
        minutesList.push(datum.minutes)
    })

    const options: ApexOptions = {
        labels: subjectList,
        dataLabels: {
            enabled: true,
            formatter: (val: number) => Math.round(val) + '%',
        },
    }

    return (
        <ChartBox>
            <Chart
                type='donut'
                series={minutesList}
                options={options}
                width={'100%'}
                height={'100%'}
            />
        </ChartBox>
    )
}