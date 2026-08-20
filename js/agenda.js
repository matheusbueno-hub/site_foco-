/*
=====================================================
   AGENDA
=====================================================
*/

document.addEventListener("DOMContentLoaded", function () {


    /*
    =================================================
       ELEMENTOS DO HTML
    =================================================
    */


    const btnAdicionar =
        document.getElementById("btnAdicionarEvento");


    const modal =
        document.getElementById("modalEvento");


    const fecharModal =
        document.getElementById("fecharEvento");


    const form =
        document.getElementById("formEvento");


    const eventList =
        document.getElementById("eventList");



    /*
    =================================================
       PEGAR EVENTOS SALVOS
    =================================================
    */


    let eventos =
        JSON.parse(
            localStorage.getItem("eventos")
        ) || [];



    /*
    =================================================
       ABRIR MODAL
    =================================================
    */


    btnAdicionar.addEventListener(
        "click",
        function () {

            modal.classList.add("active");

        }
    );



    /*
    =================================================
       FECHAR MODAL
    =================================================
    */


    fecharModal.addEventListener(
        "click",
        function () {

            modal.classList.remove("active");

        }
    );



    /*
    =================================================
       SALVAR EVENTO
    =================================================
    */


    form.addEventListener(
        "submit",
        function (event) {


            event.preventDefault();


            /*
               Pegar os valores.
            */

            const nome =
                document.getElementById(
                    "nomeEvento"
                ).value;


            const tipo =
                document.getElementById(
                    "tipoEvento"
                ).value;


            const data =
                document.getElementById(
                    "dataEvento"
                ).value;



            /*
               Criar evento.
            */

            const novoEvento = {

                id: Date.now(),

                nome: nome,

                tipo: tipo,

                data: data

            };



            /*
               Adicionar ao array.
            */

            eventos.push(novoEvento);



            /*
               Salvar no navegador.
            */

            salvarEventos();



            /*
               Atualizar a tela.
            */

            mostrarEventos();



            /*
               Limpar formulário.
            */

            form.reset();



            /*
               Fechar janela.
            */

            modal.classList.remove("active");

        }
    );



    /*
    =================================================
       SALVAR EVENTOS
    =================================================
    */


    function salvarEventos() {

        localStorage.setItem(
            "eventos",
            JSON.stringify(eventos)
        );

    }



    /*
    =================================================
       MOSTRAR EVENTOS
    =================================================
    */


    function mostrarEventos() {


        eventList.innerHTML = "";



        /*
           Se não houver eventos.
        */

        if (eventos.length === 0) {

            eventList.innerHTML = `

                <div class="empty">

                    <p>
                        Nenhum evento cadastrado.
                    </p>

                    <span>
                        Adicione uma prova,
                        trabalho ou atividade.
                    </span>

                </div>

            `;

            return;

        }



        /*
           Ordena os eventos pela data.
        */

        eventos.sort(
            function (a, b) {

                return a.data.localeCompare(b.data);

            }
        );



        /*
           Cria cada evento.
        */

        eventos.forEach(
            function (evento) {


                const div =
                    document.createElement("div");


                div.className = "task";


                div.innerHTML = `

                    <div class="task-info">

                        <h3>
                            ${evento.nome}
                        </h3>

                        <p>
                            ${evento.tipo}
                            •
                            ${formatarData(evento.data)}
                        </p>

                    </div>


                    <div class="task-actions">

                        <button
                            class="btn-excluir"
                        >
                            🗑
                        </button>

                    </div>

                `;



                /*
                =================================================
                   EXCLUIR EVENTO
                =================================================
                */


                const btnExcluir =
                    div.querySelector(
                        ".btn-excluir"
                    );


                btnExcluir.addEventListener(
                    "click",
                    function () {


                        eventos =
                            eventos.filter(
                                function (item) {

                                    return (
                                        item.id !==
                                        evento.id
                                    );

                                }
                            );


                        salvarEventos();

                        mostrarEventos();

                    }
                );



                eventList.appendChild(div);

            }
        );

    }



    /*
    =================================================
       FORMATAR DATA
    =================================================
    */


    function formatarData(data) {


        const partes =
            data.split("-");


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
       MOSTRAR EVENTOS AO ABRIR A PÁGINA
    =================================================
    */


    mostrarEventos();

});
