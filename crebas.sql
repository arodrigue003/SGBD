/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 7.3                                */
/* Date de création :  18/11/2016 17:27:26                      */
/*==============================================================*/


drop index APP_RECETTE2_FK;

drop index APP_RECETTE3_FK;

drop index APP_RECETTE_FK;

drop index APP_CAT2_FK;

drop index APP_CAT_FK;

drop index CONCERNER_FK;

drop index ECRIRE_FK;

drop index RECETTE_MODIFIE2_FK;

drop index RECETTE_MODIFIE_FK;

drop index INGR_RECETTE2_FK;

drop index INGR_RECETTE_FK;

drop index MODIFIER_FK;

drop index CREER_FK;

drop index NOTER_RECETTE2_FK;

drop index NOTER_RECETTE_FK;

drop index POSSEDER_CARAC2_FK;

drop index POSSEDER_CARAC_FK;

drop table APPARTENIR;

drop table APPARTENIR_CAT;

drop table CARACTERISTIQUE_NUTRITIONNEL;

drop table CATEGORIE_RECETTE;

drop table COMMENTAIRE;

drop table CONCERNER;

drop table ETRE_COMPOSE;

drop table HISTORIQUE_MODIFICATION;

drop table INGREDIENT;

drop table INTERNAUTE;

drop table MENU;

drop table NOTER;

drop table POSSEDER;

drop table RECETTE_DE_CUISINE;

/*==============================================================*/
/* Table : APPARTENIR                                           */
/*==============================================================*/
create table APPARTENIR (
ID_MENU              INT4                 not null,
ID_RECETTE           INT4                 not null,
ID_CATEGORIE         INT4                 not null,
"DATE D'AJOUT"       DATE                 null,
PLACE                CHAR(255)            null,
constraint PK_APPARTENIR primary key (ID_MENU, ID_RECETTE, ID_CATEGORIE)
);

/*==============================================================*/
/* Index : APP_RECETTE_FK                                       */
/*==============================================================*/
create  index APP_RECETTE_FK on APPARTENIR (
ID_MENU
);

/*==============================================================*/
/* Index : APP_RECETTE2_FK                                      */
/*==============================================================*/
create  index APP_RECETTE2_FK on APPARTENIR (
ID_RECETTE
);

/*==============================================================*/
/* Index : APP_RECETTE3_FK                                      */
/*==============================================================*/
create  index APP_RECETTE3_FK on APPARTENIR (
ID_CATEGORIE
);

/*==============================================================*/
/* Table : APPARTENIR_CAT                                       */
/*==============================================================*/
create table APPARTENIR_CAT (
ID_RECETTE           INT4                 not null,
ID_CATEGORIE         INT4                 not null,
constraint PK_APPARTENIR_CAT primary key (ID_RECETTE, ID_CATEGORIE)
);

/*==============================================================*/
/* Index : APP_CAT_FK                                           */
/*==============================================================*/
create  index APP_CAT_FK on APPARTENIR_CAT (
ID_RECETTE
);

/*==============================================================*/
/* Index : APP_CAT2_FK                                          */
/*==============================================================*/
create  index APP_CAT2_FK on APPARTENIR_CAT (
ID_CATEGORIE
);

/*==============================================================*/
/* Table : CARACTERISTIQUE_NUTRITIONNEL                         */
/*==============================================================*/
create table CARACTERISTIQUE_NUTRITIONNEL (
ID_CARACTERISTIQUE   INT4                 not null,
"NOM CARACTERISTIQUE" CHAR(255)            null,
constraint PK_CARACTERISTIQUE_NUTRITIONNE primary key (ID_CARACTERISTIQUE)
);

/*==============================================================*/
/* Table : CATEGORIE_RECETTE                                    */
/*==============================================================*/
create table CATEGORIE_RECETTE (
ID_CATEGORIE         INT4                 not null,
"NOM CATEGORIE"      CHAR(255)            null,
constraint PK_CATEGORIE_RECETTE primary key (ID_CATEGORIE)
);

/*==============================================================*/
/* Table : COMMENTAIRE                                          */
/*==============================================================*/
create table COMMENTAIRE (
ID_COMMENTAIRE       INT4                 not null,
ID_INTERNAUTE        INT4                 not null,
ID_RECETTE           INT4                 not null,
TEXTE                TEXT                 null,
"DATE DE CREATION"   DATE                 null,
constraint PK_COMMENTAIRE primary key (ID_COMMENTAIRE)
);

/*==============================================================*/
/* Index : ECRIRE_FK                                            */
/*==============================================================*/
create  index ECRIRE_FK on COMMENTAIRE (
ID_INTERNAUTE
);

