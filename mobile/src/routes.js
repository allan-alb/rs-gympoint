import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Sign from '~/pages/Sign';
import Checkin from '~/pages/Checkin';
import HelpOrderList from '~/pages/HelpOrder/List';
import HelpOrderNew from '~/pages/HelpOrder/New';
import HelpOrderAnswer from '~/pages/HelpOrder/Answer';

function Routes() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const isLoggedIn = useSelector((state) => state.user.user_id);

  function HelpOrders() {
    return (
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="HelpOrderList" component={HelpOrderList} />
        <Stack.Screen name="HelpOrderNew" component={HelpOrderNew} />
        <Stack.Screen name="HelpOrderAnswer" component={HelpOrderAnswer} />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator
          tabBarOptions={{
            keyboardHidesTabBar: true,
            activeTintColor: '#ee4e62',
            inactiveTintColor: '#999',
            style: {},
          }}>
          <Tab.Screen
            name="Checkin"
            component={Checkin}
            options={{
              tabBarLabel: 'Check-ins',
              tabBarIcon: ({ color }) => (
                <Icon name="edit-location" size={20} color={color} />
              ),
            }}
          />
          <Tab.Screen
            name="HelpOrders"
            component={HelpOrders}
            options={{
              tabBarLabel: 'Pedir ajuda',
              tabBarIcon: ({ color }) => (
                <Icon name="live-help" size={20} color={color} />
              ),
            }}
          />
        </Tab.Navigator>
      ) : (
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Sign" component={Sign} />
          </Stack.Navigator>
        )}
    </NavigationContainer>
  );
}

export default Routes;
