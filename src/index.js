require('babel-polyfill');
import Muse from './Muse';
import ReteEditor from './ReteEditor';
import Log from './Log';
import Num from './Num';
import Psd from './Psd';
import PsdBandPower from './PsdBandPower';
import Operator from './Operator';
import Ifttt from './Ifttt';
import PongGame from './pongGame';
import Plot_ts from './Plot_ts';

    var editor = new ReteEditor();
    var engine = new Rete.Engine('demo@0.1.0');
    editor.start(engine,'process nodecreated noderemoved connectioncreated connectionremoved');
    
    
    document.getElementById('muse').onclick = function (){
        var muse = Muse.create(editor.getEditor(),engine,window);
    }
    document.getElementById('logconsole').onclick = function (){
        var log = Log.create(editor.getEditor(),engine,window);
    }
    document.getElementById('number').onclick = function (){
        var num1 = Num.create(editor.getEditor(),engine,window);
    }
    document.getElementById('psd').onclick = function (){
        var psd = Psd.create(editor.getEditor(),engine,window);
    }
    document.getElementById('psd_bp').onclick = function (){
        var psdb = PsdBandPower.create(editor.getEditor(),engine,window);
    }
    document.getElementById('operator').onclick = function (){
        var op = Operator.create(editor.getEditor(),engine,window);
    }
    document.getElementById('ifttt').onclick = function (){
        var ifttt = Ifttt.create(editor.getEditor(),engine,window);
    }
    document.getElementById('plot_ts').onclick = function (){
        var plot = Plot_ts.create(editor.getEditor(),engine,window);
    }
    





    //Tool Menu Wiring-----------------------------------------------------------------------------------------------------------------------------------------------

    var btn = document.getElementById('tool_btn');
    btn.onclick = function(){
        
        var state = btn.dataset.toggle;
        if(state == 'open'){
            btn.dataset.toggle = 'closed';
            var i;
            var menu = document.getElementsByClassName('tool_menu');
            for(i =0; i<menu.length;i++){
                menu[i].style.display = "none";
            }
            btn.innerHTML =`<i class="material-icons">add</i>`;
        }
        else{
            btn.dataset.toggle = 'open';
            var i;
            var menu = document.getElementsByClassName('tool_menu');
          
            for(i =0; i<menu.length;i++){
                menu[i].style.display = "block";
                if(i==0){
                    menu[i].style.left ='100px';
                    console.log(menu[i]);
                }
                else{
                    console.log(menu[i-1].style.left + menu[i].offsetWidth);
                    menu[i].style.left = (parseInt(menu[i-1].style.left,10) + menu[i-1].offsetWidth + 15) +'px';
                }
            }
            btn.innerHTML= `<i class="material-icons">keyboard_arrow_left</i>`;
        }
    }

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------
    

