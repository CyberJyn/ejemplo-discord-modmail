# LO PRIMERO A ENTENDER Y COMPRENDER
[-] Este código es solo un **EJEMPLO** acerca de como se ESTRUCTURA un código de BOT ModMail PARA DISCORD, no esperes encontrar aquí una mina de oro en código. En donde se encuentra el código de ejemplo del bot y se realiza todo es en el archivo "index.js" es solo un EJEMPLO (Vuelvo y repito), una vez que hayas entendido como se estructura el código y de su funcionamiento, podrás hacer otros comandos (como por ejemplo close, open, block, unblock etc...) a tu gusto en el código de tu propio bot e inclusive crear otras funciones para poder tener en su propio bot en base a la estrúctura que le doy, porfavor lea "LICENSIA". El bot evidentemente NO estará encendido 24/7 si no lo pones en algún host. Por endé ya será tu problema en que host lo pongas si lo pondras en alguno. Durante el código podrás encontrar comentarios los cuales te explicarán un poco para ayudarte a entender el código. Te recomiendo que ya tengas una experiencia en javascript y discord.js para poder enténderlo todo completamente. Porcierto, yo uso la **terminología** :

retorna y devuelve : Con estas dos me refiero a lo mismo, lo que devuelve/retorna algún valor/función, así que no te confundas

# CONOCIMIENTOS BÁSICOS Y SENTIDO COMÚN
[-] Acá te paso a explicar lo que deberías de saber para poder comprénder el código, no me mal entiendas, tampoco digo que seas un maestro/a en el código, un master, sino que tengas una persepción mínima de código, una experiencia, y si eres un/a programad@r de termino intermedio/profesional y te interesa ver/aprénder lo que te enseño acá, pues no creo que tengas demasiado problema. Pero si por ejemplo, eres alguien que solo quiere ver esto, y no tienes alguna experiencia o una experiencia relativamente poca o demasiado básica sobre la programación, en este caso del lenguaje javascript (js), json (JSON), ya te voy diciendo que lo más probable es que no entiendas nada, pero no te preocupes, explico lo mejor que puedo cada paso que doy, porque hago cada cosa, si quieres inténtar ver el código, comprénderlo con mis explicaciones, eres libre de hacerlo, y si lo consigues, felicidades.

[-] Bajo mis criterios, deberías de saber al menos a terminos medios lo siguiente para poder comprénder :

- Variables
- Condicionales (Muy importante, ya que el código se basa en esto)
- Funciones
- Uso del "require", esto que utilizamos para solicitar acceso a alguna carpeta/archivo
- Discord.js, los métodos que tiene por ejemplo, buscar canales, roles, miembros, comprobar permisos de un miembro, etc. . .


# ADEMÁS DE . . .
[-] --> El bot **TIENE FUNCIONAMIENTO EN UN SOLO SERVIDOR** <--. Repito que te aconsejo que tengas experiencia en discord.js y javascript, variables, funciones, condicionales sobre todo, etc . . . Para poder comprenderlo todo, ok. Tendrás que rellenar los datos necesarios en el archivo json llamado "datos" que está ubicado dentro de la carpeta "utilidad" (Abajo te explico cada uno y que pondrás). Una vez que tengas al bot en tu servidor, otorgale permisos de administrador para evitar cualquier problema de que necesite algún permiso. He probado todo el código en su gran parte, no he encontrado ningún error, pero si lo encuentras tu ya tendrás que ver como corregirlo, Sigue abajito:

/////////

Y por último, poner el token del bot en la útima línea de código 'client.login('token')', es muy importante que NO muestres ese token a nadie, es totalmente privado, y si lo pones en algún host, ¡asegúrate de ocultarlo!. Puede ser en un archivo .env, de la siguiente forma, para esto se requiriría algún npm, como "dotenv", pero esto ya es otra cosa. Acá un ejemplo de como sería :

```js
// En .env
TOKEN=TOKENSECRETO
```

```js
// En index.js
client.login(process.env.TOKEN)
```


[ADVERTENCIA]: AUNQUE EL SOFTWARE (CÓDIGO) DEL MISMO BOT **NO** ES MALICIOSO/DAÑINO PARA NINGÚN SERVIDOR/PERSONA, YO NO ME HAGO RESPONSABLE POR CUALQUIER TIPO DE DAÑO QUE HAGA EL BOT DEBIDO A QUE SE HAYA DESCUBIERTO EL TOKEN DEL BOT U OTROS MOTIVOS. YO SOLO LE DOY LA BASE DE UNA FUNCIONALIDAD PARA UN BOT DE DISCORD, **USTED** ES ÉL/LA RESPONSABLE SOBRE EL CUIDADO DEL MISMO, Y DE SU TOKEN/ACCIONES/PERMISOS Y/O QUIENES MANEJAN AL BOT.

//////////

**servidor** : Acá pondras la ID del servidor donde será utilizado el bot (Es muy importante). ¿Por qué? acá es donde entra la razón por la cual es solo utilizado en un servidor, puesto que no puedes obtener la ID de algún servidor en específico a la hora de enviarle un mensaje a un bot (Al menos yo no conózco la forma).

**rol** : Aquí pones la ID del rol de SOPORTE, el cual será el encargado de recibir tickets, de darles su respuesta y eliminarlos (El propietario del servidor y los usuarios con permiso de "ADMINISTRADOR" siempre serán considerados personas de SOPORTE sin necesidad de tener el rol establecido acá).

