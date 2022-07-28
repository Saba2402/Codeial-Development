{
    //method to submit the data for new post using AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type :'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    console.log(data);
                },error : function(error){
                    console.log(error.reponseText);
                }
            })
        });
    }
    //method to create a post in the DOM
    createPost();
}