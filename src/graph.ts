import { Chart, ChartDataSets, ChartOptions } from "chart.js";
import { WindowDeclaration, WindowManager } from "./Utility/WindowManager";

// Alpha transparency component in hex
const alpha_component = "88";

// Maximum sliding window size
const WINDOW_SIZE = 64;

/**
 * @class Graph
 *
 * A simple {Chart} wrapper with dynamic dataset handles.
 */
export class Graph {
  ctx: CanvasRenderingContext2D;
  declarations: Array<WindowDeclaration>;
  chart: Chart;
  yMax: number = 0;

  /**
   * @constructor
   *
   * Creates a {Chart} with dynamic handles to datasets.
   *
   * @param {String} id - The ID of the canvas to bind to.
   * @param {String[]} datasets - An array of names of window declarations to use as datasets.
   * @param {String[]} colors - The colors to use on each dataset.
   */
  constructor(id: string, datasets: Array<string>, colors: Array<string>) {
    this.ctx = (<HTMLCanvasElement>document.getElementById(id)).getContext(
      "2d"
    );
    this.declarations = datasets.map(name => WindowManager.fetch(name));

    let ds = datasets.map((name, index) => {
      let cap = name[0].toLocaleUpperCase() + name.substr(1);

      return <ChartDataSets>{
        label: cap,
        xLabels: Array.apply(null, { length: WINDOW_SIZE }).map(
          Number.call,
          Number
        ),
        data: [],
        backgroundColor: "ff0000"
      };
    });

    this.chart = new Chart(this.ctx, {
      type: "bar",
      data: {
        datasets: ds
      },
      options: {
        scales: {
          xAxes: [
            {
              type: "category"
              // labels: []
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                min: 0,
                max: 5000
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  addLabel(label: string) {
    if (!this.chart.data.labels.includes(label)) {
      this.chart.data.labels.push(label);
    }
  }

  addData(data: number, index: number) {
    //console.log(this.chart.data.datasets);
    this.chart.data.datasets.forEach(dataset => {
      //console.log(dataset);
      dataset.data[index] = data;
    });
    /*
    this.chart.data.datasets.forEach((ds, index) => {
      console.log(ds);
    });*/
  }

  quickGraph() {
    let w = WindowManager.fetch("blockly_final");
    let data = w.get();
    let index = 0;
    let dLength = Object.keys(data).length;
    for (let i in data) {
      let label = i.split("_")[0];
      let val = parseInt(data[i]);
      this.addLabel(label);
      this.addData(val, index++);
      if (val > this.yMax) {
        this.yMax = val;
        this.chart.config.options.scales.yAxes[0].ticks.max = val;
      }
      this.chart.update();
    }
  }

  update() {
    let dec = this.declarations;

    this.chart.data.datasets.forEach((ds, index) => {
      let data = dec[index].get();

      if (data.length == 0) return;

      (<number[]>ds.data).push(...dec[index].get());
      if (ds.data.length > WINDOW_SIZE)
        ds.data.splice(0, ds.data.length - WINDOW_SIZE - 1);
      // ds.data = ds.data.slice(ds.data.length - WINDOW_SIZE - 1);
    });

    this.chart.update(<any>0);
  }
}

export default Graph;
