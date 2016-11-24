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
