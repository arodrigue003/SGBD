/**
 * Created by adrien on 11/12/16.
 */

// initialize with defaults
$(function(){
    $("#rate-recette").rating({
        min: 0,
        max: 3,
        step: 1,
        stars: 3,
        size: "xs",
        showCaption: false,
        emptyStar: '<i class="glyphicon glyphicon-star-empty"></i>',
        filledStar: '<i class="glyphicon glyphicon-star"></i>',
        showClear: false
    })
});