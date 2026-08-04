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
var columnWidth = 0.75;  //0.6    // Width of each service column
var columnHeight =  (2.2*2/3); //2.2;   // Total height for a column (logo + attributes)
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
posx2 = -0.6; //position in x second session
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
const attr1_y_offset = -0.5; //middle
const posboxy = 1;  //-0.4/3;
const attr2_y_offset = 0.3; //top
const topmsglocation = [0,0.85];
var postextattname = 0.1;
var postextattvalue = 0.1;
// Put near your layout constants (after attr*_y_offset, etc.)
const ATTRIBUTE_BAND_PADDING = 0.05; //0.04
function computeAttrBand() {
  const topNameY   = attr2_y_offset + postextattname;          // Attr2 name baseline
  const topEdge    = topNameY + (attributeNameTextSize / 2);
  const bottomValY = attr1_y_offset - postextattvalue;         // Attr1 value baseline
  const bottomEdge = bottomValY - (valueTextSize / 2);
  return {
    centerY: (topEdge + bottomEdge) / 2,
    height:  (topEdge - bottomEdge) + (2 * ATTRIBUTE_BAND_PADDING),
  };
}


// USER: Define your two attribute names here (these will be column headers in your CSV)
var attribute1Name = "Offset Emissions";      // MODIFIED e.g., Price, Duration
var attribute1Units = "%";          // MODIFIED e.g., $, hrs
var attribute2Name = "Price";       // MODIFIED e.g., Storage, Pollution
var attribute2Units = "S$";        // MODIFIED e.g., GB, kg CO2 equivalent
var carryFromTwoOpt = null; //carryvalues to next trial

// Hover config
const HOVER_SCALE = 1.10;   // how big on hover (10% larger)
const HOVER_LERP  = 1;   // smoothness 0..1 (higher = snappier)
const pricetaglocy = -0.6375; // example Y lock (if you want it)
function ensureBaseSize(stim) { if (!stim?._baseSize) stim._baseSize = [...stim.size]; }
function lerpSize(stim, target) {
  stim.size = [
    stim.size[0] + (target[0] - stim.size[0]) * HOVER_LERP,
    stim.size[1] + (target[1] - stim.size[1]) * HOVER_LERP,
  ];
}

// --- Internals ---
function setCursor(cssCursor) {
  const r = psychoJS && psychoJS.window && psychoJS.window._renderer;
  if (r && r.view && r.view.style) r.view.style.cursor = cssCursor;
  else document.body.style.cursor = cssCursor;
}

function ensureBaseMetrics(stim){
  // TextStim has .height (number); Rect/Image have .size ([w,h])
  if (typeof stim.height === 'number') {
    if (stim._baseHeight == null) stim._baseHeight = stim.height;
  } else if (stim.size) {
    if (!stim._baseSize) stim._baseSize = [...stim.size];
  }
  if (!stim._basePos && Array.isArray(stim.pos)) {
    stim._basePos = [...stim.pos];
  }
}

function lerp(a, b, t){ return a + (b - a) * t; }

// --- Single-stim hover (TextStim OR Rect/Image) ---
// Options:
//   - style: { on(stim), off(stim) } optional styling callbacks
//   - pinY: number | null -> if provided, locks pos[1] to this value every frame
function updateHover(stim, mouse, {style={}, pinY=null} = {}) {
  if (!stim || typeof stim.contains !== 'function') return false;

  ensureBaseMetrics(stim);
  const hovered = !!stim.contains(mouse);

  // Target dims
  if (typeof stim.height === 'number') {
    const base = stim._baseHeight ?? stim.height;
    const target = hovered ? base * HOVER_SCALE : base;
    stim.height = lerp(stim.height, target, HOVER_LERP);
  } else if (stim.size) {
    const base = stim._baseSize ?? stim.size;
    const target = hovered ? [base[0]*HOVER_SCALE, base[1]*HOVER_SCALE] : base;
    stim.size = [
      lerp(stim.size[0], target[0], HOVER_LERP),
      lerp(stim.size[1], target[1], HOVER_LERP),
    ];
  }

  // Optional vertical pin
  if (pinY !== null && Array.isArray(stim.pos)) {
    stim.pos = [stim.pos[0], pinY];
  }

  // Style hooks
  if (hovered && style.on)  style.on(stim);
  if (!hovered && style.off) style.off(stim);

  if (hovered) setCursor('pointer');
  return hovered;
}

// --- Group hover (e.g., button rect + text move/scale together) ---
// Hovering EITHER rect OR text scales BOTH.
function updateHoverGroup(rect, text, mouse, {styleRect={}, styleText={}, pinYRect=null, pinYText=null} = {}) {
  if (!rect || !text) return false;

  const hovered = (rect.contains(mouse) || text.contains(mouse));

  // Drive both with same "hovered" flag by calling single-stim with a fake contains()
  const containsBackupRect = rect.contains, containsBackupText = text.contains;

  // Temporarily override to force the same 'hovered' behavior inside updateHover
  rect.contains = () => hovered;
  text.contains = () => hovered;

  updateHover(rect, mouse, {style: styleRect, pinY: pinYRect});
  updateHover(text, mouse, {style: styleText, pinY: pinYText});

  // Restore
  rect.contains = containsBackupRect;
  text.contains = containsBackupText;

  if (hovered) setCursor('pointer');
  return hovered;
}

//values of bicolor square (for external sync, if needed)
//var positionsquarebw = [0.95, -0.85]; // Bottom right
//var sizesquarebw = [0.07233, 0.1286];

//Here you set the values for trials
nLoop = 1;
Trials1 = 50; // 50; // Set to 0 if no separate "training" phase with different CSV
// USER: Set the number of choice scenarios (rows in your CSV for this participant)
Trials2 = 50; // 50; // Example: 10 choice scenarios
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

// ===== NEW SURVEYS (4 screens) =====
var ns1Clock, ns2Clock, ns3Clock, ns4Clock;

// Shared maker reuses your helpers: makeText / makeButtonRect / makeRowOptions
// Each screen gets its own button+mouse so they don't cross-talk.
var ns1Mouse, ns2Mouse, ns3Mouse, ns4Mouse;
var ns1StartBtn, ns1StartTxt, ns1StartEnabled;
var ns2StartBtn, ns2StartTxt, ns2StartEnabled;
var ns3StartBtn, ns3StartTxt, ns3StartEnabled;
var ns4StartBtn, ns4StartTxt, ns4StartEnabled;

// Labels
var ns1Q1Lbl, ns1Q2Lbl, ns1Q3Lbl, ns1Q4Lbl;
var ns2Q1Lbl, ns2Q2Lbl, ns2Q3Lbl;
var ns3Q1Lbl, ns3Q2Lbl, ns3Q3Lbl, ns3Q4Lbl, ns3Q5Lbl, ns3Q6Lbl;
var ns4Q1Lbl, ns4Q2Lbl;

// Option rows (arrays of {bg,tx,label,selected})
var ns1Q1Opts=[], ns1Q2Opts=[], ns1Q3Opts=[], ns1Q4Opts=[];
var ns2Q1Opts=[], ns2Q2Opts=[], ns2Q3Opts=[];
var ns3Q1Opts=[], ns3Q2Opts=[], ns3Q3Opts=[], ns3Q4Opts=[], ns3Q5Opts=[], ns3Q6Opts=[];
var ns4Q1Opts=[], ns4Q2Opts=[];

// Answers
var ns1A1=null, ns1A2=null, ns1A3=null, ns1A4=null;
var ns2A1=null, ns2A2=null, ns2A3=null;
var ns3A1=null, ns3A2=null, ns3A3=null, ns3A4=null, ns3A5=null, ns3A6=null;
var ns4A1=null, ns4A2=null;


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

//NEW CODE NEW INTRO
flowScheduler.add(consentRoutineBegin());
flowScheduler.add(consentRoutineEachFrame());
flowScheduler.add(consentRoutineEnd());

flowScheduler.add(infoRoutineBegin());
flowScheduler.add(infoRoutineEachFrame());
flowScheduler.add(infoRoutineEnd());

flowScheduler.add(practiceRoutineBegin());
flowScheduler.add(practiceRoutineEachFrame());
flowScheduler.add(practiceRoutineEnd());

flowScheduler.add(practiceFBRoutineBegin());
flowScheduler.add(practiceFBRoutineEachFrame());
flowScheduler.add(practiceFBRoutineEnd());

flowScheduler.add(surveyRoutineBegin());
flowScheduler.add(surveyRoutineEachFrame());
flowScheduler.add(surveyRoutineEnd());
//END NEW CODE NEW INTRO

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

//NEWCODE
const mixedLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(mixedTrialsLoopBegin(mixedLoopScheduler));
flowScheduler.add(mixedLoopScheduler);
flowScheduler.add(mixedTrialsLoopEnd);
//NEW CODE FINISH

//const trials2LoopScheduler = new Scheduler(psychoJS);
//flowScheduler.add(trials2LoopBegin(trials2LoopScheduler));
//flowScheduler.add(trials2LoopScheduler);
//flowScheduler.add(trials2LoopEnd);
//const trialsLoopScheduler = new Scheduler(psychoJS);
//flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
//flowScheduler.add(trialsLoopScheduler);
//flowScheduler.add(trialsLoopEnd);


// New 4-screen survey
//flowScheduler.add(newsurvey1RoutineBegin());
//flowScheduler.add(newsurvey1RoutineEachFrame());
//flowScheduler.add(newsurvey1RoutineEnd());

//flowScheduler.add(newsurvey2RoutineBegin());
//flowScheduler.add(newsurvey2RoutineEachFrame());
//flowScheduler.add(newsurvey2RoutineEnd());

//flowScheduler.add(newsurvey3RoutineBegin());
//flowScheduler.add(newsurvey3RoutineEachFrame());
//flowScheduler.add(newsurvey3RoutineEnd());

//flowScheduler.add(newsurvey4RoutineBegin());
//flowScheduler.add(newsurvey4RoutineEachFrame());
//flowScheduler.add(newsurvey4RoutineEnd());


//JIC
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
    {'name': 'Images/fig_offset.png', 'path': 'Images/fig_offset.png'}, // MODIFIED
    {'name': 'calibration_trials.xlsx', 'path': 'calibration_trials.xlsx'},
    {'name': 'webgazer-2.0.1.tp.js', 'path': 'webgazer-2.0.1.tp.js'},
    {'name': 'blazeface/model.json',       'path': 'blazeface/model.json' },
    {'name': 'blazeface/group1-shard1of1', 'path': 'blazeface/group1-shard1of1' }
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

