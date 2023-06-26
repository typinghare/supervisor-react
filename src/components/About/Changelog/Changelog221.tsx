import { Changelog } from '../Changelog'
import moment from 'moment'

export function Changelog221(): JSX.Element {
    return (
        <Changelog
            version='2.2.1'
            releaseDate={moment('06/26/2023').toDate()}
        >
            <ul>
                <li>
                    Resolved an issue where the "new" and "control" panels were incorrectly appearing in the bottom
                    navigation for visitors.
                </li>

                <li>
                    After successfully creating a task by clicking the "CREATE & START" button,
                    the interface will now automatically switch to the "control" panel.
                </li>

                <li>
                    Added the ability to delete tasks.
                </li>

                <li>
                    Added start icons for buttons in the "control" panel.
                </li>

                <li>
                    Adjusted the size of components within the "new" panel, ensuring a more visually balanced
                    and cohesive layout.
                </li>

                <li>
                    Updated navigation styles.
                </li>
            </ul>
        </Changelog>
    )
}