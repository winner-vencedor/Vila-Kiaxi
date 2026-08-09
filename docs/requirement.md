O **FutVila-Kiaxi** é uma aplicação web desenvolvida com **Next.js** para facilitar a organização e o agendamento de jogos de futebol da congregação.

O sistema foi projetado para oferecer uma experiência simples, rápida e intuitiva aos usuários, permitindo que os membros da congregação acompanhem e participem dos jogos de forma organizada.

---


# Objetivos

- Facilitar a organização dos jogos da congregação.
- Centralizar o gerenciamento dos participantes.
- Oferecer uma interface moderna e intuitiva.
- Garantir uma experiência responsiva para dispositivos móveis e desktops.
- Manter uma arquitetura escalável e de fácil manutenção.

---


### Funcionalidades do projecto

- Autenticação,
- Perfil do usuário,
- Agendamento de jogos,
- Participantes,
- Confirmação de presença,
- Histórico de jogos,
- Estatísticas,
- Notificações,
- Administração,
- Configurações,
- Chat entre jogadores,
- Ranking dos jogadores.

---

# Usuários do sistema
- Usuário com
- Jogadores.
- administrador.

---


# Problemas identificados
- Desorganização no agendamento de jogos.
- baixo controle na confirmação de presença ou participação dos jogadores.
- Falta do registro de histórico dos jogos.
- Pouca comunicação entre os administradores com os jogadores.


---

# Requisitos funcionais
Características do que o sistema pode fazer.

- RF01- Agendar jogos.
- RF02- Permitir cadastrar jogadores.
- RF03- Remover participante do jogo.
- RF04- Usuário pode confirmar ou desconfirmar presença. 
- RF05- apresentar histórico de todos os jogos.
- RF06- apresentar estatistica de todos os jogos.
- RF07- apresentar estatistica de cada jogador.
- RF08- comunicação entre os jogadores(chat).
- RF09- apresentar ranking da equipa(melhor marcador,assistente,defesa,etc).
- RF10- cadastrar usuários comuns.

  ---

# Requisitos não funcionais
Característica da qualidade do sistema.

- RNF01- Responsividade (O sistema deve funcionar em dispositivos móveis).
- RNF02- segurança (O sistema deve possuir autenticação).
- RNF03- performance (O tempo de resposta deve ser inferior a 2 segundos).
- RNF04- disponibilidade (0 dados devem possuir backup periódicos).
- RNF05- controle de acesso (Apenas usuários autorizados devem acessar a determinadas funcionalidades).


----

# Perguntas Realizadas na Entrevista com os Jogadores e Administradores
````

- 1.Quem vai usar o sistema?
- R:Usuário comum,Jogadores e administrador.

- 2.Maior problema hoje?
- R:actualmente a uma desorganização no agendamento dos jogos,na confirmação de presença ou participação dos jogadores,
falta de análise dos históricos de cada jogos pois não são registrados,pouca comunicação entre os jogadores,etc.

- 3.Como agendam jogos?
- R:Actualmente os jogos são agendados verbalmente ou nas redes sociais e comunicado aos jogadores.

- 4.Como é feito a confirmação de presença ou participação dos jogadores?
- R:Actualmente a confirmação de presença ou desconfirmação é feita verbalmente ou atráves de mensagem nas redes sociais.

- 5.Como é feito a análise da qualidade da equipe?
- 6.Que meios de comunicação é usado pela equipe neste processo de agendamento?

- 7.Em questão de cadastrar ou eliminar jogadores quem é o responsável em faze-lo?
- R:Os jogadores serão cadastrados ou eliminados pelo administrador,isto é,atráves de um pedido de adesão a equipe feito pelo usuário.

- 8.Quem é o responsável por agendar os jogos?
- R:Os jogos serão agendados pelos administradores.
````

---

## Regras de Negócio
Lógica de negócio do sistema.

- RNO1-Um usuário comum pode pedir para se tornar um jodador.
- RN02-Cada usuário deve ter apenas uma conta.
- RN03-Apenas os administradores podem aceitar ou recusar um pedido de adesão a equipe.
- RN04-Apenas os administradores podem remover jogadores da equipe.
- RN05-Os jogos serão agendados pelos administradores.
- RN06-Os jogadores podem enviar sugestão de agendamento de jogo aos administradores.
- RN07-Apenas os jogadores podem confirmar ou desconfirmar a presença num determinado jogo.
- RN08-Todos os usuários autenticados podem ter acesso as informações sobre o histórico,estatísticas,ranking,jogo agendado.
- RN09-Apenas os jogadores e administradores podem trocar mensagens dentro do sistema.
- RN10-Apenas os administradores podem registrar o resultado oficial de um jogo.

