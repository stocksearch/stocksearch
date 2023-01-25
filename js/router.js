const stocks = {
    "stockOne": {
        stockName: "",
        stockSymbol: "",
        stockIsin: "", //*
        stockValor: "", //*
        stockPrice: "", // Red Green opening
        stockCurrency: "",
        stockDayBefore: "",
        stockOpening: "",
        stockDailyHigh: "", // Green
        stockDailyLow: "", // Red
        stockMarketCapital: "",
        stockKgv: "", //*
        stockKbv: "", //*
        stockKuv: "",
        stockPeg: "",
        stockReturnOnAssets: "", //*
        stockDividendReturn: "", //*
        stockRoe: "", //*
        stockDebtEquityRatio: "", //*
        stockEquityRatio: "", //*
        stockPriceCashFlowRatio: "", //*
        stockRoce: "", //*
        stockProfitGrowth: "",
        stockEbit: "",
        stockTurnoverPerCapita: "" //*
    }, "stockTwo": {
        stockName: "",
        stockSymbol: "",
        stockIsin: "",
        stockValor: "",
        stockPrice: "",
        stockCurrency: "",
        stockDayBefore: "",
        stockOpening: "",
        stockDailyHigh: "",
        stockDailyLow: "",
        stockMarketCapital: "",
        stockKgv: "",
        stockKbv: "",
        stockKuv: "",
        stockPeg: "",
        stockReturnOnAssets: "",
        stockDividendReturn: "",
        stockRoe: "",
        stockDebtEquityRatio: "",
        stockEquityRatio: "",
        stockPriceCashFlowRatio: "",
        stockRoce: "",
        stockProfitGrowth: "",
        stockEbit: "",
        stockTurnoverPerCapita: ""
    }
};

//Suchfunktion | Bruche die ih dere Klass wegem Fülle vom Array, alle Values mit * habe ich entweder nicht gefunden oder brauchen eine Kalkulation / anderer API-Fetch

var newSearch;

function GetInfo() {
    const key = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7f16cc786msh8628396e939fd01p1ee26ejsne59262b9610e',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };


    newSearch = document.getElementById("search").value;
    var option = document.getElementById("select1");
    var regionSearch = option.options[option.selectedIndex].value;

    console.log(newSearch);
    console.log(regionSearch);
    /*
        const url = 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=${regionSearch}&symbols=${newSearch}';
    */
    fetch('https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=' + regionSearch + '&symbols=' + newSearch, key)
        .then(response => response.json())
        .then(data => {

            stocks.stockOne.stockName = data.quoteResponse.result[0].longName;
            stocks.stockOne.stockSymbol = data.quoteResponse.result[0].symbol;
            stocks.stockOne.stockPrice = Number(data.quoteResponse.result[0].regularMarketPrice);
            stocks.stockOne.stockCurrency = data.quoteResponse.result[0].currency;
            stocks.stockOne.stockDayBefore = Number(data.quoteResponse.result[0].preMarketPrice);
            stocks.stockOne.stockOpening = Number(data.quoteResponse.result[0].regularMarketOpen);
            stocks.stockOne.stockDailyHigh = Number(data.quoteResponse.result[0].regularMarketDayHigh);
            stocks.stockOne.stockDailyLow = Number(data.quoteResponse.result[0].regularMarketDayLow);
            stocks.stockOne.stockMarketCapital = Number(data.quoteResponse.result[0].marketCap);
            stocks.stockOne.stockEbit = Number(data.quoteResponse.result[0].ebitda);


            var marketCap = data.quoteResponse.result[0].marketCap;
            var revenue = data.quoteResponse.result[0].revenue;
            var kuv = marketCap / revenue;

            stocks.stockOne.stockKuv = kuv;
            stocks.stockOne.stockPeg = Number(data.quoteResponse.result[0].pegRatio);

            var prof20 = Number(data.quoteResponse.result[0].quoteSummary.earnings.financialsChart.yearly[2].earnings);
            var prof21 = Number(data.quoteResponse.result[0].quoteSummary.earnings.financialsChart.yearly[3].earnings);

            var profgrow = ((prof21 - prof20) / prof20) * 100

            stocks.stockOne.stockProfitGrowth = profgrow + "%";

            navigationString = "Basic";
            locationHandler();
            console.log(data)
        })
        .catch((err) =>  {
            alert(newSearch + " is not available or non existent!")
            document.getElementById("search").innerHTML = "";
            
        })
}

