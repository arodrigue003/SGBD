/**
 * Created by adrien on 01/12/16.
 */

/*$('#submit-comment').click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    var url = $('#form-content').attr('action');
    alert(url);
    $.ajax({
        url: url,
        type: 'post',
        success: function(res, status) {
            alert(res);
        },
        error : function(resultat, statut, erreur){
            alert('error');
        }
    });
});*/


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
        },
        error : function(resultat, statut, erreur){
            alert('error');
        }
    });

});