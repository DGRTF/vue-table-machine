import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

@Component({
})
export default class FormChangeBD extends Vue {

  @Prop() private header: string;

  @Prop() private path: string;

  @Prop() private inTemplate: {
    id: number;
    preview: string;
    category: string;
    name: string;
    weight: number;
    height: number;
    width: number;
    length: number;
  };

  @Prop() private inComplectArr: {
    id: number;
    machineId: number;
    name: string;
  }[];

  private formData: FormData;

  private PreviewImage(event: Event) {
    const el = (event.target as HTMLFormElement);
    const img = el.files[0];
    const path = URL.createObjectURL(img);
    (el.parentElement as HTMLElement).style.backgroundImage = `url(${path})`;
    console.warn((el.nextElementSibling as HTMLElement));
  }

  private async SubmitForm(event: Event) {
    const form = (event.target as HTMLFormElement);
    const formData = new FormData(form);
    this.formData = formData;
    this.$emit('send', this.formData);
  }

  private Close() {
    this.$emit('close');
  }

  @Watch('inTemplate')
  private ChangeInTemplate(inTemplate: {
    id: number;
    preview: string;
    category: string;
    name: string;
    weight: number;
    height: number;
    width: number;
    length: number;
  }) {
    const labelImage = this.$refs.labelImage as HTMLElement;
    labelImage.style.backgroundImage = `url(${inTemplate.preview})`;
  }

  mounted() {
    const labelImage = this.$refs.labelImage as HTMLElement;
    labelImage.style.backgroundImage = 'url(/fileImg/DefaultEmployee.jpeg)';
  }

  @Watch('inComplectArr')
  private InComplectArr() {
    console.warn(this.inComplectArr);
  }

}