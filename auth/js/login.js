const roles = sessionStorage.getItem("roles");
if (roles === "ROLE_ADMIN") {
    window.location.href = "/delivery/delivery.html";
} else if (roles === "ROLE_CUSTOMER") {
    window.location.href = "/customer/browse.html";
} else if (roles === "ROLE_BUSINESS") {
    window.location.href = "/business/browse.html";
}

var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));

$("#submitBtn").click(async function (event) {
    event.preventDefault();
    var username = $("#userField").val();
    var password = $("#passwordField").val();
    const userData = JSON.stringify({ username: username, password: password });
    const customConfig = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    axios
        .post(
            "https://auth-ksbujg5hza-as.a.run.app/api/v1/signin",
            userData,
            customConfig
        )
        .then((response) => {
            if (response.status == 200) {
                sessionStorage.setItem("userId", response.data.id);
                sessionStorage.setItem("jwt", response.data.accessToken);
                sessionStorage.setItem("email", response.data.email);
                sessionStorage.setItem("roles", response.data.roles);
                if (response.data.roles === "ROLE_ADMIN") {
                    window.location.href = "/delivery/delivery.html";
                } else if (roles === "ROLE_CUSTOMER") {
                    window.location.href = "/customer/browse.html";
                } else if (roles === "ROLE_BUSINESS") {
                    window.location.href = "/business/browse.html";
                }
                return false;
            }
        })
        .catch((error) => {
            if (error.response.status == 404) {
                $("#errMsg").text("User not found");
                errorModal.show();
            }
            if (error.response.status == 401) {
                errorModal.show();
                $("#errMsg").text("Invalid Password");
            }
            console.error("There was an error!", error.response.status);
        });
});

$(".closeBtn").click(function () {
    errorModal.hide();
});
