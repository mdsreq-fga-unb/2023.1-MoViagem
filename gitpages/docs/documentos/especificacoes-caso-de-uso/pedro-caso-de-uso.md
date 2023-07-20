# **Especificação de Casos de Uso**

## **Histórico da Revisão**

|      **Data**       | **Versão**  |                             **Descrição**                              |      **Autor**       |
| :-----------------: | :---------: | :--------------------------------------------------------------------: | :------------------: |
| `       `13/07/2023 | `      `1.0 | `  `Especificação do Caso de Uso: Editar informações básicas da viagem | `   `Pedro Rodiguero |

## **Breve Descrição**

Este caso de uso concede ao organizador da viagem a capacidade de criar instâncias de viagem, permitindo a criação de um novo registro de viagem com informações específicas. O usuário poderá preencher os campos necessários, como data de início, data de término, local e quantidade de pessoas. A criação dessa instância de viagem é exclusiva para cada viagem, não sendo possível criar eventos para múltiplas viagens ao mesmo tempo. Essa funcionalidade proporciona ao organizador uma forma eficiente de organizar e acessar informações relacionadas a uma viagem específica.

## **Atores**

- Editor da viagem
- Criador da viagem

## **Pré-Condições**

- Sign up
  - O usuário deve ter uma conta criada na aplicação.
- Login
  - Para utilizar este caso de uso, é necessário que o usuário esteja “logado” na aplicação.
- O usuário deve ter permissão para editar a viagem (no caso de um editor que não seja o criador da viagem)

## **Fluxo Principal**

1. O usuário seleciona uma das viagens criadas;
1. O usuário seleciona a opção de alterar dados da viagem;
1. O usuário altera:
    <br></br>
   a. Data da viagem;
   <br>
   b. Local da viagem;
   <br>
   c. Participantes da viagem;
   <br>
   d. Valores da viagem;
   <br>
   e. Transportes da viagem;
   <br>
   f. Tipo de estadia da viagem;
   <br>
   g. Dia de chegada da viagem;
   <br>
   h. Dia de saída da viagem;
   <br>
   i. Local da estadia da viagem;
   <br>
   j. Preço da estadia da viagem;
   <br>

1. O usuário confirma as alterações feitas;
1. O sistema valida as informações alteradas;
1. O caso de uso é encerrado.

## **Fluxo Alternativo**

Este caso de uso não apresenta fluxos alternativos.

## **Fluxos de Exceção**

1. O usuário não digitou as informações necessárias.
    <br></br>
   a. No passo 5 do fluxo principal, se o usuário deixar alguma informação obrigatória sem ser preenchida, o sistema impedirá a criação do evento até que o usuário insira tal informação. O sistema retorna ao passo 3 do fluxo principal.

1. Validação dos dados inseridos.
    <br></br>
   a. No passo 5 do fluxo principal, se o sistema verificar que as informações inseridas não são válidas (formato e/ou tamanho da inserção), o sistema impedirá a criação do evento e informará o usuário de qual informação causou tal problema. O sistema retorna ao passo 3 do fluxo principal.

## **Regras de Negócio**

1. Validação de Informações.
    <br></br>
   a. As seguintes validações devem ser realizadas:

|       Nome        |   Formato   | Obrigatoriedade |
| :---------------: | :---------: | :-------------: |
|       Local       |   Cidade    |       Sim       |
|   Dia de início   | 01/01/2024  |       Sim       |
|    Dia de fim     | 02/01/2023  |       Sim       |
|     Propósito     | Texto livre |       Não       |
| Número de pessoas |      3      |       Sim       |
|  Tipo de estadia  |    Hotel    |       Não       |
|  Dia de chegada   | 01/01/2024  |       Sim       |
|   Dia de saída    | 02/01/2023  |       Sim       |
|       Preço       |  R$100,00   |       Sim       |
|      Contato      | Texto livre |       Não       |
