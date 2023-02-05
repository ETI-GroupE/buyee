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
                window.location.href = "/customer/browse.html";
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

fetchProduct();
fetchFeedback();
