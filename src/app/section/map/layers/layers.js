var wms_layers = [];


        var lyr_DarkMatter_0 = new ol.layer.Tile({
            'title': 'Dark Matter',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://cartodb.com/basemaps/">Map tiles by CartoDB, under CC BY 3.0. Data by OpenStreetMap, under ODbL.</a>',
                url: 'http://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png'
            })
        });
var format_Departamento_1 = new ol.format.GeoJSON();
var features_Departamento_1 = format_Departamento_1.readFeatures(json_Departamento_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Departamento_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Departamento_1.addFeatures(features_Departamento_1);
var lyr_Departamento_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Departamento_1, 
                style: style_Departamento_1,
                interactive: true,
    title: 'Departamento<br />\
    <img src="styles/legend/Departamento_1_0.png" /> Paraná<br />'
        });

lyr_DarkMatter_0.setVisible(true);lyr_Departamento_1.setVisible(true);
var layersList = [lyr_DarkMatter_0,lyr_Departamento_1];
lyr_Departamento_1.set('fieldAliases', {'gid': 'gid', 'Nombre dep': 'Nombre dep', 'Confirmado': 'Confirmado', 'Activos': 'Activos', 'Altas': 'Altas', 'Fallecidos': 'Fallecidos', 'Casos Sept': 'Casos Sept', 'EjemploZOn': 'EjemploZOn', });
lyr_Departamento_1.set('fieldImages', {'gid': 'Range', 'Nombre dep': 'TextEdit', 'Confirmado': 'TextEdit', 'Activos': 'TextEdit', 'Altas': 'TextEdit', 'Fallecidos': 'TextEdit', 'Casos Sept': 'Range', 'EjemploZOn': 'TextEdit', });
lyr_Departamento_1.set('fieldLabels', {'gid': 'no label', 'Nombre dep': 'header label', 'Confirmado': 'no label', 'Activos': 'no label', 'Altas': 'no label', 'Fallecidos': 'no label', 'Casos Sept': 'header label', 'EjemploZOn': 'no label', });
lyr_Departamento_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});