require('babel-polyfill');
import ReteEditor from './ReteEditor';
import components from './Components/components';

    var editor = new ReteEditor();
    var engine = new Rete.Engine('demo@0.1.0');
    editor.start(engine,'process nodecreated noderemoved connectioncreated connectionremoved');
    window.editor = editor;
    window.engine = engine;
    
    //Component Menu wiring----------------------------------------------------------------------------------------------------------------------------------------------------
    
    for(var i in components){

        let className = components[i].class;
        let button = components[i].id;
        document.getElementById(button).onclick = function (){
            var box = className.create(editor.getEditor(),engine,window);
        }
    }
    //-------------------------------------------------------------------------------------------------------------------------------------------------------------------


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
    

