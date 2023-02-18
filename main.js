$('button[data-action="abrir_modal"]').on('click',()=>{
    $('#codigo_cliente').val('0');
    $('#cpf_form').removeClass('d-none');
    $('#cnpj_form').addClass('d-none');
    alteraTitulo();
    limpaCampos();
    $('#adiciona_modal').modal('show');
    
});

$('#form-container').on('submit',()=>{
    let nome = $('#nome').val(),
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
        if(codigo_cliente == '0'){
            adicionaCliente(conteudo);            
        }else{
            alteraCliente(codigo_cliente,conteudo)
        }
        
})
//ALTERA OS CAMPOS DE CPF OU CNPJ DEPENDENDO DO TIPO DE PESSOA SELECIONADO
$('#tipo_pessoa').on('change',(event)=> {
    switch(event.target.value){
        case 'J':
            $('#cnpj_form').removeClass('d-none');
            $('#cpf_form').addClass('d-none');
            break;
        case 'F':
            $('#cpf_form').removeClass('d-none');
            $('#cnpj_form').addClass('d-none');
            
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
                $('#endereco').val(data.logradouro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
                $('#bairro').val(data.bairro);
            }
        )
    }
});

//APLICANDO MASCARAS
$('#cnpj').mask('00.000.000/0000-00',{reverse:true});
$('#cpf').mask('000.000.000-00',{reverse:true});
$('#cep').mask('00000-000');

$(window).on('load',pesquisaClientes());
