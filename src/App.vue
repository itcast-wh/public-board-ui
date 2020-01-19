<template>
  <router-view />
</template>

<style lang="scss">
$colors: (
  1: #ed745e,
  2: #e08435,
  3: #f1ae37,
  gray: #999999
);

@each $key, $value in $colors {
  .color-#{$key} {
    color: $value;
  }
}

.text-center {
  text-align: center;
}
</style>
