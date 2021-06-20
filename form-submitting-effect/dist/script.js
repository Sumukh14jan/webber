$(document).ready(function(){
        $("#button").on("click", function(){
            $(".container").addClass("animate-cont");
            $(".progress-bar").addClass("active");
            setTimeout(function(){
                $(".container").removeClass("animate-cont");
                $(".success-msg").addClass("active");
                $(".progress-bar").addClass("green");
            }, 1400);
        });
        
        $("#success-btn").on("click", function(){
            $(".success-msg span").addClass("active");
            $(".progress-bar").addClass("disapear");
            setTimeout(function(){
                $(".progress-bar").removeClass("active");
            }, 400);
            setTimeout(function(){
                $(".progress-bar").removeClass("green disapear");
                $(".success-msg").removeClass("active");
                $(".success-msg span").removeClass("active");
            }, 800);
        });
    });