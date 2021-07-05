export const state = () => ({
    loadingLocale: false
})

export const mutations = {
    SET_LOADING_LOCALE_FINISHED (state) {
        state.loadingLocale = true
    }
}
