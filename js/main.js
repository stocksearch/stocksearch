function homeStocks(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'e7f16cc786msh8628396e939fd01p1ee26ejsne59262b9610e',
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };
fetch('https://yh-finance.p.rapidapi.com/market/v2/get-quotes?region=DE&symbols=ABB%2C%20UBS%2C%20CS', options)
    .then(response => response.json())
    .then(data =>{
        for (i = 0; i < 3; i++) {
            document.getElementById("name" + (i + 1)).innerHTML = data.quoteResponse.result[i].longName;
        }
        for (i = 0; i < 3; i++) {
            document.getElementById("price" + (i + 1)).innerHTML = Number(data.quoteResponse.result[i].regularMarketPrice);
        }
        for (i = 0; i < 3; i++) {
            document.getElementById("symbol" + (i + 1)).innerHTML = data.quoteResponse.result[i].symbol;
        }



        console.log(data)
    })
    .catch(err => console.error(err));
}
homeStocks();
