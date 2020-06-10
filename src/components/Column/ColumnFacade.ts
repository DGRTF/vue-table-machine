
import { ControlObservable } from '../VerticalBorder/VerticalBorder';
import RightWidthMove from './RightWidth';
import LeftWidthMove from './LeftWidth';
import { Columns } from './Column';

export default class ColumnControl {
  constructor(columnArr: Columns[], verticalBorderArr: ControlObservable[]) {
    this.columnArr = columnArr;
    this.verticalBorderArr = verticalBorderArr;
    this.Init();
  }

  private columnArr: Columns[];

  private verticalBorderArr: ControlObservable[];

  private leftWidthMoveArr: LeftWidthMove[] = [];

  private rightWidthMoveArr: RightWidthMove[] = [];

  private Init() {
    this.Create();
    this.AddObserversMove();
    this.AddObserversInVerticalBorders();
  }

  private Create() {
    for (let i = 0; i < this.verticalBorderArr.length; i++) {
      this.leftWidthMoveArr.push(new LeftWidthMove);
      this.rightWidthMoveArr.push(new RightWidthMove);
    }
  }

  private AddObserversMove() {
    this.rightWidthMoveArr[0].AddObserver(this.columnArr[0]);
    const count = this.verticalBorderArr.length - 1;

    this.columnArr.forEach((el, index) => {
      if (index > 0 && index < this.verticalBorderArr.length) {
        this.rightWidthMoveArr[index].AddObserver(el);
        this.leftWidthMoveArr[index - 1].AddObserver(el);
      }
    });
    this.leftWidthMoveArr[count].AddObserver(this.columnArr[count + 1]);
  }

  private AddObserversInVerticalBorders() {
    const count = this.verticalBorderArr.length - 1;
    this.verticalBorderArr[0].AddObserver(this.rightWidthMoveArr[0]);
    this.verticalBorderArr[count].AddObserver(this.leftWidthMoveArr[count]);

    this.columnArr.forEach((el, index) => {
      if (index > 0 && index < this.columnArr.length - 1) {
        this.verticalBorderArr[index].AddObserver(this.rightWidthMoveArr[index]);
        this.verticalBorderArr[index - 1].AddObserver(this.leftWidthMoveArr[index - 1]);
      }
    });

    // this.columnArr[0].ChangeWidthLeft(0);
    this.columnArr[this.columnArr.length - 1].ChangeWidthRight(1);
  }

  AddContentHTMLInColumn(contentArr: HTMLElement[]) {
    contentArr.forEach((el, index) => {
      let count = ((index + 1) % this.columnArr.length) - 1;
      if (count === -1)
        count = this.columnArr.length - 1;
      this.columnArr[count].AddContent(el);
    });
  }

  DeleteContent() {
    this.columnArr.forEach(el => {
      el.DeleteContent();
    })
  }

}