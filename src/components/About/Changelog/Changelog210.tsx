import { Changelog } from '../Changelog'
import moment from 'moment/moment'

export function Changelog210(): JSX.Element {
    const content = {
        newFeatureList: [
            <span><b>Nginx</b> is now being used as a reverse proxy for improved performance.</span>,
            <span>A user system has been added to Supervisor for better security and access control.</span>,
            <span><b>Recharts</b> has been integrated to provide data visualization and charting capabilities.</span>,
        ],
        improvedFeatureList: [
            <span>The database has been redesigned and optimized.</span>,
            <span>The frontend has been refactored using <b>Redux</b> for better state management.</span>,
            <span><b>React Router</b> has been employed to manage page routing for a smoother user experience.</span>,
            <span>The navigation has been updated with a modern and visually appealing design.</span>,
            <span>Users can now easily switch between tasks on the console.</span>,
        ],
    }

    return (
        <Changelog
            version='2.1.0'
            releaseDate={moment('08/11/2022', 'MM/DD/YYYY').toDate()}
            content={content}
        />
    )
}