**categoria** : Aquí pones la ID de la CATEGORÍA donde se crearán (Moverán) los canales (tickets), esto para tenerlo todos los canales ordenados en un lugar.

[-] NOTA : Si eliminas el rol o la categoria, ya no serán válidos y lo más propable es que el bot presente errores, así que si los eliminas y sigues usando el bot, asegúrate de cambiar las **ID** en el archivo json.

# DEPENDENCIAS NECESARIAS
[-] Valga la rebundancia, y evidentemente, utilizamos discord.js (v12) para hacer funcionar el bot, he decidido usar una base de datos sumaménte simple para que el bot use, ya que solamente está planteado para usarse en un solo servidor, su facilidad de manejarla y además de que esta en español (Para facilitar la lectura de ustedes), LA BASE QUE USO ES "megadb", para facilitarme unos cuantos segundos de mi vida también utilizo una dependecia para algunos tiempos e intervalos (Por no decir uno solo) la cual es "ms" . Utilizo ms solo en pocas secciones, ya si usted no quiere utilizar este npm, solo cambie los tiempos a milisegundos, eso ya es cosa de usted.

[-] **Resumiendo** la lista de dependencias necesarias :
1. discord.js ( npm install discord.js --save ) (Nota Adicional : La versión utilizada es la versión 12 (v12)).
2. megadb ( npm install megadb --save ) (Nota Adicional : Te recomiendo que apréndas a usar megadb : https://www.npmjs.com/package/megadb).
3. ms ( npm install ms --save ).


# ÚTILES 


[-] LINKS ÚTILES:

[-] https://discord.js.org/#/docs/main/master/general/welcome (Documentación de Discord.js).
[-] https://portalmybot.com/guia/mybot/uso-argumentos (Los argumentos de un mensaje).
[-] https://www.npmjs.com/package/megadb (Documentación de MEGADB).
[-] http://npmjs.com/ (Página de npm).
[-] https://discord.com/terms (ToS de Discord, términos de condiciones de uso).
[-] https://discord.com/new/guidelines (Directivas de comunidad de Discord).


[-] TIPOS DE NUMERADORES EN JAVASCRIPT :
```js
> // Mayor que
< // Menor que
= // Definido como
>= // Mayor o igual que
<= // Menor o igual que
== // Igual que
=== // Mismo tipo de dato e igual que
!= // Distinto que 
!== // Distinto y distinto tipo de dato que
```

# BUGS O ERRORES 
[-] Como he recalcado antes, el código "aparentemente" gran parte **NO** posee ningún error, pero SEA el caso de que de la casualidad de que usted encuentre algún error, podrá crear un nuevo hilo en la sección "Issues" para yo poder corregirlo en el código original y evitar posibles molestías a otras personas. Claro, esto que digo no lo digo por los errores que tenga usted, si no errores DEL CÓDIGO ORIGINAL, y **SIN** modificaciones de NINGÚN tipo.

# CONDICIONES DE USO
[-] Lea "LICENSIA". Acá aclaro unas cuantas cosas : Usted solo podrá modificar el código cuando lo tenga en su propio bot, el servidor donde lo use deberá de cumplir los términos y condiciones de uso de Discord y sus directivas de comunidad. Aunque yo no pueda comprobar esto, tengo espereranza que por respecto usted los cumpla.

# DIFERENCIAS ENTRE MIEMBRO Y USUARIO DENTRO DE DISCORD
[-] Bueno, como seguramente ya habrás visto, en el código utilizo algo así
```js
message.member.user.username
// ó
autor.user.username
// ó
let X = 'ID CUALQUIERA'
message.guild.members.cache.find(u => u.user.id == X)
```
Lo hago debido a que, un MIEMBRO (member o members) de UN SERVIDOR no es lo mismo a un USUARIO (author, message.author) DE DISCORD. Véamos ¿por qué? :

[MIEMBRO] Un miembro tiene : ROLES, PERMISOS DENTRO DE UN SERVIDOR, en este caso lo único que utilizamos de un miembro es roles y sus permisos, estos no tienen ni id, ni avatar, ni nombre por si solos, ¿A qué me refiero con "por si solos"?, con que necesitan UNA PROPIEDAD llamada ".user" para poder acceder a algunos de sus datos, que un (author) si tiene. Ejemplo :

```js

let miembro = message.member;

miembro.avatarURL() // Cannot read property 'AvatarURL()' of undefined
miembro.username // Canot read property 'username' of undefined


// Pero si utilizamos
miembro.user.id // Devuelve su ID
miembro.user.username // Devuelve su nombre
miembro.user.avatarURL() // Devuelve su avatar
```

[USUARIO] Un usuario tiene : Avatar, nombre, id, por si solos, pero no tienen ni roles ni permisos dentro de un servidor, y no hay ninguna propiedad para acceder al mismo, Ejempl : 

```js

let usuario = message.author

usuario.avatarURL() // Devuelve su Avatar
usuario.id // Devuelve su ID
usuario.username // Devuelve su nombre

// pero si utilizamos esto
usuario.roles.cache.has('ID DE EJEMPLO DE UN ROL') // Canot read property 'roles' of undefined
usuario.hasPermission('PERMISO') // Canot read property 'hasPermission' of undefined
```

Aclaro esto por si te has confundido en alguna parte donde yo utilize esta propiedad. Podría simplemente ahorrarme esta explicación porque seguramente no te importe xD, pero lo hago para que puedas aprénder, no solo copiar y pegar el código