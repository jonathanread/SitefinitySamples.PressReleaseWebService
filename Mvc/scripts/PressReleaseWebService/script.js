//The token end point from where we can retrieve the access token
var tokenEndPoint = "/Sitefinity/Authenticate/OpenID/connect/token";
var apiUrl = "/api/press-releases/pressreleases";
var client_id = "pressRelease";
var client_secret = "0nNtpCUlEX";
var accessToken;
var refreshToken;
var pressRelease;

$(document).ready(function () {
	$("#getTokenBtn").on("click", getToken);
	$("#getTokenWithRefreshBtn").on("click", getAccessTokenFromRefreshToken);
	$("#apiCallBtn").on("click", getFirstItem);
	$("#createPRBtn").on("click", createPressRelease);
	$("#deletePressReleaseBtn").on("click", deleteFirstItemPressRelease);
	$("#createDraftPRBtn").on("click", batchCreatePressRelease);
});

//call api to get token for all use in other functions
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
function getFirstItem(e) {
	e.preventDefault();
	$.ajax({
		url: apiUrl,
		method: 'GET',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
		},
		success: function (data) {
			if (data.value.length !== 0) {
				$("#apiResult").text("Item content:" + data.value[0].Content);
				$("#title").val(data.value[0].Title);
				$("#content").val(data.value[0].Content);
				pressRelease = data.value[0];
				return data.value[0];
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

//call api to create press release item from text boxes
function createPressRelease(e) {
	e.preventDefault();
	var data = JSON.stringify(
		{
			Title: $('#title').val().toString(),
			Content: $('#content').val().toString(),
			UrlName: $('#title').val().toLowerCase().replace(/\s/gi, '-')
		});

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

function batchCreatePressRelease(e) {
	e.preventDefault();
	var data = JSON.stringify(
		{
			Title: $('#title').val().toString(),
			Content: $('#content').val().toString(),
			UrlName: $('#title').val().toLowerCase().replace(/\s/gi, '-')
		});
	var boundary = hex16() + "-" + hex16() + "-" + hex16();
	var batchRequest = batchBodyDraft(boundary, data);
	$.ajax({
		url: "/api/default/$batch",
		method: "POST",
		contentType: "multipart/mixed; boundary=sf_batch_" + boundary,
		data: batchRequest,
		processData: false,
		cache: false,
		headers: {
			'Authorization': 'Bearer ' + accessToken,
			"X-SF-Service-Request": true
		},
		success: function (data) {
			console.log(data);
			var responseItems = parseBatchResponse(data);


		},
		error: function (err) {
			console.log(err);
		}
	});

	return false;
}

function batchBodyDraft(boundary, contentItem) {
	var siteId = '682487e0-aa25-40ed-8157-0be1676274f7';
	var provider = 'OpenAccessDataProvider';
	var baseUrl = "http://localhost:60876/";
	var batchContent = new Array();

	var changeSetNum = hex16() + "-" + hex16() + "-" + hex16();
	batchContent.push('--sf_batch_' + boundary);
	batchContent.push('Content-Type: multipart/mixed; boundary=sf_changeset_' + changeSetNum);
	batchContent.push('');

	//if you move this into a loop you can do more than one item
	batchContent.push('--sf_changeset_' + changeSetNum); //begin changeset
	batchContent.push('Content-Type: application/http');
	batchContent.push('Content-Transfer-Encoding: binary');
	batchContent.push('Content-ID: 0');
	batchContent.push('');
	//batchContent.push('POST ' + baseUrl + 'api/default/newsitems?sf_provider=' + provider + '&sf_culture=en&sf_site=' + siteId + ' HTTP/1.1');
	batchContent.push('POST ' + baseUrl + 'api/default/pressreleases HTTP/1.1');
	batchContent.push('Content-Type: application/json');
	batchContent.push('');

	//JSON to post
	batchContent.push(contentItem);
	batchContent.push('');

	batchContent.push('--sf_changeset_' + changeSetNum);
	batchContent.push('Content-Type: application/http');
	batchContent.push('Content-Transfer-Encoding: binary');
	batchContent.push('Content-ID: 1');
	batchContent.push('');
	//batchContent.push('POST $0/operation?sf_provider=' + provider + '&sf_culture=en&sf_site=' + siteId + ' HTTP/1.1');
	batchContent.push('POST $0/operation HTTP/1.1');
	batchContent.push('Content-Type: application/json');
	batchContent.push('');
	batchContent.push('{"action":"SaveDraft"}');
	batchContent.push('');
	batchContent.push('--sf_changeset_' + changeSetNum + '--');//end of the changeset
	//end potential changeset loop

	batchContent.push('');
	batchContent.push('--sf_batch_' + boundary + '--');
	console.log(batchContent.join('\r\n'));
	return batchContent.join('\r\n');
}

function hex16() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
}

function parseBatchResponse(batchapiresponse) {
	var boundary = '--batch_';
	var items = [];
	var responseLines = batchapiresponse.split(boundary);
	$.each(responseLines, function (index, value) {

		var startJson = value.indexOf('{');
		var endJson = value.lastIndexOf('}');
		if (startJson < 0 || endJson < 0) {
			return;
		}
		var responseJson = value.substr(startJson, (endJson - startJson) + 1);
		responseJson = JSON.parse(responseJson);
		items.push(responseJson);

	});

	return items;
}

//call api to delete item by key
function deleteFirstItemPressRelease(e) {
	e.preventDefault();
	var pressRelease = getFirstItem(e);

	$.ajax({
		url: apiUrl + '(' + pressRelease.id + ')',
		method: 'DELETE',
		beforeSend: function (xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + accessToken);
			//xhr.setRequestHeader("Content-Type", "application/json");
			//xhr.setRequestHeader("Accept", "application/json");
			xhr.setRequestHeader("x-sf-service-request", true)
		},
		success: function (data) {
			console.log(data);
			if (data) {
				//$("#apiResult").text("Item content:" + data.Content)
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

//call api to create press release item from text boxes
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

