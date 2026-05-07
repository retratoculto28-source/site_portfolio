# A Arte de Sofia | Portfólio Scrapbook

Bem-vindo ao repositório do site de portfólio de **A Arte de Sofia**. Este projeto é um website pessoal construído com uma estética visual imersiva que simula um "scrapbook" (um diário gráfico / álbum de recortes), criado para destacar trabalhos criativos de Design, Ilustração e Fotografia.

## 🎨 Características do Projeto

*   **Identidade Visual Renovada**: O site utiliza a marca **A Arte de Sofia**, com tipografia cuidada, um **favicon transparente** personalizado e uma **assinatura visual** estilizada na página inicial.
*   **Estética Scrapbook Minimalista**: Design focado em texturas de papel e elementos táteis, recentemente refinado para um aspeto mais limpo e profissional através da **remoção de emojis**, focando exclusivamente na tipografia e nos elementos gráficos.
*   **Responsividade Mobile Otimizada**: 
    *   Layout "Lado a Lado" na homepage mesmo em ecrãs pequenos.
    *   Controlos de Lightbox (setas e fechar) redesenhados para alta visibilidade e facilidade de toque em telemóveis.
*   **Footer Profissional e Estável**: Footer multi-coluna com navegação rápida, contactos reais e integração social, otimizado para não causar oscilações de layout.
*   **Galeria Dinâmica (Masonry Layout)**: Página de portfólio alimentada por uma base de dados JSON (`portfolio-data.js`) **totalmente higienizada e livre de duplicados**.
*   **Lightbox Avançado**: Sistema de visualização imersiva com navegação por setas (visual e teclado), contador de itens e ajuste dinâmico de proporção.
*   **Sistema de Avaliações (Testemunhos)**: Página interativa (`reviews.html`) com moderação admin, permitindo que clientes avaliem o trabalho através de estrelas.
*   **Painel Admin Centralizado**: Interface privada protegida por palavra-passe para gestão eficiente de mensagens de contacto e aprovação de testemunhos.

## 🛠️ Tecnologias Utilizadas

*   **Frontend**: HTML5, CSS3 Vanilla (Custom Properties, Flexbox, Grid), JavaScript Vanilla.
*   **Backend**: PHP 8+ (APIs JSON, Sessões Seguras).
*   **Base de Dados**: MySQL (Tabelas otimizadas para Contactos e Reviews).
*   **Design**: Google Fonts (`Caveat`, `Playfair Display`, `Quicksand`), Texturas transparentes.

## 🚀 Como Executar Localmente

É necessário um servidor que suporte PHP e MySQL (ex: XAMPP).

1.  **Ativar Servidor**: Apache e MySQL no Painel de Controlo do XAMPP.
2.  **Preparar Ficheiros**: Colocar a pasta do projeto em `C:/xampp/htdocs/site_portfolio`.
3.  **Configurar Base de Dados**:
    *   Criar base de dados `portfolio_db`.
    *   Importar o esquema de `api/database.sql`.
4.  **Aceder**: `http://localhost/site_portfolio/index.html`.

## 📁 Estrutura do Projeto

```
site_portfolio/
├── index.html            # Homepage (Sobre Mim)
├── portfolio.html        # Galeria com Lightbox Nav
├── reviews.html          # Feed Público de Testemunhos
├── services.html         # Lista de Serviços e Ferramentas
├── contact.html          # Área de Contacto
├── admin.html            # Painel de Controlo Privado
├── css/style.css         # Design System e Mobile-First Media Queries
├── js/
│   ├── script.js         # Lógica Principal (Nav, Lightbox, Admin)
│   ├── reviews.js        # Lógica de Avaliações
│   └── portfolio-data.js # Dados Higienizados do Portfólio
└── api/                  # Backend PHP e Schema SQL
```

---
*Feito com criatividade por Sofia &copy; 2026*
