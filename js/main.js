$(document).ready(function () {

    window.mainboard = [];
    window.cpu = [];
    window.gpu = [];
    window.ram = [];
    window.cooling = [];
    window.system = [];
    $.get( "http://localhost:3000/pieces", function( data ) {
        console.log(data );
        data.forEach(element => {
            if(element.type == "mainboard")
            {
                window.mainboard.push(element);
            }
        });
        render();
        attachDataToOption(window.mainboard, "mainboard");
        attachDataToOption(window.fakeCPU, "CPU");
      });

    window.fakeCPU = [
        {
            "name": "asd",
            "id": "1",
            "price": 1
        },
        {
            "name": "sdfs",
            "id": "2",
            "price": 2
        },
        {
            "name": "sdfsd",
            "id": "3",
            "price": 3
        }
    ];

    function toTitleCase(str) {
        if(str.toUpperCase() == str)
        {
            return str;
        }
        return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
    }
    function calcTotal() {
        var i = 0;
        $("[id$='Price']").each(function () {
            console.log($(this).data("price"));

            i += parseInt($(this).data("price")) || 0;
        });
        return i*1.1;
    }

    // data is an array
    function attachDataToOption(data, id) {
        var listId = "#" + id + "List";
        var PriceId = "#" + id + "Price";
        data.forEach(opt => {
            var $opt = $("<option>",
                {
                    value: opt.id,
                }).text(opt.name);
            $opt.data("price", opt.price);
            $opt.appendTo($(listId));
        });


        $(listId).on("change", function () {
            var price = $("option:selected", this).data("price");
            $(PriceId).html("Price: " + price);
            $(PriceId).data("price", price);
            $("#result").html("Total Price: " + calcTotal());
        });
    };

    function render() {
        var cats = [
            "mainboard",
            "CPU",
            "GPU",
            "RAM",
            "cooling",
            "system"
        ];

        var cols = 1;
        var $row = $("<div>", {
            "class": "row"
        });

        var $main = $("#main");

        var check = 3;
        if (cats.length < 3) {
            check = cats.length;
        }

        cats.forEach(element => {
            var $col = $("<div>", {
                class: "col-md-4",
                id: element + "Main"
            });
            cols++;
            $("<h2>").text(toTitleCase(element)).appendTo($col);
            var $p = $("<p>");
            var $grp = $("div", {
                "class": "form-group"
            });
            var $lbl = $("<label>", {
                "for": element + "List"
            }).text("Select " + toTitleCase(element));
            var $select = $("<select>", {
                class: "form-control",
                id: element + "List"
            });
            var $price = $("<p>",
                {
                    id: element + "Price"
                }).text("Price:");

            $grp.appendTo($p);
            $lbl.appendTo($p);
            $select.appendTo($p);
            $p.appendTo($col);
            $price.appendTo($col);
            $col.appendTo($row);
            $row.appendTo($main);
            console.log($row);
        });

        $row = $("<div>", {
            class: "row"
        });

        var $total = $("<h2>", {
            id: "result"
        }).text("Total Price:");

        $total.appendTo($row);
        $row.appendTo($main);

    }


});

