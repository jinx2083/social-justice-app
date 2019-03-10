var date = new Date();
var unique_id = 0;
  
function generate () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    unique_id =  '_' + Math.random().toString(36).substr(2, 9);
  }

function create(){
 
    generate();
    var title = document.getElementById("title").value;
    //console.log(title);
    var cty = document.getElementById("country").value;
    //console.log(cty);
    var prt = document.getElementById("priority").value;
    //console.log(prt);
    var cmt = document.getElementById("body").value;
    //console.log(cmt);
  
    var post = firebase.database().ref("posts/"+unique_id);

    post.update ({
    
         comment:cmt,
         country: cty,
         header: title,
         like: 0,
         priority: prt,
         URL: null,
    
   });

   alert ( "finish");
  }
class Post {
    constructor() { // string, string
        const uuidv1 = require("uuid/v1");
        this.id = uuidv1(); // unique id
        this.user;
        this.country;
        this.priority;
        this.heading = "";
        this.data = "";
        this.numLikes = 0;
        this.timeStamp = date.now();
        this.commentSec = new CommentSection(this.id);
    }
    
    createPost(heading, country, priority, data) {
        this.heading = heading;
        this.country = country;
        this.priority = priority
        this.data = data;
    }

    deletePost(id) {
        // TODO
    }

    editPost(id) {
        // ??????
    }

}

