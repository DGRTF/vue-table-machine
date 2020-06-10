import { Component, Vue } from 'vue-property-decorator';
import Table from './Table.vue';
import CurrentTable from './Table';
import FormChangeBD from './../components/FormChangeBD.vue';


@Component({
  components: {
    Table,
    FormChangeBD
  }
})
export default class Home extends Vue {
  private table: HTMLElement;

  private visibleAddEmployee = false;

  private visibleEditEmployee = false;

  private visibleTable = true;

  private editEmployee: {
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
  } = {
      id: 1,
      name: 'Имя',
      surname: 'Фамилия',
      position: 'Должность',
      preview: 'Фото',
      city: 'Город',
      street: 'Улица',
      home: 'Дом',
      flat: 0,
      remoteWork: false,
      birthDate: '01.01.1980'
    };

  private addEmployee: {
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
  } = {
      id: 1,
      name: 'Имя',
      surname: 'Фамилия',
      position: 'Должность',
      preview: '/fileImg/DefaultEmployee.jpeg',
      city: 'Город',
      street: 'Улица',
      home: 'Дом',
      flat: 0,
      remoteWork: false,
      birthDate: '01.01.1980'
    };

  private inDataArr: HTMLElement[] = [];

  private count = 8;

  private addEmployeePath = 'Home/AddEmployee';

  private editEmployeePath = 'Home/EditEmployee';

  private date: Date;

  private year: number;

  private remoteWork: HTMLElement;

  private headerHTML: HTMLElement[] = [];

  private reverseName = false;

  private reverseSurname = false;

  private reversePosition = false;

  private reverseAddress = false;

  private header: string[] = [
    'Превью',
    'Имя',
    'Фамилия',
    'Дата рождения',
    'Возраст',
    'Должность',
    'Удалённая работа',
    'Адрес проживания'
  ];

  private change: {
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
  }[];

  mounted() {
    const headerHTML: HTMLElement[] = [];
    this.header.forEach(el => {
      const element = document.createElement('div');
      element.classList.add('container-table__inner-element');
      element.innerText = el;
      headerHTML.push(element);
    });

    headerHTML[1].addEventListener('click', this.SortByName.bind(this));
    headerHTML[2].addEventListener('click', this.SortBySurname.bind(this));
    headerHTML[5].addEventListener('click', this.SortByPosition.bind(this));
    headerHTML[7].addEventListener('click', this.SortByAddress.bind(this));
    this.headerHTML = headerHTML;
    this.GetElements();
  }

