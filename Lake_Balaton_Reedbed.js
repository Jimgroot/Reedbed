
//Metadata
//Jim Groot 2018
//This Script is purposed on the automatic classification of reedbed vegetation within the Lake Balaton area, Hungary.
//
//
//
//
//Last revision 19-2-2018


// Load the Sentinel-1 ImageCollection.
var sentinel1 = ee.ImageCollection('COPERNICUS/S1_GRD');

// Load the polygons containing Phragmites precence
// This data is externally processed, Zlinszky et al. 2010 provided field data including phragmites presence data aquired around
// Lake Balaton. This data was converted to polygon data so it can be used within the GEE environment.
var phragmites = ee.FeatureCollection('users/dudejimmy/Phrag_Balaton');
var phragmites2 = ee.FeatureCollection('users/dudejimmy/balaton_tisza_ferto_reed_wgs');
var trainingareas = phragmites.merge(phragmites2).merge(Reedbeds).merge(Not_Reed).merge(Validation_Reed);
var allareas = trainingareas.merge(Mapping_Area)

// Filter by metadata properties.
var vvvh = sentinel1
  // Filter to get images with VV and VH dual polarization.
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VH'))
  //.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
  .filter(ee.Filter.eq('instrumentMode', 'IW'))
  .filter(ee.Filter.eq('resolution_meters', 10))
  .filter(ee.Filter.bounds(allareas));
  
var clip = function(image) {
  return image.clip(allareas);
};

var vvvh = vvvh.map(clip);  
  
var S1 = vvvh.select('VH','VV');


// Filter for poliarisation
var S1yvv= S1.select('VV').filterDate('2016-01-01', '2016-12-31');
var S1yvh= S1.select('VH').filterDate('2016-01-01', '2016-12-31');

// Create timeseries for each month in the year
var S1_1a =  S1.filterDate('2016-01-01', '2016-01-15').median();
var S1_1b =  S1.filterDate('2016-01-16', '2016-02-01').median();
var S1_2a =  S1.filterDate('2016-02-01', '2016-02-15').median();
var S1_2b =  S1.filterDate('2016-02-16', '2016-03-01').median();
var S1_3a =  S1.filterDate('2016-03-01', '2016-03-15').median();
var S1_3b =  S1.filterDate('2016-03-16', '2016-04-01').median();
var S1_4a =  S1.filterDate('2016-04-01', '2016-04-15').median();
var S1_4b =  S1.filterDate('2016-04-16', '2016-05-01').median();
var S1_5a =  S1.filterDate('2016-05-01', '2016-05-15').median();
var S1_5b =  S1.filterDate('2016-05-16', '2016-06-01').median();
var S1_6a =  S1.filterDate('2016-06-01', '2016-07-15').median();
var S1_6b =  S1.filterDate('2016-06-16', '2016-07-01').median();
var S1_7a =  S1.filterDate('2016-07-01', '2016-07-15').median();
var S1_7b =  S1.filterDate('2016-07-16', '2016-08-01').median();
var S1_8a =  S1.filterDate('2016-08-01', '2016-08-15').median();
var S1_8b =  S1.filterDate('2016-08-15', '2016-09-01').median();
var S1_9a =  S1.filterDate('2016-09-01', '2016-09-15').median();
var S1_9b =  S1.filterDate('2016-09-16', '2016-10-01').median();
var S1_10a =  S1.filterDate('2016-10-01', '2016-10-15').median();
var S1_10b =  S1.filterDate('2016-10-16', '2016-11-01').median();
var S1_11a =  S1.filterDate('2016-11-01', '2016-11-15').median();
var S1_11b =  S1.filterDate('2016-11-16', '2016-12-01').median();
var S1_12a =  S1.filterDate('2016-12-01', '2016-12-15').median();
var S1_12b =  S1.filterDate('2016-12-15', '2017-01-01').median();


//Create timeseries for whole year 2015
var S1y = ee.ImageCollection.fromImages(
  [S1_1a,S1_1b,S1_2a,S1_2b,S1_3a,S1_3b,S1_4a,S1_4b,S1_5a,S1_5b,S1_6a,S1_6b,S1_7a,S1_7b,S1_8a,S1_8b,S1_9a,S1_9b,S1_10a,S1_10b,S1_11a,S1_11b,S1_12a,S1_12b]);


// Create timeseries for each quarter year
var S1q1 =  ee.ImageCollection.fromImages(
  [S1_1a,S1_1b,S1_2a,S1_2b,S1_3a,S1_3b]);
var S1q2 =  ee.ImageCollection.fromImages(
  [S1_4a,S1_4b,S1_5a,S1_5b,S1_6a,S1_6b]);
var S1q3 =  ee.ImageCollection.fromImages(
  [S1_7a,S1_7b,S1_8a,S1_8b,S1_9a,S1_9b]);
var S1q4 =  ee.ImageCollection.fromImages(
  [S1_10a,S1_10b,S1_11a,S1_11b,S1_12a,S1_12b]);

