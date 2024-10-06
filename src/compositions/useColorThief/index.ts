import {MaybeRefOrGetter, Ref, ref, toValue, watch} from 'vue'
// @ts-ignore
import ColorThief from 'colorthief'

function useColorThief(imageSrc: MaybeRefOrGetter<string | undefined>) {
    const dominant: Ref<number[] | undefined> = ref()
    const palette: Ref<number[][] | undefined> = ref()
    const thief = new ColorThief()

    function update(imageSrcUrl = toValue(imageSrc)) {
        dominant.value = undefined
        palette.value = undefined

        if (imageSrcUrl == null) {
            return
        }

        const imageEl = document.createElement('img')
        const thiefListener = () => {
            dominant.value = thief.getColor(imageEl)
            palette.value = thief.getPalette(imageEl, 50)
        }

        Object.assign(imageEl.style, {
            display: 'none'
        })

        imageEl.src = imageSrcUrl
        imageEl.onload = thiefListener
        document.body.appendChild(imageEl)
    }

    watch(() => toValue(imageSrc), update)
    update()

    return {
        dominant,
        palette
    }
}

export default useColorThief