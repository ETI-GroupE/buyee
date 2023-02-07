const userId = sessionStorage.getItem("userId");
const jwt = sessionStorage.getItem("jwt");
const email = sessionStorage.getItem("email");
const roles = sessionStorage.getItem("roles");

if ([userId, jwt, email, roles].includes(null)) {
    window.location.href = "/auth/login.html";
}

axios
    .post(
        "https://auth-ksbujg5hza-as.a.run.app/api/v1/verify/admin",
        {
            userId: userId,
        },
        {
            headers: {
                "x-access-token": jwt,
            },
        }
    )
    .then((response) => {
        if (response.status == 200) {
            console.log("Verified Admin");
        }
    })
    .catch((error) => {
        console.error("There was an error!", error.response.status);
        window.location.href = "/auth/login.html";
    });