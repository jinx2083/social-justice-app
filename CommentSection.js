class CommentSection {
    constructor(id) {
        this.allComments = new Set();
        this.postID = id;
    }

    addComment(data){
        var newComment = new Comment(user, data , this.postID);
        allComments.add(newComment);
    }
}