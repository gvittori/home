// by Gonzalo Vittori

class Usuario {
    constructor(usuario, password, tipo, habilitado) {
        this.nombre = usuario;
        this.password = password;
        this.tipo = tipo;                                                                     // 1=colab, 2=admin
        this.habilitado = habilitado;
    }
}

let usuarioActual = "";                                                                       //usuario firmado (ninguno por defecto)
let usuarios = [];

//precargar usuarios
agregarUsuario("chef", "chef-01", 2, true);
agregarUsuario("gvittori", "g-vittori", 1, true);
agregarUsuario("gcastillo", "g-castillo", 1, true);
agregarUsuario("sdiaz", "s-diaz", 1, true);
agregarUsuario("aperez", "a-perez", 1, false);
agregarUsuario("brodriguez", "b-rodriguez", 1, false);

function agregarUsuario(nom, pass, tipo, hab) {

    let usuario = new Usuario(nom, pass, tipo, hab);
    usuarios.push(usuario);
}

//busca un usuario y lo habilita
function habilitarUsuario(usuario) {
    let encontrado = false;
    let x = 0;

    while (x < usuarios.length && encontrado == false) {

        if (usuario === usuarios[x].nombre) {
            usuarios[x].habilitado = true;
            encontrado = true;
        }
        x++;
    }
}

//busca un usuario y lo deshabilita
function deshabilitarUsuario(usuario) {
    let encontrado = false;
    let x = 0;

    while (x < usuarios.length && encontrado == false) {

        if (usuario === usuarios[x].nombre) {
            usuarios[x].habilitado = false;
            encontrado = true;
        }
        x++;
    }
}

//devuelve un obj colaborador por nombre de usuario o -1 si no lo encuetra
function obtenerUsuario(nombre) {
    for (let x = 0; x < usuarios.length; x++) {
        if (nombre === usuarios[x].nombre) {
            return usuarios[x];         
        } 
    }
    
    return -1;
}
