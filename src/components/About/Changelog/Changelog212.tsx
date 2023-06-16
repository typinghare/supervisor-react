import { Changelog } from '../Changelog'

export function Changelog212(): JSX.Element {
    return (
        <Changelog version='2.1.2' releaseDate='Sep 12th, 2022'>
            <ul>
                <li>Fixed the issue where task cards sometimes didn't display the time properly.</li>
                <li>Fixed bug with deleted tasks counting towards past week's total time.</li>
            </ul>
        </Changelog>
    )
}