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
const params =
  new URL(location.href).
    searchParams;
const id = params.get("id");
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
    busca();
  }
}

/** Busca y muestra los datos que
 * corresponden al id recibido. */
async function busca() {
  try {
    const doc =
      await daoProducto.
        doc(id).
        get();
    if (doc.exists) {
      /**
       * @type {
          import("./tipos.js").
                  Producto} */
      const data = doc.data();
      forma.nombreproducto.value = data.nombreproducto;
      forma.precio.value = data.precio || "";
      forma.cantidad.value = data.cantidad || "";
      forma.marca.value = data.marca || "";
      forma.nommodelo.value = data.nommodelo || "";
      forma.addEventListener(
        "submit", guarda);
      forma.eliminar.
        addEventListener(
          "click", elimina);
    } else {
      throw new Error(
        "No se encontró.");
    }
  } catch (e) {
    muestraError(e);
    muestraProductos();
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
      doc(id).
      set(modelo);
    muestraProductos();
  } catch (e) {
    muestraError(e);
  }
}

async function elimina() {
  try {
    if (confirm("Confirmar la " +
      "eliminación")) {
      await daoProducto.
        doc(id).
        delete();
      muestraProductos();
    }
  } catch (e) {
    muestraError(e);
  }
}
