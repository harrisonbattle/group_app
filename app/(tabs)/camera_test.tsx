import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Pressable } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container_cont}>
        <View>
            <Pressable onPress={toggleCameraFacing}>
                <Text style={styles.flipcamerabutton}>Flip Camera</Text>
            </Pressable>
        </View>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#386C5F'
  },
  container_cont: {
    flex: 1,
    padding: 100,
    alignItems: 'center',
    backgroundColor: '#386C5F'
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 170,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    padding: 120,
  },
  flipcamerabutton: {
    color: 'white',
    position: 'absolute',
    top: -40,
    right: -170,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  text_flip: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    padding: 200,
    alignItems: 'center'
  },
});
