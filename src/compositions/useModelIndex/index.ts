import {RefLike} from "@/types";
import {computed, ref, toValue, watch} from "vue";
import useModelRepository from "@/compositions/useModelRespository";
import useModel from "@/compositions/useModel";
import {useToNumber} from "@vueuse/core";

function useModelIndex(index: RefLike<number | string>) {
    const initialValue = toValue(index)
    const value = ref(initialValue)

    const valueAsInt = useToNumber(value, {method: 'parseInt'})

    watch(() => toValue(index), v => value.value = v)

    const repository = useModelRepository()
    const {
        models
    } = repository

    return useModel(() => {
        const _models = models.value
        return _models != null && _models.length > 0 ? _models[valueAsInt.value] : undefined
    })
}

export default useModelIndex