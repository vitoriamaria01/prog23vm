# tem um novo import aqui: request
from flask import Flask, jsonify, request
from flask_cors import CORS
from pessoa import *

app = Flask(__name__)
with app.app_context():
    CORS(app)

    @app.route("/")
    def ola():
        return "operação post"

    # rota de listar pessoas
    @app.route("/incluir_pessoa", methods=['POST'])
    def incluir():
        # receber as informações da nova pessoa
        dados = request.get_json() #(force=True) dispensa Content-Type na requisição
        try: # tentar executar a operação
            nova = Pessoa(**dados) # criar a nova pessoa

            # faz a persistência da nova pessoa... :-/ em breve :-p

            return jsonify({"resultado":"ok"})
        except Exception as e: # em caso de erro...
            # informar mensagem de erro
            return jsonify({"resultado":"erro"})
        

    @app.route("/listar_pessoas")
    def listar():
        try:
            # criar uma lista vazia para retorno das informações
            lista_retorno = []
            # criar uma lista de pessoas
            lista = [
                Pessoa(nome="João da Silva",
                      email="josilva@gmail.com",
                      telefone="47 99012 3232",
                      nascimento="01/01/2000"),
                Pessoa(nome="Maria Oliveira",
                      email="maliva@gmail.com",
                      telefone="47 98823 4321",
                      nascimento="03/09/2915"),
                Pessoa(nome="Teresa Soares",
                      email="teso@gmail.com",
                      telefone="47 98114 1423",
                      nascimento="11/05/2005"),
            ]
            # percorrer a lista de pessoas
            for p in lista:
                # adicionar na lista de retorno a pessoa em formato json
                lista_retorno.append(p.json())

            # preparar uma parte da resposta: resultado ok
            meujson = {"resultado":"ok"}
            # preparar a outra parte da resposta: os resultados em si
            # o comando abaixo atualiza um dicionário, fazendo um "merge" entre eles
            meujson.update({"detalhes":lista_retorno})
            # retornar a lista de pessoas json, com resultado ok
            resposta = meujson
            #x = 1 /0 # simular erro de divisão por zero
            # é preciso remover o debug=True para que o servidor
            # trate corretamente esse erro
        except Exception as e: 
            resposta = jsonify({"resultado": "erro", "detalhes": str(e)})
    
        
        # talvez seja preciso REMOVER debug=True PARA OBSERVAR OS ERROS ABAIXO
        #return jsonify([{"numero":"123"}]) 
        #return jsonify({"numero":"123"})  
        #return "{123}" # falha ao decodificar json, não está no formato {"chave":valor}

        return resposta








    
    app.run(debug=True)

    # para depurar a aplicação web no VSCode, é preciso remover debug=True
    # https://stackoverflow.com/questions/17309889/how-to-debug-a-flask-app

'''
* resultado da invocação ao servidor:

$ curl localhost:5000/incluir_pessoa -X POST -d '{"nome":"John Stick", "email":"jostick@gmail.com","telefone":"47 9 9222 1234"}' -H "Content-Type:application/json"
{
  "resultado": "ok"
}

* se esquecer de dizer que é POST, funciona também, 
porque ele já assume que é POST, 
pois você está enviando dados

$ curl localhost:5000/incluir_pessoa -d '{"nome":"John Stick", "email":"jostick@gmail.com","telefone":"47 9 9222 1234"}' -H "Content-Type:application/json"
{
  "resultado": "ok"
}

* agora, se esquecer o contenttype, aí dá ruim...

$ curl localhost:5000/incluir_pessoa -d '{"nome":"John Stick", "email":"jostick@gmail.com","telefone":"47 9 9222 1234"}'
<!doctype html>
<html lang=en>
<title>400 Bad Request</title>
<h1>Bad Request</h1>
<p>Did not attempt to load JSON data because the request Content-Type was not &#39;application/json&#39;.</p>

* se enviar nome de campo errado (telefoneABC em vez de telefone), olha lá o erro...

$ curl localhost:5000/incluir_pessoa -X POST -d '{"nome":"John Stick", "email":"jostick@gmail.com","telefoneABC":"47 9 9222 1234"}' -H "Content-Type:application/json"
{
  "resultado": "erro"
}

'''
