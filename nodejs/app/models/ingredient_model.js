var pg = require('pg');

var db = require("./db");

module.exports = {
    get_ranking: function (cb) {
        var pool = new pg.Pool(db.get_config());

        console.log(db.get_config());

        pool.connect(function(err, client, done) {
            if (err) {
                return console.error('error fetching client from pool', err);
            }
            client.query(
                "SELECT ingredient.id_ingredient, nom_ingredient,(moyenne_recette * ratio_calories * somme_commentaires) as score_classement FROM ingredient INNER JOIN (SELECT id_ingredient, AVG(note.valeur) as moyenne_recette FROM note NATURAL JOIN recette NATURAL JOIN composition_recette GROUP BY id_ingredient) AS moy_recette_tab ON moy_recette_tab.id_ingredient = ingredient.id_ingredient INNER JOIN (SELECT id_ingredient, (quantite_nutrition / (SELECT AVG(quantite_nutrition) as moyenne_ensemble_calories FROM posseder_carac INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle WHERE nom_caracteristique = 'énergie') ) as ratio_calories FROM posseder_carac INNER JOIN carac_nutritionnelle ON posseder_carac.id_carac_nutritionnelle = carac_nutritionnelle.id_carac_nutritionnelle WHERE nom_caracteristique = 'énergie') AS ratio_cal_tab ON moy_recette_tab.id_ingredient = ratio_cal_tab.id_ingredient INNER JOIN (SELECT id_ingredient, SUM(coeff_commentaire) as somme_commentaires FROM (SELECT id_recette, CASE WHEN COUNT(id_commentaire) <= 3 THEN 1 WHEN COUNT(id_commentaire) >= 4 AND COUNT(id_commentaire) <= 10 THEN 2 WHEN COUNT(id_commentaire) > 10 THEN 3 END as coeff_commentaire FROM commentaire GROUP BY commentaire.id_recette) as coeff_comm_tab INNER JOIN composition_recette ON coeff_comm_tab.id_recette = composition_recette.id_recette GROUP BY id_ingredient) AS somm_comm_tab ON ratio_cal_tab.id_ingredient = somm_comm_tab.id_ingredient ORDER BY score_classement DESC",
                function (err, result) {
            
            done();

            if(err) {
                return console.error('error running ranking query', err);
            }
            console.log(result.rows);
            cb(result.rows);
            });
        });

  
        pool.on('error', function(err, client) {
            console.error('idle client error', err.message, err.stack);
        });
    }
};
