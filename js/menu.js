
document.addEventListener("DOMContentLoaded", async () => {

    const menuContainer = document.getElementById("menu-container");

    if (!menuContainer) return;

    try {

        const resposta = await fetch("./menu.html");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o menu.");
        }

        menuContainer.innerHTML = await resposta.text();

        const paginaAtual = window.location.pathname
            .split("/")
            .pop()
            .replace(".html", "");

        menuContainer.querySelectorAll(".menu-links a").forEach(link => {

            if (link.dataset.page === paginaAtual) {
                link.classList.add("active");
            }

        });

    } catch (erro) {

        console.error("Erro ao carregar menu:", erro);

    }

});
