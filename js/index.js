///**** GC
$("#btnBuscarRecetas").click(mostrarBusquedaRecetas);
$("#btnIngresarReceta").click(ingresarReceta);

//****** GV
$("#btnRegColab").click(registrarColaborador);
$("#btnRepBuscar").click(actualizarTablaReportes);
$("#btnLogin").click(iniciarSesion);                                //click del Iniciar sesion

$("#cabLogin").click(mostrarSeccion);                               //click de boton/menu de Ingresar
$("#cabLogout").click(cerrarSesion);

$(".auxAdmin").click(mostrarSeccion);                                //click de menu de colabs
$(".auxColab").click(mostrarSeccion);                              //click de menu de recetas
$(".auxReceta").click(mostrarSeccion);


//INICIALIZAR
$(".seccion").hide();                                                //oculta la clase seccion y menu para admin y colabs
$(".auxAdmin").hide()                                                //
$(".auxColab").hide();
$(".msgVerde").hide();

$("#divVerRec").show();                                               //muestra recetas
mostrarVerRecetas(recetas, "pMostrarRecetas");                        //muestra recetas al cargar

//***  GV
function registrarColaborador() {
    let nom = $("#txtRegColabNom").val();
    let ape = $("#txtRegColabApe").val();
    nom = nom.toLowerCase();
    ape = ape.toLowerCase();
    let usuNuevo = nom.charAt(0) + ape;
    let passNuevo = nom.charAt(0) + "-" + ape;

    //agrega colab si los campos no estan vacios
    if (nom != "" && ape != "") {
        //si no existe un usuario con ese nombre, lo agrega, 
        if (obtenerUsuario(usuNuevo) == -1) {
            agregarUsuario(usuNuevo, passNuevo, 1, true);

            alert(`Colaborador "${usuNuevo}" registrado correctamente!`);
        } else {
            //mientras encuentre usuarios con ese nombre, probar nombre + x
            for (let x = 1; obtenerUsuario(usuNuevo) != -1; x++) {
                usuNuevo = nom.charAt(0) + ape + Number(x);
                passNuevo = nom.charAt(0) + "-" + ape + Number(x);;
            }

            agregarUsuario(usuNuevo, passNuevo, 1, true);
            alert(`Colaborador "${usuNuevo}" registrado correctamente!`);
        }

        //vacia campos
        $("#txtRegColabNom").val("");
        $("#txtRegColabApe").val("");

    } else {
        alert("Por favor ingrese nombre y apellido.");
    }
}

function botonHabilitarColaborador(obj) {
    colabId = obj.id.charAt(11);

    usuarios[colabId].habilitado = !usuarios[colabId].habilitado;

    actualizarTablaColaboradores();
}

function actualizarTablaReportes() {
    let tiempo = Number($("#txtRepTiempo").val());
    let rend;
    let recetasRep = obtenerRecetas(tiempo).slice();    //asigna las recetas de la busqueda a recetasRep

    //si se ingreso un valor que sea numero
    if (tiempo != "" && !isNaN(tiempo)) {
        if (typeof recetasRep[0] === "undefined") {
            $("#pObtReps").show();
            $("#tblReportes").hide();
        } else {

            //oculta el mensaje de no hay resultados y muestra la tabla y la limpia
            $("#pObtReps").hide();
            $("#tblReportes").empty();
            $("#tblReportes").show();

            //poner headers de tabla
            $("#tblReportes").append(`   <th></th>
                                <th>Titulo</th>
                                <th>Usuario</th>
                                <th>Tiempo</th>
                                <th>Rendimiento</th> `);

            //llena tabla
            for (let x = 0; x < recetasRep.length; x++) {
                rend = (recetasRep[x].like * 100) / (recetasRep[x].like + recetasRep[x].dislike);
                rend = rend.toFixed(2);

                if (isNaN(rend))    //igualar rendimiento a 0 si no es un numero (ej divisiones entre 0)
                    rend = 0;

                $("#tblReportes").append(`<tr>
                                            <td> <img src="${recetasRep[x].img}" width="100" height="100"> </td>
                                            <td> ${recetasRep[x].titulo} </td>
                                            <td> ${recetasRep[x].autor} </td>
                                            <td> ${recetasRep[x].tiempo} </td>
                                            <td> ${rend} % </td>
                                         </tr> `);

            }
        }
    } else {
        alert("Por favor ingrese tiempo (en minutos)")
    }
}

function actualizarTablaColaboradores() {
    let cantRec;
    let strHab = ["Deshabilitado", "Habilitado"];               //
    let valHab;                                                 // string para pasarle al boton de habilitar/deshabilitar

    //muestra y limpiar tabla
    $("#tblGestColab").empty();

    //poner headers de tabla
    $("#tblGestColab").append(` <th>Usuario</th>
                                <th>Cantidad de recetas</th>
                                <th>Estado</th>
    `);

    //rellenar lista con todos los colabs
    for (let x = 0; x < usuarios.length; x++) {
        //si encuentra un colab
        if (usuarios[x].tipo == 1) {
            cantRec = cantDeRecetas(usuarios[x].nombre);          //toma cant de rec del usuario x
            valHab = strHab[Number(usuarios[x].habilitado)];       //traduce el true/false al string para el boton de hab

            $("#tblGestColab").append(` 
                <tr>
                <td> ${usuarios[x].nombre} </td>
                <td> ${cantRec} </td>
                <td> <input type="button" id="btnHabColab${x}" value="${valHab}" title="Clic para cambiar" onclick=botonHabilitarColaborador(this)> </td>  
                </tr>
        `);
        }
    }
}

