import { Server } from 'socket.io'
import chatHandler from './handlers/chatHandler.js'
import logger from '../../config/logger.js'

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*', // Ajuste selon ton client
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', (socket) => {
    logger.info(`Nouveau client connecté : ${socket.id}`)
    // Enregistre les handlers de domaine
    chatHandler(io, socket)
    socket.on('disconnect', () => {
      logger.info(`Déconnexion : ${socket.id}`)
    })
  })

  // Si besoin d'y accéder ailleurs
  global.io = io
}
