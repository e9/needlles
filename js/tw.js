var get_timezone = function(screen_name){
    OAuth.initialize("iwFvDIDlAlxsctdx41ooP1p2jvI");
    OAuth.popup("twitter", function(error, result) {
        if (error) return;
        // console.log(error, result)
        // console.log("oauth_token: " + result.oauth_token);
        // console.log("oauth_token_secret: " + result.oauth_token_secret);
        // result.get('/1.1/account/verify_credentials.json').done(function(data) {
        //     alert('Hello ' + data.screen_name);
        // });
        result.get('/1.1/users/show.json?screen_name=' + screen_name).done(function(data){
            alert(data.time_zone);
        });
    });
}


$(function(){
    $('#button').click(function(){
        var screen_name = $('#twid').val();
        get_timezone(screen_name);
    });
});
