/* RECETTE */

INSERT INTO recette(nom_recette, date_creation, temps_preparation, temps_cuisson, nombre_personnes, texte_preparation)
    VALUES ('Flan', NOW(), TIME '00:30:00', TIME '00:20:00', 4, 'Préparation du flan');

UPDATE recette SET temps_cuisson = TIME '00:25:00'
    WHERE recette.nom_recette = 'Flan';

DELETE FROM recette
    WHERE recette.nom_recette = 'Flan';

/* INGREDIENT */

INSERT INTO ingredient(nom_ingredient)
    VALUES ('Tomate');

UPDATE ingredient SET nom_ingredient = 'Tomato'
    WHERE nom_ingredient = 'Tomate';

DELETE FROM ingredient
    WHERE nom_ingredient = 'Tomate' OR nom_ingredient = 'Tomato';

/* MENU */

INSERT INTO menu(id_internaute, nom_menu)
    VALUES (
        (SELECT internaute.id_internaute FROM internaute
            WHERE internaute.pseudonyme = 'Bibiche'),
        'Anniversaire hivernal');

UPDATE menu SET nom_menu = 'Anniversaire estival'
    WHERE nom_menu = 'Anniversaire hivernal';

DELETE FROM menu
    WHERE nom_menu = 'Anniversaire hivernal' OR nom_menu = 'Anniversaire estival';

/* INTERNAUTE */
SELECT *
FROM appartenir_menu
INNER JOIN recette ON appartenir_menu.id_recette = recette.id_recette;


/* COMMENTAIRE */
INSERT INTO commentaire(id_internaute, id_recette, texte_commentaire, date_creation_commentaire)
    VALUES (2, 2, 'lol', now());