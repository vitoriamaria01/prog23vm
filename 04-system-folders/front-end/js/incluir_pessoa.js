// importação de um arquivo javascript :-)
import { encontrarErro } from './utilitarios.js';

// proteção para não executar o javascript antes do documento estar pronto
$(function () {

    // conecta o botão de enviar à ação javascript/jquery
    $(document).on("click", "#btIncluir", function () {

        // rota que vai ser chamada no backend
        var rota = 'http://localhost:5000/incluir_pessoa';

        var vetor_dados = $("#meuformularioquerido").serializeArray();

        // converter para {chave:valor, chave:valor, ...}
        var chave_valor = {};
        for (var i = 0; i < vetor_dados.length; i++) {
            chave_valor[vetor_dados[i]['name']] = vetor_dados[i]['value'];
        }

        // convertendo para JSON!!
        var dados_json = JSON.stringify(chave_valor);

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
                    alert("tudo cert :-)");
                } else {
                    alert("Deu algum erro :-( " + retorno.detalhes);
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

    }); // fim click btIncluir

});