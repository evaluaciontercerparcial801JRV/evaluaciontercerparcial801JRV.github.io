import {
  getAuth,
  getFirestore
} from "../lib/fabrica.js";
import {
  getString,
  muestraError
} from "../lib/util.js";
import {
  muestraProductos
} from "./navegacion.js";
import {
  tieneRol
} from "./seguridad.js";

const daoProducto =
  getFirestore().
    collection("Producto");
/** @type {HTMLFormElement} */
const forma = document["forma"];
getAuth().onAuthStateChanged(
  protege, muestraError);

/** @param {import(
    "../lib/tiposFire.js").User}
    usuario */
async function protege(usuario) {
  if (tieneRol(usuario,
    ["Administrador"])) {
    forma.addEventListener(
      "submit", guarda);
  }
}

/** @param {Event} evt */
async function guarda(evt) {
  try {
    evt.preventDefault();
    const formData =
      new FormData(forma);
    const nombreproducto = getString(
        formData, "nombreproducto").trim();  
    const precio = getString(formData, "precio").trim();
    const cantidad = getString(formData, "cantidad").trim();
    const marca = getString(formData, "marca").trim();
    const nommodelo = getString(formData, "nommodelo").trim();
    /**
     * @type {
        import("./tipos.js").
                Producto} */
    const modelo = {
      nombreproducto,
      precio,
      cantidad,
      marca,
      nommodelo 
    };
    await daoProducto.
      add(modelo);
    muestraProductos();
  } catch (e) {
    muestraError(e);
  }
}