function mostrarSeccion() {
    //oculta la clase seccion (las divs dentro de contenido)
    $(".seccion").hide();

    //this.id es el id del tag clickeado
    nuevoId = this.id.substring(3);             //saca "aux" del tag clickeado
    nuevoId = "div" + nuevoId;                  //agrega div al tag

    $(`#${nuevoId}`).show();                    //muestra el div correspondiente

    switch (this.id) {
        case "auxGestColab":
            actualizarTablaColaboradores();        //actualizar tabla de gest colabs si se hizo clic en gest colabs
            break;

        case "auxVerRec":
            mostrarVerRecetas();                      //actualizar ver recetas si hace clic en el menu
            break;

        case "auxBusRec":
            $("#txtTextoRecetas").val("");          //vaciar campo de texto de busqueda de receta                 
            break;

        default:
            break;
    }

}

function iniciarSesion() {
    let usuario = $("#txtLoginUsuario").val();
    let password = $("#txtLoginPassword").val();


    if (usuario != "" && password != "") {              //si datos estan llenos
        if (obtenerUsuario(usuario) != -1) {                 //si lo encuentra
            if (obtenerUsuario(usuario).habilitado) {             //si esta habilitado
                if (password === obtenerUsuario(usuario).password) {
                    // asigna al usuario actual como usuario ingresado
                    usuarioActual = obtenerUsuario(usuario);

                    //agrega a cerrar sesion el nombre del usuario actual
                    $("#cabLogout").html(`Cerrar sesion (${usuarioActual.nombre})`);

                    //muestra el boton de logout y oculta el login y el div de login
                    $("#cabLogout").show();
                    $("#cabLogin").hide();
                    $("#divLogin").hide();

                    //oculta menu de admin y colab y muestra botones segun el usuario que ingrese   
                    $(".auxAdmin").hide()
                    $(".auxColab").hide();

                    if (usuarioActual.tipo == 2)                           //si es admin
                    {
                        $(".auxAdmin").show();
                        $(".auxColab").show();
                    }

                    else if (usuarioActual.tipo == 1) {                    //si es colab
                        $(".auxColab").show();
                    }

                    //vacia campos de login
                    $("#txtLoginUsuario").val("");
                    $("#txtLoginPassword").val("");

                    //muestra recetas
                    $("#divVerRec").show();
                    mostrarVerRecetas(recetas, "pMostrarRecetas");                        //muestra recetas al cargar

                } else {
                    alert("Usuario o contraseña incorrecto");
                }
            } else {
                alert("Usuario no habilitado. Contacte al administrador.")
            }
        } else {
            alert("Usuario o contraseña incorrecto");
        }
    } else
        alert("Por favor ingrese nombre y contraseña");
}

function cerrarSesion() {
    usuarioActual = "";                     //vaciar usuario actual (el "usuario" comun)

    //oculta y muestra opciones de login y del menu
    $("#cabLogout").hide();
    $("#cabLogin").show();
    $(".auxAdmin").hide();
    $(".auxColab").hide();

    //ocuta las secciones y solo muestra el de ver recetas
    $(".seccion").hide();
    $("#divVerRec").show();

    $("#pMostrarRecetas").empty();

    //obtener todas las recetas 
    let Resultado = obtenerRecetas("TodRec").slice();
    mostrarRecetas(Resultado, "pMostrarRecetas");
}

// *** GC
function ingresarReceta() {
    let idN = Number(recetas[recetas.length - 1].id) + 1;
    if (idN == undefined) {
        idN = 0;
    }
    let autorN = usuarioActual.nombre;
    let tituloN = $("#txtTituloReceta").val();
    let tiempoN = Number($("#txtTiempoP").val());
    let prepaN = $("#txtPasos").val();
    let fotoN = $("#fileIngRec").val();
    let nombreFotoN = fotoN.substr(fotoN.lastIndexOf("\\") + 1);
    let existe = false;

    for (let x = 0; x < recetas.length; x++) {
        if (recetas[x].titulo.toLowerCase() === tituloN.toLowerCase()) {    //verifica que una receta nueva no tenga el mismo nombre que una ya registrada
            existe = true;
            break;
        }
    }

    if (tituloN !== "" && tiempoN > 0 && prepaN !== "") {       //verificar campos de texto 
        if (!existe) {
            if (nombreFotoN == "") {                              //agrega foto generica al ingresar receta sin foto
                nombreFotoN = "no_foto.jpg";
            }

            //agrega receta solo si preparacion tiene 150 caracteres o menos
            if (prepaN.length < 150) {
                let nuevaReceta = new Receta(idN, autorN, tituloN, tiempoN, prepaN, 0, 0, "img/" + nombreFotoN);
                recetas.push(nuevaReceta);

                alert(`Receta "${tituloN}" ingresada correctamente!`);

                //vacia campos despues de ingresar receta nueva
                $("#txtTituloReceta").val("");
                $("#txtTiempoP").val("");
                $("#txtPasos").val("");
                $("#fileIngRec").val("");
            } else {
                alert("Por favor ingrese elaboracion de 150 caracteres o menos")
            }

        } else {
            alert("ya existe esa receta");
        }
    } else {
        alert("por favor ingrese datos");
    }

}

