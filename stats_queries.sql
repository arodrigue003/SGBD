--Statistiques :
--/!\vérifier suivant les changements noms 
-- le nombre de recettes d’une catégorie créée depuis le début de l’année
SELECT COUNT(id_recette)
FROM recette
NATURAL JOIN appartenir_categorie
WHERE appartenir_categorie.id_categorie = 5--$param
  AND date_part('year', date_creation) = date_part('year', CURRENT_DATE);


--le classement des recettes selon les notes données par les internautes
SELECT id_recette, AVG(note.valeur) as moyenne
FROM note
NATURAL JOIN recette
GROUP BY id_recette
ORDER BY moyenne ASC;


--pour les menus réalisés par un internaute, la moyenne des notes données pour les recettes qu’il comprend
SELECT id_recette, AVG(note.valeur) as moyenne_notes
FROM note
WHERE id_recette IN
(SELECT id_recette
 FROM menu
   NATURAL JOIN recette
 WHERE menu.id_internaute = 0)
GROUP BY id_recette;

SELECT id_recette, AVG(note.valeur) as moyenne_notes
FROM menu
  NATURAL JOIN appartenir_menu
  NATURAL JOIN recette
  NATURAL JOIN note
WHERE menu.id_internaute = 0
GROUP BY id_recette;

-- le classement des ingrédients
--moyenne des notes des recettes enregistrées utilisant l'ingrédient
SELECT AVG(note.valeur)
FROM note
  NATURAL JOIN recette
  NATURAL JOIN composition_recette
WHERE composition_recette.id_ingredient = 0;

--Pour un ingrédient i, le ratio de calories R cal (i) est égal au nombre de calories de l’ingrédient
--divisé par la moyenne de l’ensemble des calories des ingrédients.

SELECT quantite_nutrition / moyenne_ensemble_calories
FROM (
SELECT id_ingredient, AVG(quantite_nutrition) as moyenne_ensemble_calories
FROM posseder_carac
  NATURAL JOIN carac_nutritionnelle
  NATURAL JOIN ingredient
WHERE nom_caracteristique = 'calorie'
GROUP BY id_ingredient)
WHERE id;


SELECT COUNT(id_recette)
FROM recette
