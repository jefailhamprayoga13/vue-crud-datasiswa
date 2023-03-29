<template>
    <div class="form-group">
        <label class="block font-semibold mb-2">{{ label }}</label>
        <div>
            <div class="inline ml-2" v-for="option in hobby" :key="`checkbox-${option.id}`">
                <input class="ml-1" :class="{ getError }" type="checkbox" :value="option.id" :checked="isChecked(option.id)"
                    @change="handleChange" />
                <label >{{ option.value }}</label>
            </div>
            <div class="text-center text-red-600" v-if="getError">{{ getError }}</div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        isChecked(value) {
            return this.modelValue.includes(value);
        },

        handleChange(event) {
            const checked = event.target.checked;
            let value = event.target.value;
            if (!isNaN(value)) {
                value = Number(value);
            }
            const newValues = [...this.modelValue];

            if (checked) {
                newValues.push(value);
            } else {
                const index = newValues.indexOf(value);
                newValues.splice(index, 1);
            }
            this.$emit("update:modelValue", newValues);
        },
    },
    props: {
        modelValue: {
            type: Array,
            default: () => ([]),
        },
        hobby: {
            type: Array,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        error: {
            type: [Array, String],
            default: null,
        },
    },
    computed: {
        getError() {
            if (this.modelValue.length === 0){
                return Array.isArray(this.error) ? this.error.join(", ") : this.error;
            }
            return false;
        },
    }
};
</script>