var S1yMe = S1y.mean();
var S1q1Me = S1q1.mean();
var S1q2Me = S1q2.mean();
var S1q3Me = S1q3.mean();
var S1q4Me = S1q4.mean();
var S1yMax = S1y.reduce(ee.Reducer.max());
var S1q1Max = S1q1.reduce(ee.Reducer.max());
var S1q2Max = S1q2.reduce(ee.Reducer.max());
var S1q3Max = S1q3.reduce(ee.Reducer.max());
var S1q4Max = S1q4.reduce(ee.Reducer.max());
var S1yMin = S1y.reduce(ee.Reducer.min());
var S1q1Min = S1q1.reduce(ee.Reducer.min());
var S1q2Min = S1q2.reduce(ee.Reducer.min());
var S1q3Min = S1q3.reduce(ee.Reducer.min());
var S1q4Min = S1q4.reduce(ee.Reducer.min());
var S1yVar = S1y.reduce(ee.Reducer.variance());
var S1q1Var = S1q1.reduce(ee.Reducer.variance());
var S1q2Var = S1q2.reduce(ee.Reducer.variance());
var S1q3Var = S1q3.reduce(ee.Reducer.variance());
var S1q4Var = S1q4.reduce(ee.Reducer.variance());
var S1yStd = S1y.reduce(ee.Reducer.stdDev());
var S1q1Std = S1q1.reduce(ee.Reducer.stdDev());
var S1q2Std = S1q2.reduce(ee.Reducer.stdDev());
var S1q3Std = S1q3.reduce(ee.Reducer.stdDev());
var S1q4Std = S1q4.reduce(ee.Reducer.stdDev());


var compall = ee.Image.cat([S1_1a,S1_1b,S1_2a,S1_2b,S1_3a,S1_3b,S1_4a,S1_4b,S1_5a,S1_5b,S1_6a,S1_6b,S1_7a,S1_7b,S1_8a,S1_8b,S1_9a,S1_9b,S1_10a,S1_10b,S1_11a,S1_11b,S1_12a,S1_12b,S1yMe,S1q1Me,S1q2Me,S1q3Me,S1q4Me,S1yMax,S1q1Max,S1q2Max,S1q3Max,S1q4Max,S1yMin,S1q1Min,S1q2Min,S1q3Min,S1q4Min,S1yVar,S1q1Var,S1q2Var,S1q3Var,S1q4Var,S1yStd,S1q1Std,S1q2Std,S1q3Std,S1q4Std])


var compall = compall.reproject({
  crs: compall.projection().crs(),
  scale: 10
})

var mappingmap = compall.clip(Mapping_Area);
var trainingmap = compall.clip(trainingareas);


var phragmites = phragmites.merge(Reedbeds);
// create random points within polygons for training and validation
var trainpoints = ee.FeatureCollection.randomPoints(phragmites,10000,0);
var valpoints = ee.FeatureCollection.randomPoints(Validation_Reed,500,1);
// create random points at polygons without reed
var trainpoints2 = ee.FeatureCollection.randomPoints(Not_Reed,10000,0);
var valpoints2 = ee.FeatureCollection.randomPoints(Not_Reed,1000,1);


// This function adds presence as a property.
var addpresence = function(feature) {
  return feature.set({presence: 1 });
};

var addabsence = function(feature) {
  return feature.set({presence: 0 });
};
// Map the area getting function over the FeatureCollection.
var prestrain = trainpoints.map(addpresence);
var presval = valpoints.map(addpresence);
var abstrain = trainpoints2.map(addabsence);
var absval = valpoints2.map(addabsence);
// merge points

var traindata = prestrain.merge(abstrain);
var validata  = presval.merge(absval);


// Overlay the points on the imagery to get training.
var training = trainingmap.sampleRegions({
  collection: traindata,
  scale: 10
});

var classifier = ee.Classifier.randomForest(100)
    .train(training, 'presence');


var classified = trainingmap.classify(classifier);
var mapping = mappingmap.classify(classifier);

// Overlay the points on the imagery to get validation points
var validation = trainingmap.sampleRegions({
  collection: validata,
  scale: 10
});

var validated = validation.classify(classifier);

// Get a confusion matrix representing expected accuracy.
var testAccuracy = validated.errorMatrix('presence', 'classification');
print('Validation error matrix: ', testAccuracy);
print('Validation overall accuracy: ', testAccuracy.accuracy());


var trainAccuracy = classifier.confusionMatrix();
print('Resubstitution error matrix: ', trainAccuracy);
print('Training overall accuracy: ', trainAccuracy.accuracy());

Map.addLayer(mappingmap,{bands:['VV_3','VV_7','VV_14'],min:-25, max:-3},'Compilation');

var classMasked = mapping.updateMask(mapping.gte(0.1));
Map.addLayer(classMasked,{min:0, max:1,palette: 'cc0013'},'Classified');
//Map.addLayer(prestrain,{color: 'cc0013'})

//Map.addLayer(compall,{bands:['VV_stdDev'],min:-30, max:0},'Compilation');
//Map.addLayer(validata,{color: 'cc0013'},'valipoints')
//Map.addLayer(traindata,{color: '#00FF00'},'valipoints')
//Map.addLayer(summer.clip(Mapping_Area),{},'summer');

//print(phragmites)
//print(ui.Chart.image.seriesByRegion(S1yvv, POI,ee.Reducer.median()));
//print(ui.Chart.image.seriesByRegion(S1yvh, POI,ee.Reducer.median()));
//print(ui.Chart.image.seriesByRegion(S1yvv, Danube,ee.Reducer.mean()));
//print(ui.Chart.image.seriesByRegion(S1yvh, Danube,ee.Reducer.mean()));
//print(ui.Chart.image.seriesByRegion(S1yvv, POIFR,ee.Reducer.median()));
//print(ui.Chart.image.seriesByRegion(S1yvh, POIFR,ee.Reducer.median()));

