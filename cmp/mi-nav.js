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
      `<nav class="navbar navbar-expand-lg navbar-white bg-white">
      <a class="navbar-brand" href="index.html">
        &nbsp;<span class="spanExproyActual">Joel Reyes Vicencio</span>
      </a>
        <div id="divMenuColapsable" class="navbar-collapse collapse" style="">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="index.html" target="_top">
                Sesión</a>
            </li>
          </ul></div></nav>`;
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
              `<li class="nav-item">
                <a class="nav-link" href=
                  "chat.html" target="_top">Chat</a>
              </li>`;
          }
          /* Enlaces para solo
           * administradores.
           */
          if (roles.has(
            "Administrador")) {
            html += /* html */
              `<li>
                <a class="nav-link" href=
    "alumnos.html" target="_top">Alumnos</a>
              </li>
              <li>
                <a class="nav-link" href=
          "usuarios.html" target="_top">Usuarios</a>
              </li>`;
          }
          this.ul.innerHTML += html;
        }
      }
    }


customElements.define(
  "mi-nav", MiNav);
