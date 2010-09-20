/**
 * All the utility functions used in the admin sections
*/
$(document).ready(function(){
    $('.autocomplete').each(function(){
        var source = $(this).parents('form').attr('href').
        replace(/http:\/\/[^\/]+\//, '');
        var template = $('#template').val();
        var used = false;
        var content;

        $(this).autocomplete({
            minLenght: 0,
            source: function(request, response) {
                toggleLoader();
                var search_query = window.location.search;
                if (search_query[0] == '?'){ //remove first ?
                    search_query = search_query.substr(1);
                }

                data = unserialize(search_query); //utils.js
                data['query']=request.term;
                data['template'] = template;
                if($('#all_users').length){
                    data['all_users'] = $('#all_users').val();
                }
                $.get(source, data, function(data){
                    $('.datatable').replaceWith(data);
                    toggleLoader();
                });
			},
            search: function(event, ui){
                used = true;
            }
        });

        $(this).keyup(function(keyCode){
            if($(this).val() == ''){
                $(this).autocomplete("search", ' ');
            }
        });
    });
});

function toggleLoader(){
    $('.ajax-loader').toggle();
}
