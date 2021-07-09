<template>
    <div>
        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <section
                    v-if="$fetchState.pending && !_contacts.length"
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
                    v-show="! $fetchState.pending && _contacts.length !== 0"
                    class="bg-white max-w-xs mb-5 px-4 py-5 rounded-3xl mx-auto"
                >
                    <AddIcon class="mx-auto" />
                    <h2 class="mt-2 text-lg font-medium text-center text-gray-800">
                        Want to add more Contacts?
                    </h2>
                    <div class="flex flex-col items-center justify-center space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                        <a class="cursor-pointer" @click.prevent="openCreateNewContactModal">
                            <div class="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                <div>Create a new Contact</div>

                                <div class="ml-1 text-indigo-500">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                        <NuxtLink :to="{ name: 'Lists' }" class="cursor-pointer text-gray-500 hover:text-gray-700">
                            <div class="mt-1 flex items-center text-xs font-semibold">
                                <div class="mr-1 transform rotate-180">
                                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                </div>

                                <div>or go back to all Lists</div>
                            </div>
                        </NuxtLink>
                    </div>
                </section>
            </div>
            <div class="max-w-screen-2xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-xl sm:rounded-lg">
                    <section v-if="! $fetchState.pending && contacts.length === 0" class="max-w-lg px-4 py-12 mx-auto">
                        <ContactIcon class="mx-auto" />
                        <h2 class="mt-2 text-lg font-medium text-center text-gray-800">
                            No Contacts in <span class="underline">{{ list.name }}</span> yet
                        </h2>
                        <p class="mt-1 text-center text-gray-600">
                            You are on the good path of creating your first ever Contact.
                        </p>
                        <div class="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                            <a class="cursor-pointer" @click.prevent="openCreateNewContactModal">
                                <div class="mt-3 flex items-center text-sm font-semibold text-indigo-700">
                                    <div>Create your first Contact</div>

                                    <div class="ml-1 text-indigo-500">
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div class="flex flex-col items-center justify-center mt-4 space-y-1 md:flex-row md:space-y-0 md:space-x-1">
                            <NuxtLink :to="{ name: 'Lists' }" class="cursor-pointer text-gray-500 hover:text-gray-700">
                                <div class="mt-3 flex items-center text-xs font-semibold">
                                    <div class="mr-1 transform rotate-180">
                                        <svg viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                                    </div>

                                    <div>or go back to all Lists</div>
                                </div>
                            </NuxtLink>
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
                                            <template v-if="$fetchState.pending && !_contacts.length">
                                                <tr v-for="(yesOMG, i) in 25" :key="'initialPlaceholdersMain' + yesOMG">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'initialPlaceholdersCol1' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="3" />
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
                                                            <content-placeholders-text :lines="1" />
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
                                                <ContactRow
                                                    v-for="(theContact, i) in _contacts"
                                                    :key="theContact.id"
                                                    :ref="theContact.id"
                                                    v-observe-visibility="
                                                        i === _contacts.length - 1 ? lazyLoadLists : false
                                                    "
                                                    :contact="theContact"
                                                    :mark-current-row-explicitly-for-key="editContactKey"
                                                    :lock-all-buttons="form.processing"
                                                    @inner-update-contact="onEditOpenModal"
                                                    @inner-delete-contact="deleteContact"
                                                />
                                            </template>
                                            <template v-if="$fetchState.pending && _contacts.length">
                                                <tr v-for="(yesOMG, i) in 25" :key="'loadMorePlaceholdersMain' + yesOMG">
                                                    <td class="px-6 py-4 whitespace-nowrap">
                                                        <content-placeholders
                                                            :key="'loadMorePlaceholdersCol1' + yesOMG + i"
                                                            rounded
                                                        >
                                                            <content-placeholders-text :lines="3" />
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
                                                            <content-placeholders-text :lines="1" />
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
        <DialogModal :show="openCreateNewModal" @close="closeNewContactModal">
            <template #title>
                Create a new Contact
            </template>

            <template #content>
                <div class="my-5">
                    <Input
                        ref="name-new"
                        v-model="form.name"
                        :refocus="true || focusNewName"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Name"
                        required
                        @keyup.native.enter="saveNewContact"
                    />

                    <InputError :message="form.errors.name" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>

                <div class="my-5">
                    <Input
                        ref="email-new"
                        v-model="form.email"
                        type="email"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Email"
                        required
                        @keyup.native.enter="saveNewContact"
                    />

                    <InputError :message="form.errors.email" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>

                <div class="my-5">
                    <Input
                        ref="phone-new"
                        v-model="form.phone"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Phone"
                        required
                        @keyup.native.enter="saveNewContact"
                    />

                    <InputError :message="form.errors.phone" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>
            </template>

            <template #footer>
                <SecondaryButton @click.native="closeNewContactModal">
                    Cancel
                </SecondaryButton>

                <Button
                    type="submit"
                    class="ml-2"
                    :class="{ 'opacity-25': form.processing }"
                    :loading="form.processing"
                    @click.native="saveNewContact"
                >
                    Create
                </Button>
            </template>
        </DialogModal>
        <DialogModal :show="openEditModal" @close="closeEditModal">
            <template #title>
                Edit Contact
            </template>

            <template #content>
                <div class="my-5">
                    <Input
                        ref="name-edit"
                        v-model="form.name"
                        :refocus="true"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Name"
                        required
                        @keyup.native.enter="updateContact"
                    />

                    <InputError :message="form.errors.name" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>

                <div class="my-5">
                    <Input
                        ref="email-edit"
                        v-model="form.email"
                        type="email"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Email"
                        required
                        @keyup.native.enter="updateContact"
                    />

                    <InputError :message="form.errors.email" class="w-full sm:w-3/4 mx-auto mt-2" />
                </div>

                <div class="my-5">
                    <Input
                        ref="phone-edit"
                        v-model="form.phone"
                        type="text"
                        class="block w-full sm:w-3/4 mx-auto"
                        placeholder="Phone"
                        required
                        @keyup.native.enter="updateContact"
                    />

                    <InputError :message="form.errors.phone" class="w-full sm:w-3/4 mx-auto mt-2" />
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
                    @click.native="updateContact"
                >
                    Update
                </Button>
            </template>
        </DialogModal>
    </div>
