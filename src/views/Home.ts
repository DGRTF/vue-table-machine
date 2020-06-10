import { Component, Vue } from 'vue-property-decorator';
import Table from './Table.vue';
import CurrentTable from './Table';
import FormChangeBD from './../components/FormChangeBD.vue';
import Category from './../components/Category.vue';


@Component({
  components: {
    Table,
    FormChangeBD,
    Category,
  }
})
export default class Home extends Vue {
  private table: HTMLElement;

  private visibleEditEmployee = false;

  private visibleCategory = false;

  private visibleTable = true;

  private editEmployee: {
    id: number;
    preview: string;
    category: string;
    name: string;
    weight: number;
    height: number;
    width: number;
    length: number;
  } = {
      id: null,
      preview: '/fileImg/Default.jpeg',
      category: null,
      name: null,
      weight: null,
      height: null,
      width: null,
      length: null,
    };

  private inDataArr: HTMLElement[] = [];

  private count = 7;

  private editEmployeePath = 'Home/EditEmployee';

  private headerHTML: HTMLElement[] = [];

  private header: string[] = [
    'Вид',
    'Категория',
    'Название',
    'Вес',
    'Высота',
    'Ширина',
    'Длина'
  ];

  private change: {
    id: number;
    preview: string;
    category: string;
    name: string;
    weight: number;
    height: number;
    width: number;
    length: number;
  }[];

  private globalList: {
    id: number;
    preview: string;
    category: string;
    name: string;
    weight: number;
    height: number;
    width: number;
    length: number;
  }[];

  private complectArr: {
    id: number;
    machineId: number;
    name: string;
  }[] = [
      {
        id: 1,
        machineId: 1,
        name: 'Пила ленточная',
      },
      {
        id: 2,
        machineId: 1,
        name: 'Блок управления',
      },
      {
        id: 3,
        machineId: 1,
        name: 'Защита от протеканий',
      },

      {
        id: 4,
        machineId: 2,
        name: 'Фреза',
      },
      {
        id: 5,
        machineId: 2,
        name: 'Пакет по для 3D изображений',
      },
      {
        id: 6,
        machineId: 2,
        name: 'Набор подшипников',
      },

      {
        id: 7,
        machineId: 3,
        name: 'Платформа для переноса станка',
      },
      {
        id: 8,
        machineId: 3,
        name: 'Дополнительная станина',
      },

      {
        id: 9,
        machineId: 4,
        name: 'Ножи',
      },
    ];

  private shopComplect: {
    id: number;
    machineId: number;
    name: string;
  }[] = [
      {
        id: 0,
        machineId: 0,
        name: 'name',
      },
    ];

  mounted() {
    const headerHTML: HTMLElement[] = [];
    this.header.forEach(el => {
      const element = document.createElement('div');
      element.classList.add('container-table__inner-element');
      element.innerText = el;
      headerHTML.push(element);
    });

    this.headerHTML = headerHTML;
    this.GetElements();
  }

  private GetElements() {
    this.change = [
      {
        id: 1,
        preview: '/fileImg/Default.jpeg',
        category: 'Оборудование для обработки дерева',
        name: 'Пилорама ленточная',
        weight: 118.6,
        height: 2.1,
        width: 1.84,
        length: 10,
      },
      {
        id: 2,
        preview: '/fileImg/Default.jpeg',
        category: 'Оборудование для обработки металла',
        name: 'Фрезерный станок с ЧПУ',
        weight: 80,
        height: 1.6,
        width: 1.2,
        length: 1.2,
      },
      {
        id: 3,
        preview: '/fileImg/Default.jpeg',
        category: 'Оборудование для обработки металла',
        name: 'Гибочный станок',
        weight: 120,
        height: 2.1,
        width: 1.8,
        length: 2,
      },
      {
        id: 4,
        preview: '/fileImg/Default.jpeg',
        category: 'Оборудование для обработки дерева',
        name: 'Фуговальный станок',
        weight: 60,
        height: .8,
        width: .5,
        length: 1.2,
      },
    ];
    this.globalList = this.change.slice();
    this.ChangeContent();
  }

  private ChangeContent() {
    const dataHTMLArr: HTMLElement[] = [];
    this.change.forEach(el => {
      const elPreview = document.createElement('div');
      elPreview.classList.add('container-table__preview');
      elPreview.style.backgroundImage = `url(${el.preview})`;
      dataHTMLArr.push(elPreview);

      const elCategory = document.createElement('div');
      elCategory.innerText = el.category;
      dataHTMLArr.push(elCategory);

      const elName = document.createElement('div');
      elName.innerText = el.name;
      dataHTMLArr.push(elName);

      const elWeight = document.createElement('div');
      elWeight.innerText = `${el.weight}`;
      dataHTMLArr.push(elWeight);

      const elHeight = document.createElement('div');
      elHeight.innerText = `${el.height}`;
      dataHTMLArr.push(elHeight);

      const elWidth = document.createElement('div');
      elWidth.innerText = `${el.width}`;
      dataHTMLArr.push(elWidth);

      const elLength = document.createElement('div');
      elLength.innerText = `${el.length}`;
      dataHTMLArr.push(elLength);

    });
    this.inDataArr = dataHTMLArr;
  }

  private CloseEdit() {
    this.visibleTable = true;
    this.visibleEditEmployee = false;
  }

  private async SendEdit() {
    const item = (this.$refs.table as CurrentTable).selectLine;
    if (item >= 0) {
      alert('Заявка отправлена!')
    } else
      alert('Selected employee');
  }

  private SelectLineInTable(selectLine: number) {
    if (!this.visibleTable)
      if (selectLine >= 0) {
        this.editEmployee = this.change[selectLine];
        this.SetShopComplect();
      }
  }

  private EditEmployee() {
    const number = (this.$refs.table as CurrentTable).selectLine;
    if (number >= 0) {
      this.editEmployee = this.change[number];
      this.SetShopComplect();
      this.visibleTable = false;
      this.visibleEditEmployee = true;
    } else
      alert('Selected machine');
  }

  private SetShopComplect() {
    const shopComplect: {
      id: number;
      machineId: number;
      name: string;
    }[] = [];

    this.complectArr.forEach(el => {
      if (el.machineId === this.editEmployee.id)
        shopComplect.push(el);
    });
    if (shopComplect.length !== 0)
      this.shopComplect = shopComplect;
  }

  private SelectCategory() {
    this.visibleTable = false;
    this.visibleCategory = true;
  }

  private SendCategory(formData: FormData) {
    if (formData.get('category') === 'all'){
      this.shopComplect = this.complectArr;
      this.change = this.globalList.slice();
    }
    else {
      const change: {
        id: number;
        preview: string;
        category: string;
        name: string;
        weight: number;
        height: number;
        width: number;
        length: number;
      }[] = [];

      this.globalList.forEach(el => {
        if (el.category === formData.get('category'))
          change.push(el);
      });
      this.change = change.slice();
    }
    this.ChangeContent();
  }

  private CloseCategory() {
    this.visibleTable = true;
    this.visibleCategory = false;
  }

}