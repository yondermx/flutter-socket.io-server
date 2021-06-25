const { io } = require('../index');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado OK');

    client.on('disconnect', () => { 
        console.log('Cliente Desconectado')
    });
    client.on('mensaje', (payload) => { 
        console.log('Mensaje:', payload);

        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });



  });