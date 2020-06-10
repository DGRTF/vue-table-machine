import { RightWidth } from './Column';
import { ControlObserverCoordinate } from './../VerticalBorder/VerticalBorder'

export default class RightWidthMove implements ControlObserverCoordinate {
  private observer: RightWidth[] = [];

  AddObserver(observer: RightWidth) {
    this.observer.push(observer);
  }

  DeleteObserver(observer: RightWidth) {
    const index = this.observer.indexOf(observer);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  SetCoordinatePercent(coordinate: number) {
    this.observer.forEach(el => {
      el.ChangeWidthRight(coordinate);
    });
  }

}