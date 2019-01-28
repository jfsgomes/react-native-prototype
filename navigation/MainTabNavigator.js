import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import BitcoinScreen from '../screens/BitcoinScreen';
import EthereumScreen from '../screens/EthereumScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BitcoinStack = createStackNavigator({
  Home: BitcoinScreen,
});

BitcoinStack.navigationOptions = {
  tabBarLabel: 'Bitcoin',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const EthereumStack = createStackNavigator({
  Links: EthereumScreen,
});

EthereumStack.navigationOptions = {
  tabBarLabel: 'Ethereum',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  BitcoinStack,
  EthereumStack,
  SettingsStack,
});
