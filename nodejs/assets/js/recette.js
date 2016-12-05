/**
 * Created by adrien on 01/12/16.
 */

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

$("#form-content").on("submit", function( event ) {
    event.preventDefault();
    var object = this;
    $.ajax({
        url: object.action,
        dataType: 'html',
        data: $(this).serialize(),
        type: 'post',
        success: function(res, status) {
            $(object).after(res);
            create_notification('glyphicon glyphicon-ok', 'success', 'Commentaire rajouté avec succès');
        },
        error : function(resultat, statut, erreur){
            create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de rajouter le commentaire')

        }
    });

});

