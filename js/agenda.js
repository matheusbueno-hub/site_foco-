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

    const calendario =
        document.getElementById("calendar");

    const mesAtual =
        document.getElementById("mesAtual");

    const mesAnterior =
        document.getElementById("mesAnterior");

    const proximoMes =
        document.getElementById("proximoMes");

    const btnHoje =
        document.getElementById("btnHoje");

    const tituloEventos =
        document.getElementById("tituloEventos");


    /*
    =================================================
       EVENTOS SALVOS
    =================================================
    */

    let eventos =
        JSON.parse(
            localStorage.getItem("eventos")
        ) || [];


    /*
    =================================================
       DATA ATUAL
    =================================================
    */

    let dataAtual = new Date();

    let dataSelecionada =
        formatarDataISO(dataAtual);


    /*
    =================================================
       MESES
    =================================================
    */

    const meses = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];


    /*
    =================================================
       MOSTRAR CALENDÁRIO
    =================================================
    */

    function mostrarCalendario() {

        calendario.innerHTML = "";

        const ano =
            dataAtual.getFullYear();

        const mes =
            dataAtual.getMonth();


        mesAtual.textContent =
            meses[mes] + " " + ano;


        const primeiroDia =
            new Date(
                ano,
                mes,
                1
            ).getDay();


        const quantidadeDias =
            new Date(
                ano,
                mes + 1,
                0
            ).getDate();


        /*
        Espaços antes do primeiro dia
        */

        for (
            let i = 0;
            i < primeiroDia;
            i++
        ) {

            const vazio =
                document.createElement("div");

            vazio.className =
                "calendar-day empty-day";

            calendario.appendChild(vazio);

        }


        /*
        Criar os dias
        */

        for (
            let dia = 1;
            dia <= quantidadeDias;
            dia++
        ) {

            const elemento =
                document.createElement("div");

            elemento.className =
                "calendar-day";


            const dataDia =
                new Date(
                    ano,
                    mes,
                    dia
                );


            const dataISO =
                formatarDataISO(
                    dataDia
                );


            elemento.innerHTML = `
                <span class="day-number">
                    ${dia}
                </span>
            `;


            /*
            Verificar se é hoje
            */

            const hoje = new Date();


            if (
                dia === hoje.getDate() &&
                mes === hoje.getMonth() &&
                ano === hoje.getFullYear()
            ) {

                elemento.classList.add("today");

            }


            /*
            Verificar eventos
            */

            const eventosDoDia =
                eventos.filter(
                    function (evento) {

                        return evento.data === dataISO;

                    }
                );


            if (eventosDoDia.length > 0) {

                elemento.classList.add(
                    "has-event"
                );

                elemento.innerHTML += `
                    <span class="event-dot">
                        ${eventosDoDia.length}
                    </span>
                `;

            }


            /*
            Dia selecionado
            */

            if (
                dataISO === dataSelecionada
            ) {

                elemento.classList.add(
                    "selected"
                );

            }


            /*
            Clicar no dia
            */

            elemento.addEventListener(
                "click",
                function () {

                    dataSelecionada =
                        dataISO;

                    mostrarCalendario();

                    mostrarEventos();

                }
            );


            calendario.appendChild(
                elemento
            );

        }

    }


    /*
    =================================================
       MOSTRAR EVENTOS
    =================================================
    */

    function mostrarEventos() {

        eventList.innerHTML = "";


        tituloEventos.textContent =
            "Lembretes de " +
            formatarDataBR(
                dataSelecionada
            );


        const eventosDoDia =
            eventos.filter(
                function (evento) {

                    return evento.data === dataSelecionada;

                }
            );


        /*
        Se não houver eventos
        */

        if (eventosDoDia.length === 0) {

            eventList.innerHTML = `

                <div class="empty">

                    <p>
                        Nenhum lembrete neste dia.
                    </p>

                    <span>
                        Clique em "Novo lembrete"
                        para adicionar um.
                    </span>

                </div>

            `;

            return;

        }


        /*
        Criar cada evento
        */

        eventosDoDia.forEach(
            function (evento) {

                const div =
                    document.createElement("div");

                div.className = "task";


                /*
                Se estiver concluído
                */

                if (evento.concluido) {

                    div.classList.add(
                        "concluido"
                    );

                }


                div.innerHTML = `

                    <div class="task-info">

                        <h3>
                            ${iconeTipo(evento.tipo)}
                            ${evento.nome}
                        </h3>

                        <p>
                            ${evento.tipo}

                            ${
                                evento.hora
                                ? " • " + evento.hora
                                : ""
                            }
                        </p>

                        ${
                            evento.descricao
                            ? `
                                <p>
                                    ${evento.descricao}
                                </p>
                            `
                            : ""
                        }

                    </div>


                    <div class="task-actions">

                        <button
                            class="btn-concluir"
                        >
                            ${
                                evento.concluido
                                ? "↩️ Reabrir"
                                : "✓ Concluído"
                            }
                        </button>


                        <button
                            class="btn-excluir"
                        >
                            🗑️
                        </button>

                    </div>

                `;


                /*
                =================================================
                   BOTÃO CONCLUÍDO
                =================================================
                */

                const btnConcluir =
                    div.querySelector(
                        ".btn-concluir"
                    );


                btnConcluir.addEventListener(
                    "click",
                    function () {

                        evento.concluido =
                            !evento.concluido;


                        salvarEventos();

                        mostrarCalendario();

                        mostrarEventos();

                    }
                );


                /*
                =================================================
                   BOTÃO EXCLUIR
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

                        mostrarCalendario();

                        mostrarEventos();

                    }
                );


                eventList.appendChild(div);

            }
        );

    }


    /*
    =================================================
       ABRIR MODAL
    =================================================
    */

    btnAdicionar.addEventListener(
        "click",
        function () {

            document.getElementById(
                "dataEvento"
            ).value =
                dataSelecionada;

            modal.classList.add(
                "active"
            );

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

            modal.classList.remove(
                "active"
            );

        }
    );


    /*
    =================================================
       SALVAR NOVO EVENTO
    =================================================
    */

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const novoEvento = {

                id: Date.now(),

                nome:
                    document.getElementById(
                        "nomeEvento"
                    ).value,

                tipo:
                    document.getElementById(
                        "tipoEvento"
                    ).value,

                data:
                    document.getElementById(
                        "dataEvento"
                    ).value,

                hora:
                    document.getElementById(
                        "horaEvento"
                    ).value,

                descricao:
                    document.getElementById(
                        "descricaoEvento"
                    ).value,

                concluido: false

            };


            eventos.push(
                novoEvento
            );


            salvarEventos();


            dataSelecionada =
                novoEvento.data;


            dataAtual =
                new Date(
                    novoEvento.data +
                    "T12:00:00"
                );


            mostrarCalendario();

            mostrarEventos();


            form.reset();

            modal.classList.remove(
                "active"
            );

        }
    );


    /*
    =================================================
       MÊS ANTERIOR
    =================================================
    */

    mesAnterior.addEventListener(
        "click",
        function () {

            dataAtual.setMonth(
                dataAtual.getMonth() - 1
            );

            mostrarCalendario();

        }
    );


    /*
    =================================================
       PRÓXIMO MÊS
    =================================================
    */

    proximoMes.addEventListener(
        "click",
        function () {

            dataAtual.setMonth(
                dataAtual.getMonth() + 1
            );

            mostrarCalendario();

        }
    );


    /*
    =================================================
       BOTÃO HOJE
    =================================================
    */

    btnHoje.addEventListener(
        "click",
        function () {

            dataAtual =
                new Date();

            dataSelecionada =
                formatarDataISO(
                    dataAtual
                );

            mostrarCalendario();

            mostrarEventos();

        }
    );


    /*
    =================================================
       SALVAR NO NAVEGADOR
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
       DATA PARA O BANCO
    =================================================
    */

    function formatarDataISO(data) {

        const ano =
            data.getFullYear();

        const mes =
            String(
                data.getMonth() + 1
            ).padStart(2, "0");

        const dia =
            String(
                data.getDate()
            ).padStart(2, "0");


        return (
            ano +
            "-" +
            mes +
            "-" +
            dia
        );

    }


    /*
    =================================================
       DATA BRASILEIRA
    =================================================
    */

    function formatarDataBR(data) {

        const partes =
            data.split("-");


        return (
            partes[2] +
            "/" +
            partes[1] +
            "/" +
            partes[0]
        );

    }


    /*
    =================================================
       ÍCONE DO TIPO
    =================================================
    */

    function iconeTipo(tipo) {

        if (tipo === "Prova") {
            return "📝";
        }

        if (tipo === "Trabalho") {
            return "📚";
        }

        if (tipo === "Atividade") {
            return "📖";
        }

        if (tipo === "Estudo") {
            return "⏰";
        }

        return "🔔";

    }


    /*
    =================================================
       INICIAR
    =================================================
    */

    mostrarCalendario();

    mostrarEventos();

});