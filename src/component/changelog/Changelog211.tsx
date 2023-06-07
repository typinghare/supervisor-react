import { ChangelogSection } from '../ChangelogSection'

export const Changelog211 = function (): JSX.Element {
    return (
        <ChangelogSection version="v2.1.1" publishDate="08/14/2022">
            <ul>
                <li>
                    Improved task creation workflow: After a task is created, either the dashboard accordion or the
                    switch task accordion opens automatically.
                </li>
                <li>
                    Enhanced data visualization: A pie chart has been added to the graph section for better data
                    representation.
                </li>
                <li>Resolved an issue where the time was displayed incorrectly in the task card expanded content.</li>
                <li>Fixed a bug where tasks could be created without selecting a category.</li>
            </ul>
        </ChangelogSection>
    )
}
