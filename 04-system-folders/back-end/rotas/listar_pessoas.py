from config.configuracoes import *
from modelo.pessoa import *

@app.route("/listar_pessoas")
def listar_pessoas():
    try:
        # obter as pessoas em formato json
        # "for" em uma linha só
        lista = db.session.query(Pessoa).all()
        lista_retorno = [x.json() for x in lista]

        # eu penei pra achar o erro abaixo; você consegue perceber?
        # lista_retorno = [x.json for x in lista]

        # preparar uma parte da resposta: resultado ok
        
        # não funciona assim :-( 
        # meujson = {"resultado": "ok", "detalhes": lista_retorno}

        # então... fazemos por partes
        meujson = {"resultado": "ok"}
        meujson.update({"detalhes": lista_retorno})
        
        # retornar a lista de pessoas json, com resultado ok
        resposta = jsonify(meujson)
        return resposta
    except Exception as e:
        resposta = jsonify({"resultado": "erro", "detalhes": str(e)})