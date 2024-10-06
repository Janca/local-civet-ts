import {RefLike} from "@/types";
import {ref, toValue, watch} from "vue";
import {useEventListener, useResizeObserver} from "@vueuse/core";

export function containsRvh(propertyValue: string) {
    const rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/;
    return rvhRegex.test(propertyValue);
}

function replaceRvhWithPx(propertyStringValue: string, windowHeight: number) {
    const rvhRegex = /(\d+(\.\d*)?)rvh(?!\w)/g;
    return propertyStringValue.replace(
        rvhRegex,
        (_, rvh) => `${(windowHeight * parseFloat(rvh)) / 100}px`
    )
}

function convertStyle(givenStyle: Partial<CSSStyleDeclaration> | undefined, windowHeight: number) {
    const defaultStyle = {height: '100rvh'};

    const usedStyle: Record<string, any> = givenStyle === undefined ? defaultStyle : givenStyle;
    const convertedStyle: Record<string, any> = {};

    Object.keys(usedStyle).forEach(key => {
        convertedStyle[key] = typeof usedStyle[key] === 'string'
            ? replaceRvhWithPx(usedStyle[key], windowHeight)
            : usedStyle[key];
    });

    return convertedStyle;
}

function useRealHeightUnits(_css: RefLike<Partial<CSSStyleDeclaration>> | undefined = undefined) {
    const initialValue = toValue(_css)

    const backing = ref(initialValue)
    const value = ref(backing.value)

    function update(_value: Partial<CSSStyleDeclaration> | undefined) {
        backing.value = _value

        const innerHeight = window.innerHeight
        value.value = convertStyle(_value, innerHeight)
    }

    watch(() => toValue(_css), update)
    useEventListener('resize', () => {
        const _value = toValue(backing)
        update(_value)
    })

    update(initialValue)
    return value
}

export default useRealHeightUnits