<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap" :class="tdRowClasses">
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
        <td class="px-6 py-4 whitespace-nowrap" :class="tdRowClasses">
            <div class="text-sm text-gray-500">
                {{ list.contacts_count }}
            </div>
        </td>
        <td v-if="$auth.user.klaviyo_api_key" class="px-6 py-4 whitespace-nowrap" :class="tdRowClasses">
            <div v-if="list.integrations.length > 0">
                <table v-for="integration in list.integrations" :key="integration.id" class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" colspan="2" class="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                                <div class="flex items-center justify-center">
                                    <span>{{ integration.api_vendor }}</span>
                                    <span v-if="integration.syncable_external_id && integration.syncable_synced_at" class="px-2 inline-flex text-xs leading-5 text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-if="integration.syncable_external_id">
                            <th class="px-3 py-2 whitespace-nowrap bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider text-center text-xs">
                                External ID
                            </th>
                            <td class="px-3 py-2 whitespace-nowrap text-xs">
                                {{ integration.syncable_external_id }}
                            </td>
                        </tr>
                        <tr v-if="integration.syncable_synced_at">
                            <th class="px-3 py-2 whitespace-nowrap bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider text-center text-xs">
                                Synced at
                            </th>
                            <td class="px-3 py-2 whitespace-nowrap text-xs">
                                {{ $dayjs(integration.syncable_synced_at).format('L LT') }}
                            </td>
                        </tr>
                        <tr v-if="! integration.syncable_external_id && ! integration.syncable_synced_at">
                            <td colspan="2" class="px-3 py-2 whitespace-nowrap text-xs">
                                <div class="flex items-center justify-center">
                                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        />
                                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    <span class="text-indigo-700">
                                        pending sync
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <span v-else class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                Not synced
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" :class="tdRowClasses">
            <span class="text-xs text-gray-500">
                {{ getCreatedAt() }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap" :class="[tdRowClasses, 'rounded-r-full']">
            <span class="text-xs text-gray-500">
                {{ getUpdatedAt() }}
            </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex justify-between">
                <!--                <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>-->
                <TableRowButton
                    :needs-right-margin="true"
                    :loading="lockAllButtons || markCurrentRowExplicitlyForKey !== null"
                    @click.native.prevent="updateList(list.id)"
                >
                    <span class="text-indigo-500">
                        Edit
                    </span>
                </TableRowButton>
                <TableRowButton
                    :loading="lockAllButtons || markCurrentRowExplicitlyForKey !== null"
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
        },
        markCurrentRowExplicitlyForKey: {
            type: Number,
            default: null
        }
    },

    data () {
        return {
            markCurrentRow: false
        }
    },

    computed: {
        tdRowClasses () {
            return {
                'bg-gray-100': this.markCurrentRow || (this.markCurrentRowExplicitlyForKey !== null && this.markCurrentRowExplicitlyForKey === this.list.id)
            }
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
        },

        updateList (item) {
            this.$emit('inner-update-list', item)
        }
    }
}
</script>
