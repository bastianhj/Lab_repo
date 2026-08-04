/*****************************
 *  Flight_Choice_Exp_3_opt  *
 *****************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;

// store info about the experiment session:
let expName = 'Flight_Choice_Exp';  // MODIFIED
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(1, 50)).toFixed(0), 2)}`,
    'session': '001',
};

// Start code blocks for 'Before Experiment'
var nLoop; //trial number
var Trials1; //first session of trials (can be 0 if no distinct phases)
var Trials2; //second session of trials
var Trials; //total of trials
var choice; //choice from trial
var startTime; //when does the trial start
var topMsg;

// --- Layout & Sizing Variables ---
// USER: Adjust these values to change the appearance of the choice cards/columns
var screenPadding = 0.025; // Padding from screen edges
var columnWidth = 0.6;  //0.6    // Width of each service column
var columnHeight = 1.8;   // Total height for a column (logo + attributes)
var columnSpacing = 0.05;  // Space between columns
var logoSize = [columnWidth * 0.4, columnWidth * 0.2 ] // * (9/16)]; // Aspect ratio for logos, e.g., 16:9
var attributeBoxHeight = 0.3;
var attributeLabelSize = [columnWidth * 0.9, attributeBoxHeight * 0.8]; // Size of attribute text boxes
var valueTextSize = 0.04;   // Font size for attribute values
var attributeNameTextSize = 0.02; // Font size for attribute names (e.g., "Price", "Storage")
var serviceNameTextSize = 0.04; // Font size for service names
var cardTop = columnHeight / 1.5 ; // / 2;
var posxzero = 0; //0.25

// Column positions (centered)
var col1_x, col2_x, col3_x, posx1, posx2;
//Init
posx1 = -0.3; //position in x first session
posx2 = -0.6; //position in x first session
col1_x = posx1;
col2_x = -col1_x;
col3_x = 2
var fixedposition_s1_x = [ posx1, -posx1, 2];
var fixedposition_s2_x = [ posx2, 0, -posx2];
var serviceName_y_offset = columnHeight / 2 - logoSize[1]/2 - 0.1; // Y pos for service name, above logo
//var logo_y_offset = columnHeight / 2 - logoSize[1]/2 - 0.25; // Y pos for logo, below name
//var attr1_y_offset = logo_y_offset - logoSize[1]/2 - attributeBoxHeight/2 - 0.25; // Y for first attribute
//var attr2_y_offset = attr1_y_offset - attributeBoxHeight - 0.05; // Y for second attribute

const logo_y_offset  = -0.9; //-0.75 //cardTop - (columnHeight * (2/5)); // Y pos for logo, below name
const attr1_y_offset = -0.3; //middle
const attr2_y_offset = 0.3; //top
const topmsglocation = [0,0.85];
var postextattname = 0.1;
var postextattvalue = 0.1;

// USER: Define your two attribute names here (these will be column headers in your CSV)
var attribute1Name = "Offset Emissions";      // MODIFIED e.g., Price, Duration
var attribute1Units = "%";          // MODIFIED e.g., $, hrs
var attribute2Name = "Price";       // MODIFIED e.g., Storage, Pollution
var attribute2Units = "S$";        // MODIFIED e.g., GB, kg CO2 equivalent

const HOVER_SCALE = 1.10;   // how big on hover (10% larger)
const HOVER_LERP  = 0.25;   // smoothness 0..1 (higher = snappier)

// Remember each object's base size once
function ensureBaseSize(stim) {
  if (!stim._baseSize) stim._baseSize = [...stim.size];
}

// Smoothly move current size toward a target size
function lerpSize(stim, target) {
  stim.size = [
    stim.size[0] + (target[0] - stim.size[0]) * HOVER_LERP,
    stim.size[1] + (target[1] - stim.size[1]) * HOVER_LERP,
  ];
}

// Set cursor safely
function setCursor(cssCursor) {
  const r = psychoJS && psychoJS.window && psychoJS.window._renderer;
  // PIXI v6+ has `view` (canvas)
  if (r && r.view && r.view.style) r.view.style.cursor = cssCursor;
  else document.body.style.cursor = cssCursor;
}

/**
 * updateHover(stim, mouse[, style])
 * - Enlarges `stim` while hovered; restores when not.
 * - Optionally tweak outline/tint for Rects/Images.
 */
function updateHover(stim, mouse, style = {}) {
  if (!stim) return;
  ensureBaseSize(stim);

  const hovered = stim.contains(mouse);

  // target size
  const target = hovered
    ? [stim._baseSize[0] * HOVER_SCALE, stim._baseSize[1] * HOVER_SCALE]
    : stim._baseSize;

  lerpSize(stim, target);

  // optional styling on hover (e.g., outline on Rects)
  if (hovered && style.on) style.on(stim);
  if (!hovered && style.off) style.off(stim);

  // pointer cursor if any hovered thing this frame
  if (hovered) setCursor('pointer');
}

// Positions for the general attribute labels (if you want them static, e.g., to the left)
// For this design, we'll put attribute names directly in the cards.
// If you wanted fixed labels like the original, you'd define them here.

//values of bicolor square (for external sync, if needed)
//var positionsquarebw = [0.95, -0.85]; // Bottom right
//var sizesquarebw = [0.07233, 0.1286];

//Here you set the values for trials
nLoop = 1;
Trials1 = 50; // Set to 0 if no separate "training" phase with different CSV
// USER: Set the number of choice scenarios (rows in your CSV for this participant)
Trials2 = 50; // Example: 10 choice scenarios
Trials = (Trials1 + Trials2);

const CALIB_EVERY = 20;
var TrialSoFar = 0;
let initialCalibText = null;

//head distance functions
function getHeadMetrics(faceLandmarks) {
    if (!faceLandmarks) {
        return null;
    }

    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    let zSum = 0;

    for (const landmark of faceLandmarks) {
        const [x, y, z] = landmark;
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
        zSum += z;
    }
    
    return {
        headWidth: maxX - minX,
        headHeight: maxY - minY,
        // The average Z-depth is a good proxy for distance.
        // It's a relative value, not in cm/inches.
        distance: zSum / faceLandmarks.length 
    };
}
//end head distance functions

//average luminosity
function getAverageLuminance(Elementvideo) {
    // Create a temporary canvas
    const canvas = document.createElement('canvas');
    canvas.width = Elementvideo.videoWidth;
    canvas.height = Elementvideo.videoHeight;
    const ctx = canvas.getContext('2d');

    // Draw the current video frame to the canvas
    ctx.drawImage(Elementvideo, 0, 0, canvas.width, canvas.height);
    
    // Get the image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    let sum = 0;
    // Calculate the average brightness (luminance)
    // We only need to check every 4th value (e.g., the red channel) for speed
    for(let i = 0; i < data.length; i += 4) {
        // A common luminance formula is 0.299*R + 0.587*G + 0.114*B
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        sum += (0.299 * r + 0.587 * g + 0.114 * b);
    }
    
    return sum / (data.length / 4); // Average luminance in range [0, 255]
}
//end average luminosity

//FUNCTIONS-----------------------------------------------------------------------------------------
//randomsample1
function sample1(list) {
  if (!list.length) throw new Error('Empty list');
  return list[Math.floor(Math.random() * list.length)];
}

function toPercent(x, decimals = 0) {
  if (typeof x !== 'number' || !isFinite(x)) throw new Error('Number required');
  return `${(x * 100).toFixed(decimals)}%`;
}

function samplenoreplacement(list) {
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('samplenoreplacement: list must be a non-empty array');
  }
  const idx = Math.floor(Math.random() * list.length); // pick random index
  const [item] = list.splice(idx, 1); // remove and return it
  return item;
}


// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0.85, 0.85, 0.90]), // Light grayish-blue background
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

var afterblankComponents, afterblankClock, text_afterblank;


// flowScheduler gets run if the participants presses OK
flowScheduler.add(updateInfo);
flowScheduler.add(experimentInit);
flowScheduler.add(initializeEyetrackingRoutineBegin());
flowScheduler.add(initializeEyetrackingRoutineEachFrame());
flowScheduler.add(initializeEyetrackingRoutineEnd());
flowScheduler.add(inst1RoutineBegin());
flowScheduler.add(inst1RoutineEachFrame());
flowScheduler.add(inst1RoutineEnd());
flowScheduler.add(calibrationIntroRoutineBegin());
flowScheduler.add(calibrationIntroRoutineEachFrame());
flowScheduler.add(calibrationIntroRoutineEnd());
const trialscalLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
flowScheduler.add(trialscalLoopScheduler);
flowScheduler.add(trialscalLoopEnd);
// flowScheduler.add(trackingTrialRoutineBegin()); // If you need a separate tracking validation screen
// flowScheduler.add(trackingTrialRoutineEachFrame());
// flowScheduler.add(trackingTrialRoutineEnd());
flowScheduler.add(IntroRoutineBegin());
flowScheduler.add(IntroRoutineEachFrame());
flowScheduler.add(IntroRoutineEnd());
flowScheduler.add(Blank2RoutineBegin());
flowScheduler.add(Blank2RoutineEachFrame());
flowScheduler.add(Blank2RoutineEnd());
const trials2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials2LoopBegin(trials2LoopScheduler));
flowScheduler.add(trials2LoopScheduler);
flowScheduler.add(trials2LoopEnd);
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
    // USER: Add your resource files here
    {'name': 'Images/StartButton.png', 'path': 'Images/StartButton.png'},
    {'name': 'Images/Option1.png', 'path': 'Images/Option1.png'}, // MODIFIED
    {'name': 'Images/Option2.png', 'path': 'Images/Option2.png'},   // MODIFIED
    {'name': 'Images/Option3.png', 'path': 'Images/Option3.png'}, // MODIFIED
    {'name': 'calibration_trials.xlsx', 'path': 'calibration_trials.xlsx'},
    {'name': 'webgazer-2.0.1.tp.js', 'path': 'webgazer-2.0.1.tp.js'}
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

