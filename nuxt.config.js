export default {
    // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
    ssr: false,

    // Target: https://go.nuxtjs.dev/config-target
    target: 'static',

    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'fe-contactapp',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '~/plugins/vue-placeholders.js',
        '~/plugins/vue-observe-visibility.client.js',
        '~/plugins/vue-api-query.js'
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: false,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build',
        // https://go.nuxtjs.dev/tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/router-extras',
        '@nuxtjs/svg'
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/dayjs',
        ['nuxt-tailvue',
            {
                all: true,
                toast: {
                    defaultProps: {
                        timeout: 4
                    }
                }
            }
        ]
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseUrl: process.env.API_URL,
        credentials: true,
        headers: {
            Accept: 'application/json'
        }
    },

    auth: {
        strategies: {
            cookie: {
                cookie: {
                    name: 'XSRF-TOKEN'
                }
            },
            laravelSanctum: {
                provider: 'laravel/sanctum',
                url: process.env.API_URL,
                endpoints: {
                    user: {
                        url: process.env.API_URL + '/user'
                    }
                }
            }
        },
        redirect: {
            login: '/login',
            logout: '/login',
            callback: '/login',
            home: '/'
        }
    },

    dayjs: {
        locales: ['en'],
        defaultLocale: 'en',
        defaultTimeZone: 'UTC',
        plugins: [
            'utc',
            'timezone',
            'localizedFormat'
        ]
    },

    router: {
        middleware: ['auth']
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
