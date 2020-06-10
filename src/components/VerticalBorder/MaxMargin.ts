import { ControlObserverCoordinate, ControlMax } from './VerticalBorder';


export default class MaxMargin implements ControlObserverCoordinate {
  constructor(maxValue: ControlMax[] = null) {
    this.maxValue = maxValue;
  }

  private maxValue: ControlMax[];

  SetCoordinatePercent(coordinatePercent: number) {
    if (this.maxValue !== null) {
      this.maxValue.forEach((el) => {
        el.SetMaxMargin(coordinatePercent);
      });
    }
  }

  AddMaxMarginObserver(maxValue: ControlMax){
    this.maxValue.push(maxValue);
  }

  DeleteMaxMarginObserver(maxValue: ControlMax){
    const index = this.maxValue.indexOf(maxValue);
    if (index > -1) {
      this.maxValue.splice(index, 1);
    }
  }

  

  // for tests

  GetObserver(): ControlMax[] {
    return this.maxValue.slice();
  }

}