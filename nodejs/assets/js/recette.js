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

$("#form-content").on("submit", function (event) {
    event.preventDefault();
    var object = this;
    $.ajax({
        url: object.action,
        dataType: 'html',
        data: $(this).serialize(),
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

$("#disconnect").click(function (e) {
    e.preventDefault();
    e.stopPropagation();
    window.localStorage.removeItem('token');
    load_token();
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
    var $msgShowTime = 2000;

    $("form").submit(function () {
        switch (this.id) {
            case "login-form":
                var $lg_username = $('#login_username').val();
                var $lg_password = $('#login_password').val();
                if ($lg_username == "ERROR") {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                } else {
                    msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login OK");
                }
                var object = this;
                $.ajax({
                    url: object.action,
                    dataType: 'html',
                    data: $(this).serialize(),
                    type: 'post',
                    success: function (res, status) {
                        window.localStorage.setItem('token', JSON.parse(res).token);
                        load_token();
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "success", "glyphicon-ok", "Login successfuly");
                    },
                    error: function (resultat, statut, erreur) {
                        msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
                    }
                });
                return false;
                break;
            case "lost-form":
                var $ls_email = $('#lost_email').val();
                if ($ls_email == "ERROR") {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "error", "glyphicon-remove", "Send error");
                } else {
                    msgChange($('#div-lost-msg'), $('#icon-lost-msg'), $('#text-lost-msg'), "success", "glyphicon-ok", "Send OK");
                }
                return false;
                break;
            case "register-form":
                var $rg_username = $('#register_username').val();
                var $rg_email = $('#register_email').val();
                var $rg_password = $('#register_password').val();
                if ($rg_username == "ERROR") {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "error", "glyphicon-remove", "Register error");
                } else {
                    msgChange($('#div-register-msg'), $('#icon-register-msg'), $('#text-register-msg'), "success", "glyphicon-ok", "Register OK");
                }
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

    function msgFade($msgId, $msgText) {
        $msgId.fadeOut($msgAnimateTime, function () {
            $(this).text($msgText).fadeIn($msgAnimateTime);
        });
    }

    function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
        var $msgOld = $divTag.text();
        msgFade($textTag, $msgText);
        $divTag.addClass($divClass);
        $iconTag.removeClass("glyphicon-chevron-right");
        $iconTag.addClass($iconClass + " " + $divClass);
        setTimeout(function () {
            msgFade($textTag, $msgOld);
            $divTag.removeClass($divClass);
            $iconTag.addClass("glyphicon-chevron-right");
            $iconTag.removeClass($iconClass + " " + $divClass);
        }, $msgShowTime);
    }
});