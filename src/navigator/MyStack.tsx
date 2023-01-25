import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Report} from '../screens';

const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Report" component={Report} />
    </Stack.Navigator>
  );
}

export default MyStack;
