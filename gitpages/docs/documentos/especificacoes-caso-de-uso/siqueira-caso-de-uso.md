# **Especificação de Casos de Uso**

## **Histórico da Revisão**

|      **Data**       | **Versão**  |                                    **Descrição**                                     |                 **Autor**                  |
| :-----------------: | :---------: | :----------------------------------------------------------------------------------: | :----------------------------------------: |
| 13/07/2023 | 1.0 | <p>`  `Especificação do Caso de Uso: Adicionar participantes na viagem</p> | <p>`   `Mateus de Siqueira</p> |
| 19/07/2023 | 1.1 | <p>`  `Especificação do Caso de Uso: Adicionar participantes na viagem</p> | <p>`   `Mateus de Siqueira</p> |

## **Breve Descrição**

`	`Este caso de uso concede ao usuário criador da viagem a capacidade de adicionar outros participantes à viagem. Estes participantes estarão diretamente ligados a uma única viagem. Entretanto, os criadores poderão adicionar outros usuários a todas as suas viagens.

## **Atores**

- Criador da viagem
- Editor da viagem

## **Pré-Condições**

- Ter criado uma conta
  - Para acesso do Caso de Uso terá que ter criado uma conta anteriormente;
- Login
  - Para utilizar este caso de uso, é necessário que o usuário esteja “logado” na aplicação.
- Criação de uma viagem
  - Para utilizar este caso de uso, o usuário deve ter criado uma viagem.

## **Fluxo Principal**

1. O usuário seleciona a aba de participantes da viagem.
1. O usuário seleciona a opção de adicionar um participante na viagem
1. O usuário coloca na entrada do formulário o e-mail do usuário que ele deseja que participe da viagem com ele.
1. O usuário seleciona o botão de adicionar participante.
1. O sistema faz a validação dos dados inseridos e verifica se há um usuário com o email fornecido. [ FE01 ] [ FE02 ] [ RN01 ]
1. O sistema confirma a criação do evento.
1. O sistema atualiza a listagem de participantes.
1. O caso de uso é encerrado.

## **Fluxo Alternativo**

Este caso de uso não possui fluxos alternativos.

## **Fluxos de Exceção**

1. O usuário não digita uma entrada válida.
   <br></br>
   a. No passo 5 do fluxo principal, se o usuário digitar um email errado o sistema impedirá a adição do participante até que o usuário insira a informação corretamente. O sistema retorna ao passo 3 do fluxo principal.

1. Usuário não identificado
   <br></br>
   a. No passo 5 do fluxo principal, se o sistema verificar que não existe um usuário com o email fornecido ele retornará uma alerta dizendo que o usuário em questão não existe no sistema. O sistema retorna ao passo 3 do fluxo principal.

## **Regras de Negócio**

1. Validação de Informações.
   <br></br>
   a. As seguintes validações devem ser realizadas:

| Entrada |     Formato     | Obrigatoriedade |
| :-----: | :-------------: | :-------------: |
|  Email  | email@email.com |       Sim       |
