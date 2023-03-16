# 04-system-folders

## Features

- Funcionalidades organizadas em pastas
-- config (bibliotecas), frontend (HTML+CSS+JS), modelo (classes), rotas, testes (testes das classes)
- Importação de módulos javascript
-- Códigos repetidos podem ser isolados em biblioteca de utilitários
-- Necessidade de rodar o front-end em um servidor web para permitir a importação de javascript (módulos)
- Persistência simulada (em memória)
-- Uma lista armazena os dados no backend enquanto o sistema é utilizado
 
## Execução
Para executar o back-end: entrar na pasta "back-end", e depois:
```python3 executar_backend.py```

Para executar o front-end: acessar a pasta do front-end no terminal (cd), e depois:
```python3 -m http.server```
Acessar no navegador: localhost:8000
