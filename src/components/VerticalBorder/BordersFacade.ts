import { ControlObservable, Borders } from './VerticalBorder';
import MaxMargin from './MaxMargin';
import MinMargin from './MinMargin';

export default class BordersControl {
  constructor(bordersArr: Borders[]) {
    this.bordersArr = bordersArr;
    this.Init();
  }

  private bordersArr: Borders[];

  private Init() {
    this.bordersArr.forEach((el, index) => {
      if (index < this.bordersArr.length - 1) {
        const maxMargin = new MaxMargin([el]);
        const nextElement = this.bordersArr[index + 1]
        nextElement.AddObserver(maxMargin);
        const minMargin = new MinMargin([nextElement])
        el.AddObserver(minMargin);
      }
    });
  }

  GetVerticalBorderArr(): ControlObservable[] {
    return this.bordersArr.slice();
  }

  SetDefaultPosition() {
    const middleWidth = 1 / (this.bordersArr.length + 1);
    this.bordersArr.forEach((el, index) => {
      el.SetCurrentMarginPercent(middleWidth * (index + 1));
    });
  }

  UpdatePosition() {
    this.bordersArr[this.bordersArr.length-1].SetMaxMargin(1);
    this.bordersArr.forEach(el => {
      const setSelectValue = el.GetSetSelectValue();
      el.SetCurrentMarginPercent(setSelectValue);
    });
  }

}