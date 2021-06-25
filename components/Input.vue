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
    props: ['value'],

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
