# **Especificação de Casos de Uso**

## **Histórico da Revisão**

|      **Data**       | **Versão**  |                         **Descrição**                         |       **Autor**       |
| :-----------------: | :---------: | :-----------------------------------------------------------: | :-------------------: |
| `       `13/07/2023 | `      `1.0 | `  `Especificação do Caso de Uso: Visualizar Lista de viagens | `   `Gabriel de Souza |

## **Breve Descrição**

`	`Este caso de uso concede ao usuário a capacidade de visualizar as suas viagens criadas. Portanto, é possível visualizar as viagens criadas pelo usuário separadas por um filtro de tempo.

## **Atores**

- Editor da viagem
- Criador da viagem
- Participante da viagem

## **Pré-Condições**

- Login
  - Para utilizar este caso de uso, é necessário que o usuário esteja “logado” na aplicação.
- Participar de uma viagem
  - Para utilizar este caso de uso, o usuário deve ter criado ou ter sido adicionado em pelo menos uma viagem.

## **Fluxo Principal**

1. O usuário acessa a sua lista de viagens.
1. O usuário terá uma lista com todas as viagens criadas
1. O usuário terá 4 filtros para filtrar as suas viagens
1. O usuário, caso queira, seleciona por qual filtro deseja filtrar suas viagens [ FA01 ] [ FA02 ] [ FA03 ] [ FA04 ] [ FE01 ] [ RN01 ]
1. O caso de uso é encerrado.

## **Fluxo Alternativo**

1. Selecionado o filtro “Passadas” o usuário terá uma lista das viagens que já ocorreram em relação ao dia que ele está acessando o site. O sistema retorna ao passo 5 do fluxo principal.

1. Selecionado o filtro “Atuais” o usuário terá uma lista das viagens que já estão ocorrendo em relação ao dia que ele está acessando o site. O sistema retorna ao passo 5 do fluxo principal.

1. Selecionado o filtro “Futuras” o usuário terá uma lista das viagens que irão ocorrer em relação ao dia que ele está acessando o site. O sistema retorna ao passo 5 do fluxo principal.

1. Selecionado o filtro “Viagens como convidado”, o usuário terá uma lista das viagens na qual ele foi inserido como convidado. O sistema retorna ao passo 5 do fluxo principal.

## **Fluxos de Exceção**

1. O usuário não selecionou nenhum filtro para listar suas viagens.
   <br></br>
   a. Se nenhum filtro for selecionado, o usuário terá novamente acesso a todas as viagens criadas.

## **Regras de Negócio**

1. Escolha do filtro.
   <br></br>
   a. Quando os filtros de tempo forem selecionados, deve-se mostrar as respectivas viagens em relação a data que o usuário está acessando o site.
   <br></br>
   b. Quando o filtro de viagem como convidado for selecionado, deve-se mostrar as viagens que o usuário está como convidado.
