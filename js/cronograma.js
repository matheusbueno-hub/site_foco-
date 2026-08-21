/*
=====================================================
   CRONOGRAMA DE ESTUDOS
=====================================================
*/

document.addEventListener("DOMContentLoaded", function () {


    /*
    =================================================
       1. PEGAR OS ELEMENTOS DO HTML
    =================================================

       Aqui estamos dizendo ao JavaScript:

       "Encontre esses elementos dentro do HTML
       para que eu possa trabalhar com eles."

    */


    const btnAdicionar =
        document.getElementById("btnAdicionarHorario");


    const modal =
        document.getElementById("modalHorario");


    const fecharModal =
        document.getElementById("fecharHorario");


    const form =
        document.getElementById("formHorario");


    const tabela =
        document.getElementById("scheduleBody");



    /*
    =================================================
       2. PEGAR OS HORÁRIOS SALVOS
    =================================================

       localStorage é uma espécie de memória
       do navegador.

       Assim, quando você fechar o site,
       os horários continuam salvos.

    */


    let horarios =
        JSON.parse(
            localStorage.getItem("horariosEstudo")
        ) || [];



    /*
    =================================================
       3. NOMES DOS DIAS
    =================================================

       Usaremos esses nomes para organizar
       os horários dentro da tabela.

    */


    const dias = {

        segunda: "Segunda",

        terca: "Terça",

        quarta: "Quarta",

        quinta: "Quinta",

        sexta: "Sexta",

        sabado: "Sábado",

        domingo: "Domingo"

    };



    /*
    =================================================
       4. ABRIR O MODAL
    =================================================

       Quando clicar em:

       + Adicionar horário

       a janela aparecerá.

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
       a janela desaparece.

    */


    fecharModal.addEventListener(
        "click",
        function () {

            modal.classList.remove("active");

        }
    );



    /*
    =================================================
       6. SALVAR NOVO HORÁRIO
    =================================================

       Essa parte acontece quando
       o usuário envia o formulário.

    */


    form.addEventListener(
        "submit",
        function (event) {


            /*
               Impede o navegador de
               recarregar a página.
            */

            event.preventDefault();



            /*
            =========================================
               PEGAR OS VALORES DO FORMULÁRIO
            =========================================
            */


            const dia =
                document.getElementById(
                    "diaSemana"
                ).value;


            const horario =
                document.getElementById(
                    "horarioEstudo"
                ).value;


            const materia =
                document.getElementById(
                    "materiaEstudo"
                ).value;


            const descricao =
                document.getElementById(
                    "descricaoEstudo"
                ).value;



            /*
            =========================================
               CRIAR NOVO HORÁRIO
            =========================================

               Cada horário será um objeto.

               Exemplo:

               {
                   id: 123,
                   dia: "segunda",
                   horario: "14:00",
                   materia: "Matemática",
                   descricao: "Exercícios"
               }

            */


            const novoHorario = {

                id: Date.now(),

                dia: dia,

                horario: horario,

                materia: materia,

                descricao: descricao

            };



            /*
            =========================================
               COLOCAR NO ARRAY
            =========================================

               O horário é adicionado
               à lista de horários.
            */


            horarios.push(
                novoHorario
            );



            /*
            =========================================
               SALVAR NO NAVEGADOR
            =========================================
            */


            salvarHorarios();



            /*
            =========================================
               ATUALIZAR A TABELA
            =========================================
            */


            mostrarCronograma();



            /*
            =========================================
               LIMPAR O FORMULÁRIO
            =========================================
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
       7. SALVAR OS HORÁRIOS
    =================================================

       Transforma o array em texto JSON
       e salva no navegador.

    */


    function salvarHorarios() {

        localStorage.setItem(
            "horariosEstudo",
            JSON.stringify(horarios)
        );

    }



    /*
    =================================================
       8. MOSTRAR O CRONOGRAMA
    =================================================

       Aqui construímos as linhas
       da tabela.

    */


    function mostrarCronograma() {


        /*
           Limpa a tabela antes de criar
           novamente.

           Isso evita horários duplicados.
        */

        tabela.innerHTML = "";



        /*
        ==============================================
           SE NÃO EXISTIR NENHUM HORÁRIO
        ==============================================
        */


        if (horarios.length === 0) {

            tabela.innerHTML = `

                <tr>

                    <td
                        colspan="8"
                        style="text-align: center; padding: 30px;"
                    >

                        Nenhum horário cadastrado.

                        <br>

                        Clique em
                        "Adicionar horário"
                        para começar.

                    </td>

                </tr>

            `;

            return;

        }



        /*
        ==============================================
           PEGAR TODOS OS HORÁRIOS DIFERENTES
        ==============================================
        */


        const horariosUnicos = [];


        horarios.forEach(
            function (item) {

                if (
                    !horariosUnicos.includes(
                        item.horario
                    )
                ) {

                    horariosUnicos.push(
                        item.horario
                    );

                }

            }
        );



        /*
        ==============================================
           ORGANIZAR OS HORÁRIOS
        ==============================================
        */


        horariosUnicos.sort();



        /*
        ==============================================
           CRIAR CADA LINHA
        ==============================================
        */


        horariosUnicos.forEach(
            function (hora) {


                /*
                   Cria uma nova linha.
                */

                const linha =
                    document.createElement("tr");



                /*
                   Primeira coluna:
                   horário.
                */

                linha.innerHTML = `

                    <td class="schedule-time">
                        ${hora}
                    </td>

                `;



                /*
                ======================================
                   CRIAR AS 7 COLUNAS DOS DIAS
                ======================================
                */


                Object.keys(dias).forEach(
                    function (dia) {


                        /*
                           Procura se existe
                           algum estudo nesse dia
                           e nesse horário.
                        */

                        const estudo =
                            horarios.find(
                                function (item) {

                                    return (
                                        item.dia === dia &&
                                        item.horario === hora
                                    );

                                }
                            );



                        /*
                        ==================================
                           CRIAR A CÉLULA
                        ==================================
                        */


                        const celula =
                            document.createElement("td");



                        /*
                        ==================================
                           SE EXISTIR UM ESTUDO
                        ==================================
                        */


                        if (estudo) {


                            celula.innerHTML = `

                                <div class="study-card">

                                    <strong>
                                        📚 ${estudo.materia}
                                    </strong>

                                    ${
                                        estudo.descricao
                                        ? `
                                            <small>
                                                ${estudo.descricao}
                                            </small>
                                        `
                                        : ""
                                    }

                                    <button
                                        class="btn-excluir-horario"
                                        data-id="${estudo.id}"
                                    >
                                        🗑️
                                    </button>

                                </div>

                            `;

                        }


                        /*
                        ==================================
                           SE NÃO EXISTIR ESTUDO
                        ==================================
                        */


                        else {

                            celula.innerHTML = `

                                <span class="empty-cell">
                                    -
                                </span>

                            `;

                        }



                        /*
                           Coloca a célula
                           dentro da linha.
                        */

                        linha.appendChild(
                            celula
                        );

                    }
                );



                /*
                   Coloca a linha na tabela.
                */

                tabela.appendChild(
                    linha
                );

            }
        );



        /*
        ==============================================
           BOTÕES DE EXCLUIR
        ==============================================
        */


        const botoesExcluir =
            document.querySelectorAll(
                ".btn-excluir-horario"
            );


        botoesExcluir.forEach(
            function (botao) {

                botao.addEventListener(
                    "click",
                    function () {


                        /*
                           Pega o ID do horário.
                        */

                        const id =
                            Number(
                                botao.dataset.id
                            );



                        /*
                           Remove o horário
                           do array.
                        */

                        horarios =
                            horarios.filter(
                                function (item) {

                                    return (
                                        item.id !== id
                                    );

                                }
                            );



                        /*
                           Salva novamente.
                        */

                        salvarHorarios();



                        /*
                           Atualiza a tabela.
                        */

                        mostrarCronograma();

                    }
                );

            }
        );

    }



    /*
    =================================================
       9. INICIAR O CRONOGRAMA
    =================================================

       Quando abrir a página,
       mostra os horários que já estavam salvos.

    */


    mostrarCronograma();


});