# **Especificação de Casos de Uso**

## **Histórico da Revisão**

|      **Data**       | **Versão**  |                         **Descrição**                         |     **Autor**     |
| :-----------------: | :---------: | :-----------------------------------------------------------: | :---------------: |
| `       `13/07/2023 | `      `1.0 | `  `Especificação do Caso de Uso: Criar eventos no cronograma | `   `João Matheus |
| `       `13/07/2023 | `      `2.0 |   `             `Correções na Especificação do Caso de Uso    | `   `João Matheus |

<br>

## **Breve Descrição**

`	`Este caso de uso concede ao usuário a capacidade de criar eventos/atividades em um cronograma próprio de cada viagem. Portanto, estes eventos estarão diretamente ligados a uma única viagem, não sendo possível a criação de eventos para múltiplas viagens ao mesmo tempo.
<br></br>

## **Atores**

- Editor da viagem
- Criador da viagem
  <br></br>

## **Pré-Condições**

- Login
  - Para utilizar este caso de uso, é necessário que o usuário esteja “logado” na aplicação.
- Participar de uma viagem
  - Para utilizar este caso de uso, o usuário deve ter criado ou ter sido adicionado em pelo menos uma viagem.
    <br></br>

## **Fluxo Principal**

1. O usuário visualiza o calendário da viagem.
1. O usuário seleciona uma data pelo calendário. [ FE01 ] [ RN01 ]
1. O usuário seleciona a opção de criar um evento.
1. O sistema apresenta as informações a serem preenchidas para a criação de um novo evento. [ FE04 ]
1. O usuário preenche as informações e solicita a criação do evento.
1. O sistema valida as informações preenchidas. [ FE02 ] [ FE03 ] [ RN02 ]
1. O sistema apresenta a mensagem de criação realizada com sucesso.
1. O caso de uso é encerrado.
   <br></br>

## **Fluxo Alternativo**

`	`Este caso de uso não apresenta fluxos alternativos.
<br></br>

## **Fluxos de Exceção**

1. O usuário selecionou uma data inválida.

   a. No passo 2 do fluxo principal, se o usuário selecionar uma data inválida, o sistema não permitirá a criação de eventos até que o usuário selecione uma data válida. O sistema retorna ao passo 1 do fluxo principal.
     <br></br>

1. O usuário não digitou as informações necessárias.

   a. No passo 6 do fluxo principal, se o usuário deixar alguma informação obrigatória sem ser preenchida, o sistema impedirá a criação do evento até que o usuário insira tal informação. O sistema retorna ao passo 5 do fluxo principal.
     <br></br>

1. Validação dos dados inseridos.

   a. No passo 6 do fluxo principal, se o sistema verificar que as informações inseridas não são válidas (formato e/ou tamanho da inserção), o sistema impedirá a criação do evento e informará o usuário de qual informação causou tal problema. O sistema retorna ao passo 5 do fluxo principal.
     <br></br>

1. Cancelamento da criação do evento.

   a. No passo 4 do fluxo principal, se o usuário selecionar a opção de cancelar criação, o sistema retorna ao passo 8 do fluxo principal.

## **Regras de Negócio**

1. Validação da data selecionada.

   a. Para ser considerada válida, a data selecionada pelo usuário deve ser igual ou posterior em comparação a data atual do sistema, que segue o fuso horário de Brasília, DF (GMT-3).
     <br></br>

1. Validação de Informações.

   a. As seguintes validações devem ser realizadas:

|        Nome        |         Formato          | Obrigatoriedade |
| :----------------: | :----------------------: | :-------------: |
|      Horário       |          12:12           |       Sim       |
|       Local        | Texto até 100 caracteres |       Sim       |
|    Como chegar     | Texto até 200 caracteres |       Sim       |
|   Preço estimado   |         9999,99          |       Sim       |
| Informações Extras | Texto até 500 caracteres |       Não       |
