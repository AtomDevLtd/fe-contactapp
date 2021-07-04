<template>
    <input
        ref="input"
        class="px-4 py-3 rounded-lg mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        :value="value"
        @input="update"
    >
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            default: null
        },
        refocus: {
            type: Boolean,
            default: false
        }
    },

    mounted () {
        if (this.refocus) {
            this.focus()
        }
    },

    methods: {
        focus () {
            this.$refs.input.focus()
        },

        update (event) {
            this.$emit('input', event.target.value)
        }
    }
}
</script>
