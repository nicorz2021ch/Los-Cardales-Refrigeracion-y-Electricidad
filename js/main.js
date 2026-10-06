/* Los Cardales Refrigeración — comportamiento del sitio */
(function () {
  "use strict";

  var WHATSAPP = "5491163824437";

  /* ==========================================================
     Galería de trabajos realizados
     ========================================================== */
  var TRABAJOS = window.TRABAJOS || [];
  var CATEGORIAS = window.CATEGORIAS || [];

  var galeria = document.getElementById("galeria");
  var filtrosBox = document.getElementById("filtros");
  var vacio = document.getElementById("trabajos-vacio");
  var visor = document.getElementById("visor");

  var filtroActual = "todos";
  var visibles = [];
  var indiceActual = -1;

  function nombreCategoria(valor) {
    for (var i = 0; i < CATEGORIAS.length; i++) {
      if (CATEGORIAS[i].value === valor) return CATEGORIAS[i].label;
    }
    return valor;
  }

  function crearTarjeta(trabajo, indice) {
    var boton = document.createElement("button");
    boton.type = "button";
    boton.className = "trabajo";
    boton.addEventListener("click", function () {
      abrirVisor(indice);
    });

    var foto = document.createElement("div");
    foto.className = "trabajo-foto";
    var img = document.createElement("img");
    img.src = "img/trabajos/" + trabajo.archivo;
    img.alt = trabajo.titulo;
    if (trabajo.ancho) img.width = trabajo.ancho;
    if (trabajo.alto) img.height = trabajo.alto;
    img.loading = "lazy";
    img.decoding = "async";
    foto.appendChild(img);

    var info = document.createElement("div");
    info.className = "trabajo-info";

    var etiqueta = document.createElement("span");
    etiqueta.className = "etiqueta";
    etiqueta.textContent = nombreCategoria(trabajo.categoria);

    var titulo = document.createElement("h3");
    titulo.textContent = trabajo.titulo;

    info.appendChild(etiqueta);
    info.appendChild(titulo);

    if (trabajo.lugar) {
      var lugar = document.createElement("p");
      lugar.className = "trabajo-lugar";
      lugar.textContent = trabajo.lugar;
      info.appendChild(lugar);
    }

    boton.appendChild(foto);
    boton.appendChild(info);
    return boton;
  }

  function dibujarGaleria() {
    galeria.textContent = "";
    visibles = TRABAJOS.filter(function (t) {
      return filtroActual === "todos" || t.categoria === filtroActual;
    });
    visibles.forEach(function (trabajo, i) {
      galeria.appendChild(crearTarjeta(trabajo, i));
    });
  }

  function actualizarBotonesFiltro() {
    var botones = filtrosBox.querySelectorAll(".filtro");
    for (var i = 0; i < botones.length; i++) {
      botones[i].setAttribute(
        "aria-pressed",
        botones[i].getAttribute("data-filtro") === filtroActual ? "true" : "false"
      );
    }
  }

  function crearFiltros() {
    var opciones = [{ value: "todos", label: "Todos" }].concat(CATEGORIAS);
    opciones.forEach(function (op) {
      var boton = document.createElement("button");
      boton.type = "button";
      boton.className = "filtro";
      boton.setAttribute("data-filtro", op.value);
      boton.textContent = op.label;
      boton.addEventListener("click", function () {
        filtroActual = op.value;
        actualizarBotonesFiltro();
        dibujarGaleria();
      });
      filtrosBox.appendChild(boton);
    });
    actualizarBotonesFiltro();
  }

  /* ---------- Visor de fotos ---------- */
  function mostrarEnVisor() {
    var trabajo = visibles[indiceActual];
    if (!trabajo) return;
    var img = document.getElementById("visor-img");
    img.src = "img/trabajos/" + trabajo.archivo;
    img.alt = trabajo.titulo;
    document.getElementById("visor-titulo").textContent = trabajo.titulo;

    var partes = [];
    if (trabajo.lugar) partes.push(trabajo.lugar);
    if (trabajo.detalle) partes.push(trabajo.detalle);
    document.getElementById("visor-detalle").textContent = partes.length
      ? partes.join(" · ")
      : indiceActual + 1 + " de " + visibles.length;

    var haySiguiente = visibles.length > 1;
    document.getElementById("visor-ant").hidden = !haySiguiente;
    document.getElementById("visor-sig").hidden = !haySiguiente;
  }

  function abrirVisor(indice) {
    indiceActual = indice;
    mostrarEnVisor();
    if (!visor.open) {
      visor.showModal();
      document.body.classList.add("sin-scroll");
    }
  }

  function moverVisor(delta) {
    if (visibles.length < 2) return;
    indiceActual = (indiceActual + delta + visibles.length) % visibles.length;
    mostrarEnVisor();
  }

  function iniciarGaleria() {
    if (!galeria) return;

    if (TRABAJOS.length === 0) {
      vacio.hidden = false;
      return;
    }

    filtrosBox.hidden = false;
    crearFiltros();
    dibujarGaleria();

    document.getElementById("visor-ant").addEventListener("click", function () {
      moverVisor(-1);
    });
    document.getElementById("visor-sig").addEventListener("click", function () {
      moverVisor(1);
    });
    document.getElementById("visor-cerrar").addEventListener("click", function () {
      visor.close();
    });

    // Clic en el fondo oscuro: cierra
    visor.addEventListener("click", function (e) {
      if (e.target === visor) visor.close();
    });

    visor.addEventListener("close", function () {
      document.body.classList.remove("sin-scroll");
    });

    document.addEventListener("keydown", function (e) {
      if (!visor.open) return;
      if (e.key === "ArrowRight") moverVisor(1);
      if (e.key === "ArrowLeft") moverVisor(-1);
    });
  }

  /* ==========================================================
     Formulario de contacto (abre WhatsApp con el mensaje listo)
     ========================================================== */
  var SERVICIO_LABEL = {
    aire: "Aire acondicionado / Refrigeración",
    electricidad: "Electricidad doméstica",
    ambos: "Aire acondicionado y electricidad"
  };
  var MAX_PROBLEMA = 500;

  function iniciarFormulario() {
    var form = document.getElementById("form-contacto");
    if (!form) return;

    var campoNombre = document.getElementById("contacto-nombre");
    var campoZona = document.getElementById("contacto-zona");
    var campoProblema = document.getElementById("contacto-problema");
    var campoUrgente = document.getElementById("contacto-urgente");
    var contador = document.getElementById("contador-problema");
    var botonesServicio = form.querySelectorAll(".opcion");
    var servicio = "";

    function mostrarError(id, mensaje, campo) {
      var p = document.getElementById(id);
      p.textContent = mensaje;
      p.hidden = !mensaje;
      if (campo) campo.setAttribute("aria-invalid", mensaje ? "true" : "false");
    }

    campoProblema.addEventListener("input", function () {
      contador.textContent = campoProblema.value.length + "/" + MAX_PROBLEMA;
    });

    campoNombre.addEventListener("input", function () {
      mostrarError("err-nombre", "", campoNombre);
    });

    campoProblema.addEventListener("input", function () {
      mostrarError("err-problema", "", campoProblema);
    });

    botonesServicio.forEach(function (boton) {
      boton.addEventListener("click", function () {
        servicio = boton.getAttribute("data-valor");
        botonesServicio.forEach(function (b) {
          b.setAttribute("aria-pressed", b === boton ? "true" : "false");
        });
        mostrarError("err-servicio", "");
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var nombre = campoNombre.value.trim();
      var problema = campoProblema.value.trim();
      var hayErrores = false;

      if (nombre.length < 2) {
        mostrarError("err-nombre", "Contanos tu nombre", campoNombre);
        hayErrores = true;
      }
      if (!servicio) {
        mostrarError("err-servicio", "Elegí el servicio que necesitás");
        hayErrores = true;
      }
      if (problema.length < 10) {
        mostrarError(
          "err-problema",
          "Describí brevemente el problema (mínimo 10 caracteres)",
          campoProblema
        );
        hayErrores = true;
      } else if (problema.length > MAX_PROBLEMA) {
        mostrarError("err-problema", "Máximo " + MAX_PROBLEMA + " caracteres", campoProblema);
        hayErrores = true;
      }
      if (hayErrores) return;

      var mensaje = [
        "Hola! Soy " + nombre + ".",
        "Servicio: " + SERVICIO_LABEL[servicio],
        "Zona: " + campoZona.value,
        "Problema: " + problema,
        campoUrgente.checked ? "Es urgente, necesito atención hoy." : "Puedo coordinar con tiempo."
      ].join("\n");

      window.open(
        "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(mensaje),
        "_blank",
        "noopener,noreferrer"
      );
    });
  }

  iniciarGaleria();
  iniciarFormulario();
})();
