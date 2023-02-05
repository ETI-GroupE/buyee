const fetchProduct = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_id } = Object.fromEntries(urlSearchParams.entries());
    axios
        .get("https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products", {
            params: {
                product_id: product_id,
            },
        })
        .then((response) => {
            console.log(product_id, response.data);
            if (response.data.length === 0 || response.data.length > 1) {
                window.location.href = "/customer/browse.html";
            }
            const product = response.data[0];

            const productImage = document.getElementById("productImage");
            const productName = document.getElementById("productName");
            const productCategory = document.getElementById("productCategory");
            const productShip = document.getElementById("productShip");
            const productRating = document.getElementById("productRating");
            const productPrice = document.getElementById("productPrice");
            const productStock = document.getElementById("productStock");
            const productDescription =
                document.getElementById("productDescription");

            productImage.style.backgroundImage = `url('/customer/assets/${product.product_id}.jfif')`;
            productName.innerText = product.product_name;
            productCategory.innerText = `| ${product.category_name}`;
            productShip.innerText = product.product_ship_location;
            productRating.innerText = `${
                product.product_original_stock - product.product_stock
            } sold`;
            productPrice.innerText = product.product_price;
            productStock.innerText = `${product.product_stock} pieces left`;
            productDescription.innerText = product.product_description;
        })
        .catch((error) => console.error(error));
};

fetchProduct();
