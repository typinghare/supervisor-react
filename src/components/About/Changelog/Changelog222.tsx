import { Changelog, ChangelogContent } from '../Changelog'
import moment from 'moment'

export function Changelog222(): JSX.Element {
    const content: ChangelogContent = {
        newFeatureList: [
            <span>Introduced a new query parameter, <code>tab</code>, to facilitate indicating the selected tab.</span>,
            <span>
               Revamped Chart Tab Panel: Upgraded the user interface for an enhanced visual experience and improved
                usability.
            </span>,
            <span>
                Modernized Changelog Section: Upgraded the user interface for a more visually appealing and
                 user-friendly changelog experience.
            </span>,
        ],
        improvedFeatureList: [
            <span>
               Streamlined task deletion process with the addition of an alert dialog for delete confirmation.
            </span>,
            <span>
                Customized MUI theme colors.
            </span>,
        ],
    }

    return (
        <Changelog
            version='2.2.2'
            releaseDate={moment('07/04/2023', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}