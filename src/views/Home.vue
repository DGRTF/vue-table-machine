<template lang="pug">
  div
    Form-change-bD(:path='editEmployeePath' :inTemplate='editEmployee' header='Купить станок' v-show='visibleEditEmployee' v-on:close='CloseEdit' v-on:send='SendEdit' :inComplectArr='shopComplect')
    category(v-show='visibleCategory' v-on:close='CloseCategory' v-on:send='SendCategory')
    div.container-table__crud-panel(v-show='visibleTable')
      button.container-table__button(v-on:click='SelectCategory')='Выбрать категорию'
      button.container-table__button(v-on:click='EditEmployee')='Купить'
    Table(ref='table' :header="headerHTML" :columnCount='count' :contentLineArr="inDataArr" v-on:selectLine='SelectLineInTable')
</template>

<style lang='scss'>
.container-table {
  &__crud-panel {
    margin: 30px;
    display: flex;
    justify-content: space-around;
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

  &__inner-element {
    height: 100%;
    width: 100%;
  }

  &__remote-work {
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    border: 1px solid rgb(95, 94, 94);
    border-radius: 4px;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    &__true {
      height: 4px;
      width: 6px;
      border-left: 2px solid rgb(95, 94, 94);
      border-bottom: 2px solid rgb(95, 94, 94);
      transform: rotate(-45deg);
    }
  }

  &__preview {
    background-color: rgba(207, 207, 207, 0.3);
    background-size: cover;
    width: 80%;
    height: 80px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}

.slide-transition {
  transition: all 0.7s cubic-bezier(0.65, 0.5, 0.36, 1);
}

.slide-enter .slide-leave {
  left: -100%;
}
</style>

<script src='./Home.ts' lang='ts'></script>
