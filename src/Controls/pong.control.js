import Game from './../pong_old';

var VuePongControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: '<div style="height:500px;width:700px;"><canvas style="display: block;"></canvas></div><',
 // template: '<div id="wrapper"></div>',
    data() {
      return {
        game: 0,
      }
    },
    methods: {
      update() {
        if (this.ikey)
          this.putData(this.ikey, this.game)
        this.emitter.trigger('process');
      },
      setSpeed(spd){
          this.game.setSpeed(spd);
      }
    },
    mounted() {
      this.game = this.getData(this.ikey);
    }
    
  }
  
  
  export default class PongControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VuePongControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    setValue(val) {
      this.vueContext.game.setSpeed(val);
    }
  }