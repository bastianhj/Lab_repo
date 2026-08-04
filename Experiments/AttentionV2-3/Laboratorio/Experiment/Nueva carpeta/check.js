/***************************** 
 * Attention_Exp_Legacy Test *
 *****************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Attention_exp_legacy';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 99)).toFixed(0), 2)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code
var nLoop;
var phase;
var Trials1;
var Trials2;
var Trials;
var loc1;
var loc2;
var loc3;
var loc4;
var locations;
var color1;
var color2;
var color3;
var color4;
var colors;


nLoop = 1;
phase = 1;
Trials1 = 50;
Trials2 = 20;
Trials = (Trials1 + Trials2);
loc1 = [(- 0.67), 0.33];
loc2 = [(- 0.67), 0];
loc3 = [(- 0.67), (- 0.33)];
loc4 = [(- 0.67), (- 0.67)];
locations = [loc1, loc2, loc3, loc4];
util.shuffle(locations);
color1 = [0.9216, 0.7412, 0.4039];
color2 = [0.6471, 0.4118, 0.098];
color3 = [0.4824, 0.4353, (- 0.1608)];
color4 = [1.0, 0.4112, 0.3569];
colors = [color1, color2, color3, color4];
util.shuffle(colors);

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0]),
  units: 'norm',
  waitBlanking: true
});
// schedule the experiment:
psychoJS.schedule(psychoJS.gui.DlgFromDict({
  dictionary: expInfo,
  title: expName
}));

const flowScheduler = new Scheduler(psychoJS);
const dialogCancelScheduler = new Scheduler(psychoJS);
psychoJS.scheduleCondition(function() { return (psychoJS.gui.dialogComponent.button === 'OK'); }, flowScheduler, dialogCancelScheduler);

// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo); // add timeStamp
flowScheduler.add(experimentInit);
flowScheduler.add(IntroRoutineBegin());
flowScheduler.add(IntroRoutineEachFrame());
flowScheduler.add(IntroRoutineEnd());
flowScheduler.add(Blank2RoutineBegin());
flowScheduler.add(Blank2RoutineEachFrame());
flowScheduler.add(Blank2RoutineEnd());
const trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);
flowScheduler.add(EndRoutineBegin());
flowScheduler.add(EndRoutineEachFrame());
flowScheduler.add(EndRoutineEnd());
flowScheduler.add(quitPsychoJS, '', true);

// quit if user presses Cancel in dialog box:
dialogCancelScheduler.add(quitPsychoJS, '', false);

psychoJS.start({
  expName: expName,
  expInfo: expInfo,
  resources: [
    // resources:
    {'name': 'DataCHP.csv', 'path': 'DataCHP.csv'},
    {'name': 'Images_Attention/StartButton.jpg', 'path': 'Images_Attention/StartButton.jpg'},
    {'name': 'Images_Attention/response_Bus.jpg', 'path': 'Images_Attention/response_Bus.jpg'},
    {'name': 'Images_Attention/response_Metro.jpg', 'path': 'Images_Attention/response_Metro.jpg'},
    {'name': 'Images_Attention/response_RH.jpg', 'path': 'Images_Attention/response_RH.jpg'},
    {'name': 'Images_Attention/response_None.jpg', 'path': 'Images_Attention/response_None.jpg'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);


var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;  // right now there are no loops
  expInfo['date'] = util.MonotonicClock.getDateStr();  // add a simple timestamp
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.0';
  expInfo['OS'] = window.navigator.platform;


  // store frame rate of monitor if we can measure it successfully
  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  

  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);


  return Scheduler.Event.NEXT;
}


var IntroClock;
var Intro;
var Attributes;
var ButtonIntro;
var StartButton;
var mouse_2;
var Blank2Clock;
var Starting_title;
var One_title;
var Two_title;
var Three_title;
var trialClock;
var Color1;
var Color2;
var Color3;
var Color4;
var Bus_label;
var Metro_label;
var RH_label;
var None_2;
var Cost_bus;
var Cost_metro;
var Cost_RH;
var Time_bus;
var Time_metro;
var Time_RH;
var Comfort_bus;
var Comfort_metro;
var Comfort_RH;
var CO2_bus;
var CO2_metro;
var CO2_RH;
var Cost_label;
var Time_label;
var Comfort_label;
var CO2_label;
var mouse;
var pid;
var useRows;
var locations2;
var phaseit;
var blankClock;
var text;
var EndClock;
var Msg;
var globalClock;
var routineTimer;
async function experimentInit() {
  // Initialize components for Routine "Intro"
  IntroClock = new util.Clock();
  Intro = new visual.TextStim({
    win: psychoJS.window,
    name: 'Intro',
    text: "You must make a trip to your work place, and you'll have to choose between three ways to do it, or not taking any of these. Each one have different characteristics that will be shown below. Choose the alternative that suits you better.",
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.7], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  Attributes = new visual.TextStim({
    win: psychoJS.window,
    name: 'Attributes',
    text: 'The Attributes are:\nCost: How much does it cost (in USD).\nTime: The length of the travel (in minutes).\nComfort: How comfort the travel will be (0 to 5 stars).\nCO2 Emissions: How many trees does it need to compensate the CO2 Emissions. More trees, more contaminating it is.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.3], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  ButtonIntro = new visual.TextStim({
    win: psychoJS.window,
    name: 'ButtonIntro',
    text: 'To start, press the button down below.',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  StartButton = new visual.ImageStim({
    win : psychoJS.window,
    name : 'StartButton', units : undefined, 
    image : 'Images_Attention/StartButton.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, (- 0.3)], size : [0.25, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  mouse_2 = new core.Mouse({
    win: psychoJS.window,
  });
  mouse_2.mouseClock = new util.Clock();
  // Initialize components for Routine "Blank2"
  Blank2Clock = new util.Clock();
  Starting_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'Starting_title',
    text: 'Starting in...',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0.25], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  One_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'One_title',
    text: '1',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -1.0 
  });
  
  Two_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'Two_title',
    text: '2',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -2.0 
  });
  
  Three_title = new visual.TextStim({
    win: psychoJS.window,
    name: 'Three_title',
    text: '3',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -3.0 
  });
  
  // Initialize components for Routine "trial"
  trialClock = new util.Clock();
  Color1 = new visual.Rect ({
    win: psychoJS.window, name: 'Color1', units : 'norm', 
    width: [1.8, 0.125][0], height: [1.8, 0.125][1],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color(undefined),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: 0, interpolate: true,
  });
  
  Color2 = new visual.Rect ({
    win: psychoJS.window, name: 'Color2', units : 'norm', 
    width: [1.8, 0.125][0], height: [1.8, 0.125][1],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color(undefined),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  
  Color3 = new visual.Rect ({
    win: psychoJS.window, name: 'Color3', units : 'norm', 
    width: [1.8, 0.125][0], height: [1.8, 0.125][1],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color(undefined),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -2, interpolate: true,
  });
  
  Color4 = new visual.Rect ({
    win: psychoJS.window, name: 'Color4', units : 'norm', 
    width: [1.8, 0.125][0], height: [1.8, 0.125][1],
    ori: 0.0, pos: [0, 0],
    anchor: 'center',
    lineWidth: 1.0, 
    colorSpace: 'rgb',
    lineColor: new util.Color(undefined),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  Bus_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Bus_label', units : 'norm', 
    image : 'Images_Attention/response_Bus.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [(- 0.33), 0.67], size : [0.25, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  Metro_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Metro_label', units : 'norm', 
    image : 'Images_Attention/response_Metro.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0, 0.67], size : [0.25, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  RH_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'RH_label', units : 'norm', 
    image : 'Images_Attention/response_RH.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.33, 0.67], size : [0.25, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  None_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'None_2', units : 'norm', 
    image : 'Images_Attention/response_None.jpg', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [0.67, 0.67], size : [0.25, 0.1],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  Cost_bus = new visual.TextBox({
    win: psychoJS.window,
    name: 'Cost_bus',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -8.0 
  });
  
  Cost_metro = new visual.TextBox({
    win: psychoJS.window,
    name: 'Cost_metro',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -9.0 
  });
  
  Cost_RH = new visual.TextBox({
    win: psychoJS.window,
    name: 'Cost_RH',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -10.0 
  });
  
  Time_bus = new visual.TextBox({
    win: psychoJS.window,
    name: 'Time_bus',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -11.0 
  });
  
  Time_metro = new visual.TextBox({
    win: psychoJS.window,
    name: 'Time_metro',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -12.0 
  });
  
  Time_RH = new visual.TextBox({
    win: psychoJS.window,
    name: 'Time_RH',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -13.0 
  });
  
  Comfort_bus = new visual.TextBox({
    win: psychoJS.window,
    name: 'Comfort_bus',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -14.0 
  });
  
  Comfort_metro = new visual.TextBox({
    win: psychoJS.window,
    name: 'Comfort_metro',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -15.0 
  });
  
  Comfort_RH = new visual.TextBox({
    win: psychoJS.window,
    name: 'Comfort_RH',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -16.0 
  });
  
  CO2_bus = new visual.TextBox({
    win: psychoJS.window,
    name: 'CO2_bus',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -17.0 
  });
  
  CO2_metro = new visual.TextBox({
    win: psychoJS.window,
    name: 'CO2_metro',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -18.0 
  });
  
  CO2_RH = new visual.TextBox({
    win: psychoJS.window,
    name: 'CO2_RH',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -19.0 
  });
  
  Cost_label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Cost_label',
    text: 'Cost\n(US)',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -20.0 
  });
  
  Time_label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Time_label',
    text: 'Time\n(min)',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -21.0 
  });
  
  Comfort_label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Comfort_label',
    text: 'Comfort\n(0 to 5 stars)',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -22.0 
  });
  
  CO2_label = new visual.TextBox({
    win: psychoJS.window,
    name: 'CO2_label',
    text: 'CO2\nEmissions',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.2, 0.1],  units: 'norm', 
    color: 'white', colorSpace: 'rgb',
    fillColor: undefined, borderColor: undefined,
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: -23.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Run 'Begin Experiment' code from code
  pid = Number.parseInt(expInfo["participant"]);
  useRows = (((Trials * (pid - 1)).toString() + ":") + ((Trials * (pid - 1)) + Trials).toString());
  locations2 = [loc1, loc2, loc3, loc4];
  util.shuffle(locations2);
  while ((locations === locations2)) {
      util.shuffle(locations2);
  }
  phaseit = 0;
  
  // Initialize components for Routine "blank"
  blankClock = new util.Clock();
  text = new visual.TextStim({
    win: psychoJS.window,
    name: 'text',
    text: '',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, 0], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: 0.0 
  });
  
  // Initialize components for Routine "End"
  EndClock = new util.Clock();
  Msg = new visual.TextBox({
    win: psychoJS.window,
    name: 'Msg',
    text: 'Thanks for participating!',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.5, 0.2],  units: undefined, 
    color: 'Gray', colorSpace: 'rgb',
    fillColor: 'white', borderColor: 'white',
    languageStyle: 'LTR',
    bold: false, italic: false,
    opacity: undefined,
    padding: 0.0,
    alignment: 'center',
    overflow: 'visible',
    editable: false,
    multiline: true,
    anchor: 'center',
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  return Scheduler.Event.NEXT;
}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var clicked_things1;
var clickables1;
var waiting1;
var IntroComponents;
function IntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Intro' ---
    t = 0;
    IntroClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    // setup some python lists for storing info about the mouse_2
    // current position of the mouse:
    mouse_2.x = [];
    mouse_2.y = [];
    mouse_2.leftButton = [];
    mouse_2.midButton = [];
    mouse_2.rightButton = [];
    mouse_2.time = [];
    mouse_2.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from code_4
    clicked_things1 = [];
    clickables1 = [StartButton];
    waiting1 = false;
    
    // keep track of which components have finished
    IntroComponents = [];
    IntroComponents.push(Intro);
    IntroComponents.push(Attributes);
    IntroComponents.push(ButtonIntro);
    IntroComponents.push(StartButton);
    IntroComponents.push(mouse_2);
    
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var prevButtonState;
var _mouseButtons;
var _mouseXYs;
var _pj;
var clickedNum;
function IntroRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Intro' ---
    // get current time
    t = IntroClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Intro* updates
    if (t >= 0.0 && Intro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Intro.tStart = t;  // (not accounting for frame time here)
      Intro.frameNStart = frameN;  // exact frame index
      
      Intro.setAutoDraw(true);
    }

    
    // *Attributes* updates
    if (t >= 0.0 && Attributes.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Attributes.tStart = t;  // (not accounting for frame time here)
      Attributes.frameNStart = frameN;  // exact frame index
      
      Attributes.setAutoDraw(true);
    }

    
    // *ButtonIntro* updates
    if (t >= 0.0 && ButtonIntro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ButtonIntro.tStart = t;  // (not accounting for frame time here)
      ButtonIntro.frameNStart = frameN;  // exact frame index
      
      ButtonIntro.setAutoDraw(true);
    }

    
    // *StartButton* updates
    if (t >= 0.0 && StartButton.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      StartButton.tStart = t;  // (not accounting for frame time here)
      StartButton.frameNStart = frameN;  // exact frame index
      
      StartButton.setAutoDraw(true);
    }

    // *mouse_2* updates
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse_2.tStart = t;  // (not accounting for frame time here)
      mouse_2.frameNStart = frameN;  // exact frame index
      
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse_2.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [StartButton]) {
            if (obj.contains(mouse_2)) {
              gotValidClick = true;
              mouse_2.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouse_2.getPos();
          mouse_2.x.push(_mouseXYs[0]);
          mouse_2.y.push(_mouseXYs[1]);
          mouse_2.leftButton.push(_mouseButtons[0]);
          mouse_2.midButton.push(_mouseButtons[1]);
          mouse_2.rightButton.push(_mouseButtons[2]);
          mouse_2.time.push(mouse_2.mouseClock.getTime());
        }
      }
    }
    // Run 'Each Frame' code from code_4
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    clickedNum = 0;
    for (var clickable, _pj_c = 0, _pj_a = clickables1, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        clickable = _pj_a[_pj_c];
        if (mouse.isPressedIn(clickable)) {
            clicked_things1.push(clickable.name);
        }
    }
    for (var clickable, _pj_c = 0, _pj_a = clickables1, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        clickable = _pj_a[_pj_c];
        if (_pj.in_es6(clickable.name, clicked_things1)) {
            clickedNum += 1;
        }
        if (((clickedNum === 1) && (! waiting1))) {
            waiting1 = true;
        }
    }
    if (((clickedNum === 1) && waiting1)) {
        continueRoutine = false;
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function IntroRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Intro' ---
    for (const thisComponent of IntroComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouse_2.x', mouse_2.x);
    psychoJS.experiment.addData('mouse_2.y', mouse_2.y);
    psychoJS.experiment.addData('mouse_2.leftButton', mouse_2.leftButton);
    psychoJS.experiment.addData('mouse_2.midButton', mouse_2.midButton);
    psychoJS.experiment.addData('mouse_2.rightButton', mouse_2.rightButton);
    psychoJS.experiment.addData('mouse_2.time', mouse_2.time);
    psychoJS.experiment.addData('mouse_2.clicked_name', mouse_2.clicked_name);
    
    // the Routine "Intro" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var Blank2Components;
function Blank2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'Blank2' ---
    t = 0;
    Blank2Clock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(4.000000);
    // update component parameters for each repeat
    // keep track of which components have finished
    Blank2Components = [];
    Blank2Components.push(Starting_title);
    Blank2Components.push(One_title);
    Blank2Components.push(Two_title);
    Blank2Components.push(Three_title);
    
    for (const thisComponent of Blank2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var frameRemains;
function Blank2RoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'Blank2' ---
    // get current time
    t = Blank2Clock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Starting_title* updates
    if (t >= 0.0 && Starting_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Starting_title.tStart = t;  // (not accounting for frame time here)
      Starting_title.frameNStart = frameN;  // exact frame index
      
      Starting_title.setAutoDraw(true);
    }

    frameRemains = 0.0 + 4.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Starting_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Starting_title.setAutoDraw(false);
    }
    
    // *One_title* updates
    if (t >= 3.0 && One_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      One_title.tStart = t;  // (not accounting for frame time here)
      One_title.frameNStart = frameN;  // exact frame index
      
      One_title.setAutoDraw(true);
    }

    frameRemains = 3.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (One_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      One_title.setAutoDraw(false);
    }
    
    // *Two_title* updates
    if (t >= 2.0 && Two_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Two_title.tStart = t;  // (not accounting for frame time here)
      Two_title.frameNStart = frameN;  // exact frame index
      
      Two_title.setAutoDraw(true);
    }

    frameRemains = 2.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Two_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Two_title.setAutoDraw(false);
    }
    
    // *Three_title* updates
    if (t >= 1.0 && Three_title.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Three_title.tStart = t;  // (not accounting for frame time here)
      Three_title.frameNStart = frameN;  // exact frame index
      
      Three_title.setAutoDraw(true);
    }

    frameRemains = 1.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Three_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Three_title.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of Blank2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function Blank2RoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'Blank2' ---
    for (const thisComponent of Blank2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var trials;
function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'DataCHP.csv', useRows),
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials); // add the loop to the experiment
    currentLoop = trials;  // we're now the current loop
    
    // Schedule all the trials in the trialList:
    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(blankRoutineBegin(snapshot));
      trialsLoopScheduler.add(blankRoutineEachFrame());
      trialsLoopScheduler.add(blankRoutineEnd(snapshot));
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    
    return Scheduler.Event.NEXT;
  }
}


async function trialsLoopEnd() {
  // terminate loop
  psychoJS.experiment.removeLoop(trials);
  // update the current loop from the ExperimentHandler
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;  // so we use addData from the experiment
  return Scheduler.Event.NEXT;
}


function trialsLoopEndIteration(scheduler, snapshot) {
  // ------Prepare for next entry------
  return async function () {
    if (typeof snapshot !== 'undefined') {
      // ------Check if user ended loop early------
      if (snapshot.finished) {
        // Check for and save orphaned data
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        psychoJS.experiment.nextEntry(snapshot);
      }
    return Scheduler.Event.NEXT;
    }
  };
}


var bkgcolor;
var clicked_things;
var clickables;
var waiting;
var trialComponents;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    Color1.setFillColor(new util.Color(colors[0]));
    Color1.setPos([0, locations[0][1]]);
    Color2.setFillColor(new util.Color(colors[1]));
    Color2.setPos([0, locations[1][1]]);
    Color3.setFillColor(new util.Color(colors[2]));
    Color3.setPos([0, locations[2][1]]);
    Color4.setFillColor(new util.Color(colors[3]));
    Color4.setPos([0, locations[3][1]]);
    Cost_bus.setPos([(- 0.33), locations[0][1]]);
    Cost_bus.setText('');
    Cost_metro.setPos([0, locations[0][1]]);
    Cost_metro.setText('');
    Cost_RH.setPos([0.33, locations[0][1]]);
    Cost_RH.setText('');
    Time_bus.setPos([(- 0.33), locations[1][1]]);
    Time_bus.setText('');
    Time_metro.setPos([0, locations[1][1]]);
    Time_metro.setText('');
    Time_RH.setPos([0.33, locations[1][1]]);
    Time_RH.setText('');
    Comfort_bus.setPos([(- 0.33), locations[2][1]]);
    Comfort_bus.setText('');
    Comfort_metro.setPos([0, locations[2][1]]);
    Comfort_metro.setText('');
    Comfort_RH.setPos([0.33, locations[2][1]]);
    Comfort_RH.setText('');
    CO2_bus.setPos([(- 0.33), locations[3][1]]);
    CO2_bus.setText('');
    CO2_metro.setPos([0, locations[3][1]]);
    CO2_metro.setText('');
    CO2_RH.setPos([0.33, locations[3][1]]);
    CO2_RH.setText('');
    Cost_label.setPos([locations[0][0], locations[0][1]]);
    Time_label.setPos([locations[1][0], locations[1][1]]);
    Comfort_label.setPos([locations[2][0], locations[2][1]]);
    CO2_label.setPos([locations[3][0], locations[3][1]]);
    // setup some python lists for storing info about the mouse
    // current position of the mouse:
    mouse.x = [];
    mouse.y = [];
    mouse.leftButton = [];
    mouse.midButton = [];
    mouse.rightButton = [];
    mouse.time = [];
    mouse.clicked_name = [];
    gotValidClick = false; // until a click is received
    // Run 'Begin Routine' code from code
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.setColor(bkgcolor);
    clicked_things = [];
    clickables = [Bus_label, Metro_label, RH_label, None_2];
    waiting = false;
    Cost_bus.text = Bus_cost;
    Time_bus.text = Bus_travel_time;
    Comfort_bus.text = Bus_Comfort;
    CO2_bus.text = Bus_CO2;
    Cost_metro.text = metro_cost;
    Time_metro.text = metro_travel_time;
    Comfort_metro.text = metro_Comfort;
    CO2_metro.text = metro_CO2;
    Cost_RH.text = RH_cost;
    Time_RH.text = RH_travel_time;
    Comfort_RH.text = RH_Comfort;
    CO2_RH.text = RH_CO2;
    
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(Color1);
    trialComponents.push(Color2);
    trialComponents.push(Color3);
    trialComponents.push(Color4);
    trialComponents.push(Bus_label);
    trialComponents.push(Metro_label);
    trialComponents.push(RH_label);
    trialComponents.push(None_2);
    trialComponents.push(Cost_bus);
    trialComponents.push(Cost_metro);
    trialComponents.push(Cost_RH);
    trialComponents.push(Time_bus);
    trialComponents.push(Time_metro);
    trialComponents.push(Time_RH);
    trialComponents.push(Comfort_bus);
    trialComponents.push(Comfort_metro);
    trialComponents.push(Comfort_RH);
    trialComponents.push(CO2_bus);
    trialComponents.push(CO2_metro);
    trialComponents.push(CO2_RH);
    trialComponents.push(Cost_label);
    trialComponents.push(Time_label);
    trialComponents.push(Comfort_label);
    trialComponents.push(CO2_label);
    trialComponents.push(mouse);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


var clickedN;
function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Color1* updates
    if (t >= 0.0 && Color1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Color1.tStart = t;  // (not accounting for frame time here)
      Color1.frameNStart = frameN;  // exact frame index
      
      Color1.setAutoDraw(true);
    }

    
    // *Color2* updates
    if (t >= 0.0 && Color2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Color2.tStart = t;  // (not accounting for frame time here)
      Color2.frameNStart = frameN;  // exact frame index
      
      Color2.setAutoDraw(true);
    }

    
    // *Color3* updates
    if (t >= 0.0 && Color3.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Color3.tStart = t;  // (not accounting for frame time here)
      Color3.frameNStart = frameN;  // exact frame index
      
      Color3.setAutoDraw(true);
    }

    
    // *Color4* updates
    if (t >= 0.0 && Color4.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Color4.tStart = t;  // (not accounting for frame time here)
      Color4.frameNStart = frameN;  // exact frame index
      
      Color4.setAutoDraw(true);
    }

    
    // *Bus_label* updates
    if (t >= 0.0 && Bus_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Bus_label.tStart = t;  // (not accounting for frame time here)
      Bus_label.frameNStart = frameN;  // exact frame index
      
      Bus_label.setAutoDraw(true);
    }

    
    // *Metro_label* updates
    if (t >= 0.0 && Metro_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Metro_label.tStart = t;  // (not accounting for frame time here)
      Metro_label.frameNStart = frameN;  // exact frame index
      
      Metro_label.setAutoDraw(true);
    }

    
    // *RH_label* updates
    if (t >= 0.0 && RH_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      RH_label.tStart = t;  // (not accounting for frame time here)
      RH_label.frameNStart = frameN;  // exact frame index
      
      RH_label.setAutoDraw(true);
    }

    
    // *None_2* updates
    if (t >= 0.0 && None_2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      None_2.tStart = t;  // (not accounting for frame time here)
      None_2.frameNStart = frameN;  // exact frame index
      
      None_2.setAutoDraw(true);
    }

    
    // *Cost_bus* updates
    if (t >= 0.0 && Cost_bus.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Cost_bus.tStart = t;  // (not accounting for frame time here)
      Cost_bus.frameNStart = frameN;  // exact frame index
      
      Cost_bus.setAutoDraw(true);
    }

    
    // *Cost_metro* updates
    if (t >= 0.0 && Cost_metro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Cost_metro.tStart = t;  // (not accounting for frame time here)
      Cost_metro.frameNStart = frameN;  // exact frame index
      
      Cost_metro.setAutoDraw(true);
    }

    
    // *Cost_RH* updates
    if (t >= 0.0 && Cost_RH.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Cost_RH.tStart = t;  // (not accounting for frame time here)
      Cost_RH.frameNStart = frameN;  // exact frame index
      
      Cost_RH.setAutoDraw(true);
    }

    
    // *Time_bus* updates
    if (t >= 0.0 && Time_bus.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Time_bus.tStart = t;  // (not accounting for frame time here)
      Time_bus.frameNStart = frameN;  // exact frame index
      
      Time_bus.setAutoDraw(true);
    }

    
    // *Time_metro* updates
    if (t >= 0.0 && Time_metro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Time_metro.tStart = t;  // (not accounting for frame time here)
      Time_metro.frameNStart = frameN;  // exact frame index
      
      Time_metro.setAutoDraw(true);
    }

    
    // *Time_RH* updates
    if (t >= 0.0 && Time_RH.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Time_RH.tStart = t;  // (not accounting for frame time here)
      Time_RH.frameNStart = frameN;  // exact frame index
      
      Time_RH.setAutoDraw(true);
    }

    
    // *Comfort_bus* updates
    if (t >= 0.0 && Comfort_bus.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Comfort_bus.tStart = t;  // (not accounting for frame time here)
      Comfort_bus.frameNStart = frameN;  // exact frame index
      
      Comfort_bus.setAutoDraw(true);
    }

    
    // *Comfort_metro* updates
    if (t >= 0.0 && Comfort_metro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Comfort_metro.tStart = t;  // (not accounting for frame time here)
      Comfort_metro.frameNStart = frameN;  // exact frame index
      
      Comfort_metro.setAutoDraw(true);
    }

    
    // *Comfort_RH* updates
    if (t >= 0.0 && Comfort_RH.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Comfort_RH.tStart = t;  // (not accounting for frame time here)
      Comfort_RH.frameNStart = frameN;  // exact frame index
      
      Comfort_RH.setAutoDraw(true);
    }

    
    // *CO2_bus* updates
    if (t >= 0.0 && CO2_bus.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CO2_bus.tStart = t;  // (not accounting for frame time here)
      CO2_bus.frameNStart = frameN;  // exact frame index
      
      CO2_bus.setAutoDraw(true);
    }

    
    // *CO2_metro* updates
    if (t >= 0.0 && CO2_metro.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CO2_metro.tStart = t;  // (not accounting for frame time here)
      CO2_metro.frameNStart = frameN;  // exact frame index
      
      CO2_metro.setAutoDraw(true);
    }

    
    // *CO2_RH* updates
    if (t >= 0.0 && CO2_RH.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CO2_RH.tStart = t;  // (not accounting for frame time here)
      CO2_RH.frameNStart = frameN;  // exact frame index
      
      CO2_RH.setAutoDraw(true);
    }

    
    // *Cost_label* updates
    if (t >= 0.0 && Cost_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Cost_label.tStart = t;  // (not accounting for frame time here)
      Cost_label.frameNStart = frameN;  // exact frame index
      
      Cost_label.setAutoDraw(true);
    }

    
    // *Time_label* updates
    if (t >= 0.0 && Time_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Time_label.tStart = t;  // (not accounting for frame time here)
      Time_label.frameNStart = frameN;  // exact frame index
      
      Time_label.setAutoDraw(true);
    }

    
    // *Comfort_label* updates
    if (t >= 0.0 && Comfort_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Comfort_label.tStart = t;  // (not accounting for frame time here)
      Comfort_label.frameNStart = frameN;  // exact frame index
      
      Comfort_label.setAutoDraw(true);
    }

    
    // *CO2_label* updates
    if (t >= 0.0 && CO2_label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      CO2_label.tStart = t;  // (not accounting for frame time here)
      CO2_label.frameNStart = frameN;  // exact frame index
      
      CO2_label.setAutoDraw(true);
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      mouse.tStart = t;  // (not accounting for frame time here)
      mouse.frameNStart = frameN;  // exact frame index
      
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();  // if button is down already this ISN'T a new click
      }
    if (mouse.status === PsychoJS.Status.STARTED) {  // only update if started and not finished!
      _mouseButtons = mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { // button state changed?
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { // state changed to a new click
          // check if the mouse was inside our 'clickable' objects
          gotValidClick = false;
          for (const obj of [Bus_label,Metro_label,RH_label,None_2]) {
            if (obj.contains(mouse)) {
              gotValidClick = true;
              mouse.clicked_name.push(obj.name)
            }
          }
          _mouseXYs = mouse.getPos();
          mouse.x.push(_mouseXYs[0]);
          mouse.y.push(_mouseXYs[1]);
          mouse.leftButton.push(_mouseButtons[0]);
          mouse.midButton.push(_mouseButtons[1]);
          mouse.rightButton.push(_mouseButtons[2]);
          mouse.time.push(mouse.mouseClock.getTime());
        }
      }
    }
    // Run 'Each Frame' code from code
    var _pj;
    function _pj_snippets(container) {
        function in_es6(left, right) {
            if (((right instanceof Array) || ((typeof right) === "string"))) {
                return (right.indexOf(left) > (- 1));
            } else {
                if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
                    return right.has(left);
                } else {
                    return (left in right);
                }
            }
        }
        container["in_es6"] = in_es6;
        return container;
    }
    _pj = {};
    _pj_snippets(_pj);
    clickedN = 0;
    for (var clickable, _pj_c = 0, _pj_a = clickables, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        clickable = _pj_a[_pj_c];
        if (mouse.isPressedIn(clickable)) {
            clicked_things.push(clickable.name);
        }
    }
    for (var clickable, _pj_c = 0, _pj_a = clickables, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
        clickable = _pj_a[_pj_c];
        if (_pj.in_es6(clickable.name, clicked_things)) {
            clickedN += 1;
            choice = clickable.name;
        }
        if (((clickedN === 1) && (! waiting))) {
            waiting = true;
            startTime = t;
        }
    }
    if (((clickedN === 1) && waiting)) {
        if ((t > (startTime + 1))) {
            continueRoutine = false;
        }
    }
    
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


var phase;
var locations;
function trialRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'trial' ---
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // store data for psychoJS.experiment (ExperimentHandler)
    psychoJS.experiment.addData('mouse.x', mouse.x);
    psychoJS.experiment.addData('mouse.y', mouse.y);
    psychoJS.experiment.addData('mouse.leftButton', mouse.leftButton);
    psychoJS.experiment.addData('mouse.midButton', mouse.midButton);
    psychoJS.experiment.addData('mouse.rightButton', mouse.rightButton);
    psychoJS.experiment.addData('mouse.time', mouse.time);
    psychoJS.experiment.addData('mouse.clicked_name', mouse.clicked_name);
    
    // Run 'End Routine' code from code
    psychoJS.experiment.addData("Choice", choice);
    psychoJS.experiment.addData("Trial", nLoop);
    if ((nLoop >= Trials1)) {
        phase = 2;
    }
    psychoJS.experiment.addData("Loc_Bus_label", [(- 0.5), 0, 2]);
    psychoJS.experiment.addData("Loc_Metro_label", [(- 0.15), 0, 2]);
    psychoJS.experiment.addData("Loc_RH_label", [0.2, 0, 2]);
    psychoJS.experiment.addData("Loc_None_label", [0.55, 0, 2]);
    psychoJS.experiment.addData("Loc_Cost_label", [locations[0][0], locations[0][1]]);
    psychoJS.experiment.addData("Loc_Travel_label", [locations[1][0], locations[1][1]]);
    psychoJS.experiment.addData("Loc_Comfort_label", [locations[2][0], locations[2][1]]);
    psychoJS.experiment.addData("Loc_CO2_label", [locations[3][0], locations[3][1]]);
    psychoJS.experiment.addData("Loc_Bus_cost", [(- 0.5), locations[0][1]]);
    psychoJS.experiment.addData("Loc_Metro_cost", [(- 0.15), locations[0][1]]);
    psychoJS.experiment.addData("Loc_RH_cost", [0.2, locations[0][1]]);
    psychoJS.experiment.addData("Loc_Bus_travel", [(- 0.5), locations[1][1]]);
    psychoJS.experiment.addData("Loc_Metro_travel", [(- 0.15), locations[1][1]]);
    psychoJS.experiment.addData("Loc_RH_travel", [0.2, locations[1][1]]);
    psychoJS.experiment.addData("Loc_Bus_comfort", [(- 0.5), locations[2][1]]);
    psychoJS.experiment.addData("Loc_Metro_comfort", [(- 0.15), locations[2][1]]);
    psychoJS.experiment.addData("Loc_RH_comfort", [0.2, locations[2][1]]);
    psychoJS.experiment.addData("Loc_Bus_CO2", [(- 0.5), locations[3][1]]);
    psychoJS.experiment.addData("Loc_Metro_CO2", [(- 0.15), locations[3][1]]);
    psychoJS.experiment.addData("Loc_RH_CO2", [0.2, locations[3][1]]);
    psychoJS.experiment.addData("Color_1", colors[0]);
    psychoJS.experiment.addData("Loc_Color_1", [0, locations[0][1]]);
    psychoJS.experiment.addData("Color_2", colors[1]);
    psychoJS.experiment.addData("Loc_Color_2", [0, locations[1][1]]);
    psychoJS.experiment.addData("Color_3", colors[2]);
    psychoJS.experiment.addData("Loc_Color_3", [0, locations[2][1]]);
    psychoJS.experiment.addData("Color_4", colors[3]);
    psychoJS.experiment.addData("Loc_Color_4", [0, locations[3][1]]);
    if (((phase === 2) && (phaseit === 0))) {
        locations = locations2;
        (phaseit === 1);
        console.log(locations, " phase 2");
    }
    nLoop += 1;
    
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var blankComponents;
function blankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'blank' ---
    t = 0;
    blankClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(1.000000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_2
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.setColor(bkgcolor);
    
    // keep track of which components have finished
    blankComponents = [];
    blankComponents.push(text);
    
    for (const thisComponent of blankComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function blankRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'blank' ---
    // get current time
    t = blankClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *text* updates
    if (t >= 0 && text.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      text.tStart = t;  // (not accounting for frame time here)
      text.frameNStart = frameN;  // exact frame index
      
      text.setAutoDraw(true);
    }

    frameRemains = 0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (text.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of blankComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function blankRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'blank' ---
    for (const thisComponent of blankComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


var EndComponents;
function EndRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'End' ---
    t = 0;
    EndClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(2.000000);
    // update component parameters for each repeat
    // Run 'Begin Routine' code from code_3
    bkgcolor = [0, 0, 0.2];
    psychoJS.window.setColor(bkgcolor);
    
    // keep track of which components have finished
    EndComponents = [];
    EndComponents.push(Msg);
    
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}


function EndRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'End' ---
    // get current time
    t = EndClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *Msg* updates
    if (t >= 0.0 && Msg.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Msg.tStart = t;  // (not accounting for frame time here)
      Msg.frameNStart = frameN;  // exact frame index
      
      Msg.setAutoDraw(true);
    }

    frameRemains = 0.0 + 2 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (Msg.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Msg.setAutoDraw(false);
    }
    // check for quit (typically the Esc key)
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    // check if the Routine should terminate
    if (!continueRoutine) {  // a component has requested a forced-end of Routine
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;  // reverts to True if at least one component still running
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    // refresh the screen if continuing
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}


function EndRoutineEnd(snapshot) {
  return async function () {
    //--- Ending Routine 'End' ---
    for (const thisComponent of EndComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
    };
}


async function quitPsychoJS(message, isCompleted) {
  // Check for and save orphaned data
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  
  
  
  
  
  
  
  
  psychoJS.window.close();
  psychoJS.quit({message: message, isCompleted: isCompleted});
  
  return Scheduler.Event.QUIT;
}
