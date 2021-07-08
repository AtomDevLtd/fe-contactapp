import Echo from 'laravel-echo'

export default function (ctx, inject) {
    window.Pusher = require('pusher-js')
    const options = {
        broadcaster: 'pusher',
        key: ctx.$config.pusherAppKey,
        cluster: ctx.$config.pusherAppCluster,
        forceTLS: true,
        encrypted: true,
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    ctx.$axios.post('/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                        .then((response) => {
                            callback(false, response.data)
                        })
                        .catch((error) => {
                            callback(true, error)
                        })
                }
            }
        }
    }

    const echo = new Echo(options)

    inject('echo', echo)
}
