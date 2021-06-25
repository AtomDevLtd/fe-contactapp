<template>
    <div v-show="message">
        <p class="text-sm text-red-600">
            <span v-if="isPropArray && message !== null">
                <span v-if="isSingleMessage">
                    {{ message[0] }}
                </span>
                <span v-else>
                    <template v-for="singleMessage in message">
                        {{ singleMessage }}
                    </template>
                </span>
            </span>
            <span v-else>
                {{ message }}
            </span>
        </p>
    </div>
</template>

<script>
export default {
    props: {
        message: {
            type: [String, Array],
            default: null
        }
    },

    computed: {
        isPropArray () {
            return this.message instanceof Array
        },
        isSingleMessage () {
            return this.message.length === 1
        }
    }
}
</script>
