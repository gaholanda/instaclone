import React from 'react'
import { YellowBox, StatusBar } from 'react-native'

YellowBox.ignoreWarnings([
    'Unrecognized WebSocket'
])

import Routes from './routes'

export default App = () => {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />
            <Routes />
        </>
    )
}