var currentLoop;
var frameDur;
async function updateInfo() {
  currentLoop = psychoJS.experiment;
  expInfo['date'] = util.MonotonicClock.getDateStr();
  expInfo['expName'] = expName;
  expInfo['psychopyVersion'] = '2023.1.0';
  expInfo['OS'] = window.navigator.platform;

  expInfo['frameRate'] = psychoJS.window.getActualFrameRate();
  if (typeof expInfo['frameRate'] !== 'undefined')
    frameDur = 1.0 / Math.round(expInfo['frameRate']);
  else
    frameDur = 1.0 / 60.0;

  util.addInfoFromUrl(expInfo);
  psychoJS.experiment.dataFileName = (("." + "/") + `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`);
  return Scheduler.Event.NEXT;
}


//extra function
//function shuffleInPlace(arr) {
 // for (let i = arr.length - 1; i > 0; i--) {
 //   const j = Math.floor(Math.random() * (i + 1)); // 0..i
 //   [arr[i], arr[j]] = [arr[j], arr[i]];
 // }
 // return arr;
//}
function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));  // Random index between 0 and i
    const temp = arr[i];  // Swap arr[i] and arr[j]
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// --- Eyetracking components (largely unchanged) ---
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
//var trackingTrialClock; // If you add a tracking validation screen
//var tracking_square;
//var trackingTxt;
//var tracking_resp;

// --- General Experiment Components ---
var IntroClock;
var Intro;
var AttributesInfo; // Renamed from Attributes
var ButtonIntro;
var StartButton;
var mouse_2;
var Blank2Clock;
var Starting_title;
var One_title;
var Two_title;
var Three_title;
var trialClock;
var mouse;
var pid;
var useRows;
var blankClock;
var text_blank; // Renamed from 'text' to be more specific
var EndClock;
var Msg;
var globalClock;
var routineTimer;

// --- Flight Choice Components ---
// Column Backgrounds
var Option1_ColBG;
var Option2_ColBG;
var Option3_ColBG;

// Service Names (Text) - Not used in this layout, but kept for potential use
// var Option1_Name_Display;
// var Option2_Name_Display;
// var Option3_Name_Display;

// Airline Logos (Images)
var Option1_Logo;
var Option2_Logo;
var Option3_Logo;

// Attribute Value Displays (Text or TextBox)
var Option1_Attr1_Val;
var Option1_Attr2_Val;
var Option2_Attr1_Val;
var Option2_Attr2_Val;
var Option3_Attr1_Val;
var Option3_Attr2_Val;

// Attribute Name Displays (within cards)
var Option1_Attr1_Name;
var Option1_Attr2_Name;
var Option2_Attr1_Name;
var Option2_Attr2_Name;
var Option3_Attr1_Name;
var Option3_Attr2_Name;

// For barcode squares
//var brsquarewhi;
//var brsquarebla;

//truncate
const cut3 = n => Math.trunc(n * 1000) / 1000;

async function experimentInit() {
  // Initialize components for calibrating Routines (largely unchanged)
  initializeEyetrackingClock = new util.Clock();
  let averagingWindow = 10;
  window.xGazes = new Array(averagingWindow).fill(0);
  window.yGazes = new Array(averagingWindow).fill(0);
  webcamWarning = new visual.TextStim({
    win: psychoJS.window, name: 'webcamWarning',
    text: 'This experiment uses eye tracking. You should see your web browser request access to your webcam. You might need to click on this text to trigger the request. Please permit access, and wait a moment for the system to set up. Additionally, for the best experience, the experiment must be conducted in fullscreen mode.\nTo do this, press Fn + F11 on your keyboard. This will maximize the window and ensure the experiment runs smoothly.',
    font: 'Open Sans', units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'), opacity: undefined, depth: -1.0
  });
  inst1Clock = new util.Clock();
  instruction1Txt = new visual.TextStim({
    win: psychoJS.window, name: 'instruction1Txt',
    text: 'We are almost ready to get started.\nRemember tu run the experiment fullscreen (press Fn + F11 on your keyboard if not).\nPlease, center your face inside the green square and keep it there.\nPress space to move on.',
    font: 'Open Sans', units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'), opacity: undefined, depth: -1.0
  });
  inst1_resp = new core.Keyboard({ psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true });
  calibrationIntroClock = new util.Clock();
  calibrationTxt = new visual.TextStim({
    win: psychoJS.window, name: 'calibrationTxt',
    text: "First we need to calibrate the eye tracker. Please try to keep your head still.\nAlso, we suggest using a well-lit environment with front-facing, even lighting; avoid bright windows behind you. Clear eye visibility improves tracking accuracy.\nCircles will appear at different locations on the screen. Please click each circle with your mouse as you 're looking at them.\nClick anywhere with the mouse to continue...",
    font: 'Open Sans', units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'), opacity: undefined, depth: 0.0
  });
  calibrationMouse = new core.Mouse({ win: psychoJS.window });
  calibrationMouse.mouseClock = new util.Clock();
  calibrationClock = new util.Clock();
  calibration_square = new visual.Polygon({
    win: psychoJS.window, name: 'calibration_square',
    edges: 96, radius: 0.01, ori: 0.0, pos: [0, 0],
    lineWidth: 1.0, 
    lineColor: new util.Color('black'),
    fillColor: new util.Color('black'),
    opacity: undefined, depth: -1, interpolate: true,
  });
  calibrationClick = new core.Mouse({ win: psychoJS.window });
  calibrationClick.mouseClock = new util.Clock();
  
  // Barcode squares (kept from original, for sync if needed)
  //brsquarewhi = new visual.Rect ({
  //  win: psychoJS.window, name: 'brsquarewhi', 
  //  width: sizesquarebw[0], height: sizesquarebw[1], ori: 0.0, pos: positionsquarebw,
  //  lineWidth: 1.0, lineColor: new util.Color('white'), fillColor: new util.Color('white'),
  //  opacity: undefined, depth: -1, interpolate: true,
  //});
  //brsquarebla = new visual.Rect ({
  //  win: psychoJS.window, name: 'brsquarebla', 
  //  width: sizesquarebw[0], height: sizesquarebw[1], ori: 0.0, pos: positionsquarebw,
  //  lineWidth: 1.0, lineColor: new util.Color('black'), fillColor: new util.Color('black'),
  //  opacity: undefined, depth: -1, interpolate: true,
  //});

  // Initialize components for Routine "Intro"
  IntroClock = new util.Clock();
  Intro = new visual.TextStim({
    win: psychoJS.window, name: 'Intro',
    // USER: Update instruction text
    text: "You are planning a trip and need to choose a flight. You'll be presented with some options. Each has different characteristics (e.g., price, offset emissions). Please choose the flight that suits you best, just as you would in real life, by clicking the logo of the airline during the experiment.", // MODIFIED
    font: 'Open Sans', units: undefined, pos: [0, 0.7], height: 0.05, wrapWidth: 1.2, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
  });
  AttributesInfo = new visual.TextStim({
    win: psychoJS.window, name: 'AttributesInfo',
    // USER: Update attribute descriptions
    text: `The Attributes are:\n${attribute1Name}: Share of the flight’s CO₂ emissions compensated by retiring verified carbon credits that reduce or remove equivalent emissions elsewhere.\n${attribute2Name}: The price of the flight (in ${attribute2Units})`, // MODIFIED
    font: 'Open Sans', units: undefined, pos: [0, 0.3], height: 0.05, wrapWidth: 1.2, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: -1.0
  });
  ButtonIntro = new visual.TextStim({
    win: psychoJS.window, name: 'ButtonIntro',
    text: 'Remember to keep your head still during the experiment.\nTo start, press the button down below.',
    font: 'Open Sans', units: undefined, pos: [0, -0.2], height: 0.05, wrapWidth: 1.2, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: -2.0
  });
  StartButton = new visual.ImageStim({
    win : psychoJS.window, name : 'StartButton', units : undefined, 
    image : 'Images/StartButton.png', mask : undefined, anchor : 'center',
    ori : 0.0, pos : [0, (- 0.5)], size : [0.25, 0.3],
    color : new util.Color([1,1,1]), opacity : undefined, flipHoriz : false, flipVert : false,
    texRes : 128.0, interpolate : true, depth : -3.0 
  });
  mouse_2 = new core.Mouse({ win: psychoJS.window });
  mouse_2.mouseClock = new util.Clock();

  // Initialize components for Routine "Blank2" (countdown - can remain as is)
  Blank2Clock = new util.Clock();
  Starting_title = new visual.TextStim({
    win: psychoJS.window, name: 'Starting_title', text: 'Starting in...',
    font: 'Open Sans', units: undefined, pos: [0, 0.25], height: 0.05, wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
  });
  One_title = new visual.TextStim({
    win: psychoJS.window, name: 'One_title', text: '1', font: 'Open Sans',
    units: undefined, pos: [0, 0], height: 0.05, color: new util.Color('black'), depth: -1.0
  });
  Two_title = new visual.TextStim({
    win: psychoJS.window, name: 'Two_title', text: '2', font: 'Open Sans',
    units: undefined, pos: [0, 0], height: 0.05, color: new util.Color('black'), depth: -2.0
  });
  Three_title = new visual.TextStim({
    win: psychoJS.window, name: 'Three_title', text: '3', font: 'Open Sans',
    units: undefined, pos: [0, 0], height: 0.05, color: new util.Color('black'), depth: -3.0
  });
  
  topMsg = new visual.TextStim({
    win: psychoJS.window, name: 'topMsg', text: '',
    font: 'Open Sans', units: undefined, pos: [topmsglocation[0], topmsglocation[1]], height: 0.075, wrapWidth: 1.25, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 10.0
  });

  // Initialize components for Routine "trial"
  trialClock = new util.Clock();

  // Column Backgrounds (visual "cards")
  const commonCardStyle = {
      win: psychoJS.window, units: 'norm',
      width: columnWidth, height: columnHeight,
      lineWidth: 2, lineColor: new util.Color('darkgrey'),
      fillColor: new util.Color('white'),
      opacity: 1, interpolate: true,
  };
  Option1_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option1_ColBG', pos: [col1_x, attr1_y_offset] });
  Option2_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option2_ColBG', pos: [col2_x, attr1_y_offset] });
  Option3_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option3_ColBG', pos: [col3_x, attr1_y_offset] });
  
  // Airline Logos
  const commonLogoStyle = {
      win: psychoJS.window, units: 'norm',
      size: logoSize, anchor: 'center',
      color: new util.Color([1,1,1]), opacity: 1,
      interpolate: true,
  };
  Option1_Logo = new visual.ImageStim({ ...commonLogoStyle, name: 'Option1_Logo', pos: [col1_x, logo_y_offset] });
  Option2_Logo = new visual.ImageStim({ ...commonLogoStyle, name: 'Option2_Logo', pos: [col2_x, logo_y_offset] });
  Option3_Logo = new visual.ImageStim({ ...commonLogoStyle, name: 'Option3_Logo', pos: [col3_x, logo_y_offset] });

  ensureBaseSize(Option1_Logo);
  ensureBaseSize(Option2_Logo);
  ensureBaseSize(Option3_Logo)

  // Attribute Names (within cards)
  const commonAttrNameStyle = {
      win: psychoJS.window, units: 'norm',
      font: 'Arial', letterHeight: attributeNameTextSize,
      color: new util.Color('dimgray'), anchor: 'center', wrapWidth: columnWidth * 0.9,
  };

  Option1_Attr1_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option1_Attr1_Name', text: `${attribute1Name} :`, pos: [col1_x, attr1_y_offset + postextattname ] });
  Option1_Attr2_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option1_Attr2_Name', text: `${attribute2Name} :`, pos: [col1_x, attr2_y_offset + postextattname ] });
  Option2_Attr1_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option2_Attr1_Name', text: `${attribute1Name} :`, pos: [col2_x, attr1_y_offset + postextattname ] });
  Option2_Attr2_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option2_Attr2_Name', text: `${attribute2Name} :`, pos: [col2_x, attr2_y_offset + postextattname ] });
  Option3_Attr1_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option3_Attr1_Name', text: `${attribute1Name} :`, pos: [col3_x, attr1_y_offset + postextattname ] });
  Option3_Attr2_Name = new visual.TextStim({ ...commonAttrNameStyle, name: 'Option3_Attr2_Name', text: `${attribute2Name} :`, pos: [col3_x, attr2_y_offset + postextattname ] });

  // Attribute Values
  const commonAttrValStyle = {
      win: psychoJS.window, units: 'norm',
      font: 'Arial', letterHeight: valueTextSize,
      color: new util.Color('black'), anchor: 'center', wrapWidth: columnWidth*0.8,
  };

  Option1_Attr1_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option1_Attr1_Val', pos: [col1_x, attr1_y_offset - postextattvalue] });
  Option1_Attr2_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option1_Attr2_Val', pos: [col1_x, attr2_y_offset - postextattvalue] });
  Option2_Attr1_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option2_Attr1_Val', pos: [col2_x, attr1_y_offset - postextattvalue] });
  Option2_Attr2_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option2_Attr2_Val', pos: [col2_x, attr2_y_offset - postextattvalue] });
  Option3_Attr1_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option3_Attr1_Val', pos: [col3_x, attr1_y_offset - postextattvalue] });
  Option3_Attr2_Val = new visual.TextStim({ ...commonAttrValStyle, name: 'Option3_Attr2_Val', pos: [col3_x, attr2_y_offset - postextattvalue] });

  mouse = new core.Mouse({ win: psychoJS.window });
  mouse.mouseClock = new util.Clock();
  
  pid = 1;
  useRows = (((Trials * (pid - 1)).toString() + ":") + ((Trials * (pid - 1)) + Trials).toString());

  blankClock = new util.Clock();
  text_blank = new visual.TextStim({
    win: psychoJS.window, name: 'text_blank', text: '', font: 'Open Sans',
    units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
  });

  afterblankClock = new util.Clock();

  text_afterblank = new visual.TextStim({
    win: psychoJS.window, name: 'text_afterblank', text: '', font: 'Open Sans',
    units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
  });

  EndClock = new util.Clock();
  Msg = new visual.TextBox({
    win: psychoJS.window, name: 'Msg', text: 'Thanks for participating!\nTo exit fullscreen mode,\npress Fn + F11 again.',
    font: 'Open Sans', pos: [0, 0], letterHeight: 0.05, size: [1, 0.7],
    color: 'black', fillColor: 'white', borderColor: 'black',
    depth: 0.0
  });
  
  globalClock = new util.Clock();
  routineTimer = new util.CountdownTimer();
  return Scheduler.Event.NEXT;
}


