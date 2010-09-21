/**
 * All the utility functions used in the admin sections
*/
$(document).ready(function(){
    $('.autocomplete').each(function(){
        var source = $(this).parents('form').attr('href').
        replace(/http:\/\/[^\/]+\//, '');
        var template = $('#template').val();
        var content;

        var self = $(this)

        self.autocomplete({
            minLength: 3,
            delay: 500,
            source: function(request, response) {
                toggleLoader();
                var search_query = window.location.search;
                if (search_query[0] == '?'){ //remove first ?
                    search_query = search_query.substr(1);
                }
                data = unserialize(search_query); //utils.js
                data['query']=request.term;
                data['template'] = template;
                data['role'] = $('#filter-roles').val();
                if($('#all_users').length){
                    data['all_users'] = $('#all_users').val();
                }
                $.get(source, data, function(data){
                    $('.datatable').replaceWith(data);
                    toggleLoader();
                });
			}
        });

        self.keyup(function(keyCode){
            if($(this).val() == ''){
                $(this).autocomplete("search", '   ');
            }
        });

        $('#filter-roles').change(function(e){
            self.autocomplete('search', ' ');
        });
    });
});
function toggleLoader(){
    $('.ajax-loader').toggle();
    if ($('#autocomplete-query').attr("disabled") === true){
        $('#autocomplete-query').attr("disabled", "");
        $('#autocomplete-query').focus();
    }else{
        $('#autocomplete-query').attr("disabled", "disabled");
    }
}
