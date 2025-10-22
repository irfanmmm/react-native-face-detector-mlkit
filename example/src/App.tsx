import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import {
  Camera,
  useCameraDevice,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { faceDetectorPluggin } from 'react-native-face-detector';

export default function App() {
  const pluggin = faceDetectorPluggin();
  const [cameraPermission, setCameraPermission] = useState<any>(null);
  const cameraRef = useRef(null);
  const device = useCameraDevice('front');

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const faces = pluggin.call(frame);
    console.log(faces);
    // try {
    //   // Process every 10th frame to reduce load
    //   if (frame.frameCount % 10 === 0) {
    //     runOnJS((width, height) => {
    //       console.log(`Frame width: ${width}, height: ${height}`);
    //     })(frame.width, frame.height);
    //   }
    // } catch (error) {
    //   runOnJS((err) => {
    //     console.error('Frame processor error:', err);
    //   })(error);
    // }
  }, []);

  useEffect(() => {
    async function requestCameraPermission() {
      const permission = await Camera.requestCameraPermission();
      setCameraPermission(permission);
      console.log('Camera permission status:', permission);
    }
    requestCameraPermission();
  }, []);

  if (cameraPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }
  if (cameraPermission !== 'granted') {
    return (
      <View style={styles.container}>
        <Text>Camera permission denied</Text>
      </View>
    );
  }
  if (!device) {
    return (
      <View style={styles.container}>
        <Text>No camera device found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        ref={cameraRef}
        isActive={true}
        photo
        video={false}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});
