import json
import re

# Descriptions provided by the user
project_descriptions = {
    "Cine en Flor": "Criação de logotipo, flyer A3 e poster para festival de cinema, utilizando cores suaves e tipografia delicada mas diferentes para representar a primavera.",
    "Soo I Wish": "Criação de cartão de visita para livraria beneficiente, utilizando cores e tipografias que remetem a um ambiente calmo e fantasioso.",
    "Pósteres de Filmes": "Recriação de pósteres em vetor simplificado de alguns filmes.",
    "Prince of Lies": "Criação de icon, banner principal e secundário de apresentação de personagem de RPG textual e de playlist, e capa de episódio e banner de final de episódio.",
    "Memórias do Mar": "Criação de icon, banner principal e secundário de apresentação e inspirações de personagem de RPG textual. O banner teve duas versões.",
    "Poison Ivy": "Criação de icon, banner principal e secundário de apresentação de personagem de RPG textual.",
    "Bird of Prey": "Criação de banner principal e secundário de apresentação de personagem de RPG textual.",
    "Tales of Tavros": "Criação de icon, banner principal e secundário de apresentação de personagem de RPG textual. Igualmente de capa de livro nas cores de dois personagens principais da trama.",
    "Heartbreak": "Criação de capa e tracklist de um álbum fictício.",
    "Junta de Freguesia de Rio Tinto": "Designs criados ao longo de um estágio para publicação e utilização em eventos.",
    "Outros Projetos": "Projetos avulsos que foram feitos e não utilizados.",
    "National Geographic": "Criação de capa de revista com o tema \"Espaço\".",
    "Elevação a Cidade": "Criação de cartaz com cronograma e convite para a elevação a cidade de Rio Tinto.",
    "Cartaz de Dia Comemorativo": "Recriação de cartaz do Dia do Livro de 2015.",
    "Bloody Ruby": "Criação de identidade visual para joelheria ficticia para duas versões de uma personagem de RPG textual juntamente com icon, banner e post ilustrativo da utilização da identidade",
    "Cartazes musicais": "Cartazes inspirados em excertos de músicas",
    "Sooh Wish": "Identidade visual inicial da designer usada como base para o portfólio"
}

# Folder mapping (some folder names are slightly different from project names)
folder_to_project = {
    "Posters de Filmes": "Pósteres de Filmes",
    "Memória do Mar": "Memórias do Mar",
    "Cartaz de Data Comemorativa": "Cartaz de Dia Comemorativo",
    "Identidade Visual/Bloody Ruby": "Bloody Ruby",
    "Identidade Visual/Sooh Wish": "Sooh Wish"
}

def get_project_name(folder):
    return folder_to_project.get(folder, folder)

