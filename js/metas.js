
document.addEventListener("DOMContentLoaded", () => {

    const botaoAdicionar = document.getElementById("btnAdicionarMeta");
    const modal = document.getElementById("modalMeta");
    const botaoFechar = document.getElementById("fecharModalMeta");
    const formulario = document.getElementById("formMeta");
    const listaMetas = document.getElementById("listaMetas");

    const tituloInput = document.getElementById("tituloMeta");
    const descricaoInput = document.getElementById("descricaoMeta");
    const prazoInput = document.getElementById("prazoMeta");

    // Carrega as metas salvas no navegador
    let metas = JSON.parse(localStorage.getItem("metasFoco")) || [];

    // Abre a janela
    botaoAdicionar.addEventListener("click", () => {
        modal.classList.add("mostrar");
        tituloInput.focus();
    });

    // Fecha a janela
    function fecharModal() {
        modal.classList.remove("mostrar");
        formulario.reset();
    }

    botaoFechar.addEventListener("click", fecharModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });

    // Salva uma nova meta
    formulario.addEventListener("submit", (event) => {
        event.preventDefault();

        const novaMeta = {
            id: Date.now(),
            titulo: tituloInput.value.trim(),
            descricao: descricaoInput.value.trim(),
            prazo: prazoInput.value,
            concluida: false
        };

        if (!novaMeta.titulo) {
            alert("Digite o nome da sua meta!");
            return;
        }

        metas.push(novaMeta);

        salvarMetas();
        renderizarMetas();
        fecharModal();
    });

    // Salva no navegador
    function salvarMetas() {
        localStorage.setItem("metasFoco", JSON.stringify(metas));
    }

    // Mostra as metas na tela
    function renderizarMetas() {

        listaMetas.innerHTML = "";

        if (metas.length === 0) {
            const vazio = document.createElement("div");
            vazio.className = "empty";

            const mensagem = document.createElement("p");
            mensagem.textContent = "Você ainda não possui metas.";

            const detalhe = document.createElement("span");
            detalhe.textContent = "Crie uma meta para começar.";

            vazio.append(mensagem, detalhe);
            listaMetas.appendChild(vazio);
            return;
        }

        metas.forEach((meta) => {

            const card = document.createElement("div");
            card.className = "meta-card";

            const titulo = document.createElement("h3");
            titulo.textContent = meta.titulo;

            const descricao = document.createElement("p");
            descricao.textContent = meta.descricao || "Sem descrição.";

            const prazo = document.createElement("p");
            prazo.textContent = meta.prazo
                ? "Prazo: " + meta.prazo.split("-").reverse().join("/")
                : "Prazo não definido.";

            const status = document.createElement("p");
            status.className = "meta-status";
            status.textContent = meta.concluida
                ? "✅ Meta concluída"
                : "⏳ Em andamento";

            const botoes = document.createElement("div");
            botoes.className = "meta-botoes";

            const botaoConcluir = document.createElement("button");
            botaoConcluir.type = "button";
            botaoConcluir.textContent = meta.concluida
                ? "Reabrir meta"
                : "Concluir";

            botaoConcluir.addEventListener("click", () => {
                meta.concluida = !meta.concluida;
                salvarMetas();
                renderizarMetas();
            });

            const botaoExcluir = document.createElement("button");
            botaoExcluir.type = "button";
            botaoExcluir.textContent = "Excluir";
            botaoExcluir.className = "meta-excluir";

            botaoExcluir.addEventListener("click", () => {
                const confirmar = confirm("Deseja excluir esta meta?");

                if (confirmar) {
                    metas = metas.filter(item => item.id !== meta.id);
                    salvarMetas();
                    renderizarMetas();
                }
            });

            botoes.append(botaoConcluir, botaoExcluir);

            card.append(titulo, descricao, prazo, status, botoes);
            listaMetas.appendChild(card);
        });
    }

    // Exibe as metas ao abrir a página
    renderizarMetas();

});
