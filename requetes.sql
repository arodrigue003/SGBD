/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 7.3                                */
/* Date de création :  18/11/2016 17:50:46                      */
/*==============================================================*/


/* Informations sur une recette */
SELECT * FROM recette WHERE id_recette = 1;

/* Ingredients d'une recette */
SELECT * FROM ingredients_recette WHERE id_recette = 1;

/* Contenu d'un menu */
SELECT menu.nom_menu AS nom_menu,
  recette.id_recette AS id_recette,
  recette.nom_recette AS nom_recette
FROM recette
NATURAL JOIN menu
WHERE id_menu = 0;

/* Les recettes d'une catégorie pour un nombre de personnes données */
SELECT recette.id_recette AS id_recette,
  recette.nom_recette AS nom_recette
From recette
INNER JOIN