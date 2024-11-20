import xml.etree.ElementTree as ET

def coordenadas(archivoXML):
   
    try:
        arbol = ET.parse(archivoXML)
    except IOError:
        print ('No se encuentra el archivo ', archivoXML)
        exit()
    except ET.ParseError:
        print ('Error procesando el archivo ', archivoXML)
        exit()
      
    raiz = arbol.getroot()

    ns = "{http://www.uniovi.es}"

    header_svg = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"                    
    header_svg += "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"800\" height=\"400\">\n"
    
    footer_svg = "</svg>\n"

    svg = header_svg
    text = ""
    num_punto = 50

    for tramo in raiz.findall('.//' + ns + 'tramo'):
        
        ##longitud = float(tramo.find(ns + 'coordenadas/' + ns + 'longitud').text)
        ##latitud = float(tramo.find(ns + 'coordenadas/' + ns + 'latitud').text)
        altitud = float(tramo.find(ns + 'coordenadas/' + ns + 'altitud').text)

        svg += f"\t<circle cx=\"{num_punto}\" cy=\"{400 - altitud}\" r=\"3\" fill=\"blue\" />\n"
        text += f"\t<text x=\"{num_punto}\" y=\"{400 - altitud - 10}\" font-size=\"10\" fill=\"black\">{altitud}</text>\n"

        num_punto += 50
        
    svg += text
    svg += footer_svg

    with open("altimetria.svg", "w") as archivo_salida:
        archivo_salida.write(svg)
    print("Archivo KML generado: altimetria.svg")

def main():
    archivoXML = "circuitoEsquema.xml"
    coordenadas(archivoXML)   


if __name__ == "__main__":
    main()