const ruucmCurations = [
  {
    title: 'Cotton Candy',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.8&cPolarAngle=120&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ebedff&color3=%23dbf8ff&color2=%23f3f2f8&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=1.3&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-90&type=waterPlane&uDensity=1&uSpeed=0.3&uStrength=3&uTime=0.2&wireframe=false',
  },
  {
    title: 'Newyork',
    color: 'white',
    url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=3.3&cPolarAngle=120&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ace0f9&color3=%2399c5ff&color2=%23fff1eb&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=-70&type=plane&uDensity=2.8&uSpeed=0.1&uStrength=0.9&uTime=0.2&wireframe=false',
  },
  {
    title: 'Powder',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1.3&cAzimuthAngle=130&cDistance=14.2&cPolarAngle=70&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=13.4&color1=%23ffcccc&color2=%23ccffcc&color3=%23ccccff&embedMode=off&envPreset=city&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=1.5&uDensity=0.6&uSpeed=0.4&uStrength=0.6&uTime=0.2&wireframe=false',
  },
  {
    title: 'Coral',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1.6&cAzimuthAngle=60&cDistance=7.1&cPolarAngle=60&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=12.5&color1=%23ff7a33&color2=%2333a0ff&color3=%23ffc53d&embedMode=off&envPreset=city&grain=off&http%3A%2F%2Flocalhost%3A3002%2Fcustomize%3Fanimate=on&lightType=3d&pixelDensity=1&positionX=0&positionY=0.35&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&shader=defaults&type=sphere&uAmplitude=0&uDensity=1&uSpeed=0.1&uStrength=0.4&uTime=0&wireframe=false',
  },
  {
    title: 'Viola orientalis',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1.2&cAzimuthAngle=0&cDistance=7.1&cPolarAngle=140&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=15.1&color1=%23ffffff&color2=%23ffbb00&color3=%230700ff&embedMode=off&envPreset=city&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&type=sphere&uAmplitude=1.4&uDensity=1.1&uSpeed=0.1&uStrength=1&uTime=0&wireframe=false',
  },
  // {
  //   title: 'Velvet',
  //   color: 'white',
  //   url: '?animate=on&brightness=1&cDistance=2.1&cameraPositionX=0.4&cameraPositionY=3.2&cameraPositionZ=0&cameraZoom=0.7&color1=ff9a9e&color2=fad0c4&color3=%231f5c2a&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0&rotationX=90&rotationY=0&rotationZ=30&shader=defaults&type=plane&uDensity=1&uSpeed=0.05&uStrength=2.6&uTime=0.2',
  // },
  // {
  //   title: 'Santa',
  //   color: 'white',
  //   url: '?animate=on&axesHelper=off&brightness=1.2&cAzimuthAngle=180&cDistance=4&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ff5005&color3=%2379ca77&color2=%23d9a83f&embedMode=off&envPreset=city&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=0.7&positionY=1&positionZ=0&reflection=0.1&rotationX=25&rotationY=0&rotationZ=-120&type=plane&uDensity=3&uSpeed=0.1&uStrength=2.4&uTime=0&wireframe=false',
  // },

  // {
  //   title: 'Lemon',
  //   color: 'white',
  //   url: '?animate=0ff&brightness=1.2&cDistance=3.2&cameraPositionX=0.4&cameraPositionY=3.2&cameraPositionZ=0&cameraZoom=0.6&color1=%2385FFBD&color2=%23FFFB7D&color3=%2384C18F&embedMode=off&envPreset=city&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0&rotationX=90&rotationY=0&rotationZ=30&type=plane&uDensity=1&uSpeed=0.05&uStrength=0.5&uTime=0.2',
  // },
]

const templates = [
  {
    title: 'Template - Plane',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1.2&cAzimuthAngle=0&cDistance=14.2&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ff0000&color2=%2300ff00&color3=%230000ff&embedMode=off&envPreset=city&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&type=plane&uDensity=2&uSpeed=0.1&uStrength=2&uTime=0.2&wireframe=false',
  },
  {
    title: 'Template - Sphere',
    color: 'white',
    url: '?animate=on&axesHelper=on&brightness=1&cAzimuthAngle=180&cDistance=7.1&cPolarAngle=90&cameraPositionX=0&cameraPositionY=0&cameraPositionZ=0&cameraZoom=1&color1=%23ff0000&color2=%2300ff00&color3=%230700ff&embedMode=off&envPreset=city&grain=off&lightType=3d&pixelDensity=1&positionX=0&positionY=0&positionZ=0&reflection=0.1&rotationX=0&rotationY=0&rotationZ=0&type=sphere&uDensity=1&uSpeed=0.1&uStrength=0.3&uTime=0&wireframe=false',
  },
]

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
  ...templates,
]
