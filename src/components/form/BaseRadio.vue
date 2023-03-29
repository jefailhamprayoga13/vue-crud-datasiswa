<template>
    <div>
        <label class="block font-semibold mb-2">{{ label }}</label>
        <div class="inline-block ml-4" v-for="option in jenisKelamin" :key="option.id">
            <input :class="{ getError }" type="radio" :value="option.id" :checked="option.id === modelValue" @change="$emit('update:modelValue', option.id)" />
            <label class="ml-1">{{ option.label }}</label>
        </div>
        <div class="text-center text-red-600" v-if="getError">{{ getError }}</div>
    </div>
</template>

<script>
export default {
    props: {
        jenisKelamin: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: null,
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
