// by Gonzalo Castillo, Gonzalo Vittori

class Receta {
    constructor(id, autor, titulo, tiempo, prepa, like, dislike, img) {
        this.id = id;
        this.autor = autor;
        this.titulo = titulo;
        this.tiempo = tiempo;
        this.prepa = prepa;
        this.like = like;
        this.dislike = dislike;
        this.img = img;
    }
}

//precargar recetas
let recetas = [
    new Receta(0, "chef", "pastel de chocolate", 100, "agregar chocolate y harina en un bol y mezclar", 134, 5, "img/pastel_de_chocolate.jpg"),
    new Receta(1, "chef", "pastel de manzana", 60, "agregar manzana y harina en un bol y mezclar", 3, 0, "img/pastel_de_manzana.jpg"),
    new Receta(2, "gcastillo", "lemon pie", 80, "agregar limon y merengue en un bol y mezclar", 10, 1, "img/lemon_pie.jpg"),
    new Receta(3, "aperez", "torta helada", 90, "agregar helado en polvo en un bol y mezclar", 10, 3, "img/torta_helada.jpg"),
    new Receta(4, "sdiaz", "arroz con leche", 40, "agregar arroz y leche en un bol y mezclar", 20, 5, "img/arroz_con_leche.jpg"),
    new Receta(5, "gvittori", "faina", 20, "agregar queso y faina en polvo en un bol y mezclar", 81, 7, "img/faina.jpg"),
    new Receta(6, "brodriguez", "hamburguesa de salmon", 10, "agregar harina, salmon y panceta en un bol y mezclar", 2, 7, "img/hamburguesa_de_salmon.jpg"),
    new Receta(7, "sdiaz", "hamburguesa con huevo", 20, "agregar pan, carne y huevo en un bol y mezclar", 50, 3, "img/hamburguesa_huevo.jpg"),
    new Receta(8, "aperez", "hamburguesa tofu", 20, "agregar harina, tofu y zanahorias en un bol y mezclar", 162, 8, "img/hamburguesa_tofu.jpg"),
    new Receta(9, "gcastillo", "hamburguesa de calabacin", 10, "agregar harina, calabacin y queso en un bol y mezclar", 2, 11, "img/hamburguesa_de_calabacin.jpg"),
    new Receta(10, "brodriguez", "kebab de yogur", 25, "agregar rapiditas, carne y yogur en un bol y mezclar", 13, 40, "img/kebab_yogur.jpg"),
    new Receta(11, "gcastillo", "mini pizzas salchichon", 30, "agregar harina, salsa de tomate y carne en un bol y mezclar", 55, 9, "img/mini_pizzas_salchichon.jpg"),
    new Receta(12, "aperez", "montadito de boqueron", 15, "agregar pan, carne y jamon en un bol y mezclar", 22, 6, "img/montadito_boqueron.jpg"),
    new Receta(13, "gvittori", "montadito de berenjena y tomate", 10, "agregar berenjena, tomate y muzarella en un bol y mezclar", 0, 0, "img/montaditos_berenjena_tomate.jpg"),
    new Receta(14, "brodriguez", "montadito de queso manchego", 10, "agregar pan, tomate y queso manchego en un bol y mezclar", 137, 25, "img/montadito_queso_manchego.jpg"),
    new Receta(15, "gvittori", "pizza de jamon iberico", 25, "agregar harina, salsa, jamon iberico y muzarella en un bol y mezclar", 77, 4, "img/pizza_de_jamon_iberico.jpg"),
    new Receta(16, "gvittori", "pizza de hongos y cebolla", 30, "agregar harina, hongos y cebolla en un bol y mezclar", 12, 0, "img/pizza_de_hongos_cebolla.jpg"),
    new Receta(17, "aperez", "pizza margarita", 10, "agregar harina, salsa, tomate, muzarella y rucula en un bol y mezclar", 83, 6, "img/pizza_margarita.jpg"),
    new Receta(18, "sdiaz", "scones de queso", 20, "agregar harina y queso en un bol y mezclar", 48, 10, "img/scones_de_queso.jpg"),
    new Receta(19, "chef", "tortitas de carne", 20, "agregar harina, carne y verduras en un bol y mezclar", 150, 26, "img/tortitas_de_carne.jpg"),
    new Receta(20, "chef", "wok de verduras", 25, "agregar cebolla, morron y zanahoria en un bol y mezclar", 205, 21, "img/wok_verduras.jpg")
];


//devuelve arrays de recetas buscando por parametro
function obtenerRecetas(parametro) {
    let recRes = [];                                                    // resultado de recetas
    let usuObj;

    //si el param es un numero, busca por tiempo
    if (!isNaN(parametro)) {
        for (let x = 0; x < recetas.length; x++) {
            usuObj = obtenerUsuario(recetas[x].autor);

            //devuelve recetas solo si los autores estan habilitados
            if (usuObj.habilitado) {
                if (recetas[x].tiempo <= parametro) {

                    recRes.push(recetas[x]);
                }
            }
        }
    } else {
        //si es texto, buscar por titulo o prep o por autor
        for (let x = 0; x < recetas.length; x++) {
            usuObj = obtenerUsuario(recetas[x].autor);

            //devuelve recetas solo si los autores estan habilitados
            if (usuObj.habilitado) {
                //si cincide el parametro con titulo, preparacion
                if (recetas[x].titulo.search(parametro) != -1 || recetas[x].prepa.search(parametro) != -1 || recetas[x].autor.search(parametro) != -1) {
                    recRes.push(recetas[x]);
                }

                //devuelve todas las recetas con un parametro especial
                if (parametro === "TodRec") {
                    recRes.push(recetas[x]);
                }
            }
        }
    }

    return recRes;
}

// devuelve cant de recetas del usuario buscado
function cantDeRecetas(usuario) {
    let cantRec = 0;

    for (let x = 0; x < recetas.length; x++) {
        if (usuario === recetas[x].autor)
            cantRec++;
    }

    return cantRec;
}