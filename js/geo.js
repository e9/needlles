$(function(){
    var timezones = {}
    let timezoneArray = Intl.supportedValuesOf('timeZone')



    for(var index in timezoneArray){
        const offset = moment.tz(timezoneArray[index]).utcOffset()
        timezones[timezoneArray[index]] = offset
    }

    timezones = Object.fromEntries(
        Object.entries(timezones).sort(([,a],[,b]) => a-b)
    );

    
    for(var key in timezones){
        let offset = moment.tz(key).format('Z')
        $('#timezones').append( $('<option value="'+key+'">'+key+' '+ offset + '</option>') );
    }


    $('#timezones').on('change',function(e) {
        var value = $('[name=timezone]').val();
        localStorage['timezone'] = value;
        localStorage['utc_offset'] = timezones[value]*60;
        displayTimeInfo();

    });

});



function getTimeStamp(time)
{
    return Math.round(time / 1000);
}
