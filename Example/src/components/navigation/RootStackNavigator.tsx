import { NavigationComponent, NavigationRouteConfig } from 'react-navigation';

import Intro from '../screen/Intro';
import Home from '../screen/Home';
import LecturesList from '../screen/LecturesList';
import React from 'react';
import { ScreenProps } from './SwitchNavigator';
import { Text } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';

const routeConfig: NavigationRouteConfig = {
  Intro: {
    screen: Intro,
    navigationOptions: ({
      navigation,
      screenProps,
    }: {
      navigation: NavigationComponent;
      screenProps: ScreenProps;
    }) => {
      const { theme } = screenProps;
      return {
        //title: navigation.state.routeName,
        title: 'Recordings',
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      };
    },
    path: 'intro',
  },
  Home: {
    screen: Home,
    navigationOptions: ({
      navigation,
      screenProps,
    }: {
      navigation: NavigationComponent;
      screenProps: ScreenProps;
    }) => {
      const { theme } = screenProps;
      return {
        headerTitle: (
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {/* {navigation.state.routeName} */}
            Idioma Academy
          </Text>
        ),
        headerStyle: {
          backgroundColor: theme.background
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      };
    },
    path: 'temp',
  },
  LecturesList: {
    screen: LecturesList,
    navigationOptions: ({
      navigation,
      screenProps,
    }: {
      navigation: NavigationComponent;
      screenProps: ScreenProps;
    }) => {
      const { theme } = screenProps;
      return {
        headerTitle: (
          <Text
            style={{
              fontSize: 18,
            }}
          >
            {/* {navigation.state.routeName} */}
            Lectures List
          </Text>
        ),
        headerStyle: {
          backgroundColor: theme.background
        },
        headerTitleStyle: { color: theme.fontColor },
        headerTintColor: theme.tintColor,
      };
    },
    path: 'lecturesList',
  }
};

const navigatorConfig = {
  initialRouteName: 'Home',
  // mode: 'card',
  // headerMode: 'screen',
  // headerMode: 'none',
};

const RootStackNavigator = createStackNavigator(routeConfig, navigatorConfig);

// interface Props {
//   navigation?: any;
//   theme?: object;
// }

// class RootNavigator extends React.Component<Props> {
//   private static router = RootStackNavigator.router;

//   public render() {
//     return (
//       <RootStackNavigator
//         navigation={this.props.navigation}
//         screenProps={{ theme: this.props.theme }}
//       />
//     );
//   }
// }

export default RootStackNavigator;
