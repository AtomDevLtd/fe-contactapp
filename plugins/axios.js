export default function ({ $axios, app }) {
    $axios.onError((error) => {
        if (error.response.status === 401) {
            app.$auth.logout('laravelSanctum', {})
                .then((response) => {
                    $router.push({
                        name: 'login'
                    })
                })
                .catch(({ response }) => {
                    console.log(response)
                })
        }

        if (error.response.status === 404) {
            app.$toast.show({
                type: 'danger',
                title: 'Oops...there is a problem',
                message: error
            })
        }

        if (error.response.status === 500) {
            app.$toast.show({
                type: 'danger',
                title: 'Oops...there is a problem',
                message: error
            })
        }
    })
}