/*==============================================================*/
/* Index : CONCERNER_FK                                         */
/*==============================================================*/
create  index CONCERNER_FK on COMMENTAIRE (
ID_RECETTE
);

/*==============================================================*/
/* Table : CONCERNER                                            */
/*==============================================================*/
create table CONCERNER (
ID_MODIFICATION      INT4                 not null,
ID_RECETTE           INT4                 not null,
constraint PK_CONCERNER primary key (ID_MODIFICATION, ID_RECETTE)
);

/*==============================================================*/
/* Index : RECETTE_MODIFIE_FK                                   */
/*==============================================================*/
create  index RECETTE_MODIFIE_FK on CONCERNER (
ID_MODIFICATION
);

/*==============================================================*/
/* Index : RECETTE_MODIFIE2_FK                                  */
/*==============================================================*/
create  index RECETTE_MODIFIE2_FK on CONCERNER (
ID_RECETTE
);

/*==============================================================*/
/* Table : ETRE_COMPOSE                                         */
/*==============================================================*/
create table ETRE_COMPOSE (
ID_INGREDIENT        INT4                 not null,
ID_RECETTE           INT4                 not null,
QUANTITE             DECIMAL              null,
UNITE                CHAR(64)             null,
constraint PK_ETRE_COMPOSE primary key (ID_INGREDIENT, ID_RECETTE)
);

/*==============================================================*/
/* Index : INGR_RECETTE_FK                                      */
/*==============================================================*/
create  index INGR_RECETTE_FK on ETRE_COMPOSE (
ID_INGREDIENT
);

/*==============================================================*/
/* Index : INGR_RECETTE2_FK                                     */
/*==============================================================*/
create  index INGR_RECETTE2_FK on ETRE_COMPOSE (
ID_RECETTE
);

/*==============================================================*/
/* Table : HISTORIQUE_MODIFICATION                              */
/*==============================================================*/
create table HISTORIQUE_MODIFICATION (
ID_MODIFICATION      INT4                 not null,
ID_INTERNAUTE        INT4                 not null,
"DATE D'ECRITURE"    DATE                 null,
"DATE DE DEBUT DE VALIDITE" DATE                 null,
"DATE DE FIN DE VALIDITE" DATE                 null,
"TEXTE CONCERNE"     TEXT                 null,
constraint PK_HISTORIQUE_MODIFICATION primary key (ID_MODIFICATION)
);

/*==============================================================*/
/* Index : MODIFIER_FK                                          */
/*==============================================================*/
create  index MODIFIER_FK on HISTORIQUE_MODIFICATION (
ID_INTERNAUTE
);

/*==============================================================*/
/* Table : INGREDIENT                                           */
/*==============================================================*/
create table INGREDIENT (
ID_INGREDIENT        INT4                 not null,
"NOM INGREDIENT"     CHAR(255)            null,
constraint PK_INGREDIENT primary key (ID_INGREDIENT)
);

/*==============================================================*/
/* Table : INTERNAUTE                                           */
/*==============================================================*/
create table INTERNAUTE (
ID_INTERNAUTE        INT4                 not null,
PSEUDONYME           CHAR(63)             null,
constraint PK_INTERNAUTE primary key (ID_INTERNAUTE)
);

/*==============================================================*/
/* Table : MENU                                                 */
/*==============================================================*/
create table MENU (
ID_MENU              INT4                 not null,
ID_INTERNAUTE        INT4                 not null,
"NOM MENU"           CHAR(255)            null,
constraint PK_MENU primary key (ID_MENU)
);

/*==============================================================*/
/* Index : CREER_FK                                             */
/*==============================================================*/
create  index CREER_FK on MENU (
ID_INTERNAUTE
);

/*==============================================================*/
/* Table : NOTER                                                */
/*==============================================================*/
create table NOTER (
ID_RECETTE           INT4                 not null,
ID_INTERNAUTE        INT4                 not null,
NOTE                 INT4                 null default 2 
      constraint CKC_NOTE_NOTER check (NOTE is null or (NOTE between 1 and 3)),
constraint PK_NOTER primary key (ID_RECETTE, ID_INTERNAUTE)
);

/*==============================================================*/
/* Index : NOTER_RECETTE_FK                                     */
/*==============================================================*/
create  index NOTER_RECETTE_FK on NOTER (
ID_RECETTE
);

/*==============================================================*/
/* Index : NOTER_RECETTE2_FK                                    */
/*==============================================================*/
create  index NOTER_RECETTE2_FK on NOTER (
ID_INTERNAUTE
);

