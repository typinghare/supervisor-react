import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Footer } from './Layout/Footer'
import { SupervisorRouter } from './Layout/SupervisorRouter'
import { Navigation } from './Layout/Navigation'

/**
 * Best practices references.
 * @link https://onesignal.com/blog/effective-typescript-for-react-applications/
 */
export const App = function(): JSX.Element {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <Navigation />
            <>
                <SupervisorRouter />
                <Footer />
            </>
        </QueryClientProvider>
    )
}
