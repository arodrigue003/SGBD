drop index IF EXISTS APP_RECETTE2_FK;

drop index IF EXISTS APP_RECETTE3_FK;

drop index IF EXISTS APP_RECETTE_FK;

drop index IF EXISTS APP_CAT2_FK;

drop index IF EXISTS APP_CAT_FK;

drop index IF EXISTS CONCERNER_FK;

drop index IF EXISTS ECRIRE_FK;

drop index IF EXISTS INGR_RECETTE2_FK;

drop index IF EXISTS INGR_RECETTE_FK;

drop index IF EXISTS MODIFIER_FK;

drop index IF EXISTS CREER_FK;

drop index IF EXISTS NOTER_RECETTE2_FK;

drop index IF EXISTS NOTER_RECETTE_FK;

drop index IF EXISTS POSSEDER_CARAC2_FK;

drop index IF EXISTS POSSEDER_CARAC_FK;

drop table IF EXISTS appartenir_menu CASCADE;

drop table IF EXISTS CARAC_NUTRITIONNELLE CASCADE;

drop table IF EXISTS APPARTENIR_CATEGORIE CASCADE;

drop table IF EXISTS CATEGORIE CASCADE;

drop table IF EXISTS COMMENTAIRE CASCADE;

drop table IF EXISTS composition_recette CASCADE;

drop table IF EXISTS HISTORIQUE_MODIF CASCADE;

drop table IF EXISTS INGREDIENT CASCADE;

drop table IF EXISTS INTERNAUTE CASCADE;

drop table IF EXISTS MENU CASCADE;

drop table IF EXISTS NOTE CASCADE;

drop table IF EXISTS POSSEDER_CARAC CASCADE;

drop table IF EXISTS RECETTE CASCADE;

drop TYPE IF EXISTS unite_nutrition;

DROP TYPE IF EXISTS unite;

drop FUNCTION IF EXISTS date_commentaire();

drop FUNCTION IF EXISTS date_modification();