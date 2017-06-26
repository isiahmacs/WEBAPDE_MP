var posts, users, photos, albums, id, userPosts, userProf, userPhotos, userAlbums, user;
var postNum = 99, photosNum = 4999, albumsNum = 99, userAlbum = 9;

$("main.html").ready(function() {	
	$("#longInput").on("focus", function(e) {
		$(".change").addClass("blackBG");
		$(".change").addClass("disabledbutton");
		$("#postButton").show(500);
	});
	
	$("#longInput").on("blur", function(e) {
		$("#postButton").hide(200);
		$(".change").removeClass("blackBG");
		$(".change").removeClass("disabledbutton");
	});
	
	$.get("https://jsonplaceholder.typicode.com/posts", function(data) {
		posts = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users", function(data) {
		users = data;
	});
	
	setTimeout(function(){
		displayPosts();
		$(".showmore").on("click", function() {
			displayPosts();
		});
	}, 1000);
});

$("profile.html").ready(function() {
	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("id"), function(data) {
		userProf = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users", function(data) {
		users = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("id") + "/posts", function(data) {
		userPosts = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("id") + "/photos", function(data) {
		userPhotos = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/users/" + localStorage.getItem("id") + "/albums", function(data) {
		userAlbums = data;
	});
	
	setTimeout(function(){
		displayProfile();
		displayProfilePosts();
	}, 1000);
});

$("photos.html").ready(function() {
	$.get("https://jsonplaceholder.typicode.com/photos", function(data) {
		photos = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/albums", function(data) {
		albums = data;
	});
	
	setTimeout(function(){
		displayPhotos();
		$(".showmorephotos").on("click", function() {
			displayPhotos();
		});
	}, 1000);
});

$("albums.html").ready(function() {
	$.get("https://jsonplaceholder.typicode.com/photos", function(data) {
		photos = data;
	});
	
	$.get("https://jsonplaceholder.typicode.com/albums", function(data) {
		albums = data;
	});
	
	setTimeout(function(){
		displayAlbum();
		$(".showmorealbums").on("click", function() {
			displayAlbum();
		});
	}, 1000);
});

function displayPosts() {
	$(".showmore").show(500);
	if(postNum >= 0) {
		for(var x = postNum; x >= postNum - 9; x--) {
			var post = document.createElement("div");
			$(post).addClass("postDiv");
			
			var head = document.createElement("p");
			$(head).addClass("post-title");
			$(head).text(posts[x].title);
			
			var author = document.createElement("span");
			$(author).addClass("post-name");
			$(author).text(users[posts[x].userId - 1].name);
			
			var userID = document.createElement("a");
			$(userID).addClass("post-user");
			
			$(userID).on("click", function(e) {
				getID(users[posts[x].userId].id);
			});
			
			$(userID).text("@" + users[posts[x].userId - 1].username);
			
			var content = document.createElement("p");
			$(content).addClass("post-content");
			$(content).text(posts[x].body);
			
			var comment = document.createElement("p");
			$(comment).addClass("post-comments");
			$(comment).text("0 comments");
			
			var likes = document.createElement("p");
			$(likes).addClass("post-likes");
			$(likes).text("0 likes");
			

			$(post).append(author);
			$(post).append(userID);
			$(post).append(head);	
			$(post).append(content);
			$(post).append(likes);
			$(post).append(comment);	
			$("#article").append(post);
			$(post).show(500);
		}
		$(".showmore" ).insertAfter(post);
		postNum -= 10;
	}
	
	else {
		$(".showmore").hide();
	}
}

function getID(val) {
	localStorage.setItem("id", val);
	window.location.href = "profile.html";
}

function displayProfile() {
	var name = document.createElement("p");
	$(name).addClass("name");
	$(name).text(userProf.name);

	var user = document.createElement("p");
	$(user).addClass("user");
	$(user).text("@" + userProf.username);
	
	var email = document.createElement("p");
	$(email).addClass("email");
	$(email).text("Email: " + userProf.email);
	
	var street = document.createElement("p");
	$(street).addClass("street");
	$(street).text("Street: " + userProf.address.street);
	
	var suite = document.createElement("p");
	$(suite).addClass("suite");
	$(suite).text("Suite: " + userProf.address.suite);
	
	var city = document.createElement("p");
	$(city).addClass("city");
	$(city).text("City: " + userProf.address.city);
	
	var zipcode = document.createElement("p");
	$(zipcode).addClass("zipcode");
	$(zipcode).text("Zipcode: " + userProf.address.zipcode);
	
	var phone = document.createElement("p");
	$(phone).addClass("phone");
	$(phone).text("Phone: " + userProf.phone);
	
	var website = document.createElement("p");
	$(website).addClass("website");
	$(website).text("Website: " + userProf.website);
	
	var company = document.createElement("p");
	$(company).addClass("company");
	$(company).text("Company: " + userProf.company.name);
	
	var cp = document.createElement("p");
	$(cp).addClass("company-catchPhrase");
	$(cp).text("Catch Phrase: " + userProf.company.catchPhrase);
	
	var bs = document.createElement("p");
	$(bs).addClass("company-bs");
	$(bs).text("BS: " + userProf.company.bs);
	
	$("#profileSection").append(name);
	$("#profileSection").append(user);
	$("#profileSection").append(email);
	$("#profileSection").append(street);
	$("#profileSection").append(suite);
	$("#profileSection").append(city);
	$("#profileSection").append(zipcode);
	$("#profileSection").append(phone);
	$("#profileSection").append(website);
	$("#profileSection").append(company);
	$("#profileSection").append(cp);
	$("#profileSection").append(bs);
}

function displayProfilePosts() {
	$(".showposts").hide(500);
	$(".showalbums").show(500);
	
	for(var x = 9; x >= 0; x--) {
		var profPost = document.createElement("div");
		$(profPost).addClass("profilePostDiv");
		
		var profHead = document.createElement("p");
		$(profHead).addClass("profile-post-title");
		$(profHead).text(userPosts[x].title);
			
		var profAuthor = document.createElement("span");
		$(profAuthor).addClass("profile-post-name");
		$(profAuthor).text(userProf.name);
			
		var profUserID = document.createElement("a");
		$(profUserID).addClass("profile-post-user");
		$(profUserID).text("@" + userProf.username);
			
		var profContent = document.createElement("p");
		$(profContent).addClass("profile-post-content");
		$(profContent).text(userPosts[x].body);
			
		var profComment = document.createElement("p");
		$(profComment).addClass("profile-post-comments");
		$(profComment).text("0 comments");
			
		var profLikes = document.createElement("p");
		$(profLikes).addClass("profile-post-likes");
		$(profLikes).text("0 likes");
			

		$(profPost).append(profAuthor);
		$(profPost).append(profUserID);
		$(profPost).append(profHead);	
		$(profPost).append(profContent);
		$(profPost).append(profLikes);
		$(profPost).append(profComment);	
		$("#profileArticle").append(profPost);
		$("#profileArticle").show(500);
	}
	
	$(".showalbums").insertAfter("#profileArticle");
	
	$(".showalbums").on("click", function(e) {
        $("#profileArticle").hide(500);
		$("#profileArticle").empty();
		displayProfileAlbum(userProf.id);
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
}

function displayProfileAlbum(profID) {
	$(".showposts").show(500);
	for(var x = userAlbum; x >= userAlbum - 9; x--) {
		var album = document.createElement("div");
		$(album).addClass("albums");
		$(album).attr("onClick", "displayAllPicsInProfileAlbum(" + userAlbums[x].id + ")");
			
		var albumname = document.createElement("p");
		$(albumname).addClass("albumname");
		$(albumname).text(userAlbums[x].title);
			
		$(album).append(albumname);
		$("#profileArticle").append(album);
		$("#profileArticle").show(500);
	}
		
	$(".showalbums").hide(500);
	$(".showposts").insertBefore(".albumDiv");
	
	$(".showposts").on("click", function(e) {
        $("#profileArticle").hide(500);
		$("#profileArticle").empty();
		displayProfilePosts();
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
}

function displayAllPicsInProfileAlbum(userAlbID) {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('html, body').css({
		overflow: "hidden",
		height: "100%"
	});
	
	var x = 4999, found = false;
	
	while(x >= 0 && !found) {
		if(userAlbID === userPhotos[x].albumId) {
			for(var y = x; y >= x - 49; y--) {
				
				var pic = document.createElement("div");
				$(pic).addClass("photos");
				$(pic).attr("style", "background-image: url(\"" + userPhotos[y].thumbnailUrl + "\");");
				$(pic).attr("onClick", "displayPicOfUser(" + userPhotos[y].id + ")");
				
				$(".albumfullScreenFormat").append(pic);
				
			}
			
			var closeIcon = document.createElement("div");
			$(closeIcon).addClass("albumcloseIcon");
				
			$(".albumfullScreenFormat").append(closeIcon);
			$(".albumfullScreenFormat").show(500);
				
			found = true;
		}
		
		else {
			x -= 50;
		}
	}
	
	$(closeIcon).on("click", function(e) {
        $(".albumfullScreenFormat").hide(500);
		$(".albumfullScreenFormat").empty();
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
}

function displayPicOfUser(phoID) {
	$(".albumfullScreenFormat").hide(500);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('html, body').css({
		overflow: "hidden",
		height: "100%"
	});

	phoID -= 1;
	var pic = document.createElement("div");
	$(pic).addClass("albumbigPic");
	$(pic).attr("style", "background-image: url(\"" + userPhotos[phoID].url + "\");");
	
	var closeI = document.createElement("div");
	$(closeI).addClass("closeIcon");

	$(".fullScreenFormat").append(closeI);
	$(".fullScreenFormat").append(pic);
	$(".fullScreenFormat").show(500);
		
	var info = document.createElement("div");
	$(info).addClass("albuminfoBack");
	
	var photoTitle = document.createElement("span");
	$(photoTitle).addClass("albumphotoTitle");
	$(photoTitle).text(userPhotos[phoID].title);
	
	var photoAuthor = document.createElement("p");
	$(photoAuthor).addClass("albumphotoAuthor");
	
	$(photoAuthor).on("click", function(e) {
		getID(users[userAlbums[(userPhotos[phoID].albumId - 1) % 10].userId - 1].id);
	});
	
	$(photoAuthor).text("by " + users[userAlbums[(userPhotos[phoID].albumId - 1) % 10].userId - 1].name);
	
	var photoAlbum = document.createElement("p");
	$(photoAlbum).addClass("albumfromAlbum");
	$(photoAlbum).text("from " + userAlbums[(userPhotos[phoID].albumId - 1) % 10].title);
	
	$(info).append(photoTitle);
	$(info).append(photoAuthor);
	$(info).append(photoAlbum);
	$(".albumbigPic").append(info);
	
	$(closeI).on("click", function(e) {
        $(".fullScreenFormat").hide(500);
		$(".fullScreenFormat").empty();
		$(".albumfullScreenFormat").show(500);
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
	});
}

function displayPhotos() {
	$(".showmorephotos").show(500);
	if(photosNum >= 0) {
		for(var x = photosNum; x >= photosNum - 11; x--) {
			
			var pics = document.createElement("div");
			$(pics).addClass("allPhotos");
			$(pics).attr("style", "background-image: url(\"" + photos[x].thumbnailUrl + "\");");
			$(pics).attr("onClick", "displayFullScreenPic(" + photos[x].id + ")");
			$(".photosDiv").append(pics);
			$(".photosDiv").show(500);
		}
		$(".showmorephotos").insertAfter(".photosDiv");
		photosNum -= 12;
	}
	
	else {
		$(".showmorephotos").hide();
	}
}

function displayFullScreenPic(phoID) {
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('html, body').css({
		overflow: "hidden",
		height: "100%"
	});
	phoID -= 1;
	var pic = document.createElement("div");
	$(pic).addClass("bigPic");
	$(pic).attr("style", "background-image: url(\"" + photos[phoID].url + "\");");
	
	var closeI = document.createElement("div");
	$(closeI).addClass("closeIcon");

	$(".fullScreenFormat").append(closeI);
	$(".fullScreenFormat").append(pic);
	$(".fullScreenFormat").show(500);
		
	var info = document.createElement("div");
	$(info).addClass("infoBack");
	
	var photoTitle = document.createElement("span");
	$(photoTitle).addClass("photoTitle");
	$(photoTitle).text(photos[phoID].title);
	
	var photoAuthor = document.createElement("p");
	$(photoAuthor).addClass("photoAuthor");
	
	$(photoAuthor).on("click", function(e) {
		getID(users[albums[photos[phoID].albumId - 1].userId - 1].id);
	});
	
	$(photoAuthor).text("by " + users[albums[photos[phoID].albumId - 1].userId - 1].name);
	
	var photoAlbum = document.createElement("p");
	$(photoAlbum).addClass("fromAlbum");
	
	$(photoAlbum).attr("onClick", "displayParentAlbum(" + albums[photos[phoID].albumId - 1].id + ")");
	
	$(photoAlbum).text("from " + albums[photos[phoID].albumId - 1].title);
	
	$(info).append(photoTitle);
	$(info).append(photoAuthor);
	$(info).append(photoAlbum);
	$(".bigPic").append(info);
	
	$(closeI).on("click", function(e) {
        $(".fullScreenFormat").hide(500);
		$(".fullScreenFormat").empty();
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
}

function displayParentAlbum(albId) {
	
	$(".fullScreenFormat").hide(500);
	$(".fullScreenFormat").empty();
	
	var x = 4999, found = false;
	
	while(x >= 0 && !found) {
		if(albId === photos[x].albumId) {
			for(var y = x; y >= x - 49; y--) {
				
				var pic = document.createElement("div");
				$(pic).addClass("photos");
				$(pic).attr("style", "background-image: url(\"" + photos[y].thumbnailUrl + "\");");
				$(pic).attr("onClick", "displayPic(" + photos[y].id + ")");
				
				$(".albumfullScreenFormat").append(pic);
				
			}
			
			var closeIcon = document.createElement("div");
			$(closeIcon).addClass("albumcloseIcon");
				
			$(".albumfullScreenFormat").append(closeIcon);
			$(".albumfullScreenFormat").show(500);
				
			found = true;
		}
		
		else {
			x -= 50;
		}
	}
	
	$(closeIcon).on("click", function(e) {
        $(".albumfullScreenFormat").hide(500);
		$(".albumfullScreenFormat").empty();
		$(".fullScreenFormat").empty();
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
};

function displayAlbum() {
	$(".showmorealbums").show(500);
	if(albumsNum >= 0) {
		for(var x = albumsNum; x >= albumsNum - 9; x--) {
			
			var album = document.createElement("div");
			$(album).addClass("albums");
			$(album).attr("onClick", "displayAllPicsInAlbum(" + albums[x].id + ")");
			
			var albumname = document.createElement("p");
			$(albumname).addClass("albumname");
			$(albumname).text(albums[x].title);
			
			
			$(album).append(albumname);
			$(".albumDiv").append(album);
			$(".albumDiv").show(500);
		}
		$(".showmorealbums").insertAfter(".albumDiv");
		albumsNum -= 10;
	}
	
	else {
		$(showmorealbums).hide();
	}
}

function displayAllPicsInAlbum(albID) {
	
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('html, body').css({
		overflow: "hidden",
		height: "100%"
	});
	
	var x = 4999, found = false;
	
	while(x >= 0 && !found) {
		if(albID === photos[x].albumId) {
			for(var y = x; y >= x - 49; y--) {
				
				var pic = document.createElement("div");
				$(pic).addClass("photos");
				$(pic).attr("style", "background-image: url(\"" + photos[y].thumbnailUrl + "\");");
				$(pic).attr("onClick", "displayPic(" + photos[y].id + ")");
				
				$(".albumfullScreenFormat").append(pic);
				
			}
			
			var closeIcon = document.createElement("div");
			$(closeIcon).addClass("albumcloseIcon");
				
			$(".albumfullScreenFormat").append(closeIcon);
			$(".albumfullScreenFormat").show(500);
				
			found = true;
		}
		
		else {
			x -= 50;
		}
	}
	
	$(closeIcon).on("click", function(e) {
        $(".albumfullScreenFormat").hide(500);
		$(".albumfullScreenFormat").empty();
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
		$("html, body").animate({ scrollTop: $(document).height() }, "slow");
	});
}

function displayPic(phoID) {
	$(".albumfullScreenFormat").hide(500);
	$("html, body").animate({ scrollTop: 0 }, "slow");
	$('html, body').css({
		overflow: "hidden",
		height: "100%"
	});

	phoID -= 1;
	var pic = document.createElement("div");
	$(pic).addClass("albumbigPic");
	$(pic).attr("style", "background-image: url(\"" + photos[phoID].url + "\");");
	
	var closeI = document.createElement("div");
	$(closeI).addClass("closeIcon");

	$(".fullScreenFormat").append(closeI);
	$(".fullScreenFormat").append(pic);
	$(".fullScreenFormat").show(500);
		
	var info = document.createElement("div");
	$(info).addClass("albuminfoBack");
	
	var photoTitle = document.createElement("span");
	$(photoTitle).addClass("albumphotoTitle");
	$(photoTitle).text(photos[phoID].title);
	
	var photoAuthor = document.createElement("p");
	$(photoAuthor).addClass("albumphotoAuthor");
	
	$(photoAuthor).on("click", function(e) {
		getID(users[albums[photos[phoID].albumId - 1].userId - 1].id);
	});
	
	$(photoAuthor).text("by " + users[albums[photos[phoID].albumId - 1].userId - 1].name);
	
	var photoAlbum = document.createElement("p");
	$(photoAlbum).addClass("albumfromAlbum");
	$(photoAlbum).text("from " + albums[photos[phoID].albumId - 1].title);
	
	$(info).append(photoTitle);
	$(info).append(photoAuthor);
	$(info).append(photoAlbum);
	$(".albumbigPic").append(info);
	
	$(closeI).on("click", function(e) {
        $(".fullScreenFormat").hide(500);
		$(".fullScreenFormat").empty();
		$(".albumfullScreenFormat").show(500);
		$('html, body').css({
			overflow: "auto",
			height: "auto"
		});
	});
}