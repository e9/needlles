OAuth.initialize("iwFvDIDlAlxsctdx41ooP1p2jvI");

var get_timezone = function(screen_name){
    var d = new $.Deferred;

    var timezone = localStorage[screen_name];

    if (timezone) return d.resolve(timezone);

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
            var utc_offset = data.utc_offset;
            localStorage['screen_name'] = screen_name;
            localStorage['timezone'] = timezone;
            localStorage['utc_offset'] = utc_offset;
			displayTimeInfo();

            d.resolve(timezone);
        });
    });

    return d.promise();
}

var set_timezone = function(timezone){
    var d = new $.Deferred;
    
    OAuth.popup("twitter", function(error, result) {
        if (error) return d.reject();
        result.post('/1.1/account/settings.json', {"data": {"time_zone": timezone}}).done(function(data){
            d.resolve();
        });
    });

    return d.promise();
};


$(function(){
    $('#set').click(function(){
        var screen_name = $('#twid').val();
        get_timezone(screen_name).done(function(timezone){
            //alert(timezone);
        });
    });
});
