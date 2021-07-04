<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
                <!--                <div class="flex-shrink-0 h-10 w-10">-->
                <!--                    <div class="bg-gray-400 rounded-full h-10 w-10 flex items-center justify-center capitalize">-->
                <!--                        {{ list.name.charAt(0) }}-->
                <!--                    </div>-->
                <!--                </div>-->
                <!--                <div class="ml-4">-->
                <div class="text-sm text-gray-900">
                    {{ list.name }}
                </div>
                <!--                </div>-->
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-gray-900">
                {{ list.contacts_count }}
            </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            {{ getCreatedAt() }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
            {{ getUpdatedAt() }}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-between">
                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                <a href="#" class="text-red-600 hover:text-red-900">Delete</a>
            </div>
        </td>
    </tr>
</template>
<script>
export default {
    props: {
        list: {
            type: Object,
            default: null
        }
    },

    methods: {
        getCreatedAt () {
            console.log(this.$dayjs.locale())

            return this.$dayjs(this.list.created_at).format('L LT')
        },

        getUpdatedAt () {
            return this.$dayjs(this.list.updated_at).format('L LT')
        }
    }
}
</script>

<style scoped>

</style>
