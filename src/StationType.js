const kVALUES = {};

class StationType {
  constructor(code) {
    this.code = code;
    kVALUES[code] = this;
  }

  static create(code) {
    if (kVALUES[code]) {
      return kVALUES[code];
    }
    return StationType.ALL;
  }

}

StationType.ALL = new StationType('A');
StationType.MAINLINE = new StationType('M');
StationType.SUBURBAN = new StationType('S');
StationType.DART = new StationType('D');

export default StationType;
