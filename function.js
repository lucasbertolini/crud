//PESQUISANDO OS CLIENTES NO BANCO
function pesquisaClientes () {
    fetch('http://localhost:8080/cliente')
        .then((response)=>response.json())
        .then((data)=>listarClientes(data))
}
//PESQUISANDO UM CLIENTE ESPECIFICO
function detalharCliente(codigo_cliente) {
    fetch(`http://localhost:8080/cliente/${codigo_cliente}`)
    .then((response)=> response.json())
    .then((data)=>{
        $('#nome').val(data.name)
        $('#email').val(data.email)
        $('#tipo_pessoa').val(data.tipo_pessoa)
        $('#cpf').val(data.cpf)
        $('#cnpj').val(data.cnpj)
        $('#cep').val(data.cep)
        $('#endereco').val(data.endereco)
        $('#bairro').val(data.bairro)
        $('#cidade').val(data.cidade)
        $('#estado').val(data.estado)
        if(data.cpf == ''){
            $('#cnpj_form').removeClass('d-none');
            $('#cpf_form').addClass('d-none');
        }else{
            $('#cpf_form').removeClass('d-none');
            $('#cnpj_form').addClass('d-none');
        }
    })
}
//SALVANDO UM CLIENTE NOVO
function adicionaCliente(conteudo) {
    fetch('http://localhost:8080/cliente',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(conteudo)
    })
    .then((response)=> response.json())
    .then((data)=>console.log(data))
}

//DELETANDO UM CLIENTE
function deletaCliente(codigo_cliente) {
    fetch(`http://localhost:8080/cliente/${codigo_cliente}`,{
        method:'DELETE'
    })
    .then((response)=> response.json())
    .then((data)=>console.log(data))
}

//ALTERANDO UM CLIENTE
function alteraCliente(codigo_cliente,conteudo) {
    fetch(`http://localhost:8080/cliente/${codigo_cliente}`,{
        method:'PUT',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(conteudo)
    })
    .then((response)=> response.json())
    .then((data)=>console.log(data))
}
//ALTERA TITULO DO MODAL
function alteraTitulo(){
    let codigo = $('#codigo_cliente').val();
    codigo==0?$('#titulo_modal').html('Adicionar registro'):$('#titulo_modal').html('Visualizar cliente');
};

//LISTANDO OS CLIENTES
function listarClientes(data){
    let location = $('.table-responsive tbody')[0];
        for(i=0; i<data.length; i++){

            let tr = document.createElement('tr'),
                tipo = data[i].cpf==''?'cnpj' : 'cpf';
            location.appendChild(tr);
            createTd(data[i].name, tr);
            createTd(data[i].cpf==''? data[i].cnpj : data[i].cpf, tr, tipo);
            createTd(data[i].email, tr);
            createTdButton(tr, data[i].id);
        }

        $('button[action="detalhar_cliente"]').on('click',(event)=> {
            let codigo_cliente = $(event.target).closest('button').attr('codigo_cliente');
            detalharCliente(codigo_cliente);
            $('#codigo_cliente').val(codigo_cliente);
            alteraTitulo();
            $('#adiciona_modal').modal('show');    
        });
            
        $('button[action="remover_cliente"]').on('click',(event)=> {
            let codigo_cliente = $(event.target).closest('button').attr('codigo_cliente');
            deletaCliente(codigo_cliente);  
            window.location.reload();    
        });
}

//CRIANDO AS TD DA TABELA
function createTd(texto, location, tipo){
    let td = document.createElement('td');
    td.innerHTML = texto;
    if(tipo){
        $(td).attr('class',tipo)
    }
    location.appendChild(td);
}

//CRIANDO OS BOTOES
function createTdButton(location, codigo_cliente){

    let tdVisualiza = document.createElement('td'),
        tdDeleta = document.createElement('td')
        buttonVisualiza = document.createElement('button'),
        buttonDeleta = document.createElement('button'),
        iconeVisualiza = document.createElement('i'),
        iconeDeleta = document.createElement('i');

    //ADICIONANDO OS ATRIBUTOS AO BOTAO
    $(buttonVisualiza).attr('class', 'btn btn-primary');
    $(buttonVisualiza).attr('action','detalhar_cliente');
    $(buttonVisualiza).attr('codigo_cliente',codigo_cliente);
    $(iconeVisualiza).attr('class','fa-solid fa-eye');
    
    buttonVisualiza.appendChild(iconeVisualiza);
    tdVisualiza.appendChild(buttonVisualiza);
    
    //ADICIONANDO OS ATRIBUTOS AO BOTAO
    $(buttonDeleta).attr('class','btn btn-danger');
    $(buttonDeleta).attr('action','remover_cliente');
    $(buttonDeleta).attr('codigo_cliente',codigo_cliente);
    $(iconeDeleta).attr('class','fa-solid fa-xmark fa-lg');

    buttonDeleta.appendChild(iconeDeleta);
    tdDeleta.appendChild(buttonDeleta);
    //INSERINDO ELES NO DOM 
    location.appendChild(tdVisualiza);
    location.appendChild(tdDeleta);
}

function limpaCampos() {
    $('#nome').val('')
    $('#email').val('')
    $('#tipo_pessoa').val('F')
    $('#cpf').val('')
    $('#cnpj').val('')
    $('#cep').val('')
    $('#endereco').val('')
    $('#bairro').val('')
    $('#cidade').val('')
    $('#estado').val('')
}