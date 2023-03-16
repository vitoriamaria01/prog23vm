# importacao das configurações comuns ao sistema
from config.configuracoes import *

# importar os modelos
from modelo.pessoa import *

# importação das rotas
# exercício: converter a importação abaixo para funcionar "de uma só vez"
# algo assim: from rotas import *
# o que é preciso fazer?
from rotas import incluir_pessoa
from rotas import listar_pessoas
from flask_sqlalchemy import SQLAlchemy

#from rotas import *

with app.app_context():
    db.create_all()
    CORS(app) # provendo o CORS ao sistema
    


    @app.route("/") # rota padrão
    def ola():
        return "backend operante"

    app.run(debug=True) # iniciar o servidor