// Suchfunktion für Compare | Weiss nicht genau, ob man diese mit der anderen Kombinieren kann
async function GetInfo2() {

    const key = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7f16cc786msh8628396e939fd01p1ee26ejsne59262b9610e',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };
    
    var option = document.getElementById("select1");
    var regionSearch = option.options[option.selectedIndex].value;

    fetch('https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=' + regionSearch + '&symbols=' + compareStock, key)
        .then(response => response.json())
        .then(data => {

            stocks.stockTwo.stockName = data.quoteResponse.result[0].longName;
            stocks.stockTwo.stockSymbol = data.quoteResponse.result[0].symbol;
            stocks.stockTwo.stockPrice = Number(data.quoteResponse.result[0].regularMarketPrice);
            stocks.stockTwo.stockCurrency = data.quoteResponse.result[0].currency;
            stocks.stockTwo.stockDayBefore = Number(data.quoteResponse.result[0].preMarketPrice);
            stocks.stockTwo.stockOpening = Number(data.quoteResponse.result[0].regularMarketOpen);
            stocks.stockTwo.stockDailyHigh = Number(data.quoteResponse.result[0].regularMarketDayHigh);
            stocks.stockTwo.stockDailyLow = Number(data.quoteResponse.result[0].regularMarketDayLow);
            stocks.stockTwo.stockMarketCapital = Number(data.quoteResponse.result[0].marketCap);
            stocks.stockTwo.stockEbit = Number(data.quoteResponse.result[0].ebitda);


            var marketCap = data.quoteResponse.result[0].marketCap;
            var revenue = data.quoteResponse.result[0].revenue;
            var kuv = marketCap / revenue;

            stocks.stockTwo.stockKuv = kuv;
            stocks.stockTwo.stockPeg = Number(data.quoteResponse.result[0].pegRatio);

            var prof20 = Number(data.quoteResponse.result[0].quoteSummary.earnings.financialsChart.yearly[2].earnings);
            var prof21 = Number(data.quoteResponse.result[0].quoteSummary.earnings.financialsChart.yearly[3].earnings);

            var profgrow = ((prof21 - prof20) / prof20) * 100

            stocks.stockTwo.stockProfitGrowth = profgrow + "%";

            importCompareContent();

            console.log(data)
        })
        .catch(err => {
            alert(compareStock + " is not available or non existent!");
        })
}

const routes = {
    404: {
        template: "/stocksearch/pages/404.html",
        titel: "",
        description: ""
    }, "Home": {
        template: "/stocksearch/pages/index.html",
        titel: "",
        description: ""
    }, "Basic": {
        template: "/stocksearch/pages/basic.html",
        titel: "",
        description: ""
    }, "InDepth": {
        template: "/stocksearch/pages/indepth.html",
        titel: "",
        description: ""
    }, "Compare": {
        template: "/stocksearch/pages/compare.html",
        titel: "",
        description: ""
    }, "BasicCompare": {
        template: "/stocksearch/pages/basiccompare.html",
        titel: "",
        description: ""
    }, "InDepthCompare": {
        template: "/stocksearch/pages/indepthcompare.html",
        titel: "",
        description: ""
    }, "BasicChart": {
        template: "/stocksearch/pages/basicchart.html",
        titel: "",
        description: ""
    }
};

let navigationString = "Home";
let basicBtn = document.getElementById("basicBtn");
let inDepthBtn = document.getElementById("indepthBtn");
let compareBtn = document.getElementById("compareBtn");
let compareStock;
let isBasicViewSelected = 0;

document.getElementById("home").addEventListener("click", homeLblClicked);

function homeLblClicked(event) {
    navigationString = "Home";
    locationHandler();
}

function basicBtnClicked(event) {
    navigationString = "Basic";
    locationHandler();
}

function inDepthBtnClicked(event) {
    navigationString = "InDepth";
    locationHandler();
}

function compareBtnClicked(event) {
    compareStock = prompt("Which Stock would you like to compare to?");

    if (compareStock == "") {
        alert("Nothing was found.")
    } else if (compareStock == null) {
        // Do nothing
    } else {
        navigationString = "Compare";
        locationHandler();
    }
}

async function selectTimeIntervalClicked() {
    await getChartData();
}

async function selectTimeIntervalCompareClicked() {
    await getChartDataStockTwo();
}

const importBasicContent = async () => {
    const route = routes["Basic"] || routes[404]
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("import-basic").innerHTML = html;
};

const importChart = async () => {
    const route = routes["BasicChart"] || routes[404]
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("import-chart").innerHTML = html;
}

