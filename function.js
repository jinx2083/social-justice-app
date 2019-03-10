  var getData = [];
  var usersList = [];
  

function status(response) {
  //Check Promise
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  //Return JSON format
  return response.json()
}

function getUsers(){
  
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(status)
  .then(json)
  .then(function(dataList) {
    usersList = dataList;    
    dataList.forEach(function(data){
      $('#selUser').append($('<option>', { 
        value: data.id,
        text : data.name 
    }));
      
    });
    getPosts("");
    
    
  })
  .catch(function(error) {
    console.log('Fetch User Error :-S', error);
  });
  
}

function getPosts(option){
  
  fetch('https://jsonplaceholder.typicode.com/posts' + option)
  .then(status)
  .then(json)
  .then(function(dataList) {
    getData = dataList;
    var divReply = $(".reply")
    divReply.empty();
    
    dataList.forEach(function(data){
      var post = $('<p class="post"/>');
      
      var divID = $('<div class="userName"/>').append($('<span>').append('By: ', usersList[data.userId - 1].name));    
      var divTitle = $('<div class="title"/>').append(data.title);
      var divBody = $('<div class="body"/>').append(data.body)
      
      divReply.append(post.append(divID,divTitle,divBody));
      
    });
    
  })
  .catch(function(error) {
    console.log('Fetch Post Error :-S', error);
  });
}

 $(document).ready(function() {
  //Get Post On Document Ready
  document.getElementById("showCounts").innerHTML = localStorage.clickcount;
});

/* function printSocialMedia(){
  document.getElementById('social').innerHTML = 
(<a class="a2a_dd" href="https://www.addtoany.com/share"></a>
  <a class="a2a_button_facebook"></a>
  <a class="a2a_button_twitter"></a>
  <a class="a2a_button_linkedin"></a>
  <a class="a2a_button_reddit"></a>
  <a class="a2a_button_facebook_messenger"></a>
  <a class="a2a_button_flipboard"></a>
  <a class="a2a_button_skype"></a>);
} */

/** allow user to share post by creating URL link to copy 
 *  implement this function if we have time 
 *  @return url link for post 
 */
function share(){

}

/** 
 * search for the appropriate information from the provided data 
 * @return post with correct filter 
 */
function search(){
  var country = document.getElementById("country").value;
  var priority = document.getElementById("search-filter").value;
  console.log(priority);
  var result = []; //list of valid posts
  alert("search");
  var ref = firebase.database().ref("posts");
  var postList = new Promise(function(fulfill, reject) {
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function(post) {
        if(post.val().country == country && isPriority(priority, post.val().priority)) {
          result.push(post.val());
        }
      });
      console.log(result);
      fulfill(result);
    }, function (error) {
      reject("Error: " + error.code);
    });
  }); 
postList.then(function(result) {
  updateResult(result);
});
}

function isPriority(priority, postPriority) {
  if (priority == "all"){
    return true;
  }
  return priority == postPriority;
}
function updateResult(validPosts){
  console.log("inside updateResults");
  var result = "<div class=" + '\u0022' + "posts" + '\u0022' + ">";
  for (var i = 0; i < validPosts.length; i++) {
    result += "<div class=" + '\u0022' + "post" + '\u0022' + ">";
    result += "<p class=" + '\u0022' + "heading" + '\u0022' + ">";
    result += validPosts[i].header;
    result += "</p>";
    result += "<div class=" + '\u0022' + "data" + '\u0022' + ">";
    result += validPosts[i].comment;
    result += "</div>";
    result += "<div id=" + '\u0022' +"likes" + '\u0022' + ">";
    result += "<button id=" + '\u0022' +  "counter2" + '\u0022' + " onclick=" + '\u0022' + "likes()" + '\u0022'+ " type=" + '\u0022'+ "button" + '\u0022' + "><i class=" + '\u0022'+ "fa fa-heart-o" + '\u0022' + "></i></button>";
    result += "</div>";
    result += "</div>";

    if (validPosts[i].commentSection != null) {
    }
  }
  result += "</div>";
  console.log(result);
  document.getElementById("posts").innerHTML = result;
}
