import json

# Define the items (I'll extract them from the previous state or just rebuild them)
# I have the data in my context.

design_items = [
    {"id": 1, "title": "Flyer A3 (Página 1)", "description": "Criação de logotipo, flyer A3 e poster para festival de cinema, utilizando cores suaves e tipografia delicada mas diferentes para representar a primavera.", "category": "Design", "subcategory": "Affinity", "project": "Cine en Flor", "imagePath": "Portfólio/Design/Affinity/Cine en Flor/Flyer.png", "date": "2026-05-09"},
    {"id": 2, "title": "Flyer A3 (Página 2)", "description": "Criação de logotipo, flyer A3 e poster para festival de cinema, utilizando cores suaves e tipografia delicada mas diferentes para representar a primavera.", "category": "Design", "subcategory": "Affinity", "project": "Cine en Flor", "imagePath": "Portfólio/Design/Affinity/Cine en Flor/Flyer 2.png", "date": "2026-05-09"},
    {"id": 3, "title": "Poster", "description": "Criação de logotipo, flyer A3 e poster para festival de cinema, utilizando cores suaves e tipografia delicada mas diferentes para representar a primavera.", "category": "Design", "subcategory": "Affinity", "project": "Cine en Flor", "imagePath": "Portfólio/Design/Affinity/Cine en Flor/Poster.png", "date": "2026-05-09"},
    {"id": 4, "title": "Logotipo", "description": "Criação de logotipo, flyer A3 e poster para festival de cinema, utilizando cores suaves e tipografia delicada mas diferentes para representar a primavera.", "category": "Design", "subcategory": "Affinity", "project": "Cine en Flor", "imagePath": "Portfólio/Design/Affinity/Cine en Flor/Logo.png", "date": "2026-05-09"},
    {"id": 5, "title": "Poster Filme 1", "description": "Recriação de pósteres em vetor simplificado de alguns filmes.", "category": "Design", "subcategory": "Affinity", "project": "Pósteres de Filmes", "imagePath": "Portfólio/Design/Affinity/Posters de Filmes/UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME 2.png", "date": "2026-05-09"},
    {"id": 6, "title": "Poster Filme 2", "description": "Recriação de pósteres em vetor simplificado de alguns filmes.", "category": "Design", "subcategory": "Affinity", "project": "Pósteres de Filmes", "imagePath": "Portfólio/Design/Affinity/Posters de Filmes/UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME 3.png", "date": "2026-05-09"},
    {"id": 7, "title": "Poster Filme 3", "description": "Recriação de pósteres em vetor simplificado de alguns filmes.", "category": "Design", "subcategory": "Affinity", "project": "Pósteres de Filmes", "imagePath": "Portfólio/Design/Affinity/Posters de Filmes/UC00505 - SOFIA_MONTEIRO_CARTAZ_FILME.png", "date": "2026-05-09"},
    {"id": 8, "title": "Cartão de Visita", "description": "Criação de cartão de visita para livraria beneficiente, utilizando cores e tipografias que remetem a um ambiente calmo e fantasioso.", "category": "Design", "subcategory": "Affinity", "project": "Soo I Wish", "imagePath": "Portfólio/Design/Affinity/Soo I Wish/UC00504_SOFIAMONTEIRO_CARTÃOVISITA.png", "date": "2026-05-09"},
    # ... more design items ...
]

# I'll just write the final array manually in write_to_file as it's easier than a script without full data access.
