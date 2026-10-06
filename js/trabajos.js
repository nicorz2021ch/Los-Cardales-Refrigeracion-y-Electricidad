/*
 * TRABAJOS REALIZADOS
 * -------------------
 * Para agregar un trabajo nuevo:
 *   1. Copiá la foto (jpg, png o webp) dentro de  img/trabajos/
 *   2. Copiá un bloque de la lista TRABAJOS de abajo, pegalo al final
 *      (antes del corchete de cierre) y cambiá los datos.
 *
 * categoria:  "aire"  o  "electricidad"
 * lugar y detalle son opcionales (podés borrar esas líneas).
 * ancho y alto (en píxeles) son opcionales: ayudan a que la página reserve
 * el espacio de la foto antes de que cargue. Si no las ponés, funciona igual.
 */

window.CATEGORIAS = [
  { value: "aire", label: "Aire acondicionado" },
  { value: "electricidad", label: "Electricidad" }
];

window.TRABAJOS = [
  { archivo: "01-lg-inverter-terraza.jpg", categoria: "aire", titulo: "Equipo LG Dual Inverter en terraza", ancho: 864, alto: 1152 },
  { archivo: "02-lg-iv-gran-porte.jpg", categoria: "aire", titulo: "Unidad exterior LG de gran porte", ancho: 1020, alto: 768 },
  { archivo: "04-dos-splits-philco.jpg", categoria: "aire", titulo: "Instalación de dos equipos Philco", ancho: 960, alto: 720 },
  { archivo: "05-lg-piso-techo-local.jpg", categoria: "aire", titulo: "Equipo LG piso-techo en local comercial", ancho: 960, alto: 723 },
  { archivo: "06-equipo-exterior-ladrillo.jpg", categoria: "aire", titulo: "Unidad exterior sobre soportes en pared de ladrillo", ancho: 1542, alto: 2048 },
  { archivo: "07-rca-manometros.jpg", categoria: "aire", titulo: "Equipo RCA con manómetros conectados", ancho: 722, alto: 960 },
  { archivo: "08-alaska-exterior-pared.jpg", categoria: "aire", titulo: "Unidad exterior Alaska en pared", ancho: 1024, alto: 919 },
  { archivo: "09-split-interior-toma.jpg", categoria: "aire", titulo: "Split interior y conexión eléctrica", ancho: 864, alto: 1152 },
  { archivo: "10-alaska-sobre-ventanal.jpg", categoria: "aire", titulo: "Split Alaska instalado sobre ventanal", ancho: 768, alto: 1020 },
  { archivo: "11-alaska-techo-madera.jpg", categoria: "aire", titulo: "Split Alaska en ambiente con techo de madera", ancho: 1542, alto: 2048 },
  { archivo: "13-reparacion-terraza.jpg", categoria: "aire", titulo: "Reparación de unidad exterior en terraza", ancho: 723, alto: 960 },
  { archivo: "14-service-desarme-completo.jpg", categoria: "aire", titulo: "Service con desarme completo del equipo", ancho: 2048, alto: 1542 },
  { archivo: "15-banco-manometros-nitrogeno.jpg", categoria: "aire", titulo: "Trabajo en banco con manómetros y nitrógeno", ancho: 2048, alto: 1542 },
  { archivo: "16-tablero-contactores.jpg", categoria: "electricidad", titulo: "Tablero de comando con contactores y relés térmicos", ancho: 723, alto: 960 },
  { archivo: "17-tablero-temporizadores.jpg", categoria: "electricidad", titulo: "Tablero con temporizadores, térmicas y contactores", ancho: 768, alto: 1020 },
  { archivo: "18-revision-tablero-vivienda.jpg", categoria: "electricidad", titulo: "Revisión de tablero eléctrico en vivienda", ancho: 899, alto: 1599 }
  ,{ archivo: "19-tablero-electrico-vivienda.jpg", categoria: "electricidad", titulo: "Tablero eléctrico instalado en vivienda", ancho: 1024, alto: 1536 }
];
