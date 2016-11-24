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
SELECT id_ingredient, nom_ingredient, (moyenne_recette * ratio_calories * somme_commentaires) as classement
FROM ingredient INNER JOIN
  (SELECT id_ingredient as i1, AVG(note.valeur) as moyenne_recette
FROM note
  NATURAL JOIN recette
  NATURAL JOIN composition_recette
GROUP BY id_ingredient) AS moy_recette_tab ON id_ingredient = i1
  INNER JOIN (SELECT i2, (quantite_nutrition / moyenne_ensemble_calories) as ratio_calories
FROM (
SELECT quantite_nutrition, id_ingredient as i2, AVG(quantite_nutrition) as moyenne_ensemble_calories
FROM posseder_carac
  NATURAL JOIN carac_nutritionnelle
  NATURAL JOIN ingredient
WHERE nom_caracteristique = 'calorie'
GROUP BY quantite_nutrition, id_ingredient) AS moy_tab) AS ratio_cal_tab ON i1 = i2
  INNER JOIN
  (SELECT id_ingredient as i3, SUM(coeff_commentaire) AS somme_commentaires
   FROM
     (SELECT id_ingredient, CASE
      WHEN COUNT(id_commentaire) <= 3 THEN 1
      WHEN COUNT(id_commentaire) > 4 AND COUNT(id_commentaire) <= 10 THEN 2
      WHEN COUNT(id_commentaire) > 10 THEN 3
      END as coeff_commentaire
      FROM commentaire
      NATURAL JOIN recette
      NATURAL JOIN composition_recette
      GROUP BY id_ingredient) AS coeff_comm_tab
   GROUP BY id_ingredient) AS somm_comm_tab ON i2 = i3
WHERE id_ingredient = i1 AND i1 = i2 AND i1 = i3
ORDER BY classement;

--moyenne des notes des recettes enregistrées utilisant l'ingrédient
SELECT id_ingredient as i1, AVG(note.valeur) as moyenne_recette
FROM note
  NATURAL JOIN recette
  NATURAL JOIN composition_recette;

--Pour un ingrédient i, le ratio de calories R cal (i) est égal au nombre de calories de l’ingrédient
--divisé par la moyenne de l’ensemble des calories des ingrédients.
SELECT i2, (quantite_nutrition / moyenne_ensemble_calories) as ratio_calories
FROM (
SELECT quantite_nutrition, id_ingredient as i2, AVG(quantite_nutrition) as moyenne_ensemble_calories
FROM posseder_carac
  NATURAL JOIN carac_nutritionnelle
  NATURAL JOIN ingredient
WHERE nom_caracteristique = 'calorie'
GROUP BY quantite_nutrition, id_ingredient) AS moy_tab;

-- r (C com (r)) : la somme, pour toutes les recettes utilisant l’ingrédient du coefficient de commentaire :
-- 1 jusqu’à 3 commentaires,
-- 2 jusqu’à 10 commentaires,
-- 3 si il y a plus de 10 commentaires.
SELECT id_ingredient as i3,
  SUM(CASE
    WHEN COUNT(id_commentaire) <= 3 THEN 1
    WHEN COUNT(id_commentaire) > 4 AND COUNT(id_commentaire) <= 10 THEN 2
    WHEN COUNT(id_commentaire) > 10 THEN 3
  END)
FROM commentaire
  NATURAL JOIN recette
  NATURAL JOIN composition_recette
GROUP BY id_ingredient;