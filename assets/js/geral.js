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
