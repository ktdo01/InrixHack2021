//Call function to start program


var latlongreturn = latitudeLongitude();
var datereturn = dateWalkThru();

console.log(latlongreturn);
console.log(datereturn);

//Megan function
function latitudeLongitude(){
   
   var mcDonaldsLat = [37.78961028644882, 37.789338969608245, 37.79413773926822];
   var mcDonaldsLong = [-122.40751839663474, -122.40138150281895, -122.39921427786177];

   var pointValue = ["", "", ""];

   for(let i = 0; i < 3; i++){
       
       var lat = mcDonaldsLat[i];
       var long = mcDonaldsLong[i];
       var temp = getPolygon(lat, long);

       //pointValue must store string formatted as follows
       //"north|long, lat|west, south|long, lat|east, north|long"
       pointValue[i] = temp[0] + "|" + long + "," + lat + "|" + temp[1] + "," + temp[2] + "|" + long + "," + lat + "|" + temp[3] + "," + temp[4] + "|" + long;
    }

    //return array of preformatted strings to get cycled through in order to pass as parameters
   return pointValue;
}

//Megan function
function dateWalkThru(){

    //startValue must provide ">="+year+"-"+month+"-"+day+"T"+hour+":"+min
    //for both, if hour is less than 10, must add 0
    //endValue must provide "<="+year+"-"+month+"-"+day+"T"+(hour+1)+":"+min
    //average previous 3 months (call 12x)
    //everything from T onwards, Kim will take care of in getTrips()

    //START REGULATING TIME***************************************************************************************************************************************
    
    var date = new Date();
    var day = date.getDate();              //to jump by days of the week, -7 with each day iter, if less than 0, reset to 30 or 31
    var month = date.getMonth();
    var year = date.getYear();

    var dayString = "";
    var monthString = "";
    var date = ["", "", "", "", "", "", "", "", "", "", "", ""];
    
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
        date[x] = year+"-"+monthString+"-"+dayString;
    }

    //return array of preformatted date information, NOT including time data
    return date;
}

//Asad function
function getPolygon(lat, long) 
{

   var shiftNorth;
   var shiftSouth;
   var shiftEast;
   var shiftWest;

   shiftNorth = ((lat * 364000)+150)/364000;

   shiftWest = ((long * 288200)-150)/288200;

   shiftSouth = ((lat * 364000)-150)/364000;

   shiftEast = ((long * 288200)-150)/288200;

   shiftNorth = ((lat * 364000)+150)/364000;

   //Return cardinal direction borders in CCW direction
   return [shiftNorth, shiftWest, shiftSouth, shiftEast, shiftNorth];
}

 //UNDERSTANDING***************************************************************************************************************
   /*call trips with 

    String od:            "destination"
    String geoFilterType: "polygon"  
    String points:        pointValue
    String startDateTime: startValue
    String endDateTime:   endValue


   creating getTrips() to take parameter's produced here and provide them to the API
   */