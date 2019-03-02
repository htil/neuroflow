var VueOpControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: `<select @change="change($event)"">
    <option value='add'>+</option>
    <option value='sub'>-</option>
    <option value='mul'>×</option>
    <option value='div'>÷</option>
    <option value='mod'>%</option>
    <option value='greater'>></option>
    <option value='lesser'><</option>
    <option value='equal'>==</option>
    <option value='great_eq'>>=</option>
    <option value='less_eq'><=</option>
    <option value='not_eq'>!=</option>

    </select>`,
     data() {
      return {
        selected: 'add',
      }
    },
    methods: {
      change(e){
        this.selected = e.target.value;
        console.log(this.selected);
        this.update();
      },
      update() {
        if (this.ikey)
          this.putData(this.ikey, this.selected)
        this.emitter.trigger('process');
      }
    },
    mounted() {
      this.selected = this.getData(this.ikey);
    }
    
  }
  
  
  export default class OperatorControl extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VueOpControl;
      this.props = { emitter, ikey: key, readonly };
    }
  }