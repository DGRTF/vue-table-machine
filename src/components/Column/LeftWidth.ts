import { LeftWidth } from './Column';
import { ControlObserverCoordinate } from './../VerticalBorder/VerticalBorder'

export default class LeftWidthMove implements ControlObserverCoordinate {

  private observer: LeftWidth[] = [];

  AddObserver(observer: LeftWidth) {
    this.observer.push(observer);
  }

  DeleteObserver(observer: LeftWidth) {
    const index = this.observer.indexOf(observer);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  SetCoordinatePercent(coordinate: number) {
    this.observer.forEach(el => {
      el.ChangeWidthLeft(coordinate);
    });
  }

}