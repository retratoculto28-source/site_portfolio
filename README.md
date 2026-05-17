# A Arte de Sofia | Portfólio Scrapbook

Bem-vindo ao repositório do site de portfólio de **A Arte de Sofia**. Este projeto é um website pessoal construído com uma estética visual imersiva que simula um "scrapbook" (um diário gráfico / álbum de recortes), criado para destacar trabalhos criativos de Design, Ilustração e Fotografia.

## Características do Projeto

*   **Identidade Visual Renovada**: O site utiliza a marca **A Arte de Sofia**, com tipografia cuidada, um **favicon transparente** personalizado e uma **assinatura visual** estilizada na página inicial.
*   **Estética Scrapbook Minimalista**: Design focado em texturas de papel e elementos táteis, refinado para um aspeto mais limpo e profissional através da **remoção de emojis**, focando exclusivamente na tipografia e nos elementos gráficos.
*   **Responsividade Mobile Otimizada**: 
    *   Layout "Lado a Lado" na homepage mesmo em ecrãs pequenos.
    *   Controlos de Lightbox (setas e fechar) redesenhados para alta visibilidade e facilidade de toque em telemóveis.
*   **Footer Profissional e Estável**: Footer multi-coluna com navegação rápida, contactos reais e integração social, otimizado para não causar oscilações de layout.
*   **Galeria Dinâmica (Masonry Layout)**: Página de portfólio alimentada por uma base de dados JSON (`portfolio-data.js`) **totalmente higienizada e livre de duplicados**.
*   **Sincronização Fotográfica Automatizada**: Scripts que lêem os diretórios de fotografia, extraem datas dos nomes dos ficheiros, removem imagens duplicadas de cópias e organizam tudo cronologicamente.
*   **Lightbox Avançado**: Sistema de visualização imersiva com navegação por setas (visual e teclado), contador de itens e ajuste dinâmico de proporção.
*   **Contacto Direto**: Formulário de contacto estático integrado nativamente com o cliente de email da Sofia para envio imediato de mensagens.

## Tecnologias Utilizadas

*   **Frontend**: HTML5, CSS3 Vanilla (Custom Properties, Flexbox, Grid), JavaScript Vanilla.
*   **Design**: Google Fonts (`Caveat`, `Playfair Display`, `Quicksand`), Texturas transparentes.

## Como Executar Localmente

Sendo um site 100% estático, não são necessários servidores de base de dados (como MySQL) ou interpretadores de backend (como PHP).

1.  **Obter Código**: Descarregar ou clonar este repositório para uma pasta local.
2.  **Abrir**: Dê um duplo clique no ficheiro `index.html` para abrir o site instantaneamente em qualquer browser, ou utilize extensões como "Live Server" no VS Code.

## Gestão e Sincronização do Portfólio

Para facilitar a adição e organização de novos trabalhos de fotografia no portfólio, está disponível um script utilitário na pasta `scratch/`:

### Sincronizar Fotos de Fotografia (Paisagens, Pessoas, Detalhes)
Sempre que a Sofia adicionar novas fotos às pastas dentro de `Portfólio/Fotografia/`, execute o script PowerShell para detetar novas imagens, preencher datas cronológicas automaticamente a partir do nome do ficheiro (ex: `photo_YYYY-MM-DD...`), ignorar duplicados e reconstruir o portfólio:
```powershell
powershell -ExecutionPolicy Bypass -File scratch/update_photography.ps1
```

## Estrutura do Projeto

```
site_portfolio/
├── Portfólio/            # Ficheiros originais de Design, Ilustração e Fotografia
├── index.html            # Homepage (Sobre Mim)
├── portfolio.html        # Galeria com Lightbox Nav
├── services.html         # Lista de Serviços e Ferramentas
├── contact.html          # Área de Contacto (envio via mailto)
├── css/style.css         # Design System e Mobile-First Media Queries
├── js/
│   ├── script.js         # Lógica Principal (Nav, Lightbox)
│   └── portfolio-data.js # Dados do Portfólio (JSON)
└── scratch/              # Scripts utilitários de manutenção e sync
    └── update_photography.ps1 # Sincronização inteligente de novas fotos
```

---
*Feito com criatividade por Sofia &copy; 2026*

