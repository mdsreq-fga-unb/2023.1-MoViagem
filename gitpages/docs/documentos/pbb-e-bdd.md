# PBB e BDD

## PBB

Como parte das entregas da disciplina na Unidade 3, foi criado do zero um novo backlog a partir do PBB (Product Backlog Building), com escopo reduzido comparado ao Backlog utilizado no projeto.

![Canvas PBB](assets/PBB.png)

[Link do Mural para uma melhor visualização](https://app.mural.co/t/unb9171/m/unb9171/1683643223760/8c24a764192b34855b7c5ad855dacdc7e5f25e13?sender=ueeaf0301241260f6a07d2699)

A partir dos campos definidos pelo PBB, como Personas, Benefícios de funcionalidades e PBIs(Product Backlog Items), foram criadas User Stories e seus respectivos BDDs (Behavior Driven Development), que servem como critérios de aceitação.

As User Stories foram mapeadas assim:
- Eu, como {persona} posso {PBI} para {benefício}.

Os BDDs foram construídos deste modo:
- Dado que {contexto inicial}
- Quando {evento ou ação}
- Então, {resultado esperado}

## User Stories e BDD

- Eu, como organizador da viagem, posso criar instâncias de viagem para facilitar o acesso à informações.
    
    - Dado que o usuário tenha uma conta cadastrada
    - Quando ele tentar criar uma viagem e colocar o período, local e quantidade de participantes da viagem
    - Então uma viagem deverá ser criada
<br></br>
- Eu, como organizador da viagem, posso editar as informações básicas da viagem para facilitar a organização.

    - Dado que o usuário tenha uma viagem criada
    - Quando ele tentar editar alguma informação da viagem
    - Então o sistema deve armazenar as novas informações da viagem
<br></br>
- Eu, como organizador da viagem, posso ver a lista de viagens para facilitar minha organização.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando ele tentar visualizar suas viagens
    - Então ele deverá ver uma lista de todas as suas viagens criadas
<br></br>
- Eu, como organizador da viagem, posso excluir viagens da lista de viagens para facilitar minha organização.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando ele for visualizar a lista de suas viagens e exclua uma viagem
    - Então a viagem excluída deverá sair de sua lista 
<br></br>
- Eu, como organizador da viagem, posso armazenar as informações sobre meu transporte para facilitar o acesso à informações.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando ele tentar adicionar um transporte à uma viagem e colocar o tipo de transporte, preço e tempo estimado de transporte
    - Então essas informações devem ser armazenadas e relacionadas com esta viagem
<br></br>
- Eu, como organizador da viagem, posso armazenar as informações sobre minha estadia para facilitar o acesso à informações.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando ele tentar adicionar uma estadia à uma viagem e colocar o tipo de estadia, preço, localização e período de estadia
    - Então essas informações devem ser armazenadas e relacionadas com esta viagem
<br></br>
- Eu, como organizador da viagem, posso gerenciar as informações sobre a viagem para facilitar minha organização.

    - Dado que um usuário tenha pelo menos uma viagem criada e pelo menos um transporte e/ou estadia associados a esta viagem
    - Quando o usuário editar os dados deste transporte e/ou estadia
    - Então as novas informações devem ser armazenadas no lugar das antigas
<br></br>
- Eu, como organizador da viagem, posso adicionar participantes em minhas viagens para aumentar a sintonia entre os participantes.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando o usuário buscar por outro usuário e adicionar este em sua viagem
    - Então as informações desta viagem devem ser compartilhadas com o participante convidado
<br></br>
- Eu, como organizador da viagem, posso gerenciar os participantes das minhas viagens para manter a sintonia entre os participantes.

    - Dado que um usuário tenha pelo menos um outro participante convidado em uma de suas viagens criadas
    - Quando o usuário administrador da viagem tentar excluir algum participante
    - Então o participante excluído não deverá ter mais acesso às informações da viagem
<br></br>
- Eu, como organizador da viagem, posso criar um cronograma das minhas viagens para facilitar a organização.

    - Dado que um usuário tenha pelo menos uma viagem criada
    - Quando ele tentar visualizar um cronograma de uma viagem
    - Então um cronograma com o período de realização da viagem em destaque deve ser criado
<br></br>
- Eu, como organizador da viagem ou convidado, posso inserir atividades em um cronograma para facilitar a organização.

    - Dado que um usuário participe de uma viagem que tenha um cronograma
    - Quando o usuário tentar adicionar no cronograma uma atividade com a data, horário de realização e localização
    - Então esta atividade deve ser adicionada ao cronograma para que todos os participantes da viagem possam visualizá-la.
<br></br>
- Eu, como organizador da viagem ou convidado, posso gerenciar as atividades de um cronograma para facilitar a organização.

    - Dado que um usuário participe de uma viagem que tenha, pelo menos, uma atividade no cronograma
    - Quando o usuário modificar ou excluir alguma atividade do cronograma
    - Então as mudanças no cronograma e na atividade devem ser visíveis para todos os participantes da viagem
<br></br>
- Eu, como organizador da viagem ou convidado, posso demonstrar minha disponibilidade em atividades para aumentar a sintonia entre os participantes.

    - Dado que um usuário participe de uma viagem que tenha, pelo menos, uma atividade no cronograma
    - Quando o usuário responder se irá participar ou não de uma atividade
    - Então sua escolha deverá ser visível para todos os participantes da viagem
<br></br>