  private SortByName() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `Home/SortByName?reverse=${this.reverseName}`, false);
    xhr.send();

    if (xhr.status != 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    } else {
      this.change = JSON.parse(xhr.responseText);

      if (this.reverseName)
        this.reverseName = false;
      else
        this.reverseName = true;

      this.ChangeContent();
    }
  }

  private SortBySurname() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `Home/SortBySurname?reverse=${this.reverseSurname}`, false);
    xhr.send();

    if (xhr.status != 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    } else {
      this.change = JSON.parse(xhr.responseText);

      if (this.reverseSurname)
        this.reverseSurname = false;
      else
        this.reverseSurname = true;

      this.ChangeContent();
    }
  }

  private SortByPosition() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `Home/SortByPosition?reverse=${this.reversePosition}`, false);
    xhr.send();

    if (xhr.status != 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    } else {
      this.change = JSON.parse(xhr.responseText);

      if (this.reversePosition)
        this.reversePosition = false;
      else
        this.reversePosition = true;

      this.ChangeContent();
    }
  }

  private SortByAddress() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `Home/SortByAddress?reverse=${this.reverseAddress}`, false);
    xhr.send();

    if (xhr.status != 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    } else {
      this.change = JSON.parse(xhr.responseText);

      if (this.reverseAddress)
        this.reverseAddress = false;
      else
        this.reverseAddress = true;

      this.ChangeContent();
    }
  }

  private GetElements() {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'Home/Index', false);
    xhr.send();

    if (xhr.status != 200) {
      console.warn(xhr.status + ': ' + xhr.statusText);
    } else {
      this.change = JSON.parse(xhr.responseText);
      this.ChangeContent();
    }
  }

  private ChangeContent() {
    const dataHTMLArr: HTMLElement[] = [];
    this.change.forEach(el => {
      const elPreview = document.createElement('div');
      elPreview.classList.add('container-table__preview');
      elPreview.style.backgroundImage = `url(${el.preview})`;
      dataHTMLArr.push(elPreview);

      const elName = document.createElement('div');
      elName.innerText = el.name;
      dataHTMLArr.push(elName);

      const elSurname = document.createElement('div');
      elSurname.innerText = el.surname;
      dataHTMLArr.push(elSurname);

      const elBirthDate = document.createElement('div');
      this.date = new Date(el.birthDate);
      const birthDay = this.date.getDate();
      const birthMonth = this.date.getMonth() + 1;
      const birthYear = this.date.getFullYear();
      elBirthDate.innerText = `${birthDay}.${birthMonth}.${birthYear}`;
      dataHTMLArr.push(elBirthDate);

      this.CreateAgeYear();

      const elAge = document.createElement('div');
      elAge.innerText = `${this.year}`;
      dataHTMLArr.push(elAge);

      const elPosition = document.createElement('div');
      elPosition.innerText = el.position;
      dataHTMLArr.push(elPosition);

      this.CreateRemoteWorkHTMLElement(el.remoteWork);
      dataHTMLArr.push(this.remoteWork);

      const elAddress = document.createElement('div');
      elAddress.innerText = `${el.city} ${el.street} д. ${el.home} кв. ${el.flat}`;
      dataHTMLArr.push(elAddress);

    });
    this.inDataArr = dataHTMLArr;
  }

  private CreateAgeYear() {
    const currentDate = new Date();
    this.year = currentDate.getFullYear() - this.date.getFullYear() - 1;
    if (this.date.getMonth() <= currentDate.getMonth())
      if (this.date.getMonth() === currentDate.getMonth()) {
        if (this.date.getDate() <= currentDate.getDate())
          this.year += 1;
      } else
        this.year += 1;
  }

  private CreateRemoteWorkHTMLElement(remoteWork: boolean) {
    this.remoteWork = document.createElement('div');
    this.remoteWork.classList.add('container-table__remote-work');
    if (remoteWork) {
      const trueRemoteWork = document.createElement('div');
      trueRemoteWork.classList.add('container-table__remote-work__true');
      this.remoteWork.appendChild(trueRemoteWork);
    }
  }

  private DeleteEmployee() {
    const number = (this.$refs.table as CurrentTable).selectLine;
    if (number >= 0) {
      const result = confirm("Delete employee from DB?");
      if (result) {
        const id = this.change[number].id;

        const xhr = new XMLHttpRequest();
        xhr.open('POST', `Home/DeleteEmployee?id=${id}`, false);
        xhr.send();

        if (xhr.status != 200) {
          console.warn(xhr.status + ': ' + xhr.statusText);
        } else {
          this.change = JSON.parse(xhr.responseText);
          this.ChangeContent();
        }
      }
    }
  }

  private EditEmployee() {
    const number = (this.$refs.table as CurrentTable).selectLine;
    if (number >= 0) {
      this.editEmployee = this.change[number];
      this.visibleTable = false;
      this.visibleEditEmployee = true;
    } else
      alert('Selected employee');
  }

  private AddEmployee() {
    this.visibleTable = false;
    this.visibleAddEmployee = true;
  }

  private CloseAdd() {
    this.visibleTable = true;
    this.visibleAddEmployee = false;
  }

  private CloseEdit() {
    this.visibleTable = true;
    this.visibleEditEmployee = false;
  }

  private async SendAdd(formData: FormData) {
    console.warn(formData);
    const response = await fetch(`${this.addEmployeePath}`, {
      method: 'POST',
      body: formData
    });

    this.change = await response.json();
    this.ChangeContent();
  }

  private async SendEdit(formData: FormData) {
    const item = (this.$refs.table as CurrentTable).selectLine;
    if (item >= 0) {
      const id = this.change[item].id;
      formData.append('id', `${id}`);

      const response = await fetch(`${this.editEmployeePath}`, {
        method: 'POST',
        body: formData
      });

      this.change = await response.json();
      this.ChangeContent();
    } else
      alert('Selected employee');
  }

  private SelectLineInTable(selectLine: number) {
    if (!this.visibleTable)
      if (selectLine >= 0) {
        this.editEmployee = this.change[selectLine];
      }
  }

}