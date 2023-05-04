import { FunctionComponent } from 'react'
import { ChangelogSection } from '../About'

export const Changelog220: FunctionComponent = () => {
    return <ChangelogSection version='v2.2.0' publishDate='05/03/2023'>
        <ul>
            <li>Refactored the backend using Java19 and Spring framework.</li>
        </ul>
    </ChangelogSection>
}