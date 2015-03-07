var screenImgElement = document.getElementById("screen");
var $touchPad = $('#touchPad');
var $buttonList = $('#buttons');
var swipeStart = null;
var $logDiv = $('#log');
var globalCnt = 0;
$touchPad.css('top', $('img').css('top'));
window.setInterval(function (){
    screenImgElement.src = "/static/screen.png?"+new Date().getTime();
    $touchPad.css('width', screenImgElement.width);
    $touchPad.css('height', screenImgElement.height);
    $buttonList.css('width', screenImgElement.width);
}, 900);
function logEvent(text){
    var lid = globalCnt++;
    $logDiv.append('<p>'+'['+lid+'] '+text+'</p>');
    $logDiv.scrollTop($logDiv[0].scrollHeight);
    return lid;
}
function ackEvent(lid){
    $logDiv.append('<p class="success">'+'['+lid+'] Success!</p>');
    $logDiv.scrollTop($logDiv[0].scrollHeight);
}
function sendClick(x, y){
    var lid = logEvent('Tap at position: ('+x+','+y+')');
    $.ajax({
        url: '/click',
        type: 'POST',
        data: $.param( {'x': x, 'y': y} ),
        success: function(){
            ackEvent(lid);
        },
    });
}
function sendSwipe(x1, y1, x2, y2){
    var lid = logEvent('Swipe at position: ('+x1+','+y1+') to ('+x2+','+y2+')');
    $.ajax({
        url: '/swipe',
        type: 'POST',
        data: $.param( {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y2} ),
        success: function(){
            ackEvent(lid);
        },
    });
}
function getCoordinates(e){
    var x = e.offsetX, y = e.offsetY;
    if(x == undefined)
        x = e.pageX-$touchPad.offset().left,
        y = e.pageY-$touchPad.offset().top;
    return {'x': x, 'y': y};
}
$touchPad.on('mousedown', function(e){
    var xy = getCoordinates(e);
    swipeStart = xy;
});
$touchPad.on('mouseup', function(e){
    if(swipeStart != null){
        var x1 = swipeStart['x'], y1 = swipeStart['y'];
        var xy2 = getCoordinates(e);
        var x2 = xy2['x'], y2 = xy2['y'];
        var diffX = (x1-x2)*(x1-x2), diffY = (y1-y2)*(y1-y2);
        if(diffX + diffY < 25){
            sendClick(x1, y1);
        }else{
            sendSwipe(x1, y1, x2, y2);
        }
    }
    swipeStart = null;
});
$('.special_button').on('click', function(e){
    var key = $(e.target).data('key');
    var longPress = document.getElementById("longpress").checked;
    var lid = logEvent('Keyevent: '+key+', longpress: '+longPress);
    $.ajax({
        url: '/keyevent',
        type: 'POST',
        data: $.param( {'key': key, 'longpress': longPress} ),
        success: function(){
            ackEvent(lid);
        },
    });
});
$("#wordToSend").on({
    keydown: function(e) {
        if (e.which === 32)
            return false;
    },
    change: function() {
        this.value = this.value.replace(/\s/g, "");
    }
});
$('#send-text').on('click', function(){
    var text = document.getElementById('wordToSend').value;
    var lid = logEvent('Text: '+text);
    $.ajax({
        url: '/text',
        type: 'POST',
        data: $.param( {'text': text} ),
        success: function (data, textStatus, jqXHR) {
            document.getElementById('wordToSend').value = "";
            ackEvent(lid);
        },
    });
});
