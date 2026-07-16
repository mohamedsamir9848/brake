import { Canvas } from '@react-three/fiber'
import { CameraControls } from '@react-three/drei' // استوردنا دي بدل OrbitControls
import CameraDirector from './CameraDirector'
import { Model } from './Brake'

export default function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: '100vw', height: '100vh', position: 'relative' }}>
      <h1 style={{ position: 'absolute', top: 20, left: 20, color: 'white', zIndex: 1 }}>

        اشتري تيل فرامل قبل ما يعلي صوته عليك

      </h1>
      <a href="https://www.facebook.com/profile.php?id=61591675209882" style={{ position: 'absolute', top: 30, left: 20, color: 'white', zIndex: 1 }}>
        First Auto
      </a>
      <Canvas camera={{ position: [0, 15, 20], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} />

        {/* الموديل بتاعك في المنتصف تماماً */}
        <Model position={[0, 0, 0]} scale={1} />

        {/* المساعد السينمائي الجديد */}
        <CameraDirector />

        {/* ميزة makeDefault مهمة جداً هنا عشان الكومبوننت التاني يشوفها */}
        <CameraControls makeDefault />
      </Canvas>
    </div>
  )
}