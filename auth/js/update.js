var successModal = new bootstrap.Modal(document.getElementById("successModal"));

$("#submitBtn").click(async function (event) {
	event.preventDefault();
	var username = $("#userField").val();
	var email = $("#emailField").val();
	var password = $("#passwordField").val();
	var userId = sessionStorage.getItem("userId");
	var jwt = sessionStorage.getItem("jwt");
	const userData = JSON.stringify({ userId: userId, username: username, password: password, email: email });
	const customConfig = {
		headers: {
			"Content-Type": "application/json",
			"x-access-token": jwt,
		},
	};
	axios
		.post("https://auth-ksbujg5hza-as.a.run.app/api/v1/user/update", userData, customConfig)
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
	errorModal.hide();
});

//trigger
