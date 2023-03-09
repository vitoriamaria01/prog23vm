
// proteção para não executar o javascript antes do documento estar pronto
$(function () {

    // conecta o botão de enviar à ação javascript/jquery
    $(document).on("click", "#btIncluir", function () {

        // rota que vai ser chamada no backend
        var rota = 'http://localhost:5000/incluir_pessoa';

        // OBTENÇÃO DOS DADOS DO FORMULÁRIO

        // antigamente, a gente pegava campo-por-campo, veja só:
        // https://github.com/hvescovi/dw2ed/blob/main/fund/webap/monopy/03-post/front-end/js/meuscript.js#L6
        //        ERA ASSIM
        //        nome = $("#campoNome").val();
        //        email = $("#campoEmail").val();
        //        tel = $("#campoTelefone").val();
        //        var dados = JSON.stringify({ nome: nome, email: email, telefone: tel });
        // mas agora... a gente EMPACOTA DE UMA VEZ o form :-)
        // https://stackoverflow.com/questions/2276463/how-can-i-get-form-data-with-javascript-jquery
        // vamos lá:
        var vetor_dados = $("#meuformularioquerido").serializeArray();

        // vamos ver no console como isso vem
        // um vetor com três pares chave/valor!!!
        // [{name: 'nome', value: 'Maria Oliveira'}
        // {name: 'email', value: 'maliv@gmail.com'}
        // {name: 'telefone', value: '47 91234 6789'}]
        console.log("dados obtidos do serialize:");
        console.log(vetor_dados);

        // vamos percorrer tudo e unificar em um único
        // vetor chave:valor
        var chave_valor = {};
        for (var i = 0; i < vetor_dados.length; i++) {
            chave_valor[vetor_dados[i]['name']] = vetor_dados[i]['value'];
        }

        // e agora, como ficou?                
        // {nome: 'Maria Oliveira', email: 'maliv@gmail.com', telefone: '47 91234 6789'}
        console.log("dados convertidos para chave e valor:");
        console.log(chave_valor);

        // convertendo para JSON!!
        var dados_json = JSON.stringify(chave_valor);

        // por fim, ficou como? Bonitinho, com aspas duplas :-)
        // {"nome":"Maria Oliveira","email":"maliv@gmail.com","telefone":"47 91234 6789"}
        console.log("dados em json :-)");
        console.log(dados_json);

        // chamada ajax
        var acao = $.ajax({
            url: rota,
            method: 'POST',
            dataType: 'json', // os dados são recebidos no formato json,
            contentType: 'application/json', // os dados serão enviados em json
            data: dados_json
        });

        // se a chamada der certo
        acao.done(function (retorno) {
            try {
                if (retorno.resultado == "ok") {
                    alert("Que beleza, deu certo, pessoa cadastrada " +
                        "(só na memória do computador, por hoje, " +
                        "não vai ficar gravada no banco de dados ainda)");
                } else {
                    alert("Deu algum erro :-( verifique)");
                }
            } catch (error) { // se algo der errado...
                alert("Erro ao tentar fazer o ajax: " + error +
                    "\nResposta da ação: " + retorno);
            }
        });

        // se a chamada der erro
        acao.fail(function (jqXHR, textStatus) {
            mensagem = encontrarErro(jqXHR, textStatus, rota);
            alert("Erro na chamada ajax: " + mensagem);
        });

        // função para encontrar o erro
        // https://stackoverflow.com/questions/6792878/jquery-ajax-error-function 
        function encontrarErro(jqXHR, textStatus, rota) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Não foi possível conectar, ' +
                    'verifique se o endereço do backend está certo' +
                    ' e se o backend está rodando.';
            } else if (jqXHR.status == 404) {
                msg = 'A URL informada não foi encontrada no ' +
                    'servidor [erro 404]: ' + rota;
            } else if (jqXHR.status == 500) {
                msg = 'Erro interno do servidor [erro 500], ' +
                    'verifique nos logs do servidor';
            } else if (textStatus === 'parsererror') {
                msg = 'Falha ao decodificar o resultado json';
            } else if (textStatus === 'timeout') {
                msg = 'Tempo excessivo de conexão, estourou o limite (timeout)';
            } else if (textStatus === 'abort') {
                msg = 'Requisição abortada (abort)';
            } else {
                msg = 'Erro desconhecido: ' + jqXHR.responseText;
            }
            return msg;
        }

    }); // fim click btIncluir

});



// chamada ao backend
var rota = 'http://localhost:5000/listar_pessoas';

// chamada ajax
var acao = $.ajax({
    url: rota,
    //method: 'GET',
    dataType: 'json', // os dados são recebidos no formato json,
});

// se a chamada der certo
acao.done(function (retorno) {
    // faz uma proteção contra erros
    try {
        if (retorno.resultado == "ok") {
            // percorrer a lista de pessoas retornadas; 
            for (var p of retorno.detalhes) { //p vai valer cada pessoa do vetor de pessoas
                // https://stackoverflow.com/questions/8069663/avoiding-html-in-string-html-in-a-jquery-script
                // criar um parágrafo
                var paragrafo = $("<p>");
                // informar o HTML deste parágrafo
                // observe o apóstrofo inclinado, para interpretar as variáveis
                paragrafo.html(`==> ${p.nome}, ${p.email}`);
                // adicionar o parágrafo criado na div
                $('#listagem').append(paragrafo);
            }
        } else {
            alert("Erro informado pelo backend: " + retorno.detalhes);
        }
    } catch (error) { // se algo der errado...
        alert("Erro ao tentar fazer o ajax: " + error +
            "\nResposta da ação: " + retorno.detalhes);
    }
});

// se a chamada der erro
acao.fail(function (jqXHR, textStatus) {
    mensagem = encontrarErro(jqXHR, textStatus, rota);
    alert("Erro na chamada ajax: " + mensagem);
});

// função para encontrar o erro
// https://stackoverflow.com/questions/6792878/jquery-ajax-error-function 
function encontrarErro(jqXHR, textStatus, rota) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Não foi possível conectar, ' +
            'verifique se o endereço do backend está certo' +
            ' e se o backend está rodando.';
    } else if (jqXHR.status == 404) {
        msg = 'A URL informada não foi encontrada no ' +
            'servidor [erro 404]: ' + rota;
    } else if (jqXHR.status == 500) {
        msg = 'Erro interno do servidor [erro 500], ' +
            'verifique nos logs do servidor';
    } else if (textStatus === 'parsererror') {
        msg = 'Falha ao decodificar o resultado json';
    } else if (textStatus === 'timeout') {
        msg = 'Tempo excessivo de conexão, estourou o limite (timeout)';
    } else if (textStatus === 'abort') {
        msg = 'Requisição abortada (abort)';
    } else {
        msg = 'Erro desconhecido: ' + jqXHR.responseText;
    }
    return msg;
}
