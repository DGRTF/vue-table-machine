import { Lines } from './Line';
import { ControlObserverCoordinate } from '../VerticalBorder/VerticalBorder';


export default class LineHeader implements Lines, ControlObserverCoordinate{
  constructor(contentLineArr: HTMLElement[]) {
    this.contentLineArr = contentLineArr;
    this.Init();
  }
  
  private heightArr: number[] = [];

  private contentLineArr: HTMLElement[];

  private containerContentLineArr: HTMLElement[] = [];

  // private linesChange: LinesChange[] = [];

  // private select = false;

  private Init() {
    this.Create();
    // this.AddListeners();
  }

  private Create() {
    this.contentLineArr.forEach(el => {
      const container = document.createElement('div');
      container.classList.add('line-container-header');
      container.classList.add('line-container');
      container.appendChild(el);
      this.containerContentLineArr.push(container);
    })
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


  // private AddListeners() {
  //   this.containerContentLineArr.forEach(el => {
  //     el.addEventListener('click', this.ClickContainerListener.bind(this))
  //   });

    // this.containerContentLineArr.forEach(el => {
    //   el.addEventListener('mouseenter', this.SelectContainerHover.bind(this))
    // });

    // this.containerContentLineArr.forEach(el => {
    //   el.addEventListener('mouseleave', this.SelectElementHandlerOff.bind(this))
    // });
  // }

  GetElementArr(){
    return this.containerContentLineArr.slice();
  }
}