</template>

<router>
{
  path: "/lists/:listId/",
  name: "Contacts"
}
</router>

<script>
import ContactRow from '~/components/Contacts/ContactRow'
import ContactIcon from '~/assets/icons/contact.svg?inline'
import AddIcon from '~/assets/icons/add.svg?inline'
import List from '~/Models/List'
import Contact from '~/Models/Contact'
import InlineErrorBlock from '~/components/InlineErrorBlock'
import DialogModal from '~/components/DialogModal'
import Button from '~/components/Button'
import SecondaryButton from '~/components/SecondaryButton'
import Input from '~/components/Input'
import InputError from '~/components/InputError'

export default {
    components: {
        ContactRow,
        Input,
        InputError,
        SecondaryButton,
        Button,
        DialogModal,
        ContactIcon,
        AddIcon,
        InlineErrorBlock
    },

    layout: 'default',

    data () {
        return {
            cursorForPagination: null,
            openCreateNewModal: false,
            openEditModal: false,
            editContactKey: null,
            list: null,
            contacts: [],
            form: {
                processing: false,
                name: '',
                email: '',
                phone: '',
                errors: {}
            }
        }
    },

    async fetch () {
        const list = await List.$find(this.$route.params.listId)
        this.list = list
        const contacts = await Contact
            .custom(list, new Contact())
            .params({
                cursor: this.cursorForPagination
            })
            .get()

        this.contacts = this.contacts.concat(contacts.data)
        this.cursorForPagination = contacts.nextCursor ?? null
    },

    computed: {
        _contacts () {
            return this.contacts.map(contact => new Contact(contact))
        }
    },

    mounted () {
        this.$echo.private(`contacts.forList.${this.$route.params.listId}`)
            .listen('.ContactHasBeenSynced', (syncedContact) => {
                this.contacts = this.contacts.map(contactItem => contactItem.id === syncedContact.id ? { ...contactItem, ...syncedContact } : contactItem)
                console.log(syncedContact)
            })
    },

    beforeDestroy () {
        this.$echo.leave(`contacts.forList.${this.$route.params.listId}`)
    },

    methods: {
        lazyLoadLists (isVisible) {
            if (isVisible) {
                if (this.cursorForPagination !== null) {
                    this.$fetch()
                }
            }
        },

        closeNewContactModal () {
            this.openCreateNewModal = false
            this.form.processing = false
            this.form.name = ''
            this.form.email = ''
            this.form.phone = ''
            this.form.errors = {}
        },

        openCreateNewContactModal () {
            this.openCreateNewModal = true
        },

        closeEditModal () {
            this.editContactKey = null
            this.openEditModal = false
            this.form.processing = false
            this.form.name = ''
            this.form.email = ''
            this.form.phone = ''
            this.form.errors = {}
        },

        async onEditOpenModal (key) {
            this.editContactKey = key
            const contactToBeUpdated = await Contact.$find(key)
            this.form.name = contactToBeUpdated.name
            this.form.email = contactToBeUpdated.email
            this.form.phone = contactToBeUpdated.phone
            this.openEditModal = true
        },

        async saveNewContact () {
            this.form.errors = {}
            this.form.processing = true
            const theList = new List({ id: this.$route.params.listId })
            const newContact = new Contact({
                name: this.form.name,
                email: this.form.email,
                phone: this.form.phone
            }).config({ url: `${this.list.resource()}/${theList.id}/${new Contact().resource()}` })

            try {
                const result = await newContact.save()
                const newArray = [result]
                this.contacts = newArray.concat(this.contacts)
                this.form.processing = false
                this.closeNewContactModal()
            } catch (error) {
                if (error?.response?.status === 422) {
                    this.form.errors = error.response.data.errors
                    const firstKey = Object.keys(error.response.data.errors)[0]
                    this.$refs[firstKey + '-new'].focus()
                }
            } finally {
                this.form.processing = false
            }
        },
        async updateContact () {
            this.form.errors = {}
            this.form.processing = true

            try {
                const contactToBeUpdated = await Contact.$find(this.editContactKey)
                contactToBeUpdated.name = this.form.name
                contactToBeUpdated.email = this.form.email
                contactToBeUpdated.phone = this.form.phone
                const result = await contactToBeUpdated.save()
                this.contacts = this.contacts.map(contactItem => contactItem.id === result.id ? { ...contactItem, ...result } : contactItem)
                this.form.processing = false
                this.closeEditModal()
                this.$toast.show({
                    type: 'success',
                    title: 'Hooray',
                    message: 'The contact has been updated'
                })
            } catch (error) {
                if (error?.response?.status === 422) {
                    this.form.errors = error.response.data.errors
                    const firstKey = Object.keys(error.response.data.errors)[0]
                    this.$refs[firstKey + '-edit'].focus()
                }
            } finally {
                this.form.processing = false
            }
        },
        async deleteContact (key) {
            this.form.errors = {}
            this.form.processing = true

            try {
                const contactToBeDeleted = await Contact.$find(key)
                await contactToBeDeleted.delete()
                this.contacts = this.contacts.filter(function (value) {
                    return value.id !== contactToBeDeleted.id
                })
                this.form.processing = false
                this.$toast.show({
                    type: 'success',
                    title: 'Hooray',
                    message: 'The contact has been deleted'
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
