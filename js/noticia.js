class Noticias {

    constructor(){ //va haber que hacer el append
        if (window.File && window.FileReader && window.FileList && window.Blob) 
        {  
            document.write("<p>Este navegador soporta el API File </p>");
        } else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
    }

    readInputFile(files){ 
        var file = files[0];
        var tipoTexto = /text.*/;
        if (file.type.match(typeText)) {
            var reader = new FileReader();
            reader.onload = function (event) {
                processFile(reader.result);
            }      
            reader.readAsText(file);
        }
        else { //VA ASI??
          errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }       
    }
    
    processFile(result){
        var lines = result.split('\n');

        var main = $("main").appendTo("body"); //con el append?

        for (var li in lines){
            var content = li.split('_');

            var title = content[0];
            var info = content[1];
            var author = content[2];

            var article = $("<article></article>");
            article.append($(`<h3>${title}</h3>`));
            article.append($(`<p>${info}</p>`));
            article.append($(`<p>${author}</p>`));

            main.append(article);
        }
    }
}