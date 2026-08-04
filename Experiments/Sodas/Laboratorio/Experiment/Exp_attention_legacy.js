/*********************************** 
 * Attention_Fondecyt1_Legacy Test *
 ***********************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;


// store info about the experiment session:
let expName = 'Attention_FONDECYT1_legacy';  // from the Builder filename that created this script
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 45)).toFixed(0), 2)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
// Run 'Before Experiment' code from code
import {launchHubServer} from 'psychopy/iohub';
import {getTime, wait} from 'psychopy/core';
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
nLoop = 1;
phase = 1;
Trials1 = 20;
Trials2 = 20;
Recurrency = 20;
Trials = (Trials1 + Trials2);
mouse_delay = 1.5;
last_click_time = (- mouse_delay);
Products = ["Bohney", "Colalola", "Haphy", "Mohshom", "Phospho"];
AllAttributes = ["Quality", "Brand_Rep", "Calories", "Flavour"];
Attributes = ["Calories", "Quality"];
n_filas = (5 + Attributes.length);
dist_y = (2 / n_filas);
dist_x = 0.7;
xcoord1 = (- dist_x);
xcoord2 = 0;
xcoord3 = dist_x;
ycoord1 = (1 - (2 * dist_y));
ycoord2 = (ycoord1 - (2 * dist_y));
ycoord3 = (ycoord2 - dist_y);
ycoord4 = (ycoord3 - dist_y);
ycoord5 = (ycoord4 - dist_y);
loc1 = [xcoord1, ycoord1];
loc2 = [xcoord1, ycoord2];
loc3 = [xcoord1, ycoord3];
loc4 = [xcoord1, ycoord4];
loc5 = [xcoord1, ycoord5];
locAtt = [loc2, loc3, loc4, loc5];
element_to_position = {};
position_iter = iter(locAtt);
console.log(loc1, "-\n", loc2, "-\n", loc3, "-\n", loc4, "-\n", loc5, "-|\n", position_iter);
for (var el, _pj_c = 0, _pj_a = Attributes, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
    el = _pj_a[_pj_c];
    element_to_position[el] = next(position_iter);
}
console.log(element_to_position);
locations = [];
for (var item, _pj_c = 0, _pj_a = AllAttributes, _pj_b = _pj_a.length; (_pj_c < _pj_b); _pj_c += 1) {
    item = _pj_a[_pj_c];
    if (_pj.in_es6(item, element_to_position)) {
        locations.push(element_to_position[item]);
    } else {
        locations.push([2, 2]);
    }
}
console.log("locations:", locations);
xsizeimg = dist_y;
ysizeimg = (2 * dist_y);
xsizele = 0.2;
ysizele = 0.1;
xsizela = 0.3;
ysizela = 0.2;
xETreg = 0.4;
yETreg = 0.3;

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
    {'name': 'FondecytValues.csv', 'path': 'FondecytValues.csv'},
    {'name': 'pos_junk_food/StartButton.png', 'path': 'pos_junk_food/StartButton.png'},
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

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

async function experimentInit() {
  // Initialize components for Routine "Intro"
  IntroClock = new util.Clock();
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
    image : 'pos_junk_food/StartButton.png', mask : undefined,
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
  ImageProd1 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'ImageProd1', units : 'norm', 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [xcoord2, ycoord1], size : [xsizeimg, ysizeimg],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : 0.0 
  });
  ImageProd2 = new visual.ImageStim({
    win : psychoJS.window,
    name : 'ImageProd2', units : 'norm', 
    image : 'default.png', mask : undefined,
    anchor : 'center',
    ori : 0.0, pos : [xcoord3, ycoord1], size : [xsizeimg, ysizeimg],
    color : new util.Color([1,1,1]), opacity : undefined,
    flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -1.0 
  });
  Quality_Label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Quality_Label',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizela, ysizela],  units: 'norm', 
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
    depth: -2.0 
  });
  
  Brand_Rep_Label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Brand_Rep_Label',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizela, ysizela],  units: 'norm', 
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
    depth: -3.0 
  });
  
  Calories_Label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Calories_Label',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizela, ysizela],  units: 'norm', 
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
    depth: -4.0 
  });
  
  Flavour_Label = new visual.TextBox({
    win: psychoJS.window,
    name: 'Flavour_Label',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizela, ysizela],  units: 'norm', 
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
    depth: -5.0 
  });
  
  Quality1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Quality1',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
    depth: -6.0 
  });
  
  Brand_Rep1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Brand_Rep1',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
    depth: -7.0 
  });
  
  Calories1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Calories1',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  Flavour1 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Flavour1',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  Quality2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Quality2',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  Brand_Rep2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Brand_Rep2',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  Calories2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Calories2',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  Flavour2 = new visual.TextBox({
    win: psychoJS.window,
    name: 'Flavour2',
    text: '',
    placeholder: 'Type here...',
    font: 'Open Sans',
    pos: [0, 0], letterHeight: 0.05,
    size: [xsizele, ysizele],  units: 'norm', 
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
  
  mouse = new core.Mouse({
    win: psychoJS.window,
  });
  mouse.mouseClock = new util.Clock();
  // Run 'Begin Experiment' code from code
  import {core, event, visual} from 'psychopy';
  import * as psychopy.visual from 'psychopy/visual';
  import * as psychopy.event from 'psychopy/event';
  import * as tr from 'tobii_research';
  console.log("Exp starting");
  pid = expInfo["participant"];
  useRows = "0:19";
  ImgProd1 = "Colas/Bohney.png";
  ImgProd2 = "Colas/Colalola.png";
  found_eyetrackers = tr.find_all_eyetrackers();
  my_eyetracker = found_eyetrackers[0];
  console.log(("Address: " + my_eyetracker.address));
  console.log(("Model: " + my_eyetracker.model));
  console.log("BeginExperment ended------------------------");
  
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

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); // update internal variables (.thisN etc) of the loop
    
    // set up handler to look after randomisation of conditions etc
    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 3, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: TrialHandler.importConditions(psychoJS.serverManager, 'FondecytValues.csv', useRows),
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

function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'trial' ---
    t = 0;
    trialClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    Quality_Label.setPos([xcoord1, locations[0][1]]);
    Quality_Label.setText('Quality\n(1-10)');
    Brand_Rep_Label.setPos([xcoord1, locations[1][1]]);
    Brand_Rep_Label.setText('Brand Reputation\n(1-10)');
    Calories_Label.setPos([xcoord1, locations[2][1]]);
    Calories_Label.setText('Calories');
    Flavour_Label.setPos([xcoord1, locations[3][1]]);
    Flavour_Label.setText('Flavour\n(1-10)');
    Quality1.setPos([xcoord2, locations[0][1]]);
    Quality1.setText('');
    Brand_Rep1.setPos([xcoord2, locations[1][1]]);
    Brand_Rep1.setText('');
    Calories1.setPos([xcoord2, locations[2][1]]);
    Calories1.setText('');
    Flavour1.setPos([xcoord2, locations[3][1]]);
    Flavour1.setText('');
    Quality2.setPos([xcoord3, locations[0][1]]);
    Quality2.setText('');
    Brand_Rep2.setPos([xcoord3, locations[1][1]]);
    Brand_Rep2.setText('');
    Calories2.setPos([xcoord3, locations[2][1]]);
    Calories2.setText('');
    Flavour2.setPos([xcoord3, locations[3][1]]);
    Flavour2.setText('');
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
    console.log("Routine starting ", nLoop);
    console.log(product1, "----------------------------");
    console.log(product2, "----------------------------");
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.setColor(bkgcolor);
    waiting = false;
    ETRECORD_FR = [];
    ETRECORD_FRT = [];
    ETRECORD_FRT_1970 = [];
    LEFTPUPIL_FR = [];
    RIGHTPUPIL_FR = [];
    TIMEGAZETOB = [];
    TIMEGAZE = [];
    MOUSEGAZE = [];
    TOBIIGAZE = [];
    TOBIIGAZEL = [];
    TOBIIGAZELT = [];
    TOBIIGAZER = [];
    StartTimeRoutine = t;
    TIMEGAZE_1970 = [];
    function gaze_data_callback(gaze_data) {
        var lp, lv, lx, ly, rp, rv, rx, ry, tg;
        tg = gaze_data.system_time_stamp;
        lp = gaze_data.left_eye.pupil.diameter;
        rp = gaze_data.right_eye.pupil.diameter;
        lx = gaze_data.left_eye.gaze_point.position_on_display_area[0];
        ly = gaze_data.left_eye.gaze_point.position_on_display_area[1];
        lv = gaze_data.left_eye.gaze_point.validity;
        rx = gaze_data.right_eye.gaze_point.position_on_display_area[0];
        ry = gaze_data.right_eye.gaze_point.position_on_display_area[1];
        rv = gaze_data.right_eye.gaze_point.validity;
        LEFTPUPIL_FR.push(lp);
        RIGHTPUPIL_FR.push(rp);
        TIMEGAZETOB.push(tg);
        TOBIIGAZEL.push([lx, ly, lv]);
        TOBIIGAZER.push([rx, ry, lr]);
        TOBIIGAZELT.push([lx, ly, lv, tg]);
    }
    my_eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback);
    Quality1.text = product1_Quality;
    Brand_Rep1.text = product1_Brand_Rep;
    Calories1.text = product1_Calories;
    Flavour1.text = product1_Flavour;
    Quality2.text = product2_Quality;
    Brand_Rep2.text = product2_Brand_Rep;
    Calories2.text = product2_Calories;
    Flavour2.text = product2_Flavour;
    if ((product1 === "Bohney")) {
        ImgProd1 = "Colas/bohney.png";
    } else {
        if ((product1 === "Colalola")) {
            ImgProd1 = "Colas/colalola.png";
        } else {
            if ((product1 === "Haphy")) {
                ImgProd1 = "Colas/haphy.png";
            } else {
                if ((product1 === "Mohshom")) {
                    ImgProd1 = "Colas/mohshom.png";
                } else {
                    ImgProd1 = "Colas/phospho.png";
                }
            }
        }
    }
    if ((product2 === "Bohney")) {
        ImgProd2 = "Colas/bohney.png";
    } else {
        if ((product2 === "Colalola")) {
            ImgProd2 = "Colas/colalola.png";
        } else {
            if ((product2 === "Haphy")) {
                ImgProd2 = "Colas/haphy.png";
            } else {
                if ((product2 === "Mohshom")) {
                    ImgProd2 = "Colas/mohshom.png";
                } else {
                    ImgProd2 = "Colas/phospho.png";
                }
            }
        }
    }
    clicked_things = [];
    clickables = [ImageProd1, ImageProd2];
    
    // keep track of which components have finished
    trialComponents = [];
    trialComponents.push(ImageProd1);
    trialComponents.push(ImageProd2);
    trialComponents.push(Quality_Label);
    trialComponents.push(Brand_Rep_Label);
    trialComponents.push(Calories_Label);
    trialComponents.push(Flavour_Label);
    trialComponents.push(Quality1);
    trialComponents.push(Brand_Rep1);
    trialComponents.push(Calories1);
    trialComponents.push(Flavour1);
    trialComponents.push(Quality2);
    trialComponents.push(Brand_Rep2);
    trialComponents.push(Calories2);
    trialComponents.push(Flavour2);
    trialComponents.push(mouse);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function trialRoutineEachFrame() {
  return async function () {
    //--- Loop for each frame of Routine 'trial' ---
    // get current time
    t = trialClock.getTime();
    frameN = frameN + 1;// number of completed frames (so 0 is the first frame)
    // update/draw components on each frame
    
    // *ImageProd1* updates
    if (t >= 0.0 && ImageProd1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ImageProd1.tStart = t;  // (not accounting for frame time here)
      ImageProd1.frameNStart = frameN;  // exact frame index
      
      ImageProd1.setAutoDraw(true);
    }

    
    if (ImageProd1.status === PsychoJS.Status.STARTED){ // only update if being drawn
      ImageProd1.setImage(ImgProd1, false);
    }
    
    // *ImageProd2* updates
    if (t >= 0.0 && ImageProd2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      ImageProd2.tStart = t;  // (not accounting for frame time here)
      ImageProd2.frameNStart = frameN;  // exact frame index
      
      ImageProd2.setAutoDraw(true);
    }

    
    if (ImageProd2.status === PsychoJS.Status.STARTED){ // only update if being drawn
      ImageProd2.setImage(ImgProd2, false);
    }
    
    // *Quality_Label* updates
    if (t >= 0.0 && Quality_Label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Quality_Label.tStart = t;  // (not accounting for frame time here)
      Quality_Label.frameNStart = frameN;  // exact frame index
      
      Quality_Label.setAutoDraw(true);
    }

    
    // *Brand_Rep_Label* updates
    if (t >= 0.0 && Brand_Rep_Label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Brand_Rep_Label.tStart = t;  // (not accounting for frame time here)
      Brand_Rep_Label.frameNStart = frameN;  // exact frame index
      
      Brand_Rep_Label.setAutoDraw(true);
    }

    
    // *Calories_Label* updates
    if (t >= 0.0 && Calories_Label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Calories_Label.tStart = t;  // (not accounting for frame time here)
      Calories_Label.frameNStart = frameN;  // exact frame index
      
      Calories_Label.setAutoDraw(true);
    }

    
    // *Flavour_Label* updates
    if (t >= 0.0 && Flavour_Label.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Flavour_Label.tStart = t;  // (not accounting for frame time here)
      Flavour_Label.frameNStart = frameN;  // exact frame index
      
      Flavour_Label.setAutoDraw(true);
    }

    
    // *Quality1* updates
    if (t >= 0.0 && Quality1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Quality1.tStart = t;  // (not accounting for frame time here)
      Quality1.frameNStart = frameN;  // exact frame index
      
      Quality1.setAutoDraw(true);
    }

    
    // *Brand_Rep1* updates
    if (t >= 0.0 && Brand_Rep1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Brand_Rep1.tStart = t;  // (not accounting for frame time here)
      Brand_Rep1.frameNStart = frameN;  // exact frame index
      
      Brand_Rep1.setAutoDraw(true);
    }

    
    // *Calories1* updates
    if (t >= 0.0 && Calories1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Calories1.tStart = t;  // (not accounting for frame time here)
      Calories1.frameNStart = frameN;  // exact frame index
      
      Calories1.setAutoDraw(true);
    }

    
    // *Flavour1* updates
    if (t >= 0.0 && Flavour1.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Flavour1.tStart = t;  // (not accounting for frame time here)
      Flavour1.frameNStart = frameN;  // exact frame index
      
      Flavour1.setAutoDraw(true);
    }

    
    // *Quality2* updates
    if (t >= 0.0 && Quality2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Quality2.tStart = t;  // (not accounting for frame time here)
      Quality2.frameNStart = frameN;  // exact frame index
      
      Quality2.setAutoDraw(true);
    }

    
    // *Brand_Rep2* updates
    if (t >= 0.0 && Brand_Rep2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Brand_Rep2.tStart = t;  // (not accounting for frame time here)
      Brand_Rep2.frameNStart = frameN;  // exact frame index
      
      Brand_Rep2.setAutoDraw(true);
    }

    
    // *Calories2* updates
    if (t >= 0.0 && Calories2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Calories2.tStart = t;  // (not accounting for frame time here)
      Calories2.frameNStart = frameN;  // exact frame index
      
      Calories2.setAutoDraw(true);
    }

    
    // *Flavour2* updates
    if (t >= 0.0 && Flavour2.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      Flavour2.tStart = t;  // (not accounting for frame time here)
      Flavour2.frameNStart = frameN;  // exact frame index
      
      Flavour2.setAutoDraw(true);
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
          for (const obj of [ImageProd1,ImageProd2]) {
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
    current_time = globalClock.getTime();
    buttonsPressed = mouse.getPressed();
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
    ETRECORD_FR.push(etRecord.pos);
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1]]);
    TIMEGAZE.push(t);
    TIMEGAZE_1970.push(psychopy.core.getAbsTime());
    ETRECORD_FRT.push([etRecord.pos, t]);
    ETRECORD_FRT_1970.push([etRecord.pos, psychopy.core.getAbsTime()]);
    
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
    psychoJS.experiment.addData("TrialDuration", (t - StartTimeRoutine));
    my_eyetracker.unsubscribe_from(tr.EYETRACKER_GAZE_DATA, gaze_data_callback);
    psychoJS.experiment.addData("ETRECORD_FR", ETRECORD_FR);
    psychoJS.experiment.addData("ETRECORD_FR_TIME", ETRECORD_FRT);
    psychoJS.experiment.addData("ETRECORD_1970_TIME", ETRECORD_FRT_1970);
    psychoJS.experiment.addData("LEFTPUPIL_FR", LEFTPUPIL_FR);
    psychoJS.experiment.addData("RIGHTPUPIL_FR", RIGHTPUPIL_FR);
    psychoJS.experiment.addData("TIME_GAZE", TIMEGAZE);
    psychoJS.experiment.addData("TIME_GAZE_1970", TIMEGAZE_1970);
    psychoJS.experiment.addData("TIME_GAZE_TOBII", TIMEGAZETOB);
    psychoJS.experiment.addData("MOUSE_GAZE", MOUSEGAZE);
    psychoJS.experiment.addData("TOBII_GAZE", TOBIIGAZE);
    psychoJS.experiment.addData("TOBII_GAZE_LEFT", TOBIIGAZEL);
    psychoJS.experiment.addData("TOBII_GAZE_LEFT_TIME", TOBIIGAZELT);
    psychoJS.experiment.addData("TOBII_GAZE_RIGHT", TOBIIGAZER);
    psychoJS.experiment.addData("Choice1", ImgProd1);
    psychoJS.experiment.addData("Choice2", ImgProd2);
    psychoJS.experiment.addData("Choice", choice);
    psychoJS.experiment.addData("imgsize", [xsizeimg, ysizeimg]);
    psychoJS.experiment.addData("attsize", [xsizele, ysizele]);
    psychoJS.experiment.addData("prodsize", [xsizela, ysizela]);
    psychoJS.experiment.addData("regETsize", [xETreg, yETreg]);
    psychoJS.experiment.addData("Product1", product1);
    psychoJS.experiment.addData("Product2", product2);
    psychoJS.experiment.addData("Loc_Img_Prod1", [xcoord2, ycoord1]);
    psychoJS.experiment.addData("Loc_Img_Prod1", [xcoord3, ycoord1]);
    psychoJS.experiment.addData("Loc_Quality_Label", [xcoord1, ycoord2]);
    psychoJS.experiment.addData("Loc_Brand_Rep_Label", [xcoord1, ycoord3]);
    psychoJS.experiment.addData("Loc_Calories_Label", [xcoord1, ycoord4]);
    psychoJS.experiment.addData("Loc_Flavour_Label", [xcoord1, ycoord5]);
    psychoJS.experiment.addData("Loc_Quality_Prod1", [xcoord2, ycoord2]);
    psychoJS.experiment.addData("Loc_Brand_Rep_Prod1", [xcoord2, ycoord3]);
    psychoJS.experiment.addData("Loc_Calories_Prod1", [xcoord2, ycoord4]);
    psychoJS.experiment.addData("Loc_Flavour_Prod1", [xcoord2, ycoord5]);
    psychoJS.experiment.addData("Loc_Quality_Prod1", [xcoord3, ycoord2]);
    psychoJS.experiment.addData("Loc_Brand_Rep_Prod1", [xcoord3, ycoord3]);
    psychoJS.experiment.addData("Loc_Calories_Prod1", [xcoord3, ycoord4]);
    psychoJS.experiment.addData("Loc_Flavour_Prod1", [xcoord3, ycoord5]);
    
    // the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset();
    
    // Routines running outside a loop should always advance the datafile row
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

function blankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //--- Prepare to start Routine 'blank' ---
    t = 0;
    blankClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    routineTimer.add(0.500000);
    // update component parameters for each repeat
    TextB.setText('');
    // Run 'Begin Routine' code from code_2
    bkgcolor = [0, 0, 0.3];
    psychoJS.window.setColor(bkgcolor);
    
    // keep track of which components have finished
    blankComponents = [];
    blankComponents.push(TextB);
    
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
    
    // *TextB* updates
    if (t >= 0 && TextB.status === PsychoJS.Status.NOT_STARTED) {
      // keep track of start time/frame for later
      TextB.tStart = t;  // (not accounting for frame time here)
      TextB.frameNStart = frameN;  // exact frame index
      
      TextB.setAutoDraw(true);
    }

    frameRemains = 0 + 0.5 - psychoJS.window.monitorFramePeriod * 0.75;  // most of one frame period left
    if (TextB.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      TextB.setAutoDraw(false);
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
