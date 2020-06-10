import { ControlObserverCoordinate } from '../VerticalBorder/VerticalBorder';
import './Line.scss';

export interface LineObserverSelect {
  AddObserver(lineChange: LinesChange): void;
  DeleteObserver(lineChange: LinesChange): void;
  Notify(): void;
}

export interface LinesChange {
  ChangeLine(): void;
}

export interface Lines {
  GetElementArr(): HTMLElement[];
}

export interface LineContent extends Lines, LineObserverSelect, LinesChange, ControlObserverCoordinate {
  GetElementArr(): HTMLElement[];
  GetSelect(): boolean;
}

export default class Line implements LineContent {
  constructor(contentLineArr: HTMLElement[]) {
    this.contentLineArr = contentLineArr;
    this.Init();
  }

  private heightArr: number[] = [];

  private contentLineArr: HTMLElement[];

  private containerContentLineArr: HTMLElement[] = [];

  private linesChange: LinesChange[] = [];

  private select = false;

  private Init() {
    this.Create();
    this.AddListeners();
  }

  private Create() {
    this.contentLineArr.forEach(el => {
      const container = document.createElement('div');
      container.classList.add('line-container');
      container.appendChild(el);
      this.containerContentLineArr.push(container);
    })
  }

  private AddListeners() {
    this.containerContentLineArr.forEach(el => {
      el.addEventListener('click', this.ClickContainerListener.bind(this))
    });

    this.containerContentLineArr.forEach(el => {
      el.addEventListener('mouseenter', this.SelectContainerHover.bind(this))
    });

    this.containerContentLineArr.forEach(el => {
      el.addEventListener('mouseleave', this.SelectElementHandlerOff.bind(this))
    });
  }

  private ClickContainerListener() {
    this.SelectElement();
    this.select = true;
    this.Notify();
  }

  private SelectElement() {
    this.containerContentLineArr.forEach(el => {
      el.classList.add('line-container-select');
      el.classList.remove('line-container-hover');
    });
  }

  private SelectElementHandlerOff() {
    if (!this.select) {
      this.containerContentLineArr.forEach(el => {
        el.classList.remove('line-container-hover');
      });
    }
  }

  private SelectContainerHover() {
    if (!this.select)
      this.containerContentLineArr.forEach(el => {
        el.classList.add('line-container-hover');
      });
  }

  private SelectElementOff() {
    this.containerContentLineArr.forEach(el => {
      el.classList.remove('line-container-select');
    });
  }

  SetCoordinatePercent(coordinatePercent: number) {
    if (coordinatePercent <= 1 && coordinatePercent >= 0) {
      this.containerContentLineArr.forEach(el => {
        el.style.height = 'auto';
      });

      this.heightArr.length = 0;

      this.containerContentLineArr.forEach(el => {
        this.heightArr.push(el.offsetHeight);
      });

      this.heightArr.sort(this.Compare);

      this.containerContentLineArr.forEach(el => {
        el.style.height = `${this.heightArr[this.heightArr.length - 1]}px`;
      });
    }
  }

  private Compare(a: number, b: number) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
  }



  GetElementArr(): HTMLElement[] {
    return this.containerContentLineArr.slice();
  }

  ChangeLine() {
    if (this.select) {
      this.SelectElementOff();
    }
    this.select = false;
  }



  AddObserver(lineChange: LinesChange) {
    this.linesChange.push(lineChange);
  }

  DeleteObserver(lineChange: LinesChange) {
    const index = this.linesChange.indexOf(lineChange);
    if (index > -1) {
      this.linesChange.splice(index, 1);
    }
  }

  Notify() {
    this.linesChange.forEach(el => {
      el.ChangeLine();
    });
  }


  GetSelect(): boolean {
    return this.select;
  }

}