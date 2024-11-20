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

    header_kml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + "\n"                    
    header_kml += "<kml xmlns=\"http://www.opengis.net/kml/2.2\">" + "\n"
    header_kml += "<Document>\n"

    footer_kml = "</Document>\n</kml>"

    kml = ""
    kml += header_kml
    for tramo in raiz.findall('.//' + ns + 'tramo'):
        
        longitud = tramo.find(ns + 'coordenadas/' + ns + 'longitud').text
        latitud = tramo.find(ns + 'coordenadas/' + ns + 'latitud').text
        altitud = tramo.find(ns + 'coordenadas/' + ns + 'altitud').text

        kml += crearMarcador(longitud, latitud, altitud)

    kml += footer_kml

    with open("circuito.kml", "w") as archivo_salida:
        archivo_salida.write(kml)
    print("Archivo KML generado: circuito.kml")


def crearMarcador(longitud, latitud, altitud):
    kml = ""
    kml += "\t\t<Placemark>\n"
    kml += "\t\t\t<Point>\n"
    kml += f"\t\t\t\t<coordinates>{longitud},{latitud},{altitud}</coordinates>\n"
    kml += "\t\t\t</Point>\n"
    kml += "\t\t</Placemark>\n"
    return kml

def main():
    archivoXML = "circuitoEsquema.xml"
    coordenadas(archivoXML)   


if __name__ == "__main__":
    main()