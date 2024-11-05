import React, { useEffect, useState } from 'react';
import {
    Button,
    Text,
    View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';


function Working() {

    const scale = useSharedValue(1);

    useEffect(() => {
        scale.set(() =>
            withRepeat(
                withTiming(2, {
                    duration: 600,
                }),
                -1,
                true,
            ),
        );
    }, [scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: scale.get(),
            },
        ],
    }));


    return (
        <Animated.View style={animatedStyle}>
            <Text>Working</Text>
        </Animated.View>
    );
}

function NotWorking() {

    const scale = useSharedValue(1);

    useEffect(() => {
        scale.set(withRepeat(
            withTiming(2, {
                duration: 600,
            }),
            -1,
            true,
        )
        );
    }, [scale]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: scale.get(),
            },
        ],
    }));


    return (
        <Animated.View style={animatedStyle}>
            <Text>Not working</Text>
        </Animated.View>
    );
}

function App(): React.JSX.Element {

    const [working, setWorking] = useState(true);

    return (
        <View>

            <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
                {working ? <Working /> : <NotWorking />}
            </View>

            <Button
                title="Crash it!"
                onPress={() => setWorking(!working)}
            />
        </View>

    );
}


export default App;
