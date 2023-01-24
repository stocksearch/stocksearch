const optionEERs = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '1a1ee9c7a5mshe5288ea1e68b681p1b014bjsn95b9eb0690c8',
        'X-RapidAPI-Host': 'sunrise-sunset-times.p.rapidapi.com'
    }
};
var date = new Date();
var month = '' + (date.getMonth() + 1);
var day = '' + date.getDate();
var year = date.getFullYear();

if (month.length < 2)
    month = '0' + month;
if (day.length < 2)
    day = '0' + day;

const urlDate = [year, month, day].join('-');
var sunriseDate;
var sunsetDate;

fetch('https://sunrise-sunset-times.p.rapidapi.com/getSunriseAndSunset?date=' + urlDate + '&latitude=47.3786&longitude=8.54&timeZoneId=America%2FNew_York', optionEERs)
    .then(response => response.json())
    .then(response => {
        var sunriseApiCall = response.sunrise;
        var sunriseDateAsString = sunriseApiCall.replace("[America/New_York]", "");
        sunriseDate = new Date(sunriseDateAsString);

        var sunsetApiCall = response.sunset;
        var sunsetDateAsString = sunsetApiCall.replace("[America/New_York]", "");
        sunsetDate = new Date(sunsetDateAsString);

        console.log (sunriseDate);
        console.log(sunsetDate);

        mode();
    })
    .catch(err => console.error(err));
function mode(){
    var informationDiv = document.getElementsByClassName("information-div");
    var select = document.getElementsByTagName("select");
    var input = document.getElementsByTagName("input");
    var svg = document.getElementsByTagName("svg");

    if (new Date() > sunriseDate) {
        document.body.style.backgroundColor = "#ffffff";

        for (var i = 0; i < informationDiv.length; i++) {
            informationDiv[i].style.backgroundColor = "#ffffff";
            informationDiv[i].style.color = "#1e1e1e";
        }

        for (var i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = "#ffffff";
            select[i].style.color = "#1e1e1e";
        }

        for (var i = 0; i < input.length; i++) {
            input[i].style.backgroundColor = "#ffffff";
            input[i].style.color = "#1e1e1e";
        }

        for (var i = 0; i < svg.length; i++) {
            svg[i].style.color = "#ffffff";
        }
    }

    if (new Date() > sunsetDate || new Date() < sunriseDate) {
        document.body.style.backgroundColor = "#1e1e1e";

        for (var i = 0; i < informationDiv.length; i++) {
            informationDiv[i].style.backgroundColor = "#1e1e1e";
            informationDiv[i].style.color = "#ffffff";
        }

        for (var i = 0; i < select.length; i++) {
            select[i].style.backgroundColor = "#1e1e1e";
            select[i].style.color = "#ffffff";
        }

        for (var i = 0; i < input.length; i++) {
            input[i].style.backgroundColor = "#1e1e1e";
            input[i].style.color = "#ffffff";
        }

        for (var i = 0; i < svg.length; i++) {
            svg[i].style.color = "#1e1e1e";
        }
    }
}