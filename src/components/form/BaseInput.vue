<template>
    <div>
        <label class="block font-semibold mb-2">{{ label }}</label>
        <input
            class="shadow border rounded w-full py-2 px-3 text-gray-700" :class="{ getError }"  v-bind="$attrs" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" />
            <div class="text-center text-red-600" v-if="getError">{{ getError }}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: null,
        },
        placeholder: {
            type: String,
            default: '',
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