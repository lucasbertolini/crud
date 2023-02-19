$('button[data-action="abrir_modal"]').on('click',()=>{
    $('#codigo_cliente').val('0');
    $('#cpf_form').removeClass('d-none');
    $('#cnpj_form').addClass('d-none');
    alteraTitulo();
    limpaCampos();
    $('#adiciona_modal').modal('show');
    
});

$('#form-container').on('submit',()=>{
    let documento_validado = false,
        nome = $('#nome').val(),
        email =  $('#email').val(),
        tipo_pessoa =$('#tipo_pessoa').val(),
        cpf =  $('#cpf').val(),
        cnpj =  $('#cnpj').val(),
        cep =  $('#cep').val(),
        endereco =  $('#endereco').val(),
        bairro =  $('#bairro').val(),
        cidade =  $('#cidade').val(),
        estado =  $('#estado').val(),
        codigo_cliente = $('#codigo_cliente').val(),
        conteudo = {
            'name': nome,
            'email': email,
            'tipo_pessoa': tipo_pessoa,
            'cpf': cpf,
            'cnpj': cnpj,
            'cep' : cep, 
            'endereco': endereco,
            'bairro': bairro,
            'cidade': cidade,
            'estado' : estado
        }
        if(cpf!= ''){
          documento_validado = validaCPF(cpf)
        }else{
            documento_validado = validaCNPJ(cnpj);
        }
    
        if(documento_validado){
            
            if(codigo_cliente == '0'){
                adicionaCliente(conteudo);            
            }else{
                alteraCliente(codigo_cliente,conteudo)
            }
        }else{
            alert('Confirme o número do documento, número inserido inválido!');
            return false;
        }  
})
//ALTERA OS CAMPOS DE CPF OU CNPJ DEPENDENDO DO TIPO DE PESSOA SELECIONADO
$('#tipo_pessoa').on('change',(event)=> {
    switch($(event.target).val()){
        case 'J':
            $('#cnpj_form').removeClass('d-none');
            $('#cpf_form').addClass('d-none');
            $('#cpf').val('');
            break;
        case 'F':
            $('#cpf_form').removeClass('d-none');
            $('#cnpj_form').addClass('d-none');
            $('#cnpj').val('');
        break;
    }
});

//PESQUISA O CEP PARA PREENCHIMENTO AUTOMATICO
$('#cep').on('change',(event)=> {
    let cep = $(event.target).val()
    //CASO FOR 8 DIGITOS PROSSEGUE
    if(/[0-9]+-[0-9]+/.test(cep)){
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then((response)=>response.json())
            .then((data)=>{
                if(data.erro){
                    alert('CEP inválido!');
                    return false;
                }
                $('#endereco').val(data.logradouro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
                $('#bairro').val(data.bairro);
            })
    }else{
        alert('CEP inválido!');
        return false;
    }
});

//APLICANDO MASCARAS
$('#cnpj').mask('00.000.000/0000-00',{reverse:true});
$('#cpf').mask('000.000.000-00',{reverse:true});
$('#cep').mask('00000-000');

$(window).on('load',pesquisaClientes());
