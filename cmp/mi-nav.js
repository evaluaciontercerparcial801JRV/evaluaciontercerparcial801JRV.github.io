// @ts-nocheck
import {
  cargaRoles
} from "../js/seguridad.js";
import {
  getAuth
} from "../lib/fabrica.js";
import {
  muestraError
} from "../lib/util.js";

class MiNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<header id="header">
          <div class="container-fluid">
            <nav id="nav-menu-container">
              <ul class="nav-menu">
                <li class="menu-active"><a href="index.html">Sesión</a></li>
              </ul>
            </nav>
          </div>
        </header>`;
    this.ul =
      this.querySelector("ul");
    getAuth().onAuthStateChanged(
      usuario => this.
        cambiaUsuario(usuario),
      muestraError);
  }

  /**
   * @param {import(
      "../lib/tiposFire.js").User}
      usu */
      async cambiaUsuario(usu) {
        if (usu && usu.email) {
          let html = "";
          const roles =
            await cargaRoles(
              usu.email);
          /* Enlaces para solo
           * para clientes. */
          if (roles.has("Cliente")) {
            html += /* html */
              `<li class="menu-active">
                <a href="mensajes.html">Mensajes</a>
               </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li class="menu-active">
                <a href="productos.html">Productos</a>
              </li>
              <li class="menu-active">
                <a href="usuarios.html">Usuarios de la Aplicación</a>
              </li>`;
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define(
  "mi-nav", MiNav);
