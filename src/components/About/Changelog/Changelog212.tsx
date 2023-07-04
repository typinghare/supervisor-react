import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog212(): JSX.Element {
    const content = {
        fixedList: [
            <span>Fixed the issue where task cards sometimes didn't display the time properly.</span>,
            <span>Fixed bug with deleted tasks counting towards past week's total time.</span>,
        ],
    }

    return (
        <Changelog
            version='2.1.2'
            releaseDate={moment('09/12/2022', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}