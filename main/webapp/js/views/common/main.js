//------------- main.js -------------//

// make console.log safe to use
window.console||(console={log:function(){}});

//Internet Explorer 10 in Windows 8 and Windows Phone 8 fix
if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
  var msViewportStyle = document.createElement('style');
  msViewportStyle.appendChild(
    document.createTextNode(
      '@-ms-viewport{width:auto!important}'
    )
  );
  document.querySelector('head').appendChild(msViewportStyle)
}

//Android stock browser
var nua = navigator.userAgent;
var isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1)
if (isAndroid) {
  $('select.form-control').removeClass('form-control').css('width', '100%')
}

//attach fast click
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

//doc ready function
$(document).ready(function() {

    //Disable certain links
    $('a[href^=#]').click(function (e) {
        e.preventDefault()
    })


    //------------- Bootstrap tooltips -------------//
    $("[data-toggle=tooltip]").tooltip ({container:'body'});
    $(".tip").tooltip ({placement: 'top', container: 'body'});
    $(".tipR").tooltip ({placement: 'right', container: 'body'});
    $(".tipB").tooltip ({placement: 'bottom', container: 'body'});
    $(".tipL").tooltip ({placement: 'left', container: 'body'});
    //------------- Bootstrap popovers -------------//
    $("[data-toggle=popover]").popover ();


    //get plugin object 
    var adminObj = $('body').data('ledodata');
    //now we have access to change settings.

    //If new user set the localstorage variables
    //if ( firstImpression() ) {
    //    //console.log('New user');
    //    if (adminObj.settings.header.fixed) {
    //        store.set('fixed-header', 1);
    //    } else {store.set('fixed-header', 0);}
    //    if (adminObj.settings.sidebar.fixed) {
    //        store.set('fixed-left-sidebar', 1);
    //    } else {store.set('fixed-left-sidebar', 0);}
    //    if (adminObj.settings.rightSidebar.fixed) {
    //        store.set('fixed-right-sidebar', 1);
    //    } else {store.set('fixed-right-sidebar', 0);}
    //}

    //------------- Template Settings -------------//
    // (this is example , remove it in production state.)

    //checkbox states 
    // fixed header
    //if (store.get('fixed-header') == 1 ) {
    //    $('#fixed-header-toggle').prop('checked', true);
    //} else {
    //    $('#fixed-header-toggle').prop('checked', false);
    //}
    //
    ////left sidebar
    //if (store.get('fixed-left-sidebar') == 1 ) {
    //    $('#fixed-left-sidebar').prop('checked', true);
    //} else {
    //    $('#fixed-left-sidebar').prop('checked', false);
    //}
    //
    ////right sidebar
    //if (store.get('fixed-right-sidebar') == 1 ) {
    //    $('#fixed-right-sidebar').prop('checked', true);
    //} else {
    //    $('#fixed-right-sidebar').prop('checked', false);
    //}

    //check magic access methods.
    $('#fixed-header-toggle').on('change', function () {
        if(this.checked) {
            adminObj.fixedHeader(true);
        } else {
            adminObj.fixedHeader(false);
        }
    });
    //$('#fixed-left-sidebar').on('change', function () {
    //    if(this.checked) {
    //        adminObj.fixedSidebar('left');
    //    } else {
    //        adminObj.removeFixedSidebar('left');
    //    }
    //});
    //$('#fixed-right-sidebar').on('change', function () {
    //    if(this.checked) {
    //        adminObj.fixedSidebar('right');
    //    } else {
    //        adminObj.removeFixedSidebar('right');
    //    }
    //});
});
