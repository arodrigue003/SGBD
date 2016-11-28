delete from APPARTENIR_CATEGORIE;

delete from note;

delete from appartenir_menu;

delete from POSSEDER_CARAC;

delete from COMPOSITION_RECETTE;

delete from CATEGORIE;

delete from COMMENTAIRE;

delete from HISTORIQUE_MODIF;

delete from MENU;

delete from INTERNAUTE;

delete from CARAC_NUTRITIONNELLE;

delete from INGREDIENT;

delete from RECETTE;

insert into RECETTE (ID_RECETTE, NOM_RECETTE, DATE_CREATION_RECETTE, TEMPS_PREPARATION, TEMPS_CUISSON, NOMBRE_PERSONNES, TEXTE_PREPARATION) values
	(0, 'Gigot d''agneau aux épices', '2015-11-20', '0:25:00', '0:45:00', 8, 'ÉTAPE 1
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
		Servez votre gigot d''agneau aux épices nappé de sa sauce.'),
	(1, 'Foie gras au confit d''oignons', '2014-12-20', '0:15:00', '0:50:00', 4, 'ÉTAPE 1
		Préparez le confit d''oignons :
		ÉTAPE 2
		Pelez et coupez en tranches les oignons en prenant bien soin de séparer séparer les anneaux.
		ÉTAPE 3
		Dans une casserole à fond épais, faites fondre le beurre et ajoutez les oignons et le sucre. Remuez, couvrez et laissez cuire pendant 30 minutes à feu doux tout en continuant de remuer de temps en temps.
		ÉTAPE 4
		Lorsque les oignons sont bien tendres, ajoutez le vinaigre balsamique et laissez mijoter 20 minutes sans couvrir jusqu’à ce que le vinaigre soit entièrement absorbé et les oignons bien confits. Salez et poivrez.
		ÉTAPE 5
		Retirez du feu et versez le confit dans un pot à confiture. Laissez refroidir et conservez au frais.
		ÉTAPE 6
		Préparez le foie gras de canard et dressez
		ÉTAPE 7
		Coupez le foie gras en cubes.
		ÉTAPE 8
		Disposez un peu de confit d''oignons dans des cuillères apéritives et déposez par-dessus un cube de foie gras.
		ÉTAPE 9
		Servez bien frais.'),
	(2, 'petits choux fourrés aux crevettes, saumon et avocat', '2015-08-05', '0:20:00', '0:25:00', 6, 'ÉTAPE 1
		Préchauffez le four th.6 (180°C).
		ÉTAPE 2
		Dans une casserole, faites fondre le beurre coupé en morceaux avec le sel.
		ÉTAPE 3
		Retirez du feu et ajoutez la farine en une fois. Mélangez avec une cuillère jusqu’à ce que la pâte se décolle des parois.
		ÉTAPE 4
		Ajoutez les œufs l’un après l’autre, en mélangeant bien, puis déposez des petits tas de pâte avec une cuillère ou une poche à douille sur une plaque de four recouverte de papier de cuisson.
		ÉTAPE 5
		Répétez jusqu’à épuisement de la pâte et enfournez pour 20 min, puis laissez refroidir.
		ÉTAPE 6
		Pendant ce temps, émincez le saumon en petits dés. Retirez la peau de l’avocat, dénoyautez-le et émincez-le en dés. Coupez les crevettes en morceaux.
		ÉTAPE 7
		Dans un saladier, mélangez le fromage fouetté avec la mayonnaise. Salez, poivrez.
		ÉTAPE 8
		Coupez le chapeau des choux. Fourrez avec une cuillère de crème, quelques dés de saumon, d’avocat et de crevettes, puis replacez le chapeau.
		ÉTAPE 9
		Servez vos petits choux fourrés aux crevettes, saumon et avocat !');


ALTER SEQUENCE recette_id_recette_seq RESTART WITH 3;

insert into INGREDIENT (ID_INGREDIENT, NOM_INGREDIENT) values 
	(0, 'Gigot d''agneau'),
	(1, 'piment'),
	(2, 'ail'),
	(3, 'piment oiseau'),
	(4, 'étoile de badiane'),
	(5, 'clou de girofle'),
	(6, 'bâton de cannelles émiettés'),
	(7, 'miel'),
	(8, 'sel'),
	(9, 'bloc de foie gras'),
	(10, 'beurre'),
	(11, 'oignons'),
	(12, 'sucre'),
	(13, 'vinaigre balsamique'),
	(14, 'poivre'),
	(15, 'farine'),
	(16, 'eau'),
	(17, 'gros oeufs'),
	(18, 'crevettes cuites et décortiquées'),
	(19, 'saumon frais'),
	(20, 'avocat'),
	(21, 'pot de fromage fouetté nature'),
	(22, 'mayonnaise');

ALTER SEQUENCE ingredient_id_ingredient_seq RESTART WITH 23;

insert into CARAC_NUTRITIONNELLE (ID_CARAC_NUTRITIONNELLE, NOM_CARACTERISTIQUE) values
	(0, 'a'),
	(1, 'énergie');

ALTER SEQUENCE carac_nutritionnelle_id_carac_nutritionnelle_seq RESTART WITH 2;

insert into INTERNAUTE (ID_INTERNAUTE, PSEUDONYME, MOT_DE_PASSE) values
	(0, 'CuisineAZ', ''),
	(1, 'Bibiche', ''),
	(2, 'Sami61', ''),
	(3, 'Valerie', ''),
	(4, 'Adrien', ''),
	(5, 'Mouustik', ''),
	(6, 'Elisa', ''),
	(7, 'Chantal', ''),
	(8, 'Nathalie', '');

ALTER SEQUENCE internaute_id_internaute_seq RESTART WITH 9;

insert into MENU (ID_MENU, ID_INTERNAUTE, NOM_MENU) values 
	(0, 0, 'Repas de Noël');
ALTER SEQUENCE menu_id_menu_seq RESTART WITH 1;

insert into HISTORIQUE_MODIF (ID_HISTORIQUE_MODIF, ID_INTERNAUTE, ID_RECETTE, DATE_CREATION_HISTORIQUE_MODIF, TEXTE_CONCERNE) values
	(0, 0, 0, DEFAULT, 'La version précédente de la recette du coup');

ALTER SEQUENCE historique_modif_id_historique_modif_seq RESTART WITH 1;

insert into COMMENTAIRE (ID_COMMENTAIRE, ID_INTERNAUTE, ID_RECETTE, TEXTE_COMMENTAIRE, DATE_CREATION_COMMENTAIRE) values
	(0, 1, 0, 'Idéal pour les grands repas. Facile à préparer. Rien à redire sur la recette : un régal !', '2015-12-16 15:50:18+01'),
	(1, 2, 0, 'Très bonne recette d''autant plus que j''ai des invités ce soir !', '2015-12-23 18:40:18+01'),
	(2, 3, 1, 'Délicieux', '2014-12-25 18:05:04+01'),
	(3, 2, 1, 'Je recommande', '2015-12-31 21:50:56+01'),
	(4, 5, 2, 'Je ne sais pas ce que j''ai mal fais mais je n''ai pas réussi à avoir des "choux" ma pâte n''a pas levée. Sinon c''est une bonne recette.', '2016-10-22 15:00:00+01'),
	(5, 6, 2, 'Pate liquide, mauvaise quantité de farine.', '2015-11-12 05:05:05+01'),
	(6, 7, 2, 'Les faire aussi avec un mélange de tarama et fromage fouetté puis les décorez de saumon fumé et oeufs de lump, un petit brin d''aneth ou petit quartier de citron, délicieux !', '2016-10-21 15:00:00+01'),
	(7, 8, 2, 'Ajouter un peu d''aneth et de poudre de gingembre avec une décoration de radis noir. Sinon les petits choux avec un dé de foie gras et décoré avec un glaçage au confit d''oignons ou de figues maison, c''est très bien aussi !', '2016-10-15 08:14:55+01');

ALTER SEQUENCE commentaire_id_commentaire_seq RESTART WITH 8;

insert into CATEGORIE (ID_CATEGORIE, NOM_CATEGORIE) values 
	(0, 'Gigot'),
	(1, 'Agneau'),
	(2, 'Plat'),
	(3, 'Entrée'),
	(4, 'Foie gras'),
	(5, 'Entrée'),
	(6, 'Crevettes'),
	(7, 'Saumon');

ALTER SEQUENCE categorie_id_categorie_seq RESTART WITH 8;

insert into composition_recette (ID_INGREDIENT, ID_RECETTE, QUANTITE, UNITE) values
	(0, 0, 1.5, 'kg'),
	(1, 0, 4, 'pincée(s)'),
	(2, 0, 6, 'gousse(s)'),
	(3, 0, 2, ''),
	(4, 0, 6, ''),
	(5, 0, 8, ''),
	(6, 0, 2, ''),
	(7, 0, 4, 'c. à soupe'),
	(8, 0, 0, ''),
	(9, 1, 0.5, ''),
	(10, 1, 10, 'g'),
	(11, 1, 250, 'g'),
	(12, 1, 1, 'c. à soupe'),
	(13, 1, 3, 'cL'),
	(8, 1, 0, ''),
	(14, 1, 0, ''),
	(15, 2, 120, 'g'),
	(10, 2, 75, 'g'),
	(16, 2, 20, 'cL'),
	(17, 2, 3, ''),
	(8, 2, 0.5, 'c. à café'),
	(18, 2, 100, 'g'),
	(19, 2, 100, 'g'),
	(20, 2, 1, ''),
	(21, 2, 3, 'c. à soupe'),
	(14, 2, 0, '');
	

insert into POSSEDER_CARAC (ID_CARAC_NUTRITIONNELLE, ID_INGREDIENT, QUANTITE_NUTRITION, UNITE_NUTRITION) values
	(0, 0, 0, 'g'),
	(1, 0, 500, 'kcal'),
	(1, 1, 10, 'kcal'),
	(1, 2, 10, 'kcal'),
	(1, 3, 20, 'kcal'),
	(1, 4, 30, 'kcal'),
	(1, 5, 30, 'kcal'),
	(1, 6, 10, 'kcal'),
	(1, 7, 100, 'kcal'),
	(1, 8, 5, 'kcal'),
	(1, 9, 1000, 'kcal'),
	(1, 10, 300, 'kcal'),
	(1, 11, 50, 'kcal'),
	(1, 12, 100, 'kcal'),
	(1, 13, 50, 'kcal'),
	(1, 14, 10, 'kcal'),
	(1, 15, 50, 'kcal'),
	(1, 16, 0, 'kcal'),
	(1, 17, 130, 'kcal'),
	(1, 18, 70, 'kcal'),
	(1, 19, 20, 'kcal'),
	(1, 20, 15, 'kcal'),
	(1, 21, 10, 'kcal'),
	(1, 22, 20, 'kcal');

insert into appartenir_menu (ID_MENU, ID_RECETTE, ID_CATEGORIE, DATE_CREATION_APPARTENIR_MENU) values
	(0, 0, 2, '2016-11-19'),
	(0, 1, 3, '2016-11-20'),
	(0, 2, 5, '2016-11-11');

insert into NOTE (ID_RECETTE, ID_INTERNAUTE, VALEUR) values
	(0, 1, 2),
	(0, 2, 3),
	(1, 1, 2),
	(1, 2, 3),
	(1, 3, 1),
	(2, 5, 1),
	(2, 4, 2),
	(2, 7, 3),
	(2, 6, 3),
	(2, 3, 3);

insert into appartenir_categorie (ID_RECETTE, ID_CATEGORIE) values
	(0, 0),
	(0, 1),
	(0, 2),
	(1, 3),
	(1, 4),
	(2, 5),
	(2, 6),
	(2, 7);
