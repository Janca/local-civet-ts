import {ModelMeta, ModelVersionMeta, RefLike} from '@/types'
import {computed, ref, toValue, watch} from 'vue'
import dateformat from 'dateformat'
import toComputedRef from '@/compositions/toComputedRef'
import useModelVersion from '@/compositions/useModelVersion'
import toComputedFn from '@/compositions/toComputedFn'
import {useToNumber} from "@vueuse/core";

function useModel(_model: RefLike<ModelMeta | undefined>) {
    const initialValue = toValue(_model)

    const model = ref<ModelMeta | undefined>(initialValue)
    watch(() => toValue(_model), value => model.value = value)

    const index = toComputedRef(model, 'index')
    const name = toComputedRef(model, 'name')

    const author = toComputedRef(model, 'author')
    const authorName = toComputedRef(author, 'name')
    const authorAvatarImageUrl = toComputedRef(author, 'avatarImageUrl')

    const base = toComputedRef(model, 'base')
    const description = toComputedRef(model, 'description')

    const published = toComputedRef(model, 'published', value => dateformat(value, 'mmm dS, yyyy'))
    const updated = toComputedRef(model, 'updated', value => dateformat(value, 'mmm dS, yyyy'))

    const changes = toComputedRef(model, 'changes')
    const versions = toComputedRef(model, 'versions')

    const versionCount = computed(() => versions.value?.length ?? 0)

    function useVersionIndex(_versionIndex: RefLike<number | string | undefined> = undefined) {
        const initialValue = toValue(_versionIndex)

        const value = ref(initialValue)
        watch(() => toValue(_versionIndex), v => value.value = v)

        return useModelVersion(() => {
            const _versions = versions.value
            let _versionIdx = value.value ?? 0
            if (typeof _versionIdx === 'string') {
                _versionIdx = parseInt(_versionIdx)
            }

            return _versions == null ? undefined : _versions[_versionIdx] as ModelVersionMeta
        })
    }

    return {
        index,

        __v_isRef: true, // play nicely with reactivity
        value: model,

        name,

        author,
        authorName,
        authorAvatarImageUrl,

        description,
        base,

        published,
        updated,

        changes,
        versions,
        versionCount,

        useVersionIndex
    }
}

export default useModel