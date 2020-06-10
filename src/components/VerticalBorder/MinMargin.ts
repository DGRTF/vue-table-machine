import { ControlMin, ControlObserverCoordinate } from './VerticalBorder';


export default class MinMargin implements ControlObserverCoordinate {
  constructor(minValue: ControlMin[] = null) {
    this.minValue = minValue;
  }

  private minValue: ControlMin[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.minValue !== null) {
      this.minValue.forEach((el) => {
        el.SetMinMargin(coordinatePercent);
      });
    }
  }

  AddMinMarginObserver(minValue: ControlMin) {
    this.minValue.push(minValue);
  }

  DeleteMinMarginObserver(minValue: ControlMin) {
    const index = this.minValue.indexOf(minValue);
    if (index > -1) {
      this.minValue.splice(index, 1);
    }
  }



  // for tests

  GetObserver(): ControlMin[] {
    return this.minValue.slice();
  }
  
}
