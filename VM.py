from flask import Flask

app = Flask(__name__)

@app.route("/")
def ola():
    return "<b>Olá, gente!</b>"

app.run()


idade = int(input("digite sua idade:"))

nome = input("digite seu nome:")
