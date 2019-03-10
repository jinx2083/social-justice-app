var date = new Date();
const priority = new Enumeration({
    low: 1,
    medium: 2,
    high: 3,
  });

class Post {
    constructor() { // string, string
        const uuidv1 = require('uuid/v1');
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