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

//$(document).ready(function() {
  //Get Post On Document Ready
  //getUsers();
//})

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
  var country = document.getElementById("country");
  var priority = document.getElementById("search-filter");
  var postList = [];
  alert("search");

  //if ( country != 0)
  //  getPosts ( "?country="+country , "priority="+priority);
  //else
  //getPosts ( "?country=all" , "priority="+priority);

  var ref = firebase.database().ref();
  var postList = new Promise(function(fulfill, reject) {
    ref.on("value", function(snapshot) {
      fulfill(snapshot.val());
    }, function (error) {
      reject("Error: " + error.code);
    });
  }).then(function(postList) {
    var result = filter(country, postList);
    console.log(result);
  });  
}


function filter(query, postList){
  var result = []; //list of valid posts
  for (post in postList) {
    console.log(post);
    if (post.country == query) {
      result.push(post.val);
    }
  }
  return result;
}