const importCompareContent = async () => {
    const routeStockOne = routes["Basic"] || routes[404]
    const htmlStockOne = await fetch(routeStockOne.template).then((response) => response.text());
    document.getElementById("import-basic-one").innerHTML = htmlStockOne;

    // Display data
    displayDataStockOneBasic();

    const routeStockTwo = routes["BasicCompare"] || routes[404]
    const htmlStockTwo = await fetch(routeStockTwo.template).then((response) => response.text());
    document.getElementById("import-basic-two").innerHTML = htmlStockTwo;

    // Display data
    displayDataStockTwoBasic();

    if (isBasicViewSelected == 1) {
        const routeStockOne = routes["InDepth"] || routes[404]
        const htmlStockOne = await fetch(routeStockOne.template).then((response) => response.text());
        document.getElementById("import-indepth-one").innerHTML = htmlStockOne;

        // Display data
        displayDataStockOneInDepth();

        const routeStockTwo = routes["InDepthCompare"] || routes[404]
        const htmlStockTwo = await fetch(routeStockTwo.template).then((response) => response.text());
        document.getElementById("import-indepth-two").innerHTML = htmlStockTwo;

        // Display data
        displayDataStockTwoInDepth();
    }

    // Visual adjustments
    basicBtn.disabled = false;
    inDepthBtn.disabled = false;
    compareBtn.disabled = true;
    mode();
}

const locationHandler = async () => {
    const route = routes[navigationString] || routes[404]
    const html = await fetch(route.template).then((response) => response.text());
    document.getElementById("content-div").innerHTML = html;

    switch (navigationString) {
        case "Home":
            // Visual adjustments
            basicBtn.disabled = true;
            inDepthBtn.disabled = true;
            compareBtn.disabled = true;
            homeStocks();
            mode();
            break;

        case "Basic":
            //Load Chart
            await importChart();

            // Display data
            displayDataStockOneBasic();
            await getChartData();

            // Set mode for comparison
            isBasicViewSelected = 0;

            // Visual adjustments
            basicBtn.disabled = true;
            inDepthBtn.disabled = false;
            compareBtn.disabled = false;
            mode();
            break;

        case "InDepth":
            // Load basic content into indepth
            await importBasicContent();
            await importChart();

            // Display data
            displayDataStockOneBasic();
            displayDataStockOneInDepth();
            await getChartData();

            // Set mode for comparison
            isBasicViewSelected = 1;

            // Visual adjustments
            basicBtn.disabled = false;
            inDepthBtn.disabled = true;
            compareBtn.disabled = false;
            mode();
            break;

        case "Compare":
            // Load compare content into comapre
            await GetInfo2();

            // Display data
            await getChartDataStockTwo();
            break;
    }
};

function displayDataStockOneBasic() {
    document.getElementById("stock-name").innerHTML = stocks["stockOne"].stockName;
    document.getElementById("stock-symbol").innerHTML = stocks["stockOne"].stockSymbol;
    document.getElementById("stock-isin").innerHTML = stocks["stockOne"].stockIsin;
    document.getElementById("stock-valor").innerHTML = stocks["stockOne"].stockValor;
    document.getElementById("stock-price").innerHTML = stocks["stockOne"].stockPrice;
    document.getElementById("stock-currency").innerHTML = stocks["stockOne"].stockCurrency;
    document.getElementById("stock-day-before").innerHTML = stocks["stockOne"].stockDayBefore;
    document.getElementById("stock-opening").innerHTML = stocks["stockOne"].stockOpening;
    document.getElementById("stock-daily-high").innerHTML = stocks["stockOne"].stockDailyHigh;
    document.getElementById("stock-daily-low").innerHTML = stocks["stockOne"].stockDailyLow;
    document.getElementById("stock-market-capital").innerHTML = stocks["stockOne"].stockMarketCapital;
    document.getElementById("stock-daily-low").style.color = "Red";
    document.getElementById("stock-daily-high").style.color = "Green";

    if (stocks["stockOne"].stockPrice > stocks["stockOne"].stockOpening) {
        document.getElementById("stock-price").style.color = "Green";
    }

    if (stocks["stockOne"].stockPrice <= stocks["stockOne"].stockOpening) {
        document.getElementById("stock-price").style.color = "Red";
    }
}

