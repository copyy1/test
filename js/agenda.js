class Agenda {

    constructor(url){
        this.url = url;
        this.bottonAction();
    }

    bottonAction(){
        $(document).ready(function(){
            $("button").click(() => agenda.callApi())
        })
    }

    callApi(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(data){
                var races = data.MRData.RaceTable.Races;
                var main = $("<main>").appendTo("body");
                $.each(races, function(i, dato){
                    var article = $("<article></article>");

                    var raceName = $(`<h3> ${dato.raceName} </h3>`);
                    var circuitName = $(`<p> ${dato.Circuit.circuitName} </p>`);
                    var coordinates = $(`<p>  ${dato.Circuit.Location.lat},
                                      ${dato.Circuit.Location.long}</p>`);
                    var date = $(`<p> ${dato.date} </p>`);
                    var hour = $(`<p> ${dato.time} </p>`);
                    
                    article.append(raceName);
                    article.append(circuitName);
                    article.append(coordinates);
                    article.append(date);
                    article.append(hour);

                    main.append(article);
                  
                });
            },
            error: function(){
                console.log("Ha ocurrido un error obtiendo los datos");
            }
        })
    }
}