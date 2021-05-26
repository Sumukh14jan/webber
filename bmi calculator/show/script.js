$("#SpeedCheck").click(function(){
				
				$("#dgear").addClass("Drive");
				 var spdvalue = $("#Give").val(); 
      			
				var initDegree=-120;
				var lastDegree=120;
				var rotateDeg;
				if(spdvalue <= 240){
					rotateDeg=initDegree+Math.round(spdvalue/2);
					
					}
				else if(spdvalue > 240 && spdvalue < 480 ){
					
					rotateDeg=Math.round(spdvalue/2)-lastDegree;
					
					}
					
					else{
						alert("Wrong Value")
						
						}
					$("#sui").css('-webkit-transform','rotate(-120deg)');
						
						
						
					$("#sui").css( { transition: "transform 3s",
                  	transform:  "rotate(" + rotateDeg + "deg)" } )
					$("#SUICIRCLE").css( { transition: "transform 3s",
                  	transform:  "rotate(" + rotateDeg + "deg)" } )

					setTimeout( function() { $("#sui").css( { transition: "none" } ) }, 3000 );
					setTimeout( function() { $("#SUICIRCLE").css( { transition: "none" } ) }, 3000 );
					
				
	/*Counter*/
	(function($) {
    $.fn.countTo = function(options) {
        // merge the default plugin settings with the custom options
        options = $.extend({}, $.fn.countTo.defaults, options || {});

        // how many times to update the value, and how much to increment the value on each update
        var loops = Math.ceil(options.speed / options.refreshInterval),
            increment = (options.to - options.from) / loops;

        return $(this).each(function() {
            var _this = this,
                loopCount = 0,
                value = options.from,
                interval = setInterval(updateTimer, options.refreshInterval);

            function updateTimer() {
                value += increment;
                loopCount++;
                $(_this).html(value.toFixed(options.decimals));

                if (typeof(options.onUpdate) == 'function') {
                    options.onUpdate.call(_this, value);
                }

                if (loopCount >= loops) {
                    clearInterval(interval);
                    value = options.to;

                    if (typeof(options.onComplete) == 'function') {
                        options.onComplete.call(_this, value);
                    }
                }
            }
        });
    };

    $.fn.countTo.defaults = {
        from: 0,  // the number the element should start at
        to: 100,  // the number the element should end at
        speed: 1000,  // how long it should take to count between the target numbers
        refreshInterval: 100,  // how often the element should be updated
        decimals: 0,  // the number of decimal places to show
        onUpdate: null,  // callback method for every time the element is updated,
        onComplete: null,  // callback method for when the element finishes updating
    };
})(jQuery);

jQuery(function($) {
        $('.speedplus').countTo({
            from: 0,
            to: spdvalue/10,
            speed: 150,
            refreshInterval: 1,
            onComplete: function(value) {
                console.debug(this);
            }
        });
    });
	/*Counter End*/			
				
				
});