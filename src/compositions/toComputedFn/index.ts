import {computed, ComputedRef, MaybeRefOrGetter, toValue} from 'vue'

function toComputedFn<
    T,
    K extends keyof T,
    S extends NonNullable<T>,
    L extends keyof S,
    X extends Fn<T[K] | S[L], R>,
    R extends T[K] | S[L] | any
>(
    target: MaybeRefOrGetter<T>,
    keyOrTransform: K | L | X,
    transform?: X
): ComputedRef<T[K] | S[L] | R | undefined> {
    return computed(() => {
        const _target = toValue(target)
        if (_target == null) return undefined

        if (typeof keyOrTransform === 'function') {
            return keyOrTransform(_target as NonNullable<any>)
        }

        const _value = _target[keyOrTransform as K]
        if (_value == null) return undefined
        if(transform == null) return _value

        return transform(_value as any as NonNullable<S[L]>)
    })
}

export default toComputedFn
