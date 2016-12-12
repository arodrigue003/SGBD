/*==============================================================*/
/* Nom de SGBD :  PostgreSQL 7.3                                */
/* Date de création :  20/11/2016 17:29:36                      */
/*==============================================================*/

CREATE OR REPLACE FUNCTION date_commentaire() RETURNS TRIGGER AS $commentaire$
  DECLARE
    date_modif TIMESTAMP WITH TIME ZONE;
	BEGIN
    FOR date_modif IN SELECT date_creation_recette FROM recette WHERE recette.id_recette = NEW.id_recette LOOP
      IF (NEW.date_creation_commentaire <= date_modif ) THEN
			  RAISE EXCEPTION 'comment creation date canno''t be past to recette creation date';
		  END IF;
    END LOOP;

    FOR date_modif IN SELECT date_creation_commentaire FROM commentaire WHERE id_recette = new.id_recette LOOP
      IF (NEW.date_creation_commentaire <= date_modif ) THEN
			  RAISE EXCEPTION 'Commentaire creation date date canno''t be past to other commentaires';
		  END IF;
    END LOOP;

		RETURN NEW;
	END;
$commentaire$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS date_commentaire ON commentaire;

CREATE TRIGGER date_commentaire BEFORE INSERT OR UPDATE ON commentaire
	FOR EACH ROW EXECUTE PROCEDURE date_commentaire();


CREATE OR REPLACE FUNCTION date_modification() RETURNS TRIGGER AS $historique_modif$
	DECLARE
    date_modif TIMESTAMP WITH TIME ZONE;
  BEGIN
    FOR date_modif IN SELECT date_creation_recette FROM recette WHERE id_recette = NEW.id_recette LOOP
      IF (NEW.date_creation_historique_modif <= date_modif ) THEN
			  RAISE EXCEPTION 'Modification date canno''t be past to recette creation date';
		  END IF;
    END LOOP;

    FOR date_modif IN SELECT date_creation_historique_modif FROM historique_modif WHERE id_recette = new.id_recette LOOP
      IF (NEW.date_creation_historique_modif <= date_modif ) THEN
			  RAISE EXCEPTION 'Modification date canno''t be past to other modifications';
		  END IF;
    END LOOP;

		RETURN NEW;
	END;
$historique_modif$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS date_modification ON historique_modif;

CREATE TRIGGER date_modification BEFORE INSERT OR UPDATE ON historique_modif
	FOR EACH ROW EXECUTE PROCEDURE date_modification();

CREATE OR REPLACE FUNCTION appartenir_menu_cat() RETURNS TRIGGER AS $appartenir_menu$
	DECLARE
    id_cat INT;
    date_creation TIMESTAMP WITH TIME ZONE;
  BEGIN
    FOR date_creation IN SELECT date_creation_recette FROM recette WHERE id_recette = NEW.id_recette LOOP
      IF (NEW.date_creation_appartenir_menu <= date_creation ) THEN
			  RAISE EXCEPTION 'Can''t add a receete in menu before recette creation time';
		  END IF;
    END LOOP;

    FOR id_cat IN SELECT id_categorie FROM appartenir_categorie WHERE id_recette = NEW.id_recette LOOP
      IF (NEW.id_categorie = id_cat ) THEN
        RETURN NEW;
		  END IF;
    END LOOP;

    RAISE EXCEPTION 'A recette canno''t appear in a menu with a category it doesn''t possed';
		RETURN NEW;
	END;
$appartenir_menu$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS appartenir_menu_cat ON appartenir_menu;

CREATE TRIGGER appartenir_menu_cat BEFORE INSERT OR UPDATE ON appartenir_menu
	FOR EACH ROW EXECUTE PROCEDURE appartenir_menu_cat();

CREATE OR REPLACE FUNCTION quantite_carac_nutritions() RETURNS TRIGGER AS $quantite_carac$
  DECLARE
    total_quantite INT;
  BEGIN
    SELECT SUM(quantite_nutrition) INTO total_quantite
        FROM posseder_carac
          INNER JOIN carac_nutritionnelle
            ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle
          INNER JOIN ingredient
            ON posseder_carac.id_ingredient = ingredient.id_ingredient
    WHERE ingredient.id_ingredient = NEW.id_ingredient AND unite_nutrition='g';
    IF (total_quantite > 100) THEN
      RAISE EXCEPTION 'The total amount of nutrition values of an ingredient cannot exceed 100g';
    END IF;
    RETURN NEW;
  END;
$quantite_carac$ LANGUAGE plpgsql;

CREATE TRIGGER quantite_carac_nutritions BEFORE INSERT OR UPDATE ON posseder_carac
  FOR EACH ROW EXECUTE PROCEDURE quantite_carac_nutritions();