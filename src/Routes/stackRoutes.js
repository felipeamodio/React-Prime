import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Search from '../pages/Search';

const Stack = createNativeStackNavigator();

function StackRoutes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" 
                          component={Home}
                          options={{
                              headerShown: false
                          }}
                          />

            <Stack.Screen name="Detalhes" 
                          component={Detail}
                          options={{
                              headerShown: false,
                              title: 'Detalhes'
                          }}
                          />

            <Stack.Screen name="Pesquisar" 
                          component={Search}
                          options={{
                              title: 'Sua busca',
                              headerTintColor: '#FFFFFF',
                              headerStyle: {
                                  backgroundColor: '#141A29'
                              },
                              headerTitleStyle: {
                                  color: '#FFFFFF'
                              },
                          }}
                          />
        </Stack.Navigator>
    )
}

export default StackRoutes;