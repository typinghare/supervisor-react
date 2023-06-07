import { Box, Typography } from '@mui/material'
import { Changelog200 } from './changelog/Changelog200'
import { Changelog210 } from './changelog/Changelog210'
import { Changelog211 } from './changelog/Changelog211'
import { Changelog212 } from './changelog/Changelog212'
import { Changelog220 } from './changelog/Changelog220'
import { SupervisorContainer } from './SupervisorContainer'
import { MuiStyles } from '../common/interfaces'

/**
 * The about page includes a piece of statement and changelogs.
 */
export const AboutPage = function (): JSX.Element {
    const style = { marginBottom: '2em' }

    return <SupervisorContainer sx={style} children={<Changelog />} />
}

export const Changelog = function (): JSX.Element {
    const styles: MuiStyles = {
        changeLogTitle: {
            color: '#4361ee',
            textAlign: 'center',
            fontWeight: 'bold',
        },
    }

    return (
        <Box>
            <Statement />

            <Typography variant="h4" mt={4} sx={styles.changeLogTitle}>
                Changelog
            </Typography>

            <Changelog200 />
            <Changelog210 />
            <Changelog211 />
            <Changelog212 />
            <Changelog220 />
        </Box>
    )
}

const Statement = function (): JSX.Element {
    const styles = {
        root: {
            marginTop: '1em',
            backgroundColor: '#e5f6fd',
            padding: '1em',
        },
        title: {
            marginBottom: '0.5em',
        },
    }

    return (
        <Box sx={styles.root}>
            <Typography variant="h4" sx={styles.title}>
                Statement
            </Typography>
            <Typography variant="body1" mb={1}>
                The earliest version of <b>Supervisor</b> was developed in 2019 when I was a sophomore student. It
                accompanied me for a half year, and I kept myself self-disciplined with its assistance. But after then I
                indulged myself in playing computer games due to the Covid-19 Lockdown Policy, not using it anymore.
                Even worse, I lost all my source code after wrongly formatting my computer without pushing it to any
                remote repository.
            </Typography>
            <Typography variant="body1" mb={1}>
                Now, I am suffering from the desperation of solitary after immigrating to the United States, without a
                chance to go to university and pursue my favorite subject, computer science. Next month my family will
                move to Boston, a city with better social security than Chicago, where I am living right now. I hope I
                can restart my transient life there.
            </Typography>
            <Typography variant="body1" mb={1}>
                By remaking <b>Supervisor</b>, I want myself to delve into study once again, just like what I did three
                years ago. My friends, coworkers, classmates, teammates, all of you guys can supervise me and witness my
                growth and change.
            </Typography>
            <Typography variant="body1">—March 18, 2022</Typography>
        </Box>
    )
}
