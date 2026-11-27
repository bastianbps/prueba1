/* SECAP² Ingeniería · navegación entre áreas, formularios y WhatsApp */
var activePage = "gas";

var areaMeta = {
  gas: {
    label: "Gasfitería",
    hash: "#inicio"
  },
  construccion: {
    label: "Construcción",
    hash: "#construccion"
  },
  electricidad: {
    label: "Electricidad",
    hash: "#electricidad"
  }
};

var pageConfig = {
  gas: {
    sub: "INGENIERÍA",
    title: "SECAP² Ingeniería · Gas, gasfitería y sanitarios en Copiapó",
    alternatives: ["construccion", "electricidad"]
  },
  construccion: {
    sub: "CONSTRUCCIÓN",
    title: "SECAP² Construcción · Obras civiles y remodelaciones en Copiapó",
    alternatives: ["gas", "electricidad"]
  },
  electricidad: {
    sub: "ELECTRICIDAD",
    title: "SECAP² Electricidad · Instalaciones eléctricas y SEC en Copiapó",
    alternatives: ["gas", "construccion"]
  }
};

function showPage(pageKey) {
  if (!pageConfig[pageKey]) return;
  activePage = pageKey;

  document.querySelectorAll(".page-section").forEach(function(sec) {
    sec.classList.toggle("active", sec.id === "page-" + pageKey);
  });

  document.title = pageConfig[pageKey].title;

  // El botón flotante de WhatsApp usa el número de cada área
  var fab = document.querySelector(".fab");
  if (fab) fab.href = "https://wa.me/" + (pageKey === "electricidad" ? PHONE_ELEC : PHONE_DEFAULT) + "?text=Hola%2C%20quiero%20cotizar.";

  var alts = pageConfig[pageKey].alternatives;

  // Actualizar enlaces superiores (escritorio) con las 2 áreas disponibles para cambiar
  var nav1 = document.getElementById("nav-alt-1");
  var nav2 = document.getElementById("nav-alt-2");
  if (nav1 && alts[0]) {
    nav1.textContent = areaMeta[alts[0]].label;
    nav1.href = areaMeta[alts[0]].hash;
    nav1.setAttribute("data-page-link", alts[0]);
  }
  if (nav2 && alts[1]) {
    nav2.textContent = areaMeta[alts[1]].label;
    nav2.href = areaMeta[alts[1]].hash;
    nav2.setAttribute("data-page-link", alts[1]);
  }

  // Actualizar botones móviles (primero el área actual y luego las otras dos)
  var mobOrder = [pageKey, alts[0], alts[1]];
  mobOrder.forEach(function(key, idx) {
    var btn = document.getElementById("mob-slot-" + (idx + 1));
    if (btn && areaMeta[key]) {
      btn.textContent = areaMeta[key].label;
      btn.setAttribute("data-page-link", key);
      btn.classList.toggle("active", key === pageKey);
    }
  });

  // Actualizar enlaces del pie de página con las 2 áreas alternativas
  var foot1 = document.getElementById("footer-alt-1");
  var foot2 = document.getElementById("footer-alt-2");
  if (foot1 && alts[0]) {
    foot1.textContent = areaMeta[alts[0]].label;
    foot1.href = areaMeta[alts[0]].hash;
    foot1.setAttribute("data-page-link", alts[0]);
  }
  if (foot2 && alts[1]) {
    foot2.textContent = areaMeta[alts[1]].label;
    foot2.href = areaMeta[alts[1]].hash;
    foot2.setAttribute("data-page-link", alts[1]);
  }

  try {
    if (location.hash !== areaMeta[pageKey].hash) history.pushState(null, "", areaMeta[pageKey].hash);
  } catch (err) {}
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-page-link]").forEach(function(el) {
  el.addEventListener("click", function(e) {
    e.preventDefault();
    showPage(this.getAttribute("data-page-link"));
  });
});

document.querySelectorAll(".sec-anchor").forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var targetBlock = this.getAttribute("href").replace("#", "");
    var currentContainer = document.getElementById("page-" + activePage);
    var target = currentContainer ? currentContainer.querySelector('[data-block="' + targetBlock + '"]') : null;
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

document.querySelectorAll(".local-scroll").forEach(function(link) {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    var target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

var PHONE_DEFAULT = "56963225763";
var PHONE_ELEC = "56938843355";

function setupWhatsApp(btnId, prefix, areaLabel, phone) {
  var btn = document.getElementById(btnId);
  if (!btn) return;
  btn.addEventListener("click", function() {
    var v = function(id) {
      var el = document.getElementById(id);
      return el ? el.value.trim() : "";
    };
    var nm = document.getElementById(prefix + "n"), dt = document.getElementById(prefix + "m");
    if (nm && dt && !nm.value.trim() && !dt.value.trim()) {
      nm.setAttribute("aria-invalid", "true");
      nm.placeholder = "Escribe tu nombre o cuéntanos qué necesitas";
      nm.focus();
      return;
    }
    if (nm) nm.removeAttribute("aria-invalid");
    var header = areaLabel ? "Hola, quiero cotizar (" + areaLabel + ").\n" : "Hola, quiero cotizar.\n";
    var msg = header + "Servicio: " + v(prefix + "s") + "\nNombre: " + v(prefix + "n") + "\nDetalle: " + v(prefix + "m");
    window.open("https://wa.me/" + (phone || PHONE_DEFAULT) + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
  });
}

setupWhatsApp("send", "", "");
setupWhatsApp("send-const", "c", "Construcción");
setupWhatsApp("send-elec", "e", "Electricidad", PHONE_ELEC);

function pageFromHash() {
  var k = location.hash.replace("#", "");
  if (k === "construccion" || k === "electricidad") return k;
  if (k === "inicio" || k === "gas") return "gas";
  return null;
}
window.addEventListener("hashchange", function() {
  var p = pageFromHash();
  if (p && p !== activePage) showPage(p);
});
(function() {
  var p = pageFromHash();
  if (p && p !== "gas") showPage(p);
})();

/* Visor de fotos: al tocar una foto de "Trabajos" se abre ampliada */
(function() {
  var box = document.getElementById("lightbox");
  if (!box || typeof box.showModal !== "function") return;
  var big = box.querySelector("img"), cap = box.querySelector("p");
  document.querySelectorAll(".work img").forEach(function(img) {
    img.addEventListener("click", function() {
      big.src = img.currentSrc || img.src;
      big.alt = img.alt;
      var fc = img.parentNode.querySelector("figcaption");
      cap.textContent = fc ? fc.textContent : "";
      box.showModal();
    });
  });
  box.addEventListener("click", function(e) {
    if (e.target !== big) box.close();
  });
})();
