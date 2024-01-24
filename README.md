SELEÇÃO PARA CARGO DE PROGRAMADOR - POLÍCIA CIVIL
O programador deve criar um pequeno formulário usando:
● NextJS - https://nextjs.org/
● React Hook Form - https://www.react-hook-form.com/
● MUI - https://mui.com/material-ui
Deve adaptar o componente Autocomplete (Asynchronous requests - Load on open -
https://mui.com/material-ui/react-autocomplete/#load-on-open) para que o mesmo utilize o
useFormContext do React Hook Form.
O formulário deve conter os seguintes campos:
● Pessoa (Deve consultar de uma lista pré-definida seguindo o formato do anexo I) - À
medida que a pessoa vai digitando o nome, ele vai buscando e retornando.
● Telefone
● E-mail
● Botão enviar
Não é necessário salvar em nenhum local, bastando ao clicar em enviar, mostrar no
console.log dos dados do formulário no formato:
{
"pessoa": 1,
"telefone": "85 98877665544",
"email": "teste@email.com"
}
ANEXO I
[{
"id": 1,
"nome": "Carlos Silva Lima"
},
{
"id": 2,
"nome": "Carlito Ramos Junior"
},
{
"id": 3,
"nome": "Paulo Felipe Castro"
}]
Fica a critério do programador utilizar o ZOD para validação, json-server para expor a lista
de pessoas ou outros componentes que achar necessário.
Ao finalizar enviar link ou aplicação zipada para: desenvolvimento.detic@gmail.com