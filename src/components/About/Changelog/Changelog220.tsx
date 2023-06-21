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
                    Now bottom navigation substitutes tabs on small devices.
                </li>

                <li>
                    Enhanced functionality in the 'New' tab to allow users to personalize subjects and categories.
                </li>

                <li>
                    Implemented various loading effects, including skeleton elements and text prompts.
                </li>

                <li>
                    Included a new feature that enables users to sign out.
                </li>
            </ul>
        </Changelog>
    )
}