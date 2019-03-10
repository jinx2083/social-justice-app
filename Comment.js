class Comment {
    constructor (user, data, postID){
        const uuidv1 = require("uuid/v1");
        this.id = uuidv1();
        this.data = data;
        this.postID = postID;
    }
}