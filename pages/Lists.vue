<template>
    <div>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <section
                    v-if="$fetchState.pending && !_lists.length"
                    class="bg-white max-w-xs mb-5 px-4 py-5 rounded-3xl mx-auto"
                >
                    <content-placeholders
                        key="CreateNewBlockPlaceholder"
                        rounded
                    >
                        <content-placeholders-img class="h-36 mb-2" />
                        <content-placeholders-heading />
                    </content-placeholders>
                </section>
                <section
                    v-show="! $fetchState.pending && lists.length !== 0"
                    class="bg-white max-w-xs mb-5 px-4 py-5 rounded-3xl mx-auto"
                >
                    <AddIcon class="mx-auto" />
                    <h2 class="mt-2 text-lg font-medium text-center text-gray-800">
                        Want to add more Lists?
                    </h2>
                    <div class="flex flex-col items-center justify-center space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                        <a class="cursor-pointer" @click.prevent="openCreateNewListModal">
                            <div class="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                <div>Create a new List</div>

                                <div class="ml-1 text-indigo-500">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                </div>
                            </div>
                        </a>
                    </div>
                </section>
            </div>
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <section v-if="! $fetchState.pending && lists.length === 0" class="max-w-lg px-4 py-12 mx-auto">
                        <DocumentIcon class="mx-auto" />
                        <h2 class="mt-2 text-lg font-medium text-center text-gray-800">
                            No Lists yet
                        </h2>
                        <p class="mt-1 text-center text-gray-600">
                            You are on the good path of creating your first ever List.
                        </p>
                        <div class="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                            <a class="cursor-pointer" @click.prevent="openCreateNewListModal">
                                <div class="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                    <div>Create your first List</div>

                                    <div class="ml-1 text-indigo-500">
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </section>

                    <div v-else class="flex flex-col">
                        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table v-if="$store.state.loadingLocale" class="min-w-full divide-y divide-gray-200">
                                        <thead class="bg-gray-50">
                                            <tr>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Contacts count
                                                </th>
                                                <th v-if="$auth.user.klaviyo_api_key" scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    API Integrations
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Created
                                                </th>
                                                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Last updated
                                                </th>
                                                <th scope="col" class="relative px-6 py-3">
                                                    <span class="sr-only">Edit</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody class="bg-white divide-y divide-gray-200">
                                            <template v-if="$fetchState.pending && !_lists.length">
                                                <tr v-for="(yesOMG, i) in 25" :key="'initialPlaceholdersMain' + yesOMG">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol1' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol2' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td v-if="$auth.user.klaviyo_api_key" class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol3' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="2" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol4' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol5' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol6' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else-if="$fetchState.error">
                                                <tr>
                                                    <td colspan="4" class="px-6 py-4 whitespace-nowrap">
                                                        <InlineErrorBlock :error="$fetchState.error" />
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                <ListRow
                                                    v-for="(theList, i) in _lists"
                                                    :key="theList.id"
                                                    :ref="theList.id"
                                                    v-observe-visibility="
                                                        i === _lists.length - 1 ? lazyLoadLists : false
                                                    "
                                                    :list="theList"
                                                    :mark-current-row-explicitly-for-key="editListKey"
                                                    :lock-all-buttons="form.processing"
                                                    @inner-update-list="onEditOpenModal"
                                                    @inner-delete-list="deleteList"
                                                />
                                            </template>
                                            <template v-if="$fetchState.pending && _lists.length">
                                                <tr v-for="(yesOMG, i) in 25" :key="'loadMorePlaceholdersMain' + yesOMG">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol1' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol2' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td v-if="$auth.user.klaviyo_api_key" class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol3' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="2" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol4' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol5' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol6' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="1" />
                                                        </content-placeholders>
                                                    </td>
                                                </tr>
                                            </template>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <DialogModal :show="openCreateNewModal" @close="closeNewListModal">
            <template #title>
                Create a new List
            </template>

            <template #content>
                <div class="my-5">
                    <Input
                        ref="name"
                        v-model="form.name"
                        :refocus="true"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Name"
                        required
                        autofocus
                        @keyup.native.enter="saveNewList"
                    />

                    <InputError :message="form.errors.name" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>
            </template>

            <template #footer>
                <SecondaryButton @click.native="closeNewListModal">
                    Cancel
                </SecondaryButton>

                <Button
                    type="submit"
                    class="ml-2"
                    :class="{ 'opacity-25': form.processing }"
                    :loading="form.processing"
                    @click.native="saveNewList"
                >
                    Create
                </Button>
            </template>
        </DialogModal>
        <DialogModal :show="openEditModal" @close="closeEditModal">
            <template #title>
                Edit List
            </template>

            <template #content>
                <div class="my-5">
                    <Input
                        ref="name"
                        v-model="form.name"
                        :refocus="true"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Name"
                        required
                        autofocus
                        @keyup.native.enter="updateList"
                    />

                    <InputError :message="form.errors.name" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>
            </template>

            <template #footer>
                <SecondaryButton @click.native="closeEditModal">
                    Cancel
                </SecondaryButton>

                <Button
                    type="submit"
                    class="ml-2"
                    :class="{ 'opacity-25': form.processing }"
                    :loading="form.processing"
                    @click.native="updateList"
                >
                    Update
                </Button>
            </template>
        </DialogModal>
    </div>
