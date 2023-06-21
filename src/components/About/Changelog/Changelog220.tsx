import { Changelog } from '../Changelog'
import moment from 'moment'

export function Changelog220(): JSX.Element {
    return (
        <Changelog
            version='2.2.0'
            releaseDate={moment('06/21/2023').toDate()}
        >
            <ul>
                <li>
                    Refactored the backend using Java19 and Spring framework.
                </li>

                <li>
                    Revamped frontend interface for enhancing user experience.
                </li>

                <li>
                    Now bottom navigation substitutes tabs in small devices.
                </li>

                <li>
                    Now user can customize subjects and categories in the "New" tab.
                </li>

                <li>
                    Added plenty of loading effects, such as skeleton and text prompts.
                </li>
            </ul>
        </Changelog>
    )
}