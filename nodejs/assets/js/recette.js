/**
 * Created by adrien on 01/12/16.
 */

$(load_token());

function load_token() {
    var token = window.localStorage.getItem('token');
    if (token) {
        $.ajaxSetup({
            headers: {
                'x-access-token': token
            }
        });
    }
    else {
        $.ajaxSetup({
            headers: {
                'x-access-token': null
            }
        });
    }
}

$(set_modal_button());

function set_modal_button() {
    if (window.localStorage.getItem('token')) {
        $("#disconnect").show();
        $("#login-button").hide();
    } else {
        $("#disconnect").hide();
        $("#login-button").show();
    }
};

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

// comment form
$("#send-comment").on("click", function (event) {
    event.preventDefault();
    var object = $(this).closest("form");

    $.ajax({
        url: object.attr('action'),
        dataType: 'html',
        data: object.serialize(),
        type: 'post',
        success: function (res, status) {
            $(object).after(res);
            create_notification('glyphicon glyphicon-ok', 'success', 'Commentaire rajouté avec succès');
        },
        error: function (resultat, statut, erreur) {
            create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de rajouter le commentaire')
        }
    });
});

// note form
$("#rate-recette-form").on("submit", function (event) {
    event.preventDefault();
    var object = this;
    $.ajax({
        url: object.action,
        dataType: 'html',
        data: $(this).serialize(),
        type: 'post',
        success: function (res, status) {
            $("#rate-view").replaceWith(res);
            create_notification('glyphicon glyphicon-ok', 'success', 'Note prise en compte avec succès');
        },
        error: function (resultat, statut, erreur) {
            create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de rajouter la note')

        }
    });
});

// edit-recette form
$("#edit-recette").on("click", function (event) {
    event.preventDefault();
    var object =$(this);
    $.ajax({
        url: '/api/recette/edit/' + $(this).data('id'),
        dataType: 'html',
        type: 'get',
        success: function (res, status) {
            $("#edit-content").html(res);
            $('#text-recette').val($('#text-prep').html());
            $('#recette-name').val($('#nom-recette-get').data('name'));
            $('#timepicker1').timepicker({showMeridian: false, showSeconds: true, defaultTime: $('#temps-preparation').text()});
            $('#timepicker2').timepicker({showMeridian: false, showSeconds: true, defaultTime: $('#temps-cuisson').text()});
            bindCounter();
            $('#input-nb-pers').val($('#nombre-personne').text());
            tinyMCE.init({
                // General options
                mode : "exact",
                elements : "text-recette",
                theme : "modern",
                height: 300,
                autoresize_min_height: 300,
                autoresize_max_height: 800,
                plugins : "pagebreak,layer,table,insertdatetime,preview,media,searchreplace,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,template",
                content_style: "p { padding: 0; margin: 2px 0;}"
            });

            //tinymce.activeEditor.setContent('<strong>some</strong> html');
            $('#categorie-list').children('a').each(function () {
                $('#cat-checkbox' + $(this).data('cat')).prop('checked', true);
            });
            $('#ingredients-list').children('tr').each(function () {
                var id = $(this).children('.id').data('id');
                $('#ingredient' + id).val($(this).children('.quantity').text());
                var text1 = $(this).children('.unite').text();
                $('#ingredient-unite' + id + ' option').filter(function() {
                    return $(this).text() == text1;
                }).prop('selected', true);
            });
            $('#edit-modal').modal('show');
        },
        error: function (resultat, statut, erreur) {
            create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de charger le formulaire d\'édition. Veuillez vous connecter')
        }
    });
});

//edit recette form
$("#edit-recette-form").on("submit", function (event) {
    event.preventDefault();
    tinymce.triggerSave();
    var object = this;
    $.ajax({
        url: object.action,
        dataType: 'html',
        data: $(this).serialize(),
        type: 'post',
        success: function (res, status) {
            location.reload();
        },
        error: function (resultat, statut, erreur) {
            create_notification('glyphicon glyphicon-warning-sign', 'danger', 'Impossible de rajouter la note')

        }
    });
});












/* #####################################################################
 #
 #   Project       : Modal Login with jQuery Effects
 #   Author        : Rodrigo Amarante (rodrigockamarante)
 #   Version       : 1.0
 #   Created       : 07/29/2015
 #   Last Change   : 08/04/2015
 #
 ##################################################################### */

$(function () {

    var $formLogin = $('#login-form');
    var $formLost = $('#lost-form');
    var $formRegister = $('#register-form');
    var $divForms = $('#div-forms');
    var $modalAnimateTime = 300;
    var $msgAnimateTime = 150;
    var $msgShowTime = 1000;

    $(".login-form").submit(function (e) {
        switch (this.id) {
            case "login-form":
                var object = this;
                $.ajax({
                    url: object.action,
                    dataType: 'html',
                    data: $(this).serialize(),
                    type: 'post',
                    success: function (res, status) {
                        window.localStorage.setItem('token', JSON.parse(res).token);
                        load_token();
                        set_modal_button();
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", JSON.parse(res).message, 1);
                    },
                    error: function (res, statut, erreur) {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", JSON.parse(res.responseText).message, 0);
                    }
                });
                return false;
                break;
            case "lost-form":
                var $ls_email = $('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", JSON.parse(res).message, 0);
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", JSON.parse(res).message, 1);
                }
                return false;
                break;
            case "register-form":
                var object = this;
                $.ajax({
                    url: object.action,
                    dataType: 'html',
                    data: $(this).serialize(),
                    type: 'post',
                    success: function (res, status) {
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", JSON.parse(res).message, 2);
                    },
                    error: function (res, statut, erreur) {
                        console.log(res);
                        msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", JSON.parse(res.responseText).message, 0);
                    }
                });
                return false;
                break;
            default:
                return false;
        }
        return false;
    });

    $('#login_register_btn').click(function () {
        modalAnimate($formLogin, $formRegister)
    });
    $('#register_login_btn').click(function () {
        modalAnimate($formRegister, $formLogin);
    });
    $('#login_lost_btn').click(function () {
        modalAnimate($formLogin, $formLost);
    });
    $('#lost_login_btn').click(function () {
        modalAnimate($formLost, $formLogin);
    });
    $('#lost_register_btn').click(function () {
        modalAnimate($formLost, $formRegister);
    });
    $('#register_lost_btn').click(function () {
        modalAnimate($formRegister, $formLost);
    });

    function modalAnimate($oldForm, $newForm) {
        var $oldH = $oldForm.height();
        var $newH = $newForm.height();
        $divForms.css("height", $oldH);
        $oldForm.fadeToggle($modalAnimateTime, function () {
            $divForms.animate({height: $newH}, $modalAnimateTime, function () {
                $newForm.fadeToggle($modalAnimateTime);
            });
        });
    }

    function msgFade($msgId, $msgText, $hide) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
            switch ($hide) {
                case 1:
                    $("#login-modal").modal('hide');
                    break;
                case 2:
                    modalAnimate($formRegister, $formLogin);
                    break;
            }
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText, $hide) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld, $hide);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});

$("#disconnect").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.localStorage.removeItem('token');
    load_token();
    set_modal_button();
});