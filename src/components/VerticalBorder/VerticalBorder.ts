import './VerticalBorder.scss';

export interface ControlObservable {
  AddObserver(modelObserver: ControlObserverCoordinate): void;
  DeleteObserver(modelObserver: ControlObserverCoordinate): void;
  Notify(): void;
}

export interface ControlObserverCoordinate {
  SetCoordinatePercent(coordinate: number): void;
}

export interface ControlMin {
  SetMinMargin(minMargin: number): void;
}

export interface ControlMax {
  SetMaxMargin(maxMargin: number): void;
}

export interface Borders extends ControlObservable, ControlMin, ControlMax{
  SetCurrentMarginPercent(percent: number): void;
  GetSetSelectValue(): number;
}


export default class VerticalBorder implements Borders {

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;

    this.Init();
    this.minMargin = 0 - this.verticalBorder.offsetWidth / 2;
    this.maxMargin = -this.verticalBorder.offsetWidth / 2 + this.parentElement.offsetWidth;
  }

  private parentElement: HTMLElement;

  private currentMargin: number;

  private mouseX: number;

  private handleX: number;

  private minMargin: number;

  private maxMargin: number;

  private verticalBorder: HTMLElement;

  private verticalBorderContent: HTMLElement;

  private setSelectValue: number;

  private observer: ControlObserverCoordinate[] = [];

  private Init() {
    this.Create();
    this.AddClasses();
    this.AddContentHtml();
    this.AddListener();
  }

  private Create() {
    this.verticalBorder = document.createElement('div');
    this.verticalBorderContent = document.createElement('div');
  }

  private AddClasses() {
    this.verticalBorder.classList.add('vertical-border');
    this.verticalBorderContent.classList.add('vertical-border__content');
  }

  private AddContentHtml() {
    this.verticalBorder.appendChild(this.verticalBorderContent);
    this.parentElement.appendChild(this.verticalBorder);
  }

  private AddListener() {
    this.verticalBorder.addEventListener('mousedown', this.AddEventMouseMove.bind(this));
    this.verticalBorder.addEventListener("touchstart", this.AddEventTouchMove.bind(this));
    document.addEventListener('mouseup', this.MouseUpListener.bind(this));
  }

  private MouseUpListener() {
    document.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  private TouchCancelListener() {
    document.removeEventListener('touchmove', this.moveTouch);
    document.removeEventListener('touchend', this.TouchCancelListener.bind(this));
  }

  private AddEventMouseMove(event: MouseEvent) {
    this.verticalBorder.classList.add("slider-foreground");
    this.mouseX = event.clientX;
    document.addEventListener('mousemove', this.mouseMoveHandler);
    this.handleX = this.verticalBorder.getBoundingClientRect().left;
  }

  private MouseMoveHandler(event: MouseEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.clientX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private MoveHandle() {
    if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
      this.verticalBorder.style.left = `${this.currentMargin}px`;
      this.setSelectValue = (this.currentMargin + this.verticalBorder.offsetWidth / 2) / this.parentElement.offsetWidth;
    } else {
      if (this.currentMargin < this.minMargin) {
        this.verticalBorder.style.left = `${this.minMargin}px`;
        this.setSelectValue = (this.minMargin + this.verticalBorder.offsetWidth / 2) / this.parentElement.offsetWidth;
      } else {
        this.verticalBorder.style.left = `${this.maxMargin}px`;
        this.setSelectValue = (this.maxMargin + this.verticalBorder.offsetWidth / 2) / this.parentElement.offsetWidth;
      }
    }
    this.Notify();
  }

  private AddEventTouchMove(event: TouchEvent) {
    this.mouseX = event.targetTouches[0].pageX;
    document.addEventListener("touchmove", this.moveTouch);
    document.addEventListener('touchend', this.TouchCancelListener.bind(this));
    this.handleX = this.verticalBorder.getBoundingClientRect().left;
  }

  private MoveBlockTouch(event: TouchEvent) {
    this.currentMargin = this.handleX - this.mouseX + event.targetTouches[0].pageX;
    this.currentMargin -= this.parentElement.getBoundingClientRect().left;
    this.MoveHandle();
  }

  private mouseMoveHandler = this.MouseMoveHandler.bind(this);

  private moveTouch = this.MoveBlockTouch.bind(this);

  SetCurrentMarginPercent(percent: number) {
    if (percent <= 1 && percent >= 0) {
      this.currentMargin = this.parentElement.offsetWidth * percent - this.verticalBorder.offsetWidth / 2;

      if (this.currentMargin >= this.minMargin && this.currentMargin <= this.maxMargin) {
        this.setSelectValue = percent;
        this.verticalBorder.style.left = `${this.currentMargin}px`;
        this.Notify();
      }
    }
  }

  SetMinMargin(minMargin: number) {
    if (minMargin <= 1 && minMargin >= 0) {
      this.minMargin = this.parentElement.offsetWidth * minMargin - this.verticalBorder.offsetWidth / 2;
    }
    this.verticalBorder.classList.remove("slider-foreground");
  }

  SetMaxMargin(maxMargin: number) {
    if (maxMargin <= 1 && maxMargin >= 0) {
      this.maxMargin = this.parentElement.offsetWidth * maxMargin - this.verticalBorder.offsetWidth / 2;
    }
    this.verticalBorder.classList.remove("slider-foreground");
  }

  AddObserver(controlObserver: ControlObserverCoordinate) {
    this.observer.push(controlObserver);
  }

  DeleteObserver(controlObserver: ControlObserverCoordinate) {
    const index = this.observer.indexOf(controlObserver);
    if (index > -1) {
      this.observer.splice(index, 1);
    }
  }

  Notify() {
    if (this.observer !== null || this.observer !== undefined) {
      this.observer.forEach(el => {
        el.SetCoordinatePercent(this.setSelectValue);
      });
    }
  }

  GetSetSelectValue(): number {
    return this.setSelectValue;
  }

}
