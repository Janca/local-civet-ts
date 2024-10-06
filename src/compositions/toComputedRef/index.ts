import {computed, ComputedRef, MaybeRefOrGetter, toValue} from 'vue'

type UseComputedRefTransformFn<T, K extends keyof T, R> = (value: T[K]) => R
type ComputedRefReturnType<T, K extends keyof T, R> = ComputedRef<T[K] | R | undefined>

function toComputedRef<
    T,
    S extends NonNullable<T>,
    K extends keyof T,
    L extends keyof S,
    R extends S[L]
>(
    o: MaybeRefOrGetter<T> | ComputedRef<T>,
    key: K | L,
    transform?: UseComputedRefTransformFn<T, K, R>
): ComputedRefReturnType<T, K, R> {
    function get() {
        const _o = toValue(o)
        return _o == null ? undefined : _o[key as K]
    }

    return computed(() => {
        const value = get()
        if (value == null) return undefined
        if (transform == null) return value
        return transform(value)
    })
}

export default toComputedRef