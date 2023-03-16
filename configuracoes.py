''' 
configurações:
* importação de bibliotecas
* vínculo da aplicação flask
* configurações de persistência
'''

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import os


app = Flask(__name__)

caminho = os.path.dirname(os.path.abspath(__file__))
# concatenar o caminho com o nome do arquivo de banco de dados
arquivobd = os.path.join(caminho, 'pessoas.db')
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///" + arquivobd
# vínculo com o SQLAlchemy
db = SQLAlchemy(app) 


# temporário: persistência em memória
# criar uma lista de pessoas
# essa lista fica acessível para todas as rotas
#lista = []
