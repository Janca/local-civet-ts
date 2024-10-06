import {computed, MaybeRefOrGetter, toValue} from 'vue'

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2, d = max - min
    if (max != min) {
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4
        h *= 60
    }

    s *= 100
    l *= 100

    return [h, s, l]
}


function useToHSL(rgb: MaybeRefOrGetter<number[] | undefined>) {
    return computed(() => {
        const [r, g, b] = toValue(rgb) ?? [0, 0, 0]
        return rgbToHsl(r, g, b)
    })
}

export default useToHSL
export {
    rgbToHsl
}