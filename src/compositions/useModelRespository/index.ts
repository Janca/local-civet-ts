import {createGlobalState, useLocalStorage, useSessionStorage} from "@vueuse/core";
import {readonly, Ref, ref} from "vue";
import {ModelMeta} from "@/types";

const useState = createGlobalState(() => {
    const models: Ref<ModelMeta[]> = useLocalStorage('repository.models', [])
    const refreshed = ref<boolean>(false)
    const loading = ref<boolean>(false)

    return {
        models,
        refreshed,
        loading
    }
})

export interface UseModelsOptions {
    immediate: boolean
    reload: boolean
}

interface MetadataFetchResult {
    models: ModelMeta[]
}

function isValidFetchResult(o: any): o is MetadataFetchResult {
    return o && 'models' in o && Array.isArray(o.models)
}

function useModelRepository(options?: UseModelsOptions) {
    const state = useState()

    const {
        models,
        refreshed,
        loading
    } = state

    async function load() {
        if (loading.value) return

        try {
            loading.value = true

            const result = await fetch('/repository/metadata.json');
            if (!result.ok) throw 'Invalid response.'

            models.value = []

            const json = await result.json()
            if (isValidFetchResult(json)) {
                const _models = json.models ?? []
                _models.forEach((model, idx) => {
                    model['index'] = idx

                    const versions = model.versions
                    versions.forEach((version, versionIdx) => {
                        version['index'] = versionIdx
                    })
                })

                models.value = _models
                refreshed.value = true
            }
        } finally {
            loading.value = false;
        }
    }

    const {
        immediate = true,
        reload = false
    } = options ?? {}

    if (immediate) {
        if (!refreshed.value || reload || models.value.length === 0) {
            void load()
        }
    }

    return {
        loading,
        models
    }
}

export default useModelRepository