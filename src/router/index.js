import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home, TambahList, EditList} from '../pages';

const Stack = createStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TambahList"
        component={TambahList}
        options={{title: 'Tambah List'}}
      />
      <Stack.Screen
        name="EditList"
        component={EditList}
        options={{title: 'Edit List'}}
      />
    </Stack.Navigator>
  );
};

export default Router;
