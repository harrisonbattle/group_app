import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';
import * as MediaLibrary from 'expo-media-library'

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [photo, setPhoto] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null); //This is where reference is weird, dont know if should use useState instead for camera
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();


  useEffect(() => {
    return () => {
      if (cameraRef.current) {
      }
    };
  }, [facing, flash]);

  const setCameraRef = (ref: CameraView | null) => { //Confused about reference to camera
    cameraRef.current = ref;
    setIsCameraReady(!!ref);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission?.granted || !mediaPermission?.granted) {
    return ( // Granting permission for camera, not sure if it works on android, have not been able to test it
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Camera Permission" />
        <Button onPress={requestMediaPermission} title="Grant Media Permission" />
      </View>
    );
  }

  function toggleCameraFacing() { //Toggling camera facing forward or back, dont touch
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleCameraFlash() { //Toggling flash, dont touch
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  async function takePhoto() { //Need work on this function to take photo
    if (cameraRef.current && isCameraReady) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        if (photoData?.uri) {
          setPhoto(photoData.uri);
          console.log(photoData.uri);
        } else {
          console.error("Photo capture failed: No URI");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      console.warn("Camera is not ready or ref is null");
    }
  }

  function retakePhoto() {
    setPhoto(null);
  }

  return (
    <View style={styles.container}>
      {photo ? ( //Allows for retaking, should be able to leave this alone
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <Pressable onPress={retakePhoto} style={styles.retakeButton}>
            <Text style={styles.text}>Retake</Text>
          </Pressable>
        </View>
      ) : (
        <CameraView
          style={styles.container_cont}
          facing={facing}
          flash={flash}
          ref={setCameraRef} // This callback reference is not working, something to do with import CameraView, Camera is a class or something
          onCameraReady={() => {}}
        >
          <View style={styles.camera}>
            <Pressable onPress={toggleCameraFacing} style={styles.flipcamerabutton}>
              <Text style={styles.text}>Flip Camera</Text>
            </Pressable>
            <Pressable onPress={toggleCameraFlash} style={styles.flashcamerabutton}>
              <Text style={styles.text}>Flash On/Off</Text>
            </Pressable>
            <Pressable onPress={takePhoto} style={styles.captureButton}>
              <Text style={styles.text}>Take Pic</Text>
            </Pressable>
          </View>
        </CameraView>
      )}
    </View>
  );
}

//Please delete some of these as we find necessary
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#386C5F',
  },
  flashcamerabutton: {
    color: 'white',
    position: 'absolute',
    top: 10,
    right: 20,
  },
  captureButton: {
    backgroundColor: '#386C5F',
    position: 'absolute',
    bottom: 30,
    padding: 20,
    borderRadius: 20,
    right: -70,
  },
  retakeButton: {
    position: 'absolute',
    bottom: 80,
    padding: 20,
    backgroundColor: '#386C5F',
    borderRadius: 20,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  container_cont: {
    top: 10,
    width: '100%',
    height: '90%',
    alignItems: 'center',
    resizeMode: 'cover',
    backgroundColor: '#386C5F',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  flipcamerabutton: {
    color: 'white',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});