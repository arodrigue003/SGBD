function truncate( n, useWordBoundary ){
    var isTooLong = this.length > n,
        s_ = isTooLong ? this.substr(0,n-1) : this;
    s_ = (useWordBoundary && isTooLong) ? s_.substr(0, Math.min(s_.lastIndexOf(' '), s_.lastIndexOf(',')), s_.lastIndexOf('.')) : s_;
    return  isTooLong ? s_ + '&hellip;' : s_;
}

function create_notification(icon, type, message) {
    $.notify({
        icon: icon,
        message: message,
    }, {
        type: type,
        delay: 1500,
        placement: {
            from: 'bottom'
        },
        animate: {
            enter: 'animated fadeInUp',
            exit: 'animated fadeOutDown'
        }
    });
}

function success(result) {
    var results_zone = $('#search-results');
    results_zone.empty();

    result.forEach(function(recette) {
        var copy = $('#item-template')
            .clone()
            .removeAttr('id')
            .css('display', 'block');

        $(copy).find('.item-url')
            .attr('href', '/recette/' + recette.id_recette)
            .attr('target', '_blank');
        $(copy).find('.item-picture').attr('src', '/images/' + recette.id_recette + '.jpg');
        $(copy).find('.item-nom').empty().append(truncate.apply(recette.nom_recette, [37, true]));
        $(copy).find('.item-nombre-personnes').empty().append(recette.nombre_personnes);
        $(copy).find('.item-nombre-commentaire').empty().append(
            recette.nombre_commentaires + ' ' +
            ((recette.nombre_commentaires > 1) ? 'commentaires' : 'commentaire')
        );
        $(copy).find('.item-categories').empty().append(recette.categories.join(', '));

        $(copy).appendTo(results_zone);
    });
}

function error(err) {
    if (err.status >= 400 && err.status < 500) {
        create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de faire la recherche (Connectez-vous !)')
    }
}

function onActivation() {
    var name = $('#form-name').val();

    if (!$('#toggle-advanced-search').hasClass('open')) {
        return $.ajax({
            method: 'GET',
            url: '/api/recette/search',
            data: {
                nom: name,
                token: localStorage.getItem('token')
            },
            success: success,
            error: error
        });
    }

    var ingredientsId = [];

    $('#ingredients')
        .find('input[type=checkbox]:checked')
        .each(function () {
            ingredientsId.push(parseInt($(this).val()));
        });

    var ratingMin = $('#form-rate-min').val();
    var personCountMin = $('#form-person-min').val();
    var category = $('#form-categorie').val();

    $.ajax({
        method: 'GET',
        url: '/api/recette/search',
        data: {
            nom: name,
            category: category,
            ratingMin: ratingMin,
            personCountMin: personCountMin,
            ingredients: JSON.stringify(ingredientsId),
            token: localStorage.getItem('token')
        },
        success: success,
        error: error
    });
}

$('#form-name')
    .bind("enterKey", onActivation)
    .keyup(function(e){
        if(e.keyCode == 13)
        {
            $(this).trigger("enterKey");
        }
    });

$('#search-button').on('click', onActivation);

onActivation();