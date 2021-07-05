<template>
    <button
        :type="type"
        class="inline-flex align-middle align-items-center justify-center font-medium focus:outline-none border-2 rounded-lg px-6 py-3 border-gray-200 hover:bg-gray-100"
        :disabled="loading"
        :class="[btnClass, hasRightMargin]"
    >
        <slot v-show="! loading" />
    </button>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'button'
        },
        loading: {
            type: Boolean,
            default: false
        },
        needsRightMargin: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        btnClass () {
            return {
                'base-spinner': this.loading === true,
                'cursor-not-allowed': this.loading === true,
                'bg-gray-100': this.loading === true
            }
        },
        hasRightMargin () {
            return {
                'mr-5 lg:mr-0': this.needsRightMargin === true
            }
        }
    }
}
</script>
<style scoped>
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}

.base-spinner {
  position: relative;
  overflow: hidden;
}

.base-spinner:before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  background-color: inherit;
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
  top: 0;
  left: 0;
}

.base-spinner:after {
  content: "";
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin-top: -10px;
  margin-left: -10px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: inherit;
  animation: spinner 0.6s linear infinite;
  z-index: 2;
}
</style>
