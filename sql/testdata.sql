DELETE FROM APPARTENIR_CATEGORIE;

DELETE FROM note;

DELETE FROM appartenir_menu;

DELETE FROM POSSEDER_CARAC;

DELETE FROM COMPOSITION_RECETTE;

DELETE FROM CATEGORIE;

DELETE FROM COMMENTAIRE;

DELETE FROM HISTORIQUE_MODIF;

DELETE FROM MENU;

DELETE FROM INTERNAUTE;

DELETE FROM CARAC_NUTRITIONNELLE;

DELETE FROM INGREDIENT;

DELETE FROM RECETTE;

INSERT INTO RECETTE (ID_RECETTE, NOM_RECETTE, DATE_CREATION_RECETTE, TEMPS_PREPARATION, TEMPS_CUISSON, NOMBRE_PERSONNES, TEXTE_PREPARATION)
VALUES
  (0, 'Gigot d''agneau aux épices', '2015-11-20', '0:25:00', '0:45:00', 8, '<p><strong>&Eacute;TAPE 1</strong></p>
      <p>Pelez l''ail et coupez-le en fines lamelles.</p>
      <p><strong>&Eacute;TAPE 2</strong></p>
      <p>Faites des entailles dans la chair du gigot pour y glisser les lamelles d''ail.</p>
      <p><strong>&Eacute;TAPE 3</strong></p>
      <p>Pilez l&eacute;g&egrave;rement les clous de girofle et la badiane.</p>
      <p><strong>&Eacute;TAPE 4</strong></p>
      <p>Hachez les piments, m&eacute;langez-les avec la badiane et les clous de girofle, ainsi que la cannelle &eacute;miett&eacute;e, le piment doux et le miel.</p>
      <p><strong>&Eacute;TAPE 5</strong></p>
      <p>Salez et poivrez l&eacute;g&egrave;rement.</p>
      <p><strong>&Eacute;TAPE 6</strong></p>
      <p>Tartinez le gigot de cette pr&eacute;paration et laissez mariner 12 heures en le retournant plusieurs fois pour ne pas qu''il s&egrave;che.</p>
      <p><strong>&Eacute;TAPE 7</strong></p>
      <p>Pr&eacute;chauffez le four th.8 (240&deg;C).</p>
      <p><strong>&Eacute;TAPE 8</strong></p>
      <p>D&eacute;posez le gigot dans un grand pat &agrave; four, c&ocirc;t&eacute; bomb&eacute; vers le bas. Enfournez pour 20 min, retournez-le et prolongez la cuisson de 25 min th.7 (210&deg;C) pour obtenir une viande ros&eacute;e.</p>
      <p><strong>&Eacute;TAPE 9</strong></p>
      <p>&Agrave; mi-cuisson, ajoutez quelques cuiller&eacute;es d''eau chaude et arrosez fr&eacute;quemment du jus form&eacute; pour rendre la viande bien tendre.</p>
      <p><strong>&Eacute;TAPE 10</strong></p>
      <p>Laissez reposer 10 min le gigot &agrave; four &eacute;teint, d&eacute;glacez le plat de quelques cuiller&eacute;es &agrave; soupe d''eau bouillante en grattant les sucs de cuisson.</p>
      <p><strong>&Eacute;TAPE 11</strong></p>
      <p>D&eacute;coupez-le gigot.</p>
      <p><strong>&Eacute;TAPE 12</strong></p>
      <p>Servez votre gigot d''agneau aux &eacute;pices napp&eacute; de sa sauce.</p>'),
  (1, 'Foie gras au confit d''oignons', '2014-12-20', '0:15:00', '0:50:00', 4, '<p><strong>&Eacute;TAPE 1</strong></p>
      <p>Pr&eacute;parez le confit d''oignons :</p>
      <p><strong>&Eacute;TAPE 2</strong></p>
      <p>Pelez et coupez en tranches les oignons en prenant bien soin de s&eacute;parer s&eacute;parer les anneaux.</p>
      <p><strong>&Eacute;TAPE 3</strong></p>
      <p>Dans une casserole &agrave; fond &eacute;pais, faites fondre le beurre et ajoutez les oignons et le sucre. Remuez, couvrez et laissez cuire pendant 30 minutes &agrave; feu doux tout en continuant de remuer de temps en temps.</p>
      <p><strong>&Eacute;TAPE 4</strong></p>
      <p>Lorsque les oignons sont bien tendres, ajoutez le vinaigre balsamique et laissez mijoter 20 minutes sans couvrir jusqu&rsquo;&agrave; ce que le vinaigre soit enti&egrave;rement absorb&eacute; et les oignons bien confits. Salez et poivrez.</p>
      <p><strong>&Eacute;TAPE 5</strong></p>
      <p>Retirez du feu et versez le confit dans un pot &agrave; confiture. Laissez refroidir et conservez au frais.</p>
      <p><strong>&Eacute;TAPE 6</strong></p>
      <p>Pr&eacute;parez le foie gras de canard et dressez</p>
      <p><strong>&Eacute;TAPE 7</strong></p>
      <p>Coupez le foie gras en cubes.</p>
      <p><strong>&Eacute;TAPE 8</strong></p>
      <p>Disposez un peu de confit d''oignons dans des cuill&egrave;res ap&eacute;ritives et d&eacute;posez par-dessus un cube de foie gras.</p>
      <p><strong>&Eacute;TAPE 9</strong></p>
      <p>Servez bien frais.</p>'),
  (2, 'petits choux fourrés aux crevettes, saumon et avocat', '2012-08-05', '0:20:00', '0:25:00', 6, '<p><strong>&Eacute;TAPE 1</strong></p>
    <p>Pr&eacute;chauffez le four th.6 (180&deg;C).</p>
    <p><strong>&Eacute;TAPE 2</strong></p>
    <p>Dans une casserole, faites fondre le beurre coup&eacute; en morceaux avec le sel.</p>
    <p><strong>&Eacute;TAPE 3</strong></p>
    <p>Retirez du feu et ajoutez la farine en une fois. M&eacute;langez avec une cuill&egrave;re jusqu&rsquo;&agrave; ce que la p&acirc;te se d&eacute;colle des parois.</p>
    <p><strong>&Eacute;TAPE 4</strong></p>
    <p>Ajoutez les &oelig;ufs l&rsquo;un apr&egrave;s l&rsquo;autre, en m&eacute;langeant bien, puis d&eacute;posez des petits tas de p&acirc;te avec une cuill&egrave;re ou une poche &agrave; douille sur une plaque de four recouverte de papier de cuisson.</p>
    <p><strong>&Eacute;TAPE 5</strong></p>
    <p>R&eacute;p&eacute;tez jusqu&rsquo;&agrave; &eacute;puisement de la p&acirc;te et enfournez pour 20 min, puis laissez refroidir.</p>
    <p><strong> &Eacute;TAPE 6</strong></p>
    <p>Pendant ce temps, &eacute;mincez le saumon en petits d&eacute;s. Retirez la peau de l&rsquo;avocat, d&eacute;noyautez-le et &eacute;mincez-le en d&eacute;s. Coupez les crevettes en morceaux.</p>
    <p><strong>&Eacute;TAPE 7</strong></p>
    <p>Dans un saladier, m&eacute;langez le fromage fouett&eacute; avec la mayonnaise. Salez, poivrez.</p>
    <p><strong>&Eacute;TAPE 8</strong></p>
    <p>Coupez le chapeau des choux. Fourrez avec une cuill&egrave;re de cr&egrave;me, quelques d&eacute;s de saumon, d&rsquo;avocat et de crevettes, puis replacez le chapeau.</p>
    <p><strong>&Eacute;TAPE 9</strong></p>
    <p>Servez vos petits choux fourr&eacute;s aux crevettes, saumon et avocat !</p>');


ALTER SEQUENCE recette_id_recette_seq RESTART WITH 3;

INSERT INTO INGREDIENT (ID_INGREDIENT, NOM_INGREDIENT) VALUES
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

INSERT INTO CARAC_NUTRITIONNELLE (ID_CARAC_NUTRITIONNELLE, NOM_CARACTERISTIQUE) VALUES
  (0, 'a'),
  (1, 'énergie'),
  (2, 'Protéines'),
  (3, 'Glucides'),
  (4, 'Lipides'),
  (5, 'Cholestérol'),
  (6, 'Fibres alimentaires');

ALTER SEQUENCE carac_nutritionnelle_id_carac_nutritionnelle_seq RESTART WITH 7;

INSERT INTO INTERNAUTE (ID_INTERNAUTE, PSEUDONYME, MOT_DE_PASSE) VALUES
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

INSERT INTO MENU (ID_MENU, ID_INTERNAUTE, NOM_MENU) VALUES
  (0, 0, 'Repas de Noël');
ALTER SEQUENCE menu_id_menu_seq RESTART WITH 1;

INSERT INTO HISTORIQUE_MODIF (ID_HISTORIQUE_MODIF, ID_INTERNAUTE, ID_RECETTE, DATE_CREATION_HISTORIQUE_MODIF, TEXTE_CONCERNE)
VALUES
  (0, 0, 0, DEFAULT, 'La version précédente de la recette du coup');

ALTER SEQUENCE historique_modif_id_historique_modif_seq RESTART WITH 1;

INSERT INTO COMMENTAIRE (ID_COMMENTAIRE, ID_INTERNAUTE, ID_RECETTE, TEXTE_COMMENTAIRE, DATE_CREATION_COMMENTAIRE) VALUES
  (0, 1, 0, 'Idéal pour les grands repas. Facile à préparer. Rien à redire sur la recette : un régal !',
   '2015-12-16 15:50:18+01'),
  (1, 2, 0, 'Très bonne recette d''autant plus que j''ai des invités ce soir !', '2015-12-23 18:40:18+01'),
  (2, 3, 1, 'Délicieux', '2014-12-25 18:05:04+01'),
  (3, 2, 1, 'Je recommande', '2015-12-31 21:50:56+01'),
  (4, 5, 2,
   'Je ne sais pas ce que j''ai mal fais mais je n''ai pas réussi à avoir des "choux" ma pâte n''a pas levée. Sinon c''est une bonne recette.',
   '2014-10-22 15:00:00+01'),
  (5, 6, 2, 'Pate liquide, mauvaise quantité de farine.', '2015-09-12 05:05:05+01'),
  (6, 7, 2,
   'Les faire aussi avec un mélange de tarama et fromage fouetté puis les décorez de saumon fumé et oeufs de lump, un petit brin d''aneth ou petit quartier de citron, délicieux !',
   '2016-10-21 15:00:00+01'),
  (7, 8, 2,
   'Ajouter un peu d''aneth et de poudre de gingembre avec une décoration de radis noir. Sinon les petits choux avec un dé de foie gras et décoré avec un glaçage au confit d''oignons ou de figues maison, c''est très bien aussi !',
   '2016-10-30 08:14:55+01');

ALTER SEQUENCE commentaire_id_commentaire_seq RESTART WITH 8;

INSERT INTO CATEGORIE (ID_CATEGORIE, NOM_CATEGORIE) VALUES
  (0, 'Gigot'),
  (1, 'Agneau'),
  (2, 'Plat'),
  (3, 'Entrée'),
  (4, 'Foie gras'),
  (5, 'Entrée'),
  (6, 'Crevettes'),
  (7, 'Saumon');

ALTER SEQUENCE categorie_id_categorie_seq RESTART WITH 8;

INSERT INTO composition_recette (ID_INGREDIENT, ID_RECETTE, QUANTITE, UNITE) VALUES
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

INSERT INTO POSSEDER_CARAC (ID_CARAC_NUTRITIONNELLE, ID_INGREDIENT, QUANTITE_NUTRITION, UNITE_NUTRITION) VALUES
  (1, 0, 181, 'kcal'),
  (2, 0, 27.7, 'g'),
  (3, 0, 0.0, 'g'),
  (4, 0, 7.0, 'g'),
  (5, 0, 100, 'mg'),
  (6, 0, 0.0, 'g'),
  (1, 1, 4, 'kcal'),
  (2, 1, 0.2, 'g'),
  (3, 1, 0.8, 'g'),
  (4, 1, 0.1, 'g'),
  (6, 1, 0.4, 'g'),
  (1, 2, 4, 'kcal'),
  (2, 2, 0.2, 'g'),
  (3, 2, 1, 'g'),
  (4, 2, 0.0, 'g'),
  (6, 2, 0.1, 'g'),
  (1, 3, 400, 'kcal'),
  (2, 3, 18, 'g'),
  (3, 3, 10, 'g'),
  (4, 3, 16, 'g'),
  (6, 3, 32, 'g'),
  (1, 4, 400, 'kcal'),
  (2, 4, 18, 'g'),
  (3, 4, 10, 'g'),
  (4, 4, 16, 'g'),
  (6, 4, 32, 'g'),
  (1, 5, 400, 'kcal'),
  (2, 5, 18, 'g'),
  (3, 5, 10, 'g'),
  (4, 5, 16, 'g'),
  (6, 5, 32, 'g'),
  (1, 6, 400, 'kcal'),
  (2, 6, 18, 'g'),
  (3, 6, 10, 'g'),
  (4, 6, 16, 'g'),
  (6, 6, 32, 'g'),
  (1, 7, 400, 'kcal'),
  (2, 7, 18, 'g'),
  (3, 7, 10, 'g'),
  (4, 7, 16, 'g'),
  (6, 7, 32, 'g'),
  (1, 8, 0, 'kcal'),
  (2, 8, 18, 'g'),
  (3, 8, 10, 'g'),
  (4, 8, 16, 'g'),
  (6, 8, 32, 'g'),
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


INSERT INTO appartenir_categorie (ID_RECETTE, ID_CATEGORIE) VALUES
  (0, 0),
  (0, 1),
  (0, 2),
  (1, 3),
  (1, 4),
  (2, 5),
  (2, 6),
  (2, 7);

INSERT INTO appartenir_menu (ID_MENU, ID_RECETTE, ID_CATEGORIE, DATE_CREATION_APPARTENIR_MENU) VALUES
  (0, 0, 2, '2016-11-19'),
  (0, 1, 3, '2016-11-20'),
  (0, 2, 5, '2016-11-11');

INSERT INTO NOTE (ID_RECETTE, ID_INTERNAUTE, VALEUR) VALUES
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

