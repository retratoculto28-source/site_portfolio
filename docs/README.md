# 🎨 A Arte de Sofia | Portfólio Scrapbook

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

---

## ✨ Características de Destaque

*   **🎨 Identidade Visual Premium**: Branding exclusivo de **A Arte de Sofia**, com tipografia editorial elegante, um **favicon transparente** personalizado e uma assinatura visual desenhada à mão na página inicial.
*   **📖 Estética Scrapbook Minimalista**: Design focado em texturas táteis de papel e inclinações orgânicas de fotografias. A interface foi polida e higienizada visualmente, focando exclusivamente na harmonia tipográfica e composição gráfica.
*   **📱 Responsividade Mobile de Alta Performance**: 
    *   Adaptação fluida e side-by-side de blocos principais mesmo em ecrãs pequenos.
    *   Controlos de visualização de galeria (lightbox) de alta visibilidade e otimizados para gestos táteis.
*   **✨ Rodapé (Footer) Sofisticado**: Estrutura multi-coluna estável com navegação fluida, dados reais de contacto e links de redes sociais.
*   **🖼️ Galeria Dinâmica Responsiva (Masonry)**: Portfólio gerado dinamicamente a partir de uma base de dados estruturada JSON (`portfolio-data.js`), totalmente limpa de ficheiros duplicados do sistema operativo.
*   **📸 Sincronização Inteligente**: Automação nativa para sincronizar novos trabalhos de fotografia em segundos.
*   **🔍 Experiência Imersiva (Lightbox)**: Visualização de alta resolução com suporte a setas físicas e navegação por teclado (Esquerda/Direita/Escape) e contador de progresso.
*   **✉️ Contacto Nativamente Direto**: Formulário estático em `contact.html` integrado diretamente com o protocolo `mailto:`, abrindo a aplicação de email preferida do visitante sem necessidade de servidores de base de dados.

---

## 🛠️ Tecnologias e Recursos

*   **Arquitetura Frontend**: HTML5 Semântico, CSS3 Moderno (Variáveis Nativas, Grid e Flexbox) e Vanilla JavaScript (DOM).
*   **Tipografia**: Combinação artística das famílias tipográficas `Caveat` (escrita manual orgânica), `Playfair Display` (serifa elegante para cabeçalhos) e `Quicksand` (sans-serif amigável para leitura de corpo).
*   **Assets Estéticos**: Texturas de papel texturado, molduras estilo Polaroid e pins digitais.

---

## 🚀 Como Executar e Testar Localmente

Ao ser uma aplicação **100% estática**, o projeto **não necessita** de bases de dados (MySQL/MariaDB) nem de interpretadores PHP ativos (como XAMPP/Apache).

1.  **Descarregar o Código**: Copie ou clone a pasta do projeto para o seu computador.
2.  **Abrir a Página**: Dê um duplo clique no ficheiro `index.html` para executá-lo imediatamente em qualquer navegador (Chrome, Edge, Firefox, Safari).
3.  *(Opcional)* **Servidor Local Estático**: Se utilizar o VS Code, pode usar a extensão **Live Server** para obter recarregamento em tempo real enquanto faz alterações.

---

## 🌐 Como Publicar Gratuitamente na Web (GitHub Pages)

Por ser uma página puramente estática, o portfólio da Sofia pode ser hospedado de forma **100% gratuita** utilizando o **GitHub Pages**:

1.  Crie um repositório público no GitHub (ex: `site_portfolio`).
2.  Envie todos os ficheiros do projeto para o repositório.
3.  No GitHub, aceda a **Settings** (Definições) > **Pages**.
4.  Em *Build and deployment*, defina a Source como **Deploy from a branch** e selecione a branch `main` (ou `master`) na pasta `/ (root)`.
5.  Clique em **Save**. O seu site estará online em poucos minutos no endereço `https://<seu-utilizador>.github.io/site_portfolio/`!

---

## 📸 Gestão e Sincronização do Portfólio (Automático)

Para manter o portfólio sempre atualizado com os novos trabalhos de fotografia sem precisar de mexer em código, criámos um **sincronizador inteligente** em PowerShell localizado em `scratch/update_photography.ps1`.

### Como adicionar novas fotos:
1.  Cole as suas novas fotografias nas pastas correspondentes em:
    *   `Portfólio/Fotografia/Paisagens/`
    *   `Portfólio/Fotografia/Pessoas/`
    *   `Portfólio/Fotografia/Detalhes/`
2.  Abra o terminal PowerShell e execute o comando:
    ```powershell
    powershell -ExecutionPolicy Bypass -File scratch/update_photography.ps1
    ```
3.  **O que o script faz por si automaticamente?**
    *   Analisa as pastas de fotografia selecionadas.
    *   Extrai a data de captura a partir do nome padrão do ficheiro (ex: `photo_2026-05-17...` $\rightarrow$ `"date": "2026-05-17"`).
    *   Remove e filtra automaticamente duplicados do sistema operativo (como ficheiros `* (2).jpg`).
    *   Codifica caracteres acentuados (como o `ó` de `Portfólio`) para garantir compatibilidade universal de links em servidores web.
    *   Reordena cronologicamente os itens e reatribui sequencialmente os IDs na base de dados JSON (`js/portfolio-data.js`).

> [!TIP]
> **Dica de Segurança no Windows:** Se o PowerShell bloquear a execução do script por políticas do sistema operativo, pode executá-lo de forma temporária e segura abrindo a consola e correndo:
> `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` e executando o script logo a seguir.

---

## 📁 Estrutura de Diretórios Minimalista

O repositório está perfeitamente higienizado de ficheiros dinâmicos obsoletos ou inacabados, apresentando a seguinte estrutura limpa:

```
site_portfolio/
├── Portfólio/                 # Ficheiros e pastas de trabalhos originais
│   └── Fotografia/            # Subpastas organizadas de fotos (Paisagens, Pessoas, Detalhes)
├── css/
│   └── style.css              # Toda a estilização visual, variáveis e responsividade
├── js/
│   ├── script.js              # Lógica principal (Menu Responsivo, Playlist Spotify e Lightbox)
│   └── portfolio-data.js      # Base de dados estruturada JSON (Gerada Automaticamente)
├── scratch/
│   └── update_photography.ps1  # Script nativo PowerShell para sincronização de fotos
├── index.html                 # Página "Sobre Mim" e entrada do Portfólio
├── portfolio.html             # Página da Galeria dinâmica e visualizador interativo
├── services.html              # Página informativa de Serviços e Ferramentas
├── contact.html               # Página de Contacto com formulário mailto
└── favicon.png                # Marca de assinatura transparente da Sofia
```

---
<div align="center">
  <b>Feito com criatividade por Sofia &copy; 2026</b>
</div>