function mostrarRecetas(arrayRec, idParagraph) {

    //si el primer elemento esta vacio, el array lo esta y muestra mensaje
    if (typeof arrayRec[0] === "undefined") {
        $(`#${idParagraph}`).append("No hay resultados");
    }

    for (let h = 0; h < arrayRec.length; h++) {
        $(`#${idParagraph}`).append(`
                    <h2>${arrayRec[h].titulo}</h2>
                    <h4>${arrayRec[h].autor}</h4>
                    <img src="${arrayRec[h].img}" width="560" height="450" alt="${arrayRec[h].titulo}">
                    <p class="duracion"><strong>${arrayRec[h].tiempo}</strong> minutos</p>
                    <p> ${arrayRec[h].prepa} </p> 
                    <p  id="pLikes${h}" class="likes">
                        ${arrayRec[h].like}
                        <img id="imgMg${h}" src="img/like.png" onClick="aumContadorSg(this)">
                        |
                        <img id="imgNmg${h}" src="img/dislike.png" onClick="aumContadorNg(this)">
                        ${arrayRec[h].dislike}
                    </p>
                    <hr>
            `);
    }

}

function mostrarBusquedaRecetas() {
    $("#pBusRec").empty();
    let textoB = $("#txtTextoRecetas").val();
    textoB = textoB.toLowerCase();

    //obtener recetas solo de la busqueda
    if (textoB != "") {
        let Resultado = obtenerRecetas(textoB).slice();

        mostrarRecetas(Resultado, "pBusRec");
    } else {
        alert("Por favor ingrese titulo, preparacion o tiempo");
    }
}

function mostrarVerRecetas() {
    $("#pMostrarRecetas").empty();

    //obtener todas las recetas 
    let misRecetas = obtenerRecetas("TodRec").slice();

    mostrarRecetas(misRecetas, "pMostrarRecetas");
}

function aumContadorSg(obj) {
    let id = obj.id;
    let recId = id.substr(5);               //toma el # de id del like clikeado para usarlo con las recetas
    let misRecetas;

    //si el div que contiene al megusta clickeado es el de busqueda recetas...
    if ($(`#${id}`).parent().parent().parent().attr('id') == "divBusRec") {
        let textoB = $("#txtTextoRecetas").val();
        textoB = textoB.toLowerCase();

        misRecetas = obtenerRecetas(textoB).slice();        //array solo con la busqueda
        misRecetas[recId].like++;
    } else {

        misRecetas = obtenerRecetas("TodRec").slice();      //array con todas las recetas hab (ver recetas)
        misRecetas[recId].like++;
    }

    //agrega cant de likes.dislikes e imagenes
    $(`#pLikes${recId}`).html(`
                                ${misRecetas[recId].like}
                                <img id="imgMg${recId}" src="img/like.png" onClick="aumContadorSg(this)">
                                |
                                <img id="imgNmg${recId}" src="img/dislike.png" onClick="aumContadorNg(this)">
                                ${misRecetas[recId].dislike}
    `);

    //detiene el click de nuevos megusta/nomegusta;
    $(`#imgMg${recId}`).prop("onclick", false);
    $(`#imgNmg${recId}`).prop("onclick", false);
}

function aumContadorNg(obj) {
    let id = obj.id;
    let recId = id.substr(6);               //toma el # de id del like clikeado para usarlo con las recetas
    let misRecetas;

    //si esta el busqueda abierto, obtiene recetas solo con la busqueda

    if ($(`#${id}`).parent().parent().parent().attr('id') == "divBusRec") {
        let textoB = $("#txtTextoRecetas").val();
        textoB = textoB.toLowerCase();

        misRecetas = obtenerRecetas(textoB).slice();
        misRecetas[recId].dislike++;
    } else {

        misRecetas = obtenerRecetas("TodRec").slice();
        misRecetas[recId].dislike++;
    }

    //agrega cant de likes.dislikes e imagenes
    $(`#pLikes${recId}`).html(`
                                ${misRecetas[recId].like}
                                <img id="imgMg${recId}" src="img/like.png" onClick="aumContadorSg(this)">
                                |
                                <img id="imgNmg${recId}" src="img/dislike.png" onClick="aumContadorNg(this)">
                                ${misRecetas[recId].dislike}
    `);

    //detiene el click de nuevos megusta/nomegusta;
    $(`#imgMg${recId}`).prop("onclick", false);
    $(`#imgNmg${recId}`).prop("onclick", false);
}

