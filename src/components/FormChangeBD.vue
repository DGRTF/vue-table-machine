<template lang='pug'>
  .form-redact
    .form-redact__header='{{header}}'
      button.form-redact__button(v-on:click='Close')='Закрыть'
    form.form-redact__form(v-on:submit.prevent='SubmitForm' ref='fo')
      .form-redact__column
        label(ref='labelImage' class='form-redact__label-preview')
          input.form-redact__preview(type='file' name='preview' id='preview' accept='image/jpeg' v-on:change='PreviewImage')
      .form-redact__column
        input.form-redact__field(type='text' name='name' placeholder='Имя' required :value='inTemplate.name')
        input.form-redact__field(type='text' name='surname' placeholder='Фамилия' required :value='inTemplate.surname')
        input.form-redact__field(type='date' name='birthDate' placeholder='ММ/ДД/ГГГГ' required :value='inTemplate.birthDate')
        input.form-redact__field(type='text' name='position' placeholder='Должность' required :value='inTemplate.position')
        label.form-redact__check-name='Удалёнка'
          input.form-redact__check(type='checkbox' ref='remoteWork' name='remoteWork' value='true')
      .form-redact__column
        input.form-redact__field(type='text' name='street' placeholder='Улица' required :value='inTemplate.street')
        input.form-redact__field(type='text' name='home' placeholder='Дом' required :value='inTemplate.home')
        input.form-redact__field(type='number' name='flat' placeholder='Квартира' required :value='inTemplate.flat')
        input.form-redact__field(type='text' name='city' placeholder='Город' required :value='inTemplate.city')
        input.form-redact__button(type='submit')
    
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

  &__check-name{
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
}
</style>

<script src='./FormChangeBD.ts' lang='ts'></script>
