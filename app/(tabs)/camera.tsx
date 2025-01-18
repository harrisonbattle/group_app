import {View, StyleSheet, Text, SafeAreaView, Button, Pressable} from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import { Link, Stack } from "expo-router"

const App = () => {
    const [permission, requestPermission] = useCameraPermissions();

    const handleCameraPress = () => {
      console.log('Camera button pressed');
    };

    const isPermissionGranted = Boolean(permission?.granted);
  
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.row}>Need to add camera button</Text>
        <Text style={styles.row}>That's what this button below is for...</Text>
        <Button title="Open Camera" onPress={handleCameraPress} />
        <View style={{ gap: 20}}>
            <Pressable onPress={requestPermission}>
                <Text style={styles.row}>Request Permissions</Text>
            </Pressable>
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#386C5F',
  },
  row: {
    color: '#FFFBCE',
    fontSize: 24,
    textAlign: 'center'
  },
});

export default App;