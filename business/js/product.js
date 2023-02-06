const fetchProduct = () => {
    const userId = sessionStorage.getItem("userId");
    const jwt = sessionStorage.getItem("jwt");
    const email = sessionStorage.getItem("email");
    const roles = sessionStorage.getItem("roles");

    if ([userId, jwt, email, roles].includes(null)) {
        window.location.href = "/auth/login.html";
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_id } = Object.fromEntries(urlSearchParams.entries());
    axios
        .get("https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products", {
            params: {
                product_id: product_id,
                owner_id: userId,
            },
        })
        .then(async (response) => {
            console.log(product_id, response.data);
            if (response.data.length === 0 || response.data.length > 1) {
                window.location.href = "/business/browse.html";
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

            productImage.style.backgroundImage = `url('${product.product_image_url}')`;
            productName.innerText = product.product_name;
            productCategory.innerText = `| ${product.category_name}`;
            productShip.innerText = product.product_ship_location;
            productRating.innerText = `${
                product.product_original_stock - product.product_stock
            } sold`;
            productPrice.innerText = `$${product.product_price.toFixed(2)}`;
            productStock.innerText = `${product.product_stock} pieces left`;
            productDescription.innerText = product.product_description;

            // Modal
            const updateProductName =
                document.getElementById("updateProductName");
            const updateProductPrice =
                document.getElementById("updateProductPrice");
            const updateProductDescription = document.getElementById(
                "updateProductDescription"
            );
            const updateProductShipLocation = document.getElementById(
                "updateProductShipLocation"
            );
            const updateProductCategory = document.getElementById(
                "updateProductCategory"
            );
            const updateProductOriginalStock = document.getElementById(
                "updateProductOriginalStock"
            );
            const updateProductStock =
                document.getElementById("updateProductStock");
            updateProductName.value = product.product_name;
            updateProductPrice.value = product.product_price;
            updateProductDescription.value = product.product_description;
            updateProductShipLocation.value = product.product_ship_location;
            updateProductStock.value = product.product_stock;
            updateProductOriginalStock.value = product.product_stock;

            const categories = (
                await axios.get(
                    "https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/categories"
                )
            ).data;
            let optionsHTML = "";
            for (const category of categories) {
                if (category.category_id === product.product_category_id) {
                    optionsHTML += `
                        <option value=${category.category_id} selected>${category.category_name}</option>
                    `;
                } else {
                    optionsHTML += `
                        <option value=${category.category_id}>${category.category_name}</option>
                    `;
                }
            }
            updateProductCategory.innerHTML = optionsHTML;

            // Stop/start sales button
            const saleStatusInput =
                document.getElementById("saleProductStatus");
            saleStatusInput.value = product.product_status;
            const sales = document.getElementById("sales");
            if (product.product_status === "ACTIVE") {
                sales.className = "btn btn-danger mt-3";
                sales.innerText = "Stop Sales";
            } else {
                sales.className = "btn btn-success mt-3";
                sales.innerText = "Start Sales";
            }
        })
        .catch((error) => console.error(error));
};

const fetchFeedback = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_id } = Object.fromEntries(urlSearchParams.entries());
    axios
        .get(
            "https://buyee-feedback-ksbujg5hza-as.a.run.app/api/v1/feedbacks/stats",
            {
                params: {
                    product_id: product_id,
                },
            }
        )
        .then((response) => {
            console.log(product_id, response.data);
            if (response.data.length === 0 || response.data.length > 1) {
                window.location.href = "/business/browse.html";
            }
            const feedbackStats = response.data;

            // Rating
            const starList = document.getElementById("starList");
            let starHTML = "";
            for (let i = 0; i < feedbackStats.rating; i++) {
                starHTML += `
                <svg class="ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#FFD700"
                    class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                `;
            }
            for (let i = 0; i < 5 - feedbackStats.rating; i++) {
                starHTML += `
                <svg class="ms-1" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#808080"
                    class="bi bi-star-fill" viewBox="0 0 16 16">
                    <path
                        d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
                `;
            }
            starList.innerHTML = starHTML;

            // Feedback
            const feedbackList = document.getElementById("feedbackList");

            let feedbackHTML = "";
            feedbackStats.feedbacks.forEach((feedback) => {
                feedbackHTML += `
                <li class="list-group-item">
                    <div style="font-size: small; font-weight: lighter;">
                        ${feedback.date}
                    </div>
                    <div>
                        ${feedback.description}
                    </div>
                </li>
                `;
            });
            feedbackList.innerHTML = feedbackHTML;
        })
        .catch((error) => console.error(error));
};

const submit = () => {
    const userId = sessionStorage.getItem("userId");
    const jwt = sessionStorage.getItem("jwt");
    const email = sessionStorage.getItem("email");
    const roles = sessionStorage.getItem("roles");

    if ([userId, jwt, email, roles].includes(null)) {
        window.location.href = "/auth/login.html";
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_id } = Object.fromEntries(urlSearchParams.entries());

    const product_name = document.getElementById("updateProductName").value;
    const product_price = document.getElementById("updateProductPrice").value;
    const product_description = document.getElementById(
        "updateProductDescription"
    ).value;
    const product_ship_location = document.getElementById(
        "updateProductShipLocation"
    ).value;
    const product_category_id = document.getElementById(
        "updateProductCategory"
    ).value;
    const product_original_stock =
        document.getElementById("updateProductStock").value;
    const OG_product_original_stock = document.getElementById(
        "updateProductOriginalStock"
    ).value;

    axios
        .put(
            `https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/product/${product_id}`,
            {
                product_name,
                product_price,
                product_description,
                product_ship_location,
                product_category_id,
                product_original_stock,
                OG_product_original_stock,
            }
        )
        .then((response) => {
            fetchProduct();
            fetchFeedback();
        })
        .catch((error) => console.error(error));
};

const saleButton = () => {
    const userId = sessionStorage.getItem("userId");
    const jwt = sessionStorage.getItem("jwt");
    const email = sessionStorage.getItem("email");
    const roles = sessionStorage.getItem("roles");

    if ([userId, jwt, email, roles].includes(null)) {
        window.location.href = "/auth/login.html";
    }

    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_id } = Object.fromEntries(urlSearchParams.entries());

    const productStatus = document.getElementById("saleProductStatus").value;
    const product_status = productStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    axios
        .patch(
            `https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/product/status/${product_id}`,
            {
                product_status,
            }
        )
        .then((response) => {
            fetchProduct();
            fetchFeedback();
        })
        .catch((error) => console.error(error));
};

fetchProduct();
fetchFeedback();
