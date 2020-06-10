import { LineContent, LinesChange } from './Line';
import { ControlObservable } from '../VerticalBorder/VerticalBorder';


export default class LineControl implements LinesChange {
  constructor(lineArr: LineContent[], verticalBorderArr: ControlObservable[]) {
    this.verticalBorderArr = verticalBorderArr;
    this.lineArr = lineArr;
    this.Init();
  }

  private verticalBorderArr: ControlObservable[];

  private lineArr: LineContent[];

  private addLineArr: LineContent[];

  private selectLine: number;

  private methodGetSelectLine: (selectLine: number) => void;

  private Init() {
    this.ToLinkLines(this.lineArr);
    this.AddObserversInVerticalBorders();
  }

  private ToLinkLines(lineArr: LineContent[]) {
    lineArr.forEach((el, ind) => {
      lineArr.forEach((element, index) => {
        if (ind !== index)
          el.AddObserver(element);
      });
      el.AddObserver(this);
    });
  }

  private AddObserversInVerticalBorders() {
    this.verticalBorderArr.forEach(el => {
      this.lineArr.forEach(element => {
        el.AddObserver(element);
      });
    });
  }

  GetElementArr(): HTMLElement[] {
    let contentLine: HTMLElement[] = [];
    this.lineArr.forEach(el => {
      contentLine = contentLine.concat(el.GetElementArr());
    });
    return contentLine.slice();
  }

  AddLines(lineArr: LineContent[]) {
    this.addLineArr = lineArr;
    this.ToLinkLines(this.addLineArr);
    this.ToLinkLinesAddArr();
    this.Concat();
  }

  private ToLinkLinesAddArr() {
    this.addLineArr.forEach(el => {
      this.lineArr.forEach(element => {
        el.AddObserver(element);
      });
    });
  }

  private Concat() {
    this.lineArr.concat(this.addLineArr);
  }

  ChangeLine() {
    this.lineArr.forEach((el, index) => {
      if (el.GetSelect()) {
        this.selectLine = index;
      }
    });
      this.methodGetSelectLine(this.selectLine);
  }

  SetMethodGetSelectLine(methodGetSelectLine: (selectLine: number) => void) {
    this.methodGetSelectLine = methodGetSelectLine;
  }

}