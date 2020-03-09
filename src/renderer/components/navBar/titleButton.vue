<template>
  <div 
    class="titlebtn" 
    :style="style"
    @click="click"/>
</template>

<script>
    const { ipcRenderer: ipc } = require('electron');
    const style = {
      min: {
        backgroundColor: '#28CA41',
        left: '75px',
        top: '15px',
      },
      max: {
        backgroundColor: '#FFBF2F',
        top: '15px',
        left: '45px',
        cursor: 'auto',
      },
      close: {
        backgroundColor: '#FF6058',
        top: '15px',
        left: '15px',
      },
    };
    export default {
      name: 'TitleButton',
      props: ['type'],
      computed: {
        style() {
          return style[this.type];
        },
      },
      methods: {
        click() {
          ipc.send(this.type);
        },
      },
    };
</script>
    
<style>
.titlebtn {
    position: absolute;
    top: 10px;
    width: 15px;
    height: 15px;
    -webkit-app-region: no-drag;
    border-radius: 50%;
}
.titlebtn:hover{
    border: 1px solid rgba(248, 242, 242, 0.6);
}
</style>