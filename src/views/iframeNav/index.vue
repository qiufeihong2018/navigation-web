<template>
  <iframe id="inlineFrameExample" name="inlineFrameExample" title="Inline Frame Example" width="100%" height="898px" :src="iframeSrc"     v-loading.fullscreen.lock="loading"
    class="app-container"
    element-loading-text="别催了，我在加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"/>
</template>
<script>
export default {
  data() {
    return {
      iframeSrc: '',
      loading: false,
      timeStamp:''
    }
  },
  created() {
    this.iframeSrc = this.$route.query.website
     this.$nextTick(() =>{
    	const iframe = document.querySelector('#inlineFrameExample')
    	if (iframe.attachEvent) {    
    		iframe.attachEvent("onload", function() {    
    			const iframeNode = window.frames["inlineFrameExample"].document
    			console.log(iframeNode)			
    		});    
    	} else {    
    		iframe.onload = function() {    
    			const iframeNode = window.frames["inlineFrameExample"].document
    			console.log(iframeNode)			
    		};    
    	}
    })

// 作者：pangzicheng
// 链接：https://juejin.im/post/5c401de0e51d4521ef1e9231
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
  }
}
</script>
