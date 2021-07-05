<template>
    <MountingPortal mount-to="body" append>
        <transition leave-active-class="duration-200">
            <div v-show="show" class="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50" scroll-region>
                <transition
                    enter-class="opacity-0"
                    enter-active-class="transition-all ease-out duration-300"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-class="opacity-100"
                    leave-active-class="transition-all ease-in duration-200"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-show="show" class="fixed inset-0 transform transition-all" @click="close">
                        <div class="absolute inset-0 bg-gray-500 opacity-75" />
                    </div>
                </transition>

                <transition
                    enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-active-class="transition-all ease-out duration-300"
                    enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enter-to-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-active-class="transition-all ease-in duration-200"
                    leave-from-class="opacity-100 translate-y-0 sm:scale-100"
                    leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div v-show="show" class="mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto" :class="maxWidthClass">
                        <slot v-if="show" />
                    </div>
                </transition>
            </div>
        </transition>
    </MountingPortal>
</template>

<script>
import { MountingPortal } from 'portal-vue'

export default {
    components: {
        MountingPortal
    },

    props: {
        show: {
            type: Boolean,
            default: false
        },
        maxWidth: {
            type: String,
            default: '2xl'
        },
        closeable: {
            type: Boolean,
            default: true
        }
    },

    computed: {
        maxWidthClass () {
            return {
                sm: 'sm:max-w-sm',
                md: 'sm:max-w-md',
                lg: 'sm:max-w-lg',
                xl: 'sm:max-w-xl',
                '2xl': 'sm:max-w-2xl'
            }[this.maxWidth]
        }
    },

    watch: {
        show: {
            immediate: true,
            handler (show) {
                if (show) {
                    document.body.style.overflow = 'hidden'
                } else {
                    this.close()
                    document.body.style.overflow = null
                }
            }
        }
    },

    created () {
        const onEscape = (e) => {
            if (this.show && e.keyCode === 27) {
                this.close()
            }
        }

        // eslint-disable-next-line nuxt/no-globals-in-created
        document.addEventListener('keydown', onEscape)
        this.$once('hook:destroyed', () => {
            // eslint-disable-next-line nuxt/no-globals-in-created
            document.removeEventListener('keydown', onEscape)
        })
    },

    methods: {
        close () {
            if (this.closeable) {
                this.$emit('close')
            }
        }
    }
}
</script>
