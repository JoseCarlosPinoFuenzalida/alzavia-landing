// Alzavía — landing page interactions
// Sin dependencias externas ni framework: vanilla JS.

(function () {
  "use strict";

  // ---------- Año dinámico en el footer ----------
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---------- Menú móvil ----------
  var navToggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Scroll reveal (fade-in + translateY, discreto) ----------
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: sin IntersectionObserver, mostrar todo de inmediato.
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // ---------- Formulario de cotización (Formspree via fetch) ----------
  var form = document.getElementById("quoteForm");
  var status = document.getElementById("formStatus");

  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      if (form.action.indexOf("YOUR_FORM_ID") !== -1) {
        status.textContent =
          "El formulario aún no está conectado a Formspree. Reemplaza YOUR_FORM_ID en index.html por tu endpoint real.";
        status.className = "form-status error";
        return;
      }

      var submitBtn = form.querySelector("button[type=submit]");
      var originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      status.textContent = "";
      status.className = "form-status";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            status.textContent =
              "¡Listo! Recibimos tu solicitud y te contactaremos dentro de 1–2 días hábiles.";
            status.className = "form-status success";
          } else {
            return response.json().then(function (data) {
              var message =
                data && data.errors && data.errors.length
                  ? data.errors.map(function (e) { return e.message; }).join(", ")
                  : "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos directo por correo.";
              throw new Error(message);
            });
          }
        })
        .catch(function (err) {
          status.textContent =
            err.message ||
            "No pudimos enviar tu solicitud. Intenta nuevamente o escríbenos directo por correo.";
          status.className = "form-status error";
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        });
    });
  }
})();
