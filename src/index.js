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

    var editor = new ReteEditor();
    console.log("test");
    var engine = new Rete.Engine('demo@0.1.0');
    editor.start(engine,'process nodecreated noderemoved connectioncreated connectionremoved');
    var muse = Muse.create(editor.getEditor(),engine,window);
    var log = Log.create(editor.getEditor(),engine,window);
    var num1 = Num.create(editor.getEditor(),engine,window);
    var num2 = Num.create(editor.getEditor(),engine,window);
    var psd = Psd.create(editor.getEditor(),engine,window);
    var psdb = PsdBandPower.create(editor.getEditor(),engine,window);
    var op = Operator.create(editor.getEditor(),engine,window);
    var op1 = Operator.create(editor.getEditor(),engine,window);
    var op2 = Operator.create(editor.getEditor(),engine,window);
    var ifttt = Ifttt.create(editor.getEditor(),engine,window);
    var pong = PongGame.create(editor.getEditor(),engine,window);
    



