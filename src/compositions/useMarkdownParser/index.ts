import {marked, MarkedOptions} from 'marked'
import {computed, MaybeRefOrGetter, toValue} from "vue";

function useMarkdownParser(markdown: MaybeRefOrGetter<string | undefined>, options?: MarkedOptions) {
    return computed(() => {
        const value = toValue(markdown)
        return value != null ? marked.parse(value, options) : undefined
    })
}

export default useMarkdownParser