//The token end point from where we can retrieve the access token
var tokenEndPoint = "/Sitefinity/Authenticate/OpenID/connect/token";
var apiUrl = "/api/press-releases/pressreleases";
var client_id = "pressRelease";
var client_secret = "0nNtpCUlEX";
var accessToken;
var refreshToken;

$(document).ready(function () {
	$("#getTokenBtn").on("click", getToken);
	$("#getTokenWithRefreshBtn").on("click", getAccessTokenFromRefreshToken);
	$("#apiCallBtn").on("click", callApi);
	$("#createPRBtn").on("click", createPressRelease);
});


function getToken(e) {
	e.preventDefault();

	var username = $('#username').val();
	var password = $('#password').val();
	//Call that gets the access and refresh token
	$.ajax({
		url: tokenEndPoint,
		data: {
			username: username,
			password: password,
			grant_type: 'password',
			scope: 'openid offline_access',
			client_id: client_id,
			client_secret: client_secret
		},
		method: 'POST',
		success: function (data) {
			console.log(data.access_token);
			console.log(data.refresh_token);
			$('#token').text(data.access_token);
			$('#refreshToken').text(data.refresh_token);
			accessToken = data.access_token;
			refreshToken = data.refresh_token;
		},
		error: function (err) {
			console.log(err);
			alert(err.responseText);
		}
	});
	return false;
}
//Call that gets new access and refresh token from the current refresh token
function getAccessTokenFromRefreshToken() {
	$.ajax({
		url: tokenEndPoint,
		data: {
			refresh_token: refreshToken,
			grant_type: 'refresh_token',
			client_id: client_id,
			client_secret: client_secret
		},
		method: 'POST',
		success: function (data) {
			console.log(data.access_token);
			console.log(data.refresh_token);
			$('#token').text(data.access_token);
			$('#refreshToken').text(data.refresh_token);
			accessToken = data.access_token;
			refreshToken = data.refresh_token;
		},
		error: function (err) {
			alert(err.responseText);
		}
	})
}
//Sitefinity Web API call with access token as a bearer token
function callApi(e) {
	e.preventDefault();
	$.ajax({
		url: apiUrl,
		method: 'GET',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
		},
		success: function (data) {
			if (data.value.length !== 0) {
				$("#apiResult").text("Item content:" + data.value[0].Content)
			}
			else {
				$("#apiResult").text("No press release items");
			}
		},
		error: function (err) {
			console.log(err);
			alert(err.responseText);
		}
	});
	return false;
}

function createPressRelease(e) {
	e.preventDefault();
	var data = JSON.stringify(
		{
			Title: $('#title').val().toString(),
			Content: $('#content').val().toString(),
			UrlName: $('#content').val().toLowerCase().replace(/\s/gi, '-'),
			PublicationDate: new Date(),
			ExpirationDate: new Date()
		});
	debugger;
	$.ajax({
		url: apiUrl,
		method: 'POST',
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		traditional: true,
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			//xhr.setRequestHeader("Content-Type", "application/json");
			//xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("x-sf-service-request", true)
		},
		data: data,
		success: function (data) {
			console.log(data);
			if (data) {
				$("#apiResult").text("Item content:" + data.Content)
			}
			else {
				$("#apiResult").text("Error ... ");
			}
		},
		error: function (err) {
			console.log(err);
			alert(err.responseText);
		}
	});

	return false;
}