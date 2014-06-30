var get_timezone = function(screen_name){
    var d = new $.Deferred;

    var timezone = localStorage[screen_name];

    if (timezone) return d.resolve(timezone);

    OAuth.initialize("iwFvDIDlAlxsctdx41ooP1p2jvI");
    OAuth.popup("twitter", function(error, result) {
        if (error) return d.reject();
        // console.log(error, result)
        // console.log("oauth_token: " + result.oauth_token);
        // console.log("oauth_token_secret: " + result.oauth_token_secret);
        // result.get('/1.1/account/verify_credentials.json').done(function(data) {
        //     alert('Hello ' + data.screen_name);
        // });
        result.get('/1.1/users/show.json?screen_name=' + screen_name).done(function(data){
            var timezone = data.time_zone;
            localStorage[screen_name] = timezone;
            d.resolve(timezone);
        });
    });

    return d.promise();
}


$(function(){
    $('#button').click(function(){
        var screen_name = $('#twid').val();
        get_timezone(screen_name).done(function(timezone){
            alert(timezone);
        });
    });
});
