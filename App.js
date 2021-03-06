import * as React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { SplashScreen } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import useLinking from "./navigation/useLinking";

import { navigationRef } from "./components/RootNavigation";
import { headerOptions } from "./components/headerOptions";

import Loading from "./screens/Loading";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import Home from "./screens/Home";
import Board from "./screens/Board";
import BoardsList from "./screens/BoardsList";
import CardsList from "./screens/CardsList";
import { initFirebase } from "./assets/firebase";
import CreateBoard from "./screens/CreateBoard";
import CreateCardsList from "./screens/CreateCardsList";
import CreateCardItem from "./screens/CreateCardItem";
import CardDetails from "./screens/CardDetails";
import UpdateCardItem from "./screens/UpdateCardItem";

initFirebase();

const Stack = createStackNavigator();

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
  const [setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        // await Font.loadAsync({
        //   "Montserrat-Black": require("./assets/fonts/Montserrat-Black.ttf"),
        //   "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
        //   "Montserrat-BoldItalic": require("./assets/fonts/Montserrat-BoldItalic.ttf"),
        //   "Montserrat-ExtraBold": require("./assets/fonts/Montserrat-ExtraBold.ttf"),
        //   "Montserrat-ExtraBoldItalic": require("./assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
        //   "Montserrat-ExtraLight": require("./assets/fonts/Montserrat-ExtraLight.ttf"),
        //   "Montserrat-ExtraLightItalic": require("./assets/fonts/Montserrat-ExtraLightItalic.ttf"),
        //   "Montserrat-Italic": require("./assets/fonts/Montserrat-Italic.ttf"),
        //   "Montserrat-Light": require("./assets/fonts/Montserrat-Light.ttf"),
        //   "Montserrat-LightItalic": require("./assets/fonts/Montserrat-LightItalic.ttf"),
        //   "Montserrat-Medium": require("./assets/fonts/Montserrat-Medium.ttf"),
        //   "Montserrat-MediumItalic": require("./assets/fonts/Montserrat-MediumItalic.ttf"),
        //   "Montserrat-Regular": require("./assets/fonts/Montserrat-Regular.ttf"),
        //   "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
        //   "Montserrat-SemiBoldItalic": require("./assets/fonts/Montserrat-SemiBoldItalic.ttf"),
        //   "Montserrat-Thin": require("./assets/fonts/Montserrat-Thin.ttf"),
        //   "Montserrat-ThinItalic": require("./assets/fonts/Montserrat-ThinItalic.ttf")
        // });
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
  }
  return (
    <View style={styles.container}>
      {Platform.OS === "ios" && <StatusBar barStyle="default" />}
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={headerOptions}
        >
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="BoardsList" component={BoardsList} />
          <Stack.Screen name="CardsList" component={CardsList} />
          <Stack.Screen name="Board" component={Board} />
          <Stack.Screen name="NewBoard" component={CreateBoard} />
          <Stack.Screen name="NewList" component={CreateCardsList} />
          <Stack.Screen name="NewCard" component={CreateCardItem} />
          <Stack.Screen name="CardDetails" component={CardDetails} />
          <Stack.Screen name="UpdateCardItem" component={UpdateCardItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
