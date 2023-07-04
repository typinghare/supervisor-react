import { Changelog, ChangelogContent } from '../Changelog'
import moment from 'moment'

export function Changelog221(): JSX.Element {
    const content: ChangelogContent = {
        newFeatureList: [
            <span>Added the ability to delete tasks.</span>,
            <span>Added start icons for buttons in the "control" panel.</span>,
        ],
        improvedFeatureList: [
            <span>
                Adjusted the size of components within the <u>new</u> panel, ensuring a more visually balanced
                 and cohesive layout.
            </span>,
            <span>
                Improved navigation bar styles.
            </span>,
        ],
        fixedList: [
            <span>
               Resolved an issue where the <u>new</u> and <u>control</u> panels were incorrectly appearing in the bottom
                navigation for visitors.
            </span>,
            <span>
               After successfully creating a task by clicking the <u>CREATE & START</u> button, the interface will now
                automatically switch to the <u>control</u> panel.
            </span>,
        ],
    }

    return (
        <Changelog
            version='2.2.1'
            releaseDate={moment('06/26/2023', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}