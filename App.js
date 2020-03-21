import * as React from 'react';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import useLinking from './navigation/useLinking';
import * as firebase from "firebase";
import {firebaseConfig} from "./assets/config";
import {createAppContainer, createSwitchNavigator} from "react-navigation";

import Loading from "./screens/Loading";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";

firebase.initializeApp(firebaseConfig)

const AppSwitchNavigator = createSwitchNavigator({
    Loading: Loading,
    Login: Login,
    SignUp: SignUp,
    Home: Home
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);
    const [initialNavigationState, setInitialNavigationState] = React.useState();
    const containerRef = React.useRef();
    const {getInitialState} = useLinking(containerRef);

    // Load any resources or data that we need prior to rendering the app
    React.useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHide();

                // Load our initial navigation state
                setInitialNavigationState(await getInitialState());

                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
                });
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hide();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return null;
    } else {
        return (
            <View style={styles.container}>
                {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                <AppNavigator/>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
