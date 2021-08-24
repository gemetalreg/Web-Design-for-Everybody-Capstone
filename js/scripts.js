var shopItems = {
    tomato: {
        src: "img/card-img-1.jpg",
        title: "Tomatoes",
        availableState: "In stock"
    },
    grill: {
        src: "img/card-img-2.jpg",
        title: "Grill",
        availableState: "In stock"
    },
    cake: {
        src: "img/card-img-3.jpg",
        title: "Cake",
        availableState: "Soon in stock"
    },
    coconute: {
        src: "img/card-img-4.jpg",
        title: "Coconute",
        availableState: "In stock"
    },
    dianella: {
        src: "img/card-img-5.jpg",
        title: "Dianella",
        availableState: "Not in stock"
    },
};

var itemStatesCls = {
    "In stock": "text-success",
    "Soon in stock": "text-info",
    "Not in stock": "text-danger"
};

function clearStockStateColor(el, except_cls = "") {
    var statesClasses = Object.values(itemStatesCls);

    statesClasses.forEach(cls => {
        if (el.hasClass(cls) && cls !== except_cls) {
            el.removeClass(cls);
        }
    })
}

function changeStockStateColor(el, cls) {
    if (el.hasClass(cls)) {
        clearStockStateColor(el, cls);
        return;
    }

    clearStockStateColor(el);
    el.addClass(cls);
}


$(document).ready(function () {
    // index.html
    $("#full-card").on("show.bs.modal", function (event) {
        var button = $(event.relatedTarget); // Button that triggered the modal
        var recipient = button.data("item"); // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this);
        var shopItem = shopItems[recipient];
        modal.find(".full-card-img-top").attr("src", shopItem.src);
        modal.find(".full-card-title-name").text(shopItem.title);

        var el = modal.find(".full-card-state");
        el.text(shopItem.availableState);

        var classOfState = itemStatesCls[shopItem.availableState];

        changeStockStateColor(el, classOfState);
    });

    // cart.html
    function updateTotal() {
        totalPositions = 0;
        totalSum = 0;

        $(".item_check").each(function () {
            if ($(this).prop("checked")) {
                totalPositions += 1

                totalSum += Number.parseFloat($(this).closest(".cart-item").find(".full-card-price-count").text());
            }
        });

        $(".total-items-count").text(totalPositions);
        $(".total-sum-value").text(totalSum);

    }

    // Select/deselect items

    var check = false;

    $(".select_all").on("click", function (event) {
        if (check) {
            $(".item_check").each(function () {
                if (!$(this).prop("checked")) {
                    $(this).prop("checked", true);
                }
            });
            check = !check;
        } else {
            $(".item_check").each(function () {
                if ($(this).prop("checked")) {
                    $(this).prop("checked", false);
                }
            });
            check = !check;
        }
        updateTotal();
    });

    // WHEN CART.HTML ONLY LOAD

    var totalPositions = 0;
    var totalSum = 0;

    updateTotal();

    // Item's number change
    $(".cart").delegate(".number input", "change", function () {
        var num = Number.parseFloat($(this).val());
        var sum = num * 17;
        $(this).closest(".cart-item").find(".full-card-price-count").text(sum.toFixed(2));

        updateTotal();
    });

    // Item's check change by click

    $(".cart").delegate(".item_check", "click", function () {
        updateTotal();
    });


});
