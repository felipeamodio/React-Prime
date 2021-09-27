import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//import Home from '../pages/Home'; // tirar o home pois ele já está configurado no stack
import Movies from '../pages/Movies';

import StackRoutes from './stackRoutes';

const Drawer = createDrawerNavigator();

function Routes(){
    return(
        <Drawer.Navigator>
            <Drawer.Screen name="HomeDrawer" component={StackRoutes} />
            <Drawer.Screen name="Filmes" component={Movies} />
        </Drawer.Navigator>
    )
}

export default Routes;