var consentMouse_mouseClock , calibrationClick_mouseClock , mouse_mouseClock , survMouse_mouseClock , fbMouse_mouseClock , practiceMouse_mouseClock , infoMouse_mouseClock, calibrationMouse_mouseClock, mouse_2_mouseClock;

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
var Option1_MidLine, Option2_MidLine, Option3_MidLine, practiceMidLine1, practiceMidLine2, practiceMidLine3;
const LINE_THICK = 0.004;
const midY = (attr1_y_offset + attr2_y_offset) / 2;  // halfway between the two attributes

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

//NEW STUFF
// ===== New pre-experiment routines: globals =====
var consentClock, infoClock, practiceClock, practiceFBClock, surveyClock;

// Consent
var consentText, consentYesBG, consentNoBG, consentYesTxt, consentNoTxt, consentMouse;

// Info
var infoTitle, infoImg, infoBody, infoButton, infoMouse;

// Practice (fixed values)
var practiceTitle, practiceMouse;
var practiceColBG1, practiceColBG2, practiceColBG3;
var practiceLogo1, practiceLogo2, practiceLogo3;
var practiceA1Name, practiceA2Name, practiceA3Name;
var practiceA1Val,  practiceA2Val,  practiceA3Val;
var practiceClickables, practiceChoice, practiceTargetName, practiceTargetOptionNum;
var practicePositions;

// Feedback (depends on practiceChoice)
var fbTitle, fbText, fbButton, fbMouse;

// Survey (gated start)
var survMouse, survStartBtn, survStartEnabled;
var qGenderLbl, qAgeLbl, qIncLbl, qConcernLbl, qBelieveLbl;
var qGenderOpts=[], qAgeOpts=[], qIncOpts=[], qConcernOpts=[], qBelieveOpts=[];
var ansGender=null, ansAge=null, ansInc=null, ansConcern=null, ansBelieve=null;
// Button label TextStims used across routines (need global scope)
var infoBtnTxt, fbBtnTxt, survStartTxt;
// Instruction screen gating controls (also used in inst1 routines)
var InstStartBtnBG, InstStartBtnTxt, inst1_mouse;
//webcamvalid
var ieyBtnRect, ieyBtnTxt, ieyMouse, ieyStatusTxt;

// Helpers
function makeButtonRect(name, pos, size=[0.5,0.12], colors={fill:'white', line:'black'}) {
  return new visual.Rect({
    win: psychoJS.window, name, pos, width:size[0], height:size[1],
    lineWidth: 2, lineColor: new util.Color(colors.line),
    fillColor: new util.Color(colors.fill), opacity: 1, interpolate: true
  });
}
function makeText(name, text, pos, height=0.05, wrap=1.2, color='black', anchor='center') {
  return new visual.TextStim({ win: psychoJS.window, name, text, pos, height,
    wrapWidth: wrap, color: new util.Color(color), anchor, font: 'Open Sans'
  });
}
function makeTextLeft(
  name, text, pos, height = 0.05, wrap = 1.2,
  color = 'black', anchor = 'center', align = 'left', font = 'Open Sans'
) {
  return new visual.TextStim({ win: psychoJS.window, name, text, pos, height,
    wrapWidth: wrap,
    font, color: new util.Color(color),
    alignHoriz: align,          // 'left' | 'center' | 'right'
    anchor, anchorHoriz: anchor, anchorVert: 'center', languageStyle: 'LTR'
  });
}
//BUllet dots
function bulletize(lines, bulletChar = '\u2022', indent = '   ') {
  return lines.map(s => `${bulletChar} ${s}`).join('\n')
              .replace(/\n(?!$)/g, `\n${indent}`); // simple hanging indent
}
//END NEW STUFF

