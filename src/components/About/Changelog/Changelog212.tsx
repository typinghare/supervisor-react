import { ChangelogSection } from '../ChangelogSection'

export function Changelog212(): JSX.Element {
    return (
        <ChangelogSection version='v2.1.2' releaseDate='09/12/2022'>
            <ul>
                <li>Fixed the issue where task cards sometimes didn't display the time properly.</li>
                <li>Fixed bug with deleted tasks counting towards past week's total time.</li>
            </ul>
        </ChangelogSection>
    )
}
