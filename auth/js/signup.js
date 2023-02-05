var successModal = new bootstrap.Modal(document.getElementById("successModal"));
var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));

$("#submitBtn").click(async function (event) {
	event.preventDefault();
	var username = $("#userField").val();
	var email = $("#emailField").val();
	var password = $("#passwordField").val();
	var role = "customer";
	if ($("#customerRadio").is(":checked")) {
		role = "business";
	}
	const userData = JSON.stringify({ username: username, email: email, password: password, roles: [role] });
	const customConfig = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	axios
		.post("https://auth-ksbujg5hza-as.a.run.app/api/v1/signup", userData, customConfig)
		.then((response) => {
			if (response.status == 200) {
				successModal.show();
			}
		})
		.catch((error) => {
			if (error.response.status == 400) {
				errorModal.show();
			}
			console.error("There was an error!", error.response.status);
		});
});

$("#login").click(function () {
	window.location.href = "/auth/login.html";
	return false;
});

$(".closeBtn").click(function () {
	successModal.hide();
	errorModal.hide();
});
