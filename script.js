// ===== Seleção dos elementos (cada botão tem seu próprio seletor) =====
const modal = document.querySelector("#modal-ajuda");
const conteudoModal = document.querySelector("#modal-ajuda .modal-conteudo");
const botaoAbrir = document.querySelector("#botao-abrir-ajuda");
const botaoFechar = document.querySelector("#botao-fechar-ajuda");
const botaoEntendi = document.querySelector("#botao-entendi");

// Guarda quem tinha o foco antes de abrir, para devolver depois
let elementoAnterior = null;

// Elementos que podem receber foco dentro do modal (para prender o foco)
function elementosFocaveis() {
  return conteudoModal.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex='-1'])");
}

// ===== Abre o modal =====
function abreModal() {
  elementoAnterior = document.activeElement;
  modal.style.display = "block";
  document.body.classList.add("modal-aberto");   // bloqueia a rolagem do fundo
  botaoAbrir.setAttribute("aria-expanded", "true");
  conteudoModal.focus();                          // leva o foco para o modal
}

// ===== Fecha o modal =====
function fechaModal() {
  modal.style.display = "none";
  document.body.classList.remove("modal-aberto");
  botaoAbrir.setAttribute("aria-expanded", "false");
  if (elementoAnterior) elementoAnterior.focus(); // devolve o foco
}

// Verifica se o modal está aberto
function modalAberto() {
  return modal.style.display === "block";
}

// ===== Eventos de clique =====
botaoAbrir.addEventListener("click", abreModal);
botaoFechar.addEventListener("click", fechaModal);
botaoEntendi.addEventListener("click", fechaModal);

// Fecha ao clicar fora do conteúdo (apenas no fundo escurecido)
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) fechaModal();
});

// ===== Teclado: Escape fecha; Tab fica preso dentro do modal =====
document.addEventListener("keydown", function (evento) {
  if (!modalAberto()) return;

  if (evento.key === "Escape") {
    fechaModal();
    return;
  }

  if (evento.key === "Tab") {
    const lista = elementosFocaveis();
    const primeiro = lista[0];
    const ultimo = lista[lista.length - 1];

    if (evento.shiftKey && (document.activeElement === primeiro || document.activeElement === conteudoModal)) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primeiro.focus();
    }
  }
});
