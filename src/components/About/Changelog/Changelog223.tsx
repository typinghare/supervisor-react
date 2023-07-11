import { Changelog, ChangelogContent } from '../Changelog'
import moment from 'moment'

export function Changelog223(): JSX.Element {
    const content: ChangelogContent = {
        newFeatureList: [
            <span>
                Implemented a smooth hovering animation for task cards in the control panel.
            </span>,
        ],
        improvedFeatureList: [
            <span>
                Enhanced the visual appeal of the loading interface in the chart panel.
            </span>,
            <span>
                Revamped the footer design for a more modern and polished appearance.
            </span>,
        ],
        fixedList: [
            <span>
                Resolved an issue where the <code>tab</code> query parameter to update when switching panels
            </span>,
        ],
    }

    return (
        <Changelog
            version='2.2.3'
            releaseDate={moment('07/12/2023', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}