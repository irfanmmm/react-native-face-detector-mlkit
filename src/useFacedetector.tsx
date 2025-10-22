import { VisionCameraProxy } from 'react-native-vision-camera';

// const Test = () => {
//   return <Camera device={device} style={{ flex: 1 }} />
// }
// // export default Test;
// export { Test };

export function faceDetectorPluggin() {
  const plugin = VisionCameraProxy.initFrameProcessorPlugin('xyz', {
    model: 'fast',
  });
  if (!plugin) {
    throw new Error('Failed to load xyz frame processor plugin');
  }
  return plugin;
}
// export const faceDetectorPluggin = VisionCameraProxy.initFrameProcessorPlugin('xyz', {
//   model: 'fast',
// });

// if (!faceDetectorPluggin) {
//   throw new Error('Failed to load xyz frame processor plugin');
// }

// export function useFaceDetector() {
//   // const [detectFace, setDetectFace] = useState<FrameProcessorPlugin | undefined>(undefined);
//   // useEffect(() => {
//   //   // const faceDetector = new FaceDetector();
//   //   setDetectFace(xyzFrameProcessor);
//   // }, [])

//   return { faceDetectorPluggin }
// }