//UPDATE FUNCTIONS
function updateAttributeValuePositions(a,b,c) {

  if ([a,b,c].some(v => typeof v !== 'number' || !isFinite(v))) {
  console.warn('updateAttributeValuePositions called with invalid args:', a, b, c);
  return;
  }

  Option1_Attr1_Val.setPos([a, attr1_y_offset - postextattvalue]);
  Option1_Attr2_Val.setPos([a, attr2_y_offset - postextattvalue]);
  Option1_Attr1_Name.setPos([a, attr1_y_offset + postextattname]);
  Option1_Attr2_Name.setPos([a, attr2_y_offset + postextattname]);

  Option2_Attr1_Val.setPos([b, attr1_y_offset - postextattvalue]);
  Option2_Attr2_Val.setPos([b, attr2_y_offset - postextattvalue]);
  Option2_Attr1_Name.setPos([b, attr1_y_offset + postextattname]);
  Option2_Attr2_Name.setPos([b, attr2_y_offset + postextattname]);

  Option3_Attr1_Val.setPos([c, attr1_y_offset - postextattvalue]);
  Option3_Attr2_Val.setPos([c, attr2_y_offset - postextattvalue]);
  Option3_Attr1_Name.setPos([c, attr1_y_offset + postextattname]);
  Option3_Attr2_Name.setPos([c, attr2_y_offset + postextattname]);
}

//
function updateBoxLabelPositions(a,b,c) {

  if ([a,b,c].some(v => typeof v !== 'number' || !isFinite(v))) {
  console.warn('updateBoxLabelPositions called with invalid args:', a, b, c);
  return;
  }

  Option1_Logo.setPos( [a, logo_y_offset] );
  Option1_ColBG.setPos( [a, attr1_y_offset] );

  Option2_Logo.setPos( [b, logo_y_offset] );
  Option2_ColBG.setPos( [b, attr1_y_offset] );

  Option3_Logo.setPos( [c, logo_y_offset] );
  Option3_ColBG.setPos( [c, attr1_y_offset] );
}


// --- EYETRACKING ROUTINES (initializeEyetracking, inst1, calibrationIntro, calibration, trackingTrial) ---
// These routines remain unchanged.

