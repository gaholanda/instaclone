import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { Image } from 'react-native'

import Feed from './pages/Feed'
import New from './pages/New'

import logo from './assets/logo.png'

export default createAppContainer(
    createStackNavigator({
        Feed,
        New
    },{
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
            headerTintColor: '#000',
            headerStyle: {
                backgroundColor: '#F5F5F5'
            },
            headerBackTitle: null // Tira string do botão voltar
        },
        mode: 'modal'
    })
)