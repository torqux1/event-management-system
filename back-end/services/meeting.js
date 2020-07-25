const clientEndpoint = require('./../common/config/env.config').clientEndpoint
const Message = require('./../models/message.model').model

module.exports = {
    connectSocket: function (io) {
        io.set('origins', clientEndpoint)
        io.on('connection', (socket) => {
            console.log('Socket client connected')

            socket.on('new-message', async (message) => {
                console.log('A new message has been received')

                try {
                    let messageEntity = await Message.create({
                        content: message.content,
                        user: message.userId,
                        meeting: message.meetingId,
                    })

                    messageEntity = await messageEntity
                        .populate('user')
                        .execPopulate()

                    socket.emit('message-created', messageEntity)
                } catch (error) {
                    console.log(error)
                    socket.emit('message-error', error)
                }
            })

            socket.on('disconnect', () => {
                clients.delete(socket.id)
                console.log('Socket client disconnected')
            })
        })
    },
}
