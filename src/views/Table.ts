import VerticalBorder from '@/components/VerticalBorder/VerticalBorder';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ColumnLineFacade from '@/components/Column/ColumnLineFacade';
import BordersControl from '@/components/VerticalBorder/BordersFacade';


@Component({
  components: {
  }
})
export default class Table extends Vue {

  @Prop() private contentLineArr: HTMLElement[];

  @Prop() private header: HTMLElement[];

  @Prop() private columnCount: number;

  selectLine: number;

  private firstLoad = false;

  private currentElement: HTMLElement = null;

  private verticalBorderArr: VerticalBorder[] = [];

  private size: number;

  private bordersControl: BordersControl;

  private columnLineFacade: ColumnLineFacade;

  mounted() {
    this.currentElement = (this.$refs.home as HTMLElement);
  }

  private Init(cont: HTMLElement[]) {
    this.Create(cont);
    this.IntervalCheckSize();
    this.firstLoad = true;
  }

  Create(cont: HTMLElement[]) {
    for (let i = 0; i < this.columnCount - 1; i++) {
      this.verticalBorderArr.push(new VerticalBorder(this.currentElement));
    }

    cont = this.header.concat(cont);

    this.bordersControl = new BordersControl(this.verticalBorderArr.slice());
    this.columnLineFacade = new ColumnLineFacade(this.bordersControl.GetVerticalBorderArr(), cont.slice(), this.currentElement);
    this.columnLineFacade.SetMethodGetSelectLine(this.SetSelectLine.bind(this));
    this.bordersControl.SetDefaultPosition();
  }

  private IntervalCheckSize() {
    this.size = this.currentElement.offsetWidth;
    setInterval(() => {
      if (this.currentElement.offsetWidth !== this.size) {
        this.bordersControl.UpdatePosition();
        this.columnLineFacade.UpdatePosition();
      }
    }, 50);
  }

  @Watch('contentLineArr')
  AddLines(contentLineArr: HTMLElement[]) {
    if (this.firstLoad) {
      this.NewLines(contentLineArr);
      console.warn('TwoLoad');
    }
    else
      this.Init(contentLineArr);
  }

  private NewLines(contentLineArr: HTMLElement[]) {
    this.columnLineFacade.NewContent(contentLineArr.slice());
    this.bordersControl.UpdatePosition();
    this.selectLine = -1;
  }

  private SetSelectLine(selectLine: number): void {
    this.selectLine = selectLine;
    this.$emit('selectLine', this.selectLine);
  }
}