# Read the current file to preserve other categories
with open("js/portfolio-data.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract the array content
match = re.search(r"const portfolioData = (\[.*\]);", content, re.DOTALL)
if not match:
    print("Could not find portfolioData array")
    exit(1)

current_data = json.loads(match.group(1))

# Keep only Fotografia and Ilustração (and anything else not Design)
new_data = [item for item in current_data if item.get("category") != "Design"]

# Now add the new Design items from the folder structure
# We'll use the file list we got from the CSV (reconstructed here for simplicity)
design_files = [
    # Affinity
    ("Affinity", "Cine en Flor", "UC00505 - SOFIA_MONTEIRO_DESDOBRAVEL_CINE.ENFLOR 2.png"),
    ("Affinity", "Cine en Flor", "UC00505 - SOFIA_MONTEIRO_DESDOBRAVEL_CINE.ENFLOR 3.png"),
    ("Affinity", "Cine en Flor", "UC00505 - SOFIA_MONTEIRO_DESDOBRAVEL_CINE.ENFLOR.png"),
    ("Affinity", "Cine en Flor", "UC00505 - SOFIA_MONTEIRO_LOGO_CINE.ENFLOR.png"),
    ("Affinity", "Posters de Filmes", "UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME 2.png"),
    ("Affinity", "Posters de Filmes", "UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME 3.png"),
    ("Affinity", "Posters de Filmes", "UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME.png"),
    ("Affinity", "Soo I Wish", "UC00504_SOFIAMONTEIRO_CARTÃOVISITA.png"),
    # Canva
    ("Canva", "Bird of Prey", "Banner Principal 2.jpg"),
    ("Canva", "Bird of Prey", "Banner Principal.jpg"),
    ("Canva", "Bird of Prey", "Banner Secundário.png"),
    ("Canva", "Heartbreak", "Capa.png"),
    ("Canva", "Heartbreak", "Tracklist.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "25 de Abril/Cartões Assembleia Especial 2.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "25 de Abril/Cartões Assembleia Especial.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "25 de Abril/Certificados 25 de abril Assembleia Especial.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "25 de Abril/Convites 25 de Abril.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "25 de Abril/Cortes de Trânsito 25 de Abril.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "Universidade Sénior/Aniversário.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "Universidade Sénior/Convite aniversário 2026.png"),
    ("Canva", "Junta de Freguesia de Rio Tinto", "Universidade Sénior/Piquenique universidade.png"),
    ("Canva", "Memória do Mar", "Banner Principal V2.2.jpg"),
    ("Canva", "Memória do Mar", "Banner Principal V2.jpg"),
    ("Canva", "Memória do Mar", "Banner Principal.jpg"),
    ("Canva", "Memória do Mar", "Banner Princpal V2.3.jpg"),
    ("Canva", "Memória do Mar", "Banner Secundário.png"),
    ("Canva", "Memória do Mar", "Icon.png"),
    ("Canva", "Memória do Mar", "Inspirações da Personagem.png"),
    ("Canva", "Outros Projetos", "Cartão de Identificação Escolar.png"),
    ("Canva", "Outros Projetos", "Post de Aniversário.jpg"),
    ("Canva", "Poison Ivy", "Banner Principal 2.jpg"),
    ("Canva", "Poison Ivy", "Banner Principal.jpg"),
    ("Canva", "Prince of Lies", "Banner de Final de Episódio.png"),
    ("Canva", "Prince of Lies", "Banner Principal.png"),
    ("Canva", "Prince of Lies", "Banner Secundário.png"),
    ("Canva", "Prince of Lies", "Capa de Episódio.png"),
    ("Canva", "Prince of Lies", "Icon.jpg"),
    ("Canva", "Prince of Lies", "Playlist.jpg"),
    ("Canva", "Tales of Tavros", "Livro/Capa Versão Aron.png"),
    ("Canva", "Tales of Tavros", "Livro/Capa Versão Aurora.png"),
    ("Canva", "Tales of Tavros", "Personagem/Banner Principal.jpg"),
    ("Canva", "Tales of Tavros", "Personagem/Banner Secundário.png"),
    ("Canva", "Tales of Tavros", "Personagem/Icon.png"),
    # Figma
    ("Figma", "Cartaz de Data Comemorativa", "A4 - 3.png"),
    ("Figma", "Elevação a Cidade", "Cartaz.png"),
    ("Figma", "Elevação a Cidade", "Convite.png"),
    ("Figma", "National Geographic", "cartaz national.png"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Banner principal V2.jpg"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Banner principal.jpg"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Bloody Ruby.png"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Convite V2.png"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Convite.jpg"),
    ("Figma", "Identidade Visual/Bloody Ruby", "Icon.jpg"),
    ("Figma", "Cartazes musicais", "Combo da Sorte.png"),
    ("Figma", "Identidade Visual/Sooh Wish", "Sooh Wish.png")
]

# Helper to clean up filenames for titles
def clean_title(filename):
    # Remove extension
    name = filename.split("/")[-1].rsplit(".", 1)[0]
    # Remove some common prefixes
    name = re.sub(r"UC\d+ - SOFIA_MONTEIRO_DESDOBRAVEL_", "", name)
    name = re.sub(r"UC\d+ - SOFIA_MONTEIRO_CARTAZ_FILME\s*", "Poster Filme ", name)
    name = re.sub(r"UC\d+_SOFIAMONTEIRO_", "", name)
    name = re.sub(r"UC\d+ - SOFIA_MONTEIRO_LOGO_", "", name)
    # Replace underscores/dashes with spaces
    name = name.replace("_", " ").replace("-", " ")
    # Capitalize
    return name.strip().capitalize()

next_id = 1
design_items = []
for sub, folder, file in design_files:
    project = get_project_name(folder)
    desc = project_descriptions.get(project, "Trabalho de design realizado com foco na excelência visual.")
    
    item = {
        "id": next_id, # We'll re-id later to avoid conflicts
        "title": clean_title(file),
        "description": desc,
        "category": "Design",
        "subcategory": sub,
        "project": project,
        "imagePath": f"Portfólio/Design/{sub}/{folder}/{file}",
        "date": "2026-05-09"
    }
    design_items.append(item)
    next_id += 1

# Combine and re-id
final_data = design_items + new_data
for i, item in enumerate(final_data):
    item["id"] = i + 1

# Write back
with open("js/portfolio-data.js", "w", encoding="utf-8") as f:
    f.write("// Automatically generated file\n")
    f.write("const portfolioData = ")
    f.write(json.dumps(final_data, indent=4, ensure_ascii=False))
    f.write(";\n\n")
    f.write("function getPortfolioItems() { return portfolioData; }\n")
    f.write("function getPortfolioItemById(id) { return portfolioData.find(i => i.id == id); }\n")
    f.write("function getPortfolioItemsByCategory(category, subcategory) {\n")
    f.write("    if (subcategory) {\n")
    f.write("        return portfolioData.filter(i => i.category === category && i.subcategory === subcategory);\n")
    f.write("    }\n")
    f.write("    return portfolioData.filter(i => i.category === category);\n")
    f.write("}\n")
