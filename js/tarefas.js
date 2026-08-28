/*
=====================================================
   TAREFAS
=====================================================

   Este arquivo controla a página de tarefas.

   Ele permite:

   ✅ Adicionar tarefas
   📚 Informar a matéria
   📅 Definir uma data de entrega
   ⚡ Definir a prioridade
   ✔️ Concluir e reabrir tarefas
   🗑️ Excluir tarefas
   💾 Salvar tarefas no navegador

=====================================================
*/


/*
=====================================================
   ESPERAR O HTML CARREGAR
=====================================================

   O código só começa depois que o HTML inteiro
   estiver carregado.

*/

document.addEventListener("DOMContentLoaded", function () {


    /*
    =================================================
       1. PEGAR OS ELEMENTOS DO HTML
    =================================================

       Aqui o JavaScript procura os elementos
       através do ID.

       Os nomes precisam ser iguais aos IDs
       que colocamos no tarefas.html.
    */


    // Botão "+ Adicionar"
    const btnAdicionar =
        document.getElementById("btnAdicionar");


    // Janela que aparece para cadastrar a tarefa.
    const modal =
        document.getElementById("modalTarefa");


    // Botão X para fechar a janela.
    const fecharModal =
        document.getElementById("fecharTarefa");


    // Formulário usado para cadastrar a tarefa.
    const form =
        document.getElementById("formTarefa");


    // Área onde as tarefas serão mostradas.
    const taskList =
        document.getElementById("taskList");



    /*
    =================================================
       2. VERIFICAR SE OS ELEMENTOS EXISTEM
    =================================================

       Se algum ID estiver errado no HTML,
       o JavaScript não consegue encontrar
       o elemento.

       Esta verificação ajuda a descobrir
       esse tipo de problema.
    */


    if (!btnAdicionar) {

        console.error(
            'Erro: não encontrei o botão com id "btnAdicionar".'
        );

        return;

    }


    if (!modal) {

        console.error(
            'Erro: não encontrei o modal com id "modalTarefa".'
        );

        return;

    }


    if (!fecharModal) {

        console.error(
            'Erro: não encontrei o botão "fecharTarefa".'
        );

        return;

    }


    if (!form) {

        console.error(
            'Erro: não encontrei o formulário "formTarefa".'
        );

        return;

    }


    if (!taskList) {

        console.error(
            'Erro: não encontrei a lista "taskList".'
        );

        return;

    }



    /*
    =================================================
       3. PEGAR TAREFAS SALVAS
    =================================================

       O localStorage funciona como uma memória
       do navegador.

       Assim, as tarefas continuam salvas
       mesmo depois de fechar o site.

    */


    let tarefas = [];


    try {

        tarefas =
            JSON.parse(
                localStorage.getItem("tarefas")
            ) || [];

    }

    catch (erro) {

        console.error(
            "Erro ao carregar as tarefas:",
            erro
        );

        tarefas = [];

    }



    /*
    =================================================
       4. ABRIR O MODAL
    =================================================

       Quando clicar no botão "+ Adicionar",
       adicionamos a classe "active".

       O CSS usa essa classe para mostrar
       a janela.
    */


    btnAdicionar.addEventListener(
        "click",
        function () {

            modal.classList.add("active");

        }
    );



    /*
    =================================================
       5. FECHAR O MODAL
    =================================================

       Quando clicar no X,
       removemos a classe "active".
    */


    fecharModal.addEventListener(
        "click",
        function () {

            modal.classList.remove("active");

        }
    );



    /*
    =================================================
       6. FECHAR CLICANDO FORA DA JANELA
    =================================================

       Se o usuário clicar no fundo escuro,
       o modal também será fechado.
    */


    modal.addEventListener(
        "click",
        function (event) {

            // Verifica se o clique aconteceu
            // diretamente no fundo do modal.

            if (event.target === modal) {

                modal.classList.remove("active");

            }

        }
    );



    /*
    =================================================
       7. SALVAR NOVA TAREFA
    =================================================

       Esta parte é executada quando o usuário
       clica em "Salvar tarefa".
    */


    form.addEventListener(
        "submit",
        function (event) {


            /*
            -----------------------------------------
               Impede o navegador de recarregar
               a página.
            -----------------------------------------
            */

            event.preventDefault();



            /*
            =========================================
               PEGAR OS DADOS DO FORMULÁRIO
            =========================================
            */


            // Nome da tarefa.
            const nome =
                document.getElementById(
                    "nomeTarefa"
                ).value.trim();


            // Matéria da tarefa.
            const materia =
                document.getElementById(
                    "materiaTarefa"
                ).value.trim();


            // Data de entrega.
            const data =
                document.getElementById(
                    "dataTarefa"
                ).value;


            // Prioridade da tarefa.
            const prioridade =
                document.getElementById(
                    "prioridadeTarefa"
                ).value;



            /*
            =========================================
               VERIFICAR CAMPOS
            =========================================

               Se algum campo obrigatório estiver
               vazio, não criaremos a tarefa.
            */


            if (
                nome === "" ||
                materia === "" ||
                data === "" ||
                prioridade === ""
            ) {

                alert(
                    "Preencha todos os campos."
                );

                return;

            }



            /*
            =========================================
               CRIAR A TAREFA
            =========================================

               Aqui criamos um objeto.

               Um objeto é uma forma de guardar
               várias informações relacionadas.

            */


            const novaTarefa = {

                // Cria um número único para a tarefa.
                id: Date.now(),

                // Nome digitado pelo usuário.
                nome: nome,

                // Matéria digitada.
                materia: materia,

                // Data escolhida.
                data: data,

                // Prioridade escolhida.
                prioridade: prioridade,

                // Toda tarefa nova começa
                // como não concluída.
                concluida: false

            };



            /*
            =========================================
               ADICIONAR A TAREFA À LISTA
            =========================================
            */


            tarefas.push(
                novaTarefa
            );



            /*
            =========================================
               SALVAR NO LOCALSTORAGE
            =========================================
            */


            salvarTarefas();



            /*
            =========================================
               ATUALIZAR A TELA
            =========================================

               Depois de salvar,
               mostramos a nova tarefa.
            */


            mostrarTarefas();



            /*
            =========================================
               LIMPAR O FORMULÁRIO
            =========================================

               Deixa os campos vazios para
               quando o usuário cadastrar
               outra tarefa.
            */


            form.reset();



            /*
            =========================================
               FECHAR O MODAL
            =========================================
            */


            modal.classList.remove(
                "active"
            );

        }
    );



    /*
    =================================================
       8. FUNÇÃO PARA SALVAR TAREFAS
    =================================================

       JSON.stringify transforma o array em texto.

       O localStorage só consegue guardar dados
       dessa forma.
    */


    function salvarTarefas() {

        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );

    }



    /*
    =================================================
       9. MOSTRAR AS TAREFAS
    =================================================

       Esta função pega as tarefas salvas
       e cria os elementos HTML na tela.
    */


    function mostrarTarefas() {


        /*
        ---------------------------------------------
           Limpa a lista.

           Isso evita que as tarefas apareçam
           duplicadas quando atualizamos a tela.
        ---------------------------------------------
        */

        taskList.innerHTML = "";



        /*
        =============================================
           VERIFICAR SE NÃO EXISTEM TAREFAS
        =============================================
        */


        if (tarefas.length === 0) {

            taskList.innerHTML = `

                <div class="empty">

                    <p>
                        Você ainda não possui tarefas.
                    </p>

                    <span>
                        Adicione uma tarefa para começar.
                    </span>

                </div>

            `;

            return;

        }



        /*
        =============================================
           ORGANIZAR AS TAREFAS
        =============================================

           Primeiro aparecem as tarefas pendentes.

           Depois aparecem as concluídas.

           Dentro de cada grupo,
           organizamos pela data.
        */


        tarefas.sort(
            function (a, b) {


                // Coloca tarefas pendentes
                // antes das concluídas.

                if (
                    a.concluida !== b.concluida
                ) {

                    return a.concluida
                        ? 1
                        : -1;

                }


                // Se tiverem o mesmo estado,
                // organiza pela data.

                return a.data.localeCompare(
                    b.data
                );

            }
        );



        /*
        =============================================
           CRIAR CADA TAREFA
        =============================================
        */


        tarefas.forEach(
            function (tarefa) {


                /*
                -------------------------------------
                   Cria uma div para a tarefa.
                -------------------------------------
                */

                const div =
                    document.createElement("div");


                /*
                -------------------------------------
                   Adiciona a classe "task".
                -------------------------------------
                */

                div.className = "task";



                /*
                -------------------------------------
                   SE A TAREFA ESTIVER CONCLUÍDA
                -------------------------------------

                   Adicionamos "completed".

                   O CSS usa essa classe para
                   deixar a tarefa diferente.
                */

                if (tarefa.concluida) {

                    div.classList.add(
                        "completed"
                    );

                }



                /*
                =====================================
                   COLOCAR INFORMAÇÕES NA TAREFA
                =====================================
                */


                div.innerHTML = `

                    <div class="task-info">

                        <h3>
                            ${escaparHTML(tarefa.nome)}
                        </h3>

                        <p>
                            📚
                            ${escaparHTML(tarefa.materia)}
                        </p>

                        <p>
                            📅 Entrega:
                            ${formatarData(tarefa.data)}
                        </p>

                        <p>
                            ⚡ Prioridade:
                            ${escaparHTML(tarefa.prioridade)}
                        </p>

                    </div>


                    <div class="task-actions">


                        <!--
                            Botão para concluir
                            ou reabrir a tarefa.
                        -->

                        <button
                            class="btn-concluir"
                            data-id="${tarefa.id}"
                            type="button"
                        >

                            ${
                                tarefa.concluida
                                ? "↩️ Reabrir"
                                : "✅ Concluir"
                            }

                        </button>



                        <!--
                            Botão para excluir
                            a tarefa.
                        -->

                        <button
                            class="btn-excluir"
                            data-id="${tarefa.id}"
                            type="button"
                        >

                            🗑️ Excluir

                        </button>


                    </div>

                `;



                /*
                =====================================
                   BOTÃO CONCLUIR
                =====================================
                */


                const btnConcluir =
                    div.querySelector(
                        ".btn-concluir"
                    );


                btnConcluir.addEventListener(
                    "click",
                    function () {


                        /*
                           Procura a tarefa
                           pelo ID.
                        */

                        const tarefaEncontrada =
                            tarefas.find(
                                function (item) {

                                    return (
                                        item.id ===
                                        tarefa.id
                                    );

                                }
                            );



                        /*
                           Troca o estado.

                           false → true

                           true → false
                        */

                        tarefaEncontrada.concluida =
                            !tarefaEncontrada.concluida;



                        /*
                           Salva a mudança.
                        */

                        salvarTarefas();



                        /*
                           Atualiza a tela.
                        */

                        mostrarTarefas();

                    }
                );



                /*
                =====================================
                   BOTÃO EXCLUIR
                =====================================
                */


                const btnExcluir =
                    div.querySelector(
                        ".btn-excluir"
                    );


                btnExcluir.addEventListener(
                    "click",
                    function () {


                        /*
                           Confirma antes de excluir.
                        */

                        const confirmar =
                            confirm(
                                "Deseja excluir esta tarefa?"
                            );


                        /*
                           Se clicar em cancelar,
                           não fazemos nada.
                        */

                        if (!confirmar) {

                            return;

                        }



                        /*
                           Cria uma nova lista
                           sem a tarefa escolhida.
                        */

                        tarefas =
                            tarefas.filter(
                                function (item) {

                                    return (
                                        item.id !==
                                        tarefa.id
                                    );

                                }
                            );



                        /*
                           Salva a nova lista.
                        */

                        salvarTarefas();



                        /*
                           Atualiza a tela.
                        */

                        mostrarTarefas();

                    }
                );



                /*
                -------------------------------------
                   Coloca a tarefa dentro da lista.
                -------------------------------------
                */

                taskList.appendChild(
                    div
                );

            }
        );

    }



    /*
    =================================================
       10. FORMATAR DATA
    =================================================

       O campo de data fornece:

       2026-08-30

       Queremos mostrar:

       30/08/2026
    */


    function formatarData(data) {


        // Se não existir uma data.
        if (!data) {

            return "Sem data";

        }


        // Divide a data em partes.
        const partes =
            data.split("-");


        // Verifica se a data está correta.
        if (partes.length !== 3) {

            return data;

        }


        // Monta a data no formato brasileiro.
        return (
            partes[2]
            + "/"
            + partes[1]
            + "/"
            + partes[0]
        );

    }



    /*
    =================================================
       11. PROTEGER TEXTO DIGITADO
    =================================================

       Esta função transforma o texto digitado
       em texto comum.

       Isso evita que alguém coloque código HTML
       dentro do nome da tarefa.
    */


    function escaparHTML(texto) {

        const elemento =
            document.createElement("div");


        elemento.textContent =
            texto;


        return elemento.innerHTML;

    }



    /*
    =================================================
       12. MOSTRAR AS TAREFAS AO ABRIR A PÁGINA
    =================================================

       Quando abrir tarefas.html,
       as tarefas salvas aparecem automaticamente.
    */


    mostrarTarefas();


});
