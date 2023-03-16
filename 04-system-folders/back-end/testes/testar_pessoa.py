from modelo.pessoa import *

def executar():

    # teste da classe
    p1 = Pessoa(nome = "João da Silva", 
                email = "josilva@gmail.com",  
                telefone = "47 99012 3232")
                
    # exibir em formato textual
    print(p1)

    # exibir em format json
    print(p1.json())