var date = new Date();

function create(){
    var title = document.getElementById("title");
    var country = document.getElementById("country");
    var priority = document.getElementById("priority");
    var comment = document.getElementById("body");
  
    var post = firebase.database().ref("post/");
    var unique_id = uuidv1();
    post.set ({
    unique_id: {
         comment:comment,
         country: country,
         header: title,
         like: 0,
         priority: priority,
         URL: null,
      },
   });

   alert ( "finish");
  }
class Post {
    constructor() { // string, string
        const uuidv1 = require('uuid/v1');
        this.id = uuidv1(); // unique id, later
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

