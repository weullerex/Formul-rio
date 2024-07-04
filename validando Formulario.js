class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);   
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const camposValidos = this.camposSaoValidos();
        const senhasValidas = this.senhasSaoValidas(); 

        if(camposValidos && senhasValidas){
            alert('Formulario enviado');
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetir-senha'); 

        if(senha.value !== repetirSenha.value){
            valid = false;
            this.criaErro(senha, 'As senhas não são iguais');
            this.criaErro(repetirSenha, 'As senhas não são iguais');
        }

        if(senha.value.length < 6 || senha.value.length > 12){
            valid = false;
            this.criaErro(senha, 'A senha precisa ter entre 6 e 12 caracteres');
        }

        return valid;
    }   

    camposSaoValidos() {
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.errorText')) {
        errorText.remove()};

        for(let campo of this.formulario.querySelectorAll('.validar')) {
            const label = campo.previousElementSibling.innerText;

            if(!campo.value) {
                this.criaErro(campo, `Campo "${label}" nao pode estar em branco.`);
                valid = false;
                continue;
            }

            if(campo.classList.contains('cpf')) {
                if(!this.validaCPF(campo)) valid = false;
            }

            if(campo.classList.contains('usuario')) {
                if(!this.validaUsuario(campo)) valid = false;
            }

        }

        return valid;
    }

    validaUsuario(campo){
        const usuario = campo.value;
        let valid = true;

        if(usuario.length <3 || usuario.length >12){
            this.criaErro(campo, 'Usuário deve conter de 3 a 12 caracteres.');
            valid = false;
        }
        
        if(!usuario.match(/[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, 'Usuário deve conter apenas letras e/ou números.');
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if(!cpf.valida()) {
            this.criaErro(campo, 'CPF invalido.');
            return false;
        }

        return true;
    }

    criaErro(campo, msg) {
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add ('errorText');
        campo.insertAdjacentElement('afterend', div)    ;
    }
}
const valida = new ValidaFormulario ();