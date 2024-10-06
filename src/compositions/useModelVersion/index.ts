import toComputedRef from '@/compositions/toComputedRef'
import {DownloadMeta, ModelVersionMeta, RefLike} from '@/types'
import dateformat from 'dateformat'
import {computed, ref, toValue, watch} from 'vue'

function sortDownloads(downloads: DownloadMeta[]) {
    if (downloads == null) {
        return undefined
    }

    const typeComparator = (a: DownloadMeta, b: DownloadMeta) => {
        const typeA = a.type
        const typeB = b.type

        if (typeA === 'yaml') {
            if (typeB !== typeA) {
                return -1
            } else {
                return 0
            }
        } else {
            if (typeB !== typeA) {
                return 1
            } else {
                return 0
            }
        }
    }

    /**
     * @param { DownloadMeta } a
     * @param { DownloadMeta } b
     * @return number
     */
    const comparator = (a: DownloadMeta, b: DownloadMeta) => {
        if (a.primary) {
            if (b.primary) {
                return typeComparator(a, b)
            } else {
                return -1
            }
        } else {
            if (b.primary) {
                return 1
            } else {
                return typeComparator(a, b)
            }
        }
    }

    return downloads.sort(comparator)
}

function useModelVersion(_modelVersion: RefLike<ModelVersionMeta | undefined>) {
    const initialModelVersion = toValue(_modelVersion)

    const version = ref(initialModelVersion)
    watch(() => toValue(_modelVersion), value => version.value = value)

    const index = toComputedRef(version, 'index')

    const name = toComputedRef(version, 'name')
    const description = toComputedRef(version, 'description')
    const notes = toComputedRef(version, 'notes')
    const base = toComputedRef(version, 'base')

    const published = toComputedRef(version, 'published', d => dateformat(d, 'mmm dS, yyyy'))
    const updated = toComputedRef(version, 'updated', d => dateformat(d, 'mmm dS, yyyy'))

    const images = computed(() => {
        const _version = version.value
        if (_version == null) return []
        const _images = _version.images
        if (_images == null) return []
        return _images.map(image => ({...image, 'url': process.env.BASE_URL + image.url}))
    })//toComputedRef(version, 'images')
    const downloads = toComputedRef(version, 'downloads', sortDownloads)

    return {
        index,

        __v_isRef: true,
        value: version,

        name,
        description,
        notes,
        base,

        published,
        updated,

        images,
        downloads
    }
}

export default useModelVersion
