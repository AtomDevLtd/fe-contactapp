<template>
    <button
        :type="type"
        class="w-auto bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-5 py-3"
    >
        <slot />
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'submit'
        }
    }
}
</script>
