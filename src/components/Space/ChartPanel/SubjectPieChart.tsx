import Chart from 'react-apexcharts'
import { ChartBox } from '../../Common/Chart/ChartBox'
import { ApexOptions } from 'apexcharts'
import { renderToStaticMarkup } from 'react-dom/server'
import useDeviceSize, { DeviceSize } from '../../../hook/useDeviceSize'

export interface SubjectMinuteDatum {
    subjectName: string
    minutes: number
}

export interface SubjectPieChartProps {
    data: SubjectMinuteDatum[]
}

export function SubjectPieChart(props: SubjectPieChartProps): JSX.Element {
    const { data } = props
    const isSmallDevice = useDeviceSize() === DeviceSize.Small

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
        legend: {
            show: !isSmallDevice,
        },
        dataLabels: {
            enabled: true,
            formatter: (val: number) => Math.round(val) + '%',
        },
        tooltip: {
            custom: function({ seriesIndex }) {
                const datum = data[seriesIndex]
                const element = (
                    <div style={{ padding: '0.25em 0.5em' }}>
                        {datum.subjectName}&nbsp;-&nbsp;
                        <span style={{ fontWeight: 'bold' }}>{datum.minutes}</span>
                        &nbsp;min
                    </div>
                )

                return renderToStaticMarkup(element).toString()
            },
        }
    }

    return (
        <ChartBox title={'Total Duration of Each Subject'}>
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