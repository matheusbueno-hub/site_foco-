
/* =========================================
   1. CONFIGURAÇÃO DO SUPABASE
========================================= */

const SUPABASE_URL = "https://mtkaxaepaavocsxvugdy.supabase.co";
const SUPABASE_KEY = "sb_publishable_BEb8pX3IjntopvRJNWvJ9w_AxRk1Xgz";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   2. ELEMENTOS DA TELA
========================================= */

const cadastroForm = document.getElementById("cadastroForm");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const cadastroMessage = document.getElementById("cadastroMessage");
const cadastroButton = document.getElementById("cadastroButton");


/* =========================================
   3. EXIBIR MENSAGENS
========================================= */

function showMessage(message, color = "#e04444") {

    if (!cadastroMessage) return;

    cadastroMessage.textContent = message;
    cadastroMessage.style.color = color;

}


/* =========================================
   4. VERIFICAR ELEMENTOS
========================================= */

if (!window.supabase) {

    console.error("Biblioteca do Supabase não foi carregada.");

    showMessage("Erro ao carregar o sistema. Atualize a página.");

} else if (!cadastroForm) {

    console.error("Formulário de cadastro não encontrado.");

} else {


    /* =========================================
       5. CADASTRAR ESTUDANTE
    ========================================= */

    cadastroForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const nome = nomeInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;


        // Verificar campos

        if (!nome || !email || !password || !confirmPassword) {

            showMessage("Preencha todos os campos.");

            return;

        }


        // Verificar tamanho da senha

        if (password.length < 6) {

            showMessage("A senha precisa ter pelo menos 6 caracteres.");

            return;

        }


        // Confirmar senha

        if (password !== confirmPassword) {

            showMessage("As senhas não são iguais.");

            return;

        }


        // Desativar botão durante o cadastro

        cadastroButton.disabled = true;
        cadastroButton.textContent = "Criando conta...";

        showMessage("");


        try {

            // Criar usuário no Supabase

            const { data, error } = await supabaseClient.auth.signUp({

                email: email,

                password: password,

                options: {

                    data: {
                        nome: nome
                    }

                }

            });


            if (error) {

                throw error;

            }


            // Verificar resultado

            if (data.session) {

                showMessage(
                    "Conta criada com sucesso! Você já pode entrar.",
                    "#16a085"
                );

            } else {

                showMessage(
                    "Cadastro realizado! Verifique seu e-mail para confirmar a conta.",
                    "#16a085"
                );

            }


            // Limpar formulário

            cadastroForm.reset();


        } catch (error) {

            console.error("Erro no cadastro:", error);

            showMessage(
                "Não foi possível criar sua conta: " + error.message
            );


        } finally {

            // Reativar botão

            cadastroButton.disabled = false;

            cadastroButton.textContent = "Criar minha conta";

        }

    });

}