function displayDataStockOneInDepth() {
    document.getElementById("stock-kgv").innerHTML = stocks["stockOne"].stockKgv;
    document.getElementById("stock-kbv").innerHTML = stocks["stockOne"].stockKbv;
    document.getElementById("stock-kuv").innerHTML = stocks["stockOne"].stockKuv;
    document.getElementById("stock-peg").innerHTML = stocks["stockOne"].stockPeg;
    document.getElementById("stock-return-on-assets").innerHTML = stocks["stockOne"].stockReturnOnAssets;
    document.getElementById("stock-dividend-return").innerHTML = stocks["stockOne"].stockDividendReturn;
    document.getElementById("stock-roe").innerHTML = stocks["stockOne"].stockRoe;
    document.getElementById("stock-debt-equity-ratio").innerHTML = stocks["stockOne"].stockDebtEquityRatio;
    document.getElementById("stock-equity-ratio").innerHTML = stocks["stockOne"].stockEquityRatio;
    document.getElementById("stock-price-cash-flow-ratio").innerHTML = stocks["stockOne"].stockPriceCashFlowRatio;
    document.getElementById("stock-roce").innerHTML = stocks["stockOne"].stockRoce;
    document.getElementById("stock-profit-growth").innerHTML = stocks["stockOne"].stockProfitGrowth;
    document.getElementById("stock-ebit").innerHTML = stocks["stockOne"].stockEbit;
    document.getElementById("stock-turnover-per-capita").innerHTML = stocks["stockOne"].stockTurnoverPerCapita;
}

function displayDataStockTwoBasic() {
    document.getElementById("stock-name-compare").innerHTML = stocks["stockTwo"].stockName;
    document.getElementById("stock-symbol-compare").innerHTML = stocks["stockTwo"].stockSymbol;
    document.getElementById("stock-isin-compare").innerHTML = stocks["stockTwo"].stockIsin;
    document.getElementById("stock-valor-compare").innerHTML = stocks["stockTwo"].stockValor;
    document.getElementById("stock-price-compare").innerHTML = stocks["stockTwo"].stockPrice;
    document.getElementById("stock-currency-compare").innerHTML = stocks["stockTwo"].stockCurrency;
    document.getElementById("stock-day-before-compare").innerHTML = stocks["stockTwo"].stockDayBefore;
    document.getElementById("stock-opening-compare").innerHTML = stocks["stockTwo"].stockOpening;
    document.getElementById("stock-daily-high-compare").innerHTML = stocks["stockTwo"].stockDailyHigh;
    document.getElementById("stock-daily-low-compare").innerHTML = stocks["stockTwo"].stockDailyLow;
    document.getElementById("stock-market-capital-compare").innerHTML = stocks["stockTwo"].stockMarketCapital;
    document.getElementById("stock-daily-low-compare").style.color = "Red";
    document.getElementById("stock-daily-high-compare").style.color = "Green";

    if (stocks["stockTwo"].stockPrice > stocks["stockTwo"].stockOpening) {
        document.getElementById("stock-price-compare").style.color = "Green";
    }

    if (stocks["stockTwo"].stockPrice <= stocks["stockTwo"].stockOpening) {
        document.getElementById("stock-price-compare").style.color = "Red";
    }

}

function displayDataStockTwoInDepth() {
    document.getElementById("stock-kgv-compare").innerHTML = stocks["stockTwo"].stockKgv;
    document.getElementById("stock-kbv-compare").innerHTML = stocks["stockTwo"].stockKbv;
    document.getElementById("stock-kuv-compare").innerHTML = stocks["stockTwo"].stockKuv;
    document.getElementById("stock-peg-compare").innerHTML = stocks["stockTwo"].stockPeg;
    document.getElementById("stock-return-on-assets-compare").innerHTML = stocks["stockTwo"].stockReturnOnAssets;
    document.getElementById("stock-dividend-return-compare").innerHTML = stocks["stockTwo"].stockDividendReturn;
    document.getElementById("stock-roe-compare").innerHTML = stocks["stockTwo"].stockRoe;
    document.getElementById("stock-debt-equity-ratio-compare").innerHTML = stocks["stockTwo"].stockDebtEquityRatio;
    document.getElementById("stock-equity-ratio-compare").innerHTML = stocks["stockTwo"].stockEquityRatio;
    document.getElementById("stock-price-cash-flow-ratio-compare").innerHTML = stocks["stockTwo"].stockPriceCashFlowRatio;
    document.getElementById("stock-roce-compare").innerHTML = stocks["stockTwo"].stockRoce;
    document.getElementById("stock-profit-growth-compare").innerHTML = stocks["stockTwo"].stockProfitGrowth;
    document.getElementById("stock-ebit-compare").innerHTML = stocks["stockTwo"].stockEbit;
    document.getElementById("stock-turnover-per-capita-compare").innerHTML = stocks["stockTwo"].stockTurnoverPerCapita;
}

