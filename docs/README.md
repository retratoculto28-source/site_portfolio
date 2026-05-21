# A Arte de Sofia | Portfólio Scrapbook

<div align="center">
  
  ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
  ![PowerShell](https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white)
  ![Static Site](https://img.shields.io/badge/Arquitetura-100%25_Estática-brightgreen?style=for-the-badge)

</div>

---

Bem-vindo ao repositório oficial do website de portfólio de **A Arte de Sofia**. 
Este projeto é um espaço digital interativo desenhado com uma estética visual única e imersiva que simula um **"scrapbook"** (álbum de recortes / diário gráfico), idealizado para dar destaque e brilho aos trabalhos criativos de **Design**, **Ilustração** e **Fotografia** da Sofia.

O projeto encontra-se **altamente organizado por tipo de ficheiro**, mantendo a raiz limpa e profissional.

---

## Características de Destaque

*   **Organização de Pastas Limpa**: Ficheiros organizados de acordo com o seu tipo (`html/`, `images/`, `docs/`, `css/`, `js/`), mantendo o repositório estruturado e profissional.
*   **Identidade Visual Premium**: Branding exclusivo de **A Arte de Sofia**, com tipografia editorial elegante, um **favicon transparente** em `images/` e uma assinatura visual desenhada à mão na página inicial.
*   **Estética Scrapbook Minimalista**: Design focado em texturas táteis de papel e inclinações orgânicas de fotografias. A interface foi polida e higienizada visualmente, focando exclusivamente na harmonia tipográfica e composição gráfica.
*   **Painel Lateral do Spotify (Playlist)**: Um reprodutor lateral retrátil e fluído ("slide-out panel") que permite aos visitantes desfrutarem de uma playlist musical temática enquanto navegam pelas obras de Sofia, enriquecendo a experiência sensorial do portfólio.
*   **Modo Escuro Dinâmico**: Tema dark mode criado para alternar entre claro e escuro com um botão de controlo, incluindo ajustes de contraste e legibilidade em `.contact-info`.
*   **Responsividade Mobile de Alta Performance**: 
    *   Adaptação fluida e side-by-side de blocos principais mesmo em ecrãs pequenos.
    *   Controlos de visualização de galeria (lightbox) de alta visibilidade e otimizados para gestos táteis.
*   **Rodapé (Footer) Sofisticado**: Estrutura multi-coluna estável com navegação fluida, dados reais de contacto e links de redes sociais.
*   **Galeria Dinâmica Responsiva (Masonry)**: Portfólio gerado dinamicamente a partir de uma base de dados estruturada JSON (`portfolio-data.js`), totalmente compatível com a nova estrutura de pastas.
*   **Sincronização Total Inteligente**: Automação nativa baseada em scripts PowerShell para detetar, catalogar e atualizar em segundos novos trabalhos de Design, Ilustração e Fotografia diretamente a partir da árvore de ficheiros para a base de dados JSON do site.
*   **Experiência Imersiva (Lightbox)**: Visualização de alta resolução com suporte a setas físicas e navegação por teclado (Esquerda/Direita/Escape) e contador de progresso.
*   **Contacto Nativamente Direto**: Formulário estático em `html/contact.html` integrado diretamente com o protocolo `mailto:`, abrindo a aplicação de email preferida do visitante sem necessidade de servidores de base de dados.

---

## Atualização Recente

*   Ajuste das cores de texto e hiperligações da secção de contactos (`.contact-info`) para melhorar a legibilidade no modo claro e no modo escuro.
*   Implementação de descrições de projetos nos pop-ups do portfólio, com agrupamento por categoria, subcategoria e projeto para refletir a estrutura de subpastas.

---

## Tecnologias e Recursos

*   **Arquitetura Frontend**: HTML5 Semântico, CSS3 Moderno (Variáveis Nativas, Grid e Flexbox) e Vanilla JavaScript (DOM).
*   **Tipografia**: Combinação artística das famílias tipográficas `Caveat` (escrita manual orgânica), `Playfair Display` (serifa elegante para cabeçalhos) e `Quicksand` (sans-serif amigável para leitura de corpo).
*   **Assets Estéticos**: Texturas de papel texturado, molduras estilo Polaroid e pins digitais.

---

## Como Executar e Testar Localmente

Ao ser uma aplicação **100% estática**, o projeto **não necessita** de bases de dados (MySQL/MariaDB) nem de interpretadores PHP ativos (como XAMPP/Apache).

1.  **Descarregar o Código**: Copie ou clone a pasta do projeto para o seu computador.
2.  **Abrir a Página**: Dê um duplo clique no ficheiro `index.html` localizado na **raiz**. O navegador abrirá a página e irá redirecioná-lo **automaticamente e instantaneamente** para o site em `html/index.html`.
3.  *(Alternativa)* **Abrir Diretamente**: Se preferir, pode abrir diretamente o ficheiro `index.html` que está dentro da pasta **`html/`**.
4.  *(Opcional) Servidor Local*: Se utilizar o VS Code, pode usar a extensão **Live Server** para obter recarregamento automático em tempo real durante o desenvolvimento.

---

## Como Publicar Gratuitamente na Web (GitHub Pages)

Por ser uma página puramente estática, o portfólio da Sofia pode ser hospedado de forma **100% gratuita** utilizando o **GitHub Pages**:

1.  Crie um repositório público no GitHub (ex: `site_portfolio`).
2.  Envie todos os ficheiros do projeto para o repositório.
3.  No GitHub, aceda a **Settings** (Definições) > **Pages**.
4.  Em *Build and deployment*, defina a Source como **Deploy from a branch** e selecione a branch `main` na pasta `/ (root)`.
5.  Clique em **Save**. O seu site estará online em poucos minutos no endereço `https://<seu-utilizador>.github.io/site_portfolio/`!

---

## Sincronização e Automação (PowerShell)

Para manter o portfólio atualizado com os novos trabalhos (Design, Ilustração e Fotografia) sem necessidade de alterar o código do site manualmente, o projeto inclui ferramentas de sincronização e automação robustas em PowerShell na pasta `scratch/`:

### 1. Sincronizador Unificado e Completo (`scratch/sync_portfolio.ps1`)
Este é o script principal recomendado para atualizar todo o site de uma só vez. Ele rastreia e regista no banco de dados tanto as obras de Design (Canva/Figma/Affinity) como Ilustração e Fotografia.
*   **Como executar:** Abra o terminal na raiz do projeto e execute:
    ```powershell
    powershell -ExecutionPolicy Bypass -File scratch/sync_portfolio.ps1
    ```
*   **O que faz:**
    *   Varre recursivamente a pasta `Portfólio/` em busca de novos ficheiros (`.png`, `.jpg`, `.jpeg`).
    *   Identifica novos projetos e categoriza-os automaticamente com base na hierarquia de pastas.
    *   Preenche títulos, caminhos de imagem relativos, descrições padrão e datas de registo.
    *   Remove duplicados e corrige problemas de codificação especial (como o `ó` de `Portfólio`).
    *   Classifica a lista alfabética e cronologicamente e gera o ficheiro final `js/portfolio-data.js` com IDs consecutivos.

### 2. Sincronizadores Específicos
*   **Fotografia (`scratch/update_photography.ps1`):** Focado exclusivamente na secção de fotografia. Analisa pastas como `Paisagens`, `Pessoas` e `Detalhes`, extraindo datas de captura dos nomes dos ficheiros (ex: `photo_2026-05-17...`).
*   **Cartazes e Ilustrações (`scratch/update_cartazes.ps1`):** Script dedicado a catalogar novos cartazes e designs no portfólio.
*   **Instalação de Tipografias (`scratch/download_fonts.ps1`):** Utilitário para descarregar e configurar localmente as fontes de suporte do scrapbook.

---

## Estrutura de Diretórios Organizada

O repositório apresenta a seguinte estrutura modular e altamente higienizada:

```
site_portfolio/
├── Portfólio/                 # Obras de arte originais organizadas por Design, Ilustração e Fotografia
├── css/
│   └── style.css              # Estilização visual completa (Grid, Flexbox, Scrapbook e Responsivo)
├── docs/                      # Pasta de documentação
│   └── README.md              # Este ficheiro descritivo das especificações técnicas do projeto
├── homepage/                  # Imagens e recursos exclusivos da página sobre mim
├── html/                      # Páginas HTML que compõem o website
│   ├── index.html             # Página de Boas-vindas ("Sobre Mim")
│   ├── portfolio.html         # Galeria de Portfólio dinâmica baseada em polaroids e lightbox
│   ├── services.html          # Serviços criativos e ferramentas dominadas
│   └── contact.html           # Formulário de contacto nativo mailto
├── images/                    # Imagens globais estruturais da interface e logotipo
│   └── favicon.png            # Favicon oficial transparente
├── js/
│   ├── script.js              # Interações e lógica client-side (lightbox, spotify drawer, etc.)
│   └── portfolio-data.js      # Dados JSON de catálogo de obras gerados por script de automação
├── scratch/                   # Scripts e utilitários de automação em PowerShell
│   ├── sync_portfolio.ps1     # Sincronizador de portfólio completo (Design + Ilustração + Foto)
│   ├── update_photography.ps1 # Sincronizador específico de fotografias
│   ├── update_cartazes.ps1    # Sincronizador específico de designs/cartazes
│   └── download_fonts.ps1     # Script utilitário para download e setup de tipografias
├── serviços/                  # Logótipos dos programas para a secção de competências de serviços
└── index.html                 # Ponto de entrada que redireciona automaticamente para o site em html/
```

---
<div align="center">
  <b>Feito com criatividade por Sofia &copy; 2026</b>
</div>
