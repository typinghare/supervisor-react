import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog212(): JSX.Element {
    return (
        <Changelog
            version='2.1.2'
            releaseDate={moment('09/12/2022').toDate()}
        >
            <ul>
                <li>Fixed the issue where task cards sometimes didn't display the time properly.</li>
                <li>Fixed bug with deleted tasks counting towards past week's total time.</li>
            </ul>
        </Changelog>
    )
}