
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

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginMessage = document.getElementById("loginMessage");
const loginButton = document.getElementById("loginButton");
const togglePassword = document.getElementById("togglePassword");
const forgotPassword = document.getElementById("forgotPassword");


/* =========================================
   3. CAMINHO DA PÁGINA INICIAL
========================================= */

const HOME_URL = new URL(
    "./paginas/home.html",
    window.location.href
).href;


/* =========================================
   4. EXIBIR MENSAGENS
========================================= */

function showMessage(message, color = "#e04444") {

    if (!loginMessage) return;

    loginMessage.textContent = message;
    loginMessage.style.color = color;

}


/* =========================================
   5. REDIRECIONAR PARA HOME
========================================= */

function redirecionarHome() {

    console.log("Redirecionando para:", HOME_URL);

    window.location.assign(HOME_URL);

}


/* =========================================
   6. MOSTRAR E OCULTAR SENHA
========================================= */

if (togglePassword && passwordInput) {

    togglePassword.addEventListener("click", () => {

        const mostrar = passwordInput.type === "password";

        passwordInput.type = mostrar ? "text" : "password";

        togglePassword.textContent = mostrar
            ? "Ocultar"
            : "Mostrar";

    });

}


/* =========================================
   7. VERIFICAR SESSÃO EXISTENTE
========================================= */

async function verificarSessao() {

    try {

        const { data, error } =
            await supabaseClient.auth.getSession();

        if (error) throw error;

        if (data.session) {

            console.log("Usuário já está conectado.");

            redirecionarHome();

        }

    } catch (error) {

        console.error(
            "Erro ao verificar sessão:",
            error
        );

    }

}

verificarSessao();


/* =========================================
   8. REALIZAR LOGIN
========================================= */

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (!emailInput || !passwordInput || !loginButton) {
            showMessage("Erro ao carregar os campos do login.");
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email || !password) {

            showMessage("Preencha todos os campos.");

            return;

        }

        loginButton.disabled = true;

        const buttonText = loginButton.querySelector("span");

        if (buttonText) {
            buttonText.textContent = "Entrando...";
        }

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

            console.log(
                "Login realizado:",
                data.user.email
            );

            redirecionarHome();

        } catch (error) {

            console.error("Erro no login:", error);

            showMessage(
                "Não foi possível entrar. Confira seu e-mail e sua senha."
            );

            loginButton.disabled = false;

            if (buttonText) {
                buttonText.textContent = "Entrar na minha conta";
            }

        }

    });

} else {

    console.error("Formulário de login não encontrado.");

}


/* =========================================
   9. RECUPERAÇÃO DE SENHA
========================================= */

if (forgotPassword) {

    forgotPassword.addEventListener("click", async (event) => {

        event.preventDefault();

        if (!emailInput) return;

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

            console.error(
                "Erro na recuperação:",
                error
            );

            showMessage(
                "Não foi possível enviar o e-mail. Tente novamente."
            );

        }

    });

}

