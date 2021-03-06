<template>
    <div>
        <div v-if="$nuxt.isOffline">
            <OfflineBlock />
        </div>
        <div class="min-h-screen bg-gray-100">
            <nav class="bg-white border-b border-gray-100">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="flex-shrink-0 flex items-center">
                                <NuxtLink :to="{ name: 'Home' }">
                                    <ApplicationMark class="block h-9 w-auto" />
                                </NuxtLink>
                            </div>

                            <!-- Navigation Links -->
                            <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink :href="{ name: 'Home'}" :active="$route.name === 'Home'">
                                    Dashboard
                                </NavLink>
                                <NavLink :href="{ name: 'Lists'}" :active="$route.name === 'Lists' || $route.name === 'Contacts'">
                                    Lists
                                </NavLink>
                                <NavLink :href="{ name: 'ManageKlaviyoIntegration'}" :active="$route.name === 'ManageKlaviyoIntegration'">
                                    Klaviyo Integration
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ml-6">
                            <!-- Settings Dropdown -->
                            <div class="ml-3 relative">
                                <Dropdown align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">
                                            <button type="button" class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition">
                                                {{ getUserName }}

                                                <svg class="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <!-- Account Management -->
                                        <div class="block px-4 py-2 text-xs text-gray-400">
                                            Manage Account
                                        </div>

                                        <DropdownLink :href="{ name: 'Profile' }">
                                            Profile
                                        </DropdownLink>

                                        <div class="border-t border-gray-100" />

                                        <!-- Authentication -->
                                        <form @submit.prevent="logout">
                                            <DropdownLink as="button">
                                                Log Out
                                            </DropdownLink>
                                        </form>
                                    </template>
                                </Dropdown>
                            </div>
                        </div>

                        <!-- Hamburger -->
                        <div class="-mr-2 flex items-center sm:hidden">
                            <button
                                class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"
                                @click="showingNavigationDropdown = ! showingNavigationDropdown"
                            >
                                <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path :class="{'hidden': showingNavigationDropdown, 'inline-flex': ! showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                    <path :class="{'hidden': ! showingNavigationDropdown, 'inline-flex': showingNavigationDropdown }" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <!-- Responsive Navigation Menu -->
                <div :class="{'block': showingNavigationDropdown, 'hidden': ! showingNavigationDropdown}" class="sm:hidden">
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink :href="{ name: 'Home'}" :active="$route.name === 'Home'">
                            Dashboard
                        </ResponsiveNavLink>

                        <ResponsiveNavLink :href="{ name: 'Lists'}" :active="$route.name === 'Lists'">
                            Lists
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div class="pt-4 pb-1 border-t border-gray-200">
                        <div class="flex items-center px-4">
                            <div>
                                <div class="font-medium text-base text-gray-800">
                                    {{ getUserName }}
                                </div>
                                <div class="font-medium text-sm text-gray-500">
                                    {{ getUserEmail }}
                                </div>
                            </div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="{ name: 'Profile'}" :active="$route.name === 'Profile'">
                                Profile
                            </ResponsiveNavLink>

                            <!-- Authentication -->
                            <form method="POST" @submit.prevent="logout">
                                <ResponsiveNavLink as="button">
                                    Log Out
                                </ResponsiveNavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header v-if="$slots.header" class="bg-white shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <slot name="header" />
                </div>
            </header>

            <!-- Page Content -->
            <main>
                <Nuxt />
            </main>
        </div>
    </div>
</template>

<script>
import OfflineBlock from '~/components/OfflineBlock'
import ApplicationMark from '~/components/ApplicationMark'
import Dropdown from '~/components/Dropdown'
import DropdownLink from '~/components/DropdownLink'
import NavLink from '~/components/NavLink'
import ResponsiveNavLink from '~/components/ResponsiveNavLink'

export default {
    components: {
        OfflineBlock,
        ApplicationMark,
        Dropdown,
        DropdownLink,
        NavLink,
        ResponsiveNavLink
    },

    data () {
        return {
            showingNavigationDropdown: false
        }
    },

    head () {
        return {
            bodyAttrs: {
                class: this.$nuxt.isOffline ? 'overflow-hidden' : ''
            }
        }
    },

    computed: {
        getUserName () {
            return this.$auth.loggedIn
                ? this.$auth.user.name
                : ''
        },

        getUserEmail () {
            return this.$auth.loggedIn
                ? this.$auth.user.email
                : ''
        }
    },

    mounted () {
        if (this.$auth.loggedIn) {
            this.$echo.connect()
        }
    },

    beforeCreate () {
        const LOCALE = navigator.language

        if (LOCALE && LOCALE.length === 2) {
            import(`dayjs/locale/${LOCALE}.js`)
                .then(() => {
                    this.$dayjs.locale(LOCALE)
                    this.$store.commit('SET_LOADING_LOCALE_FINISHED')
                })
        } else {
            this.$store.commit('SET_LOADING_LOCALE_FINISHED')
        }
    },

    auth: 'auth',

    methods: {
        async logout () {
            await this.$auth.logout('laravelSanctum', {})
                .then((response) => {
                    if (!this.$auth.loggedIn && this.$echo.connector) {
                        this.$echo.disconnect()
                    }

                    this.$router.push({
                        name: 'login'
                    })
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        }
    }
}
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.page-enter,
.page-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}
.layout-enter,
.layout-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
