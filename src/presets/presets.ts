import { ruucmCurations } from './ruucmCurations'
import { smCurationCandidate } from './smCurations'
import { templates } from './templates'

export const PRESETS = [
  {
    title: 'New Halo',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=1.7&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ff5005&color2=%23a177ca&color3=%23d9a83f&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=-120&type=plane&uDensity=3&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false',
  },
  {
    title: 'New Halo (2)',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=4.2&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ff5005&color2=%23779bca&color3=%23d9b03f&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=1.1&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-70&type=plane&uDensity=3&uSpeed=0.1&uStrength=1.5&uTime=0&wireframe=false',
  },
  {
    title: 'Breeze',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1&cAzimuthAngle=180&cDistance=2.2&cPolarAngle=140&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%236cd7ea&color2=%235ac5d3&color3=%23d4f2ca&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=1&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&type=waterPlane&uDensity=1.8&uSpeed=0.1&uStrength=2&uTime=8&wireframe=false&animate=on',
  },
  {
    title: 'Halo Origin',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=2&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23CC4C6E&color2=%231980FF&color3=%2399B58F&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=45&rotationY=0&rotationZ=115&type=plane&uDensity=3&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false',
  },
  {
    title: 'Aurora',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=-20&cDistance=4.4&cPolarAngle=110&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%2300ffbf&color2=%23000000&color3=%230000ff&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=-1.6&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=90&type=plane&uAmplitude=0&uDensity=2&uFrequency=0&uSpeed=0.1&uStrength=2&uTime=0.2&wireframe=false',
  },
  {
    title: 'Midnight',
    color: '#5C5C5C',
    url: '?animate=on&axesHelper=off&brightness=2.4&cAzimuthAngle=180&cDistance=2&cPolarAngle=130&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%2320181c&color2=%23000000&color3=%233e4365&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-60&type=waterPlane&uDensity=2.8&uSpeed=0.1&uStrength=1.3&uTime=0.2&wireframe=false',
  },
  {
    title: 'Mystery',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1&cAzimuthAngle=90&cDistance=1.6&cPolarAngle=0&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=9.4&color1=%233531f6&color2=%23cbbfe8&color3=%23ff6f00&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=-30&rotationY=0&rotationZ=-120&type=sphere&uDensity=1.9&uSpeed=0.1&uStrength=0.2&uTime=0.2&wireframe=false',
  },
  {
    title: 'Chaos',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1.2&cAzimuthAngle=170&cDistance=2.2&cPolarAngle=110&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=12&color1=%23cd4c9d&color2=%231980FF&color3=%2399B58F&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=0&positionY=-0.5&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&type=sphere&uDensity=2.2&uSpeed=0.5&uStrength=1&uTime=0.2&wireframe=false',
  },
  ...ruucmCurations,
  ...smCurationCandidate,
  ...templates,
]
