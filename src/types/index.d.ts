import {ComputedRef, MaybeRefOrGetter} from 'vue'

type RefLike<T> = MaybeRefOrGetter<T> | ComputedRef<T>

type ComputedRefs<T> = {
    [K in keyof T]: ComputedRef<Readonly<T[K]> | T[K] | undefined>
}

interface ImageGenerationMeta {
    prompt: string
    negativePrompt: string
}

interface ImageMeta {
    url: string
    generationMeta: ImageGenerationMeta | undefined
}

interface DownloadMeta {
    url: string
    type: string
    name: string | undefined
    info: string | undefined
    primary: boolean | undefined
}

interface AuthorMeta {
    name: string
    avatarImageUrl?: string
}

interface ModelVersionMeta {
    index: number

    name: string
    description: string | undefined
    notes: string | undefined
    base: string | undefined
    type: string | undefined

    published: string | undefined
    updated: string | undefined

    images: ImageMeta[] | undefined
    downloads: DownloadMeta[] | undefined
}

interface ChangeEvent {
    datetime: string
    description: string
    changes: string[]
}

interface ModelMeta {
    index: number

    name: string
    description: string | undefined
    base: string | undefined
    type: string | undefined

    author: AuthorMeta

    changes: ChangeEvent[]

    versions: ModelVersionMeta[]

    published: string | undefined
    updated: string | undefined
}