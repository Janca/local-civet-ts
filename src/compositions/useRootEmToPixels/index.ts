import {RefLike} from '@/types'
import {computed, readonly, Ref, ref, toValue, watch} from 'vue'
import {
    createGlobalState,
    createSharedComposable,
    tryOnBeforeUnmount,
    tryOnMounted,
    useElementBounding,
    useElementSize,
    useEventListener
} from "@vueuse/core";

interface UseRootEmToPixelsOptions {
    includeUnit: boolean
}

const useRootEmToPixelsState = createGlobalState(() => {
    const elementId = ref(`fk-${(Math.random() + 1).toString(36).substring(4)}`)
    const listeners = ref(0)

    return {
        listeners,
        elementId
    }
})

function useRootEmToPixels(_value: RefLike<number>) {
    const initialValue = toValue(_value)
    const value = ref(initialValue)
    const computedValue: Ref<number | undefined> = ref(undefined)

    const {
        listeners,
        elementId
    } = useRootEmToPixelsState()

    watch(() => toValue(_value), v => value.value = v)

    function update() {
        const {
            fontSize
        } = getComputedStyle(document.body)

        computedValue.value = value.value * parseFloat(fontSize)
    }

    const resizeEl: Ref<HTMLSpanElement | undefined> = ref()

    function isValid(): boolean {
        return document.getElementById(elementId.value) != null
    }

    function getElement() {
        return document.getElementById(elementId.value)
    }

    function createElement() {
        const _resizeEl = document.createElement('span')
        _resizeEl.id = elementId.value

        Object.assign(_resizeEl.style, {
            fontSize: 'inherit',
            fontFamily: 'inherit',
            position: 'absolute',
            width: '1rem',
            height: '1rem',
            top: '0',
            left: '0',
            pointerEvents: 'none',
            visibility: 'hidden'
        })

        document.body.append(_resizeEl)
        return _resizeEl
    }

    function getOrCreateElement() {
        const existing = getElement()
        if (existing !== null) return existing
        return createElement()
    }

    function setup() {
        listeners.value += listeners.value
        if (!isValid()) {
            const _resizeEl = getOrCreateElement()
            resizeEl.value = _resizeEl

            const {
                width
            } = useElementBounding(_resizeEl)

            watch(width, update)
            update()
        } else {
            const _resizeEl = getElement()
            if (_resizeEl == null) return
            resizeEl.value = _resizeEl
        }
    }

    function destroy() {
        listeners.value -= listeners.value
        if (listeners.value <= 0) {
            const _resizeEl = resizeEl.value
            if (_resizeEl == null) return
            document.body.removeChild(_resizeEl)
        }
    }

    tryOnMounted(setup)
    tryOnBeforeUnmount(destroy)
    return computed(() => computedValue.value ?? 0)
}

export default useRootEmToPixels