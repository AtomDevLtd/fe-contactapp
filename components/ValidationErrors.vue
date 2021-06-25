<template>
    <div v-if="hasErrors">
        <div class="font-medium text-red-600">
            Whoops! Something went wrong.
        </div>

        <ul class="mt-3 list-disc list-inside text-sm text-red-600">
            <li v-for="(error, key) in errors" :key="key">
                <span v-if="error.length === 1">
                    {{ error[0] }}
                </span>
                <span v-else>
                    {{ error }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        errors: {
            type: Object,
            default: null
        }
    },

    computed: {
        hasErrors () {
            return this.errors !== null && Object.keys(this.errors).length > 0
        }
    }
}
</script>
