import { CameraView, CameraType, FlashMode, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [flash, setFlash] = useState<FlashMode>('off');
  const [photo, setPhoto] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView | null>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup function (important for camera resources)
      if (cameraRef.current) {
        // Example: Stop any ongoing processes related to the camera if necessary
      }
    };
  }, [facing, flash]);

  const setCameraRef = (ref: CameraView | null) => { // Explicit type annotation is KEY
    cameraRef.current = ref;
    setIsCameraReady(!!ref);
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  function toggleCameraFlash() {
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }

  async function takePhoto() {
    if (cameraRef.current && isCameraReady) {
      try {
        const photoData = await cameraRef.current.takePictureAsync();
        if (photoData?.uri) {
          setPhoto(photoData.uri);
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
      {photo ? (
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
          ref={setCameraRef} // Use the callback ref
          onCameraReady={() => {}} // Still required
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
    top: -10,
    right: 120,
  },
  captureButton: {
    backgroundColor: 'red',
    padding: 20,
    bottom: -550,
    borderRadius: 20,
  },
  retakeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  container_cont: {
    flex: 1,
    padding: 100,
    alignItems: 'center',
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
    top: -10,
    right: -125,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});