</template>

<router>
{
  path: "/lists",
  name: "Lists"
}
</router>

<script>
import DocumentIcon from '~/assets/icons/document.svg?inline'
import AddIcon from '~/assets/icons/add.svg?inline'
import List from '~/Models/List'
import InlineErrorBlock from '~/components/InlineErrorBlock'
import ListRow from '~/components/Lists/ListRow'
import DialogModal from '~/components/DialogModal'
import Button from '~/components/Button'
import SecondaryButton from '~/components/SecondaryButton'
import Input from '~/components/Input'
import InputError from '~/components/InputError'

export default {
    components: {
        Input,
        InputError,
        SecondaryButton,
        Button,
        DialogModal,
        DocumentIcon,
        AddIcon,
        InlineErrorBlock,
        ListRow
    },

    layout: 'default',

    data () {
        return {
            cursorForPagination: null,
            openCreateNewModal: false,
            openEditModal: false,
            editListKey: null,
            lists: [],
            form: {
                processing: false,
                name: '',
                errors: {}
            }
        }
    },

    async fetch () {
        const lists = await List
            .params({
                cursor: this.cursorForPagination
            })
            .get()

        this.lists = this.lists.concat(lists.data)
        this.cursorForPagination = lists.nextCursor ?? null
    },

    computed: {
        _lists () {
            return this.lists.map(list => new List(list))
        }
    },

    methods: {
        lazyLoadLists (isVisible) {
            if (isVisible) {
                if (this.cursorForPagination !== null) {
                    this.$fetch()
                }
            }
        },

        closeNewListModal () {
            this.openCreateNewModal = false
            this.form.processing = false
            this.form.name = ''
            this.form.errors = {}
        },

        openCreateNewListModal () {
            this.openCreateNewModal = true
        },

        closeEditModal () {
            this.editListKey = null
            this.openEditModal = false
            this.form.processing = false
            this.form.name = ''
            this.form.errors = {}
        },

        async onEditOpenModal (key) {
            this.editListKey = key
            const listToBeUpdated = await List.$find(key)
            this.form.name = listToBeUpdated.name
            this.openEditModal = true
        },

        async saveNewList () {
            this.form.errors = {}
            this.form.processing = true
            const newList = new List({
                name: this.form.name
            })

            try {
                const result = await newList.save()
                const newArray = [result]
                this.lists = newArray.concat(this.lists)
                this.form.processing = false
                this.closeNewListModal()
            } catch (error) {
                if (error?.response?.status === 422) {
                    this.form.errors = error.response.data.errors
                    const firstKey = Object.keys(error.response.data.errors)[0]
                    this.$refs[firstKey].focus()
                }
            } finally {
                this.form.processing = false
            }
        },
        async updateList () {
            this.form.errors = {}
            this.form.processing = true

            try {
                const listToBeUpdated = await List.$find(this.editListKey)
                listToBeUpdated.name = this.form.name
                const result = await listToBeUpdated.save()
                this.lists = this.lists.map(listItem => listItem.id === result.id ? { ...listItem, ...result } : listItem)
                this.form.processing = false
                this.closeEditModal()
                this.$toast.show({
                    type: 'success',
                    title: 'Hooray',
                    message: 'The list has been updated'
                })
            } catch (error) {
                if (error?.response?.status === 422) {
                    this.form.errors = error.response.data.errors
                }
            } finally {
                this.form.processing = false
                this.editListKey = null
            }
        },
        async deleteList (key) {
            this.form.errors = {}
            this.form.processing = true

            try {
                const listToBeDeleted = await List.$find(key)
                await listToBeDeleted.delete()
                this.lists = this.lists.filter(function (value) {
                    return value.id !== listToBeDeleted.id
                })
                this.form.processing = false
                this.$toast.show({
                    type: 'success',
                    title: 'Hooray',
                    message: 'The list has been deleted'
                })
            } catch (error) {
                if (error?.response?.status === 422) {
                    const firstKey = Object.keys(error.response.data.errors)[0]
                    this.$toast.show({
                        type: 'danger',
                        title: 'Oops...there is a problem',
                        message: error.response.data.errors[firstKey][0]
                    })
                }
            } finally {
                this.form.processing = false
            }
        }
    }
}
</script>
