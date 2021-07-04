export const state = () => ({
    loadingLocale: false
})

export const mutations = {
    SET_LOADING_LOCALE_FINISHED (state) {
        console.log('SET_LOADING_LOCALE_FINISHED', true)
        state.loadingLocale = true
    }
}
