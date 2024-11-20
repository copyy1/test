class Pais {

    constructor (countryName, capitalName, populationSize){
        this.countryName = countryName;
        this.capitalName = capitalName;
        this.populationSize = populationSize;
    }

    completeInfo(circuitName, governmentType, goalCoordinates, majorityReligion){
        this.circuitName = circuitName;
        this.governmentType = governmentType;
        this.goalCoordinates = goalCoordinates;
        this.majorityReligion = majorityReligion;
    }

    getCountryName(){ return this.countryName; }
    getCapitalName(){ return this.capitalName; } 
    getPopulationSize(){ return this.populationSize; } 
    getGovernmentType(){ return this.governmentType; } 
    getMajorityReligion(){ return this.majorityReligion; } 
   
    getSecondaryinfo(){
        var info = "<ul>\n";
        info += "\t<li> Nombre del Circuito: " + this.circuitName + "</li>\n";
        info += "\t<li> Población: " + this.populationSize + "</li>\n";
        info += "\t<li> Forma de gobierno: " + this.governmentType + "</li>\n";
        info += "\t<li> Religion mayoritaria: " + this.majorityReligion + "</li>\n";
        info += "</ul>";
        return info;            
    }

    writeGoalCoordinates(){
        document.write(`Coordenadas de la línea de meta: ${this.goalCoordinates}`);
    }

    callApi(){
        var coordinates = this.goalCoordinates.split(',');
        var lat = coordinates[1].split(' ')[1];
        var apiKey = '9fa6599ff99e97e05e4bddf949a0ec32';
        var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates[0]}&lon=${lat}&units=metric&lang=es&appid=${apiKey}`
        $.ajax({
            dataType: "json",
            url: url,
            method: 'GET',
            success: function(data){
                var main = $("<main>").appendTo("body");
                $.each(data.list, function(i, dato){
                    
                    var hourTime = dato.dt_txt.split(' ');
                    var hour = hourTime[1];

                    if(hour === "12:00:00") {
                        var article = $("<article></article>");

                        var date = hourTime[0];
                        var titleDate = $(`<h3>Fecha: ${date}</h3>`);
                        var titleHour = $(`<h3>Hora ${hour}</h3>`);

                        var icon = dato.weather[0].icon;
                        var iconDesc = dato.weather[0].description;
                        var iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;

                        var img = $(`<img src="${iconUrl}" alt="${iconDesc}"></img>`);
    
                        var tempMax = $(`<p>Temperatura máxima: ${dato.main.temp_max} ºC</p>`);
                        var tempMin = $(`<p>Temperatura mínima: ${dato.main.temp_min} ºC</p>`);
                        var humP = $(`<p>Humedad: ${dato.main.humidity} %</p>`);

                        article.append(titleDate);
                        article.append(titleHour);
                        article.append(img);
                        article.append(tempMax);
                        article.append(tempMin);
                        article.append(humP);

                        if(dato.hasOwnProperty('rain')){
                            var rainDay = $(`<p>Cantidad de lluvia hoy: ${dato.rain['3h']} mm</p>`);
                            article.append(rainDay);
                        }

                        main.append(article);
                    }               
                });
            },
            error: function(){
                console.log("Ha ocurrido un error obtiendo los datos");
            }
        })
    }
}