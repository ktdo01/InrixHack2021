//Call function to start program
parameterInitialization();
 
function parameterInitialization(){
   
   var mcdoLat = [37.78961028644882, 37.789338969608245, 37.79413773926822];
   var mcdoLong = [-122.40751839663474, -122.40138150281895, -122.39921427786177];

   var temp;
   var pointValue;

   var lat, long;

   for(let i = 0; i < 3; i++){
       
       lat = mcdoLat[i];
       long = mcdoLong[i];
       temp = getPolygon(lat, long);

       //pointValue must store string formatted as follows
       //"north|long, lat|west, south|long, lat|east, north|long"
       pointValue = temp[0] + "|" + long + ", " + lat + "|" + temp[1] + ", " + temp[2] + "|" + long + ", " + lat + "|" + temp[3] + ", " + temp[4] + "|" + long;

       console.log(i, pointValue)

       //startValue must provide ">="+year+"-"+month+"-"+day+"T"+hour+":"+min
       //for both, if hour is less than 10, must add 0
       //endValue must provide "<="+year+"-"+month+"-"+day+"T"+(hour+1)+":"+min
       //average previous 3 months (call 12x)
       //everything from T onwards, Kim will take care of in getTrips()

       //START REGULATING TIME***************************************************************************************************************************************
       
       /*var date = new Date();
       var day = date.getDate();              //to jump by days of the week, -7 with each day iter, if less than 0, reset to 30 or 31
       var month = date.getMonth();
       var hour = date.getHours();
       var min = date.getMinutes();*/
       
       var year = 2020;

       var day = 12;
       var month = 10;

       var dayString, monthString;
       var date;
       
       for(let x = 0; x < 12; x++){
                   
           //Adjust data for new start point
           
           day = day - 7;
           if(day <= 0){
               month = month - 1;

               if(month <= 0){
                   month = 12 + month;
                   year = year - 1;
               }
               
               //April, June, September, November have 30 days
               if(month == 4 || month == 6 || month == 9 || month == 11){
                   day = 30 + day;
               }

               //Februrary typically has 29 days
               else if(month == 2){
                   //if a leap year, only 28 days
                   if(year % 4 == 0)
                       day = 28 + day;
                   else
                       day = 29 + day;
               }

               //All other months have 31 days
               else{
                   day = 31 + day;
               }
           }

           //***if hour is outside of operating hours, need to do something to say that they are closed,,, deal with later
           
           /* 
           
           MEGAN BEING SILLY; IGNORE
           //Adjust data for hour before
           hour = hour - 1;
           if(i == 0 && hour < 6){
               hour = 6;
               endHour = 7;
           }
           else if(i == 1 && hour < 5){
               hour = 5;
               endHour = 6;
           }
           else if(i == 3 && hour < 7){
               hour = 7;
               endHour = 8;
           }

           */

           //Adjust day for formatting requirements
           if(day < 10){
               dayString = "0"+day;
           }
           else{
               dayString = day;
           }

           //Adjust month for formatting requirements
           if(month < 10){
               monthString = "0"+month;
           }
           else{
               monthString = month;
           }

           //Use start and end points to call API
           date = year+"-"+monthString+"-"+dayString;

           //Call API finally***********************************************************************************************************************************
           //Eventual call below
           //getTrips(pointValue, date);
           //Testing call here
           getTrips(date);
       }
   }

   /*call trips with 

   {
       String od:            "destination"
       String geoFilterType: "polygon"  
       String points:        pointValue
       String startDateTime: startValue
       String endDateTime:   endValue
   }

   */
}

//TESTING********************************************************************************************************************************
function getPolygon(lat, long) {

   var shiftNorth;
   var shiftSouth;
   var shiftEast;
   var shiftWest;

   shiftNorth = ((lat * 364000)+150)/364000;

   shiftWest = ((long * 288200)-150)/288200;

   shiftSouth = ((lat * 364000)-150)/364000;

   shiftEast = ((long * 288200)-150)/288200;

   shiftNorth = ((lat * 364000)+150)/364000;

   
   return [shiftNorth, shiftWest, shiftSouth, shiftEast, shiftNorth];   // The function returns the product of p1 and p2
}

function getTrips(date){}