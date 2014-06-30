if (navigator.geolocation) {
    // 現在の位置情報取得を実施
    navigator.geolocation.getCurrentPosition(
    // 位置情報取得成功時
    function (pos) { 

        var requestUrl =
            'https://maps.googleapis.com/maps/api/timezone/' +
            'json' +
            '?location=' + pos.coords.latitude + ',' + pos.coords.longitude +
            '&timestamp=' + getTimeStamp(new Date().getTime()) +
            '&sensor=' + 'false' +
            '&language=' + 'ja';

        //request timezone
        $.ajax({
            url: requestUrl,
            type: 'GET',
            success: function(timeZone) {
                if (timeZone['status'] == 'OK') {
                    //add marker
                    addList(pos.coords, timeZone);
                } else {
                    //error
                    alert('status:' + timeZone['status']);
                }
            }
        });
    },

    // 位置情報取得失敗時
    function (pos) { 
            var location ="<li>GeoLocation Failure</li>";
            document.getElementById("location").innerHTML = location;
    });
} else {
    window.alert("本ブラウザではGeolocationが使えません");
}

function getTimeStamp(time)
{
    return Math.round(time / 1000);
}

function addList(coords, timeZone)
{
    var contentString =
        '<li>' + '緯度経度:　' + coords.latitude +',' + coords.longitude + '</li>' +
        '<li>' + 'タイムゾーンID:　' + timeZone['timeZoneId'] + '</li>' +
        '<li>' + 'タイムゾーン名:　' + timeZone['timeZoneName'] + '</li>' +
        '<li>' + '時差:　' + timeZone['rawOffset']/3600 + '時間' + '</li>' +
        '<li>' + 'サマータイムによる時差:　' + timeZone['dstOffset']/3600 + '時間' + '</li>';

    document.getElementById("location").innerHTML = contentString;
}