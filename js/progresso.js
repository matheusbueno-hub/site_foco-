/*
=====================================================
   PROGRESSO DOS ESTUDOS
=====================================================

   Este arquivo é responsável por:
   - Contar as tarefas
   - Contar as tarefas concluídas
   - Calcular a porcentagem
   - Atualizar a barra de progresso
=====================================================
*/


// Espera o HTML terminar de carregar antes
// de executar o JavaScript.
document.addEventListener("DOMContentLoaded", function () {


    /*
    =================================================
       PEGAR ELEMENTOS DO HTML
    =================================================

       Aqui encontramos os elementos através
       do ID que colocamos no progresso.html.
    */


    // Mostra a quantidade total de tarefas.
    const totalTarefas =
        document.getElementById("totalTarefas");


    // Mostra quantas tarefas foram concluídas.
    const tarefasConcluidas =
        document.getElementById("tarefasConcluidas");


    // Mostra a porcentagem do progresso.
    const porcentagem =
        document.getElementById("porcentagem");


    // É a barra visual de progresso.
    const progressBar =
        document.getElementById("progressBar");


    // Texto que aparece abaixo da barra.
    const textoProgresso =
        document.getElementById("textoProgresso");



    /*
    =================================================
       PEGAR AS TAREFAS SALVAS
    =================================================

       Aqui vamos buscar as tarefas que foram
       salvas no localStorage.

       O localStorage permite guardar informações
       no navegador mesmo depois de fechar a página.
    */


    let tarefas =
        JSON.parse(
            localStorage.getItem("tarefas")
        ) || [];



    /*
    =================================================
       CALCULAR O PROGRESSO
    =================================================

       Primeiro verificamos quantas tarefas existem.
    */


    const total =
        tarefas.length;



    /*
       Agora contamos somente as tarefas
       que estão concluídas.
    */


    const concluidas =
        tarefas.filter(
            function (tarefa) {

                return tarefa.concluida === true;

            }
        ).length;



    /*
    =================================================
       CALCULAR A PORCENTAGEM
    =================================================

       Exemplo:

       10 tarefas
       5 concluídas

       5 ÷ 10 × 100 = 50%
    */


    let porcentagemAtual = 0;


    if (total > 0) {

        porcentagemAtual =
            Math.round(
                (concluidas / total) * 100
            );

    }



    /*
    =================================================
       MOSTRAR OS NÚMEROS NA PÁGINA
    =================================================
    */


    totalTarefas.textContent =
        total;


    tarefasConcluidas.textContent =
        concluidas;


    porcentagem.textContent =
        porcentagemAtual + "%";



    /*
    =================================================
       ATUALIZAR A BARRA
    =================================================

       A largura da barra será igual à porcentagem.

       0%  → barra vazia
       50% → metade da barra
       100% → barra completa
    */


    progressBar.style.width =
        porcentagemAtual + "%";



    /*
    =================================================
       ATUALIZAR A MENSAGEM
    =================================================
    */


    if (total === 0) {

        textoProgresso.textContent =
            "Você ainda não possui tarefas.";

    }

    else if (porcentagemAtual === 100) {

        textoProgresso.textContent =
            "Parabéns! Você concluiu todas as tarefas! 🎉";

    }

    else {

        textoProgresso.textContent =
            "Você concluiu " +
            concluidas +
            " de " +
            total +
            " tarefas.";

    }


});