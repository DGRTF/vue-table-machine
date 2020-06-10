<template lang='pug'>
  .form-redact
    .form-redact__header='{{header}}'
      button.form-redact__button(v-on:click='Close')='Закрыть'
    form.form-redact__form(v-on:submit.prevent='SubmitForm')
      .form-redact__column
        label(ref='labelImage' class='form-redact__label-preview')
          input.form-redact__preview(type='file' name='preview' id='preview' accept='image/jpeg' v-on:change='PreviewImage' readonly)
      .form-redact__column
        label.form-redact__label-input='Название'
          input.form-redact__field(type='text' name='name' placeholder='Название' readonly :value='inTemplate.name')
        label.form-redact__label-input='Категория'
          input.form-redact__field(type='text' name='surname' placeholder='Категория' readonly :value='inTemplate.category')
        label.form-redact__label-input='Вес'
          input.form-redact__field(type='text' name='position' placeholder='Вес' readonly :value='inTemplate.weight')
        template(v-for='complect in inComplectArr')
          label.form-redact__label-input='{{complect.name}}'
            input.form-redact__field(type='checkbox' :name='complect.id' placeholder='Вес' readonly :value='inTemplate.weight')
      .form-redact__column
        label.form-redact__label-input='Высота'
          input.form-redact__field(type='text' name='street' placeholder='Высота' readonly :value='inTemplate.height')
        label.form-redact__label-input='Ширина'
          input.form-redact__field(type='text' name='home' placeholder='Ширина' readonly :value='inTemplate.width')
        label.form-redact__label-input='Длина'
          input.form-redact__field(type='number' name='flat' placeholder='Длина' readonly :value='inTemplate.length')
        input.form-redact__field(type='tel' name='phone' placeholder='Телефон для связи' required )
        input.form-redact__button(type='submit' value='Купить')
</template>

<style lang='scss' scoped>
.form-redact {
  display: inline-flex;
  flex-direction: column;
  border: 1px solid rgb(95, 94, 94);
  box-sizing: border-box;
  margin: 50px;
  color: rgb(95, 94, 94);

  &__header {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    font-size: 13px;
  }

  &__button {
    border: none;
    background-color: transparent;
    height: 20px;
    color: rgb(95, 94, 94);
    font-size: 13px;

    &:hover {
      background-color: rgba(207, 207, 207, 0.8);
    }

    &:focus {
      outline: none;
    }
  }

  &__form {
    min-width: 300px;
    border-top: 1px solid rgb(95, 94, 94);
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  &__column {
    display: flex;
    flex-direction: column;
    margin: 20px;
  }

  &__field {
    margin-bottom: 25px;
    margin-left: 10px;
    height: 25px;
    border: 1px solid rgb(95, 94, 94);
    border-radius: 3px;
    box-sizing: border-box;
    padding-left: 10px;
    color: rgb(95, 94, 94);
    font-size: 13px;

    &:focus {
      outline: none;
    }
  }

  &__list{
    height: auto;
  }

  &__check-name {
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  &__preview {
    display: none;
  }

  &__label-preview {
    min-height: 200px;
    min-width: 200px;
    background-color: rgba(207, 207, 207, 0.8);
    display: flex;
    background-size: cover;
  }

  &__label-input {
    display: flex;
    justify-content: space-between;
  }
}
</style>

<script src='./FormChangeBD.ts' lang='ts'></script>
