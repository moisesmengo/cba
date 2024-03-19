document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");

  btn.addEventListener("click", () => {
    menu.classList.add("ativo");
  });
  close.addEventListener("click", () => {
    menu.classList.remove("ativo");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".areta-total");
  const menuList = document.querySelector(".notificacoes-menu");

  const eventos = ["click"];

  function openMenu(e) {
    menuList.classList.add("active");
    menuButton.classList.add("active");

    outsideClick(menuList, eventos, () => {
      menuList.classList.remove("active");
      menuButton.classList.remove("active");
    });
  }
  eventos.forEach((userEvent) => {
    menuButton.addEventListener(userEvent, openMenu);
  });
});

function outsideClick(element, events, callback) {
  const html = document.documentElement;
  const outside = "data-outside";

  if (!element.hasAttribute(outside)) {
    events.forEach((userEvent) => {
      setTimeout(() => {
        html.addEventListener(userEvent, handleOutsideClick);
      });
    });
    element.setAttribute(outside, "");
  }

  function handleOutsideClick(event) {
    if (!element.contains(event.target)) {
      element.removeAttribute(outside);
      events.forEach((userEvent) => {
        html.removeEventListener(userEvent, handleOutsideClick);
      });
      callback();
    }
  }
}
