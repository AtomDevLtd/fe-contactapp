<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap" :class="markCurrentRow ? 'bg-gray-100' : ''">
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
        <td class="px-6 py-4 whitespace-nowrap" :class="markCurrentRow ? 'bg-gray-100' : ''">
            <div class="text-sm text-gray-500">
                {{ list.contacts_count }}
            </div>
        </td>
        <td v-if="$auth.user.klaviyo_api_key" class="px-6 py-4 whitespace-nowrap" :class="markCurrentRow ? 'bg-gray-100' : ''">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                Active
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" :class="markCurrentRow ? 'bg-gray-100' : ''">
            <span class="text-sm text-gray-500">
                {{ getCreatedAt() }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" :class="markCurrentRow ? 'bg-gray-100 rounded-r-full' : ''">
            <span class="text-sm text-gray-500">
                {{ getUpdatedAt() }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-between">
                <!--                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>-->
                <TableRowButton
                    :needs-right-margin="true"
                    :loading="lockAllButtons"
                >
                    <span class="text-indigo-500">
                        Edit
                    </span>
                </TableRowButton>
                <TableRowButton
                    :loading="lockAllButtons"
                    @click.native.prevent="deleteList(list.id)"
                >
                    <span class="text-gray-500">
                        Delete
                    </span>
                </TableRowButton>
            </div>
        </td>
    </tr>
</template>
<script>
import TableRowButton from '../TableRowButton'
export default {
    components: { TableRowButton },
    props: {
        list: {
            type: Object,
            default: null
        },
        lockAllButtons: {
            type: Boolean,
            default: false
        }
    },

    data () {
        return {
            markCurrentRow: false
        }
    },

    methods: {
        getCreatedAt () {
            return this.$dayjs(this.list.created_at).format('L LT')
        },

        getUpdatedAt () {
            return this.$dayjs(this.list.updated_at).format('L LT')
        },

        deleteList (item) {
            this.markCurrentRow = true
            this.$emit('inner-delete-list', item)
        }
    }
}
</script>
