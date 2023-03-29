<template>
    <div>
        <label class="block font-semibold mb-2">{{ label }}</label>
        <select class="shadow border rounded w-full py-2 px-3 bg-gray-100" :class="{ getError }" :value="modelValue"
            @change="$emit('update:modelValue', $event.target.value)" >
            <option value="" v-if="placeholder">{{ placeholder }}</option>
            <option v-for="option in jurusan" :key="`option-${option.value}`" :value="option.id">
                {{ option.value }}
            </option>
        </select>
        <div class="text-center text-red-600" v-if="getError">{{ getError }}</div>
    </div>
</template>




<script>
export default {
    inheritAttrs: false,
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        jurusan: {
            type: Array,
            required: true,
        },
        placeholder: {
            type: String,
            default: "",
        },
        error: {
            type: [Array, String],
            default: null,
        },
    },
    computed: {
        getError() {
            if (this.modelValue === "") {
                return Array.isArray(this.error) ? this.error.join(", ") : this.error;
            }
            return false;
        },
    }
};
</script>


