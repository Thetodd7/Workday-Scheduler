$(document).ready(function(){
   var ChangeUp =[];
   $('.saveBtn').on("click",function(){
       
     var value = $(this).siblings(".description").val();        
     var time = $(this).parent().attr("id");
     var dateAdded = moment().format("dddd, MMMM Do");
     
     ChangeUp.push ({description: value, time: time, date: dateAdded});

     localStorage.setItem("ChangeUp", JSON.stringify(ChangeUp));



    });


    function hourUpdater(){
     var presentHour = moment().hour();
      $(".time-block").each(function(){
        var denyHour = parseInt($(this).attr("id").split("-")[1]);
  
            
        if(presentHour > denyHour){
          $(this).addClass("past");
        }
            
        else if(presentHour === denyHour) {
         $(this).removeClass("past");
         $(this).addClass("present");
        }

        else {
          $(this).removeClass("past");
          $(this).removeClass("present");
          $(this).addClass("future");
        }
      });
    }

   hourUpdater();
  
   
      var timeRemaining = 15;
      function setTime() {
       setInterval(function() {
         timeRemaining--;
    
         if(timeRemaining === 0) {
          hourUpdater();
          timeRemaining = 15;
        }
    
      }, 1000);
    }
    setTime();


    var currentDay = moment().format("dddd, MMMM Do");
    for(var i = 0; i < ChangeUp.length; i++) {
      if(currentDay.isAfter(ChangeUp[i].date)) {
        ChangeUp[i].description = "";
        ChangeUp[i].time = "";
        ChangeUp[i].date = "";
        ChangeUp.length = 0;
      }
    }
  
    // saved data from localStorage
    var storedChangeUp = JSON.parse(localStorage.getItem("ChangeUp"));
  
    if (storedChangeUp !== null) {
      ChangeUp = storedChangeUp;
    
    }

  
    for(var i = 0; i < ChangeUp.length; i++) {
      var userDescription = ChangeUp[i].description;
      $("#" + ChangeUp[i].time).children(".description").text(userDescription);
    }


    $("#currentDay").text(moment().format("dddd, MMMM Do"));
});

