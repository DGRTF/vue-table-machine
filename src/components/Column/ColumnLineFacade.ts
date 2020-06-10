import Column from './Column';
import LineControl from './LineFacade';
import { ControlObservable } from '../VerticalBorder/VerticalBorder';
import LineHeader from './LineHeader';
import { LineContent } from './Line';
import CreatorLine from './CreatorLine';
import ColumnControl from './ColumnFacade';

export default class ColumnLineFacade {
  constructor(
    verticalBorderArr: ControlObservable[],
    contentArr: HTMLElement[],
    parentElement: HTMLElement
  ) {
    this.parentElement = parentElement;
    this.contentArr = contentArr;
    this.verticalBorderArr = verticalBorderArr;
    this.Init();
  }

  private contentArr: HTMLElement[];

  private columnArr: Column[] = [];

  private parentElement: HTMLElement;

  private verticalBorderArr: ControlObservable[];

  private lineHeader: LineHeader;

  private lineArr: LineContent[] = [];

  private contentLineArr: HTMLElement[] = [];

  private lineFacade: LineControl;

  private columnControl: ColumnControl;

  private count: number;

  private methodSelectLine: (selectLine: number) => void;

  private Init() {
    this.count = this.verticalBorderArr.length + 1;
    this.CreateColumn();
    this.CreateLines();
    this.AddObserversInVerticalBorders();
  }

  private CreateColumn() {
    for (let i = 0; i < this.count; i++) {
      const column = new Column(this.parentElement);
      this.columnArr.push(column);
    }
  }

  private CreateLines() {
    const contentLineArr = this.contentArr.splice(0, this.count);
    this.lineHeader = new LineHeader(contentLineArr.slice());

    this.columnArr.forEach((el, index) => {
      el.AddContent(this.lineHeader.GetElementArr()[index]);
    });

    const creatorLine = new CreatorLine();
    this.lineArr = creatorLine.FactoryMethod(this.count, this.contentArr.slice())

    this.lineFacade = new LineControl(this.lineArr.slice(), this.verticalBorderArr.slice());
    this.contentLineArr = this.lineFacade.GetElementArr();
    this.columnControl = new ColumnControl(this.columnArr.slice(), this.verticalBorderArr.slice());
    this.columnControl.AddContentHTMLInColumn(this.contentLineArr);
  }

  private AddObserversInVerticalBorders() {
    this.verticalBorderArr.forEach(el => {
      el.AddObserver(this.lineHeader);
    })
  }

  UpdatePosition() {
    this.columnArr[this.columnArr.length - 1].ChangeWidthRight(1);
  }

  NewContent(contentArr: HTMLElement[]) {
    this.columnControl.DeleteContent();
    this.contentArr = contentArr;

    const creatorLine = new CreatorLine();
    this.lineArr = creatorLine.FactoryMethod(this.count, this.contentArr.slice());

    this.lineFacade = new LineControl(this.lineArr.slice(), this.verticalBorderArr.slice());
    this.lineFacade.SetMethodGetSelectLine(this.methodSelectLine);
    this.contentLineArr = this.lineFacade.GetElementArr();

    this.columnControl.AddContentHTMLInColumn(this.contentLineArr.slice());
  }

  SetMethodGetSelectLine(methodGetSelectLine: (selectLine: number) => void) {
    this.methodSelectLine = methodGetSelectLine;
    this.lineFacade.SetMethodGetSelectLine(methodGetSelectLine);
  }

}