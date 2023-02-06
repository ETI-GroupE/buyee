const fetchProducts = () => {
    const userId = sessionStorage.getItem("userId");
    const jwt = sessionStorage.getItem("jwt");
    const email = sessionStorage.getItem("email");
    const roles = sessionStorage.getItem("roles");

    if ([userId, jwt, email, roles].includes(null)) {
        window.location.href = "/auth/login.html";
    }

    axios
        .get("https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products", {
            params: {
                owner_id: userId,
            },
        })
        .then(async (response) => {
            const products = response.data;
            const productDisplay = document.getElementById("productDisplay");
            let productHTML = "";
            for (const product of products) {
                const feedbackStats = (
                    await axios.get(
                        "https://buyee-feedback-ksbujg5hza-as.a.run.app/api/v1/feedbacks/stats",
                        {
                            params: {
                                product_id: product.product_id,
                            },
                        }
                    )
                ).data;
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

                productHTML += `
                <a href="/business/product.html?product_id=${
                    product.product_id
                }" class="product d-flex p-2 bd-highlight m-1 pb-3 special-width align-items-start align-self-stretch flex-column border border-light-subtle rounded-1" id="product-${
                    product.product_id
                }">
                    <div class="productImage p-3" style="background-image: url('${
                        product.product_image_url
                    }');"></div>
                    <div>
                        <span class="productName">${product.product_name}</span>
                        <span class="productCategory">| ${
                            product.category_name
                        }</span>
                    </div>
                        
                    <div class="productShip">${
                        product.product_ship_location
                    }</div>
                    <div class="productRating d-flex align-items-center">
                        <span class="d-flex align-items-center">
                            ${starHTML}
                        </span>
                        <span class="ms-2">${
                            product.product_original_stock -
                            product.product_stock
                        } sold
                        </span>
                    </div>
                    <div class="productPrice">$${product.product_price.toFixed(
                        2
                    )}</div>
                    <div class="productStock">${
                        product.product_stock
                    } pieces left</div>
                </a>
                `;
            }
            productDisplay.innerHTML = productHTML;

            // Modal
            const createProductCategory = document.getElementById(
                "createProductCategory"
            );

            const categories = (
                await axios.get(
                    "https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/categories"
                )
            ).data;
            let optionsHTML = "";
            for (const category of categories) {
                optionsHTML += `
                    <option value=${category.category_id}>${category.category_name}</option>
                `;
            }
            createProductCategory.innerHTML = optionsHTML;
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

    const product_name = document.getElementById("createProductName").value;
    const product_price = document.getElementById("createProductPrice").value;
    const product_description = document.getElementById(
        "createProductDescription"
    ).value;
    const product_ship_location = document.getElementById(
        "createProductShipLocation"
    ).value;
    const product_category_id = document.getElementById(
        "createProductCategory"
    ).value;
    const product_stock = document.getElementById("createProductStock").value;
    const owner_id = userId;

    const formData = new FormData();
    const image = document.getElementById("createProductImage").files[0];
    formData.append("product_name", product_name);
    formData.append("owner_id", owner_id);
    formData.append("product_price", product_price);
    formData.append("product_description", product_description);
    formData.append("product_ship_location", product_ship_location);
    formData.append("product_category_id", product_category_id);
    formData.append("product_stock", product_stock);
    console.log(image, image.name);
    // formData.append("file", image, image.name);
    formData.append("file", image, image.name);
    axios
        .post(
            `https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/product`,
            formData
        )
        .then((response) => {
            fetchProducts();
        })
        .catch((error) => console.error(error));
};

fetchProducts();
