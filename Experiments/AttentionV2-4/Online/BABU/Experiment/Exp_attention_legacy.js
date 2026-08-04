/********************* 
 * Transports-BU_Legacy Test *
 *********************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Transports-BU';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 45)).toFixed(0), 2)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// declared variables
var nLoop;
var phase;
var nextShuffleTrial = util.randint(1, 11); 
var lastPhase = 1;
var snapshot;
var Trials1;
var Trials2;
var Trials3;
var Trialsmid;
var Trials;
var choice;
var startTime;
var show_text_duration;
var no_text_duration;
var TextB;
var ETGAZExT;
var ETGAZENF;
var ETGAZENEWT;
var ETGAZENEWTINS;

var Recurrency;
var mouse_delay;
var last_click_time;
var distance_sepx1;
var distance_sepy;
var distance_sepx2;
var xcoord1, xcoord2, xcoord3, xcoord4;
var ycoord1, ycoord2, ycoord3, ycoord4, ycoord5;
var xsizele, ysizele, xsizela, ysizela;
var loc1, loc2, loc3, loc4, locations;
var color1, color2, color3, color4, colors;
var min_wait_duration = 0.5;

//variables
nLoop = 1;
phase = 1;
Trials1 = 100; 
Trials2 = 100; 
Trials3 = 100;
Trialsmid = (Trials1 + Trials2);
Trials = (Trialsmid + Trials3); // Corresponds to Trials1+Trials2+Trials3
Recurrency = 5; // How often to shuffle attributes in phase 2

mouse_delay = 0.5;
last_click_time = (- mouse_delay);


distance_sepx1 = 0.25;
distance_sepy = 0.3;
distance_sepx2 = ((distance_sepx1 * 2) + distance_sepx1);
xcoord1 = (- distance_sepx2);      // Attribute labels column
xcoord2 = (- distance_sepx1);      // Bus column
xcoord3 = distance_sepx1;          // Metro column
xcoord4 = distance_sepx2;          // RH column

xsizele = 0.2; // Element width (attributes)
ysizele = 0.1; // Element height
xsizela = 0.25;// Label width (transport options)
ysizela = 0.1; // Label height

ycoord1 = (2 * distance_sepy);     // Transport labels row
ycoord2 = distance_sepy;           // Attribute row 1
ycoord3 = 0;                       // Attribute row 2
ycoord4 = (- distance_sepy);       // Attribute row 3
ycoord5 = ((- 2) * distance_sepy); // Attribute row 4

loc1 = [xcoord1, ycoord2];
loc2 = [xcoord1, ycoord3];
loc3 = [xcoord1, ycoord4];
loc4 = [xcoord1, ycoord5];
locations = [loc1, loc2, loc3, loc4];
util.shuffle(locations);


var ieyMouse, ieyStatusTxt;
var state  = 0;
var StartTimeRoutine;

color1 = [0.8216, 0.7412, 0.2039];
color2 = [0.6471, 0.4118, 0.098];
color3 = [0.4824, 0.4353, (- 0.1608)];
color4 = [1.0, 0.4112, 0.3569];
colors = [color1, color2, color3, color4];
util.shuffle(colors);

show_text_duration = 8.0;
no_text_duration = 0.5;

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0,0,0.3]),
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
flowScheduler.add(updateInfo);
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
    {'name': 'Images_Attention/StartButton.png', 'path': 'Images_Attention/StartButton.png'},
    {'name': 'Images_Attention/response_Bus.png', 'path': 'Images_Attention/response_Bus.png'},
    {'name': 'Images_Attention/response_Metro.png', 'path': 'Images_Attention/response_Metro.png'},
    {'name': 'Images_Attention/response_RH.png', 'path': 'Images_Attention/response_RH.png'},
    {'name': 'Images_Attention/response_None.png', 'path': 'Images_Attention/response_None.png'},
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
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0; // couldn't get a reliable measure so guess

  // add info from the URL:
  util.addInfoFromUrl(expInfo);
  
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);

  return Scheduler.Event.NEXT;
}

// Global variables for routines
var globalClock;
var routineTimer;
var IntroClock;
var Intro, Attributes, ButtonIntro, StartButton, mouse_2;
var ContinueButton;
var Blank2Clock;
var Starting_title, One_title, Two_title, Three_title;
var trialClock;
var Color1, Color2, Color3, Color4;
var Bus_label, Metro_label, RH_label, None_2;
var Cost_bus, Cost_metro, Cost_RH;
var Time_bus, Time_metro, Time_RH;
var Comfort_bus, Comfort_metro, Comfort_RH;
var CO2_bus, CO2_metro, CO2_RH;
var Cost_label, Time_label, Comfort_label, CO2_label;
var mouse;
var pid, useRows;
var blankClock;
var EndClock;
var Msg;


var initializeEyetrackingClock;
var webcamWarning;
var inst1Clock;
var instruction1Txt;
var inst1_resp;
var calibrationIntroClock;
var calibrationTxt;
var calibrationMouse;
var calibrationClock;
var calibration_square;
var calibrationClick;
const samplePriceHeight = 0.07; // tweak to taste


async function experimentInit() {
  // Initialize components for Routine "Intro"
  IntroClock = new util.Clock();

  ContinueButton = new visual.TextStim({
    win: psychoJS.window, name: 'ContinueButton',
    text: 'Continue',
    font: 'Open Sans',
    units: undefined, 
    pos: [0, -0.6], height: 0.05,  wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR',
    color: new util.Color('white'),  opacity: undefined,
    depth: -5.0 
  });

  Intro = new visual.TextStim({
    win: psychoJS.window,
    name: 'Intro',
    text: "You have to make a trip to your place of work. You'll have to choose between three ways of getting there, or not take any of them. Each has different characteristics, which are shown below their names. Choose the alternative that suits you better, just as you would in real life.",
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
    text: "'The Attributes are:\nCost: How much does it cost (in USD).\nTime: The length of the travel (in minutes).\nComfort: How comfort the travel will be (0 to 5 stars).\nPollution (trees): How many trees does it need to compensate the CO2 Emissions. The more trees are needed, the more contaminating it is.',",
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
    image : 'Images_Attention/StartButton.png', mask : undefined,
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
    lineColor: new util.Color(undefined),
    fillColor: new util.Color('white'),
    opacity: undefined, depth: -3, interpolate: true,
  });
  
  Bus_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Bus_label', units : 'norm', 
    image : 'Images_Attention/response_Bus.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [xcoord2, ycoord1], size : [xsizela, ysizela],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -4.0 
  });
  Metro_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'Metro_label', units : 'norm', 
    image : 'Images_Attention/response_Metro.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [xcoord3, ycoord1], size : [xsizela, ysizela],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -5.0 
  });
  RH_label = new visual.ImageStim({
    win : psychoJS.window,
    name : 'RH_label', units : 'norm', 
    image : 'Images_Attention/response_RH.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [xcoord4, ycoord1], size : [xsizela, ysizela],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -6.0 
  });
  None_2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'None_2', units : 'norm', 
    image : 'Images_Attention/response_None.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [1.5, 1.5], size : [xsizela, ysizela], // Off-screen
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -7.0 
  });
  Cost_bus = new visual.TextBox({
    win: psychoJS.window, name: 'Cost_bus', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -8.0 
  });
  
  Cost_metro = new visual.TextBox({
    win: psychoJS.window, name: 'Cost_metro', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -9.0 
  });
  
  Cost_RH = new visual.TextBox({
    win: psychoJS.window, name: 'Cost_RH', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -10.0 
  });
  
  Time_bus = new visual.TextBox({
    win: psychoJS.window, name: 'Time_bus', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -11.0 
  });
  
  Time_metro = new visual.TextBox({
    win: psychoJS.window, name: 'Time_metro', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -12.0 
  });
  
  Time_RH = new visual.TextBox({
    win: psychoJS.window, name: 'Time_RH', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -13.0 
  });
  
  Comfort_bus = new visual.TextBox({
    win: psychoJS.window, name: 'Comfort_bus', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -14.0 
  });
  
  Comfort_metro = new visual.TextBox({
    win: psychoJS.window, name: 'Comfort_metro', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -15.0 
  });
  
  Comfort_RH = new visual.TextBox({
    win: psychoJS.window, name: 'Comfort_RH', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -16.0 
  });
  
  CO2_bus = new visual.TextBox({
    win: psychoJS.window, name: 'CO2_bus', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -17.0 
  });
  
  CO2_metro = new visual.TextBox({
    win: psychoJS.window, name: 'CO2_metro', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -18.0 
  });
  
  CO2_RH = new visual.TextBox({
    win: psychoJS.window, name: 'CO2_RH', text: '',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
    color: 'gray', fillColor: 'white', borderColor: 'white',
    editable: false, anchor: 'center', depth: -19.0 
  });
  
  Cost_label = new visual.TextStim({
    win: psychoJS.window, name: 'Cost_label', text: 'Cost\n(US)', font: 'Open Sans',
    units: 'norm', pos: [0, 0], height: 0.035, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'), opacity: 1, depth: -20.0 
  });
  
  Time_label = new visual.TextStim({
    win: psychoJS.window, name: 'Time_label', text: 'Time\n(min)', font: 'Open Sans', 
    units: 'norm', pos: [0, 0], height: 0.035, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'), opacity: 1, depth: -21.0 
  });
  
  Comfort_label = new visual.TextStim({
    win: psychoJS.window, name: 'Comfort_label', text: 'Comfort\n(0 to 5 stars)',
    font: 'Open Sans', units: 'norm', pos: [0, 0], height: 0.035,
    wrapWidth: undefined, ori: 0.0, color: new util.Color('white'), opacity: 1, depth: -22.0 
  });
  
  CO2_label = new visual.TextStim({
    win: psychoJS.window, name: 'CO2_label', text: 'Pollution\n(trees)', font: 'Open Sans', 
    units: 'norm', pos: [0, 0], height: 0.035, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('white'), opacity: 1, depth: -23.0 
  });
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  
  // Run 'Begin Experiment' code from code
  console.log("Exp starting");
  pid = Number.parseInt(expInfo["participant"]);
  useRows = (((Trials * (pid - 1)).toString() + ":") + ((Trials * (pid - 1)) + Trials).toString());
  
  // Initialize components for Routine "blank"
  blankClock = new util.Clock();
  TextB = new visual.TextStim({
    win: psychoJS.window,
    name: 'TextB',
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
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [0.5, 0.2],  units: undefined, 
    color: 'Gray',
    fillColor: 'white', borderColor: 'white',
    editable: false,
    anchor: 'center',
    depth: 0.0 
  });
  
  // Create some handy timers
  globalClock = new util.Clock();  // to track the time since experiment started
  routineTimer = new util.CountdownTimer();  // to track time remaining of each (non-slip) routine
  
  initializeEyetrackingClock = new util.Clock();
  let averagingWindow = 10;
  window.xGazes = new Array(averagingWindow).fill(0);
  window.yGazes = new Array(averagingWindow).fill(0);
  webcamWarning = new visual.TextStim({
    win: psychoJS.window, name: 'webcamWarning',
    text: 'Before we start:\n- This study uses eye tracking via your webcam. When prompted, allow camera access.\n- Switch to full screen (Windows: F11; Mac: Ctrl+⌘+F; some laptops: Fn+F11).\n- Center your face in the green box and keep it steady. Use even, front-facing light; avoid bright windows behind you. It\'s important that you feel relaxed during the experiment.\n- For best performance: plug in power, close other apps, and close extra tabs (especially those playing video/animations).\n- Do not press Esc in this section, use the on-screen buttons to navigate.\nWarning:\nIf the camera disconnects at any point, the recording becomes unreliable and your data may be invalid. Please make sure your webcam stays connected, visible throughout and not covered.\nCamera & start:\n- The Continue button enables once the camera is detected, your face is centered and the ilumination is okay. Click Continue to begin.',
    font: 'Open Sans', pos: [0, 0.2], height: 0.05, color: new util.Color('black'), depth: -1.0
  });

    // --- Redirect BlazeFace to your local copy, json stuff ---
  try {
    if (window.tf && typeof tf.loadGraphModel === 'function') {
      const _origLoadGraphModel = tf.loadGraphModel.bind(tf);
      tf.loadGraphModel = async function(url, ...rest) {
        if (typeof url === 'string' && url.includes('tfhub.dev/tensorflow/tfjs-model/blazeface')) {
          url = 'blazeface/model.json'; // <- your self-hosted model
        }
        return _origLoadGraphModel(url, ...rest);
      };
    }
  } catch (e) {
    console.warn('Could not patch tf.loadGraphModel; continuing with default path.', e);
  }

  // --- initializeEyetracking UI controls (Continue button) ---
  ieyStatusTxt = new visual.TextStim({
    win: psychoJS.window, name: 'ieyStatusTxt',
    text: 'Waiting for camera permission…', pos: [0, -0.75], height: 0.035,
    color: new util.Color('red'), wrapWidth: 1.2
  });
  ieyMouse = new core.Mouse({ win: psychoJS.window });

  inst1Clock = new util.Clock();
  instruction1Txt = new visual.TextStim({
    win: psychoJS.window, name: 'instruction1Txt',
    text: 'We are almost ready to get started.\nRemember tu run the experiment fullscreen (press Fn + F11 on your keyboard if not).\nAlso, remember to keep your head still.\nPress space to move on.',
    font: 'Open Sans', pos: [0, 0], height: 0.05, color: new util.Color('black'), depth: -1.0
  });
  inst1_resp = new core.Keyboard({ psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true });

  calibrationIntroClock = new util.Clock();
  calibrationTxt = new visual.TextStim({
    win: psychoJS.window, name: 'calibrationTxt',
    text: "First we need to calibrate the eye tracker. Please try to keep your head still during the calibration and the experiment.\nCircles will appear at different locations on the screen. Please click each circle with your mouse as you 're looking at them.\nClick anywhere with the mouse to continue...",
    font: 'Open Sans', pos: [0, 0], height: 0.05, color: new util.Color('black'), depth: 0.0
  });
  calibrationMouse = new core.Mouse({ win: psychoJS.window });
  calibrationMouse.mouseClock = new util.Clock();

  calibrationClock = new util.Clock();
  calibration_square = new visual.Polygon({
    win: psychoJS.window, name: 'calibration_square',
    edges: 96, radius: 0.01, ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, lineColor: new util.Color('black'), fillColor: new util.Color('black'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  calibrationClick = new core.Mouse({ win: psychoJS.window });
  calibrationClick.mouseClock = new util.Clock();

  return Scheduler.Event.NEXT;
}

function setCursor(style) {
  document.body.style.cursor = style;
}

function updateHover(stim, mouse) {
  if (stim.contains(mouse)) {
    setCursor('pointer');
  } else {
    setCursor('default');
  }
}

var trialsc;
function trialscalLoopBegin(trialscalLoopScheduler, snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  trialsc = new TrialHandler({ psychoJS, nReps:1, method:TrialHandler.Method.RANDOM, extraInfo:expInfo,
    trialList: 'calibration_trials.xlsx', seed:undefined, name:'trialsc' });
  psychoJS.experiment.addLoop(trialsc); currentLoop=trialsc;
  for(const thisTrial of trialsc){
    const s = trialsc.getSnapshot();
    trialscalLoopScheduler.add(importConditions(s));
    trialscalLoopScheduler.add(calibrationRoutineBegin(s));
    trialscalLoopScheduler.add(calibrationRoutineEachFrame());
    trialscalLoopScheduler.add(calibrationRoutineEnd());
    trialscalLoopScheduler.add(endLoopcalIteration(trialscalLoopScheduler, s));
  }
  trialscalLoopScheduler.add(blankRoutineBegin(snapshot));
  trialscalLoopScheduler.add(blankRoutineEachFrame());
  trialscalLoopScheduler.add(blankRoutineEnd(snapshot));
  return Scheduler.Event.NEXT;
}}
async function trialscalLoopEnd(){
  psychoJS.experiment.removeLoop(trialsc);
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);
  psychoJS.experiment.nextEntry(); 
  return Scheduler.Event.NEXT;
}

var callib_color; var calibrationComponents;
function calibrationRoutineBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  StartTimeRoutine = globalClock.getTime(); calibrationClock.reset(); frameN=-1; continueRoutine=true; routineTimer.add(3.5);
  callib_color='black';
  calibration_square.setPos([calibration_x, calibration_y]);
  calibrationClick.clicked_name=[]; gotValidClick=false;
  calibrationComponents=[calibration_square, calibrationClick];
  for(const c of calibrationComponents) if('status'in c) c.status=PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function calibrationRoutineEachFrame(){ return async function(){
  t=calibrationClock.getTime(); frameN=frameN+1;
  if(t>=0.5 && calibration_square.status===PsychoJS.Status.NOT_STARTED){ calibration_square.tStart=t; calibration_square.frameNStart=frameN; calibration_square.setAutoDraw(true); }
  frameRemains=0.5+3-psychoJS.window.monitorFramePeriod*0.75;
  if(calibration_square.status===PsychoJS.Status.STARTED && t>=frameRemains) calibration_square.setAutoDraw(false);
  if(calibration_square.status===PsychoJS.Status.STARTED) calibration_square.setFillColor(new util.Color(callib_color), false);

  if(t>=0.5 && calibrationClick.status===PsychoJS.Status.NOT_STARTED){ calibrationClick.tStart=t; calibrationClick.frameNStart=frameN; calibrationClick.status=PsychoJS.Status.STARTED; calibrationClick.mouseClock.reset(); prevButtonState=calibrationClick.getPressed(); }
  frameRemains=0.5+3-psychoJS.window.monitorFramePeriod*0.75;
  if(calibrationClick.status===PsychoJS.Status.STARTED && t>=frameRemains) calibrationClick.status=PsychoJS.Status.FINISHED;
  if(calibrationClick.status===PsychoJS.Status.STARTED){
    _mouseButtons=calibrationClick.getPressed();
    if(!_mouseButtons.every((e,i)=>(e==prevButtonState[i]))){
      prevButtonState=_mouseButtons;
      if(_mouseButtons.reduce((e,acc)=>(e+acc))>0){
        gotValidClick=false;
        for(const obj of [calibration_square]){
          if(obj.contains(calibrationClick)){ gotValidClick=true; calibrationClick.clicked_name.push(obj.name); }
        }
        continueRoutine=false;
      }
    }
  }
  if(psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length>0) return quitPsychoJS('Aborted', false);
  if(!continueRoutine) return Scheduler.Event.NEXT;
  continueRoutine=false; for(const c of calibrationComponents) if('status'in c && c.status!==PsychoJS.Status.FINISHED) { continueRoutine=true; break; }
  return continueRoutine && routineTimer.getTime()>0 ? Scheduler.Event.FLIP_REPEAT : Scheduler.Event.NEXT;
}}
function calibrationRoutineEnd(){ return async function(){
  for(const c of calibrationComponents) if(typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  _mouseXYs=calibrationClick.getPos(); _mouseButtons=calibrationClick.getPressed();
  psychoJS.experiment.addData('calibrationClick.x', _mouseXYs[0]);
  psychoJS.experiment.addData('calibrationClick.y', _mouseXYs[1]);
  psychoJS.experiment.addData('calibrationClick.leftButton', _mouseButtons[0]);
  psychoJS.experiment.addData('calibrationClick.midButton', _mouseButtons[1]);
  psychoJS.experiment.addData('calibrationClick.rightButton', _mouseButtons[2]);
  psychoJS.experiment.addData('TypeTrial', "calibration");
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);  
  if(calibrationClick.clicked_name.length>0) psychoJS.experiment.addData('calibrationClick.clicked_name', calibrationClick.clicked_name[0]);
  //psychoJS.experiment.nextEntry(); 
  return Scheduler.Event.NEXT;
}}

function endLoopcalIteration(scheduler, snapshot){ return async function(){
  if(typeof snapshot!=='undefined'){
    if(snapshot.finished){ if(psychoJS.experiment.isEntryEmpty()) psychoJS.experiment.nextEntry(snapshot); scheduler.stop(); }
    else{ const thisTrial=snapshot.getCurrentTrial(); if(typeof thisTrial==='undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) psychoJS.experiment.nextEntry(snapshot); }
    return Scheduler.Event.NEXT;
  }
}}


var t;
var frameN;
var continueRoutine;
var gotValidClick;
var prevButtonState;
var _mouseButtons;
var _mouseXYs;

var IntroComponents;
var clicked_things1;
var clickables1;
var waiting1;
var clickedNum;

function IntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); 
    
    t = 0;
    IntroClock.reset();
    frameN = -1;
    continueRoutine = true;
    
    mouse_2.x = [];
    mouse_2.y = [];
    mouse_2.leftButton = [];
    mouse_2.midButton = [];
    mouse_2.rightButton = [];
    mouse_2.time = [];
    mouse_2.clicked_name = [];
    gotValidClick = false;
    
    clicked_things1 = [];
    clickables1 = [StartButton];
    waiting1 = false;
    
    IntroComponents = [Intro, Attributes, ButtonIntro, StartButton, mouse_2];
    
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function IntroRoutineEachFrame() {
  return async function () {
    t = IntroClock.getTime();
    frameN = frameN + 1;
    
    Intro.setAutoDraw(true);
    Attributes.setAutoDraw(true);
    ButtonIntro.setAutoDraw(true);
    StartButton.setAutoDraw(true);

    if (mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed();
    }

    if (mouse_2.status === PsychoJS.Status.STARTED) {
      _mouseButtons = mouse_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) {
          gotValidClick = false;
          for (const obj of [StartButton]) {
            if (obj.contains(mouse_2)) {
              gotValidClick = true;
              mouse_2.clicked_name.push(obj.name)
            }
          }
        }
      }
    }

    if (mouse_2.getPressed()[0] === 1 && StartButton.contains(mouse_2)) {
        continueRoutine = false;
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function IntroRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of IntroComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    routineTimer.reset();
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

var Blank2Components;
function Blank2RoutineBegin(snapshot) {
  return async function () {
    t = 0;
    Blank2Clock.reset();
    frameN = -1;
    continueRoutine = true;
    routineTimer.add(4.000000);
    
    Blank2Components = [Starting_title, One_title, Two_title, Three_title];
    
    for (const thisComponent of Blank2Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

var frameRemains;
function Blank2RoutineEachFrame() {
  return async function () {
    t = Blank2Clock.getTime();
    frameN = frameN + 1;
    
    if (t >= 0.0) Starting_title.setAutoDraw(true);
    if (t >= 1.0) Three_title.setAutoDraw(true);
    if (t >= 2.0) { Three_title.setAutoDraw(false); Two_title.setAutoDraw(true); }
    if (t >= 3.0) { Two_title.setAutoDraw(false); One_title.setAutoDraw(true); }

    if (t >= 4.0) {
        Starting_title.setAutoDraw(false);
        One_title.setAutoDraw(false);
        continueRoutine = false;
    }
    
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }
    
    if (routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function Blank2RoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of Blank2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

var trials;

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'DataCHP.csv', useRows),
      seed: undefined, name: 'trials'
    });
    psychoJS.experiment.addLoop(trials);
    currentLoop = trials;
    
    let loopCounter = 0;

    for (const thisTrial of trials) {
      loopCounter++;
      const s = trials.getSnapshot();

      // 1. Importar condiciones del trial actual (Transporte)
      trialsLoopScheduler.add(importConditions(s));
      
      // 2. Rutina de trial principal (Elección de transporte)
      trialsLoopScheduler.add(trialRoutineBegin(s));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(s));
      
      // 3. Rutina de feedback/blanco
      trialsLoopScheduler.add(blankRoutineBegin(s));
      trialsLoopScheduler.add(blankRoutineEachFrame());
      trialsLoopScheduler.add(blankRoutineEnd(s));

      // 4. Guardar datos del trial
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, s));
    }
    
    return Scheduler.Event.NEXT;
  }
}

async function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);
  if (psychoJS.experiment._unfinishedLoops.length>0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;
  return Scheduler.Event.NEXT;
}

function trialsLoopEndIteration(scheduler, snapshot) {
  return async function () {
    if (typeof snapshot !== 'undefined') {
      if (snapshot.finished) {
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
var trialComponents;
var clicked_things;
var clickables;
var waiting;
var clickedN;
var MOUSEGAZE = [];
var StartTimeRoutine;
var Cost_Bus_Shown, Cost_metro_Shown, Cost_RH_Shown;

function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    
    t = 0;
    trialClock.reset();
    frameN = -1;
    continueRoutine = true;
    last_click_time = -1.0;

    MOUSEGAZE = [];
    choice = undefined;

    Color1.setFillColor(new util.Color(colors[0]));
    Color1.setPos([0, locations[0][1]]);

    Color2.setFillColor(new util.Color(colors[1]));
    Color2.setPos([0, locations[1][1]]);

    Color3.setFillColor(new util.Color(colors[2]));
    Color3.setPos([0, locations[2][1]]);

    Color4.setFillColor(new util.Color(colors[3]));
    Color4.setPos([0, locations[3][1]]);
    
    Cost_bus.pos = [xcoord2, locations[0][1]];
    Cost_metro.pos = [xcoord3, locations[0][1]];
    Cost_RH.pos = [xcoord4, locations[0][1]];

    Time_bus.pos = [xcoord2, locations[1][1]];
    Time_metro.pos = [xcoord3, locations[1][1]];
    Time_RH.pos = [xcoord4, locations[1][1]];

    Comfort_bus.pos = [xcoord2, locations[2][1]];
    Comfort_metro.pos = [xcoord3, locations[2][1]];
    Comfort_RH.pos = [xcoord4, locations[2][1]];

    CO2_bus.pos = [xcoord2, locations[3][1]];
    CO2_metro.pos = [xcoord3, locations[3][1]];
    CO2_RH.pos = [xcoord4, locations[3][1]];

    Cost_label.pos = locations[0];
    Time_label.pos = locations[1];
    Comfort_label.pos = locations[2];
    CO2_label.pos = locations[3];

    mouse.x = []; mouse.y = [];
    mouse.leftButton = []; mouse.midButton = []; mouse.rightButton = [];
    mouse.time = []; mouse.clicked_name = [];
    gotValidClick = false;

    console.log("Routine starting ", nLoop);
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.color = new util.Color(bkgcolor);
    
    clicked_things = [];
    clickables = [Bus_label, Metro_label, RH_label]; // None_2 is not clickable
    waiting = false;
    
    StartTimeRoutine = t;
    
    Cost_bus.text = Bus_cost;
    Cost_Bus_Shown = Bus_cost;
    Cost_metro.text = metro_cost;
    Cost_metro_Shown = metro_cost;
    Cost_RH.text = RH_cost;
    Cost_RH_Shown = RH_cost;
    
    Time_bus.text = Bus_travel_time;
    Comfort_bus.text = Bus_Comfort;
    CO2_bus.text = Bus_CO2;
    Time_metro.text = metro_travel_time;
    Comfort_metro.text = metro_Comfort;
    CO2_metro.text = metro_CO2;
    Time_RH.text = RH_travel_time;
    Comfort_RH.text = RH_Comfort;
    CO2_RH.text = RH_CO2;
    
    trialComponents = [
        Color1, Color2, Color3, Color4,
        Bus_label, Metro_label, RH_label, None_2,
        Cost_bus, Cost_metro, Cost_RH,
        Time_bus, Time_metro, Time_RH,
        Comfort_bus, Comfort_metro, Comfort_RH,
        CO2_bus, CO2_metro, CO2_RH,
        Cost_label, Time_label, Comfort_label, CO2_label,
        mouse
    ];
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEachFrame() {
  return async function () {
    t = trialClock.getTime();
    frameN = frameN + 1;

    // --- 1. DIBUJAR COMPONENTES ---
    for (const thisComponent of trialComponents) {
      if (thisComponent.status === PsychoJS.Status.NOT_STARTED && t >= 0.0) {
        if (typeof thisComponent.setAutoDraw === 'function') {
          thisComponent.setAutoDraw(true);
        }
      }
    }

    // --- 2. REGISTRO DE POSICIÓN ---
    if (mouse.status === PsychoJS.Status.NOT_STARTED) {
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();
    }
  
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1], t]);

    // --- 3. LÓGICA DE RESPUESTA (SOLO CLIC IZQUIERDO) ---
    let buttonsPressed = mouse.getPressed();
    

    // buttonsPressed[0] es el clic izquierdo
    if (t > min_wait_duration && buttonsPressed[0] === 1 && (t - last_click_time) > 0.3) {
      for (const clickable of clickables) {
          if (clickable.contains(mouse)) {
              if (!waiting) {
                  choice = clickable.name;
                  clicked_things.push(choice);
                  waiting = true;
                  startTime = t;
                  last_click_time = t;
              }
          }
      }
    }

    // Pequeña espera tras click para feedback visual antes de pasar al siguiente trial
    if (waiting && (t > (startTime + 0.1))) {
        continueRoutine = false;
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }

    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }

    return Scheduler.Event.FLIP_REPEAT;
  };
}

function trialRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    
    console.log("Routine ending ", nLoop);
    psychoJS.experiment.addData("Choice", choice);
    psychoJS.experiment.addData("Trial", nLoop);
    
    let shuffleStatus = "FALSE";

    if (nLoop >= Trialsmid) {
        phase = 3; // Tercera fase (B: Con Shuffle)
    } else if (nLoop >= Trials1) {
        phase = 2; // Segunda fase (A: Sin Shuffle)
    } else {
        phase = 1; // Primera fase (B: Con Shuffle)
    }
    
    if (phase === 3 && lastPhase === 2) {
        nextShuffleTrial = nLoop + util.randint(1, 11);
    }
    lastPhase = phase; // Actualizamos para el siguiente trial
    
    // --- LÓGICA DE SHUFFLE (Aplica a Fase 1 y 3) ---
    if (phase === 1 || phase === 3) {
        // Si el trial actual coincide con el trial agendado
        if (nLoop === nextShuffleTrial) {
            util.shuffle(locations);
            console.log("Shuffle ejecutado en trial: " + nLoop + " (Fase " + phase + ")");
            shuffleStatus = "TRUE";
            
            // Agendamos el siguiente shuffle entre 1 y 10 trials más adelante
            nextShuffleTrial = nLoop + util.randint(1, 11);
        }
    }
    
    psychoJS.experiment.addData("phase", phase);
    psychoJS.experiment.addData("nextShufflePlanned", nextShuffleTrial);
    
    psychoJS.experiment.addData("TrialDuration", (t - StartTimeRoutine));
    psychoJS.experiment.addData("Bus_cost_Shown", Cost_Bus_Shown);
    psychoJS.experiment.addData("Metro_cost_Shown", Cost_metro_Shown);
    psychoJS.experiment.addData("RH_cost_Shown", Cost_RH_Shown);
    psychoJS.experiment.addData('Bus_travel_time', Bus_travel_time);
    psychoJS.experiment.addData('Bus_Comfort', Bus_Comfort);
    psychoJS.experiment.addData('Bus_CO2', Bus_CO2);
    
    psychoJS.experiment.addData('metro_travel_time', metro_travel_time);
    psychoJS.experiment.addData('metro_Comfort', metro_Comfort);
    psychoJS.experiment.addData('metro_CO2', metro_CO2);
    
    psychoJS.experiment.addData('RH_travel_time', RH_travel_time);
    psychoJS.experiment.addData('RH_Comfort', RH_Comfort);
    psychoJS.experiment.addData('RH_CO2', RH_CO2);
    //MOUSEGAZE
    psychoJS.experiment.addData("MOUSE_GAZE", MOUSEGAZE);
    // Add layout data
    psychoJS.experiment.addData("attsize", [xsizele, ysizele]);
    psychoJS.experiment.addData("prodsize", [xsizela, ysizela]);
    psychoJS.experiment.addData("Loc_Bus_label", [xcoord2, ycoord1]);
    psychoJS.experiment.addData("Loc_Metro_label", [xcoord3, ycoord1]);
    psychoJS.experiment.addData("Loc_RH_label", [xcoord4, ycoord1]);
    psychoJS.experiment.addData("Loc_Cost_label", locations[0]);
    psychoJS.experiment.addData("Loc_Travel_label", locations[1]);
    psychoJS.experiment.addData("Loc_Comfort_label", locations[2]);
    psychoJS.experiment.addData("Loc_CO2_label", locations[3]);
    psychoJS.experiment.addData("Loc_Bus_cost", [xcoord2, locations[0][1]]);
    psychoJS.experiment.addData("Loc_Metro_cost", [xcoord3, locations[0][1]]);
    psychoJS.experiment.addData("Loc_RH_cost", [xcoord4, locations[0][1]]);
    //... add other locations as needed
    psychoJS.experiment.addData("Color_1", colors[0]);
    psychoJS.experiment.addData("Loc_Color_1", [0, locations[0][1]]);
    psychoJS.experiment.addData("Color_2", colors[1]);
    psychoJS.experiment.addData("Loc_Color_2", [0, locations[1][1]]);
    psychoJS.experiment.addData("Color_3", colors[2]);
    psychoJS.experiment.addData("Loc_Color_3", [0, locations[2][1]]);
    psychoJS.experiment.addData("Color_4", colors[3]);
    psychoJS.experiment.addData("Loc_Color_4", [0, locations[3][1]]);
    
    
    psychoJS.experiment.addData("shuffle", shuffleStatus);

    nLoop += 1;
    
    routineTimer.reset();
    
    //if (currentLoop === psychoJS.experiment) {
    //  psychoJS.experiment.nextEntry(snapshot);
    //}
    return Scheduler.Event.NEXT;
  }
}

var blankComponents;
function blankRoutineBegin(snapshot) {
  return async function () {
    t = 0;
    blankClock.reset();
    frameN = -1;
    continueRoutine = true;
    
    TextB.setText('');
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.color = new util.Color(bkgcolor);
    
    blankComponents = [TextB];
    
    for (const thisComponent of blankComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function blankRoutineEachFrame() {
  return async function () {
    t = blankClock.getTime();
    frameN = frameN + 1;
    
    if (t >= 0.0) {
      TextB.setAutoDraw(true);
    }
    
    if (t >= no_text_duration) {
        continueRoutine = false;
    }
    
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }
    
    continueRoutine = false;
    for (const thisComponent of blankComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        if (typeof thisComponent.setAutoDraw === 'function' && thisComponent.autoDraw) {
            continueRoutine = true;
            break;
        }
      }
    
    if (continueRoutine) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function blankRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of blankComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    routineTimer.reset();
    
    //if (currentLoop === psychoJS.experiment) {
    //  psychoJS.experiment.nextEntry(snapshot);
    //}
    return Scheduler.Event.NEXT;
  }
}

var EndComponents;
function EndRoutineBegin(snapshot) {
  return async function () {
    t = 0;
    EndClock.reset();
    frameN = -1;
    continueRoutine = true;
    routineTimer.add(2.000000);
    
    bkgcolor = [0, 0, 0.2];
    psychoJS.window.color= new util.Color(bkgcolor);
    
    EndComponents = [Msg];
    
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function EndRoutineEachFrame() {
  return async function () {
    t = EndClock.getTime();
    frameN = frameN + 1;
    
    if (t >= 0.0) Msg.setAutoDraw(true);

    frameRemains = 0.0 + 2.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (Msg.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Msg.setAutoDraw(false);
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    
    if (!continueRoutine) {
      return Scheduler.Event.NEXT;
    }
    
    if (routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function EndRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of EndComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
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

const COMPLETION_URL = 'https://app.prolific.com/submissions/complete?cc=CC7CZ1BG'
const CANCEL_URL = "https://app.prolific.com/submissions/complete?cc=CC7CZ1BG";
psychoJS.setRedirectUrls(COMPLETION_URL, CANCEL_URL);

async function quitPsychoJS(message, isCompleted) {
  await psychoJS.quit({ message, isCompleted });
  return Scheduler.Event.QUIT;
}


//-const COMPLETION_URL = 'https://app.prolific.com/submissions/complete?cc=C6BUL6WT'
//-async function quitPsychoJS(message, isCompleted) {
//-  // try to save any final data (optional: include expInfo)
//-  try { await psychoJS.experiment.save({ attributes: expInfo }); } catch (e) { console.warn(e); }
//-
//-  // close renderer and tell Pavlovia we’re done (this also uploads logs)
//-  psychoJS.window.close();
//-  psychoJS.quit({ message: message, isCompleted: isCompleted });
//-
//-  // redirect shortly after to give the network a moment
//-  if (isCompleted) {
//-    setTimeout(() => { window.location.href = COMPLETION_URL; }, 10000);
//-  }
//-
//-  return Scheduler.Event.QUIT;
//-}
