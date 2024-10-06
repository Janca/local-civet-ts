import {Ref, ref} from 'vue'
import {useEventListener, useMediaQuery} from '@vueuse/core'

const breakpointsVuetifyV3 = {
    xs: [0, 600],
    sm: [600, 960],
    md: [960, 1280],
    lg: [1280, 1920],
    xl: [1920, 2560],
    xxl: [2560, Infinity]
}

type BreakpointKey = keyof typeof breakpointsVuetifyV3

function createMediaQuery(min: number, max: number) {
    return `(min-width: ${min}px)` + (max < Infinity ? ` and (max-width: ${max}px)` : '')
}

function useActiveBreakpoint() {
    const active: Ref<string | undefined> = ref()

    function update() {
        active.value = undefined
        const keys = Object.keys(breakpointsVuetifyV3) as BreakpointKey[]
        for (const key of keys) {
            const [min, max] = breakpointsVuetifyV3[key]
            const mediaQuery: string = createMediaQuery(min, max)
            if (matchMedia(mediaQuery).matches) {
                active.value = key
                break
            }
        }
    }

    useEventListener('resize', update)
    update()

    return active
}

function useBreakpointComparator(type: 'between' | 'smallerThan' | 'largerThan') {
    return (a: BreakpointKey, b?: BreakpointKey) => {
        const [minA, maxA] = breakpointsVuetifyV3[a]
        if (type === 'between' && b) {
            const [_, maxB] = breakpointsVuetifyV3[b]
            return useMediaQuery(createMediaQuery(minA, maxB))
        } else if (type === 'smallerThan') {
            return useMediaQuery(createMediaQuery(0, minA))
        } else if (type === 'largerThan') {
            return useMediaQuery(createMediaQuery(maxA, Infinity))
        } else throw new Error(`Invalid breakpoint comparator type: '${type}'`)
    }
}

function useBreakpoints() {
    const active = useActiveBreakpoint()
    const between = useBreakpointComparator('between')
    const smallerThan = useBreakpointComparator('smallerThan')
    const largerThan = useBreakpointComparator('largerThan')

    return {
        active,
        between,
        smallerThan,
        largerThan
    }
}

export default useBreakpoints