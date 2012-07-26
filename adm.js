// Onderstaande is de nieuwe template, functies in de kdbk namespace plaatsen
(function( kdbk, $, undefined ) {
    //Private Property
    var isHot = true;

    //Public Property
    kdbk.plaatsnaam = "Rotterdam";

    //Public Methods
    kdbk.show = function(pInput) {
        var test = 'public method';

        debug.log("input: " + pInput+' , tst: ' + test );
    };
    kdbk.ajx = function(pAppProcess,pObj,pCallback){
                // APEX parameters, x01..x50 zijn strings, f01..f50 zijn arrays
                  var oApex = {     p_flow_id:$('#pFlowId').val(), 
                    p_flow_step_id:0, 
                    p_instance:$('#pInstance').val(), 
                    x01: pObj.x01,
                    x02: pObj.x02,
                    x03: pObj.x03,
                    x04: pObj.x04,
                    x05: pObj.x05,
                    f01: pObj.f01,
                    f02: pObj.f02,
                    p_request:"APPLICATION_PROCESS=" + pAppProcess
                    }
              // ajax call
              // cache uit zetten              
                $.ajax({
                               type: "GET",
                               url: "wwv_flow.show",
                               data: oApex,
                               dataType: "html", 
                               success: pCallback,
                               cache: false
                                  
                          });
    }
    kdbk.ajx.example = function(pThis) {
              // callback functie defineren (dus wat te doen met return data)  
              var callback = function(data){
                        // vaak return omzetten naar JSON object
                        // var ret = JSON.parse(data);
                        debug.log(data);
                        };
              // ajax call om data op te halen (in dit voorbeeld wordt gebruik gemaakt van AJX_CALL applicatie proces, die dient aanwezig te zijn)
               kdbk.ajx('AJX_CALL',{x01:pThis}, callback);
    }
    kdbk.cancel = function(e)
    {
      if (e && e.preventDefault)
      e.preventDefault(); // DOM style
      return false; // IE style
    }
    kdbk.getMenuId = function (){
    // get menu item id by url
    var url = window.location.href;
    var mi =  url.search(/P1_MENU_ITEM_ID:/i);
    var mii = url.substring((mi+16),(mi+4+16));
    var id =  mii.replace (/[^\d]/g, '');
    return id;
    }
    kdbk.getPicasaData{
      debug.log('getPicasaData()');
      var base = 'http://picasaweb.google.com/data'
      var coll = '/feed'
      var proj = '/base'
      var cont = '/user'
      var user = '/blokhj'
      var albu = '/albumid'
      // 'Administratie persoonlijk' albumid = '5659742105189746641'
      // 'Posters' public album albumid = '5552405753256479985'
      var albumid = '/5659742105189746641'
      var json = '&alt=json'

      // orginal url http://picasaweb.google.com/data/feed/base/user/blokhj?kind=photo&thumbsize=72c&access=public&alt=json&callback=?
      // voorbeeld: http://picasaweb.google.com/data/feed/base/user/blokhj/albumid/5659742105189746641?alt=json&q=%225664815571186828674%22

      var url = base + coll + proj + cont + user + albu + albumid + "?kind=photo&thumbsize=72c&alt=json&callback=?";
      console.log('url:'+url);
      $.getJSON(url,
                function(data){
                  var thumbCount = 9;
                  var smallThumb = 0;
                  var mediumThumb = 1;
                  var largeThumb = 2;
                  var picsCount = data.feed.entry.length - 1;
                  for (var i = picsCount; i > picsCount - thumbCount; i--) {
                        var pic = data.feed.entry[i];
                        $("<img/>").attr("src", pic.media$group.media$thumbnail[smallThumb].url).attr("alt", pic.summary.$t).appendTo("#picasaStream");
                  }
                  });
    
    }
    //Private Method
    function addItem( item ) {
        if ( item !== undefined ) {
            debug.log( "Adding " + $.trim(item) );
        }
    }    
}( window.kdbk = window.kdbk || {}, jQuery ));