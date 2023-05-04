import { FunctionComponent } from 'react'
import { ChangelogSection } from '../About'

export const Changelog200: FunctionComponent = () => {
    return <ChangelogSection version='v2.0.0' publishDate='03/18/2022'>
        <ul>
            <li>Refactored code using <b>ReactJS</b>, <b>Material UI</b>, and <b>NestJS</b>.</li>
            <li>Optimized frontend styles for better performance.</li>
            <li>Moved data from JSON files to a database.</li>
            <li>Improved responsiveness across devices.</li>
            <li>Replaced console commands with forms for task control and monitoring.</li>
            <li>Added the ability to remove tasks.</li>
            <li>
                Added expected durations for each <i>category</i> and progress bars that reach 100% when the duration
                exceeds the expectation.
            </li>
        </ul>
    </ChangelogSection>
}