<template>
  <img :src="require(`@/assets/${svgName}.svg`)" />
</template>

<script>
export default {
  name: 'LogoSVG',
  props: {
    svgName: {
      default: '',
      type: String,
    }
  }
}
</script>
