# User Stories Mapping

## Descrição

Como parte das entregas da disciplina na Unidade 4, foi criado um novo backlog a partir do USM (User Stories Mapping), com escopo expandido comparado ao Backlog utilizado no projeto.

![USM](assets/USM.png)

[Link do Mural para uma melhor visualização](https://app.mural.co/t/unb9171/m/unb9171/1683643223760/8c24a764192b34855b7c5ad855dacdc7e5f25e13?sender=ueeaf0301241260f6a07d2699)

## Usuários

| ID   | Descrição                        |
| ---- | -------------------------------- |
| Us01 | Administrador da viagem          |
| Us02 | Participante convidado da viagem |

## Atividades

| ID   | Descrição                           | Usuário    |
| ---- | ----------------------------------- | ---------- |
| At01 | Gerenciamento de viagens            | Us01, Us02 |
| At02 | Controle de hospedagem e transporte | Us01       |
| At03 | Gerenciamento de cronograma         | Us01, Us02 |
| At04 | Controle de participantes da viagem | Us01       |
| At05 | Receber alertas e notificações      | Us01, Us02 |

## Backbone

| ID   | Descrição                              | Atividade |
| ---- | -------------------------------------- | --------- |
| Bb01 | Gerencias informações da viagem        | At01      |
| Bb02 | Gerenciar a lista de viagens           | At01      |
| Bb03 | Gerenciar estadia                      | At02      |
| Bb04 | Gerenciar transporte                   | At02      |
| Bb05 | Criar itinerário                       | At03      |
| Bb06 | Gerenciar atividades                   | At03      |
| Bb07 | Gerenciar participantes                | At04      |
| Bb08 | Gerenciar permissões e disponibilidade | At04      |
| Bb09 | Receber noticias do destino da viagem  | At05      |
| Bb10 | Visualizar Notificações personalizadas | At05      |

## Tarefas do usuário

### - MVP 1 -

| ID   | Descrição                                            | Backbone |
| ---- | ---------------------------------------------------- | -------- |
| Ta01 | Criar instâncias de viagens                          | Bb01     |
| Ta02 | Modificar informações das viagens                    | Bb01     |
| Ta03 | Visualizar minhas viagens                            | Bb02     |
| Ta04 | Armazenar informações de estadia                     | Bb03     |
| Ta05 | Modificar informações de estadia                     | Bb03     |
| Ta06 | Armazenar informações de transporte                  | Bb04     |
| Ta07 | Modificar informações de transporte                  | Bb04     |
| Ta08 | Visualizar cronograma                                | Bb05     |
| Ta09 | Inserir atividades no cronograma                     | Bb05     |
| Ta10 | Definir quais participantes podem modificar a viagem | Bb08     |

### - MVP 2 -

| ID   | Descrição                                        | Backbone |
| ---- | ------------------------------------------------ | -------- |
| Ta11 | Filtrar minhas viagens por data                  | Bb02     |
| Ta12 | Excluir uma viagem                               | Bb02     |
| Ta13 | Reservar estadia no local de destino             | Bb03     |
| Ta14 | Comprar passagens de avião                       | Bb04     |
| Ta15 | Modificar atividades no cronograma               | Bb06     |
| Ta16 | Excluir atividades no cronograma                 | Bb06     |
| Ta17 | Adicionar participantes em uma viagem            | Bb07     |
| Ta18 | Remover participantes de uma viagem              | Bb07     |
| Ta19 | Mostrar minha disponibilidade para uma atividade | Bb08     |
| Ta20 | Visualizar quem vai participar de um evento      | Bb08     |
| Ta21 | Receber notificações de eventos                  | Bb09     |
| Ta22 | Receber notificações sobre o clima               | Bb09     |
| Ta23 | Personalizar quais notificações receber          | Bb10     |
| Ta24 | Visualizar o histórico de notificações           | Bb10     |
