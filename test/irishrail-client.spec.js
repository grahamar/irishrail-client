/* global describe, it, before */

import sinon from 'sinon';
import { IrishRailClient, StationType } from '../src';


let lib, stub;

describe('Given an instance of the IrishRailClient library', () => {
  before(() => {
    lib = new IrishRailClient();
    stub = sinon.stub(lib, '_callIrishRail').returns(new Promise((g, b) => { g(); }));
  });

  after(() => {
    stub.restore();
  });

  describe('when I need the list of stations', () => {
    it('should return the list of stations', () => {
      lib.listStations({});
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML",
        qs: {}
      });
    });
  });

  describe('when I need the list of stations for a type', () => {
    it('should return the list of stations', () => {
      lib.listStations({ type: StationType.DART });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getAllStationsXML_WithStationType",
        qs: { StationType: 'D' }
      });
    });
  });

  describe('when I need the current trains', () => {
    it('should return the list of current trains', () => {
      lib.currentTrains({});
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML",
        qs: {}
      });
    });
  });

  describe('when I need the current trains of a type ', () => {
    it('should return the list of current trains for a type', () => {
      lib.currentTrains({ type: 'M' });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML_WithTrainType",
        qs: { TrainType: 'M' }
      });
    });
  });

  describe('when I need a station', () => {
    it('should return the station for a name', () => {
      lib.station({ name: 'Bayside' });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML",
        qs: { StationDesc: "Bayside" }
      });
    });
  });

  describe('when I need a station', () => {
    it('should return the station for a name in the next x minutes', () => {
      lib.station({ name: 'Bayside', numMins: 20 });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByNameXML",
        qs: { StationDesc: "Bayside", NumMins: 20 }
      });
    });
  });

  describe('when I need a station', () => {
    it('should return the station for a code', () => {
      lib.station({ code: 'mhide' });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML",
        qs: { StationCode: "mhide" }
      });
    });
  });

  describe('when I need a station', () => {
    it('should return the station for a code in the next x minutes', () => {
      lib.station({ code: 'mhide', numMins: 20 });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getStationDataByCodeXML_WithNumMins",
        qs: { StationCode: "mhide", NumMins: 20 }
      });
    });
  });

  describe('when I need the list of filtered stations', () => {
    it('should return the list of filtered stations', () => {
      lib.filterStations({ contains: 'br' });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getStationsFilterXML",
        qs: { StationText: 'br' }
      });
    });
  });

  describe('when I need the list of train movements', () => {
    it('should return the list of train movements', () => {
      lib.trainMovements({ trainId: 'e109', trainDate: '21 dec 2011' });
      sinon.assert.calledWith(stub, {
        uri: "https://api.irishrail.ie/realtime/realtime.asmx/getTrainMovementsXML",
        qs: { TrainId: 'e109', TrainDate: '21 dec 2011' }
      });
    });
  });

});
