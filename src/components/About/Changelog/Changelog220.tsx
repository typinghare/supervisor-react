import { Changelog } from '../Changelog'
import moment from 'moment'

export function Changelog220(): JSX.Element {
    const content = {
        newFeatureList: [
            <span>Refactored the backend using <b>Java 19</b> and <b>Spring Boot 3</b>.</span>,
            <span>Now bottom navigation substitutes tabs on small devices.</span>,
            <span>
               Implemented various loading effects, including skeleton elements and text prompts.
            </span>,
            <span>
               Enhanced functionality in the New tab to allow users to personalize subjects and categories.
            </span>,
            <span>
               Included a new feature that enables users to sign out.
            </span>,
        ],
        improvedFeatureList: [
            <span>Revamped frontend interface for enhancing user experience.</span>,
            <span>Optimized the implementation by incorporating <b>React Query</b> for efficient
                    debouncing and prevention of throttling.</span>,
        ],
    }

    return (
        <Changelog
            version='2.2.0'
            releaseDate={moment('06/21/2023', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}