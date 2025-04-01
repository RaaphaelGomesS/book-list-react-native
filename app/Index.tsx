import React, { useState } from "react";
import BookList from "@/components/bookList";
import Login from "@/components/login";
import Register from "@/components/register";
import { createStackNavigator } from '@react-navigation/stack'; 

const Stack = createStackNavigator();

export default function App () {

  return (
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="BookList" component={BookList} />
      </Stack.Navigator>
  );
};