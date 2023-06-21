# Supervisor

The frontend of Supervisor is powered by ReactJS framework.

## Dependencies

~~~bash
# This application is created by typescript.
# @link https://create-react-app.dev/docs/getting-started
npx create-react-app supervisor-react --template typescript

# Install Redux.
# @link https://redux.js.org/introduction/installation
pnpm add react-redux redux @types/react-redux @types/redux

# Install react-router-dom v6.
# @link https://reactrouter.com/en/main/start/tutorial
pnpm add react-router-dom

# Install MUI (Material UI).
# @link https://mui.com/material-ui/getting-started/installation/
pnpm add @mui/material @emotion/react @emotion/styled @mui/lab

# Install MUI icons support.
# @link https://mui.com/material-ui/material-icons/
pnpm add @mui/icons-material @mui/material @emotion/styled @emotion/react

# Install TanStack Query.
# @link https://tanstack.com/query/latest/docs/react/installation
pnpm add @tanstack/react-query

# Install react-cookie.
# @link https://www.npmjs.com/package/react-cookie
pnpm add react-cookie

# Install React Charts.
# @link https://react-charts.tanstack.com/docs/installation
pnpm add react-charts@beta

# Install ApexCharts.
# @link https://apexcharts.com/docs/installation/
pnpm add apexcharts

# Install some useful libraries.
pnpm add axios
pnpm add moment
pnpm add lodash @types/lodash
pnpm add uuid @types/uuid

# Install Storybook.
npx storybook@latest init

~~~

## Style Guide

### TypeScript

See [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html).

### ReactJS in TypeScript

A complete React component should be coded as follows.

~~~tsx
import { Box, BoxProps } from '@mui/material'
import { useEffect, useState } from 'react'
import { collectStyles } from './style'

// Define the properties of a component above it.
// The name of the properties interface should follow the Pascal naming convention.
// Using `interface` instead of `type` for readability.
// Propeties interface extends BoxProps if you want to expose Box properties for users to customize.
export interface MyComponentProps extends BoxProps {
    myProp: string
}

// The component's name should follow the Pascal naming convention.
// Using functional components instead of outdated class components.
// Using `export function` instead of `export cost = function()` for conciseness.
// Every function should be explicitly assigned a return type, and components are no exception.
// The return type of a component is `JSX.Element`.
export function MyComponent(props: MyComponentProps): JSX.Element {
    // Appying destructing assignment to retrieve properties.
    // For readability, this should be at the very beginning of the function.
    const { myProp, children, ...otherProps } = props

    // Hooks are defined following by properties assignment.
    const [myState, setMyState] = useState(myProp)

    // Then, effects are given.
    useEffect(() => {
        // Effect content...
    }, [])

    // Define custom variables and functions in-between.
    function handleSomething(): void {
    }

    // Define styles.
    const styles = collectStyles({
        root: {
            padding: '1em',
        },
        inner: {
            border: '1px solid #999999',
            borderRadius: '6px',
        },
    })

    // Returns the JSX element.
    return (
        // Using parentheses to align elements.
        <Box sx={styles.root} {...otherProps}>
            <Box sx={styles.inner}> {children} </Box>
        </Box>
    )
}
~~~

