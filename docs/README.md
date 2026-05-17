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
*   **Responsividade Mobile de Alta Performance**: 
    *   Adaptação fluida e side-by-side de blocos principais mesmo em ecrãs pequenos.
    *   Controlos de visualização de galeria (lightbox) de alta visibilidade e otimizados para gestos táteis.
*   **Rodapé (Footer) Sofisticado**: Estrutura multi-coluna estável com navegação fluida, dados reais de contacto e links de redes sociais.
*   **Galeria Dinâmica Responsiva (Masonry)**: Portfólio gerado dinamicamente a partir de uma base de dados estruturada JSON (`portfolio-data.js`), totalmente compatível com a nova estrutura de pastas.
*   **Sincronização Inteligente**: Automação nativa para sincronizar novos trabalhos de fotografia em segundos.
*   **Experiência Imersiva (Lightbox)**: Visualização de alta resolução com suporte a setas físicas e navegação por teclado (Esquerda/Direita/Escape) e contador de progresso.
*   **Contacto Nativamente Direto**: Formulário estático em `html/contact.html` integrado diretamente com o protocolo `mailto:`, abrindo a aplicação de email preferida do visitante sem necessidade de servidores de base de dados.

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

## Sincronização Automática de Fotos

Para manter o portfólio atualizado com os novos trabalhos de fotografia sem precisar de mexer em código, criámos um **sincronizador inteligente** em PowerShell localizado em `scratch/update_photography.ps1`.

### Como adicionar novas fotos:
1.  Cole as suas novas fotografias nas pastas correspondentes em:
    *   `Portfólio/Fotografia/Paisagens/`
    *   `Portfólio/Fotografia/Pessoas/`
    *   `Portfólio/Fotografia/Detalhes/`
2.  Abra o terminal PowerShell na raiz do projeto e execute o comando:
    ```powershell
    powershell -ExecutionPolicy Bypass -File scratch/update_photography.ps1
    ```
3.  **O que o script faz automaticamente?**
    *   Analisa as pastas de fotografia selecionadas.
    *   Extrai a data de captura a partir do nome padrão do ficheiro (ex: `photo_2026-05-17...` $\rightarrow$ `"date": "2026-05-17"`).
    *   Remove e filtra automaticamente duplicados do sistema operativo (como ficheiros `* (2).jpg`).
    *   Codifica caracteres acentuados (como o `ó` de `Portfólio`) para garantir compatibilidade universal de links em servidores web.
    *   Reordena cronologicamente os itens e reatribui sequencialmente os IDs na base de dados JSON (`js/portfolio-data.js`).

---

## Estrutura de Diretórios Organizada

O repositório está perfeitamente higienizado de ficheiros dinâmicos obsoletos ou inacabados, apresentando a seguinte estrutura modular:

```
site_portfolio/
├── Portfólio/                 # Ficheiros de trabalhos originais (Design, Ilustração, Fotografia)
├── css/
│   └── style.css              # Toda a estilização visual, variáveis e responsividade
├── docs/                      # Pasta de documentação
│   └── README.md              # Este ficheiro descritivo das especificações técnicas
├── homepage/                  # Recursos e imagens estáticas para a página inicial
├── html/                      # Páginas HTML principais do website
│   ├── index.html             # Página inicial ("Sobre Mim")
│   ├── portfolio.html         # Página da Galeria dinâmica e visualizador interativo
│   ├── services.html          # Página de Serviços e Ferramentas
│   └── contact.html           # Página de Contacto com formulário mailto
├── images/                    # Imagens globais e favicon do website
│   └── favicon.png            # Favicon e assinatura de marca transparente da Sofia
├── js/
│   ├── script.js              # Lógica principal (Menu, Playlist Spotify, Lightbox e caminhos)
│   └── portfolio-data.js      # Base de dados JSON dos projetos (Gerada por Script)
├── scratch/
│   └── update_photography.ps1  # Script PowerShell para sincronização de fotos
├── serviços/                  # Logótipos dos programas utilizados na página de serviços
└── index.html                 # Ficheiro raiz para redirecionamento automático instantâneo
```

---
<div align="center">
  <b>Feito com criatividade por Sofia &copy; 2026</b>
</div>
