import { Vue, Prop, Component, Watch } from 'vue-property-decorator';

@Component({
})
export default class Category extends Vue {
  private formData: FormData;

  private Close() {
    this.$emit('close');
  }

  private SubmitForm(event: Event) {
    const form = (event.target as HTMLFormElement);
    const formData = new FormData(form);
    this.formData = formData;
    this.$emit('send', this.formData);
  }

}