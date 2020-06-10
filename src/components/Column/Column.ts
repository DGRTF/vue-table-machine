import './Column.scss';

export interface LeftWidth {
  ChangeWidthLeft(coordinatePercent: number): void;
}

export interface RightWidth {
  ChangeWidthRight(coordinatePercent: number): void;
}

export interface Columns extends LeftWidth, RightWidth {
  AddContent(elementHTML: HTMLElement): void;
  DeleteContent(): void;
}

export default class Column implements Columns, RightWidth, LeftWidth {

  constructor(parentElement: HTMLElement, name = '') {
    this.parentElement = parentElement;
    this.name = name;
    this.Init();
  }

  private parentElement: HTMLElement;

  private column: HTMLElement;

  private coordinate: number;

  private changeWidth: number;

  private left: number;

  private changeLeft: number;

  private name: string;

  Init() {
    this.CreateElements();
    this.AddClasses();
    this.AddContentHTML();
  }

  private CreateElements() {
    this.column = document.createElement('div');
  }

  private AddClasses() {
    this.column.classList.add('column');
  }

  private AddContentHTML() {
    this.parentElement.appendChild(this.column);
  }

  private HeightParentElement(){
    this.parentElement.style.height = `${this.column.offsetHeight}px`;
  }

  ChangeWidthLeft(coordinatePercent: number) {
    if (coordinatePercent <= 1 && coordinatePercent >= 0) {
      this.left = this.parentElement.offsetWidth * coordinatePercent;
      this.changeLeft = this.column.getBoundingClientRect().left - this.parentElement.getBoundingClientRect().left - this.left;
      this.column.style.left = `${this.left}px`;
      this.column.style.width = `${this.column.offsetWidth + this.changeLeft}px`;
    }
    this.HeightParentElement();
  }

  ChangeWidthRight(coordinatePercent: number) {
    if (coordinatePercent >= 0 && coordinatePercent <= 1) {
      this.coordinate = this.parentElement.offsetWidth * coordinatePercent + this.parentElement.getBoundingClientRect().left;
      this.changeWidth = this.coordinate - this.column.getBoundingClientRect().left - this.column.offsetWidth;
      this.column.style.width = `${this.column.offsetWidth + this.changeWidth}px`;
    }
    this.HeightParentElement();
  }

  AddContent(elementHTML: HTMLElement) {
    this.column.appendChild(elementHTML);
    this.HeightParentElement();
  }

  DeleteContent() {
    while (this.column.childNodes.length > 1) {
      const child = this.column.lastChild;
      this.column.removeChild(child)
    }
    this.HeightParentElement();
  }

}