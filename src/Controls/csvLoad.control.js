var VueCSVControl = {
    props: ['readonly', 'emitter', 'ikey', 'getData', 'putData'],
    template: `<div><input type="file" @change="loadTextFromFile" style="display: inline-block; width: 105px;"> <div class="output-title" style="display: inline-block;">{{value}}</div></div>}`,
    data() {
      return {
        value: 'Empty',
        data: []
      }
    },
    methods: {
        loadTextFromFile(ev) {
            const file = ev.target.files[0];
            const reader = new FileReader();
            reader.readAsText(file);
            reader.onload = (e) => {
                var csv = e.target.result;
                var allTextLines = csv.split(/\r\n|\n|\r/);
        var lines = [];
        for (var i=0; i<allTextLines.length; i++) {
            var data = allTextLines[i].split(',');
                var tarr = [];
                for (var j=0; j<data.length; j++) {
                    tarr.push(data[j]);
                }
                lines.push(tarr);
              }
                this.setData('Loaded',lines);
            };
            
          },
          setData (value,data) {
            this.value = value;
            this.data = data;
            this.update();
        },
      
      update() {
        if (this.ikey)
          this.putData(this.ikey, {value: this.value, data:this.data})
        this.emitter.trigger('process');
      }
    },
    mounted() {
      this.value = this.getData(this.ikey).value;
      this.data = this.getData(this.ikey).data;
    }
    
  }
  
  
  export default class CSVLoader extends Rete.Control {
  
    constructor(emitter, key, readonly) {
      super(key);
      this.component = VueCSVControl;
      this.props = { emitter, ikey: key, readonly };
    }
  
    trigerred() {
      this.vueContext.toggle();
    }
  }