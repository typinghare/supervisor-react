import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog200(): JSX.Element {
    return (
        <Changelog
            version='2.0.0'
            releaseDate={moment('03/18/2023').toDate()}
        >
            <ul>
                <li>
                    Refactored code using <b>ReactJS</b>, <b>Material UI</b>, and <b>NestJS</b>.
                </li>
                <li>Optimized frontend styles for better performance.</li>
                <li>Moved data from JSON files to a database.</li>
                <li>Improved responsiveness across devices.</li>
                <li>Replaced console commands with forms for task control and monitoring.</li>
                <li>Added the ability to remove tasks.</li>
                <li>
                    Added an expected duration for each <i>category</i> and progress bars that reach 100% when the
                    duration exceeds the expectation.
                </li>
            </ul>
        </Changelog>
    )
}