delete from CATEGORIE;

delete from NOTES;

delete from APPARTENIR;

delete from NUTRITION;

delete from COMPOSITION;

delete from CATEGORIE_RECETTE;

delete from COMMENTAIRE;

delete from HISTORIQUE_MODIFICATION;

delete from MENU;

delete from INTERNAUTE;

delete from CARACTERISTIQUE_NUTRITIONNEL;

delete from INGREDIENT;

delete from RECETTE_DE_CUISINE;

insert into RECETTE_DE_CUISINE (ID_RECETTE, "NOM RECETTE", "DATE D'AJOUT DANS LA BASE", "TEMPS DE PREPARATION", "TEMPS DE CUISSON", "NOMBRE DE PERSONNES", PREPARATION) values 
	(0, 'Gigot d''agneau aux épices', '2015-11-20', '0:0:25', '0:0:45', 8, 'ÉTAPE 1
			Pelez l''ail et coupez-le en fines lamelles.
			ÉTAPE 2
			Faites des entailles dans la chair du gigot pour y glisser les lamelles d''ail.
			ÉTAPE 3
			Pilez légèrement les clous de girofle et la badiane.
			ÉTAPE 4
			Hachez les piments, mélangez-les avec la badiane et les clous de girofle, ainsi que la cannelle émiettée, le piment doux et le miel.
			ÉTAPE 5
			Salez et poivrez légèrement.
			ÉTAPE 6
			Tartinez le gigot de cette préparation et laissez mariner 12 heures en le retournant plusieurs fois pour ne pas qu''il sèche.
			ÉTAPE 7
			Préchauffez le four th.8 (240°C).
			ÉTAPE 8
			Déposez le gigot dans un grand pat à four, côté bombé vers le bas. Enfournez pour 20 min, retournez-le et prolongez la cuisson de 25 min th.7 (210°C) pour obtenir une viande rosée.
			ÉTAPE 9
			À mi-cuisson, ajoutez quelques cuillerées d''eau chaude et arrosez fréquemment du jus formé pour rendre la viande bien tendre.
			ÉTAPE 10
			Laissez reposer 10 min le gigot à four éteint, déglacez le plat de quelques cuillerées à soupe d''eau bouillante en grattant les sucs de cuisson.
			ÉTAPE 11
			Découpez-le gigot.
			ÉTAPE 12
			Servez votre gigot d''agneau aux épices nappé de sa sauce.');

insert into INGREDIENT (ID_INGREDIENT, "NOM INGREDIENT") values 
	(0, 'Gigot d''agneau'),
	(1, 'piment'),
	(2, 'ail'),
	(3, 'piment oiseau'),
	(4, 'étoile de badiane'),
	(5, 'clou de girofle'),
	(6, 'bâton de cabbelles émiettés'),
	(7, 'miel'),
	(8, 'Sel');

insert into CARACTERISTIQUE_NUTRITIONNEL (ID_CARACTERISTIQUE, "NOM CARACTERISTIQUE") values 
	(0, 'a');

insert into INTERNAUTE (ID_INTERNAUTE, PSEUDONYME) values 
	(0, 'CuisineAZ'),
	(1, 'Bibiche'),
	(2, 'Sami61');

insert into MENU (ID_MENU, ID_INTERNAUTE, "NOM MENU") values 
	(0, 0, 'Repas de Noël');

insert into HISTORIQUE_MODIFICATION (ID_MODIFICATION, ID_INTERNAUTE, ID_RECETTE, "DATE D'ECRITURE", "DATE DE DEBUT DE VALIDITE", "DATE DE FIN DE VALIDITE", "TEXTE CONCERNE") values 
	(0, 0, 0, DEFAULT, DEFAULT, NULL, 'Un diff à priories');

insert into COMMENTAIRE (ID_COMMENTAIRE, ID_INTERNAUTE, ID_RECETTE, TEXTE, "DATE DE CREATION") values 
	(0, 1, 0, 'Idéal pour les grands repas. Facile à préparer. Rien à redire sur la recette : un régal !', '2015-12-16 15:50:18+01'),
	(1, 2, 0, 'Très bonne recette d''autant plus que j''ai des invités ce soir !', '2015-12-23 18:40:18+01');

insert into CATEGORIE_RECETTE (ID_CATEGORIE, "NOM CATEGORIE") values 
	(0, 'Gigot'),
	(1, 'agneau'),
	(2, 'Plat');

insert into COMPOSITION (ID_INGREDIENT, ID_RECETTE, QUANTITE, UNITE) values 
	(0, 0, 1.5, 'kg'),
	(1, 0, 4, 'pincée(s)'),
	(2, 0, 6, 'gousse(s)'),
	(3, 0, 2, ''),
	(4, 0, 6, ''),
	(5, 0, 8, ''),
	(6, 0, 2, ''),
	(7, 0, 4, 'c. à soupe');

insert into NUTRITION (ID_CARACTERISTIQUE, ID_INGREDIENT, "QUANTITE NUTRITIONNEL") values 
	(0, 0, 0);

insert into APPARTENIR (ID_MENU, ID_RECETTE, ID_CATEGORIE, "DATE D'AJOUT") values 
	(0, 0, 2, '2016-11-19');

insert into NOTES (ID_RECETTE, ID_INTERNAUTE, NOTE) values 
	(0, 1, 2),
	(0, 2, 3);

insert into CATEGORIE (ID_RECETTE, ID_CATEGORIE) values 
	(0, 0),
	(0, 1),
	(0, 2);
