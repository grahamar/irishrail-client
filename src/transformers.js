import map from 'lodash/map';
import head from 'lodash/head';

export const stations = (data) => {
  return map(data.objStation, station => ({
    id: station.StationId,
    code: station.StationCode,
    name: station.StationDesc,
    alias: station.StationAlias,
    latitude: station.StationLatitude,
    longitude: station.StationLongitude
  }));
};

export const suggestedStations = (data) => {
  return map(data.objStationFilter, suggestion => ({
    name: suggestion.StationDesc,
    code: suggestion.StationCode
  }));
};

export const station = (data) => {
  const trainsDueAtStation = data.objStationData;
  const initialDatum = head(trainsDueAtStation) || {};
  const stationData = {
    name: initialDatum.Stationfullname,
    code: initialDatum.Stationcode,
    serverTime: initialDatum.Servertime,
    queryTime: initialDatum.Querytime
  };

  const trainsDue = map(trainsDueAtStation, train => ({
    trainId: train.Traincode,
    trainDate: train.Traindate,
    origin: train.Origin,
    destination: train.Destination,
    originTime: train.Origintime,
    destinationTime: train.Destinationtime,
    status: train.Status,
    lastLocation: train.Lastlocation,
    dueInMins: train.Duein,
    lateMins: train.Late,
    expectedArrival: train.Exparrival,
    expectedDeparture: train.Expdepart,
    scheduledArrival: train.Scharrival,
    scheduledDeparture: train.Schdepart,
    direction: train.Direction,
    type: train.Traintype,
    locationType: train.Locationtype
  }));

  return { ...stationData, trainsDue };
};

export const trainPositions = (data) => {
  return map(data.objTrainPositions, train => ({
    id: train.TrainCode,
    date: train.TrainDate,
    status: train.TrainStatus,
    message: train.PublicMessage,
    direction: train.Direction,
    latitude: station.TrainLatitude,
    longitude: station.TrainLongitude
  }));
};

export const trainMovements = (data) => {
  return map(data.objTrainMovements, movement => ({
    id: movement.TrainCode,
    date: movement.TrainDate,
    locationCode: movement.LocationCode,
    locationName: movement.LocationFullName,
    locationOrder: movement.LocationOrder,
    locationType: movement.Locationtype,
    origin: movement.TrainOrigin,
    destination: movement.TrainDestination,
    scheduledArrival: movement.ScheduledArrival,
    scheduledDeparture: movement.ScheduledDeparture,
    expectedArrival: movement.ExpectedArrival,
    expectedDeparture: movement.ExpectedDeparture,
    actualArrival: movement.Arrival,
    actualDeparture: movement.Departure,
    autoArrival: movement.AutoArrival,
    autoDepart: movement.AutoDepart,
    stopType: movement.StopType
  }));
};
