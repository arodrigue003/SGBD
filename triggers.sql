/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 7.3                                */
/* Date de création :  20/11/2016 17:29:36                      */
/*==============================================================*/

CREATE OR REPLACE FUNCTION date_commentaire() RETURNS TRIGGER AS $commentaire$
	BEGIN
		IF (NEW.DATE_CREATION < (SELECT DATE_CREATION FROM recette WHERE ID_RECETTE = NEW.ID_RECETTE) ) THEN
			RAISE EXCEPTION 'comment creation date canno''t be past to recette creation date';
		END IF;
		RETURN NEW;
	END;
$commentaire$ LANGUAGE plpgsql;

CREATE TRIGGER date_commentaire BEFORE INSERT OR UPDATE ON commentaire
	FOR EACH ROW EXECUTE PROCEDURE date_commentaire();
