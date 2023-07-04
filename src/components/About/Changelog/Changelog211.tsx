import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog211(): JSX.Element {
    const content = {
        improvedFeatureList: [
            <span>
               Improved task creation workflow: After a task is created, either the dashboard accordion or the
                    switch task accordion opens automatically.
            </span>,
            <span>
                   Enhanced data visualization: A pie chart has been added to the graph section for better data
                    representation.
            </span>,
        ],
        fixedList: [
            <span>Resolved an issue where the time was displayed incorrectly in the task card expanded content.</span>,
            <span>Fixed a bug where tasks could be created without selecting a category.</span>,
        ],
    }

    return (
        <Changelog
            version='2.1.1'
            releaseDate={moment('08/14/2022', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}