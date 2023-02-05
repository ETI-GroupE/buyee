const fetchProducts = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const { product_name } = Object.fromEntries(urlSearchParams.entries());
    axios
        .get("https://buyee-catalog-ksbujg5hza-as.a.run.app/api/v1/products", {
            params: {
                product_name: product_name,
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
                <a href="/customer/product.html?product_id=${
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
        })
        .catch((error) => console.error(error));
};

fetchProducts();