async function experimentInit() {
  // Initialize components for calibrating Routines (largely unchanged)
  initializeEyetrackingClock = new util.Clock();
  let averagingWindow = 10;
  window.xGazes = new Array(averagingWindow).fill(0);
  window.yGazes = new Array(averagingWindow).fill(0);
  webcamWarning = new visual.TextStim({
    win: psychoJS.window, name: 'webcamWarning',
    text: 'This experiment uses eye tracking. You should see your web browser request access to your webcam. You might need to click on this text to trigger the request. Please permit access, and wait a moment for the system to set up. Additionally, for the best experience, the experiment must be conducted in fullscreen mode.\nTo do this, press Fn + F11 on your keyboard. This will maximize the window and ensure the experiment runs smoothly.',
    font: 'Open Sans', units: undefined, pos: [0, 0.3], height: 0.05, alignHoriz: 'left', wrapWidth: undefined, ori: 0.0,
    color: new util.Color('black'), opacity: undefined, depth: -1.0
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

  //webcamvalid
  // --- initializeEyetracking UI controls (Continue button) ---
  ieyBtnRect = new visual.Rect({
    win: psychoJS.window, name: 'ieyBtnRect',
    pos: [0, -0.55], width: 0.35, height: 0.18,
    lineWidth: 2, lineColor: new util.Color('#1565c0'),
    fillColor: new util.Color('#e3f2fd'), opacity: 1, interpolate: true
  });
  ieyBtnTxt = new visual.TextStim({
    win: psychoJS.window, name: 'ieyBtnTxt',
    text: 'Continue', pos: ieyBtnRect.pos, height: 0.045,
    color: new util.Color('black'), wrapWidth: 1.2
  });
  ieyStatusTxt = new visual.TextStim({
    win: psychoJS.window, name: 'ieyStatusTxt',
    text: 'Waiting for camera permission…', pos: [0, -0.75], height: 0.035,
    color: new util.Color('red'), wrapWidth: 1.2
  });
  ieyMouse = new core.Mouse({ win: psychoJS.window });
  //end webcam valid



  inst1Clock = new util.Clock();
  instruction1Txt = new visual.TextStim({
    win: psychoJS.window, name: 'instruction1Txt',
    text: 'We are almost ready to get started.\nRemember to run the experiment fullscreen (press Fn + F11 on your keyboard if not).\nPlease, center your face inside the green square and keep it there.\nPress space to move on.',
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
  calibrationMouse_mouseClock = new util.Clock();
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
  calibrationClick_mouseClock = new util.Clock();
  
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
    text: "You are planning a trip and need to choose a flight. You'll be presented with some options. Each has different characteristics (e.g., price, offset emissions). Please choose the flight that suits you best, just as you would in real life, by clicking the button below during the experiment.", // MODIFIED
    font: 'Open Sans', units: undefined, pos: [0, 0.7], height: 0.05, alignHoriz: 'left', wrapWidth: 1.2, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
  });
  AttributesInfo = new visual.TextStim({
    win: psychoJS.window, name: 'AttributesInfo',
    // USER: Update attribute descriptions
    text: `The Attributes are:\n${attribute1Name}: Share of the flight’s CO₂ emissions compensated by retiring verified carbon credits that reduce or remove equivalent emissions elsewhere.\n${attribute2Name}: The price of the flight (in ${attribute2Units})`, // MODIFIED
    font: 'Open Sans', units: undefined, pos: [0, 0.3], height: 0.05, alignHoriz: 'left', wrapWidth: 1.2, ori: 0.0,
    languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: -1.0
  });
  ButtonIntro = new visual.TextStim({
    win: psychoJS.window, name: 'ButtonIntro',
    text: 'Before the choice situation is displayed, a fixation cross (+) will appear at the center of the screen. Please keep your gaze focused on the cross while it is visible.\n\nRemember to keep your head still during the experiment.\nTo start, press the button down below.',
    font: 'Open Sans', units: undefined, pos: [0, -0.1], height: 0.05, alignHoriz: 'left', wrapWidth: 1.2, ori: 0.0,
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
  mouse_2_mouseClock = new util.Clock();

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

  // Column Backgrounds (visual "cards"), but sized only for attributes
  const { centerY: attrBandY, height: attrBandH } = computeAttrBand();

  const commonCardStyle = {
    win: psychoJS.window, units: 'norm',
    width: columnWidth, height: attrBandH,  // <-- changed
    lineWidth: 2, lineColor: new util.Color('darkgrey'),
    fillColor: new util.Color('white'),
    opacity: 1, interpolate: true,
  };

  Option1_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option1_ColBG', pos: [col1_x, attrBandY] }); // <-- Y changed
  Option2_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option2_ColBG', pos: [col2_x, attrBandY] }); // <-- Y changed
  Option3_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option3_ColBG', pos: [col3_x, attrBandY] }); // <-- Y changed

  // Column Backgrounds (visual "cards")
  // const commonCardStyle = {
  //     win: psychoJS.window, units: 'norm',
  //     width: columnWidth, height: columnHeight,
  //     lineWidth: 2, lineColor: new util.Color('darkgrey'),
  //     fillColor: new util.Color('white'),
  //     opacity: 1, interpolate: true,
  // };
  // Option1_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option1_ColBG', pos: [col1_x, attr1_y_offset] });
  // Option2_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option2_ColBG', pos: [col2_x, attr1_y_offset] });
  // Option3_ColBG = new visual.Rect({ ...commonCardStyle, name: 'Option3_ColBG', pos: [col3_x, attr1_y_offset] });
  
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
  mouse_mouseClock = new util.Clock();
  
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

  //LINES in the middle
  // ----- Midlines (simple horizontal dividers) -----

  Option1_MidLine = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [col1_x, midY], opacity: 1, interpolate: true
  });
  Option2_MidLine = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [col2_x, midY], opacity: 1, interpolate: true
  });
  Option3_MidLine = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [col3_x, midY], opacity: 1, interpolate: true
  });

  Option1_MidLine.setDepth(-5); //depthline
  Option2_MidLine.setDepth(-5);
  Option3_MidLine.setDepth(-5);

  //NEW CODE
  // ===== Consent components =====
  consentClock = new util.Clock();
  const consentBody = "Dear Respondent,\nResearchers from National University of Singapore are conducting a survey to assess the likelihood of airline passengers participating in carbon offsetting programs.\nThe survey will be in English and will take approximately 40 minutes to complete. Your eye movement data will be recorded via the web camera (face video will not be recorded). There are no known risks and no direct benefits of participating in this study. All data obtained in this study will be kept confidential and anonymized.\nThank you very much for your time and cooperation.\nDo you want to participate in the survey? please click the green area to choose.";
  const consentBodyRich = consentBody.replace(/\*\*(.*?)\*\*/g, '$1'); // TextStim doesn't support HTML; we’ll bold via 2 lines below
  consentText = makeText('consentText', consentBodyRich, [0, 0.35], 0.05, 1.25);

  consentYesBG = makeButtonRect('consentYesBG', [ -0.45, -0.25 ], [0.4, 0.24], {fill:'#e8ffe8', line:'#2e7d32'});
  consentNoBG  = makeButtonRect('consentNoBG',  [  0.45, -0.25 ], [0.4, 0.24], {fill:'#ffebee', line:'#c62828'});
  consentYesTxt = makeText('consentYesTxt', 'I would like to participate\nin this survey.', consentYesBG.pos, 0.045);
  consentNoTxt  = makeText('consentNoTxt',  "I would not like to participate\nin this survey.",                   consentNoBG.pos,  0.045);
  consentMouse  = new core.Mouse({ win: psychoJS.window });

  // ===== Info components =====
  infoClock = new util.Clock();
  infoTitle  = makeText('infoTitle', 'What is carbon offsetting?', [0, 0.65], 0.06);

  infoImg    = new visual.ImageStim({ win: psychoJS.window, name:'infoImg', image:'Images/fig_offset.png', pos:[0,0.25], size:[1.2,1], interpolate:true });

  const infoLines = [
  "As planes fly, they burn fuel that releases greenhouse gas emissions, such as carbon dioxide (CO₂), into the atmosphere.\n\n",
  "Carbon offsetting allows passengers to neutralize these CO₂ emissions and reduce their environmental impact by paying a small additional fee when purchasing tickets.\n\n",
  "A passenger’s carbon offsetting contribution supports environmental projects that remove greenhouse gas emissions from the atmosphere (e.g., planting trees) or prevent future emissions from occurring (e.g., funding clean energy projects).\n\n",
  "The more emissions you choose to offset when booking your ticket, the more contribution you make to environmental protection."
];

  infoBody = makeTextLeft( 'infoBody', bulletize(infoLines), [0, 0.1], 0.045, 1.25, 'black', 'center', 'left');

  infoButton = makeButtonRect('infoButton', [0, -0.75], [0.25, 0.15], {fill:'#e3f2fd', line:'#1565c0'});
  infoBtnTxt = makeText('infoBtnTxt', 'I understand', infoButton.pos, 0.045);
  infoMouse  = new core.Mouse({ win: psychoJS.window });

  // ===== Practice components =====
  practiceClock = new util.Clock();
  practiceTitle = makeText('practiceTitle',
    'Suppose you are booking a flight. Which option do you think is better for environment?',
    [0, 0.85], 0.055, 1.3
  );
  // 3 cards like your main trials, reusing sizing
    const practiceCardStyle = {
    win: psychoJS.window, units: 'norm',
    width: columnWidth, height: attrBandH,  // <-- changed
    lineWidth: 2, lineColor: new util.Color('darkgrey'),
    fillColor: new util.Color('white'),
    opacity: 1, interpolate: true,
  };
  //const practiceCardStyle = { win:psychoJS.window, width: columnWidth, height: columnHeight, lineWidth:2, lineColor:new util.Color('darkgrey'), fillColor:new util.Color('white'), opacity:1, units:'norm' };
  practiceColBG1 = new visual.Rect({ ...practiceCardStyle, name:'practiceColBG1', pos:[-0.6, attrBandY] }); //attr1_y_offset
  practiceColBG2 = new visual.Rect({ ...practiceCardStyle, name:'practiceColBG2', pos:[ 0.0, attrBandY] }); //attr1_y_offset
  practiceColBG3 = new visual.Rect({ ...practiceCardStyle, name:'practiceColBG3', pos:[ 0.6, attrBandY] }); //attr1_y_offset
  //const { centerY: pBandY, height: pBandH } = computeAttrBand();
  //practiceColBG1.setPos([-0.6, pBandY]); practiceColBG1.setSize([columnWidth, pBandH]);
  //practiceColBG2.setPos([ 0.0, pBandY]); practiceColBG2.setSize([columnWidth, pBandH]);
  //practiceColBG3.setPos([ 0.6, pBandY]); practiceColBG3.setSize([columnWidth, pBandH]);

  practiceMidLine1 = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [-0.6, midY], opacity: 1, interpolate: true
  });
  practiceMidLine2 = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [ 0.0, midY], opacity: 1, interpolate: true
  });
  practiceMidLine3 = new visual.Rect({
    win: psychoJS.window, units: 'norm',
    width: columnWidth/1.5, height: LINE_THICK,
    fillColor: new util.Color('#bbbbbb'), lineColor: new util.Color('#bbbbbb'),
    pos: [ 0.6, midY], opacity: 1, interpolate: true
  });
  practiceMidLine1.setDepth(-20);
  practiceMidLine2.setDepth(-20);
  practiceMidLine3.setDepth(-20);





  const practiceLogoStyle = { win:psychoJS.window, name:'', units:'norm', size:logoSize, pos:[0,logo_y_offset], interpolate:true, color:new util.Color([1,1,1]) };
  practiceLogo1 = new visual.ImageStim({ ...practiceLogoStyle, name:'practiceLogo1', image:'Images/Option1.png' });
  practiceLogo2 = new visual.ImageStim({ ...practiceLogoStyle, name:'practiceLogo2', image:'Images/Option2.png' });
  practiceLogo3 = new visual.ImageStim({ ...practiceLogoStyle, name:'practiceLogo3', image:'Images/Option3.png' });

  // Attribute labels (reuse your sizes/positions)
  const pn = attribute1Name + ' :'; const pm = attribute2Name + ' :';
  practiceA1Name = makeText('practiceA1Name', pn, [0, attr1_y_offset + postextattname], attributeNameTextSize, columnWidth*0.9, 'dimgray');
  practiceA2Name = makeText('practiceA2Name', pm, [0, attr2_y_offset + postextattname], attributeNameTextSize, columnWidth*0.9, 'dimgray');
  practiceA3Name = makeText('practiceA3Name', pm, [0, attr2_y_offset + postextattname], attributeNameTextSize, columnWidth*0.9, 'dimgray'); // not used; keep parallelism

  practiceA1Val = makeText('practiceA1Val', '', [0, attr1_y_offset - postextattvalue], valueTextSize, columnWidth*0.8);
  practiceA2Val = makeText('practiceA2Val', '', [0, attr2_y_offset - postextattvalue], valueTextSize, columnWidth*0.8);
  practiceA3Val = makeText('practiceA3Val', '', [0, attr2_y_offset - postextattvalue], valueTextSize, columnWidth*0.8); // not used; keep structure

  practiceMouse = new core.Mouse({ win: psychoJS.window });

  // ===== Feedback components =====
  practiceFBClock = new util.Clock();
  fbTitle  = makeText('fbTitle', '', [0, 0.6], 0.075);
  fbText   = makeText('fbText',  '', [0, 0.15], 0.05, 1.25);
  fbButton = makeButtonRect('fbButton', [0, -0.55], [0.45, 0.24], {fill:'#e3f2fd', line:'#1565c0'});
  fbBtnTxt = makeText('fbBtnTxt', 'I understand', fbButton.pos, 0.045);
  fbMouse  = new core.Mouse({ win: psychoJS.window });

  // ===== Survey components =====
  surveyClock = new util.Clock();
  survMouse = new core.Mouse({ win: psychoJS.window });
  survStartBtn = makeButtonRect('survStartBtn', [0, -0.8], [0.4, 0.24], {fill:'#eeeeee', line:'#9e9e9e'});
  survStartEnabled = false;
  survStartTxt = makeText('survStartTxt', 'Start', survStartBtn.pos, 0.045);

  qGenderLbl  = makeText('qGenderLbl',  'Gender:',                            [-0.75,  0.6], 0.045, 1.2);
  qAgeLbl     = makeText('qAgeLbl',     'Is your age higher or lower than 42 years?',               [-0.75,  0.35], 0.045, 1.2);
  qIncLbl     = makeText('qIncLbl',     'Is your income higher or lower than\n5500 SGD per month (66000 SGD per year)?',      [-0.75,  0.10], 0.045, 1.2);
  qConcernLbl = makeText('qConcernLbl', 'Are you concerned about environmental\nprotection in your daily life?',          [-0.75, -0.15], 0.045, 1.2);
  qBelieveLbl = makeText('qBelieveLbl', 'Do you believe that the money you pay\nfor carbon offset programs is actually used for carbon offset?',    [-0.75, -0.40], 0.045, 1.2);

  // helper to create horizontal single-select options
  function makeRowOptions(baseName, y, labels) {
    const out = [];
    const x0 = -0.25, gap = 0.35; //0.35
    labels.forEach((lab, i) => {
      const bg = makeButtonRect(`${baseName}_opt${i}`, [x0 + i*gap, y], [0.3, 0.11], {fill:'white', line:'black'}); //0.3
      const tx = makeText(`${baseName}_opt${i}_txt`, lab, bg.pos, 0.04);

      bg.setDepth(0);    // always behind
      tx.setDepth(10);   // always in front

      out.push({bg, tx, label: lab, selected:false});
    });
    return out;
  }

  qGenderOpts  = makeRowOptions('gender',   0.6,  ['Man','Woman','Non-Binary','Prefer not to say']);
  qAgeOpts     = makeRowOptions('Is your age higher or lower than 42 years?',      0.35, ['Lower','Higher']);
  qIncOpts     = makeRowOptions('Is your income higher or lower than\n5500 SGD per month (66000 SGD per year)?',   0.10, ['Lower','Higher']);
  qConcernOpts = makeRowOptions('Are you concerned about environmental\nprotection in your daily life?', -0.15, ['No','Yes']);
  qBelieveOpts = makeRowOptions('Do you believe that the money you pay\nfor carbon offset programs is actually used for carbon offset?', -0.40, ['No','Yes']);
  //NEW CODE


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
//function updateBoxLabelPositions(a,b,c) {
//
//  if ([a,b,c].some(v => typeof v !== 'number' || !isFinite(v))) {
//  console.warn('updateBoxLabelPositions called with invalid args:', a, b, c);
//  return;
//  }
//
//  Option1_Logo.setPos( [a, logo_y_offset] );
//  Option1_ColBG.setPos( [a, attr1_y_offset] );
//
//  Option2_Logo.setPos( [b, logo_y_offset] );
//  Option2_ColBG.setPos( [b, attr1_y_offset] );
//
//  Option3_Logo.setPos( [c, logo_y_offset] );
//  Option3_ColBG.setPos( [c, attr1_y_offset] );
//}

