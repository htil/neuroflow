import PlotTsComponent from './Components/plot_ts.component';
export default class Plot_ts{
    constructor(editor,engine){
        this.editor = editor;
        this.engine = engine;   
    }

    async initialize() {
        var component = new PlotTsComponent();
        this.editor.register(component);
        this.engine.register(component);
        this.node = await component.createNode({plot: 0, num: 0});
        this.editor.addNode(this.node);
        var time = new Date().getTime()/1000;
        var data = [{
            x: [time],
            y: [0],
            mode: 'lines',
            line: {color: '#80CAF6'}
            }];
            var graph = this.node.vueContext.$el.getElementsByClassName('demo_chart')[0];
            var chart2 = new Rickshaw.Graph({
                element: graph,
                width: "600",
                height: "80",
                renderer: "line",
                min: "-1000",
                max: "1000",
                series: new Rickshaw.Series.FixedDuration([{
                    name: 'one',
                    color: '#446CB3'
                }], undefined, {
                    timeInterval: 25,
                    maxDataPoints: 2*256
                })
            });
            var y_ax =  this.node.vueContext.$el.getElementsByClassName('y_axis')[0];
            var y_axis = new Rickshaw.Graph.Axis.Y({
                graph: chart2,
                orientation: 'left',
                tickFormat: function (y) {
                    return y.toFixed(2);
                },
                ticks: 5,
                element: document.getElementById('y_axis'),
            });
          this.node.data.plot = chart2;
         
     }
    
    static async create(editor,engine,window) {
        const o = new Plot_ts(editor,engine);
        await o.initialize(window);
        return o;
     }
    setPosition(x,y){
        this.node.position = [x,y];
    }


}