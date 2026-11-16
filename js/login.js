
/* =========================================
   1. CONFIGURAÇÃO DO SUPABASE
========================================= */

const SUPABASE_URL = "SUA_URL_DO_SUPABASE";
const SUPABASE_KEY = "SUA_CHAVE_ANON_PUBLIC";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   2. ELEMENTOS DA TELA
========================================= */

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");


/* =========================================
   3. CAMINHOS
========================================= */

const HOME_URL = new URL(
    "./paginas/home.html",
    window.location.href
).href;

const LOGIN_URL = new URL(
    "./index.html",
    window.location.href
).href;


/* =========================================
   4. MENSAGENS
========================================= */

function showMessage(message, color = "#e04444") {

    loginMessage.textContent = message;
    loginMessage.style.color = color;

}


/* =========================================
   5. MOSTRAR E OCULTAR SENHA
========================================= */

if (togglePassword) {

    togglePassword.addEventListener("click", () => {

        const mostrar = passwordInput.type === "password";

        passwordInput.type = mostrar ? "text" : "password";

        togglePassword.textContent = mostrar ? "Ocultar" : "Mostrar";

    });

}


/* =========================================
   6. VERIFICAR SESSÃO EXISTENTE
========================================= */

async function verificarSessao() {

    try {

        const { data, error } =
            await supabaseClient.auth.getSession();

        if (error) throw error;

        if (data.session) {

            window.location.replace(HOME_URL);

        }

    } catch (error) {

        console.error("Erro ao verificar sessão:", error);

    }

}

verificarSessao();


/* =========================================
   7. REALIZAR LOGIN
========================================= */

loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {

        showMessage("Preencha todos os campos.");

        return;

    }

    loginButton.disabled = true;

    const buttonText = loginButton.querySelector("span");

    buttonText.textContent = "Entrando...";

    showMessage("");

    try {

        const { data, error } =
            await supabaseClient.auth.signInWithPassword({

                email: email,
                password: password

            });

        if (error) throw error;

        if (!data.session) {

            throw new Error("Sessão não encontrada.");

        }

        showMessage(
            "Login realizado com sucesso!",
            "#16a085"
        );

        window.location.replace(HOME_URL);

    } catch (error) {

        console.error("Erro no login:", error);

        showMessage(
            "E-mail ou senha inválidos. Tente novamente."
        );

        loginButton.disabled = false;

        buttonText.textContent = "Entrar na minha conta";

    }

});


/* =========================================
   8. RECUPERAÇÃO DE SENHA
========================================= */

forgotPassword.addEventListener("click", async (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {

        showMessage(
            "Digite seu e-mail para recuperar a senha."
        );

        emailInput.focus();

        return;

    }

    try {

        const { error } =
            await supabaseClient.auth.resetPasswordForEmail(
                email,
                {
                    redirectTo: new URL(
                        "./redefinir-senha.html",
                        window.location.href
                    ).href
                }
            );

        if (error) throw error;

        showMessage(
            "Verifique seu e-mail para redefinir sua senha.",
            "#16a085"
        );

    } catch (error) {

        console.error("Erro na recuperação:", error);

        showMessage(
            "Não foi possível enviar o e-mail. Tente novamente."
        );

    }

});
