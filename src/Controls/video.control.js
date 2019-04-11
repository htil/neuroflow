var VueVideoControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: `<video id="myVideo" ref="myVideo" width="640" height="360" loop autoplay>
    <source src="https://download.blender.org/peach/bigbuckbunny_movies/BigBuckBunny_320x180.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>`,
    data() {
      return {
        value: 0,
      }
    },
    methods: {
      change(e){
        this.value = +e.target.value;
        this.update();
      },
      update() {
        if (this.ikey)
          this.putData(this.ikey, this.value)
        this.emitter.trigger('process');
      },
      setSpeed(x){
       // console.log(x);
        this.$refs.myVideo.playbackRate = x;
      }
    },
    mounted() {
      this.value = this.getData(this.ikey);
    }
    
  }
  
  
  export default class VideoControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VueVideoControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    setValue(val) {
      this.vueContext.value = val;
    }
  }