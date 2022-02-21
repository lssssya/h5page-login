<template>
  <div>
    {{code}}
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  props: {
    code: {
      type: String,
      default: '404'
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>