function updateBoxLabelPositions(a,b,c) {
  if ([a,b,c].some(v => typeof v !== 'number' || !isFinite(v))) return;

  Option1_Logo.setPos([a, logo_y_offset]);
  Option2_Logo.setPos([b, logo_y_offset]);
  Option3_Logo.setPos([c, logo_y_offset]);

  // Keep attribute band locked to the attribute block
  const { centerY, height } = computeAttrBand();
  Option1_ColBG.setPos([a, centerY]); Option1_ColBG.setSize([columnWidth, height]);
  Option2_ColBG.setPos([b, centerY]); Option2_ColBG.setSize([columnWidth, height]);
  Option3_ColBG.setPos([c, centerY]); Option3_ColBG.setSize([columnWidth, height]);

  Option1_MidLine.setPos([a, midY]);
  Option2_MidLine.setPos([b, midY]);
  Option3_MidLine.setPos([c, midY]);
  }



//NEW CODE NEW INTRO

// ===== CONSENT =====
var consentComponents, _consentPrev;
function consentRoutineBegin(snapshot){ return async function() {
  TrialHandler.fromSnapshot(snapshot);
  t = 0; consentClock.reset(); frameN = -1; continueRoutine = true;
  consentComponents = [consentText, consentYesBG, consentNoBG, consentYesTxt, consentNoTxt, consentMouse];
  consentMouse_mouseClock = new util.Clock();
  for (const c of consentComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function consentRoutineEachFrame(){ return async function() {
  setCursor('default');
  updateHoverGroup(consentYesBG, consentYesTxt, consentMouse, { pinYRect: consentYesBG.pos[1], pinYText: consentYesBG.pos[1] });
  updateHoverGroup(consentNoBG, consentNoTxt, consentMouse, { pinYRect: consentNoBG.pos[1], pinYText: consentNoBG.pos[1] });

  t = consentClock.getTime(); frameN += 1;
  for (const c of [consentText, consentYesBG, consentNoBG, consentYesTxt, consentNoTxt])
    if (c.status === PsychoJS.Status.NOT_STARTED) { c.setAutoDraw(true); }
  if (consentMouse.status === PsychoJS.Status.NOT_STARTED){ consentMouse.status = PsychoJS.Status.STARTED; consentMouse_mouseClock.reset(); _consentPrev = consentMouse.getPressed(); }
  if (consentMouse.status === PsychoJS.Status.STARTED){
    const btns = consentMouse.getPressed();
    if (!btns.every((e,i)=>e===_consentPrev[i])){
      _consentPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        const clicked = [consentYesBG, consentNoBG].find(b=>b.contains(consentMouse));
        if (clicked){
          psychoJS.experiment.addData('consent_choice', clicked.name==='consentYesBG' ? 'yes' : 'no');
          // if No -> end experiment gracefully
          if (clicked === consentNoBG) return quitPsychoJS('Declined participation.', false);
          continueRoutine = false; // proceed if Yes
        }
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function consentRoutineEnd(snapshot){ return async function() {
  for (const c of consentComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

// ===== INFO =====
var infoComponents, _infoPrev;
function infoRoutineBegin(snapshot){ return async function() {
  TrialHandler.fromSnapshot(snapshot);
  t=0; infoClock.reset(); frameN=-1; continueRoutine=true;
  infoComponents = [infoTitle, infoBody, infoButton, infoBtnTxt, infoMouse]; //, infoImg
  infoMouse_mouseClock = new util.Clock();
  for (const c of infoComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function infoRoutineEachFrame(){ return async function() {
  setCursor('default');
  updateHoverGroup(infoButton, infoBtnTxt, infoMouse, { pinYRect: infoButton.pos[1], pinYText: infoButton.pos[1] });

  t = infoClock.getTime(); frameN+=1;
  for (const c of [infoTitle, infoBody, infoButton, infoBtnTxt]) //, infoImg
    if (c.status === PsychoJS.Status.NOT_STARTED) c.setAutoDraw(true);
  if (infoMouse.status === PsychoJS.Status.NOT_STARTED){ infoMouse.status=PsychoJS.Status.STARTED; _infoPrev = infoMouse.getPressed(); }
  if (infoMouse.status === PsychoJS.Status.STARTED){
    const btns = infoMouse.getPressed();
    if (!btns.every((e,i)=>e===_infoPrev[i])){
      _infoPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0 && infoButton.contains(infoMouse)) continueRoutine = false;
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function infoRoutineEnd(snapshot){ return async function() {
  for (const c of infoComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

// ===== PRACTICE TRIAL =====
var practiceComponents, _prPrev;
function practiceRoutineBegin(snapshot){ return async function() {
  TrialHandler.fromSnapshot(snapshot);
  t=0; practiceClock.reset(); frameN=-1; continueRoutine=true;
  practiceChoice = null; practiceTargetName = null; practiceTargetOptionNum = null;

  const nameStyle = {
    win: psychoJS.window, units: 'norm',
    font: 'Arial', letterHeight: attributeNameTextSize,
    color: new util.Color('dimgray'), anchor: 'center',
    wrapWidth: columnWidth * 0.9,
  };
  const valStyle = {
    win: psychoJS.window, units: 'norm',
    font: 'Arial', letterHeight: valueTextSize,
    color: new util.Color('black'), anchor: 'center',
    wrapWidth: columnWidth * 0.8,
  };

  // Randomize the horizontal order while keeping one “Target”, one “Competitor”, one “Decoy”
  // We’ll map logical roles -> visual slots
  const roles = [
    {name:'Competitor', price: 300, emiss: '0%',   logo: 'Images/Option1.png'},
    {name:'Target',     price: 400, emiss: '100%', logo: 'Images/Option2.png'},
    {name:'Decoy',      price: 380, emiss: '80%',  logo: 'Images/Option3.png'}
  ];
  practicePositions = [-0.6, 0.0, 0.6];
  shuffleInPlace(practicePositions);
  const slots = [
    {x:-0.6, col:practiceColBG1, logo:practiceLogo1},
    {x:0.0, col:practiceColBG2, logo:practiceLogo2},
    {x:0.6, col:practiceColBG3, logo:practiceLogo3},
  ];

  // Assign roles to slots
  slots.forEach((slot, i) => {
    const r = roles[i];
    //slot.col.setPos([slot.x, attr1_y_offset]);
    const { centerY, height } = computeAttrBand();
    slot.col.setPos([slot.x, centerY]);
    slot.col.setSize([columnWidth, height]);
    slot.logo.setPos([slot.x, logo_y_offset]);
    slot.logo.setImage(r.logo);
    // names/values per slot
    // Attribute 1 = Offset Emissions, Attribute 2 = Price (to match your main task)
    const a1n = new visual.TextStim({
      ...nameStyle, name: `pA1Name_${i}`,
      text: `${attribute1Name} :`,
      pos: [slot.x, attr1_y_offset + postextattname],
    });
    const a2n = new visual.TextStim({
      ...nameStyle, name: `pA2Name_${i}`,
      text: `${attribute2Name} :`,
      pos: [slot.x, attr2_y_offset + postextattname],
    });
    const a1v = new visual.TextStim({
      ...valStyle, name: `pA1Val_${i}`,
      text: r.emiss,
      pos: [slot.x, attr1_y_offset - postextattvalue],
    });
    const a2v = new visual.TextStim({
      ...valStyle, name: `pA2Val_${i}`,
      text: `${attribute2Units}${r.price}`,
      pos: [slot.x, attr2_y_offset - postextattvalue],
    });
    slot.a1n=a1n; slot.a2n=a2n; slot.a1v=a1v; slot.a2v=a2v; slot.role=r.name;
    if (r.name==='Target') practiceTargetOptionNum = (slot.x===-0.6?1:slot.x===0?2:3);
  });

  practiceClickables = slots.map(s => s.logo);
  practiceMouse_mouseClock = new util.Clock();
  _prPrev = practiceMouse.getPressed();

  practiceComponents = [practiceTitle, practiceColBG1, practiceColBG2, practiceColBG3,
                        practiceLogo1, practiceLogo2, practiceLogo3, practiceMouse,
                        practiceMidLine1, practiceMidLine2, practiceMidLine3];
  slots.forEach(s => practiceComponents.push(s.a1n, s.a2n, s.a1v, s.a2v));
  for (const c of practiceComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}

function practiceRoutineEachFrame(){ return async function() {
  t = practiceClock.getTime(); 
  frameN += 1;

  for (const c of practiceComponents) {
    if (c.status === PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw === 'function') {
      c.setAutoDraw(true);
    }
  }

  //slot.col.setDepth(base + 5);    // behind
  //slot.logo.setDepth(base + 4);   // above the box
  //slot.a1n.setDepth(base + 3);    // text above
  //slot.a2n.setDepth(base + 3);
  //slot.a1v.setDepth(base + 2);    // values above as well
  //slot.a2v.setDepth(base + 2);

  // draw
  if (practiceTitle.status === PsychoJS.Status.NOT_STARTED) practiceTitle.setAutoDraw(true);
  [practiceColBG1, practiceColBG2, practiceColBG3, practiceLogo1, practiceLogo2, practiceLogo3].forEach(c => {
    if (c.status === PsychoJS.Status.NOT_STARTED) c.setAutoDraw(true);
  });
  // draw dynamic texts created in begin
  // (they are in practiceComponents already)

  // hover affordance on logos
  [practiceLogo1, practiceLogo2, practiceLogo3].forEach(l => updateHover(l, practiceMouse));

  if (practiceMouse.status === PsychoJS.Status.NOT_STARTED){
    practiceMouse.status = PsychoJS.Status.STARTED;
    _prPrev = practiceMouse.getPressed();
  }
  if (practiceMouse.status === PsychoJS.Status.STARTED){
    const btns = practiceMouse.getPressed();
    if (!btns.every((e,i)=>e===_prPrev[i])){
      _prPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        const clicked = practiceClickables.find(k => k.contains(practiceMouse));
        if (clicked){
          practiceChoice = clicked.name; // practiceLogo1|2|3
          continueRoutine = false;
        }
      }
    }
  }

  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}


function practiceRoutineEnd(snapshot){ return async function() {
  // figure out which role was chosen
  const logoToX = (nm)=>{
    if (nm==='practiceLogo1') return practiceLogo1.pos[0];
    if (nm==='practiceLogo2') return practiceLogo2.pos[0];
    return practiceLogo3.pos[0];
  };
  const chosenX = logoToX(practiceChoice);
  const chosenNum = (chosenX===-0.6?1:chosenX===0?2:3);

  // Determine if correct (target is S$400 & 100% emissions)
  const correct = (chosenNum===practiceTargetOptionNum);

  psychoJS.experiment.addData('practice_choice_option', chosenNum);
  psychoJS.experiment.addData('practice_choice_correct', correct);
  psychoJS.experiment.addData('practice_target_option', practiceTargetOptionNum);

  // stash for feedback text
  practiceTargetName = `Option ${practiceTargetOptionNum}`;

  // cleanup draws
  for (const c of practiceComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);

  // store a flag for feedback
  window._practiceWasCorrect = correct;

  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

// ===== PRACTICE FEEDBACK =====
var fbComponents, _fbPrev;
function practiceFBRoutineBegin(snapshot){ return async function() {
  TrialHandler.fromSnapshot(snapshot);
  t=0; practiceFBClock.reset(); frameN=-1; continueRoutine=true;
  const correct = !!window._practiceWasCorrect;
  const top = correct ? 'You are right!' : 'You are wrong!';
  const mid = "The more emissions a flight **offsets**, the better for the environment; " +
              `therefore, ${practiceTargetName}, which offsets **100%** of emissions, is the best option.`;
  fbTitle.setText(top);
  fbText.setText(mid.replace(/\*\*(.*?)\*\*/g,'$1'));
  fbComponents = [fbTitle, fbText, fbButton, fbBtnTxt, fbMouse];
  fbMouse_mouseClock = new util.Clock();
  for (const c of fbComponents) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function practiceFBRoutineEachFrame(){ return async function() {
  t=practiceFBClock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(fbButton, fbBtnTxt, fbMouse, { pinYRect: fbButton.pos[1], pinYText: fbButton.pos[1] });

  [fbTitle, fbText, fbButton, fbBtnTxt].forEach(c => { if (c.status===PsychoJS.Status.NOT_STARTED) c.setAutoDraw(true); });
  // hover
  updateHover(fbButton, fbMouse);
  if (fbMouse.status===PsychoJS.Status.NOT_STARTED){ fbMouse.status=PsychoJS.Status.STARTED; _fbPrev = fbMouse.getPressed(); }
  if (fbMouse.status===PsychoJS.Status.STARTED){
    const btns = fbMouse.getPressed();
    if (!btns.every((e,i)=>e===_fbPrev[i])){
      _fbPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0 && fbButton.contains(fbMouse)) continueRoutine=false;
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function practiceFBRoutineEnd(snapshot){ return async function() {
  [fbTitle, fbText, fbButton, fbBtnTxt].forEach(c=>{ if (typeof c.setAutoDraw==='function') c.setAutoDraw(false); });
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

// ===== SURVEY (mandatory single-select per row) =====
var surveyComponents, _svPrev;
function surveyRoutineBegin(snapshot){ return async function() {
  TrialHandler.fromSnapshot(snapshot);
  t=0; surveyClock.reset(); frameN=-1; continueRoutine=true;
  ansGender=ansAge=ansInc=ansConcern=ansBelieve=null;
  survStartEnabled=false; survStartBtn.setFillColor(new util.Color('#eeeeee')); survStartBtn.setLineColor(new util.Color('#9e9e9e'));
  surveyComponents = [qGenderLbl,qAgeLbl,qIncLbl,qConcernLbl,qBelieveLbl, survStartBtn, survStartTxt, survMouse];
  [qGenderOpts,qAgeOpts,qIncOpts,qConcernOpts,qBelieveOpts].forEach(row=>{
    row.forEach(o => { surveyComponents.push(o.bg, o.tx); o.selected=false; o.bg.setFillColor(new util.Color('white')); o.bg.setLineColor(new util.Color('black')); });
  });
  [qGenderOpts,qAgeOpts,qIncOpts,qConcernOpts,qBelieveOpts].forEach((row, rowIdx) => {
    const base = rowIdx * 20;
    row.forEach((o) => {
      o.bg.setDepth(base + 0);
      o.tx.setDepth(base - 5);
    });
  });
  survStartBtn.setDepth(100);  // behind
  survStartTxt.setDepth(98);   // on top
  survMouse_mouseClock = new util.Clock();
  for (const c of surveyComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function surveyRoutineEachFrame(){ return async function() {
  t=surveyClock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(survStartBtn, survStartTxt, survMouse, { pinYRect: survStartBtn.pos[1], pinYText: survStartBtn.pos[1] });
  //surveyComponents.forEach(c => { if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true); });
  surveyComponents.forEach(c => { 
    if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') 
      c.setAutoDraw(true); 
  });


  // handle clicks
  if (survMouse.status===PsychoJS.Status.NOT_STARTED){ survMouse.status=PsychoJS.Status.STARTED; _svPrev = survMouse.getPressed(); }
  if (survMouse.status===PsychoJS.Status.STARTED){
    const btns = survMouse.getPressed();
    if (!btns.every((e,i)=>e===_svPrev[i])){
      _svPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        // rows: enforce single select
        function handleRow(row, setter){
          const hit = row.find(o => o.bg.contains(survMouse));
          if (!hit) return;

          // clear selection
          row.forEach(o => {
            o.selected = false;
            o.bg.setLineColor(new util.Color('black'));
            o.bg.setFillColor(new util.Color('white'));
            // no toggling setAutoDraw here anymore
          });

          // set selection
          hit.selected = true;
          hit.bg.setLineColor(new util.Color('#1565c0'));
          hit.bg.setFillColor(new util.Color('#e3f2fd'));
          hit.tx.setColor(new util.Color('black')); // ensure readable text

          setter(hit.label);
        }


        handleRow(qGenderOpts,  v=>ansGender=v);
        handleRow(qAgeOpts,     v=>ansAge=v);
        handleRow(qIncOpts,     v=>ansInc=v);
        handleRow(qConcernOpts, v=>ansConcern=v);
        handleRow(qBelieveOpts, v=>ansBelieve=v);

        const allDone = [ansGender, ansAge, ansInc, ansConcern, ansBelieve].every(v=>v!==null);
        if (allDone && !survStartEnabled){
          survStartEnabled = true;
          survStartBtn.setFillColor(new util.Color('#bbdefb'));
          survStartBtn.setLineColor(new util.Color('#1565c0'));
        }

        if (survStartEnabled && survStartBtn.contains(survMouse)){
          continueRoutine=false;
        }
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function surveyRoutineEnd(snapshot){ return async function() {
  // export answers as new columns
  psychoJS.experiment.addData('gender', ansGender);
  psychoJS.experiment.addData('age_below_X', ansAge);           // 'Lower' or 'Higher'
  psychoJS.experiment.addData('income_vs_Y', ansInc);           // 'Lower' or 'Higher'
  psychoJS.experiment.addData('concerned', ansConcern);         // 'Yes' or 'No'
  psychoJS.experiment.addData('believe_money', ansBelieve);     // 'Yes' or 'No'
  for (const c of surveyComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

//END NEW CODE NEW INTRO

// --- EYETRACKING ROUTINES (initializeEyetracking, inst1, calibrationIntro, calibration, trackingTrial) ---
// These routines remain unchanged.
function isCameraLive() {
  try {
    const wgReady = !!(window.webgazer && window.webgazer.isReady && window.webgazer.isReady());
    const videoEl = document.querySelector('video');
    if (!videoEl) return false;

    const dimsOK = (videoEl.videoWidth > 0 && videoEl.videoHeight > 0);
    const stream  = videoEl.srcObject;
    const track   = stream && stream.getVideoTracks && stream.getVideoTracks()[0];
    const trackLive = !!(track && track.readyState === 'live');

    return wgReady && (trackLive || dimsOK);
  } catch (_) {
    return false;
  }
}


var t;
var frameN;
var continueRoutine;
var initializeEyetrackingComponents, ieyClicked, _ieyPrev;
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



    try {
      // Start WebGazer ONCE here
      await window.webgazer.begin();

      // (Optional) wait up to ~8s for readiness
      const t0 = performance.now();
      while (!window.webgazer.isReady() && performance.now() - t0 < 8000) {
        await new Promise(r => setTimeout(r, 100));
      }
    } catch (err) {
      console.error('Webgazer init failed:', err);
      alert('The eye-tracking module could not start. Please try a different browser or network.');
      return Scheduler.Event.NEXT; // or quitPsychoJS(...)
    }
    //END JSON thing, omgomgomgogm

    
    initializeEyetrackingComponents = [webcamWarning, ieyBtnRect, ieyBtnTxt, ieyStatusTxt, ieyMouse];
    //initializeEyetrackingComponents.push(webcamWarning);
    
    // reset states
    ieyMouse.status = PsychoJS.Status.NOT_STARTED;
    ieyClicked = false;
    
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

    //continueRoutine = 
    //  !window.webgazer.isReady() || 
    //  document.getElementById('webgazerFaceFeedbackBox') === null ||
    //  document.getElementById('webgazerVideoFeed') === null;}

    //cameracode
    // Camera readiness
  const camOK = isCameraLive();

  // Show/draw UI once
  [webcamWarning, ieyBtnRect, ieyBtnTxt, ieyStatusTxt].forEach(c => {
    if (c.status === PsychoJS.Status.NOT_STARTED) c.setAutoDraw(true);
  });

  // Hover affordance + “disabled” look until camera is OK
  setCursor('default');
  updateHover(ieyBtnRect, ieyMouse);
  ieyBtnRect.opacity = camOK ? 1.0 : 0.4;
  ieyBtnTxt.setColor(new util.Color(camOK ? 'black' : 'dimgray'));
  ieyBtnTxt.setText(camOK ? 'Continue' : 'Waiting…');
  ieyStatusTxt.setText(camOK ? 'Camera detected — click Continue.' : 'Waiting for camera permission…');
  ieyStatusTxt.setColor(new util.Color(camOK ? 'green' : 'red'));

  // Start mouse and handle click
  if (ieyMouse.status === PsychoJS.Status.NOT_STARTED) {
    ieyMouse.status = PsychoJS.Status.STARTED;
    calibrationClick_mouseClock = new util.Clock(); // reuse a clock var
    _ieyPrev = ieyMouse.getPressed();
  }
  if (ieyMouse.status === PsychoJS.Status.STARTED) {
    const btns = ieyMouse.getPressed();
    if (!btns.every((e,i)=>e===_ieyPrev[i])) {
      _ieyPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0 && camOK && ieyBtnRect.contains(ieyMouse)) {
        ieyClicked = true;
      }
    }
  }

  // Only leave when camera is OK *and* participant clicked Continue
  continueRoutine = !(camOK && ieyClicked);
  //end camera code
    
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

//function initializeEyetrackingRoutineEnd() {
//  return async function () {
//    for (const thisComponent of initializeEyetrackingComponents) {
//      if (typeof thisComponent.setAutoDraw === 'function') {
//        thisComponent.setAutoDraw(false);
//      }
//    }
//    routineTimer.reset();
//    return Scheduler.Event.NEXT;
//  };
//}

function initializeEyetrackingRoutineEnd() {
  return async function () {
    for (const c of [webcamWarning, ieyBtnRect, ieyBtnTxt, ieyStatusTxt]) {
      if (typeof c.setAutoDraw === 'function') c.setAutoDraw(false);
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
      calibrationMouse_mouseClock.reset();
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
      calibrationClick_mouseClock.reset();
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
    psychoJS.experiment.addData('TrialType', "calibration");
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
      mouse_2_mouseClock.reset();
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
          mouse_2.rightButton.push(_mouseButtons[2]); mouse_2.time.push(mouse_2_mouseClock.getTime());
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
// --- MIXED TRIALS LOOP (interleave trial2* and trial* based on odd/even) ---
var mixedTrials;         // TrialHandler for the combined loop
let t1Done = 0;          // how many 2-option trials have been run (trials2 first session)
let t2Done = 0;          // how many 3-option trials have been run (trials second session)

// initialize total count if not already:
Trials = (Trials1 + Trials2);

function mixedTrialsLoopBegin(mixedLoopScheduler, snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);

    // one flat loop with Trials iterations
    mixedTrials = new TrialHandler({
      psychoJS: psychoJS,
      nReps: Trials,
      method: TrialHandler.Method.SEQUENTIAL,
      extraInfo: expInfo,
      originPath: undefined,
      trialList: [{}],
      seed: undefined,
      name: 'mixedTrials'
    });

    psychoJS.experiment.addLoop(mixedTrials);
    currentLoop = mixedTrials;

    for (const thisTrial of mixedTrials) {
      const snap = mixedTrials.getSnapshot();

      // Increment trial counter FIRST (1-based for human readability)
      TrialSoFar += 1;

      // Always show pre-trial blank
      mixedLoopScheduler.add(blankRoutineBegin(snap));
      mixedLoopScheduler.add(blankRoutineEachFrame());
      mixedLoopScheduler.add(blankRoutineEnd(snap));

      // Decide which trial type to run:
      // Prefer strict alternation odd/even while respecting remaining quotas.
      // - odd TrialSoFar -> prefer 2-option if we still have Trials1 left
      // - even TrialSoFar -> prefer 3-option if we still have Trials2 left
      // If preferred one is exhausted, fall back to the other.
      const preferTwoOption = (TrialSoFar % 2 === 1);
      const canTwo = (t1Done < Trials1);
      const canThree = (t2Done < Trials2);

      if ((preferTwoOption && canTwo) || !canThree) {
        // 2-option (your "first session", functions: trial2Routine*)
        mixedLoopScheduler.add(importConditions(snap));
        mixedLoopScheduler.add(trial2RoutineBegin(snap));
        mixedLoopScheduler.add(trial2RoutineEachFrame());
        mixedLoopScheduler.add(trial2RoutineEnd(snap));
        t1Done += 1;
      } else {
        // 3-option (your "second session", functions: trialRoutine*)
        mixedLoopScheduler.add(importConditions(snap));
        mixedLoopScheduler.add(trialRoutineBegin(snap));
        mixedLoopScheduler.add(trialRoutineEachFrame());
        mixedLoopScheduler.add(trialRoutineEnd(snap));
        t2Done += 1;
      }

      // After-trial blank
      mixedLoopScheduler.add(afterblankRoutineBegin(snap));
      mixedLoopScheduler.add(afterblankRoutineEachFrame());
      mixedLoopScheduler.add(afterblankRoutineEnd(snap));

      // Insert calibration every CALIB_EVERY, except after the very last trial
      if (TrialSoFar % CALIB_EVERY === 0 && TrialSoFar < Trials) {
        calibrationTxt.setText(
          "Quick check: we’re recalibrating the eye tracker.\n" +
          "Remember to keep your head still during the experiment.\n" +
          "Please click each dot as you look at it.\n" +
          "Click anywhere to continue."
        );
        mixedLoopScheduler.add(calibrationIntroRoutineBegin());
        mixedLoopScheduler.add(calibrationIntroRoutineEachFrame());
        mixedLoopScheduler.add(calibrationIntroRoutineEnd());
        const trialscalLoopScheduler = new Scheduler(psychoJS);
        mixedLoopScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
        mixedLoopScheduler.add(trialscalLoopScheduler);
        mixedLoopScheduler.add(trialscalLoopEnd);
      }

      mixedLoopScheduler.add(mixedTrialsLoopEndIteration(mixedLoopScheduler, snap));
    }

    return Scheduler.Event.NEXT;
  };
}

async function mixedTrialsLoopEnd() {
  psychoJS.experiment.removeLoop(mixedTrials);
  if (psychoJS.experiment._unfinishedLoops.length > 0)
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1);
  else
    currentLoop = psychoJS.experiment;
  return Scheduler.Event.NEXT;
}

function mixedTrialsLoopEndIteration(scheduler, snapshot) {
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


//NEWCODEFINISHED




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
          "Please click each dot as you look at it.\n" +
          "Click anywhere to continue."
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

    Option1_MidLine.setAutoDraw(true);
    Option2_MidLine.setAutoDraw(true);
    Option3_MidLine.setAutoDraw(false);

    mouse.x = []; mouse.y = []; mouse.leftButton = []; mouse.midButton = [];
    mouse.rightButton = []; mouse.time = []; mouse.clicked_name = [];
    gotValidClick = false;
    
    clicked_things = [];
    clickables = [Option1_Logo, Option2_Logo];  // Only 2
    
    waiting = false;
    MOUSEGAZE = []; ETGAZENF = []; ETGAZExT = [];
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
      mouse_mouseClock.reset();
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
          mouse.time.push(mouse_mouseClock.getTime());
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
    ETGAZENF.push([x_gaze, y_gaze, t]);
    const xNorm = ( x_gaze - (psychoJS.window.size[0] / 2) ) / (psychoJS.window.size[0] / 2);
    const yNorm = - ( y_gaze - (psychoJS.window.size[1] / 2 ) ) / (psychoJS.window.size[1] / 2);
    ETGAZExT.push([xNorm, yNorm, t]);

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
    Option1_MidLine.setAutoDraw(false);
    Option2_MidLine.setAutoDraw(false);
    Option3_MidLine.setAutoDraw(false);
    if (inst1_resp.status === PsychoJS.Status.STARTED) inst1_resp.stop();
    var ActualTime = t;

    psychoJS.experiment.addData('Choice', choice);
    psychoJS.experiment.addData('TrialNumber', nLoop);
    psychoJS.experiment.addData('TrialDuration', ActualTime - StartTimeRoutine);
    psychoJS.experiment.addData('MOUSE_GAZE_trail', MOUSEGAZE);
    psychoJS.experiment.addData('ET_GAZE_x_T_trail', ETGAZExT);
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

    psychoJS.experiment.addData('TrialType', "trial2choices");

    const videoEl = document.querySelector('video');
    const lumilumi = getAverageLuminance(videoEl);
    psychoJS.experiment.addData('LightingAvg_process', Number.isFinite(lumilumi) ? lumilumi : -1);

    carryFromTwoOpt = {  //save variables
      fli_len,
      emi_pro,
      price_competitor,
      price_target
    };

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

    Option1_MidLine.setAutoDraw(true);
    Option2_MidLine.setAutoDraw(true);
    Option3_MidLine.setAutoDraw(true);

    fli_len          = carryFromTwoOpt.fli_len;
    emi_pro          = carryFromTwoOpt.emi_pro;
    price_competitor = carryFromTwoOpt.price_competitor;
    price_target     = carryFromTwoOpt.price_target;

    //fli_len = sample1(flight_length);
    //pri_mul = sample1(price_multiplier);
    //emi_mul = sample1(emission_multiplier);
    //off_mul = sample1(offset_multiplier);
    //emi_pro = fli_len*emi_mul;
    //price_competitor = Math.round( fli_len*pri_mul );
    //price_target = Math.round( price_competitor + off_mul*emi_pro );
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
    MOUSEGAZE = []; ETGAZENF = []; ETGAZExT = [];
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
      mouse_mouseClock.reset();
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
          mouse.time.push(mouse_mouseClock.getTime());
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
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1]], t);
    let x_gaze = util.sum(window.xGazes) / window.xGazes.length;
    let y_gaze = util.sum(window.yGazes) / window.yGazes.length;
    ETGAZENF.push([x_gaze, y_gaze, t]);
    const xNorm = ( x_gaze - (psychoJS.window.size[0] / 2) ) / (psychoJS.window.size[0] / 2);
    const yNorm = - ( y_gaze - (psychoJS.window.size[1] / 2 ) ) / (psychoJS.window.size[1] / 2);
    ETGAZExT.push([xNorm, yNorm, t]);
    time_trial.push(t);
    unixTime.push(new Date().getTime());

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
    Option1_MidLine.setAutoDraw(false);
    Option2_MidLine.setAutoDraw(false);
    Option3_MidLine.setAutoDraw(false);
    if (inst1_resp.status === PsychoJS.Status.STARTED) inst1_resp.stop();
    var ActualTimeTime = t;

    psychoJS.experiment.addData('Choice', choice);
    psychoJS.experiment.addData('TrialNumber', nLoop);
    psychoJS.experiment.addData('TrialDuration', ActualTimeTime - StartTimeRoutine);
    psychoJS.experiment.addData('MOUSE_GAZE_trail', MOUSEGAZE);
    psychoJS.experiment.addData('ET_GAZE_x_T_trail', ETGAZExT);
    psychoJS.experiment.addData('ET_GAZE_RawPx_trail', ETGAZENF);

    // Save locations of key elements
    psychoJS.experiment.addData('Loc_Option1', [Option1_Logo.pos[0], Option1_Logo.pos[1], Option1_Logo.size[0], Option1_Logo.size[1]]);
    psychoJS.experiment.addData('Loc_Option2', [Option2_Logo.pos[0], Option2_Logo.pos[1], Option2_Logo.size[0], Option2_Logo.size[1]]);
    psychoJS.experiment.addData('Loc_Option3', [Option3_Logo.pos[0], Option3_Logo.pos[1], Option3_Logo.size[0], Option3_Logo.size[1]]);
    
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
    psychoJS.experiment.addData('decoy_coeficient', pri_dec);

    psychoJS.experiment.addData('TrialType', "trial3choices");

    const videoEl = document.querySelector('video');
    const lumilumi = getAverageLuminance(videoEl);
    psychoJS.experiment.addData('LightingAvg_process', Number.isFinite(lumilumi) ? lumilumi : -1);


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

//NEW SURVEY

/* ----------------------
   helpers (row handling)
-----------------------*/
function handleSingleSelectRow(row, mouse, setter){
  const hit = row.find(o => o.bg.contains(mouse));
  if (!hit) return false;
  row.forEach(o => {
    o.selected = false;
    o.bg.setLineColor(new util.Color('black'));
    o.bg.setFillColor(new util.Color('white'));
  });
  hit.selected = true;
  hit.bg.setLineColor(new util.Color('#1565c0'));
  hit.bg.setFillColor(new util.Color('#e3f2fd'));
  hit.tx.setColor(new util.Color('black'));
  setter(hit.label);
  return true;
}
function armSurveyScreen(components, rows, startBtn, startTxt){
  // draw order: boxes under, text over
  rows.forEach((row, rowIdx) => {
    const base = rowIdx * 20;
    row.forEach(o => { 
      o.bg.setDepth(base + 0);
      o.tx.setDepth(base - 5);
      components.push(o.bg, o.tx);
    });
  });
  startBtn.setDepth(100);
  startTxt.setDepth(98);
}

// Global helper so all routines can use it (new surveys included)
function makeRowOptions(baseName, y, labels, options = {}) {
  const { size = [0.3, 0.21],
    x0 = -0.15,
    gap = 0.3 } = options;
  const out = [];
  labels.forEach((lab, i) => {
    const pos = [x0 + i * gap, y];
    const bg = makeButtonRect(`${baseName}_opt${i}`, pos, size, { fill: 'white', line: 'black' });
    const tx = makeText(`${baseName}_opt${i}_txt`, lab, pos, 0.04);
    // Depth will be set later by armSurveyScreen()
    out.push({ bg, tx, label: lab, selected: false });
  });
  return out;
}


/* ================
   newsurvey1
   ================*/
var newsurvey1Clock, newsurvey1Components, _ns1Prev;
function newsurvey1RoutineBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; newsurvey1Clock = ns1Clock = new util.Clock(); frameN=-1; continueRoutine=true;

  // Reset answers
  ns1A1=ns1A2=ns1A3=ns1A4=null;
  ns1StartEnabled=false;

  var es0x0 = -0.55;
  // Build controls (labels + options) once per visit
  ns1Q1Lbl = makeText('ns1Q1Lbl','In the presented choice situations,\nhow did you make choice?',[es0x0,0.45],0.045,1.2);
  ns1Q2Lbl = makeText('ns1Q2Lbl','What is your age?',[es0x0,0.2],0.045,1.2);
  ns1Q3Lbl = makeText('ns1Q3Lbl','What is your education level?',[es0x0,-0.05],0.045,1.2);
  ns1Q4Lbl = makeText('ns1Q4Lbl','What is your annual income?',[es0x0,-0.3],0.045,1.2);

  ns1Q1Opts = makeRowOptions('ns1Q1', 0.45, ['I chose the lowest\nprice option only.','I gave importance to\nprice and carbon offset.','I only focused on carbon\noffset because price was\nnot changing much.'], {size: [0.3,0.21] , gap: 0.3 , x0: -0.1});
  ns1Q2Opts = makeRowOptions('ns1Q2', 0.2, ['18-30','31-40','41-50','51-60','61-70','71 and\nolder'], {size: [0.1,0.15] , gap: 0.1, x0: -0.2});
  ns1Q3Opts = makeRowOptions('ns1Q3', -0.05, ['High school\nor below','College or\ntechnical school','Bachelor’s\ndegree','Master’s\ndegree','Doctorate or\nprofessional degree'], {size: [0.2,0.21] , gap: 0.2});
  ns1Q4Opts = makeRowOptions('ns1Q4', -0.3, ['Less than\n10,000 SGD',	'10,001-30,000\nSGD', '30,001-50,000\nSGD', '50,001-100,000\nSGD', 'More than\n100,000 SGD'], {size: [0.2,0.21] , gap: 0.2});

  ns1StartBtn = makeButtonRect('ns1StartBtn',[0,-0.8],[0.4,0.24],{fill:'#eeeeee', line:'#9e9e9e'});
  ns1StartTxt = makeText('ns1StartTxt','Continue',ns1StartBtn.pos,0.045);
  ns1Mouse = new core.Mouse({win:psychoJS.window});

  newsurvey1Components = [ns1Q1Lbl,ns1Q2Lbl,ns1Q3Lbl,ns1Q4Lbl, ns1StartBtn, ns1StartTxt, ns1Mouse];
  armSurveyScreen(newsurvey1Components,[ns1Q1Opts,ns1Q2Opts,ns1Q3Opts,ns1Q4Opts], ns1StartBtn, ns1StartTxt);

  for (const c of newsurvey1Components) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function newsurvey1RoutineEachFrame(){ return async function(){
  t = ns1Clock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(ns1StartBtn, ns1StartTxt, ns1Mouse, { pinYRect: ns1StartBtn.pos[1], pinYText: ns1StartBtn.pos[1] });

  newsurvey1Components.forEach(c => {
    if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true);
  });

  if (ns1Mouse.status===PsychoJS.Status.NOT_STARTED){ ns1Mouse.status=PsychoJS.Status.STARTED; _ns1Prev = ns1Mouse.getPressed(); }
  if (ns1Mouse.status===PsychoJS.Status.STARTED){
    const btns = ns1Mouse.getPressed();
    if (!btns.every((e,i)=>e===_ns1Prev[i])){
      _ns1Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        handleSingleSelectRow(ns1Q1Opts, ns1Mouse, v=>ns1A1=v);
        handleSingleSelectRow(ns1Q2Opts, ns1Mouse, v=>ns1A2=v);
        handleSingleSelectRow(ns1Q3Opts, ns1Mouse, v=>ns1A3=v);
        handleSingleSelectRow(ns1Q4Opts, ns1Mouse, v=>ns1A4=v);

        const allDone = [ns1A1,ns1A2,ns1A3,ns1A4].every(v=>v!==null);
        if (allDone && !ns1StartEnabled){
          ns1StartEnabled = true;
          ns1StartBtn.setFillColor(new util.Color('#bbdefb'));
          ns1StartBtn.setLineColor(new util.Color('#1565c0'));
        }
        if (ns1StartEnabled && ns1StartBtn.contains(ns1Mouse)) continueRoutine=false;
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function newsurvey1RoutineEnd(snapshot){ return async function(){
  for (const c of newsurvey1Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.addData('ns1_choice_strategy', ns1A1);
  psychoJS.experiment.addData('ns1_age', ns1A2);
  psychoJS.experiment.addData('ns1_education', ns1A3);
  psychoJS.experiment.addData('ns1_income', ns1A4);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

/* ================
   newsurvey2
   ================*/
var newsurvey2Clock, newsurvey2Components, _ns2Prev;
function newsurvey2RoutineBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; newsurvey2Clock = ns2Clock = new util.Clock(); frameN=-1; continueRoutine=true;

  ns2A1=ns2A2=ns2A3=null; ns2StartEnabled=false;

  var es1x0 = -0.65;
  ns2Q1Lbl = makeText('ns2Q1Lbl','What is your most frequent flight duration in last 12 months?\n*please declare only one-way flight, e.g., Singapore - New York,\nbut not Singapore - New York – Singapore',[es1x0,0.4],0.045,1.2);
  ns2Q2Lbl = makeText('ns2Q2Lbl','What is your typical cost for one flight in last 12 months?\n*if you purchased a round trip, please declare a half of that price',[es1x0,0.15],0.045,1.2);
  ns2Q3Lbl = makeText('ns2Q3Lbl','How many flights did you take in last 12 months?\n*if you purchased a round trip, please count it as twice.',[es1x0,-0.10],0.045,1.2);


  ns2Q1Opts = makeRowOptions('ns2Q1', 0.4, ['Less than\n3 hours', '3-6\nhours', '7-10\nhours', 'More than\n10 hours'], {size: [0.15,0.21] , gap: 0.15});
  ns2Q2Opts = makeRowOptions('ns2Q2', 0.15, ['Less than\n100 SGD', '101-300\nSGD', '301-500\nSGD', '501-1000\nSGD', '1001-2000\nSGD', '2001-4000\nSGD'], {size: [0.15,0.21] , gap: 0.15});
  ns2Q3Opts = makeRowOptions('ns2Q3', -0.10, ['0 times', '1-2 times', '3-5 times', '6-10 times', '11-20 times', 'More than\n20 times'], {size: [0.15,0.21] , gap: 0.15});

  ns2StartBtn = makeButtonRect('ns2StartBtn',[0,-0.8],[0.4,0.24],{fill:'#eeeeee', line:'#9e9e9e'});
  ns2StartTxt = makeText('ns2StartTxt','Continue',ns2StartBtn.pos,0.045);
  ns2Mouse = new core.Mouse({win:psychoJS.window});

  newsurvey2Components = [ns2Q1Lbl,ns2Q2Lbl,ns2Q3Lbl, ns2StartBtn, ns2StartTxt, ns2Mouse];
  armSurveyScreen(newsurvey2Components,[ns2Q1Opts,ns2Q2Opts,ns2Q3Opts], ns2StartBtn, ns2StartTxt);
  for (const c of newsurvey2Components) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function newsurvey2RoutineEachFrame(){ return async function(){
  t=ns2Clock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(ns2StartBtn, ns2StartTxt, ns2Mouse, { pinYRect: ns2StartBtn.pos[1], pinYText: ns2StartBtn.pos[1] });

  newsurvey2Components.forEach(c => { if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true); });

  if (ns2Mouse.status===PsychoJS.Status.NOT_STARTED){ ns2Mouse.status=PsychoJS.Status.STARTED; _ns2Prev = ns2Mouse.getPressed(); }
  if (ns2Mouse.status===PsychoJS.Status.STARTED){
    const btns = ns2Mouse.getPressed();
    if (!btns.every((e,i)=>e===_ns2Prev[i])){
      _ns2Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        handleSingleSelectRow(ns2Q1Opts, ns2Mouse, v=>ns2A1=v);
        handleSingleSelectRow(ns2Q2Opts, ns2Mouse, v=>ns2A2=v);
        handleSingleSelectRow(ns2Q3Opts, ns2Mouse, v=>ns2A3=v);

        const allDone = [ns2A1,ns2A2,ns2A3].every(v=>v!==null);
        if (allDone && !ns2StartEnabled){
          ns2StartEnabled=true;
          ns2StartBtn.setFillColor(new util.Color('#bbdefb'));
          ns2StartBtn.setLineColor(new util.Color('#1565c0'));
        }
        if (ns2StartEnabled && ns2StartBtn.contains(ns2Mouse)) continueRoutine=false;
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function newsurvey2RoutineEnd(snapshot){ return async function(){
  for (const c of newsurvey2Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.addData('ns2_most_freq_flight', ns2A1);
  psychoJS.experiment.addData('ns2_typical_cost', ns2A2);
  psychoJS.experiment.addData('ns2_flights_per_year', ns2A3);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

/* ================
   newsurvey3 (Likert-style)
   ================*/
var newsurvey3Clock, newsurvey3Components, _ns3Prev;
function newsurvey3RoutineBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; newsurvey3Clock = ns3Clock = new util.Clock(); frameN=-1; continueRoutine=true;

  ns3A1=ns3A2=ns3A3=ns3A4=ns3A5=ns3A6=null; ns3StartEnabled=false;

  const range = ['Absolutely\nNo', 'Partially\nNo', 'Neutral', 'Partially\nYes', 'Absolutely\nYes'];

  var es2x0 = -0.55;
  ns3Q1Lbl = makeText('ns3Q1Lbl','Are you concerned about\nenvironmental protection\nin your daily life?',[es2x0,0.45],0.045,1.2);
  ns3Q2Lbl = makeText('ns3Q2Lbl','Are you willing to pay\nextra for products or services that are\nenvironmentally friendly?',[es2x0,0.25],0.045,1.2);
  ns3Q3Lbl = makeText('ns3Q3Lbl','Are you willing to pay\nthe offset price in air travel?',[es2x0,0.05],0.045,1.2);
  ns3Q4Lbl = makeText('ns3Q4Lbl','Do you believe that individual actions can make\na significant impact on improving the environment?',[es2x0,-0.15],0.045,1.2);
  ns3Q5Lbl = makeText('ns3Q5Lbl','Do you believe that the money you pay for carbon\noffset programs is actually used for carbon offset?',[es2x0,-0.35],0.045,1.2);
  ns3Q6Lbl = makeText('ns3Q6Lbl','Would your likelihood to enroll in carbon offset\nprograms increase if you were certain your payment will\nbe used to improve the environment?',[es2x0,-0.55],0.045,1.2);

  ns3Q1Opts = makeRowOptions('ns3Q1', 0.45, range, {size: [0.15,0.15] , gap: 0.15});
  ns3Q2Opts = makeRowOptions('ns3Q2', 0.25, range, {size: [0.15,0.15] , gap: 0.15});
  ns3Q3Opts = makeRowOptions('ns3Q3', 0.05, range, {size: [0.15,0.15] , gap: 0.15});
  ns3Q4Opts = makeRowOptions('ns3Q4', -0.15, range, {size: [0.15,0.15] , gap: 0.15});
  ns3Q5Opts = makeRowOptions('ns3Q5', -0.35, range, {size: [0.15,0.15] , gap: 0.15});
  ns3Q6Opts = makeRowOptions('ns3Q6', -0.55, range, {size: [0.15,0.15] , gap: 0.15});

  ns3StartBtn = makeButtonRect('ns3StartBtn',[0,-0.85],[0.4,0.24],{fill:'#eeeeee', line:'#9e9e9e'});
  ns3StartTxt = makeText('ns3StartTxt','Continue',ns3StartBtn.pos,0.045);
  ns3Mouse = new core.Mouse({win:psychoJS.window});

  newsurvey3Components = [ns3Q1Lbl,ns3Q2Lbl,ns3Q3Lbl,ns3Q4Lbl,ns3Q5Lbl,ns3Q6Lbl, ns3StartBtn, ns3StartTxt, ns3Mouse];
  armSurveyScreen(newsurvey3Components,[ns3Q1Opts,ns3Q2Opts,ns3Q3Opts,ns3Q4Opts,ns3Q5Opts,ns3Q6Opts], ns3StartBtn, ns3StartTxt);

  for (const c of newsurvey3Components) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function newsurvey3RoutineEachFrame(){ return async function(){
  t=ns3Clock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(ns3StartBtn, ns3StartTxt, ns3Mouse, { pinYRect: ns3StartBtn.pos[1], pinYText: ns3StartBtn.pos[1] });

  newsurvey3Components.forEach(c => { if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true); });

  if (ns3Mouse.status===PsychoJS.Status.NOT_STARTED){ ns3Mouse.status=PsychoJS.Status.STARTED; _ns3Prev = ns3Mouse.getPressed(); }
  if (ns3Mouse.status===PsychoJS.Status.STARTED){
    const btns = ns3Mouse.getPressed();
    if (!btns.every((e,i)=>e===_ns3Prev[i])){
      _ns3Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        handleSingleSelectRow(ns3Q1Opts, ns3Mouse, v=>ns3A1=v);
        handleSingleSelectRow(ns3Q2Opts, ns3Mouse, v=>ns3A2=v);
        handleSingleSelectRow(ns3Q3Opts, ns3Mouse, v=>ns3A3=v);
        handleSingleSelectRow(ns3Q4Opts, ns3Mouse, v=>ns3A4=v);
        handleSingleSelectRow(ns3Q5Opts, ns3Mouse, v=>ns3A5=v);
        handleSingleSelectRow(ns3Q6Opts, ns3Mouse, v=>ns3A6=v);

        const allDone = [ns3A1,ns3A2,ns3A3,ns3A4,ns3A5,ns3A6].every(v=>v!==null);
        if (allDone && !ns3StartEnabled){
          ns3StartEnabled=true;
          ns3StartBtn.setFillColor(new util.Color('#bbdefb'));
          ns3StartBtn.setLineColor(new util.Color('#1565c0'));
        }
        if (ns3StartEnabled && ns3StartBtn.contains(ns3Mouse)) continueRoutine=false;
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function newsurvey3RoutineEnd(snapshot){ return async function(){
  for (const c of newsurvey3Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.addData('ns3_concerned', ns3A1);
  psychoJS.experiment.addData('ns3_willing_extra', ns3A2);
  psychoJS.experiment.addData('ns3_willing_payoff', ns3A3);
  psychoJS.experiment.addData('ns3_believe_ind', ns3A4);
  psychoJS.experiment.addData('ns3_believe_money', ns3A5);
  psychoJS.experiment.addData('ns3_likelihood_change', ns3A6);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}

/* ================
   newsurvey4
   ================*/
var newsurvey4Clock, newsurvey4Components, _ns4Prev;
function newsurvey4RoutineBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; newsurvey4Clock = ns4Clock = new util.Clock(); frameN=-1; continueRoutine=true;

  ns4A1=ns4A2=null; ns4StartEnabled=false;

  var esx3x0 = -0.55;
  ns4Q1Lbl = makeText('ns4Q1Lbl','How do you think the responsibility for carbon emissions\nfrom air travel should be shared between passengers\nand airlines?',[esx3x0,0.35],0.045,1.2);
  ns4Q2Lbl = makeText('ns4Q2Lbl','Have you ever paid the offset price for air travel?\n*If yes - please specify the average amount paid for one-way flight.\nIf no - please choose \'Did not pay\'.',[esx3x0,0.10],0.045,1.2);

  ns4Q1Opts = makeRowOptions('ns4Q1', 0.35, ['Passengers should\ntake more\nresponsibility', 'Both should share\nthe responsibility\nequally', 'Airlines should\ntake more\nresponsibility', 'Airlines are\nfully responsible'], {size: [0.25,0.21] , gap: 0.25 , x0: -0.05});
  ns4Q2Opts = makeRowOptions('ns4Q2', 0.10, ['Less than\n10 SGD', '10-20 SGD', '21-50 SGD', '51-100 SGD', 'More than\n100 SGD', 'Did not pay'], {size: [0.15,0.21] , gap: 0.15 , x0: -0.1});

  ns4StartBtn = makeButtonRect('ns4StartBtn',[0,-0.8],[0.4,0.24],{fill:'#eeeeee', line:'#9e9e9e'});
  ns4StartTxt = makeText('ns4StartTxt','Finish',ns4StartBtn.pos,0.045);
  ns4Mouse = new core.Mouse({win:psychoJS.window});

  newsurvey4Components = [ns4Q1Lbl,ns4Q2Lbl, ns4StartBtn, ns4StartTxt, ns4Mouse];
  armSurveyScreen(newsurvey4Components,[ns4Q1Opts,ns4Q2Opts], ns4StartBtn, ns4StartTxt);
  for (const c of newsurvey4Components) if ('status' in c) c.status=PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}
function newsurvey4RoutineEachFrame(){ return async function(){
  t=ns4Clock.getTime(); frameN+=1;
  setCursor('default');
  updateHoverGroup(ns4StartBtn, ns4StartTxt, ns4Mouse, { pinYRect: ns4StartBtn.pos[1], pinYText: ns4StartBtn.pos[1] });

  newsurvey4Components.forEach(c => { if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true); });

  if (ns4Mouse.status===PsychoJS.Status.NOT_STARTED){ ns4Mouse.status=PsychoJS.Status.STARTED; _ns4Prev = ns4Mouse.getPressed(); }
  if (ns4Mouse.status===PsychoJS.Status.STARTED){
    const btns = ns4Mouse.getPressed();
    if (!btns.every((e,i)=>e===_ns4Prev[i])){
      _ns4Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        handleSingleSelectRow(ns4Q1Opts, ns4Mouse, v=>ns4A1=v);
        handleSingleSelectRow(ns4Q2Opts, ns4Mouse, v=>ns4A2=v);
        const allDone = [ns4A1,ns4A2].every(v=>v!==null);
        if (allDone && !ns4StartEnabled){
          ns4StartEnabled=true;
          ns4StartBtn.setFillColor(new util.Color('#bbdefb'));
          ns4StartBtn.setLineColor(new util.Color('#1565c0'));
        }
        if (ns4StartEnabled && ns4StartBtn.contains(ns4Mouse)) continueRoutine=false;
      }
    }
  }
  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}
function newsurvey4RoutineEnd(snapshot){ return async function(){
  for (const c of newsurvey4Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.addData('ns4_how_do_you', ns4A1);
  psychoJS.experiment.addData('ns4_ever_paid_offset', ns4A2);
  if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
  return Scheduler.Event.NEXT;
}}


//END NEW SURVEY


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


