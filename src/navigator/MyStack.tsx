import {createNativeStackNavigator} from '@react-navigation/native-stack';
import myConstants from '../config/constants';
import {Home, Report} from '../screens';

const Stack = createNativeStackNavigator();
const {home, report} = myConstants.screens;

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name={report} component={Report} />
    </Stack.Navigator>
  );
}

export default MyStack;
