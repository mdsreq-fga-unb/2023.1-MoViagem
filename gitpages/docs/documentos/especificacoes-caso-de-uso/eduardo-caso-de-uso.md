# **Especificação de Casos de Uso**

## **Histórico da Revisão**

|      **Data**       | **Versão**  |                        **Descrição**                         |       **Autor**        |
| :-----------------: | :---------: | :----------------------------------------------------------: | :--------------------: |
| `       `13/07/2023 | `      `1.0 | `  `Especificação do Caso de Uso: Definir editores da viagem | `   `Eduardo Rodrigues |

## **Breve Descrição**

`	`Este caso de uso concede a possibilidade de um criador de viagens conceder a um participante de sua viagem permissão para editar dados como transporte, estadia e datas dessa viagem.

## **Atores**

- Participante da viagem
- Criador da viagem

## **Pré-Condições**

- Login
  - Para utilizar este caso de uso, é necessário que o criador da viagem esteja “logado” na aplicação.
- Participar da viagem desejada
  - Para utilizar este caso de uso, o usuário que vai ganhar a permissão deve existir e já participar da viagem cujo criador seja o ator principal desse requisito (criador da viagem).

## **Fluxo Principal**

1. O criador da viagem vem do fluxo principal do caso de uso “Visualizar lista de participantes”;
1. O criador da viagem escolhe um participante;
1. Ele ativa a opção de “editor” nesse participante; [ FA01 ]
1. Este caso de uso é finalizado.

## **Fluxo Alternativo**

1. Ele desativa a opção de “editor” nesse participante que já tinha essa permissão previamente. O sistema retorna para o passo 4 do fluxo alternativo.

## **Fluxos de Exceção**

Esse caso de uso não apresenta nenhuma exceção além de possíveis problemas com a conexão.

## **Regras de Negócio**

Não existe nenhuma regra de negócio que necessita ser especificada aqui.
