const Discord = require('discord.js'); 
const { Client, MessageEmbed } = require('discord.js');
const client = new Client(); 

const db = require('megadb'); 
const { crearDB } = require('megadb'); 

const ms = require('ms');

client.on('ready', () => {
	console.log(`Conectado como ${client.user.tag}`) // ¡Enviará este mensaje a la consola cuando encienda éxitosamente el bot!
});

/*Bien, aquí crearemos las "bases de datos" que usa el bot a lo largo de su código, usando megadb*/
var ticketsComandos = new crearDB('Tickets_Comandos') // Esta será la base de datos usada en comandos del bot
var ticketsMD = new crearDB('Tickets_MD') // Esta será la base de datos usada en mensajes directos (MD) del bot
/*Aquí terminamos de hacer eso. PSDT : Se te creará una carpeta llamada "mega_databases"*/

const datos = require('./utilidad/datos.json') // Acá estamos solicitando acceso nuestro archivo json llamado "datos", donde has rellenado ya lo que te he pedido en el archivo .md (Leéme primero.md)
/*
Lo usaremos de la siguiente forma : 
datos.rol = La ID del rol de soporte que hemos puesto
datos.servidor = La ID del servidor
datos.categoria = La ID de la categoría 
*/

const prefix = 'prefix'; // Aquí definirás el prefix de tu bot. Ejemplo : EL prefix de Mee6 (Bot de discord) es '!'

