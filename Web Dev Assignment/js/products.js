let products = {
    "products": [
        {
            "name": "Ninja AF160 Max Air Fryer",
            "price": "199.99",
            "discount?": "true",
            "discount_price": "199.97",
            "short description": "The Ninja AF160 Max Air Fryer lets you prepare delicious, healthy dishes with up to 75% less fat than traditional frying methods*, making it a reliable cooking appliance for the health-conscious home.",
            "image": "assets/Air-fryer.jpg"
        },
        {
            "name": "Product 2",
            "price": "200",
            "discount?": "false",
            // "short description": "Short description of product 2",
            "image": "./assets/box.svg"
        },
        {
            "name": "Product 3",
            "price": "300",
            "discount?": "false",
            // "short description": "Short description of product 3",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 4",
            "price": "400",
            "discount?": "true",
            "discount_price": "375",
            // "short description": "Short description of product 4",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 5",
            "price": "500",
            "discount?": "false",
            // "short description": "Short description of product 5",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 6",
            "price": "600",
            "discount?": "false",
            // "short description": "Short description of product 6",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 7",
            "price": "700",
            "discount?": "false",
            // "short description": "Short description of product 7",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 8",
            "price": "800",
            "discount?": "false",
            // "short description": "Short description of product 8",
            "image": "assets/box.svg"
        },
        {
            "name": "Product 9",
            "price": "900",
            "discount?": "false",
            // "short description": "Short description of product 9",
            "image": "assets/box.svg"
        },
    ]
}
function getProducts(products_div) {
    /* This function gets all products from
    the object defining all different products
    and puts them in different divs in the
    products page */
    for (let i = 0; i < products["products"].length; i++) {
        // Get specific product info
        let product = products["products"][i];
        let product_name = product["name"];
        let product_price = product["price"];
        let product_discount = product["discount?"];
        let product_discount_price = product["discount_price"];
        // let product_short_description = product["short description"];
        let product_image=product["image"];

        // If there is no image, use a default one
        if (!product_image) {
            product_image = "assets/Air-fryer.jpg";
        }

        // Create a div for the product
        let product_div = document.createElement("div");
        product_div.className = "product";

        // Define the inner HTML for a box for the product display
        // If there is a discount, include it
        if (product_discount == "true") {
            product_div.innerHTML = `
            <div class="product-image">
                <img src="${product_image}" alt="${product_name}">
            </div>
            <div class="product-info">
                <h3>${product_name}</h3>
                <p>
                    <span class="product-price">
                        <s>\$${product_price}</s>
                    </span>
                    <span class="product-discount-price">
                        \$${product_discount_price}
                    </span>
                </p>
                <button onclick="window.location.href='./${product_name}.html'" class="buyButton">Buy Now!</button>
            </div>
        `;
        } else {
            // if there is no discount, do a slightly different box
            product_div.innerHTML = `
            <div class="product-image">
                <img src="${product_image}" alt="${product_name}">
            </div>
            <div class="product-info">
                <h3>${product_name}</h3>
                <p>
                    <span class="product-price">
                        \$${product_price}
                    </span>
                </p>
                <button onclick="window.location.href='./${product_name}.html'" class="buyButton">Buy Now!</button>
            </div>
        `;
        }
        products_div.appendChild(product_div);
    }
}

getProducts(document.getElementById("products"));