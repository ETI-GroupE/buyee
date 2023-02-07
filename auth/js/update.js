const roles = sessionStorage.getItem("roles");
const updateNav = document.getElementById("navbar-update");
if (roles === "ROLE_ADMIN") {
    window.location.href = "/delivery/delivery.html";
} else if (roles === "ROLE_CUSTOMER") {
    updateNav.innerHTML = `
	<ul class="navbar-nav d-flex align-items-center">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/customer/browse.html">Browse</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/auth/update.html">Account</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/customer/shopcart.html">Shopping Cart</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/customer/purchase-history.html">Purchases</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="/auth/logout.html">Log Out</a>
                    </li>
                </ul>`;
} else if (roles === "ROLE_BUSINESS") {
    updateNav.innerHTML = `
	<ul class="navbar-nav d-flex align-items-center">
					<li class="nav-item">
						<a class="nav-link text-white" href="/auth/update.html">Account</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-white" href="/business/browse.html">My Products</a>
					</li>
					<li class="nav-item d-flex align-items-center ms-2">
						<a class="nav-link text-white" href="/business/purchase-history.html">Purchase History</a>
					</li>
					<li class="nav-item">
						<a class="nav-link text-white" href="/auth/logout.html">Log Out</a>
					</li>
				</ul>`;
}

var successModal = new bootstrap.Modal(document.getElementById("successModal"));

$("#submitBtn").click(async function (event) {
    event.preventDefault();
    var username = $("#userField").val();
    var email = $("#emailField").val();
    var password = $("#passwordField").val();
    var userId = sessionStorage.getItem("userId");
    var jwt = sessionStorage.getItem("jwt");
    const userData = JSON.stringify({
        userId: userId,
        username: username,
        password: password,
        email: email,
    });
    const customConfig = {
        headers: {
            "Content-Type": "application/json",
            "x-access-token": jwt,
        },
    };
    axios
        .post(
            "https://auth-ksbujg5hza-as.a.run.app/api/v1/user/update",
            userData,
            customConfig
        )
        .then((response) => {
            if (response.status == 200) {
                successModal.show();
            }
        })
        .catch((error) => {
            console.error("There was an error!", error.response.status);
        });
});

$(".closeBtn").click(function () {
    successModal.hide();
});

//trigger