// On load
locationHandler();
basicBtn.disabled = true;
inDepthBtn.disabled = true;
compareBtn.disabled = true;


// Chart
var xValues;
var yValues;
var yValuesStockTwo;

async function getChartData() {
    const options = {
    method: 'GET',
         headers: {
             'X-RapidAPI-Key': 'e7f16cc786msh8628396e939fd01p1ee26ejsne59262b9610e',
             'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
         }
    };

    var timeRange = document.getElementById("select-time-interval").value;var timeInterval;
    switch (timeRange) {
        case"1d":
            timeInterval = "1m";
            break;
        case"5d":
            timeInterval = "1m";
            break;
        case"1mo":
            timeInterval = "1d";
            break;
        case"3mo":
            timeInterval = "1d";
            break;
        case"6mo":
            timeInterval = "1d";
            break;
        case"1y":
            timeInterval = "1wk";
            break;
        case"2y":
            timeInterval = "1wk";
            break;
        case"5y":
            timeInterval = "1mo";
            break;
        case"10y":
            timeInterval = "1mo";
            break;
        case"ytd":
            timeInterval = "1d";
            break;
        case"max":
            timeInterval = "1mo";
            break;
    }

    fetch('https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=' + timeInterval + '&symbol=' + newSearch + '&range=' + timeRange + '&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            xValues = data.chart.result[0].timestamp;
            for (var i = 0; i < xValues.length; i++) {
                xValues[i] = new Date(xValues[i] * 1000);
                month = '' + (xValues[i].getMonth() + 1),
                    day = '' + xValues[i].getDate(),
                    year = xValues[i].getFullYear();

                if (month.length < 2)
                    month = '0' + month;
                if (day.length < 2)
                    day = '0' + day;
                xValues[i] = [year, month, day].join('-');
            }
            yValues = data.chart.result[0].indicators.quote[0].high;
            loadBasicChart();
            loadCompareChart();
        })
        .catch(err => console.error(err));

}

async function getChartDataStockTwo() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7f16cc786msh8628396e939fd01p1ee26ejsne59262b9610e',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };

    // Refresh the first stock
    getChartData();

    var timeRange = document.getElementById("select-time-interval").value;
    var timeInterval;
    switch (timeRange) {
        case"1d":
            timeInterval = "1m";
            break;
        case"5d":
            timeInterval = "1m";
            break;
        case"1mo":
            timeInterval = "1d";
            break;
        case"3mo":
            timeInterval = "1d";
            break;
        case"6mo":
            timeInterval = "1d";
            break;
        case"1y":
            timeInterval = "1wk";
            break;
        case"2y":
            timeInterval = "1wk";
            break;
        case"5y":
            timeInterval = "1mo";
            break;
        case"10y":
            timeInterval = "1mo";
            break;
        case"ytd":
            timeInterval = "1d";
            break;
        case"max":
            timeInterval = "1mo";
            break;
    }

    fetch('https://yh-finance.p.rapidapi.com/stock/v3/get-chart?interval=' + timeInterval + '&symbol=' + compareStock + '&range=' + timeRange + '&region=US&includePrePost=false&useYfid=true&includeAdjustedClose=true&events=capitalGain%2Cdiv%2Csplit', options)
        .then(response => response.json())
        .then(data => {
            yValuesStockTwo = data.chart.result[0].indicators.quote[0].high;
            console.log(data)
            loadCompareChart();
        })
        .catch(err => console.error(err));
}

var basicChart;
var compareChart;
function loadBasicChart() {
    // Should fix the multiple charts bug
    if (basicChart){
        basicChart.options = {
            type: "line",
            data: {
                labels: xValues,
                datasets: [{
                    data: yValues,
                    label: stocks["stockOne"].stockName,
                    borderColor: "blue",
                    fill: false
                }]
            },
            options: {
                legend: {display: true}
            }
        };
        basicChart.update();
    }
    basicChart = new Chart ("basicChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                label: stocks["stockOne"].stockName,
                borderColor: "blue",
                fill: false
            }]
        },
        options: {
            legend: {display: true}
        }
    });
}

function loadCompareChart() {
    compareChart = new Chart("compareChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                data: yValues,
                label: stocks["stockOne"].stockName,
                borderColor: "Blue",
                fill: false,
            }, {
                data: yValuesStockTwo,
                label: stocks["stockTwo"].stockName,
                borderColor: "lightblue",
                fill: false
            }]
        },
        options: {
            legend: {display: true}
        }
    });
}
