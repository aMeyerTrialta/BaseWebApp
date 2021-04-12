$(document).ready(function() {
  getPosts();
})

function getWeather(searchQuery) {
  var url="https://api.openweathermap.org/data/2.5/weather?q=" + searchQuery + "&units=metric&appid=" + apiKey;

  $(".city").text("");
  $(".temp").text("");
  $(".error-message").text("");

  $.ajax(url, {success: function(data){
    console.log(data);
    $(".city").text(data.name);
    $(".temp").text(data.main.temp);
  }, error: function(error) {
    $(".error-message").text("An error eccoured!");
  }})
}

function searchWeather() {
  var searchQuery = $(".search").val();
  getWeather(searchQuery);
}

function handleSignIn() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log(user.email);
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function addMessage(postTitle, postBody) {
  var postData = {
    title: postTitle,
    body: postBody
  }

  var database = firebase.database().ref('posts'); 
  var newPostRef = database.push();
  newPostRef.set(postData, function(error) {
    if (error) {
      concolse.log("Error writing to the database!")
    } else {
      window.location.reload();
    }
  });
}

function handleMessageFormSubmit() {
  var postTitle = $("#post-title").val();
  var postBody = $("#post-body").val();
  addMessage(postTitle, postBody);
}

function getPosts() {
  return firebase.database().ref('posts').once('value').then((snapshot) => {
    var posts = snapshot.val();
    console.log(posts);
    for(var postKey in posts) {
      var post = posts[postKey];
      $("#post-listing").append("<div>" + post.title + " - " + post.body + "</div>")
      console.log(post.title)
    }
  });
}


//function myFunction() {
  // use jQuery ($ is shorthand) to find the div on the page and then change the html
  // jQuery can do a lot of crazy stuff so make sure to google around to find out more

 // $("#demo").html("NEWWW PARAGRAPH #javascript #fire");

  // 'img-circle' is a bootstrap thing! Check out more here: http://getbootstrap.com/css/
//  $("#doge-image").append(`<img class="img-circle" src="images/wowdoge.jpeg" />`);
//}

