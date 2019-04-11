import muse from './Muse';
import log from './Log';
import num from './Num';
import psd from './psd';
import psdBandPower from './psdBandPower';
import operator from './Operator';
import ifttt from './Ifttt';
import pongGame from './pongGame';
import plot_ts from './Plot_ts';
import simSig from './simSig';
import csvLoad from './csvLoad';
import buffer from './buffer';
import avgBandPower from './avgBandPower';
import confusionMatrix from './confusionMatrix';
import cspLearn from './cspLearn';
import cspProject from './cspProject';
import f1 from './f1';
import ldaLearn from './ldaLearn';
import ldaProject from './ldaProject';
import fastICA from './fastICA';
import mcc from './mcc';
import signalBandPower from './signalBandPower';
import specificity from './specificity';
import transpose from './transpose';
import graph from './graph';
import video from './video';

var components = [
    {class: muse, id:'muse'},
    {class: log, id:'logconsole'},
    {class: num, id:'number'},
    {class: psd, id:'psd'},
    {class: psdBandPower, id:'psd_bp'},
    {class: operator, id:'operator'},
    {class: ifttt, id:'ifttt'},
    {class: pongGame, id:'pong'},
    {class: plot_ts, id:'plot_ts'},
    {class: simSig, id:'simsig'},
    {class: csvLoad, id:'csv'},
    {class: buffer, id:'buffer'},
    {class: avgBandPower, id:'avg_bp'},
    {class: confusionMatrix, id:'conf_mat'},
    {class: cspLearn, id:'cspLearn'},
    {class: cspProject, id:'cspProject'},
    {class: f1, id:'f1'},
    {class: ldaLearn, id:'ldaLearn'},
    {class: ldaProject, id:'ldaProject'},
    {class: fastICA, id:'fastICA'},
    {class: mcc, id:'mcc'},
    {class: signalBandPower, id: 'sig_bp'},
    {class: specificity, id:'specificity'},
    {class: transpose, id: 'transpose'},
    {class: graph, id: 'graph'},
    {class: video, id: 'video'}
];

export default components;
