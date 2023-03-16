from config.configuracoes import *
from modelo.pessoa import *

@app.route("/incluir_pessoa", methods=['POST'])
def incluir():
    dados = request.get_json()
    try:
        # cria a pessoa 
        nova = Pessoa(**dados)
        # realiza a persistência da nova pessoa
        #lista.append(nova)
        db.session.add(nova)
        db.session.commit()

 # tudo certo :-) resposta de sucesso
        return jsonify({"resultado": "ok", "detalhes":"ok"})
    except Exception as e:
        # informar mensagem de erro
        return jsonify({"resultado": "erro", "detalhes":str(e)})