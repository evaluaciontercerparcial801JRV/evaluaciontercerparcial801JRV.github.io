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
            <div id="logo" class="pull-left">
              <h1 class="scrollto">Joel Reyes Vicencio</a></h1>
            </div>
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
                <a href="chat.html">Chat</a>
               </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li class="menu-active">
                <a href="alumnos.html">Alumnos</a>
              </li>
              <li class="menu-active">
                <a href="usuarios.html">Usuarios</a>
              </li>`;
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define(
  "mi-nav", MiNav);
