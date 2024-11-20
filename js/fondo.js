class Fondo { 
    constructor(countryName, capitalName, circuitName){
        this.countryName = countryName;
        this.capitalName = capitalName;
        this.circuitName = circuitName;
    }

    callApi(){
        var api = 'https://api.flickr.com/services/rest/';
        $.getJSON(api, {
            method : 'flickr.photos.search',
            api_key: '33da378ee706453e7ebc574bba800e78',
            format: 'json',
            nojsoncallback: 1,
            text: "circuito-qatar",
            per_page: 1
        })
        .done(function(data){
            console.log(data);
            $.each(data.photos.photo, function(i, photo){
                var url = "https://live.staticflickr.com/" 
                                   + `${photo.server}/${photo.id}_${photo.secret}_b.jpg`;

                $('body').css({
                    'background-image': `url(${url})`,
                    'background-size': 'cover', 
                    'background-repeat': 'no-repeat'
                })
            })
        })
    }
}