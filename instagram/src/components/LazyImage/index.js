import React, { useEffect, useState} from 'react'
import { Animated } from 'react-native'

import { Small, Original } from './styles'

const OriginalAnimated = Animated.createAnimatedComponent(Original)

const LazyImage = ({ smallSource, source, shouldLoad }) => {

  const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(shouldLoad){
            setTimeout(() => {
                setLoaded(true)
            },500)
        }
    }, [shouldLoad])

    handleAnimate = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start()
    }

    return (
        <Small
            source={smallSource}
            ratio={0.8}
            resizeMode="cover"
            blurRadius={3}
        >
            {
                loaded &&
                <OriginalAnimated
                    style={{ opacity }}
                    source={source}
                    ratio={0.8}
                    resizeMode="cover"
                    onLoadEnd={handleAnimate}
                />
            }
        </Small>
    )
}

export default LazyImage
