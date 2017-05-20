(function($) {

    $.fn.printArea = function() {

        var ele = $(this);

        var printCss = '';

        $(document).find("link").filter(function() {

            return $(this).attr("rel").toLowerCase() == "stylesheet";

        }).each(

            function() {

                printCss = printCss + '<link type="text/css" rel="stylesheet" href="' + $(this).attr("href") + '" >';

            });





        var printContent = '<div class="' + $(ele).attr("class") + '">' + $(ele).html() + '</div>';

        var windowUrl = 'about:blank';

        var uniqueName = new Date();

        var windowName = 'Print' + uniqueName.getTime();





        var printWindow = window.open(windowUrl, windowName, 'left=50000,top=50000,width=0,height=0');

        var BodyHtml = '<body>';

        var BodyEnd = "</body>";

        printWindow.document.write(printCss + BodyHtml + printContent + BodyEnd);

        printWindow.document.close();

        printWindow.focus();

        printWindow.print();

        printWindow.close();

    }

})(jQuery);