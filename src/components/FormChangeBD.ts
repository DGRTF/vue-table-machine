import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

@Component({
})
export default class FormChangeBD extends Vue {

  @Prop() private header: string;

  @Prop() private path: string;

  @Prop() private inTemplate: {
    id: number;
    name: string;
    surname: string;
    position: string;
    preview: string;
    city: string;
    street: string;
    home: string;
    flat: number;
    remoteWork: boolean;
    birthDate: string;
  };

  private formData: FormData;

  private img: HTMLElement;

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
    name: string;
    surname: string;
    position: string;
    preview: string;
    address: string;
    remoteWork: boolean;
    birthDate: string;
  }) {
    const labelImage = this.$refs.labelImage as HTMLElement;
    labelImage.style.backgroundImage = `url(${inTemplate.preview})`;
    const checkbox = this.$refs.remoteWork as HTMLFormElement;
    if (inTemplate.remoteWork)
      checkbox.checked = true;
    else
      checkbox.checked = false;
  }

  mounted(){
    const labelImage = this.$refs.labelImage as HTMLElement;
    labelImage.style.backgroundImage = 'url(/fileImg/DefaultEmployee.jpeg)';
  }

}