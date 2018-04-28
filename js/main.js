$(document).ready(function () {

    var fakemainboard = [
        {
            "name" : "SomeBoard", 
            "id": "1", 
            "price" : 1
        },
        {
            "name" : "SomeBoard2", 
            "id": "2",
            "price" : 2
        },
        {
            "name" : "SomeBoard3", 
            "id": "3",
            "price" : 3
        }
    ];

    // data is an array
    function attachDataToOption(data, id){
        data.forEach(opt => {
            var $opt = $("<option>",
            {
                value: opt.id,
            }).val(opt.name);
            
            $opt.appendTo($(id));
        });

    };

    attachDataToOption(fakemainboard, "mainboardList");

});
