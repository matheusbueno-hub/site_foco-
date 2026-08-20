document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       PEGAR DADOS SALVOS
    ========================= */

    const tarefas =
        JSON.parse(
            localStorage.getItem("tarefas")
        ) || [];


    const eventos =
        JSON.parse(
            localStorage.getItem("eventos")
        ) || [];


    const metas =
        JSON.parse(
            localStorage.getItem("metas")
        ) || [];



    /* =========================
       MOSTRAR TOTAIS
    ========================= */

    document.getElementById(
        "totalTarefas"
    ).textContent = tarefas.length;


    document.getElementById(
        "totalEventos"
    ).textContent = eventos.length;


    document.getElementById(
        "totalMetas"
    ).textContent = metas.length;



    /* =========================
       MOSTRAR TAREFAS
    ========================= */

    const tarefasInicio =
        document.getElementById(
            "tarefasInicio"
        );


    if (tarefas.length > 0) {

        tarefasInicio.innerHTML = "";


        tarefas
            .slice(0, 5)
            .forEach(function (tarefa) {

                const div =
                    document.createElement("div");


                div.className = "task";


                div.innerHTML = `

                    <div class="task-info">

                        <h3>
                            ${tarefa.titulo}
                        </h3>

                        <p>
                            ${tarefa.materia}
                        </p>

                    </div>

                `;


                tarefasInicio.appendChild(div);

            });

    }



    /* =========================
       MOSTRAR EVENTOS
    ========================= */

    const eventosInicio =
        document.getElementById(
            "eventosInicio"
        );


    if (eventos.length > 0) {

        eventosInicio.innerHTML = "";


        eventos
            .slice(0, 5)
            .forEach(function (evento) {

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

                `;


                eventosInicio.appendChild(div);

            });

    }



    /* =========================
       FORMATAÇÃO DA DATA
    ========================= */

    function formatarData(data) {

        if (!data) {
            return "";
        }


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

});