window.onload = function() {
    const fetchProduct = () => {
        axios
            .get("https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products")
            .then((response) => {
                const products = response.data;

                products.forEach(product => {
                    const productImage = document.getElementById("productImage");
                    const productName = document.getElementById("productName");
                    const productDescription = document.getElementById("productDescription");

                    console.log(productImage, productName, productDescription);

                    productImage.src = product.image_url;
                    productName.innerText = product.name;
                    productDescription.innerText = product.description;
                });
            })
            .catch((error) => console.error(error));
    };

    fetchProduct();
};