/*Este es el inicio de nuestro evento message*/
client.on('message', async message => {

/*Para eviar bucles infinitos o cosas por el estilo, tenemos esta condicional. Si el autor del mensaje es un bot, retornará nada
así nos evitamos que por ejemplo, si algún bot envia mensaje a nuestro bot, evidentemente no queremos eso, tampoco queremos que algún bot
ejecute comandos de nuestro bot, o bueno tampoco nuestro mismo bot.
*/
if (message.author.bot) return

/*Acá empezaremos lo que se conoce como "modmail", creamos una condición a la cual entrará una vez que alguien le envie un mensaje
al mismo bot.*/
if (message.channel.type == 'dm') { // dm = MD (Mensaje Directo)

	var guild = client.guilds.cache.get(datos.servidor) // Aquí estamos definiendo el servidor donde realizaremos todo acá.

	if (!guild) return console.log('Servidor inválido! [MODMAIL]') // Aquí vemos si consigue nuestro servidor, si no, retornará esto a la consola, esto puede pasar debido a que la ID del servidor que has puesto no es válida

	/*Ok, aquí vamos a comprobar si el autor del mensaje ya tiene un ticket abierto dentro del servidor, si es así, no vamos a crear otro canal ¿No?, vamos a enviar su respuesta al mismo canal ya creado*/
	if (ticketsMD.tiene(`${guild.id}.${message.author.id}`)) {

		let obtenerCanal = await ticketsMD.obtener(`${guild.id}.${message.author.id}.canal`) // Aquí obtenemos la ID del canal que estableceremos más adelante, no te preocupes si no lo entiendes, lo estableceremos más adelante
		let canal = guild.channels.cache.find(c => c.id == obtenerCanal) // Buscamos el canal dentro del servidor que hemos definido
		let mensaje = message.content // Aquí estamos definiendo el mensaje que ENVIÓ el usuario, una vez que comprendas el código podrás verificar otras cosas que den posibles errores, ejemplo el largo del mensaje, si menciona a everyone/here, etc . . .

		if (!canal) return console.log('No he encontrado el canal [MODMAIL]') // Esto puede suceder debido a que hayamos eliminado el canal de forma manual (borrarlo) y no por el comando borrar

		canal.send(`Respuesta del usuario (${message.author.tag}): \n${mensaje}`) // Aquí estamos enviando el mensaje AL CANAL que hemos buscado más arriba, ya que ya el usuario ya tiene un canal abierto 
		
		if (message.attachments.size > 0) { // Acá vamos a verificar si el usuario adjunto algun archivo (generalmente alguna imágen adjunta)
			let attach = message.attachments.first()
			canal.send(attach.url) // Aquí estamos enviando la URL del archivo (generalmente alguna imágen) al ticket (canal) del usuario
		}

		return message.author.send('Listo!, he envíado tu mensaje de forma éxitosa').catch() // Notificamos al autor del mensaje que su mensaje fue enviado corréctamente, usamos un catch para evitar cualquier error, ejemplo que tenga sus MD cerrados, o bloquee al bot

	} else { /*Oki, ahora vamos aquí, si NO tiene algún canal YA creado, lo que haremos acá es crearlo, y enviar su mensaje a ese canal*/

		let	everyone = guild.roles.cache.find(r => r.name == '@everyone') // Aquí buscamos el rol everyone de nuestro servidor
		let soporte = guild.roles.cache.find(r => r.id == datos.rol) // Aquí buscaremos el rol que establecimos de soporte en el servidor
		let mensaje = message.content // Definimos el mensaje que envió

		if (!soporte) return console.log('Rol soporte no válido [MODMAIL]') // Esto puede pasar si has puesto mal la ID de tu rol soporte

		// Ok,vemos que aquí estamos creando el canal donde se enviará el mensaje del usuario
		let creandoCanal = await guild.channels.create(`${message.author.tag}`, { // De nombre del canal vamos a poner el tag del usuario, ejemplo "Jyn#0000"
			type: 'text',  // El tipo de canal que queremos es de texto, así que en type está 'text'
			reason: `¡Nuevo Ticket!` // Esta razón es opcional
		})

		creandoCanal.setParent(datos.categoria).catch() // Aquí movemos el canal a la categoría que has puesto en el archivo json, usamos un catch por si ocurre algún error
		creandoCanal.setTopic(`Ticket de : ${message.author.tag} (${message.author.id})`) // Esta parte es opcional, aquí estamos estableciendo una descripción al canal que creamos, puedes poner acá lo que desees

		let canal = guild.channels.cache.find(c => c.id == creandoCanal.id) // Busquemos el canal en el servidor

		if (!canal) return console.log('Canal recién creado no encontrado [MODMAIL]') // La verdad es que yo no sé si esto se ejecute alguna vez, y no tengo idea de que sea si lo hace, pero lo ponemos por si acaso (?

	    /*
	     Bueno, acá estamos configurando permisos al canal que recién creamos
		 Para everyone pondremos que nadie pueda ver el canal y para soporte ponemos que si, las personas con ese rol podrán hacerlo
		 true = Permitido
		 false = Denegado
		*/
	    canal.updateOverwrite(everyone, {
	      	VIEW_CHANNEL: false // Ver canal
	    })

	    canal.updateOverwrite(soporte, {
	      	VIEW_CHANNEL: true, // Ver canal
	      	EMBED_LINKS: true, // Insertar enlaces
	      	ATTACH_FILES: true, // Adjunar archivos
	      	READ_MESSAGE_HISTORY: true // Leer historial de mensajes
	    })

	    // Aquí establecemos el autor en la base de mensajes directos
	    await ticketsMD.establecer(`${config.guild}.${message.author.id}`, {

	    	'autor': message.author.id, // Establezcamos la ID del autor
	    	'canal': creandoCanal.id // Ahora la id del canal

	    })
	    
	    // Aquí establecemos la id del canal en la base de comandos
	    await ticketsComandos.establecer(`${config.guild}.${creandoCanal.id}`, {

	    	'autor': message.author.id, // Establezcamos la ID del autor
	    	'canal': creandoCanal.id // Ahora la id del canal

	    })
		
		canal.send(`Mensaje del usuario (${message.author.tag}): \n${mensaje}`) // Acá enviamos el mensaje al canal que recién creamos
		
		if (message.attachments.size > 0) { // Si envió algun archivo (generalmente una imágen)
			let attach = message.attachments.first()
			canal.send(attach.url) // Envíamos al canal la URL del archivo (generalmente una imágen)
		}

		return message.author.send('Listo!, he envíado tu mensaje de forma éxitosa').catch() // Y le notificamos
	}

} /*Aquí finalizamos nuestro "modmail"*/

/*Apartir de aquí vamos a empezar los comandos de nuestro bot de ejemplo*/
if (!message.content.startsWith(prefix)) return // Esto sirve para evitar bucles, o cosas así, si el contenido del mensaje no empieza por el prefix que tenemos, no retornara nada

const args = message.content.slice(prefix.length).trim().split(/ +/g); /*Aquí definimos los argumentos del mensaje - Más información en : https://portalmybot.com/guia/mybot/uso-argumentos */

const comando = args.shift().toLowerCase(); /*Definimos un comando o cualquiera del bot.*/

/*
	Bueno, acá crearemos dos funciones, para ahorrarnos trabajos 

	Usaremos la llamada "Soporte" para verificar si EL AUTOR DEL MENSAJE es alguien de soporte
	Usaremos la llamada "esTicket" para verificar si el CANAL DONDE SE ENVIA EL MENSAJE es un ticket
*/
function Soporte () {

	let rol_de_Soporte = datos.rol; // Esta es la ID que hemos puesto en el archivo json

	if (message.member.roles.cache.has(rol_de_Soporte) || message.member.hasPermission('ADMINISTRATOR')) return true // Significa que es alguien de soporte
		else return false // Significa que no lo es
}

function esTicket () {
	
	let servidor = datos.servidor; // Este es la ID del servidor

	// Comprobaremos si nuestra base de datos tiene el canal registrado como un ticket, véase el signo de "!" al principio de la condición
	if ( !ticketsComandos.tiene(`${servidor}.${message.channel.id}`) ) return false // No es un ticket
		else return true // Si lo es!
}

// Este es el comando que utilizaremos para responder al usuario!
if (comando === 'responder' || comando === 'reply') { 
	
	/*
		Nota : utilizamos el signo de '!' al principio para referirnos si la función devuelve/retorna un dato false
		
		sería lo mismo si pusieramos
		if ( Soporte() === false ) return message.reply('Solo usuarios de soporte pueden usar este comando!')  .
	*/
	if ( !Soporte() ) return message.reply('Solo usuarios de soporte pueden usar este comando!') // Acá utilizamos la función
	if ( esTicket() === false ) return message.reply('Este comando sólo funciona en canales que son **Tickets**.') // Si no es un ticket

	// Si el código llega hasta aquí significa que lo de arriba está bien, así que ahora definamos cosas importantes en el comando

	
	let mensaje = args.join(' ') // Usamos los argumentos del comando, esto significa que es el contenido del mensaje después del comando
	let obtenerAutor = await ticketsComandos.obtener(`${datos.servidor}.${message.channel.id}.autor`) // Obtenemos la id del autor que establecimos antes
	let autor = message.guild.members.resolve(obtenerAutor) // Buscamos el autor en el servidor

	if (!mensaje) return message.reply('Debes responder con algo') // 'Los graciosos' que utilizen solamente el comando les dirá esto
	if (!autor) return console.log('Autor de ticket no encontrado [REPLY]') // No encontro al usuario, esto puede pasar porque el usuario haya salido del servidor.

	// Acá enviamos la respuesta al usuario
	autor.send(`Respuesta del equipo de soporte \n${mensaje}`).catch(error => {
		if (error.code == 50007) return message.reply('No puedo enviarle mensajes al usuario') // Usamos el código de error 50007 el cual es "no se puede enviar un mensaje al usuario" o (Cannot send message to that user) y lo notificamos al ejecutor del comando, en estos casos sería al usuario de Soporte que lo hizó
			else console.log(error); return message.reply('Un error desconocido a ocurrido, detalles:\n'+error.message) // Si el código de error no es el de que no puede enviarle mensaje al usuario, será cualquier otro, y lo notificamos al ejecutor del comando, en estos casos sería al usuario de Soporte que lo hizó
	}) // Cerramos el .catch

	if (message.attachments.size > 0) { // Si envio algún archivo (generalmente una imágen)
		let attach = message.attachments.first()
		autor.send(attach.url) // Envíamos a el autor la URL del archivo (generalmente una imágen). Acá no nos preocupamos si no puede enviarle mensajes al autor, ya que si antes no pudo, no llegara a esta parte
	}

	message.channel.send('Mensaje envíado corréctamente!') // Acá notificamos de que se envió con éxito
} /*Fin del comando*/

// Este comando lo utilizaremos
if (comando === 'borrar' || comando === 'delete') {

	// Nota : utilizamos el signo de '!' al principio para referirnos si la función devuelve/retorna un dato false
	if ( !Soporte() ) return message.reply('Solo usuarios de soporte pueden usar este comando!') // Acá utilizamos la función
	if ( !esTicket() ) return message.reply('Este comando solo funciona en canales que son **Tickets**.') // Si no es un ticket

	// Si el código llega hasta aquí significa que lo de arriba está bien, así que ahora definamos cosas importantes en el comando

	let obtenerAutor = await ticketsComandos.obtener(`${datos.servidor}.${message.channel.id}.autor`) // Obtenemos la id del autor que establecimos antes
	let autor = message.guild.members.resolve(obtenerAutor) // Buscamos el autor en el servidor

	message.channel.send('El ticket será eliminado dentro de 15 segundos . . .')

	setTimeout(async function() {

		await ticketsMD.eliminar(`${datos.servidor}.${autor.user.id}`) // Aquí eliminamos el autor de la base de datos de mensajes directos
		await ticketsComandos.eliminar(`${datos.servidor}.${message.channel.id}`) // Aquí eliminamos el canal de la base de datos de comandos

		message.channel.delete('Ticket Borrado por '+ message.author.tag) // Acá borramos el canal dentro del servidor

		let msg = `Tu ticket ha sibo borrado, **${autor.user.username}**`
		autor.send(msg).catch() // Solo ponemos .catch, dando igual si l@ notifico o no

	}, ms('15s')) // En 15 segundos se realizará esto

} // Cerramos el comando

}); /*Fin del Evento Message*/

client.login('TOKEN'); /*Acá va el token de su bot ¡¡¡ NO LO MUESTRES A NADIE, ASEGÚRATE DE OCULTARLO BIEN !!!, ejemplo en algún archivo .env , leer el archivo .md*/