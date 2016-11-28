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

-- le classement des ingrédients (les sous-requêtes séparées à la suite pour plus de lisibilité)
SELECT ingredient.id_ingredient, nom_ingredient, (moyenne_recette * ratio_calories * somme_commentaires) as score_classement
FROM ingredient
  INNER JOIN
    (SELECT id_ingredient, AVG(note.valeur) as moyenne_recette
    FROM note
    NATURAL JOIN recette
    NATURAL JOIN composition_recette
    GROUP BY id_ingredient) AS moy_recette_tab
  ON moy_recette_tab.id_ingredient = ingredient.id_ingredient
  INNER JOIN
    (SELECT id_ingredient,
       (quantite_nutrition / (SELECT AVG(quantite_nutrition) as moyenne_ensemble_calories
                              FROM posseder_carac
                              INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle
                              WHERE nom_caracteristique = 'énergie')
       ) as ratio_calories
    FROM posseder_carac
    INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle
    WHERE nom_caracteristique = 'énergie') AS ratio_cal_tab
  ON moy_recette_tab.id_ingredient = ratio_cal_tab.id_ingredient
  INNER JOIN
  (SELECT id_ingredient, SUM(coeff_commentaire) as somme_commentaires
  FROM
    (SELECT id_recette,
       CASE
        WHEN COUNT(id_commentaire) <= 3 THEN 1
        WHEN COUNT(id_commentaire) >= 4 AND COUNT(id_commentaire) <= 10 THEN 2
        WHEN COUNT(id_commentaire) > 10 THEN 3
       END as coeff_commentaire
    FROM commentaire
    GROUP BY commentaire.id_recette) as coeff_comm_tab
  INNER JOIN composition_recette ON coeff_comm_tab.id_recette = composition_recette.id_recette
  GROUP BY id_ingredient) AS somm_comm_tab
  ON ratio_cal_tab.id_ingredient = somm_comm_tab.id_ingredient
ORDER BY score_classement DESC;

--moyenne des notes des recettes enregistrées utilisant l'ingrédient
SELECT id_ingredient as i1, AVG(note.valeur) as moyenne_recette
FROM note
  NATURAL JOIN recette
  NATURAL JOIN composition_recette
GROUP BY id_ingredient;

--Pour un ingrédient i, le ratio de calories R cal (i) est égal au nombre de calories de l’ingrédient
--divisé par la moyenne de l’ensemble des calories des ingrédients.
SELECT id_ingredient, (quantite_nutrition / (SELECT AVG(quantite_nutrition) as moyenne_ensemble_calories
FROM posseder_carac
  INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle
  INNER JOIN ingredient ON posseder_carac.id_ingredient = ingredient.id_ingredient
  WHERE nom_caracteristique = 'énergie')) as ratio_calories
  FROM posseder_carac
  INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle
WHERE nom_caracteristique = 'énergie';

-- la somme, pour toutes les recettes utilisant l’ingrédient du coefficient de commentaire :
-- 1 jusqu’à 3 commentaires,
-- 2 jusqu’à 10 commentaires,
-- 3 si il y a plus de 10 commentaires.
SELECT id_ingredient, SUM(coeff_commentaire)
FROM (SELECT id_recette, CASE
      WHEN COUNT(id_commentaire) <= 3 THEN 1
      WHEN COUNT(id_commentaire) >= 4 AND COUNT(id_commentaire) <= 10 THEN 2
      WHEN COUNT(id_commentaire) > 10 THEN 3
      END as coeff_commentaire
      FROM commentaire
      GROUP BY commentaire.id_recette) as coeff_comm_tab
  INNER JOIN recette ON coeff_comm_tab.id_recette = recette.id_recette
  INNER JOIN composition_recette ON coeff_comm_tab.id_recette = composition_recette.id_recette
GROUP BY id_ingredient;
