import {createGlobalState, useCssVar, useLocalStorage} from '@vueuse/core'
import {computed} from 'vue'

const useGlobalThemeState = createGlobalState(() => {
    const primaryHue = useLocalStorage(
        'theme.primary.hue',
        useCssVar('--primary-hue', undefined, {observe: true})
    )

    const primarySaturation = useLocalStorage(
        'theme.primary.saturation',
        useCssVar('--primary-saturation', undefined, {observe: true})
    )
    const primaryLightness = useLocalStorage(
        'theme.primary.lightness',
        useCssVar('--primary-lightness', undefined, {observe: true})
    )

    return {
        primaryHue,
        primarySaturation,
        primaryLightness
    }
})

function useTheme() {
    const {
        primaryHue,
        primarySaturation,
        primaryLightness
    } = useGlobalThemeState()

    return {
        primary: {
            hue: primaryHue,
            saturation: primarySaturation,
            lightness: primaryLightness,
            hsl: computed(() => `hsl(${primaryHue.value}, ${primarySaturation.value}, ${primaryLightness.value})`),
            reset: () => {
                primaryHue.value = '251deg'
                primarySaturation.value = '90%'
                primaryLightness.value = '62%'
            },
            set: (h: string | number, s: string | number, l: string | number) => {
                primaryHue.value = `${h}deg`
                primarySaturation.value = `${s}%`
                primaryLightness.value = `${l}%`
            }
        }
    }
}

export default useTheme