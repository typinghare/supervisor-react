import { ChangelogSection } from '../ChangelogSection'

export const Changelog212 = function (): JSX.Element {
    return (
        <ChangelogSection version="v2.1.2" publishDate="09/12/2022">
            <ul>
                <li>Fixed the issue where task cards sometimes didn't display the time properly.</li>
                <li>Fixed bug with deleted tasks counting towards past week's total time.</li>
            </ul>
        </ChangelogSection>
    )
}