/*==============================================================*/
/* Table : POSSEDER                                             */
/*==============================================================*/
create table POSSEDER (
ID_CARACTERISTIQUE   INT4                 not null,
ID_INGREDIENT        INT4                 not null,
"QUANTITE NUTRITIONNEL" INT4                 null,
constraint PK_POSSEDER primary key (ID_CARACTERISTIQUE, ID_INGREDIENT)
);

/*==============================================================*/
/* Index : POSSEDER_CARAC_FK                                    */
/*==============================================================*/
create  index POSSEDER_CARAC_FK on POSSEDER (
ID_CARACTERISTIQUE
);

/*==============================================================*/
/* Index : POSSEDER_CARAC2_FK                                   */
/*==============================================================*/
create  index POSSEDER_CARAC2_FK on POSSEDER (
ID_INGREDIENT
);

/*==============================================================*/
/* Table : RECETTE_DE_CUISINE                                   */
/*==============================================================*/
create table RECETTE_DE_CUISINE (
ID_RECETTE           INT4                 not null,
"NOM RECETTE"        CHAR(255)            null,
"DATE D'AJOUT DANS LA BASE" DATE                 null,
"TEMPS DE PREPARATION" TIME                 null,
"TEMPS DE CUISSON"   TIME                 null,
"NOMBRE DE PERSONNES" INT4                 null,
PREPARATION          TEXT                 null,
constraint PK_RECETTE_DE_CUISINE primary key (ID_RECETTE)
);

alter table APPARTENIR
   add constraint FK_APPARTEN_APP_RECET_MENU foreign key (ID_MENU)
      references MENU (ID_MENU)
      on delete restrict on update restrict;

alter table APPARTENIR
   add constraint FK_APPARTEN_APP_RECET_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table APPARTENIR
   add constraint FK_APPARTEN_APP_RECET_CATEGORI foreign key (ID_CATEGORIE)
      references CATEGORIE_RECETTE (ID_CATEGORIE)
      on delete restrict on update restrict;

alter table APPARTENIR_CAT
   add constraint FK_APPARTEN_APP_CAT_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table APPARTENIR_CAT
   add constraint FK_APPARTEN_APP_CAT2_CATEGORI foreign key (ID_CATEGORIE)
      references CATEGORIE_RECETTE (ID_CATEGORIE)
      on delete restrict on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_CONCERNER_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table COMMENTAIRE
   add constraint FK_COMMENTA_ECRIRE_INTERNAU foreign key (ID_INTERNAUTE)
      references INTERNAUTE (ID_INTERNAUTE)
      on delete restrict on update restrict;

alter table CONCERNER
   add constraint FK_CONCERNE_RECETTE_M_HISTORIQ foreign key (ID_MODIFICATION)
      references HISTORIQUE_MODIFICATION (ID_MODIFICATION)
      on delete restrict on update restrict;

alter table CONCERNER
   add constraint FK_CONCERNE_RECETTE_M_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table ETRE_COMPOSE
   add constraint FK_ETRE_COM_INGR_RECE_INGREDIE foreign key (ID_INGREDIENT)
      references INGREDIENT (ID_INGREDIENT)
      on delete restrict on update restrict;

alter table ETRE_COMPOSE
   add constraint FK_ETRE_COM_INGR_RECE_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table HISTORIQUE_MODIFICATION
   add constraint FK_HISTORIQ_MODIFIER_INTERNAU foreign key (ID_INTERNAUTE)
      references INTERNAUTE (ID_INTERNAUTE)
      on delete restrict on update restrict;

alter table MENU
   add constraint FK_MENU_CREER_INTERNAU foreign key (ID_INTERNAUTE)
      references INTERNAUTE (ID_INTERNAUTE)
      on delete restrict on update restrict;

alter table NOTER
   add constraint FK_NOTER_NOTER_REC_RECETTE_ foreign key (ID_RECETTE)
      references RECETTE_DE_CUISINE (ID_RECETTE)
      on delete restrict on update restrict;

alter table NOTER
   add constraint FK_NOTER_NOTER_REC_INTERNAU foreign key (ID_INTERNAUTE)
      references INTERNAUTE (ID_INTERNAUTE)
      on delete restrict on update restrict;

alter table POSSEDER
   add constraint FK_POSSEDER_POSSEDER__CARACTER foreign key (ID_CARACTERISTIQUE)
      references CARACTERISTIQUE_NUTRITIONNEL (ID_CARACTERISTIQUE)
      on delete restrict on update restrict;

alter table POSSEDER
   add constraint FK_POSSEDER_POSSEDER__INGREDIE foreign key (ID_INGREDIENT)
      references INGREDIENT (ID_INGREDIENT)
      on delete restrict on update restrict;

