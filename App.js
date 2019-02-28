/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {
  Component
} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { createAppContainer, createSwitchNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import IconFa from 'react-native-vector-icons/FontAwesome';

import reducers from './src/redux/reducers';
import FurnitureScreen from './src/screens/FurnitureScreen';
import UserScreen from './src/screens/UserScreen';
import UserAddScreen from './src/screens/UserAddScreen';
import UserUpdateScreen from './src/screens/UserUpdateScreen';

const FurnitureStackNavigator = createStackNavigator({
  Furniture: {
    screen: FurnitureScreen,
    navigationOptions: {
      headerTitle: 'Furniture'
    }
  }
}, {
  initialRouteName: 'Furniture',
  headerLayoutPreset: 'center'
});

const UserStackNavigator = createStackNavigator({
  User: {
    screen: UserScreen,
    navigationOptions: {
      headerTitle: 'User'
    }
  },
  UserUpdate: {
    screen: UserUpdateScreen,
    navigationOptions: {
      headerTitle: 'Update User'
    }
  },
  UserAdd: {
    screen: UserAddScreen,
    navigationOptions: {
      headerTitle: 'Add User'
    }
  }
}, {
  initialRouteName: 'User',
  headerLayoutPreset: 'center'
});

const BottomTabNavigator = createMaterialTopTabNavigator({
  FurnitureTab: {
    screen: FurnitureStackNavigator,
    navigationOptions: {
      tabBarLabel: 'Furniture',
      tabBarIcon: ({ tintColor }) => (
        <IconFa
          name='list'
          size={16}
          color={tintColor}
        />
      )
    }
  },
  UserTab: {
    screen: UserStackNavigator,
    navigationOptions: {
      tabBarLabel: 'User',
      tabBarIcon: ({ tintColor, focused }) => (
        <IconFa
          name={focused ? 'user' : 'user-o'}
          size={16}
          color={tintColor}
        />
      )
    }
  },
}, {
  swipeEnabled: false,
  initialRouteName: 'FurnitureTab',
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: 'black',
    inactiveTintColor: 'grey',
    showIcon: true,
    labelStyle: {
      fontSize: 12
    },
    indicatorStyle: {
      height: 0
    },
    upperCaseLabel: false,
    style: {
      backgroundColor: 'white',
      borderTopWidth: 1,
      borderTopColor: '#ddd'
    },
    tabStyle: {
      height: 56
    },
  }
});

const SwitchNavigator = createSwitchNavigator({
  BottomTabNavigator
});

const AppContainer = createAppContainer(SwitchNavigator);

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <AppContainer />
      </Provider>
    );
  }
}
