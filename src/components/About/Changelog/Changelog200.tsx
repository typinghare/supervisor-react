import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog200(): JSX.Element {
    const content = {
        newFeatureList: [
            <span>Refactored code using <b>ReactJS</b>, <b>Material UI</b>, and <b>NestJS</b>.</span>,
            <span>Moved data from JSON files to a <b>MySQL</b> database.</span>,
            <span>Added an expected duration for each category and progress bars that reach 100% when the
                    duration exceeds the expectation.</span>,
            <span>Added the ability to remove tasks.</span>,
            <span>Replaced console commands with forms for task control and monitoring.</span>,
        ],
        improvedFeatureList: [
            <span>Optimized frontend styles for better performance.</span>,
            <span>Improved responsiveness across devices.</span>,
        ],
    }

    return (
        <Changelog
            version='2.0.0'
            releaseDate={moment('03/18/2022', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}