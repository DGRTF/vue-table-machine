<template lang='pug'>
  .category
    .category__header='Выберите категорию'
      button.category__button(v-on:click='Close')='Закрыть'
    form.category__form(v-on:submit.prevent='SubmitForm')
      select.category__fields(name='category')
        option.category__field(value='Оборудование для обработки дерева')='Оборудование для обработки дерева'
        option.category__field(value='Оборудование для обработки металла')='Оборудование для обработки металла'
      input.category__button(type='submit' value='Выбрать')
</template>

<style lang='scss' scoped>
.category {
  display: inline-flex;
  flex-direction: column;
  border: 1px solid rgb(95, 94, 94);
  box-sizing: border-box;
  margin: 50px;
  color: rgb(95, 94, 94);

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

  &__header {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    font-size: 13px;
  }

  &__form {
    border-top: 1px solid rgb(95, 94, 94);
    display: inline-flex;
    padding: 20px;
  }

  &__fields {
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

  &__field{
    font-size: 13px;

    &:focus {
      outline: none;
    }
  }
}
</style>

<script src='./Category.ts' lang='ts'></script>