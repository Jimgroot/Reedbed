
//Metadata
//Jim Groot 2018
//This script collects temporal signatures of reedbeds across Europe
//
//
//
//Last revision 19-2-2018


// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');



// merge all areas together
var Reed = Reed_Danube.merge(Reed_Balaton).merge(Reed_Camarque).merge(Reed_Oostvaarders).merge(Reed_Tablas).merge(Reed_Iseo)
var Reeds = Reed.geometry();
// Filter by metadata properties.
var vvvh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  //.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  //.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('resolution_meters', 10))
  .filter(ee.Filter.bounds(Reed));
  
var clip = function(image) {
  return image.clip(Reed);
};

var vvvh = vvvh.map(clip);  
  
var S1 = vvvh.select('VH','VV');



print(S1)
var S1yvv= S1.select('VV').filterDate('2016-01-01', '2016-12-31');
var S1yvh= S1.select('VH').filterDate('2016-01-01', '2016-12-31');


/*
//print(phragmites)
print(ui.Chart.image.seriesByRegion(S1yvv, Reed_Danube,ee.Reducer.mean()).setChartType('ScatterChart')
        .setOptions({title: 'Danube',
          vAxis: {title: 'Intensity VV'},lineWidth: 1,pointSize: 3}));
print(ui.Chart.image.seriesByRegion(S1yvv, Reed_Balaton,ee.Reducer.mean(),''));
print(ui.Chart.image.seriesByRegion(S1yvv, Reed_Camarque,ee.Reducer.mean(),''));
print(ui.Chart.image.seriesByRegion(S1yvv, Reed_Oostvaarders,ee.Reducer.mean(),''));
print(ui.Chart.image.seriesByRegion(S1yvv, Reed_Tablas,ee.Reducer.mean(),''));
print(ui.Chart.image.seriesByRegion(S1yvv, Reed,ee.Reducer.mean()).setChartType('ScatterChart')
        .setOptions({title: 'Danube',
          vAxis: {title: 'Intensity VV'},pointSize: 3}));


*/
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Balaton, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Balaton', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Danube, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Danube', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Camarque, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Camarque', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Oostvaarders, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Oostvaarders', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Tablas, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Tablas', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));
print(ui.Chart.image.doySeriesByYear(S1yvv,'VV',Reed_Iseo, ee.Reducer.mean(),100).setChartType('ScatterChart')
        .setOptions({title: 'Iseo', series: {0:{color: 'black'}},
          hAxis: {title: 'Day of Year'}, vAxis: {title: 'Backscatter Coefficient', ticks: [-25,-20,-15,-10,-5,0]}}));


