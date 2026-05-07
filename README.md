# Sofia Designer | Portfólio Scrapbook

Bem-vindo ao repositório do site de portfólio da **Sofia Designer**. Este projeto é um website pessoal construído com uma estética visual imersiva que simula um "scrapbook" (um diário gráfico / álbum de recortes), criado para destacar trabalhos criativos de Design, Ilustração e Fotografia.

## 🎨 Características do Projeto

*   **Estética Scrapbook Autêntica**: Utilização de texturas de papel, fita adesiva virtual, fotografias em estilo "polaroid" ligeiramente inclinadas e tipografias que simulam caligrafia e máquinas de escrever.
*   **Galeria Dinâmica (Masonry Layout)**: A página de portfólio gera automaticamente a galeria a partir de uma base de dados local em JavaScript (`portfolio-data.js`). Utiliza um layout de colunas em estilo "masonry".
*   **Lightbox Avançado com Navegação**: Sistema de pop-up para visualização ampliada com:
    *   Setas de navegação (**Anterior/Seguinte**).
    *   Suporte a teclado (teclas `←` e `→`).
    *   Contador de itens (ex: `3 / 12`).
    *   Adaptação dinâmica ao tamanho e orientação da imagem.
*   **Sistema de Avaliações (Testemunhos)**: Página pública (`reviews.html`) onde clientes podem deixar feedback com classificação por estrelas. As avaliações passam por aprovação da Sofia antes de serem publicadas.
*   **Integração Spotify**: Painel deslizante lateral com playlist personalizada para uma experiência imersiva.
*   **Painel de Administração (Admin v2)**: Área privada protegida por palavra-passe com interface por **separadores (Tabs)** para gerir:
    1.  **Mensagens**: Leitura de contactos recebidos.
    2.  **Avaliações**: Sistema de moderação (Aprovar ou Eliminar testemunhos pendentes).

## 🛠️ Tecnologias Utilizadas

*   **Frontend**: HTML5, CSS3 Vanilla (Flexbox/Grid), JavaScript Vanilla.
*   **Backend**: PHP 8+ (Processamento de formulários, sessões e APIs JSON).
*   **Base de Dados**: MySQL (Gestão de contactos e avaliações).
*   **Tipografia**: Google Fonts (`Caveat`, `Playfair Display`, `Quicksand`).

## 🚀 Como Executar Localmente

É necessário um servidor web local (como o XAMPP).

1.  **Instalar o XAMPP** (Apache e MySQL ativos).
2.  **Copiar** o repositório para a pasta `htdocs`.
3.  **Configurar a Base de Dados**:
    *   No phpMyAdmin, crie a base de dados `portfolio_db`.
    *   Importe o ficheiro `api/database.sql` para criar as tabelas `contacts` e `reviews`.
4.  **Abrir no Navegador**: Vá a `http://localhost/site_portfolio/index.html`.

## 📁 Estrutura de Ficheiros Relevantes

```
site_portfolio/
├── index.html            # Sobre Mim
├── portfolio.html        # Galeria Dinâmica com Lightbox
├── reviews.html          # Página Pública de Avaliações
├── services.html         # Página de Serviços
├── contact.html          # Formulário de Contacto
├── admin.html            # Painel de Gestão (Mensagens + Avaliações)
├── css/
│   └── style.css         # Design System e Estética Visual
├── js/
│   ├── script.js         # Lógica Global (Lightbox Nav, Tabs, Admin)
│   ├── reviews.js        # Lógica de submissão e feed de avaliações
│   └── portfolio-data.js # Base de dados de imagens
├── api/
│   ├── contact.php       # API de Contactos
│   ├── admin.php         # API de Autenticação e Mensagens
│   ├── reviews.php       # API de Moderação de Avaliações
│   └── database.sql      # Schema da Base de Dados
└── Portfólio/            # Imagens do Portfólio
```

---
*Feito com criatividade por Sofia &copy; 2026*