var t;
var frameN;
var continueRoutine;
var initializeEyetrackingComponents;
function initializeEyetrackingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    
    //------Prepare to start Routine 'initializeEyetracking'-------
    t = 0;
    initializeEyetrackingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    window.webgazer.params.showVideoPreview = true; //true
    webgazer.params.showVideo        = false;
    window.webgazer.params.showFaceFeedbackBox = true;
    window.webgazer.params.showFaceOverlay = true;
    window.webgazer.params.showGazeDot = false;
    //webgazer.setTracker('clmtrackr'); //headposition marks

    window.webgazer
        .setGazeListener(function(data, clock) {
          if (data !== null) {
            window.xGazes.shift();
            window.xGazes.push(data.x);
            window.yGazes.shift();
            window.yGazes.push(data.y);
           }
        })
        .begin();
    setTimeout(() => {
        const videoElement = document.querySelector('video'); 
        if (videoElement) {
            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;
            console.log('Video Resolution:', videoWidth, ' x,', videoHeight , ' y');
        } else {
            console.error('Video element not found');
        }
    }, 1000); 
    
    initializeEyetrackingComponents = [];
    initializeEyetrackingComponents.push(webcamWarning);
    
    for (const thisComponent of initializeEyetrackingComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function initializeEyetrackingRoutineEachFrame() {
  return async function () {
    t = initializeEyetrackingClock.getTime();
    frameN = frameN + 1;

    continueRoutine = 
      !window.webgazer.isReady() || 
      document.getElementById('webgazerFaceFeedbackBox') === null ||
      document.getElementById('webgazerVideoFeed') === null;
    
    if (t >= 0.0 && webcamWarning.status === PsychoJS.Status.NOT_STARTED) {
      webcamWarning.tStart = t; 
      webcamWarning.frameNStart = frameN; 
      webcamWarning.setAutoDraw(true);
    }
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { 
      return Scheduler.Event.NEXT;
    }
    continueRoutine = false; 
    for (const thisComponent of initializeEyetrackingComponents)
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

function initializeEyetrackingRoutineEnd() {
  return async function () {
    for (const thisComponent of initializeEyetrackingComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    routineTimer.reset();
    return Scheduler.Event.NEXT;
  };
}

var _inst1_resp_allKeys;
var inst1Components;
function inst1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);    
    t = 0;
    inst1Clock.reset(); 
    frameN = -1;
    continueRoutine = true; 
    document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
    document.getElementById('webgazerVideoFeed').style.display = 'none';
    inst1_resp.keys = undefined;
    inst1_resp.rt = undefined;
    _inst1_resp_allKeys = [];
    inst1Components = [];
    inst1Components.push(instruction1Txt);
    inst1Components.push(inst1_resp);
    
    for (const thisComponent of inst1Components)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function inst1RoutineEachFrame() {
  return async function () {
    t = inst1Clock.getTime();
    frameN = frameN + 1;
    
    if (t >= 0.0 && instruction1Txt.status === PsychoJS.Status.NOT_STARTED) {
      instruction1Txt.tStart = t; 
      instruction1Txt.frameNStart = frameN; 
      instruction1Txt.setAutoDraw(true);
    }
    
    if (t >= 0.0 && inst1_resp.status === PsychoJS.Status.NOT_STARTED) {
      inst1_resp.tStart = t; 
      inst1_resp.frameNStart = frameN; 
      psychoJS.window.callOnFlip(function() { inst1_resp.clock.reset(); }); 
      psychoJS.window.callOnFlip(function() { inst1_resp.start(); }); 
      psychoJS.window.callOnFlip(function() { inst1_resp.clearEvents(); });
    }
    if (inst1_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = inst1_resp.getKeys({keyList: ['space'], waitRelease: false});
      _inst1_resp_allKeys = _inst1_resp_allKeys.concat(theseKeys);
      if (_inst1_resp_allKeys.length > 0) {
        inst1_resp.keys = _inst1_resp_allKeys[_inst1_resp_allKeys.length - 1].name; 
        inst1_resp.rt = _inst1_resp_allKeys[_inst1_resp_allKeys.length - 1].rt;
        continueRoutine = false;
      }
    }
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { 
      return Scheduler.Event.NEXT;
    }
    continueRoutine = false; 
    for (const thisComponent of inst1Components)
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

function inst1RoutineEnd() {
  return async function () {
    for (const thisComponent of inst1Components) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    psychoJS.experiment.addData('inst1_resp.keys', inst1_resp.keys);
    if (typeof inst1_resp.keys !== 'undefined') { 
        psychoJS.experiment.addData('inst1_resp.rt', inst1_resp.rt);
        routineTimer.reset();
        }
    inst1_resp.stop();
    routineTimer.reset();
    return Scheduler.Event.NEXT;
  };
}

var gotValidClick;
var calibrationIntroComponents;
var prevButtonState;
var _mouseButtons;
function calibrationIntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0;
    calibrationIntroClock.reset();
    frameN = -1;
    continueRoutine = true; 
    gotValidClick = false; 
    calibrationIntroComponents = [];
    calibrationIntroComponents.push(calibrationTxt);
    calibrationIntroComponents.push(calibrationMouse);
    
    for (const thisComponent of calibrationIntroComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function calibrationIntroRoutineEachFrame() {
  return async function () {
    t = calibrationIntroClock.getTime();
    frameN = frameN + 1;
    
    if (t >= 0.0 && calibrationTxt.status === PsychoJS.Status.NOT_STARTED) {
      calibrationTxt.tStart = t; 
      calibrationTxt.frameNStart = frameN; 
      calibrationTxt.setAutoDraw(true);
    }
    if (t >= 0.0 && calibrationMouse.status === PsychoJS.Status.NOT_STARTED) {
      calibrationMouse.tStart = t; 
      calibrationMouse.frameNStart = frameN; 
      calibrationMouse.status = PsychoJS.Status.STARTED;
      calibrationMouse.mouseClock.reset();
      prevButtonState = calibrationMouse.getPressed(); 
      }
    if (calibrationMouse.status === PsychoJS.Status.STARTED) { 
      _mouseButtons = calibrationMouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { 
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
          continueRoutine = false;
        }
      }
    }
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { 
      return Scheduler.Event.NEXT;
    }
    continueRoutine = false; 
    for (const thisComponent of calibrationIntroComponents)
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

var _mouseXYs;
function calibrationIntroRoutineEnd() {
  return async function () {
    for (const thisComponent of calibrationIntroComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    _mouseXYs = calibrationMouse.getPos();
    _mouseButtons = calibrationMouse.getPressed();
    psychoJS.experiment.addData('calibrationMouse.x', _mouseXYs[0]);
    psychoJS.experiment.addData('calibrationMouse.y', _mouseXYs[1]);
    psychoJS.experiment.addData('calibrationMouse.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('calibrationMouse.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('calibrationMouse.rightButton', _mouseButtons[2]);
    routineTimer.reset();
    return Scheduler.Event.NEXT;
  };
}

var trialsc;
function trialscalLoopBegin(trialscalLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot); 
    trialsc = new TrialHandler({
      psychoJS: psychoJS,
      nReps: 1, method: TrialHandler.Method.RANDOM,
      extraInfo: expInfo, originPath: undefined,
      trialList: 'calibration_trials.xlsx',
      seed: undefined, name: 'trialsc'
    });
    psychoJS.experiment.addLoop(trialsc); 
    currentLoop = trialsc; 
    for (const thisTrial of trialsc) {
      const snapshot = trialsc.getSnapshot();
      trialscalLoopScheduler.add(importConditions(snapshot));
      trialscalLoopScheduler.add(calibrationRoutineBegin(snapshot));
      trialscalLoopScheduler.add(calibrationRoutineEachFrame());
      trialscalLoopScheduler.add(calibrationRoutineEnd());
      trialscalLoopScheduler.add(endLoopcalIteration(trialscalLoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
  }
}

async function trialscalLoopEnd() {
  psychoJS.experiment.removeLoop(trialsc);
  return Scheduler.Event.NEXT;
}

var callib_color;
var calibrationComponents;

function calibrationRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); 
    t = 0;
    calibrationClock.reset(); 
    frameN = -1;
    continueRoutine = true; 
    routineTimer.add(3.500000);
    var canvas = psychoJS.window.size;
    var scaling = [
      canvas[0] <= canvas[1]? 1: canvas[0] / canvas[1],
      canvas[1] <= canvas[0]? 1: canvas[1] / canvas[0]
    ];
    callib_color = 'black';
    calibration_square.setPos([calibration_x, calibration_y]);
    calibrationClick.clicked_name = [];
    gotValidClick = false; 
    calibrationComponents = [];
    calibrationComponents.push(calibration_square);
    calibrationComponents.push(calibrationClick);
    
    for (const thisComponent of calibrationComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

var frameRemains;
function calibrationRoutineEachFrame() {
  return async function () {
    t = calibrationClock.getTime();
    frameN = frameN + 1;
    
    if (webgazer.checkEyesInValidationBox() === true) {
      if (
        document.getElementById('webgazerFaceFeedbackBox').style.display != 'none' &&
        (new Date).getTime() > window.eyesExitedTimestamp + window.eyesReturnedDelay //eyesReturnedDelay might not be defined globally
      ) {   
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'none';
        document.getElementById('webgazerVideoFeed').style.display = 'none';
      }
    } else {
        window.eyesExitedTimestamp = (new Date).getTime();
        document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
        document.getElementById('webgazerVideoFeed').style.display = 'none';
    }
        
    if (t >= 0.5 && calibration_square.status === PsychoJS.Status.NOT_STARTED) {
      calibration_square.tStart = t; 
      calibration_square.frameNStart = frameN; 
      calibration_square.setAutoDraw(true);
    }
    frameRemains = 0.5 + 3 - psychoJS.window.monitorFramePeriod * 0.75; 
    if (calibration_square.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      calibration_square.setAutoDraw(false);
    }
    if (calibration_square.status === PsychoJS.Status.STARTED){ 
      calibration_square.setFillColor(new util.Color(callib_color), false);
    }
    if (t >= 0.5 && calibrationClick.status === PsychoJS.Status.NOT_STARTED) {
      calibrationClick.tStart = t; 
      calibrationClick.frameNStart = frameN; 
      calibrationClick.status = PsychoJS.Status.STARTED;
      calibrationClick.mouseClock.reset();
      prevButtonState = calibrationClick.getPressed(); 
      }
    frameRemains = 0.5 + 3 - psychoJS.window.monitorFramePeriod * 0.75; 
    if (calibrationClick.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      calibrationClick.status = PsychoJS.Status.FINISHED;
    }
    if (calibrationClick.status === PsychoJS.Status.STARTED) { 
      _mouseButtons = calibrationClick.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) { 
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) { 
          gotValidClick = false;
          for (const obj of [calibration_square]) {
            if (obj.contains(calibrationClick)) {
              gotValidClick = true;
              calibrationClick.clicked_name.push(obj.name)
            }
          }
          continueRoutine = false;
        }
      }
    }
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { 
      return Scheduler.Event.NEXT;
    }
    continueRoutine = false; 
    for (const thisComponent of calibrationComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true;
        break;
      }
    if (continueRoutine && routineTimer.getTime() > 0) {
      return Scheduler.Event.FLIP_REPEAT;
    } else {
      return Scheduler.Event.NEXT;
    }
  };
}

function calibrationRoutineEnd() {
  return async function () {
    for (const thisComponent of calibrationComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') {
        thisComponent.setAutoDraw(false);
      }
    }
    _mouseXYs = calibrationClick.getPos();
    _mouseButtons = calibrationClick.getPressed();
    psychoJS.experiment.addData('calibrationClick.x', _mouseXYs[0]);
    psychoJS.experiment.addData('calibrationClick.y', _mouseXYs[1]);
    psychoJS.experiment.addData('calibrationClick.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('calibrationClick.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('calibrationClick.rightButton', _mouseButtons[2]);
    if (calibrationClick.clicked_name.length > 0) {
      psychoJS.experiment.addData('calibrationClick.clicked_name', calibrationClick.clicked_name[0]);}
    return Scheduler.Event.NEXT;
  };
}

function endLoopcalIteration(scheduler, snapshot) {
  return async function () {
    if (typeof snapshot !== 'undefined') {
      if (snapshot.finished) {
        if (psychoJS.experiment.isEntryEmpty()) {
          psychoJS.experiment.nextEntry(snapshot);
        }
        scheduler.stop();
      } else {
        const thisTrial = snapshot.getCurrentTrial();
        if (typeof thisTrial === 'undefined' || !('isTrials' in thisTrial) || thisTrial.isTrials) {
          psychoJS.experiment.nextEntry(snapshot);
        }
      }
    return Scheduler.Event.NEXT;
    }
  };
}

// --- END EYETRACKING ROUTINES ---


// --- INTRO ROUTINE ---
var clicked_things1;
var clickables1;
var waiting1;
var IntroComponents;


function IntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0;
    IntroClock.reset();
    frameN = -1;
    continueRoutine = true;
    mouse_2.x = []; mouse_2.y = []; mouse_2.leftButton = []; mouse_2.midButton = [];
    mouse_2.rightButton = []; mouse_2.time = []; mouse_2.clicked_name = [];
    gotValidClick = false;
    clicked_things1 = [];
    clickables1 = [StartButton];
    waiting1 = false;
    
    IntroComponents = [];
    IntroComponents.push(Intro);
    IntroComponents.push(AttributesInfo);
    IntroComponents.push(ButtonIntro);
    IntroComponents.push(StartButton);
    IntroComponents.push(mouse_2);
    
    //NEWCODE
    ensureBaseSize(StartButton);

    var canvas = psychoJS.window.size;
    psychoJS.experiment.addData('ScreenRes_pixels', [ canvas[0] , canvas[1] ] );
    setTimeout(() => {
        const videoElement = document.querySelector('video');
        if (videoElement) {
            psychoJS.experiment.addData('Camera_pixels', [videoElement.videoWidth, videoElement.videoHeight] );
        } else {
            psychoJS.experiment.addData('Camera_pixels', [0, 0] );
        }
    }, 1000);

    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent)
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

var _pj;
var clickedNum;

function IntroRoutineEachFrame() {
  return async function () {
    t = IntroClock.getTime();
    frameN = frameN + 1;
    
        // reset cursor each frame before checks
    setCursor('default');

    // grow Start button when hovered
    updateHover(StartButton, mouse_2);

    if (t >= 0.0 && Intro.status === PsychoJS.Status.NOT_STARTED) {
      Intro.tStart = t; Intro.frameNStart = frameN; Intro.setAutoDraw(true);
    }
    if (t >= 0.0 && AttributesInfo.status === PsychoJS.Status.NOT_STARTED) {
      AttributesInfo.tStart = t; AttributesInfo.frameNStart = frameN; AttributesInfo.setAutoDraw(true);
    }
    if (t >= 0.0 && ButtonIntro.status === PsychoJS.Status.NOT_STARTED) {
      ButtonIntro.tStart = t; ButtonIntro.frameNStart = frameN; ButtonIntro.setAutoDraw(true);
    }
    if (t >= 0.0 && StartButton.status === PsychoJS.Status.NOT_STARTED) {
      StartButton.tStart = t; StartButton.frameNStart = frameN; StartButton.setAutoDraw(true);
    }
    if (t >= 0.0 && mouse_2.status === PsychoJS.Status.NOT_STARTED) {
      mouse_2.tStart = t; mouse_2.frameNStart = frameN; mouse_2.status = PsychoJS.Status.STARTED;
      mouse_2.mouseClock.reset();
      prevButtonState = mouse_2.getPressed(); 
    }
    if (mouse_2.status === PsychoJS.Status.STARTED) {
      _mouseButtons = mouse_2.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) {
          gotValidClick = false;
          for (const obj of clickables1) {
            if (obj.contains(mouse_2)) {
              gotValidClick = true;
              mouse_2.clicked_name.push(obj.name);
              if (obj.name === 'StartButton') continueRoutine = false; 
            }
          }
          _mouseXYs = mouse_2.getPos();
          mouse_2.x.push(_mouseXYs[0]); mouse_2.y.push(_mouseXYs[1]);
          mouse_2.leftButton.push(_mouseButtons[0]); mouse_2.midButton.push(_mouseButtons[1]);
          mouse_2.rightButton.push(_mouseButtons[2]); mouse_2.time.push(mouse_2.mouseClock.getTime());
        }
      }
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of IntroComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };
}

function IntroRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of IntroComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    psychoJS.experiment.addData('mouse_2.x', mouse_2.x);
    psychoJS.experiment.addData('mouse_2.y', mouse_2.y);
    psychoJS.experiment.addData('mouse_2.leftButton', mouse_2.leftButton);
    psychoJS.experiment.addData('mouse_2.midButton', mouse_2.midButton);
    psychoJS.experiment.addData('mouse_2.rightButton', mouse_2.rightButton);
    psychoJS.experiment.addData('mouse_2.time', mouse_2.time);
    psychoJS.experiment.addData('mouse_2.clicked_name', mouse_2.clicked_name);
    routineTimer.reset();
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

// --- BLANK2 ROUTINE (COUNTDOWN) ---
var Blank2Components;
function Blank2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);    
    t = 0; Blank2Clock.reset(); frameN = -1; continueRoutine = true; routineTimer.add(4.000000);
    Blank2Components = [];
    Blank2Components.push(Starting_title); Blank2Components.push(One_title);
    Blank2Components.push(Two_title); Blank2Components.push(Three_title);
    for (const thisComponent of Blank2Components)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function Blank2RoutineEachFrame() {
  return async function () {
    t = Blank2Clock.getTime(); frameN = frameN + 1;
    if (t >= 0.0 && Starting_title.status === PsychoJS.Status.NOT_STARTED) {
      Starting_title.tStart = t; Starting_title.frameNStart = frameN; Starting_title.setAutoDraw(true);
    }
    frameRemains = 0.0 + 4.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (Starting_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Starting_title.setAutoDraw(false);
    }
    if (t >= 3.0 && One_title.status === PsychoJS.Status.NOT_STARTED) {
      One_title.tStart = t; One_title.frameNStart = frameN; One_title.setAutoDraw(true);
    }
    frameRemains = 3.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (One_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      One_title.setAutoDraw(false);
    }
    if (t >= 2.0 && Two_title.status === PsychoJS.Status.NOT_STARTED) {
      Two_title.tStart = t; Two_title.frameNStart = frameN; Two_title.setAutoDraw(true);
    }
    frameRemains = 2.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (Two_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Two_title.setAutoDraw(false);
    }
    if (t >= 1.0 && Three_title.status === PsychoJS.Status.NOT_STARTED) {
      Three_title.tStart = t; Three_title.frameNStart = frameN; Three_title.setAutoDraw(true);
    }
    frameRemains = 1.0 + 1.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (Three_title.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Three_title.setAutoDraw(false);
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of Blank2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine && routineTimer.getTime() > 0) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };
}

function Blank2RoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of Blank2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

//NEWCODE

// --- TRIALS LOOP (First session) ---
var trials,trials2;

function trials2LoopBegin(trials2LoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot);
    trials2 = new TrialHandler({
      psychoJS: psychoJS,
      nReps: Trials1, 
      method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo,
      originPath: undefined,
      trialList: [{}], 
      seed: undefined,
      name: 'trials2'
    });

    psychoJS.experiment.addLoop(trials2);
    currentLoop = trials2;

    for (const thisTrial of trials2) {
      trials2LoopScheduler.add(blankRoutineBegin(snapshot));
      trials2LoopScheduler.add(blankRoutineEachFrame());
      trials2LoopScheduler.add(blankRoutineEnd(snapshot));
      snapshot = trials2.getSnapshot();
      trials2LoopScheduler.add(importConditions(snapshot)); 
      trials2LoopScheduler.add(trial2RoutineBegin(snapshot));
      trials2LoopScheduler.add(trial2RoutineEachFrame());
      trials2LoopScheduler.add(trial2RoutineEnd(snapshot));
      trials2LoopScheduler.add(afterblankRoutineBegin(snapshot));
      trials2LoopScheduler.add(afterblankRoutineEachFrame());
      trials2LoopScheduler.add(afterblankRoutineEnd(snapshot));

      TrialSoFar += 1;
      console.log(TrialSoFar);
      if (TrialSoFar % CALIB_EVERY === 0 && TrialSoFar < Trials ) {
        console.log(TrialSoFar);
        // splice your existing calibration block
        calibrationTxt.setText(
        "Quick check: we’re recalibrating the eye tracker.\n" +
        "Remember to keep your head still during the experiment.\n" +
        "Please click each dot as you look at it."
        );
        trials2LoopScheduler.add(calibrationIntroRoutineBegin());
        trials2LoopScheduler.add(calibrationIntroRoutineEachFrame());
        trials2LoopScheduler.add(calibrationIntroRoutineEnd());
        const trialscalLoopScheduler = new Scheduler(psychoJS);
        trials2LoopScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
        trials2LoopScheduler.add(trialscalLoopScheduler);
        trials2LoopScheduler.add(trialscalLoopEnd);
      }

      trials2LoopScheduler.add(trials2LoopEndIteration(trials2LoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
  }
}

async function trials2LoopEnd() {
  psychoJS.experiment.removeLoop(trials2);
  if (psychoJS.experiment._unfinishedLoops.length > 0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;
  return Scheduler.Event.NEXT;
}

function trials2LoopEndIteration(scheduler, snapshot) {
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

// --- TRIAL ROUTINE (FLIGHT CHOICE, 2 services only) ---
var clicked_things;
var clickables;
var waiting;
var MOUSEGAZE;
var ETGAZE;
var ETGAZExT;
var time_trial;
var unixTime;
var ETGAZENF;
var StartTimeRoutine;
var trial2Components;

//Values
const flight_length = [2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];
const price_multiplier = [60, 70, 80, 90]; //competitor price = flightlength*pricemultiplier
const emission_multiplier = [60, 70, 80, 90, 100, 110, 120, 130, 140, 150]; //competitor emission = emission_multiplier
const offset_multiplier = [0.01, 0.02, 0.03, 0.04]; //variación para 
//target ticket price = competitor ticket price+ produced emissions* offset multiplier
var fli_len, pri_mul, emi_mul, off_mul, emi_pro, price_competitor, price_target;
var loc2opt;
const maplr = v => ( cut3( v ) === fixedposition_s1_x[0] ? 'Option1_Logo' : cut3( v ) === fixedposition_s1_x[1] ? 'Option2_Logo' : 'Problem_With_JS');

function trial2RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0;
    trialClock.reset();
    frameN = -1;
    continueRoutine = true;
    
    //variables needed to change
    // Column positions (centered)
    updateBoxLabelPositions( fixedposition_s1_x[0], fixedposition_s1_x[1], fixedposition_s1_x[2] )
    col1_x = posx1;
    col2_x = -col1_x;
    col3_x = 2
    loc2opt = [col1_x, col2_x];
    shuffleInPlace(loc2opt);
    col1_x = loc2opt[0];
    col2_x = loc2opt[1];
    updateAttributeValuePositions(loc2opt[0], loc2opt[1], 2)
    
    // Set logos - only two
    Option1_Logo.setImage( 'Images/Option1.png');
    Option2_Logo.setImage( 'Images/Option2.png');

    fli_len = sample1(flight_length);
    pri_mul = sample1(price_multiplier);
    emi_mul = sample1(emission_multiplier);
    off_mul = sample1(offset_multiplier);
    emi_pro = fli_len*emi_mul;
    price_competitor = Math.round( fli_len*pri_mul );
    price_target = Math.round( price_competitor + off_mul*emi_pro);
    
    //message
    topMsg.setText(
      `Suppose that you are planning a ${fli_len} hour flight. ` +
      `This flight produces ${Math.round(emi_pro)} kg of CO₂ emissions. ` +
      `Please choose your preferred option below.`
    );

    // Set attribute values
    Option1_Attr1_Val.setText( '0%' );
    Option1_Attr2_Val.setText( `${attribute2Units}${ price_competitor }` );
    Option2_Attr1_Val.setText( '100%' );
    Option2_Attr2_Val.setText( `${attribute2Units}${ price_target }` );

    mouse.x = []; mouse.y = []; mouse.leftButton = []; mouse.midButton = [];
    mouse.rightButton = []; mouse.time = []; mouse.clicked_name = [];
    gotValidClick = false;
    
    clicked_things = [];
    clickables = [Option1_Logo, Option2_Logo];  // Only 2
    
    waiting = false;
    MOUSEGAZE = []; ETGAZE = []; ETGAZENF = []; ETGAZExT = [];
    time_trial = []; unixTime=[];
    StartTimeRoutine = t;

    trial2Components = [];
    trial2Components.push(Option1_ColBG, Option2_ColBG);
    trial2Components.push(Option1_Logo, Option2_Logo);
    trial2Components.push(Option1_Attr1_Name, Option1_Attr2_Name,
                          Option2_Attr1_Name, Option2_Attr2_Name);
    trial2Components.push(Option1_Attr1_Val, Option1_Attr2_Val,
                          Option2_Attr1_Val, Option2_Attr2_Val);
    trial2Components.push(mouse);
    //trial2Components.push(brsquarewhi);
    trial2Components.push(topMsg);
    
    for (const thisComponent of trial2Components)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

var clickedN;
function trial2RoutineEachFrame() {
  return async function () {
    t = trialClock.getTime();
    frameN = frameN + 1;
    
    setCursor('default');    // reset each frame

    updateHover(Option1_Logo, mouse);
    updateHover(Option2_Logo, mouse);

    for (const thisComponent of trial2Components) {
        if (thisComponent.status === PsychoJS.Status.NOT_STARTED && t >= 0.0) {
            thisComponent.tStart = t;
            thisComponent.frameNStart = frameN;
            if (typeof thisComponent.setAutoDraw === 'function') {
                 thisComponent.setAutoDraw(true);
            }
        }
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      mouse.tStart = t;
      mouse.frameNStart = frameN;
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();
      }
    if (mouse.status === PsychoJS.Status.STARTED) {
      _mouseButtons = mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) {
          gotValidClick = false;
          for (const obj of [Option1_Logo, Option2_Logo, Option3_Logo ]) {
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

    // Choice logic
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
    if (waiting && (t > (startTime + 0.5))) {
        continueRoutine = false;
    }

    // Webgazer data collection
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1]]);
    let x_gaze = util.sum(window.xGazes) / window.xGazes.length;
    let y_gaze = util.sum(window.yGazes) / window.yGazes.length;
    const xNorm = ( x_gaze - (psychoJS.window.size[0] / 2) ) / (psychoJS.window.size[0] / 2);
    const yNorm = - ( y_gaze - (psychoJS.window.size[1] / 2 ) ) / (psychoJS.window.size[1] / 2);
    ETGAZE.push([xNorm, yNorm]);
    ETGAZExT.push([xNorm, yNorm, t]);
    time_trial.push(t);
    unixTime.push(new Date().getTime());
    ETGAZENF.push([x_gaze, y_gaze]);

    // Spacebar to choose none
    if (t >= 0.0 && inst1_resp.status === PsychoJS.Status.NOT_STARTED) {
      inst1_resp.tStart = t; inst1_resp.frameNStart = frameN;
      psychoJS.window.callOnFlip(function() { inst1_resp.clock.reset(); }); 
      psychoJS.window.callOnFlip(function() { inst1_resp.start(); });
      psychoJS.window.callOnFlip(function() { inst1_resp.clearEvents(); });
    }
    if (inst1_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = inst1_resp.getKeys({keyList: ['space'], waitRelease: false});
      _inst1_resp_allKeys = _inst1_resp_allKeys.concat(theseKeys);
      if (_inst1_resp_allKeys.length > 0) {
        choice = 'None_Via_Spacebar';
        continueRoutine = false;
      }
    }
    _inst1_resp_allKeys = [];

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of trial2Components)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };

}

function trial2RoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of trial2Components) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (inst1_resp.status === PsychoJS.Status.STARTED) inst1_resp.stop();

    psychoJS.experiment.addData('Choice', choice);
    psychoJS.experiment.addData('TrialNumber', nLoop);
    psychoJS.experiment.addData('TrialDuration', t);
    psychoJS.experiment.addData('MOUSE_GAZE_trail', MOUSEGAZE);
    psychoJS.experiment.addData('ET_GAZE_trail', ETGAZE);
    psychoJS.experiment.addData('ET_GAZE_x_T_trail', ETGAZExT);
    psychoJS.experiment.addData('time_stamps_trial', time_trial);
    psychoJS.experiment.addData('unixTime_stamps_trial', unixTime);
    psychoJS.experiment.addData('ET_GAZE_RawPx_trail', ETGAZENF);

    // Save locations of key elements
    psychoJS.experiment.addData('Loc_Option1', [Option1_Logo.pos[0], Option1_Logo.pos[1], Option1_Logo.size[0], Option1_Logo.size[1]]);
    psychoJS.experiment.addData('Loc_Option2', [Option2_Logo.pos[0], Option2_Logo.pos[1], Option2_Logo.size[0], Option2_Logo.size[1]]);
    
    psychoJS.experiment.addData('Loc_compPrice_Val', [Option1_Attr1_Val.pos[0], Option1_Attr1_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_compEmiss_Val', [Option1_Attr2_Val.pos[0], Option1_Attr2_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_targetPrice_Val', [Option2_Attr1_Val.pos[0], Option2_Attr1_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_targetEmiss_Val', [Option2_Attr2_Val.pos[0], Option2_Attr2_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);

    psychoJS.experiment.addData('Option_Competitor', maplr(col1_x) );
    psychoJS.experiment.addData('Option_Target', maplr(col2_x) );

    psychoJS.experiment.addData('Flight_Length', fli_len );
    psychoJS.experiment.addData('Price_Multiplier', pri_mul );
    psychoJS.experiment.addData('Emission_Multiplier', emi_mul );
    psychoJS.experiment.addData('Offset_Multiplier', off_mul );
    psychoJS.experiment.addData('Emission_Production', emi_pro );
    psychoJS.experiment.addData('price_competitor', price_competitor );
    psychoJS.experiment.addData('emission_competitor', '0%' );
    psychoJS.experiment.addData('price_target', price_target );
    psychoJS.experiment.addData('emission_target', '100%' );

    nLoop += 1;
    routineTimer.reset();

    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


//END NEW CODE
const crosstime = 2.000000;
const crosstimeafter = 3.00000;
//BLANKCODE

// --- BLANK ROUTINE (INTER-TRIAL INTERVAL) ---
var blankComponents;
function blankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0; blankClock.reset(); frameN = -1; continueRoutine = true;

    // Make it last 2 seconds
    routineTimer.add(crosstime);

    // Turn text_blank into a centered cross
    text_blank.setText('+');
    text_blank.setPos([0, 0]);     // center
    text_blank.setHeight(0.08);    // adjust size if needed
    // text_blank.setColor(new util.Color('white')); // optional

    blankComponents = [];
    // Draw background first, then the cross so the cross is on top
    //blankComponents.push(brsquarebla);
    blankComponents.push(text_blank);

    for (const thisComponent of blankComponents)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function blankRoutineEachFrame() {
  return async function () {
    t = blankClock.getTime(); frameN = frameN + 1;

    // Start background first
    //if (t >= 0.0 && brsquarebla.status === PsychoJS.Status.NOT_STARTED) {
    //  brsquarebla.tStart = t; brsquarebla.frameNStart = frameN; brsquarebla.setAutoDraw(true);
    //}
    // Then the cross on top
    if (t >= 0.0 && text_blank.status === PsychoJS.Status.NOT_STARTED) {
      text_blank.tStart = t; text_blank.frameNStart = frameN; text_blank.setAutoDraw(true);
    }

    // Stop both after 2 seconds
    frameRemains = 0.0 + crosstime - psychoJS.window.monitorFramePeriod * 0.75;
    //if (brsquarebla.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    //  brsquarebla.setAutoDraw(false);
    //}
    if (text_blank.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_blank.setAutoDraw(false);
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of blankComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine && routineTimer.getTime() > 0) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };
}

function blankRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of blankComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

//END BLANK CODE

//AFTERBLANK CODE
// --- BLANK ROUTINE (AFTER-TRIAL INTERVAL) ---
function afterblankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0; afterblankClock.reset(); frameN = -1; continueRoutine = true;

    routineTimer.add(crosstimeafter);

    afterblankComponents = [];
    // Draw background first, then the cross so the cross is on top
    //afterblankComponents.push(brsquarebla);
    afterblankComponents.push(text_afterblank);

    for (const thisComponent of afterblankComponents)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function afterblankRoutineEachFrame() {
  return async function () {
    t = afterblankClock.getTime(); frameN = frameN + 1;

    // Start background first
    //if (t >= 0.0 && brsquarebla.status === PsychoJS.Status.NOT_STARTED) {
    //  brsquarebla.tStart = t; brsquarebla.frameNStart = frameN; brsquarebla.setAutoDraw(true);
    //}

    if (t >= 0.0 && text_afterblank.status === PsychoJS.Status.NOT_STARTED) {
      text_afterblank.tStart = t; text_afterblank.frameNStart = frameN; text_afterblank.setAutoDraw(true);
    }

    frameRemains = 0.0 + crosstimeafter - psychoJS.window.monitorFramePeriod * 0.75;
    //if (brsquarebla.status === PsychoJS.Status.STARTED && t >= frameRemains) {
    //  brsquarebla.setAutoDraw(false);
    //}

    if (text_afterblank.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      text_afterblank.setAutoDraw(false);
    }

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of afterblankComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine && routineTimer.getTime() > 0) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };
}

function afterblankRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of afterblankComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

//END AFTERBLANK CODE



// --- TRIALS LOOP (Second session) ---
var trials;
const mapdecoy = v => ( cut3( v ) === fixedposition_s2_x[0] ? 'Option1_Logo' : cut3( v ) === fixedposition_s2_x[1] ? 'Option2_Logo' : 'Option3_Logo');
//fixedposition_s2_x

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async function() {
    TrialHandler.fromSnapshot(snapshot);

    trials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: Trials2, 
      method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo,
      originPath: undefined,
      trialList: [{}], 
      seed: undefined,
      name: 'trials'
    });

    psychoJS.experiment.addLoop(trials);
    currentLoop = trials;
    
    for (const thisTrial of trials) {
      trialsLoopScheduler.add(blankRoutineBegin(snapshot));
      trialsLoopScheduler.add(blankRoutineEachFrame());
      trialsLoopScheduler.add(blankRoutineEnd(snapshot));
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(afterblankRoutineBegin(snapshot));
      trialsLoopScheduler.add(afterblankRoutineEachFrame());
      trialsLoopScheduler.add(afterblankRoutineEnd(snapshot));

      TrialSoFar += 1;
      console.log(TrialSoFar);
      if (TrialSoFar % CALIB_EVERY === 0 && TrialSoFar < Trials ) {
        console.log(TrialSoFar);
        // splice your existing calibration block
        calibrationTxt.setText(
        "Quick check: we’re recalibrating the eye tracker.\n" +
        "Please click each dot as you look at it." +
        "To continue, please click anywhere on screen."
        );
        trialsLoopScheduler.add(calibrationIntroRoutineBegin());
        trialsLoopScheduler.add(calibrationIntroRoutineEachFrame());
        trialsLoopScheduler.add(calibrationIntroRoutineEnd());
        const trialscalLoopScheduler = new Scheduler(psychoJS);
        trialsLoopScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
        trialsLoopScheduler.add(trialscalLoopScheduler);
        trialsLoopScheduler.add(trialscalLoopEnd);
      }

      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
  }
}

async function trialsLoopEnd() {
  psychoJS.experiment.removeLoop(trials);
  if (psychoJS.experiment._unfinishedLoops.length > 0)
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

// --- TRIAL ROUTINE (FLIGHT CHOICE) ---
var clicked_things;
var clickables;
var waiting;
var MOUSEGAZE;
var ETGAZE;
var ETGAZExT;
var time_trial;
var unixTime;
var ETGAZENF;
var StartTimeRoutine;
var trialComponents;
var loc3opt; 
col1_x = posx2;
col2_x = 0;
col3_x = -posx2;

//variables needed to change
// Column positions (centered)
//Update boxes and labels
const AreaI_prices = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5 ]
const AreaI_emissions = [ 0, 0.1, 0.2, 0.3, 0.4, 0.5 ]
const AreaII_prices = [ -0.1, -0.2, -0.3 ]
const AreaII_emissions = [ 0.3, 0.4, 0.5, 0.6, 0.7 ]
var price_decoy, emi_dec;
var randomarea, pri_dec;

const cartesian = (A, B) => A.flatMap(a => B.map(b => [a, b]));
const allcombinations = [
  ...cartesian(AreaI_prices, AreaI_emissions),
  ...cartesian(AreaII_prices, AreaII_emissions)
];
var posiblecombinations = allcombinations.filter(([a, b]) => !(a === 0 && b === 0));



function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0;
    trialClock.reset();
    frameN = -1;
    continueRoutine = true;
    
    col1_x = posx2;
    col2_x = 0;
    col3_x = -posx2;
    loc3opt = [col1_x, col2_x, col3_x];
    updateBoxLabelPositions( fixedposition_s2_x[0], fixedposition_s2_x[1], fixedposition_s2_x[2] )
    shuffleInPlace(loc3opt);
    col1_x = loc3opt[0];
    col2_x = loc3opt[1];
    col3_x = loc3opt[2];
    //target ticket price = competitor ticket price+ produced emissions* offset multiplier



    updateAttributeValuePositions( loc3opt[0], loc3opt[1], loc3opt[2] )


    // Set logos - only two
    Option1_Logo.setImage( 'Images/Option1.png');
    Option2_Logo.setImage( 'Images/Option2.png');
    Option3_Logo.setImage( 'Images/Option3.png');

    fli_len = sample1(flight_length);
    pri_mul = sample1(price_multiplier);
    emi_mul = sample1(emission_multiplier);
    off_mul = sample1(offset_multiplier);
    emi_pro = fli_len*emi_mul;
    price_competitor = Math.round( fli_len*pri_mul );
    price_target = Math.round( price_competitor + off_mul*emi_pro );
    randomarea = samplenoreplacement(posiblecombinations);
    emi_dec = 1 - randomarea[1];
    pri_dec = randomarea[0];
    price_decoy = Math.round( price_target + (price_target - price_competitor)*pri_dec );
    
    //message
    topMsg.setText(
      `Suppose that you are planning a ${fli_len} hour flight.` +
      `This flight produces ${Math.round(emi_pro)} kg of CO₂ emissions.` +
      `Please choose your preferred option below.`
    );

    // Set attribute values
    Option1_Attr1_Val.setText( '0%' );
    Option1_Attr2_Val.setText( `${attribute2Units}${ price_competitor }` );
    Option2_Attr1_Val.setText( '100%' );
    Option2_Attr2_Val.setText( `${attribute2Units}${ price_target }` );
    Option3_Attr1_Val.setText( toPercent( emi_dec ) );
    Option3_Attr2_Val.setText( `${attribute2Units}${ price_decoy }` );

    mouse.x = []; mouse.y = []; mouse.leftButton = []; mouse.midButton = [];
    mouse.rightButton = []; mouse.time = []; mouse.clicked_name = [];
    gotValidClick = false;
    
    clicked_things = [];
    clickables = [Option1_Logo, Option2_Logo, Option3_Logo];  // Only 2
    
    waiting = false;
    MOUSEGAZE = []; ETGAZE = []; ETGAZENF = []; ETGAZExT = [];
    time_trial = []; unixTime=[];
    StartTimeRoutine = t;

    trialComponents = [];
    trialComponents.push(Option1_ColBG, Option2_ColBG, Option3_ColBG);
    trialComponents.push(Option1_Logo, Option2_Logo, Option3_Logo);
    trialComponents.push(Option1_Attr1_Name, Option1_Attr2_Name,
                          Option2_Attr1_Name, Option2_Attr2_Name,
                          Option3_Attr1_Name, Option3_Attr2_Name);
    trialComponents.push(Option1_Attr1_Val, Option1_Attr2_Val,
                          Option2_Attr1_Val, Option2_Attr2_Val,
                          Option3_Attr1_Val, Option3_Attr2_Val);
    trialComponents.push(mouse);
    //trialComponents.push(brsquarewhi);
    trialComponents.push(topMsg);
    
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

var clickedN;
function trialRoutineEachFrame() {
  return async function () {
    t = trialClock.getTime();
    frameN = frameN + 1;
    
    setCursor('default');

    updateHover(Option1_Logo, mouse);
    updateHover(Option2_Logo, mouse);
    updateHover(Option3_Logo, mouse);

    for (const thisComponent of trialComponents) {
        if (thisComponent.status === PsychoJS.Status.NOT_STARTED && t >= 0.0) {
            thisComponent.tStart = t;
            thisComponent.frameNStart = frameN;
            if (typeof thisComponent.setAutoDraw === 'function') {
                 thisComponent.setAutoDraw(true);
            }
        }
    }

    // *mouse* updates
    if (t >= 0.0 && mouse.status === PsychoJS.Status.NOT_STARTED) {
      mouse.tStart = t;
      mouse.frameNStart = frameN;
      mouse.status = PsychoJS.Status.STARTED;
      mouse.mouseClock.reset();
      prevButtonState = mouse.getPressed();
      }
    if (mouse.status === PsychoJS.Status.STARTED) {
      _mouseButtons = mouse.getPressed();
      if (!_mouseButtons.every( (e,i,) => (e == prevButtonState[i]) )) {
        prevButtonState = _mouseButtons;
        if (_mouseButtons.reduce( (e, acc) => (e+acc) ) > 0) {
          gotValidClick = false;
          for (const obj of [Option1_Logo, Option2_Logo, Option3_Logo ]) {
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

    // Choice logic
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
    if (waiting && (t > (startTime + 0.5))) {
        continueRoutine = false;
    }

    // Webgazer data collection
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1]]);
    let x_gaze = util.sum(window.xGazes) / window.xGazes.length;
    let y_gaze = util.sum(window.yGazes) / window.yGazes.length;
    const xNorm = ( x_gaze - (psychoJS.window.size[0] / 2) ) / (psychoJS.window.size[0] / 2);
    const yNorm = - ( y_gaze - (psychoJS.window.size[1] / 2 ) ) / (psychoJS.window.size[1] / 2);
    ETGAZE.push([xNorm, yNorm]);
    ETGAZExT.push([xNorm, yNorm, t]);
    time_trial.push(t);
    unixTime.push(new Date().getTime());
    ETGAZENF.push([x_gaze, y_gaze]);

    // Spacebar to choose none
    if (t >= 0.0 && inst1_resp.status === PsychoJS.Status.NOT_STARTED) {
      inst1_resp.tStart = t; inst1_resp.frameNStart = frameN;
      psychoJS.window.callOnFlip(function() { inst1_resp.clock.reset(); }); 
      psychoJS.window.callOnFlip(function() { inst1_resp.start(); });
      psychoJS.window.callOnFlip(function() { inst1_resp.clearEvents(); });
    }
    if (inst1_resp.status === PsychoJS.Status.STARTED) {
      let theseKeys = inst1_resp.getKeys({keyList: ['space'], waitRelease: false});
      _inst1_resp_allKeys = _inst1_resp_allKeys.concat(theseKeys);
      if (_inst1_resp_allKeys.length > 0) {
        choice = 'None_Via_Spacebar';
        continueRoutine = false;
      }
    }
    _inst1_resp_allKeys = [];

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of trialComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };

}

function trialRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of trialComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (inst1_resp.status === PsychoJS.Status.STARTED) inst1_resp.stop();

    psychoJS.experiment.addData('Choice', choice);
    psychoJS.experiment.addData('TrialNumber', nLoop);
    psychoJS.experiment.addData('TrialDuration', t);
    psychoJS.experiment.addData('MOUSE_GAZE_trail', MOUSEGAZE);
    psychoJS.experiment.addData('ET_GAZE_trail', ETGAZE);
    psychoJS.experiment.addData('ET_GAZE_x_T_trail', ETGAZExT);
    psychoJS.experiment.addData('time_stamps_trial', time_trial);
    psychoJS.experiment.addData('unixTime_stamps_trial', unixTime);
    psychoJS.experiment.addData('ET_GAZE_RawPx_trail', ETGAZENF);

    // Save locations of key elements
    psychoJS.experiment.addData('Loc_Option1', [Option1_Logo.pos[0], Option1_Logo.pos[1], Option1_Logo.size[0], Option1_Logo.size[1]]);
    psychoJS.experiment.addData('Loc_Option2', [Option2_Logo.pos[0], Option2_Logo.pos[1], Option2_Logo.size[0], Option2_Logo.size[1]]);
    psychoJS.experiment.addData('Loc_Option3', [Option2_Logo.pos[0], Option2_Logo.pos[1], Option2_Logo.size[0], Option2_Logo.size[1]]);
    
    psychoJS.experiment.addData('Loc_compPrice_Val', [Option1_Attr1_Val.pos[0], Option1_Attr1_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_compEmiss_Val', [Option1_Attr2_Val.pos[0], Option1_Attr2_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_targetPrice_Val', [Option2_Attr1_Val.pos[0], Option2_Attr1_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_targetEmiss_Val', [Option2_Attr2_Val.pos[0], Option2_Attr2_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_decoyPrice_Val', [Option3_Attr1_Val.pos[0], Option3_Attr1_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);
    psychoJS.experiment.addData('Loc_decoyEMiss_Val', [Option3_Attr2_Val.pos[0], Option3_Attr2_Val.pos[1], columnWidth*0.8, valueTextSize*2 ]);

    psychoJS.experiment.addData('Option_Competitor', mapdecoy(col1_x) );
    psychoJS.experiment.addData('Option_Target', mapdecoy(col2_x) );
    psychoJS.experiment.addData('Option_Decoy', mapdecoy(col3_x) );

    psychoJS.experiment.addData('Flight_Length', fli_len );
    psychoJS.experiment.addData('Price_Multiplier', pri_mul );
    psychoJS.experiment.addData('Emission_Multiplier', emi_mul );
    psychoJS.experiment.addData('Offset_Multiplier', off_mul );
    psychoJS.experiment.addData('Emission_Production', emi_pro );
    psychoJS.experiment.addData('price_competitor', price_competitor );
    psychoJS.experiment.addData('emission_competitor', '0%' );
    psychoJS.experiment.addData('price_target', price_target );
    psychoJS.experiment.addData('emission_target', '100%' );
    psychoJS.experiment.addData('price_decoy', price_decoy );
    psychoJS.experiment.addData('emission_decoy', toPercent(emi_dec) );

    nLoop += 1;
    routineTimer.reset();

    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}


// --- END ROUTINE ---
var EndComponents;
function EndRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0; EndClock.reset(); frameN = -1; continueRoutine = true; routineTimer.add(2.000000);
    EndComponents = [];
    EndComponents.push(Msg);
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  }
}

function EndRoutineEachFrame() {
  return async function () {
    t = EndClock.getTime(); frameN = frameN + 1;
    if (t >= 0.0 && Msg.status === PsychoJS.Status.NOT_STARTED) {
      Msg.tStart = t; Msg.frameNStart = frameN; Msg.setAutoDraw(true);
    }
    frameRemains = 0.0 + 2.0 - psychoJS.window.monitorFramePeriod * 0.75;
    if (Msg.status === PsychoJS.Status.STARTED && t >= frameRemains) {
      Msg.setAutoDraw(false);
    }
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({keyList:['escape']}).length > 0) {
      return quitPsychoJS('The [Escape] key was pressed. Goodbye!', false);
    }
    if (!continueRoutine) { return Scheduler.Event.NEXT; }
    continueRoutine = false;
    for (const thisComponent of EndComponents)
      if ('status' in thisComponent && thisComponent.status !== PsychoJS.Status.FINISHED) {
        continueRoutine = true; break;
      }
    if (continueRoutine && routineTimer.getTime() > 0) { return Scheduler.Event.FLIP_REPEAT; }
    else { return Scheduler.Event.NEXT; }
  };
}

function EndRoutineEnd(snapshot) {
  return async function () {
    for (const thisComponent of EndComponents) {
      if (typeof thisComponent.setAutoDraw === 'function') thisComponent.setAutoDraw(false);
    }
    if (currentLoop === psychoJS.experiment) {
      psychoJS.experiment.nextEntry(snapshot);
    }
    return Scheduler.Event.NEXT;
  }
}

// --- UTILITY FUNCTIONS ---
function importConditions(currentLoop) {
  return async function () {
    psychoJS.importAttributes(currentLoop.getCurrentTrial());
    return Scheduler.Event.NEXT;
  };
}

async function quitPsychoJS(message, isCompleted) {
  if (psychoJS.experiment.isEntryEmpty()) {
    psychoJS.experiment.nextEntry();
  }
  if (window.webgazer) {
      window.webgazer.end();
  }
  psychoJS.window.close();
  psychoJS.quit({ message: message, isCompleted: isCompleted });
  return Scheduler.Event.QUIT;
}


