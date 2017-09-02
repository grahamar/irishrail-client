import { parseString } from 'xml2js';
import request from 'request-promise';

import StationType from './StationType';

const API_URL = 'https://api.irishrail.ie/realtime/realtime.asmx/';
const OPS = {
  allStations: `${API_URL}getAllStationsXML`,
  allStationsOfType: `${API_URL}getAllStationsXML_WithStationType`,
  allStationsContaining: `${API_URL}getStationsFilterXML`,
  currentTrains: `${API_URL}getCurrentTrainsXML`,
  currentTrainsOfType: `${API_URL}getCurrentTrainsXML_WithTrainType`,
  stationByName: `${API_URL}getStationDataByNameXML`,
  stationByCode: `${API_URL}getStationDataByCodeXML`,
  stationByCodeWithMins: `${API_URL}getStationDataByCodeXML_WithNumMins`,
  trainMovements: `${API_URL}getTrainMovementsXML`
};

const defaultOpts = { transform: parseString };

export default class IrishRailClient {

  listStations = ({ type }) => {
    let uri = OPS.allStations, qs = {};

    if (type) {
      uri = OPS.allStationsOfType;
      qs.StationType = (type && type instanceof StationType) ? type.code : type;
    }

    return this._callIrishRail({ uri, qs });
  }

  filterStations = ({ contains }) => {
    const uri = OPS.allStationsContaining;
    const qs = { StationText: contains };

    return this._callIrishRail({ uri, qs });
  }

  station = ({ code, name, numMins }) => {
    let uri = OPS.stationByName;
    const qs = {};

    if (name) qs.StationDesc = name;
    if (numMins) qs.NumMins = numMins;
    if (code) {
      uri = numMins ? OPS.stationByCodeWithMins : OPS.stationByCode;
      qs.StationCode = code;
    }

    return this._callIrishRail({ uri, qs });
  }

  currentTrains = ({ type }) => {
    let uri = OPS.currentTrains, qs = {};

    if (type) {
      uri = OPS.currentTrainsOfType;
      qs.TrainType = (type && type instanceof StationType) ? type.code : type;
    }

    return this._callIrishRail({ uri, qs });
  }

  trainMovements = ({ trainId, trainDate }) => {
    const uri = OPS.trainMovements;
    const qs = {};

    if (trainId) qs.TrainId = trainId;
    if (trainDate) qs.TrainDate = trainDate;

    return this._callIrishRail({ uri, qs });
  }

  _callIrishRail = ({ uri, qs }) => request({ uri, qs, ...defaultOpts })

}
