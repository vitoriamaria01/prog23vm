// importação de um arquivo javascript :-)
import { encontrarErro } from './utilitarios.js';

// proteção para não executar o javascript antes do documento estar pronto
$(function () {

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

});