/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 7.3                                */
/* Date de création :  18/11/2016 17:50:46                      */
/*==============================================================*/


/* Informations sur une recette */
SELECT *
FROM recette
WHERE id_recette = 1
ORDER BY nom_recette ASC;

/* Ingredients d'une recette */
SELECT *
FROM ingredients_recette
WHERE id_recette = 1
ORDER BY ingredient ASC;

/* Note moyenne d'une recette */
SELECT AVG(valeur)
FROM note
WHERE id_recette = 2;

/* Commentaires d'une recette */
SELECT commentaire.date_creation_commentaire AS date_creation,
  recette.id_recette AS id_recette,
  commentaire.texte_commentaire AS text,
  internaute.pseudonyme AS pseudo,
  note.valeur AS note
FROM commentaire
NATURAL JOIN recette
NATURAL JOIN internaute
NATURAL JOIN note
WHERE id_recette=2;

/* Contenu d'un menu */
SELECT menu.nom_menu AS nom_menu,
  recette.id_recette AS id_recette,
  recette.nom_recette AS nom_recette,
  appartenir_menu.date_creation_appartenir_menu AS date_ajout
FROM recette
NATURAL JOIN appartenir_menu
NATURAL JOIN menu
WHERE id_menu = 0
ORDER BY recette.nom_recette ASC;

/* Les recettes d'une catégorie pour un nombre de personnes données */
SELECT recette.id_recette AS id_recette,
  recette.nom_recette AS nom_recette
From recette
NATURAL JOIN appartenir_categorie
NATURAL JOIN categorie
WHERE categorie.id_categorie = 2 AND
  recette.nombre_personnes = 8
ORDER BY nom_recette ASC;

/* Les menus avec seulement des recettes ajoutées après une date donnée */
SELECT menu.id_menu AS id_menu,
  menu.nom_menu AS nom_menu
FROM menu
WHERE menu.id_menu NOT IN
  (SELECT appartenir_menu.id_menu
    FROM appartenir_menu
    WHERE appartenir_menu.date_creation_appartenir_menu <= '2016-11-10'
    GROUP BY appartenir_menu.id_menu)
ORDER BY nom_menu;

/* L’historique des préparations d’une recette */
SELECT historique_modif.date_creation_historique_modif,
  historique_modif.texte_concerne
FROM historique_modif
WHERE historique_modif.id_recette = 0
ORDER BY historique_modif.date_creation_historique_modif ASC;

/* L’ensemble des menus contenant des recettes avec des ingrédients peu caloriques */
/* Il faut définir peu calorique */

/* sucré-salé : on utilise à la fois du miel et du sel*/
SELECT ingredients_recette.id_recette AS id_recette,
  ingredients_recette.nom_recette AS nom_recette
FROM ingredients_recette
WHERE ingredients_recette.ingredient = 'miel' OR
  ingredients_recette.ingredient = 'sel'
GROUP BY ingredients_recette.id_recette,
  ingredients_recette.nom_recette
HAVING count(*) = 2
ORDER BY ingredients_recette.nom_recette;

/* Top : Les recettes ont été notée par plus de cinq internautes à 3 */
SELECT recette.id_recette AS id_recette,
  recette.nom_recette AS nom_recette
FROM recette
NATURAL JOIN note
WHERE note.valeur = 3
GROUP BY recette.id_recette,
  recette.nom_recette
HAVING count(*) >= 5
ORDER BY nom_recette;

/* Commune : les recettes sont présentes dans trois menus et *
 * ont reçu plus de 10 notes et plus de 3 commentaires.      */
SELECT P2.id_recette AS id_recette,
  P2.nom_recette AS nom_recette
FROM menu
NATURAL JOIN
  (SELECT P1.id_recette,
    P1.nom_recette
  FROM commentaire
  NATURAL JOIN
    (SELECT recette.id_recette AS id_recette,
      recette.nom_recette AS nom_recette
    FROM recette
    NATURAL JOIN note
    GROUP BY recette.id_recette, recette.nom_recette
    HAVING count(note.valeur) >= 5) AS P1
  GROUP BY P1.id_recette, P1.nom_recette
  HAVING count(commentaire.id_recette) >= 3) AS P2
GROUP BY P2.id_recette, P2.nom_recette
HAVING  count(menu.nom_menu) >= 1
ORDER BY nom_recette;
