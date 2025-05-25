import logger from '../../config/logger.js'

export default (io, socket) => {
  socket.on('chat:sendMessage', (data) => {
    logger.info(`📨 Message reçu : ${data.message}`)
    // Réémettre à tous sauf l'expéditeur
    socket.broadcast.emit('chat:newMessage', {
      message: data.message,
      user: data.user,
    })
  })
  // Tu peux aussi faire du rooms/join/leave ici
}
