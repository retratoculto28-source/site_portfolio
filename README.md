# Sofia Designer | Portfólio Scrapbook

Bem-vindo ao repositório do site de portfólio da **Sofia Designer**. Este projeto é um website pessoal construído com uma estética visual imersiva que simula um "scrapbook" (um diário gráfico / álbum de recortes), criado para destacar trabalhos criativos de Design, Ilustração e Fotografia.

## 🎨 Características do Projeto

*   **Estética Scrapbook Autêntica**: Utilização de texturas de papel, fita adesiva virtual, fotografias em estilo "polaroid" ligeiramente inclinadas e tipografias que simulam caligrafia e máquinas de escrever.
*   **Galeria Dinâmica (Masonry Layout)**: A página de portfólio gera automaticamente a galeria a partir de uma base de dados local em JavaScript (`portfolio-data.js`). Utiliza um layout de colunas em estilo "masonry" para que imagens verticais e horizontais se encaixem perfeitamente.
*   **Lightbox Nativo**: Sistema de pop-up para visualização ampliada das obras da galeria sem sair da página, com suporte a fecho por clique fora da imagem ou botão Escape.
*   **Integração Spotify**: Um painel deslizante ("slide-out") lateral que esconde/revela uma playlist do Spotify, proporcionando uma experiência com banda sonora ambiente.
*   **Backend Funcional de Contactos**: Formulário de contacto com ligação ao servidor via PHP (`api/contact.php`) e base de dados MySQL.
*   **Painel de Administração (Admin)**: Área privada protegida por palavra-passe (`admin.html` e `api/admin.php`) onde a Sofia pode consultar de forma segura as mensagens recebidas através do formulário de contacto.
*   **Automação do Portfólio**: Scripts (em Node.js `generate_portfolio.js` e PowerShell `generate_portfolio.ps1`) desenvolvidos para ler pastas locais (`Portfólio/`) e atualizar automaticamente a base de dados JavaScript, facilitando a adição de novas peças ao site.

## 🛠️ Tecnologias Utilizadas

*   **Frontend**: HTML5, CSS3 Vanilla (com variáveis CSS e Flexbox/Grid nativos) e JavaScript Vanilla.
*   **Backend**: PHP 8+ (para processamento seguro do formulário de contactos e autenticação do painel admin).
*   **Base de Dados**: MySQL (guardando os contactos recebidos).
*   **Tipografia**: Google Fonts (`Caveat`, `Playfair Display`, `Quicksand`).

## 🚀 Como Executar Localmente

Sendo um projeto que utiliza PHP e uma Base de Dados MySQL para a página de Contactos e Administração, é necessário um servidor web local.

1.  **Instalar o XAMPP** (ou WAMP/MAMP).
2.  **Clonar/Copiar** este repositório para dentro da pasta pública do servidor local (ex: `C:\xampp\htdocs\site_portfolio`).
3.  **Configurar a Base de Dados**:
    *   Abra o phpMyAdmin (normalmente em `http://localhost/phpmyadmin`).
    *   Crie uma base de dados e importe o ficheiro SQL (caso disponível) ou crie a tabela necessária para guardar os contactos e as credenciais.
    *   Verifique os dados de ligação à BD nos ficheiros `api/contact.php` e `api/admin.php`.
4.  **Iniciar o Servidor**: Ative os módulos **Apache** e **MySQL** no Painel de Controlo do XAMPP.
5.  **Abrir no Navegador**: Vá a `http://localhost/site_portfolio/index.html`.

## 📁 Estrutura de Ficheiros Relevantes

```
site_portfolio/
├── index.html            # Página Inicial (Sobre Mim)
├── portfolio.html        # Página da Galeria (Gera polaroids dinamicamente)
├── services.html         # Página de Serviços
├── contact.html          # Página de Contacto com formulário HTML
├── admin.html            # Painel de login/leitura de mensagens
├── css/
│   └── style.css         # Todo o estilo e estética visual
├── js/
│   ├── script.js         # Lógica da galeria, Lightbox, Spotify e Admin
│   └── portfolio-data.js # Base de dados em array JS com todas as imagens
├── api/                  # Backend PHP
│   ├── contact.php       # Processamento dos envios de email/mensagens
│   └── admin.php         # Sessões e devolução de dados ao admin.html
└── Portfólio/            # Pastas com as imagens reais agrupadas por categoria
```

---
*Feito com criatividade por Sofia &copy; 2026*
