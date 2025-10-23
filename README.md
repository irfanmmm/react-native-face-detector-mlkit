# react-native-face-detector-mlkit

A powerful React Native plugin that integrates Google ML Kit with react-native-vision-camera to enable real-time on-device machine learning features such as face detection, text recognition, barcode scanning, and custom ML model inference — all with high performance and low latency.

This library provides a seamless interface for capturing frames directly from the camera and processing them using ML Kit APIs, making it ideal for face recognition, liveness detection, document scanning, and smart vision-based apps.

## 🚀 Installation

```bash
npm i react-native-face-detector-mlkit
# or
yarn add react-native-face-detector-mlkit
```

## ⚙️ Android Setup

To integrate the native frame processor package on Android, follow these steps:

### 1. Open MainApplication.java

Navigate to:
```
android/app/src/main/java/com/yourapp/MainApplication.java
```

### 2. Import the Package

Add the following import statement at the top of the file:

```java
import com.facedetector.XyzFrameProcessorPluginPackage;
```

### 3. Register the Package

Inside the `getPackages()` method, add the following line:

```java
packages.add(new XyzFrameProcessorPluginPackage());
```

**Example:**

```java
@Override
protected List<ReactPackage> getPackages() {
  @SuppressWarnings("UnnecessaryLocalVariable")
  List<ReactPackage> packages = new PackageList(this).getPackages();
  // Add your custom frame processor package here
  packages.add(new XyzFrameProcessorPluginPackage());
  return packages;
}
```

## 📸 Usage Example

```javascript
import React, { useMemo } from 'react';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { useFrameProcessor } from 'react-native-vision-camera';
import { faceDetectorPluggin } from 'react-native-face-detector-mlkit';
import { Worklets } from 'react-native-worklets-core';
import { StyleSheet, View } from 'react-native';

export default function FaceDetectorScreen() {
  const pluggin = faceDetectorPluggin();
  const devices = useCameraDevices();
  const device = devices.front;

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const faces = pluggin.call(frame);
    console.log(faces);
    console.log('Detected faces landmarks:', faces);
  }, []);

  if (!device) return null;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
```

## 🧠 Features

✅ Real-time on-device ML processing  
✅ Seamless integration with react-native-vision-camera  
✅ Works with Reanimated 3 and Worklets Core  
✅ Lightweight and optimized for performance  
✅ Supports both Android and iOS  

## 🔧 Requirements

- React Native ≥ 0.72
- react-native-vision-camera ≥ 3.0
- react-native-reanimated ≥ 3.0
- react-native-worklets-core ≥ 1.0
- Android API Level ≥ 23

## 📄 License

[Add your license here]

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on the GitHub repository.