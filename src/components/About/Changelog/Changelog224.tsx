import { Changelog, ChangelogContent } from '../Changelog'
import moment from 'moment'

export default function Changelog224() {
    const content: ChangelogContent = {
        newFeatureList: [
            <span>
                Implemented Autocomplete Functionality for Comment Text in Task Creation.
            </span>,
        ],
        fixedList: [
            <span>
                Resolved an issue where only today's task are displayed in the control panel.
            </span>,
        ],
    }

    return (
        <Changelog
            version='2.2.4'
            releaseDate={moment('07/30/2023', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}