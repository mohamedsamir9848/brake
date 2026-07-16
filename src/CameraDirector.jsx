import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

export default function CameraDirector() {
    // بنجيب الـ state الحالي للمشهد
    const state = useThree()

    useEffect(() => {
        // الوصول للتحكم الكاميرا الذكي
        const controls = state.controls
        if (!controls) return

        let timeoutId
        let currentShot = 0

        // شغل السيناريو السينمائي (The Sequence)
        const runCinematicShots = async () => {
            if (currentShot === 0) {
                // اللقطة 1: لفة دائرية ناعمة بمقدار 45 درجة حوالين الموديل والارتفاع لأعلى شوية
                await controls.rotate(45 * (Math.PI / 180), 0.2 * (Math.PI / 180), true)
            }
            else if (currentShot === 1) {
                // اللقطة 2: زووم ونزول لأسفل عشان نركز على تفاصيل الـ Brake
                // await controls.dolly(3, true) // يقرب 3 درجات بالعمق
                await controls.truck(0, -0.5, true) // يتحرك لأسفل
            }
            else if (currentShot === 2) {
                // اللقطة 3: المصور يرجع لورا بسرعة ويلف لقطة واسعة من زاوية تانية
                await controls.dolly(-4, true)
                await controls.rotate(-90 * (Math.PI / 180), -0.4 * (Math.PI / 180), true)
            }
            else if (currentShot === 3) {
                // اللقطة 4: إعادة تصفير الكاميرا لمكانها الأصلي بسلاسة
                await controls.setLookAt(0, 15, 20, 0, 0, 0, true)
            }

            // انقل على اللقطة اللي بعدها
            currentShot = (currentShot + 1) % 4

            // انتظر ثانيتين بعد ما الحركة تخلص تماماً قبل ما تبدأ الحركة اللي بعدها
            timeoutId = setTimeout(runCinematicShots, 2000)
        }

        // انتظر ثانية واحدة أول ما الأبلكيشن يفتح عشان الموديل يحمل، وبعدين ابدأ الحركة
        timeoutId = setTimeout(runCinematicShots, 1000)

        return () => clearTimeout(timeoutId)
    }, [state.controls])

    return null
}