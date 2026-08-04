/***********************************
 *            Exp memory           *
 ***********************************/

import { core, data, sound, util, visual, hardware } from './lib/psychojs-2023.1.0.js';
const { PsychoJS } = core;
const { TrialHandler, MultiStairHandler } = data;
const { Scheduler } = util;
//some handy aliases as in the psychopy scripts;
const { abs, sin, cos, PI: pi, sqrt } = Math;
const { round } = util;

// --- Declaración de variables globales ---
// Timers y Control de Flujo
let globalClock, routineTimer, t, frameN, continueRoutine, frameRemains, frameDur;
let IntroClock, Blank2Clock, trialClock, blankClock, favoritesClock, EndClock, text_blank;

// Componentes Visuales y de Interacción
let Intro, Attributes_, ButtonIntro_, StartButton, ContinueButton, FinishButton, mouse_2;
let Starting_title, One_title, Two_title, Three_title;
let FreezerBG, PriceTag, DoorRight, DoorLeft, ImageProd1, ImageProd2;
let Price_Label1, Price_Label2, Sugar_Label1, Sugar_Label2, Quality_Label, Brand_Rep_Label;
let Price1, Sugar1, Quality1, Brand_Rep1;
let Price2, Sugar2, Quality2, Brand_Rep2;
let mouse, key_resp, gotValidClick, prevButtonState, _mouseButtons, _mouseXYs, _key_resp_allKeys;
let TextB;
let FreezerBK, DoorR, DoorL, mouse_3;
let image1, image2, image3, image4, image5, textTop;
let Msg;

// Listas de Componentes para las Rutinas
let IntroComponents, Blank2Components, trialComponents, blankComponents, favoritesComponents, EndComponents;

// Lógica del Experimento
let Trials, trials, trials_2, trials_3, useRows, currentLoop;
let bkgcolor, waiting, choice, choiceID, clickedN, clickables, startTime, clicked_things, clicked_things1, waiting1, clickables1;
let product1, product2, ImgProd1, ImgProd2, alt1, alt2;
//let prodID1, prodID2, product1_Price, product1_Sugar, product1_Quality, product1_Brand_Rep;
//let product2_Price, product2_Sugar, product2_Quality, product2_Brand_Rep;
const CALIB_EVERY = 20;
var TrialSoFar = 0;

// Lógica de la Rutina 'favorites'
let imagenes, elecciones, n_elegidas, stim_list, farpos, closepos, posiciones, seleccion_hecha;
let indice_seleccionado, elegido, imagenes_trial, posiciones_trial;

// Datos a Guardar
var StartTimeRoutine;

// Configuración de Posiciones y Tamaños (del nuevo script)
let nLoop, mouse_delay;
let AllAttributes, Attributes;
let n_filas, dist_y, dist_x;
let xcoord1, xcoord2, xcoord3, ycoord1, ycoord2, ycoord3, ycoord4, ycoord5;
let loc1, loc2, loc3, loc4, loc5, locAtt, element_to_position, locations;
let xsizeimg, ysizeimg, xsizele, ysizele, xsizela, ysizela;
let xETreg, yETreg, xlabETreg, ylabETreg, factorxpos, factorypos, factorET, letterheight;
let bebidas;

//Funciones botón------------------------------------------------------------
const HOVER_SCALE = 1.10;
const HOVER_LERP  = 0.25;

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

function updateHover(stim, mouse, style = {}) {
  if (!stim) return;
  ensureBaseSize(stim);

  const hovered = stim.contains(mouse);
  const target = hovered ? [stim._baseSize[0]*HOVER_SCALE, stim._baseSize[1]*HOVER_SCALE]
                         :  stim._baseSize;

  if (stim.size[0] !== target[0] || stim.size[1] !== target[1]) {
    stim.size = target; // snap
    if (hovered && style.on) style.on(stim);
    if (!hovered && style.off) style.off(stim);
  }
  if (hovered) setCursor('pointer');
}
//Fin funciones botón---------------------------------------------------------


// store info about the experiment session:
let expName = 'Exp_attention';
let expInfo = {
    'participant': `${util.pad(Number.parseFloat(util.randint(0, 45)).toFixed(0), 2)}`,
    'session': '001',
};

// --- Código "Before Experiment" ---
// Esta sección contiene la lógica de configuración principal de tu nuevo script de Python.

function _pj_snippets(container) {
    function in_es6(left, right) {
        if (((right instanceof Array) || ((typeof right) === "string"))) {
            return (right.indexOf(left) > (- 1));
        } else if (((right instanceof Map) || (right instanceof Set) || (right instanceof WeakMap) || (right instanceof WeakSet))) {
            return right.has(left);
        } else {
            return (left in right);
        }
    }
    container["in_es6"] = in_es6;
    return container;
}
let _pj = {};
_pj_snippets(_pj);

// Variables de control y configuración
nLoop = 0;
mouse_delay = 1;
let prevButtons = [0,0,0];
let mouseArmed   = false;
let clickArmDelay = 0.20;  // seconds after routine start before we allow clicks
let routineStartT = 0;

// Listas de productos y atributos
AllAttributes = ['Price', 'Sugar', 'Quality', 'Brand_Rep'];
Attributes = ['Price', 'Sugar', 'Quality', 'Brand_Rep']; // MODIFICA ESTO PARA CAMBIAR LOS ATRIBUTOS MOSTRADOS

// Definir largos y distancias
n_filas = 5 + Attributes.length;
dist_y = 2 / n_filas;
dist_x = 0.5;

// Parámetros de localización
xcoord1 = 0;
xcoord2 = -dist_x;
xcoord3 = dist_x;
ycoord1 = 0.05;
ycoord2 = -0.7;
ycoord3 = ycoord2;
ycoord4 = ycoord3 - dist_y;
ycoord5 = ycoord4 - dist_y;

// Vectores de localización para los atributos
locAtt = [
    [xcoord1, ycoord2],
    [xcoord1, ycoord3],
    [xcoord1, ycoord4],
    [xcoord1, ycoord5]
];

// Asignar posiciones a los atributos seleccionados
element_to_position = new Map();
let position_iter_index = 0;
for (const el of Attributes) {
    if (position_iter_index < locAtt.length) {
        element_to_position.set(el, locAtt[position_iter_index]);
        position_iter_index++;
    }
}

function armMouseIfReleased(mouse, nowT) {
  // require: (i) a short delay since routine start, AND (ii) all buttons released
  const b = mouse.getPressed();
  if (!mouseArmed && (nowT - routineStartT) >= clickArmDelay && b[0] === 0 && b[1] === 0 && b[2] === 0) {
    mouseArmed = true;
  }
  return b;
}

function justLeftPressed(curr, prev) {
  return curr[0] === 1 && prev[0] === 0;  // rising edge on left button
}

// Crear el array final de localizaciones
locations = [];
for (const item of AllAttributes) {
    if (element_to_position.has(item)) {
        locations.push(element_to_position.get(item));
    } else {
        locations.push([2, 2]); // Posición fuera de la pantalla para ocultar
    }
}

// Parámetros de tamaño
xsizeimg = 0.5;
ysizeimg = 1.2;
xsizele = 0.3;
ysizele = 0.2;
xsizela = 0.3;
ysizela = 0.2;
letterheight = 0.05;

// Extras para la posición
factorxpos = 0.025;
factorypos = -0.05;

// Función para barajar arrays (equivalente a shuffle de numpy)
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}
// ------------------------------------

//CameraLive
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
// --- Lighting check config ---
const LUM_OK_LOW  = 85;   // tweak: 0..255
const LUM_OK_HIGH = 180;  // tweak: 0..255

let lastLum = NaN;
let lastLightingOK = null;
var lightingTxt, eyesIn;
//end average luminosity

//memorycode
function getPerformanceMemory() {
  // Check if the performance.memory API is available in the user's browser.
  if (window.performance && window.performance.memory) {
    const memoryInfo = window.performance.memory;
    
    // Calculate usage in Megabytes (MB) and format to 2 decimal places.
    const usedHeapMB = (memoryInfo.usedJSHeapSize / 1024 / 1024).toFixed(2);
    const totalHeapMB = (memoryInfo.totalJSHeapSize / 1024 / 1024).toFixed(2);
    
    // Return the values in an array [used, total].
    return [usedHeapMB, totalHeapMB];
  } else {
    // If the API is not supported, return placeholder values.
    return [-1, -1];
  }
}
//endmemorycode



//Better Webgazer
// Function to normalize gaze
function pagePxToNorm(x_px, y_px) {
  const canvas = psychoJS.window._renderer.view;        // HTMLCanvasElement
  const r = canvas.getBoundingClientRect();             // page CSS px
  if (!Number.isFinite(x_px) || !Number.isFinite(y_px)) return [NaN, NaN];

  // 0..1 within canvas
  const u = (x_px - r.left) / r.width;
  const v = (y_px - r.top)  / r.height;

  // -> [-1,1] “norm”, flip Y so up is +
  return [u * 2 - 1, -(v * 2 - 1)];
}

class GazeSmoother {
  constructor(n = 9, maxVelPxPerSec = 7000) {
    this.n = n; this.buf = []; this.t = []; this.prev = null; this.maxV = maxVelPxPerSec;
  }
  push(x, y, tSec) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) return;
    if (this.prev) {
      const dt = Math.max(1e-3, tSec - this.prev.t);
      const v = Math.hypot(x - this.prev.x, y - this.prev.y) / dt;
      if (v > this.maxV) return; // reject spikes (blinks/head bumps)
    }
    this.prev = {x, y, t: tSec};
    this.buf.push([x, y]); this.t.push(tSec);
    if (this.buf.length > this.n) { this.buf.shift(); this.t.shift(); }
  }
  median() {
    if (!this.buf.length) return [NaN, NaN];
    const xs = this.buf.map(p=>p[0]).sort((a,b)=>a-b);
    const ys = this.buf.map(p=>p[1]).sort((a,b)=>a-b);
    const k = Math.floor(xs.length/2);
    const mx = xs.length%2 ? xs[k] : 0.5*(xs[k-1]+xs[k]);
    const my = ys.length%2 ? ys[k] : 0.5*(ys[k-1]+ys[k]);
    return [mx, my];
  }
}

let gazeSmoother = null;
let driftOffset = [0, 0];
//ENd better Webgazer
var calibrationClick_mouseClock;

//Surveyscode
//survey functions
// Helpers (place after `const psychoJS = new PsychoJS({...})`)
function makeButtonRect(name, pos, size=[0.5,0.12], colors={fill:'white', line:'black'}) {
  return new visual.Rect({
    win: psychoJS.window, name, pos, width:size[0], height:size[1],
    lineWidth: 2,
    lineColor: new util.Color(colors.line),
    fillColor: new util.Color(colors.fill),
    opacity: 1, interpolate: true
  });
}

function makeText(
  name, text, pos, height=0.05, wrap=1.2, color='black', anchor='center'
) {
  return new visual.TextStim({
    win: psychoJS.window,
    name,
    text,
    pos,
    height,
    wrapWidth: wrap,
    color: new util.Color(color),
    anchor,                // e.g., 'center', 'left', etc.
    font: 'Open Sans'
  });
}
//ROW FUNCTION
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



// ==== New surveys (globals) ====
var si1Clock, si1Mouse;
var si1Q1Lbl, si1Q2Lbl, si1Q3Lbl;
var si1Q1=[], si1Q2=[], si1Q3=[];
var si1_age=null, si1_edu=null, si1_income=null;

var si2Clock, si2Mouse;
var si2Q1Lbl, si2Q2Lbl, si2Q3Lbl, si2Q4Lbl, si2Q5Lbl, si2Q6Lbl;
var si2Q1=[], si2Q2=[], si2Q3=[], si2Q4=[], si2Q5=[], si2Q6=[];
var si2_freq=null, si2_same=null, si2_many=null, si2_selfshop=null, si2_time=null, si2_like=null;

var sfinClock, sfinMouse;
var sfinQ1Lbl, sfinQ2Lbl, sfinQ3Lbl, sfinQ4Lbl, sfinQ5Lbl, sfinQ6Lbl, sfinQ7Lbl;
var sfinQ1=[], sfinQ2=[], sfinQ3=[], sfinQ4=[], sfinQ5=[], sfinQ6=[], sfinQ7=[];
var sfin_mostExp=null, sfin_memScale=null, sfin_helpStart=null, sfin_helpMid=null, sfin_helpEnd=null, sfin_keyAttr=null, sfin_valueMore=null;
var si1ContinueEnabled, si2ContinueEnabled, sfinContinueEnabled;

// Shared scale for SurveyIntro2
const rangefreq = ['Always','Usually','About half\nthe time','Sometimes','Rarely','Never'];


//End Surveyscode

// init psychoJS:
const psychoJS = new PsychoJS({
  debug: true
});

// open window:
psychoJS.openWindow({
  fullscr: true,
  color: new util.Color([0.93, 0.95, 0.98]),
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
psychoJS.scheduleCondition(() => (psychoJS.gui.dialogComponent.button === 'OK'), flowScheduler, dialogCancelScheduler);

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





flowScheduler.add(IntroRoutineBegin());
flowScheduler.add(IntroRoutineEachFrame());
flowScheduler.add(IntroRoutineEnd());
flowScheduler.add(Blank2RoutineBegin());
flowScheduler.add(Blank2RoutineEachFrame());
flowScheduler.add(Blank2RoutineEnd());

let trialsLoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trialsLoopBegin(trialsLoopScheduler));
flowScheduler.add(trialsLoopScheduler);
flowScheduler.add(trialsLoopEnd);

let trials_3LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_3LoopBegin(trials_3LoopScheduler));
flowScheduler.add(trials_3LoopScheduler);
flowScheduler.add(trials_3LoopEnd);

flowScheduler.add(Blank2RoutineBegin());
flowScheduler.add(Blank2RoutineEachFrame());
flowScheduler.add(Blank2RoutineEnd());

let trials_2LoopScheduler = new Scheduler(psychoJS);
flowScheduler.add(trials_2LoopBegin(trials_2LoopScheduler));
flowScheduler.add(trials_2LoopScheduler);
flowScheduler.add(trials_2LoopEnd);

//surveyfinal
flowScheduler.add(surveyFinaleBegin());
flowScheduler.add(surveyFinaleEachFrame());
flowScheduler.add(surveyFinaleEnd());
flowScheduler.add(surveyIntro2Begin());
flowScheduler.add(surveyIntro2EachFrame());
flowScheduler.add(surveyIntro2End());
flowScheduler.add(surveyIntro1Begin());
flowScheduler.add(surveyIntro1EachFrame());
flowScheduler.add(surveyIntro1End());

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
    { 'name': 'FondecytValues.csv', 'path': 'FondecytValues.csv' },
    { 'name': 'FondecytValuesR.csv', 'path': 'FondecytValuesR.csv' },
    { 'name': 'Colas/StartButton.png', 'path': 'Colas/StartButton.png' },
    { 'name': 'Colas/ContinueButton.png', 'path': 'Colas/ContinueButton.png' },
    { 'name': 'Colas/FinishButton.png', 'path': 'Colas/FinishButton.png' },
    { 'name': 'Freezer/freezer.png', 'path': 'Freezer/freezer.png' },
    { 'name': 'Freezer/pricetag.png', 'path': 'Freezer/pricetag.png' },
    { 'name': 'Freezer/doorright.png', 'path': 'Freezer/doorright.png' },
    { 'name': 'Freezer/doorleft.png', 'path': 'Freezer/doorleft.png' },
    { 'name': 'Colas/Colalola.png', 'path': 'Colas/Colalola.png' },
    { 'name': 'Colas/Haphy.png', 'path': 'Colas/Haphy.png' },
    { 'name': 'Colas/Mohshom.png', 'path': 'Colas/Mohshom.png' },
    { 'name': 'Colas/Toto.png', 'path': 'Colas/Toto.png' },
    { 'name': 'default.png', 'path': 'Colas/default.png' },
    {'name': 'calibration_trials.xlsx', 'path': 'calibration_trials.xlsx'},
    {'name': 'webgazer-2.0.1.tp.js', 'path': 'webgazer-2.0.1.tp.js'},
    {'name': 'blazeface/model.json',       'path': 'blazeface/model.json' },
    {'name': 'blazeface/group1-shard1of1', 'path': 'blazeface/group1-shard1of1' }
  ]
});

psychoJS.experimentLogger.setLevel(core.Logger.ServerLevel.EXP);

async function updateInfo() {
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
    psychoJS.experiment.dataFileName = `data/${expInfo["participant"]}_${expName}_${expInfo["date"]}`;
    return Scheduler.Event.NEXT;
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
var ieyMouse, ieyStatusTxt;

async function experimentInit() {
    globalClock = new util.Clock();
    routineTimer = new util.CountdownTimer();

    //better webgazer
    gazeSmoother = new GazeSmoother(9, 7000);

    initializeEyetrackingClock = new util.Clock();
    let averagingWindow = 10;
    window.xGazes = new Array(averagingWindow).fill(0);
    window.yGazes = new Array(averagingWindow).fill(0);
    webcamWarning = new visual.TextStim({
        win: psychoJS.window, name: 'webcamWarning',
        text: 'Before we start:\n- This study uses eye tracking via your webcam. When prompted, allow camera access.\n- Switch to full screen (Windows: F11; Mac: Ctrl+⌘+F; some laptops: Fn+F11).\n- Center your face in the green box and keep it steady. Use even, front-facing light; avoid bright windows behind you. It\'s important that you feel relaxed during the experiment.\n- For best performance: plug in power, close other apps, and close extra tabs (especially those playing video/animations).\n- Do not press Esc in this section, use the on-screen buttons to navigate.\nWarning:\nIf the camera disconnects at any point, the recording becomes unreliable and your data may be invalid. Please make sure your webcam stays connected, visible throughout and not covered.\nCamera & start:\n- The Continue button enables once the camera is detected, your face is centered and the ilumination is okay. Click Continue to begin.',
        font: 'Open Sans', units: undefined, pos: [0, 0.2], height: 0.05, wrapWidth: undefined, ori: 0.0,
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
        font: 'Open Sans', units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
        color: new util.Color('black'), opacity: undefined, depth: -1.0
    });
    inst1_resp = new core.Keyboard({ psychoJS: psychoJS, clock: new util.Clock(), waitForStart: true });
    calibrationIntroClock = new util.Clock();
    calibrationTxt = new visual.TextStim({
        win: psychoJS.window, name: 'calibrationTxt',
        text: "First we need to calibrate the eye tracker. Please try to keep your head still during the calibration and the experiment.\nCircles will appear at different locations on the screen. Please click each circle with your mouse as you 're looking at them.\nClick anywhere with the mouse to continue...",
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

    // --- Initialize components for Routine "Intro" ---
    IntroClock = new util.Clock();
    Intro = new visual.TextStim({ win: psychoJS.window, name: 'Intro', text: "You are buying a soda into a supermarket. You'll have to choose between two products for each task.", font: 'Open Sans', pos: [0, 0.7], height: 0.05, color: 'black', depth: 0.0 });
    Attributes_ = new visual.TextStim({ win: psychoJS.window, name: 'Attributes_', text: "The Attributes are:\nPrice: The product's price (in $USD).//\nAll sodas are the same and only differ in price.\n Select the CHEAPEST one.\nAfter making your choice, please look at the center of the screen.", font: 'Open Sans', pos: [0, 0.3], height: 0.05, color: 'black', depth: -1.0 });

    ButtonIntro_ = new visual.TextStim({ win: psychoJS.window, name: 'ButtonIntro_', text: 'To start, press the button down below.', font: 'Open Sans', pos: [0, 0], height: 0.05, color: 'black', depth: -2.0 });
    StartButton = new visual.ImageStim({ win: psychoJS.window, name: 'StartButton', image: 'Colas/StartButton.png', pos: [0, -0.3], size: [0.25, 0.1], depth: -3.0 });
    ContinueButton = new visual.ImageStim({ win: psychoJS.window, name: 'ContinueButton', image: 'Colas/ContinueButton.png', pos: [0, -0.3], size: [0.25, 0.1], depth: -3.0 });
    FinishButton = new visual.ImageStim({ win: psychoJS.window, name: 'FinishButton', image: 'Colas/FinishButton.png', pos: [0, -0.3], size: [0.25, 0.1], depth: -3.0 });
    mouse_2 = new core.Mouse({ win: psychoJS.window });
    mouse_2.mouseClock = new util.Clock();

    // --- Initialize components for Routine "Blank2" ---
    Blank2Clock = new util.Clock();
    Starting_title = new visual.TextStim({ win: psychoJS.window, name: 'Starting_title', text: 'Starting in...', font: 'Open Sans', pos: [0, 0.25], height: 0.05, color: 'black' });
    One_title = new visual.TextStim({ win: psychoJS.window, name: 'One_title', text: '1', font: 'Open Sans', pos: [0, 0], height: 0.05, color: 'black' });
    Two_title = new visual.TextStim({ win: psychoJS.window, name: 'Two_title', text: '2', font: 'Open Sans', pos: [0, 0], height: 0.05, color: 'black' });
    Three_title = new visual.TextStim({ win: psychoJS.window, name: 'Three_title', text: '3', font: 'Open Sans', pos: [0, 0], height: 0.05, color: 'black' });

    // --- Initialize components for Routine "trial" ---
    trialClock = new util.Clock();
    FreezerBG = new visual.ImageStim({ win: psychoJS.window, name: 'FreezerBG', image: 'Freezer/freezer.png', pos: [0, 0], size: [2, 2] });
    PriceTag = new visual.ImageStim({ win: psychoJS.window, name: 'PriceTag', image: 'Freezer/pricetag.png', pos: [0, -0.6375], size: [1.8, 0.3] });
    DoorRight = new visual.ImageStim({ win: psychoJS.window, name: 'DoorRight', image: 'Freezer/doorright.png', pos: [0.925, 0], size: [0.2, 2] });
    DoorLeft = new visual.ImageStim({ win: psychoJS.window, name: 'DoorLeft', image: 'Freezer/doorleft.png', pos: [-0.925, 0], size: [0.2, 2] });
    ImageProd1 = new visual.ImageStim({ win: psychoJS.window, name: 'ImageProd1', image: 'default.png', mask: undefined, pos: [xcoord2, ycoord1], size: [xsizeimg, ysizeimg], color : new util.Color([1,1,1]), opacity : undefined, flipHoriz : false,flipVert : false, texRes : 128.0, interpolate : true, depth : -4.0 });
    ImageProd2 = new visual.ImageStim({ win: psychoJS.window, name: 'ImageProd2', image: 'default.png', mask: undefined, pos: [xcoord3, ycoord1], size: [xsizeimg, ysizeimg], color : new util.Color([1,1,1]), opacity : undefined, flipHoriz : false,flipVert : false, texRes : 128.0, interpolate : true, depth : -4.0  });
    
    // Labels de Atributos
    Price_Label1 = new visual.TextBox({ win: psychoJS.window, name: 'Price_Label1', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });
    Price_Label2 = new visual.TextBox({ win: psychoJS.window, name: 'Price_Label2', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });
    Sugar_Label1 = new visual.TextBox({ win: psychoJS.window, name: 'Sugar_Label1', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });
    Sugar_Label2 = new visual.TextBox({ win: psychoJS.window, name: 'Sugar_Label2', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });
    Quality_Label = new visual.TextBox({ win: psychoJS.window, name: 'Quality_Label', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });
    Brand_Rep_Label = new visual.TextBox({ win: psychoJS.window, name: 'Brand_Rep_Label', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizela, ysizela], color: 'black', editable: false });

    // Valores de Atributos
    Price1 = new visual.TextBox({ win: psychoJS.window, name: 'Price1', text: '', font: 'Open Sans', letterHeight: letterheight, size: [xsizele, ysizele], color: 'black', editable: false });
    Sugar1 = new visual.TextBox({ win: psychoJS.window, name: 'Sugar1', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    Quality1 = new visual.TextBox({ win: psychoJS.window, name: 'Quality1', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    Brand_Rep1 = new visual.TextBox({ win: psychoJS.window, name: 'Brand_Rep1', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    Price2 = new visual.TextBox({ win: psychoJS.window, name: 'Price2', text: '', font: 'Open Sans', letterHeight: letterheight, size: [xsizele, ysizele], color: 'black', editable: false });
    Sugar2 = new visual.TextBox({ win: psychoJS.window, name: 'Sugar2', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    Quality2 = new visual.TextBox({ win: psychoJS.window, name: 'Quality2', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    Brand_Rep2 = new visual.TextBox({ win: psychoJS.window, name: 'Brand_Rep2', text: '', font: 'Open Sans', letterHeight: 0.05, size: [xsizele, ysizele], color: 'black', editable: false });
    
    blankClock = new util.Clock();
    text_blank = new visual.TextStim({
      win: psychoJS.window, name: 'text_blank', text: '', font: 'Open Sans',
      units: undefined, pos: [0, 0], height: 0.05, wrapWidth: undefined, ori: 0.0,
      languageStyle: 'LTR', color: new util.Color('black'), opacity: undefined, depth: 0.0
    });


    mouse = new core.Mouse({ win: psychoJS.window });
    mouse.mouseClock = new util.Clock();
    
    // --- Initialize components for Routine "blank" ---
    blankClock = new util.Clock();
    TextB = new visual.TextStim({ win: psychoJS.window, name: 'TextB', text: '', font: 'Open Sans', pos: [0, 0], height: 0.05, color: 'black' });
    
    // --- Initialize components for Routine "favorites" ---
    favoritesClock = new util.Clock();
    FreezerBK = new visual.ImageStim({ win: psychoJS.window, name: 'FreezerBK', image: 'Freezer/freezer.png', pos: [0, 0], size: [2, 2] });
    DoorR = new visual.ImageStim({ win: psychoJS.window, name: 'DoorR', image: 'Freezer/doorright.png', pos: [0.9, 0], size: [0.2, 2] });
    DoorL = new visual.ImageStim({ win: psychoJS.window, name: 'DoorL', image: 'Freezer/doorleft.png', pos: [-0.9, 0], size: [0.2, 2] });
    
    imagenes = ['Colas/Colalola.png', 'Colas/Haphy.png', 'Colas/Mohshom.png', 'Colas/Toto.png'];
    shuffle(imagenes);
    elecciones = [];
    psychoJS.experiment.extraInfo.imagenes = imagenes;
    psychoJS.experiment.extraInfo.elecciones = elecciones;
    
    mouse_3 = new core.Mouse({ win: psychoJS.window });
    mouse_3.mouseClock = new util.Clock();
    const chsizex = 0.3, chsizey = 0.8;
    image1 = new visual.ImageStim({ win: psychoJS.window, name: 'image1', image: undefined, size: [chsizex, chsizey] });
    image2 = new visual.ImageStim({ win: psychoJS.window, name: 'image2', image: undefined, size: [chsizex, chsizey] });
    image3 = new visual.ImageStim({ win: psychoJS.window, name: 'image3', image: undefined, size: [chsizex, chsizey] });
    image4 = new visual.ImageStim({ win: psychoJS.window, name: 'image4', image: undefined, size: [chsizex, chsizey] });
    image5 = new visual.ImageStim({ win: psychoJS.window, name: 'image5', image: undefined, size: [chsizex, chsizey] });
    textTop = new visual.TextStim({ win: psychoJS.window, name: 'textTop', text: '', font: 'Arial', pos: [0, 0.6], height: 0.05, color: 'black' });

    // --- Initialize components for Routine "End" ---
    EndClock = new util.Clock();
    Msg = new visual.TextBox({ win: psychoJS.window, name: 'Msg', text: 'Thanks for participating!CE95YNER', font: 'Open Sans', pos: [0, 0], letterHeight: 0.05, size: [0.8, 0.6], color: 'Gray', fillColor: 'white', borderColor: 'white' });
    


    //surveycode


    // ==== SurveyIntro1 components ====
    si1Clock   = new util.Clock();
    si1Mouse   = new core.Mouse({ win: psychoJS.window });
    var si1x0 = -0.5;
    si1Q1Lbl = makeText('si1Q1Lbl','My age is:', [si1x0, 0.50], 0.045, 1.2);
    si1Q2Lbl = makeText('si1Q2Lbl','Highest education\ncompleted:', [si1x0, 0.20], 0.045, 1.2);
    si1Q3Lbl = makeText('si1Q3Lbl','My approximate monthly\nhousehold income:', [si1x0, -0.10], 0.045, 1.2);

    si1Q1 = makeRowOptions('si1Q1', 0.50, ['18–30','31–40','41–50','51–60','61–70','71+'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.125});
    si1Q2 = makeRowOptions('si1Q2', 0.20, ['High school\nor below','College or\ntechnical\nschool',"Bachelor’s\ndegree","Master’s\ndegree",'Doctorate or\nprofessional'], {size: [0.2,0.21] , gap: 0.2 , x0: -0.1});
    si1Q3 = makeRowOptions('si1Q3', -0.1, ['Below\nUS$500','US$\n501–1,000','US$\n1,001–2,000','US$\n2,001–3,000','Over\nUS$3,000'], {size: [0.2,0.16] , gap: 0.2 , x0: -0.1});

    // ==== SurveyIntro2 components ====
    si2Clock   = new util.Clock();
    si2Mouse   = new core.Mouse({ win: psychoJS.window });
    var si2x0 = -0.5;
    si2Q1Lbl = makeText('si2Q1Lbl','How many times do you go\nto the supermarket in a month?', [si2x0, 0.75], 0.045, 1.2);
    si2Q2Lbl = makeText('si2Q2Lbl','Every time I go, I buy\nthe same products as before:', [si2x0, 0.50], 0.045, 1.2);
    si2Q3Lbl = makeText('si2Q3Lbl','Every time I go, I buy\nmany products:',               [si2x0, 0.25], 0.045, 1.2);
    si2Q4Lbl = makeText('si2Q4Lbl','When I go, I’m the one\nwho does the shopping:',       [si2x0, 0.00], 0.045, 1.2);
    si2Q5Lbl = makeText('si2Q5Lbl','How much time do you\nspend in the supermarket?',      [si2x0,-0.25], 0.045, 1.2);
    si2Q6Lbl = makeText('si2Q6Lbl','I like going to\nthe supermarket:',                     [si2x0,-0.50], 0.045, 1.2);

    si2Q1 = makeRowOptions('si2Q1', 0.75, ['More than\n5 times','2–4\ntimes','Once','Never'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});
    si2Q2 = makeRowOptions('si2Q2', 0.50, rangefreq, {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});
    si2Q3 = makeRowOptions('si2Q3', 0.25, rangefreq, {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});
    si2Q4 = makeRowOptions('si2Q4', 0.00, rangefreq, {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});
    si2Q5 = makeRowOptions('si2Q5',-0.25, ['More than\n60 min','30–60 min','Less than\n30 min'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});
    si2Q6 = makeRowOptions('si2Q6',-0.50, ['Yes','Neutral','No'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.1});

    // ==== SurveyFinale components ====
    sfinClock   = new util.Clock();
    sfinMouse   = new core.Mouse({ win: psychoJS.window });
    var sfix0 = -0.5;
    sfinQ1Lbl = makeText('sfinQ1Lbl','Which soda was\nthe most expensive?', [sfix0, 0.65], 0.045, 1.2);
    sfinQ2Lbl = makeText('sfinQ2Lbl','On a scale from 1 to 10, how\ngood do you think you are at memorizing?', [sfix0, 0.45], 0.045, 1.2);
    sfinQ3Lbl = makeText('sfinQ3Lbl','What helped you decide at\nthe start of the experiment?',  [sfix0, 0.25], 0.045, 1.2);
    sfinQ4Lbl = makeText('sfinQ4Lbl','What helped you decide in\nthe middle of the experiment?', [sfix0, 0.05], 0.045, 1.2);
    sfinQ5Lbl = makeText('sfinQ5Lbl','What helped you decide at\nthe end of the experiment?',    [sfix0,-0.15], 0.045, 1.2);
    sfinQ6Lbl = makeText('sfinQ6Lbl','If you had to choose one key attribute\nfor a product, which would it be?', [sfix0,-0.35], 0.045, 1.2);
    sfinQ7Lbl = makeText('sfinQ7Lbl','When you buy a product, do you value\nthe product itself more, or its price?', [sfix0,-0.55], 0.045, 1.2);

    sfinQ1 = makeRowOptions('sfinQ1', 0.65, ['Toto','Mohshom','Colalola','Haphy',"I don't\nremember"], {size: [0.2,0.16] , gap: 0.2 , x0: -0.1});
    sfinQ2 = makeRowOptions('sfinQ2', 0.45, ['1','2','3','4','5','6','7','8','9','10'], {size: [0.1,0.1] , gap: 0.1 , x0: -0.15});
    sfinQ3 = makeRowOptions('sfinQ3', 0.25, ['Color of\nthe drink','Name of\nthe drink','Price','All of\nthem'], {size: [0.2,0.16] , gap: 0.2 , x0: -0.1});
    sfinQ4 = makeRowOptions('sfinQ4', 0.05, ['Color of\nthe drink','Name of\nthe drink','Price','All of\nthem'], {size: [0.2,0.16] , gap: 0.2 , x0: -0.1});
    sfinQ5 = makeRowOptions('sfinQ5',-0.15, ['Color of\nthe drink','Name of\nthe drink','Price','All of\nthem'], {size: [0.2,0.16] , gap: 0.2 , x0: -0.1});
    sfinQ6 = makeRowOptions('sfinQ6',-0.35, ['Price','Brand','Quality','Quantity','Comfort','Taste'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.125});
    sfinQ7 = makeRowOptions('sfinQ7',-0.55, ['The\nproduct','The\nprice'], {size: [0.15,0.16] , gap: 0.15 , x0: -0.125});


    //Endsurveycode

    //luminosity code
    lightingTxt = new visual.TextStim({
      win: psychoJS.window,
      name: 'lightingTxt',
      text: '',                      // will be set live
      font: 'Open Sans',
      pos: [0, -0.85],               // adjust where you want it
      height: 0.035,
      color: new util.Color('white') // default before first reading
    });

    return Scheduler.Event.NEXT;
}

//old text: 'This experiment uses eye tracking. You should see your web browser request access to your webcam. You might need to click on this text to trigger the request. Please permit access, and wait a moment for the system to set up. Additionally, for the best experience, the experiment must be conducted in fullscreen mode.\nTo do this, press Fn + F11 on your keyboard. This will maximize the window and ensure the experiment runs smoothly.\nPlease, center your face inside the green square and keep it there.It\'s important that you feel relaxed throughout this process.\nAlso, we suggest using a well-lit environment with front-facing, even lighting; avoid bright windows behind you. Clear eye visibility improves tracking accuracy.\nIf the camera disconnects at any point, the recording becomes unreliable and your data may be invalid. Please make sure your webcam stays connected, visible throughout and not covered.\nLastly, Our experiment uses real-time webcam processing for eye-tracking, which can be demanding on your computer. For the most accurate results and a smooth experience, we highly recommend: Closing other programs (e.g., Spotify, Word, Excel, Steam); Closing any unnecessary browser tabs, especially those with videos or animations; Ensuring your laptop/PC is plugged into a power source. This helps us collect high-quality data and ensures you can complete the experiment without technical issues.\nIf all conditions are met, press the button to continue.',

// --- EYETRACKING ROUTINES (initializeEyetracking, inst1, calibrationIntro, calibration, trackingTrial) ---
// These routines remain unchanged.

var initializeEyetrackingComponents, ieyClicked, _ieyPrev;

function initializeEyetrackingRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot); // ensure that .thisN vals are up to date
    StartTimeRoutine = globalClock.getTime();
    //------Prepare to start Routine 'initializeEyetracking'-------
    initializeEyetrackingClock.reset(); // clock
    frameN = -1;
    continueRoutine = true; // until we're told otherwise
    // update component parameters for each repeat
    window.webgazer.params.showVideoPreview = true; //true
    webgazer.params.showVideo        = true; //false
    window.webgazer.params.showFaceFeedbackBox = true;
    window.webgazer.params.showFaceOverlay = true;
    window.webgazer.params.showGazeDot = false;
    //webgazer.setTracker('clmtrackr'); //headposition marks

    window.webgazer
      .setGazeListener(function(data, clock) {
        if (data !== null) {
          window.xGazes.shift(); window.xGazes.push(data.x);
          window.yGazes.shift(); window.yGazes.push(data.y);
        }
      });



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


    const canvasscreen = psychoJS.window.size;
    psychoJS.experiment.addData('ScreenRes_pixels', [ canvasscreen[0] , canvasscreen[1] ] );
    setTimeout(() => {
        const videoElement = document.querySelector('video'); 
        if (videoElement) {
            const videoWidth = videoElement.videoWidth;
            const videoHeight = videoElement.videoHeight;
            psychoJS.experiment.addData('Camera_pixels', [videoWidth, videoHeight] );
        } else {
            psychoJS.experiment.addData('Camera_pixels', [-1, -1] );
        }
    }, 1000);
    
    initializeEyetrackingComponents = [webcamWarning, ContinueButton, ieyStatusTxt, ieyMouse, lightingTxt];
    //initializeEyetrackingComponents.push(webcamWarning);
    
    // reset states
    ieyMouse.status = PsychoJS.Status.NOT_STARTED;
    ieyClicked = false;
    
    for (const thisComponent of initializeEyetrackingComponents){
      if ('status' in thisComponent) {
        thisComponent.status = PsychoJS.Status.NOT_STARTED;
      }
    }
    return Scheduler.Event.NEXT;
  }
}


function initializeEyetrackingRoutineEachFrame() {
  return async function () {
    t = initializeEyetrackingClock.getTime();
    frameN = frameN + 1;

    const eyesIn = webgazer.checkEyesInValidationBox && webgazer.checkEyesInValidationBox();

    // Camera readiness
    const camOK = isCameraLive();

    // Show/draw UI once
    [webcamWarning, ContinueButton, ieyStatusTxt].forEach(c => {
      if (c.status === PsychoJS.Status.NOT_STARTED) c.setAutoDraw(true);
    });

    // Hover affordance + “disabled” look until camera is OK
    setCursor('default');
    updateHover(ContinueButton, ieyMouse)
    ContinueButton.opacity = camOK ? 1.0 : 0.4;
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
        if (btns.reduce((a,b)=>a+b)>0 && camOK && ContinueButton.contains(ieyMouse)) {
          ieyClicked = true;
        }
      }
    }

      //luminosity
    // ... inside initializeEyetrackingRoutineEachFrame() ...
    if (t >= 0.0 && lightingTxt.status === PsychoJS.Status.NOT_STARTED) {
      lightingTxt.tStart = t;
      lightingTxt.frameNStart = frameN;
      lightingTxt.setAutoDraw(true);
    }

    // Sample every ~5 frames (~4–5x/sec at 20 FPS)
    if (frameN % 5 === 0) {
      const videoEl = document.getElementById('webgazerVideoFeed');
      if (videoEl && videoEl.videoWidth > 0 && videoEl.videoHeight > 0) {
        const lum = getAverageLuminance(videoEl);          // 0..255
        lastLum = lum;
        const ok = (lum >= LUM_OK_LOW && lum <= LUM_OK_HIGH);
        lastLightingOK = ok;

        // Choose label + color
        const label = ok ? 'Lighting OK'
                        : (lum < LUM_OK_LOW ? 'Pretty dark' : 'Over illuminated');

        lightingTxt.setText(`${label}`);
        //lightingTxt.setText(`${label} (avg ${lum.toFixed(0)})`);
        lightingTxt.setColor(new util.Color(ok ? 'green' : 'red'));
      } else {
        lightingTxt.setText('Checking lighting…');
        lightingTxt.setColor(new util.Color('white'));
      }
    }
    //end luminosity


    // Only leave when camera is OK *and* participant clicked Continue
    continueRoutine = !( camOK && ieyClicked && eyesIn && lastLightingOK );


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
    for(const c of initializeEyetrackingComponents) if(typeof c.setAutoDraw==='function') c.setAutoDraw(false);
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.addData('TypeTrial', 'InitializeCamera');
    psychoJS.experiment.addData('LightingOK_initial', lastLightingOK === true);
    psychoJS.experiment.addData('LightingAvg_initial', Number.isFinite(lastLum) ? lastLum : -1);
    for (const c of [webcamWarning, ContinueButton, ieyStatusTxt]) {
      if (typeof c.setAutoDraw === 'function') c.setAutoDraw(false);
    }
    routineTimer.reset();
    psychoJS.experiment.nextEntry(); 
    return Scheduler.Event.NEXT;
  };
}


var _inst1_resp_allKeys;
var inst1Components;
function inst1RoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);    
    StartTimeRoutine = globalClock.getTime();
    webgazer.params.showVideo        = false; //newlinewebgazer
    document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
    document.getElementById('webgazerVideoFeed').style.display = 'none';
    inst1Clock.reset(); 
    frameN = -1;
    continueRoutine = true; 
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
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.addData('TypeTrial', 'Warning');
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
    psychoJS.experiment.nextEntry(); 
    return Scheduler.Event.NEXT;
  };
}

var calibrationIntroComponents;

function calibrationIntroRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    StartTimeRoutine = globalClock.getTime();
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
    psychoJS.experiment.addData('TypeTrial', 'CalibrationIntro');
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.nextEntry(); 
    routineTimer.reset();
    return Scheduler.Event.NEXT;
  };
}

var trialsc;
function trialscalLoopBegin(trialscalLoopScheduler, snapshot) {
  return async function() {
    StartTimeRoutine = globalClock.getTime();
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
    trialscalLoopScheduler.add(blankRoutineBegin());
    trialscalLoopScheduler.add(blankRoutineEachFrame());
    trialscalLoopScheduler.add(blankRoutineEnd());
    return Scheduler.Event.NEXT;
  }
}

async function trialscalLoopEnd() {
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);
  psychoJS.experiment.removeLoop(trialsc);
  psychoJS.experiment.nextEntry(); 
  return Scheduler.Event.NEXT;
}

var callib_color;
var calibrationComponents;

function calibrationRoutineBegin(snapshot) {
  return async function () {
    psychoJS.experiment.nextEntry();
    TrialHandler.fromSnapshot(snapshot); 
    StartTimeRoutine = globalClock.getTime();
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
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.addData('calibrationClick.x', _mouseXYs[0]);
    psychoJS.experiment.addData('calibrationClick.y', _mouseXYs[1]);
    psychoJS.experiment.addData('calibrationClick.leftButton', _mouseButtons[0]);
    psychoJS.experiment.addData('calibrationClick.midButton', _mouseButtons[1]);
    psychoJS.experiment.addData('calibrationClick.rightButton', _mouseButtons[2]);
    psychoJS.experiment.addData('TypeTrial', "calibration");
    if (calibrationClick.clicked_name.length > 0) {
      psychoJS.experiment.addData('calibrationClick.clicked_name', calibrationClick.clicked_name[0]);}
    psychoJS.experiment.nextEntry(); 
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


var MOUSEGAZE, ETGAZENF, ETGAZExT, ETGAZENEWT, ETGAZENEWTINS;

function IntroRoutineBegin(snapshot) {
    return async () => {
        t = 0; IntroClock.reset(); frameN = -1; continueRoutine = true;
        StartTimeRoutine = globalClock.getTime();
        mouse_2.x = []; mouse_2.y = []; mouse_2.leftButton = []; mouse_2.midButton = []; mouse_2.rightButton = [];
        mouse_2.time = []; mouse_2.clicked_name = []; gotValidClick = false;
        clicked_things1 = []; clickables1 = [StartButton]; waiting1 = false;

        IntroComponents = [Intro, Attributes_, ButtonIntro_, StartButton, mouse_2];
        for (const c of IntroComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
        return Scheduler.Event.NEXT;
    };
}

function IntroRoutineEachFrame() {
    return async () => {
        t = IntroClock.getTime(); frameN++;

        setCursor('default');    // reset each frame

        updateHover(StartButton, mouse_2);

        for (const c of IntroComponents) if (c.status === PsychoJS.Status.NOT_STARTED) { c.tStart = t; c.frameNStart = frameN; if(c.setAutoDraw) c.setAutoDraw(true); }
        if (mouse_2.status === PsychoJS.Status.NOT_STARTED) { mouse_2.status = PsychoJS.Status.STARTED; mouse_2.mouseClock.reset(); }
        

        if (mouse_2.getPressed()[0] === 1 && !waiting1) {
            if (StartButton.contains(mouse_2)) {
                waiting1 = true;
                continueRoutine = false;
            }
        }

        
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) return quitPsychoJS('Aborted', false);
        if (!continueRoutine) return Scheduler.Event.NEXT;
        
        let stillRunning = IntroComponents.some(c => c.status !== PsychoJS.Status.FINISHED);
        return stillRunning ? Scheduler.Event.FLIP_REPEAT : Scheduler.Event.NEXT;
    };
}

function IntroRoutineEnd(snapshot) {
  return async () => {
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.addData('TypeTrial', 'Intro');
    for (const c of IntroComponents) if (c.setAutoDraw) c.setAutoDraw(false);
    bebidas = ['Colalola', 'Toto', 'Mohshom', 'Haphy'];
    shuffle(bebidas);
    console.log("Shuffled drinks:", bebidas);
    routineTimer.reset();
    psychoJS.experiment.nextEntry(); 
    return Scheduler.Event.NEXT;
  };
}

function Blank2RoutineBegin(snapshot) {
    return async () => {
        t = 0; Blank2Clock.reset(); frameN = -1; continueRoutine = true; routineTimer.add(4.0);
        Blank2Components = [Starting_title, One_title, Two_title, Three_title];
        for (const c of Blank2Components) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
        return Scheduler.Event.NEXT;
    };
}

function Blank2RoutineEachFrame() {
    return async () => {
        t = Blank2Clock.getTime(); frameN++;
        if (t >= 0.0 && Starting_title.status === PsychoJS.Status.NOT_STARTED) Starting_title.setAutoDraw(true);
        if (t >= 4.0 && Starting_title.status === PsychoJS.Status.STARTED) Starting_title.setAutoDraw(false);
        if (t >= 3.0 && One_title.status === PsychoJS.Status.NOT_STARTED) One_title.setAutoDraw(true);
        if (t >= 4.0 && One_title.status === PsychoJS.Status.STARTED) One_title.setAutoDraw(false);
        if (t >= 2.0 && Two_title.status === PsychoJS.Status.NOT_STARTED) Two_title.setAutoDraw(true);
        if (t >= 3.0 && Two_title.status === PsychoJS.Status.STARTED) Two_title.setAutoDraw(false);
        if (t >= 1.0 && Three_title.status === PsychoJS.Status.NOT_STARTED) Three_title.setAutoDraw(true);
        if (t >= 2.0 && Three_title.status === PsychoJS.Status.STARTED) Three_title.setAutoDraw(false);

        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) return quitPsychoJS('Aborted', false);
        if (routineTimer.getTime() <= 0) continueRoutine = false;
        if (!continueRoutine) return Scheduler.Event.NEXT;
        
        return Scheduler.Event.FLIP_REPEAT;
    };
}

function Blank2RoutineEnd(snapshot) {
    return async () => {
        for (const c of Blank2Components) if (c.setAutoDraw) c.setAutoDraw(false);
        if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
        return Scheduler.Event.NEXT;
    };
}

function trialsLoopBegin(trialsLoopScheduler, snapshot) {
  return async () => {
    useRows = "0:12";
    trials = new TrialHandler({ psychoJS: psychoJS, nReps: 4, method: TrialHandler.Method.RANDOM, extraInfo: expInfo, trialList: TrialHandler.importConditions(psychoJS.serverManager, 'FondecytValues.csv', useRows), name: 'trials' }); //4
    psychoJS.experiment.addLoop(trials);
    currentLoop = trials;
    StartTimeRoutine = globalClock.getTime();

    for (const thisTrial of trials) {
      snapshot = trials.getSnapshot();
      trialsLoopScheduler.add(importConditions(snapshot));
      trialsLoopScheduler.add(trialRoutineBegin(snapshot));
      trialsLoopScheduler.add(trialRoutineEachFrame());
      trialsLoopScheduler.add(trialRoutineEnd(snapshot));
      trialsLoopScheduler.add(blankRoutineBegin(snapshot));
      trialsLoopScheduler.add(blankRoutineEachFrame());
      trialsLoopScheduler.add(blankRoutineEnd(snapshot));
      // Insert calibration every CALIB_EVERY, except after the very last trial
      TrialSoFar +=1;
      if (TrialSoFar % CALIB_EVERY === 0 ) {
        calibrationTxt.setText(
        "Quick check: we’re recalibrating the eye tracker.\n" +
        "Remember to keep your head still during the experiment.\n" +
        "Please click each dot as you look at it.\n" +
        "Click anywhere to continue."
        );
        trialsLoopScheduler.add(calibrationIntroRoutineBegin());
        trialsLoopScheduler.add(calibrationIntroRoutineEachFrame());
        trialsLoopScheduler.add(calibrationIntroRoutineEnd());
        const trialscalLoopScheduler = new Scheduler(psychoJS);
        trialsLoopScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
        trialsLoopScheduler.add(trialscalLoopScheduler);
        trialsLoopScheduler.add(trialscalLoopEnd);
        console.log('cal ended');
      }
      trialsLoopScheduler.add(trialsLoopEndIteration(trialsLoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
  };
}

async function trialsLoopEnd() {
  const trialDurationTotal = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDurationTotal);
  psychoJS.experiment.removeLoop(trials);
  currentLoop = psychoJS.experiment._unfinishedLoops.at(-1) || psychoJS.experiment;
  return Scheduler.Event.NEXT;
}

function trialsLoopEndIteration(scheduler, snapshot) {
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);
  return async () => {
    if (snapshot.finished) scheduler.stop();
    else psychoJS.experiment.nextEntry(snapshot);
    return Scheduler.Event.NEXT;
  };
}

function trials_3LoopBegin(trials_3LoopScheduler, snapshot) {
  return async () => {
    useRows = "0:12";
    trials_3 = new TrialHandler({ psychoJS: psychoJS, nReps: 4, method: TrialHandler.Method.RANDOM, extraInfo: expInfo, trialList: TrialHandler.importConditions(psychoJS.serverManager, 'FondecytValuesR.csv', useRows), name: 'trials_3' }); //4
    psychoJS.experiment.addLoop(trials_3);
    currentLoop = trials_3;
    for (const thisTrial_3 of trials_3) {
      snapshot = trials_3.getSnapshot();
      trials_3LoopScheduler.add(importConditions(snapshot));
      trials_3LoopScheduler.add(trialRoutineBegin(snapshot));
      trials_3LoopScheduler.add(trialRoutineEachFrame());
      trials_3LoopScheduler.add(trialRoutineEnd(snapshot));
      trials_3LoopScheduler.add(blankRoutineBegin(snapshot));
      trials_3LoopScheduler.add(blankRoutineEachFrame());
      // Insert calibration every CALIB_EVERY, except after the very last trial
      TrialSoFar +=1;
      if (TrialSoFar % CALIB_EVERY === 0 ) {
        calibrationTxt.setText(
        "Quick check: we’re recalibrating the eye tracker.\n" +
        "Remember to keep your head still during the experiment.\n" +
        "Please click each dot as you look at it.\n" +
        "Click anywhere to continue."
        );
        trials_3LoopScheduler.add(calibrationIntroRoutineBegin());
        trials_3LoopScheduler.add(calibrationIntroRoutineEachFrame());
        trials_3LoopScheduler.add(calibrationIntroRoutineEnd());
        const trialscalLoopScheduler = new Scheduler(psychoJS);
        trials_3LoopScheduler.add(trialscalLoopBegin(trialscalLoopScheduler));
        trials_3LoopScheduler.add(trialscalLoopScheduler);
        trials_3LoopScheduler.add(trialscalLoopEnd);
      }
      trials_3LoopScheduler.add(trials_3LoopEndIteration(trials_3LoopScheduler, snapshot));
    }
    return Scheduler.Event.NEXT;
  };
}

async function trials_3LoopEnd() {
    psychoJS.experiment.removeLoop(trials_3);
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1) || psychoJS.experiment;
    return Scheduler.Event.NEXT;
}

function trials_3LoopEndIteration(scheduler, snapshot) {
  return async () => {
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    if (snapshot.finished) scheduler.stop();
    else psychoJS.experiment.nextEntry(snapshot);
    return Scheduler.Event.NEXT;
  };
}

var memoryValuesinit;
function trialRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0; trialClock.reset(); frameN = -1; continueRoutine = true;
    
    product1 = bebidas[prodID1 - 1];
    product2 = bebidas[prodID2 - 1];
    alt1 = product1; alt2 = product2;

    MOUSEGAZE = []; ETGAZENF = []; ETGAZExT = [], ETGAZENEWT = [], ETGAZENEWTINS = [];
    ImgProd1 = `Colas/${product1}.png`;
    ImgProd2 = `Colas/${product2}.png`;
    ImageProd1.setImage(ImgProd1);
    ImageProd2.setImage(ImgProd2);

    console.log("Valores para debug setText prod1:", { product1_Price, product1_Sugar, product1_Quality, product1_Brand_Rep });
    console.log("Valores para debug setText prod2:", { product2_Price, product2_Sugar, product2_Quality, product2_Brand_Rep });

    // Labels
    Price_Label1.setPos([xcoord2, (locations[0][1] + 0.1)]);
    Price_Label1.setText('Price:');

    Price_Label2.setPos([xcoord3, (locations[0][1] + 0.1)]);
    Price_Label2.setText('Price:');

    Sugar_Label1.setPos([xcoord1 -0.3, locations[0][1] + 0.1]);
    Sugar_Label1.setText('Sugar level:');

    Sugar_Label2.setPos([xcoord1 + 0.7, locations[0][1] + 0.1]);
    Sugar_Label2.setText('Sugar level:');

    Quality_Label.setPos([xcoord1, locations[2][1]]);
    Quality_Label.setText('Quality');

    Brand_Rep_Label.setPos([xcoord1, locations[3][1]]);
    Brand_Rep_Label.setText('Brand_Rep\n(1-10)');

    // Valores del Producto 1
    Price1.setPos([xcoord2, locations[0][1]]);
    Price1.setText(product1_Price);

    Sugar1.setPos([xcoord2 + 0.2, locations[0][1]]);
    Sugar1.setText(product1_Sugar);

    Quality1.setPos([xcoord2, locations[2][1]]);
    Quality1.setText(product1_Quality);

    Brand_Rep1.setPos([xcoord2, locations[3][1]]);
    Brand_Rep1.setText(product1_Brand_Rep);

    // Valores del Producto 2
    Price2.setPos([xcoord3, locations[0][1]]);
    Price2.setText(product2_Price);

    Sugar2.setPos([xcoord3 + 0.2, locations[0][1]]);
    Sugar2.setText(product2_Sugar);

    Quality2.setPos([xcoord3, locations[2][1]]);
    Quality2.setText(product2_Quality);

    Brand_Rep2.setPos([xcoord3, locations[3][1]]);
    Brand_Rep2.setText(product2_Brand_Rep);

    mouse.x = []; mouse.y = []; mouse.leftButton = []; mouse.midButton = []; mouse.rightButton = [];
    mouse.time = []; mouse.clicked_name = []; gotValidClick = false;

    //resets mouse
    prevButtons   = [0,0,0];
    mouseArmed    = false;
    routineStartT = 0;

    waiting = false; choice = ''; choiceID = -1; clicked_things = [];
    clickables = [ImageProd1, ImageProd2];
    startTime = t; StartTimeRoutine = globalClock.getTime();

    //trialComponents = [FreezerBG, PriceTag, DoorRight, DoorLeft, ImageProd1, ImageProd2, Price_Label1, Price_Label2, Sugar_Label1, Sugar_Label2, Price1, Sugar1, Price2, Sugar2, mouse];

    trialComponents = [FreezerBG, PriceTag, DoorRight, DoorLeft, ImageProd1, ImageProd2, Price_Label1, Price_Label2, Price1, Price2, mouse];

    //trialComponents = [FreezerBG, PriceTag, DoorRight, DoorLeft, ImageProd1, ImageProd2, Price_Label1, Price_Label2, Sugar_Label1, Sugar_Label2, Quality_Label, Brand_Rep_Label, Price1, Sugar1, Quality1, Brand_Rep1, Price2, Sugar2, Quality2, Brand_Rep2, mouse];

    for (const c of trialComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
    memoryValuesinit = getPerformanceMemory()
    return Scheduler.Event.NEXT;
  }
}


function trialRoutineEachFrame() {
  return async function () {
    t = trialClock.getTime(); frameN++;

    if (routineStartT === 0) routineStartT = t;

    setCursor('default');    // reset each frame

    updateHover(ImageProd1, mouse);
    updateHover(ImageProd2, mouse);

    // Webgazer data collection
    MOUSEGAZE.push([mouse.getPos()[0], mouse.getPos()[1], t]);
    let x_gaze = util.sum(window.xGazes) / window.xGazes.length;
    let y_gaze = util.sum(window.yGazes) / window.yGazes.length;
    const xNorm = ( x_gaze - (psychoJS.window.size[0] / 2) ) / (psychoJS.window.size[0] / 2);
    const yNorm = - ( y_gaze - (psychoJS.window.size[1] / 2 ) ) / (psychoJS.window.size[1] / 2);
    ETGAZExT.push([xNorm, yNorm, t]);
    ETGAZENF.push([x_gaze, y_gaze,t]);


    //better webgazer
    const pred = await webgazer.getCurrentPrediction(); // page CSS px
    let xNormInst = NaN, yNormInst = NaN;
    if (pred && Number.isFinite(pred.x) && Number.isFinite(pred.y)) {
      gazeSmoother.push(pred.x, pred.y, t); // t is your trial time
      [xNormInst, yNormInst] = pagePxToNorm(pred.x, pred.y); //instant
    }
    const [mx, my] = gazeSmoother.median(); //simple median
    const [xNorm1, yNorm1] = pagePxToNorm(mx, my);

    // (optional) gate when face is out of box
    const eyesIn = webgazer.checkEyesInValidationBox && webgazer.checkEyesInValidationBox();
    const Gx = eyesIn ? xNorm1 - driftOffset[0] : NaN;
    const Gy = eyesIn ? yNorm1 - driftOffset[1] : NaN;
    ETGAZENEWT.push([Gx, Gy, t]);
    //Instant
    ETGAZENEWTINS.push([xNormInst, yNormInst, t]);
    //End better webgazer

    for (const c of trialComponents) if (c.status === PsychoJS.Status.NOT_STARTED && t >= 0.0) { c.tStart = t; c.frameNStart = frameN; if(c.setAutoDraw) c.setAutoDraw(true); }
    if (mouse.status === PsychoJS.Status.NOT_STARTED) { mouse.status = PsychoJS.Status.STARTED; mouse.mouseClock.reset(); startTime = t; }

    // ---- NEW: gate clicks until released, then detect rising edge
    const currButtons = armMouseIfReleased(mouse, t);
    const leftJustPressed = mouseArmed && justLeftPressed(currButtons, prevButtons);

    if (!waiting && leftJustPressed) {
      // use contains() with the rising-edge instead of isPressedIn (which triggers on holds)
      if (ImageProd1.contains(mouse)) {
        choice = alt1; choiceID = prodID1;
        mouse.clicked_name.push('ImageProd1');
        waiting = true;
      } else if (ImageProd2.contains(mouse)) {
        choice = alt2; choiceID = prodID2;
        mouse.clicked_name.push('ImageProd2');
        waiting = true;
      }
    }
    prevButtons = currButtons;
    // -------------------------------------

    //if (!waiting) { //better webgazer
    //    for (const clickable of clickables) {
    //        if (mouse.isPressedIn(clickable)) {
    //            if (clickable.name === 'ImageProd1') { choice = alt1; choiceID = prodID1; } 
    //            else { choice = alt2; choiceID = prodID2; }
    //            mouse.clicked_name.push(clickable.name);
    //            waiting = true; break;
    //        }
    //    }
    //}
    if (waiting && (t - startTime > mouse_delay)) continueRoutine = false;

    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) return quitPsychoJS('Aborted', false);
    if (!continueRoutine) return Scheduler.Event.NEXT;
    
    let stillRunning = trialComponents.some(c => c.status !== PsychoJS.Status.FINISHED);
    return stillRunning ? Scheduler.Event.FLIP_REPEAT : Scheduler.Event.NEXT;
  };
}

function trialRoutineEnd(snapshot) {
  return async function () {
    for (const c of trialComponents) if (c.setAutoDraw) c.setAutoDraw(false);
    
    const trialDuration = globalClock.getTime() - StartTimeRoutine;

    //webgazer
    psychoJS.experiment.addData('MOUSE_GAZE_trail', MOUSEGAZE);
    psychoJS.experiment.addData('ET_GAZE_x_T_trail', ETGAZExT);
    psychoJS.experiment.addData('ET_GAZE_RawPx_trail', ETGAZENF);
    //Better webgazer
    psychoJS.experiment.addData('ET_GAZE_new', ETGAZENEWT);
    psychoJS.experiment.addData('ET_GAZE_RAW', ETGAZENEWTINS);

    // Save locations of key elements
    psychoJS.experiment.addData('Loc_Image1_and_Size', [ImageProd1.pos[0], ImageProd1.pos[1], ImageProd1.size[0], ImageProd1.size[1]]);
    psychoJS.experiment.addData('Loc_Image2_and_Size', [ImageProd2.pos[0], ImageProd2.pos[1], ImageProd2.size[0], ImageProd2.size[1]]);
    psychoJS.experiment.addData('Loc_Price1_and_Size', [Price1.pos[0], Price1.pos[1], Price1.size[0], Price1.size[1] ] );
    psychoJS.experiment.addData('Loc_Price2_and_Size', [Price2.pos[0], Price2.pos[1], Price2.size[0], Price2.size[1] ] );
    psychoJS.experiment.addData('Price1', Price1.text );
    psychoJS.experiment.addData('Price2', Price2.text );

    psychoJS.experiment.addData('Choice', choice);
    psychoJS.experiment.addData('ChoiceID', choiceID);
    psychoJS.experiment.addData('Trial', nLoop);
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    psychoJS.experiment.addData('Alt1', product1);
    psychoJS.experiment.addData('AltID1', prodID1);
    psychoJS.experiment.addData('Alt2', product2);
    psychoJS.experiment.addData('AltID2', prodID2);
    psychoJS.experiment.addData('TypeTrial', 'Trial');
    psychoJS.experiment.addData('LightingOK_process', lastLightingOK === true);
    const videoEl = document.querySelector('video');
    const lumilumi = getAverageLuminance(videoEl);
    psychoJS.experiment.addData('LightingAvg_process', Number.isFinite(lumilumi) ? lumilumi : -1);
    psychoJS.experiment.addData('usedJSHeapSize_MB_init', memoryValuesinit[0]);
    psychoJS.experiment.addData('totalJSHeapSize_MB_init', memoryValuesinit[1]);
    const memoryValues = getPerformanceMemory();
    psychoJS.experiment.addData('usedJSHeapSize_MB_end', memoryValues[0]);
    psychoJS.experiment.addData('totalJSHeapSize_MB_end', memoryValues[1]);
    psychoJS.experiment.addData('VersionTrial', 'NonTrained');
    nLoop++;
    routineTimer.reset();
    if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
    return Scheduler.Event.NEXT;
  }
}

//END NEW CODE
const crossDelay     = 1;      // wait this long before showing the cross
const crossDuration  = 2;      // show the cross for this long
//BLANKCODE

// --- BLANK ROUTINE (INTER-TRIAL INTERVAL) ---
function blankRoutineBegin(snapshot) {
  return async function () {
    TrialHandler.fromSnapshot(snapshot);
    t = 0; blankClock.reset(); frameN = -1; continueRoutine = true;

    // Total routine length = delay + duration
    routineTimer.add(crossDelay + crossDuration);

    // Turn text_blank into a centered cross
    text_blank.setText('+');
    text_blank.setPos([0, 0]);     // center
    text_blank.setHeight(0.08);    // adjust size if needed
    // text_blank.setColor(new util.Color('white')); // optional

    blankComponents = [];
    blankComponents.push(text_blank);

    for (const thisComponent of blankComponents)
      if ('status' in thisComponent) thisComponent.status = PsychoJS.Status.NOT_STARTED;

    return Scheduler.Event.NEXT;
  }
}

function blankRoutineEachFrame() {
  return async function () {
    t = blankClock.getTime(); frameN = frameN + 1;
    

    // Start drawing the cross only after the delay
    if (t >= crossDelay && text_blank.status === PsychoJS.Status.NOT_STARTED) {
      text_blank.tStart = t; text_blank.frameNStart = frameN; text_blank.setAutoDraw(true);
    }

    // Stop after delay + duration
    frameRemains = crossDelay + crossDuration - psychoJS.window.monitorFramePeriod * 0.75;
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

function trials_2LoopBegin(trials_2LoopScheduler, snapshot) {
    return async () => {
        trials_2 = new TrialHandler({ psychoJS: psychoJS, nReps: 4, method: TrialHandler.Method.RANDOM, extraInfo: expInfo, name: 'trials_2' });
        psychoJS.experiment.addLoop(trials_2);
        currentLoop = trials_2;
        for (const thisTrial_2 of trials_2) {
            snapshot = trials_2.getSnapshot();
            trials_2LoopScheduler.add(importConditions(snapshot));
            trials_2LoopScheduler.add(favoritesRoutineBegin(snapshot));
            trials_2LoopScheduler.add(favoritesRoutineEachFrame());
            trials_2LoopScheduler.add(favoritesRoutineEnd(snapshot));
            trials_2LoopScheduler.add(blankRoutineBegin(snapshot));
            trials_2LoopScheduler.add(blankRoutineEachFrame());
            trials_2LoopScheduler.add(blankRoutineEnd(snapshot));
            trials_2LoopScheduler.add(trials_2LoopEndIteration(trials_2LoopScheduler, snapshot));
        }
        return Scheduler.Event.NEXT;
    };
}

async function trials_2LoopEnd() {
    psychoJS.experiment.removeLoop(trials_2);
    currentLoop = psychoJS.experiment._unfinishedLoops.at(-1) || psychoJS.experiment;
    return Scheduler.Event.NEXT;
}

function trials_2LoopEndIteration(scheduler, snapshot) {
    return async () => {
        if (snapshot.finished) scheduler.stop();
        else psychoJS.experiment.nextEntry(snapshot);
        return Scheduler.Event.NEXT;
    };
}

function favoritesRoutineBegin(snapshot) {
  return async () => {
    StartTimeRoutine = globalClock.getTime();
    t = 0; favoritesClock.reset(); frameN = -1; continueRoutine = true;
    let imagenes = psychoJS.experiment.extraInfo.imagenes;
    if (imagenes.length <= 1) continueRoutine = false;

    let elecciones = psychoJS.experiment.extraInfo.elecciones;
    n_elegidas = elecciones.length + 1;
    textTop.setText(`Select your favorite drink ${n_elegidas}`);
    
    stim_list = [image1, image2, image3, image4, image5];
    farpos = 0.6; closepos = farpos / 2;
    if (imagenes.length === 5) posiciones = [[-farpos, 0], [-closepos, 0], [0, 0], [closepos, 0], [farpos, 0]];
    else if (imagenes.length === 4) posiciones = [[-farpos, 0], [-closepos, 0], [closepos, 0], [farpos, 0]];
    else if (imagenes.length === 3) posiciones = [[-closepos, 0], [0, 0], [closepos, 0]];
    else if (imagenes.length === 2) posiciones = [[-closepos, 0], [closepos, 0]];
    
    for (const stim of stim_list) stim.setOpacity(0);
    for (let i = 0; i < imagenes.length; i++) {
      stim_list[i].setImage(imagenes[i]);
      stim_list[i].setPos(posiciones[i]);
      stim_list[i].setOpacity(1);
    }
    
    seleccion_hecha = false;
    mouse_3.x = []; mouse_3.y = []; mouse_3.leftButton = []; mouse_3.midButton = []; mouse_3.rightButton = []; mouse_3.time = [];

    favoritesComponents = [FreezerBK, DoorR, DoorL, mouse_3, image1, image2, image3, image4, image5, textTop];
    for (const c of favoritesComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  };
}

function favoritesRoutineEachFrame() {
  return async () => {
    t = favoritesClock.getTime(); frameN++;

    setCursor('default');    // reset each frame

    updateHover(image1, mouse_3);
    updateHover(image2, mouse_3);
    updateHover(image3, mouse_3);
    updateHover(image4, mouse_3);
    updateHover(image5, mouse_3);

    for (const c of favoritesComponents) if (c.status === PsychoJS.Status.NOT_STARTED && t >= 0.0) { c.tStart = t; c.frameNStart = frameN; if(c.setAutoDraw) c.setAutoDraw(true); }
    if (mouse_3.status === PsychoJS.Status.NOT_STARTED) mouse_3.status = PsychoJS.Status.STARTED;
    
    let imagenes = psychoJS.experiment.extraInfo.imagenes;
    if (!seleccion_hecha) {
      for (let i = 0; i < imagenes.length; i++) {
        if (mouse_3.isPressedIn(stim_list[i])) {
          seleccion_hecha = true;
          const elegido = imagenes[i];
          psychoJS.experiment.extraInfo.elecciones.push(elegido);
          psychoJS.experiment.addData(`Choice_Favorite_${psychoJS.experiment.extraInfo.elecciones.length}`, elegido);
          psychoJS.experiment.addData('TypeTrial', "ranking");
          imagenes.splice(i, 1);
          continueRoutine = false;
          break;
        }
      }
    }
    
    if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) return quitPsychoJS('Aborted', false);
    if (!continueRoutine) return Scheduler.Event.NEXT;
    
    return Scheduler.Event.FLIP_REPEAT;
  };
}

function favoritesRoutineEnd(snapshot) {
    return async () => {
        for (const c of favoritesComponents) if (c.setAutoDraw) c.setAutoDraw(false);
        let imagenes = psychoJS.experiment.extraInfo.imagenes;
        if (imagenes.length === 1 && currentLoop.thisN === currentLoop.nTotal - 2) {
            psychoJS.experiment.extraInfo.elecciones.push(imagenes[0]);
            psychoJS.experiment.addData('Choice_Favorite_Final', imagenes[0]);
            psychoJS.experiment.addData('TrialType', "ranking");
            const trialDuration = globalClock.getTime() - StartTimeRoutine;
            psychoJS.experiment.addData('TrialDuration', trialDuration);
        }
        routineTimer.reset();
        psychoJS.experiment.nextEntry();
        return Scheduler.Event.NEXT;
    };
}

function EndRoutineBegin(snapshot) {
  return async () => {
    StartTimeRoutine = globalClock.getTime();
    t = 0; EndClock.reset(); frameN = -1; continueRoutine = true; routineTimer.add(2.0);
    psychoJS.window.setColor(new util.Color([0.93, 0.95, 0.98]));
    EndComponents = [Msg];
    for (const c of EndComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
    return Scheduler.Event.NEXT;
  };
}

function EndRoutineEachFrame() {
    return async () => {
        t = EndClock.getTime(); frameN++;
        if (t >= 0.0 && Msg.status === PsychoJS.Status.NOT_STARTED) Msg.setAutoDraw(true);
        if (routineTimer.getTime() <= 0) continueRoutine = false;
        if (psychoJS.experiment.experimentEnded || psychoJS.eventManager.getKeys({ keyList: ['escape'] }).length > 0) return quitPsychoJS('Aborted', false);
        if (!continueRoutine) return Scheduler.Event.NEXT;
        return Scheduler.Event.FLIP_REPEAT;
    };
}

function EndRoutineEnd(snapshot) {
  return async () => {
    const trialDuration = globalClock.getTime() - StartTimeRoutine;
    psychoJS.experiment.addData('TrialDuration', trialDuration);
    for (const c of EndComponents) if (c.setAutoDraw) c.setAutoDraw(false);
    if (currentLoop === psychoJS.experiment) psychoJS.experiment.nextEntry(snapshot);
    return Scheduler.Event.NEXT;
  };
}

//surveycode

var si1Components, _si1Prev;
var si1Components, _si1Prev;
function surveyIntro1Begin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; si1Clock.reset(); frameN=-1; continueRoutine=true;
  StartTimeRoutine = globalClock.getTime()

  si1_age=si1_edu=si1_income=null;
  si1ContinueEnabled = false;

  // position & disable the shared image button
  FinishButton.setPos([0, -0.85]);
  FinishButton.opacity = 0.5;           // disabled look
  FinishButton.setAutoDraw(false);      // reset in case it was left on
  FinishButton.setDepth(200);           // above everything else

  si1Components = [si1Q1Lbl, si1Q2Lbl, si1Q3Lbl, si1Mouse, FinishButton];
  [si1Q1, si1Q2, si1Q3].forEach(row=>{
    row.forEach(o => {
      si1Components.push(o.bg, o.tx);
      o.selected=false; o.bg.setFillColor(new util.Color('white')); o.bg.setLineColor(new util.Color('black'));
    });
  });

  [si1Q1,si1Q2,si1Q3].forEach((row, idx)=>{
    const base = idx*20;
    row.forEach(o => { o.bg.setDepth(base+0); o.tx.setDepth(base-5); });
  });

  si1Mouse.status = PsychoJS.Status.NOT_STARTED;
  _si1Prev = undefined;
  for (const c of si1Components) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}

function surveyIntro1EachFrame(){ return async function(){
  t=si1Clock.getTime(); frameN+=1;
  setCursor('default');

  // draw everything
  si1Components.forEach(c => {
    if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true);
  });
  // subtle hover (optional)
  updateHover(FinishButton, si1Mouse);

  if (si1Mouse.status===PsychoJS.Status.NOT_STARTED){ si1Mouse.status=PsychoJS.Status.STARTED; _si1Prev = si1Mouse.getPressed(); }
  if (si1Mouse.status===PsychoJS.Status.STARTED){
    const btns = si1Mouse.getPressed();
    if (!_si1Prev || !btns.every((e,i)=>e===_si1Prev[i])){
      _si1Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        function pick(row, setter){
          const hit = row.find(o => o.bg.contains(si1Mouse));
          if (!hit) return;
          row.forEach(o => { o.selected=false; o.bg.setLineColor(new util.Color('black')); o.bg.setFillColor(new util.Color('white')); });
          hit.selected=true; hit.bg.setLineColor(new util.Color('#1565c0')); hit.bg.setFillColor(new util.Color('#e3f2fd'));
          setter(hit.label);
        }
        pick(si1Q1, v=>si1_age=v);
        pick(si1Q2, v=>si1_edu=v);
        pick(si1Q3, v=>si1_income=v);

        // gate the image button by opacity and a flag
        if ([si1_age, si1_edu, si1_income].every(v=>v!==null) && !si1ContinueEnabled){
          si1ContinueEnabled = true;
          FinishButton.opacity = 1.0;   // enabled look
        }

        if (si1ContinueEnabled && FinishButton.contains(si1Mouse)) {
          continueRoutine=false;
        }
      }
    }
  }

  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}

function surveyIntro1End(snapshot){ return async function(){
  psychoJS.experiment.addData('si1_age', si1_age);
  psychoJS.experiment.addData('si1_education', si1_edu);
  psychoJS.experiment.addData('si1_income', si1_income);
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);
  psychoJS.experiment.addData('TypeTrial', 'Survey');  
  // hide shared button
  FinishButton.setAutoDraw(false);

  for (const c of si1Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.nextEntry();
  return Scheduler.Event.NEXT;
}}

var si2Components, _si2Prev;
function surveyIntro2Begin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; si2Clock.reset(); frameN=-1; continueRoutine=true;
  StartTimeRoutine = globalClock.getTime()

  si2_freq=si2_same=si2_many=si2_selfshop=si2_time=si2_like=null;
  si2ContinueEnabled = false;

  ContinueButton.setPos([0, -0.85]);
  ContinueButton.opacity = 0.5;
  ContinueButton.setAutoDraw(false);
  ContinueButton.setDepth(200);

  si2Components = [si2Q1Lbl, si2Q2Lbl, si2Q3Lbl, si2Q4Lbl, si2Q5Lbl, si2Q6Lbl, si2Mouse, ContinueButton];
  [si2Q1,si2Q2,si2Q3,si2Q4,si2Q5,si2Q6].forEach(row=>{
    row.forEach(o => {
      si2Components.push(o.bg, o.tx);
      o.selected=false; o.bg.setFillColor(new util.Color('white')); o.bg.setLineColor(new util.Color('black'));
    });
  });
  [si2Q1,si2Q2,si2Q3,si2Q4,si2Q5,si2Q6].forEach((row, idx)=>{
    const base = idx*20;
    row.forEach(o => { o.bg.setDepth(base+0); o.tx.setDepth(base-5); });
  });

  si2Mouse.status = PsychoJS.Status.NOT_STARTED;
  _si2Prev = undefined;
  for (const c of si2Components) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}

function surveyIntro2EachFrame(){ return async function(){
  t=si2Clock.getTime(); frameN+=1;
  setCursor('default');

  si2Components.forEach(c => {
    if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true);
  });
  updateHover(ContinueButton, si2Mouse);

  if (si2Mouse.status===PsychoJS.Status.NOT_STARTED){ si2Mouse.status=PsychoJS.Status.STARTED; _si2Prev = si2Mouse.getPressed(); }
  if (si2Mouse.status===PsychoJS.Status.STARTED){
    const btns = si2Mouse.getPressed();
    if (!_si2Prev || !btns.every((e,i)=>e===_si2Prev[i])){
      _si2Prev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        function pick(row, setter){
          const hit = row.find(o => o.bg.contains(si2Mouse));
          if (!hit) return;
          row.forEach(o => { o.selected=false; o.bg.setLineColor(new util.Color('black')); o.bg.setFillColor(new util.Color('white')); });
          hit.selected=true; hit.bg.setLineColor(new util.Color('#1565c0')); hit.bg.setFillColor(new util.Color('#e3f2fd'));
          setter(hit.label);
        }
        pick(si2Q1, v=>si2_freq=v);
        pick(si2Q2, v=>si2_same=v);
        pick(si2Q3, v=>si2_many=v);
        pick(si2Q4, v=>si2_selfshop=v);
        pick(si2Q5, v=>si2_time=v);
        pick(si2Q6, v=>si2_like=v);

        if ([si2_freq, si2_same, si2_many, si2_selfshop, si2_time, si2_like].every(v=>v!==null) && !si2ContinueEnabled){
          si2ContinueEnabled = true;
          ContinueButton.opacity = 1.0;
        }
        if (si2ContinueEnabled && ContinueButton.contains(si2Mouse)) {
          continueRoutine=false;
        }
      }
    }
  }

  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}

function surveyIntro2End(snapshot){ return async function(){
  psychoJS.experiment.addData('si2_frequency_month', si2_freq);
  psychoJS.experiment.addData('si2_buy_same_products', si2_same);
  psychoJS.experiment.addData('si2_buy_many_products', si2_many);
  psychoJS.experiment.addData('si2_self_shopper', si2_selfshop);
  psychoJS.experiment.addData('si2_time_spent', si2_time);
  psychoJS.experiment.addData('si2_like_supermarket', si2_like);
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);  
  psychoJS.experiment.addData('TypeTrial', 'Survey');
  ContinueButton.setAutoDraw(false);

  for (const c of si2Components) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.nextEntry();
  return Scheduler.Event.NEXT;
}}

var sfinComponents, _sfinPrev;
function surveyFinaleBegin(snapshot){ return async function(){
  TrialHandler.fromSnapshot(snapshot);
  t=0; sfinClock.reset(); frameN=-1; continueRoutine=true;
  StartTimeRoutine = globalClock.getTime()

  sfin_mostExp=sfin_memScale=sfin_helpStart=sfin_helpMid=sfin_helpEnd=sfin_keyAttr=sfin_valueMore=null;
  sfinContinueEnabled = false;

  ContinueButton.setPos([0, -0.85]);
  ContinueButton.opacity = 0.5;
  ContinueButton.setAutoDraw(false);
  ContinueButton.setDepth(200);

  sfinComponents = [sfinQ1Lbl,sfinQ2Lbl,sfinQ3Lbl,sfinQ4Lbl,sfinQ5Lbl,sfinQ6Lbl,sfinQ7Lbl, sfinMouse, ContinueButton];
  [sfinQ1,sfinQ2,sfinQ3,sfinQ4,sfinQ5,sfinQ6,sfinQ7].forEach(row=>{
    row.forEach(o => {
      sfinComponents.push(o.bg, o.tx);
      o.selected=false; o.bg.setFillColor(new util.Color('white')); o.bg.setLineColor(new util.Color('black'));
    });
  });
  [sfinQ1,sfinQ2,sfinQ3,sfinQ4,sfinQ5,sfinQ6,sfinQ7].forEach((row, idx)=>{
    const base = idx*20;
    row.forEach(o => { o.bg.setDepth(base+0); o.tx.setDepth(base-5); });
  });

  sfinMouse.status = PsychoJS.Status.NOT_STARTED;
  _sfinPrev = undefined;
  for (const c of sfinComponents) if ('status' in c) c.status = PsychoJS.Status.NOT_STARTED;
  return Scheduler.Event.NEXT;
}}

function surveyFinaleEachFrame(){ return async function(){
  t=sfinClock.getTime(); frameN+=1;
  setCursor('default');

  sfinComponents.forEach(c => {
    if (c.status===PsychoJS.Status.NOT_STARTED && typeof c.setAutoDraw==='function') c.setAutoDraw(true);
  });
  updateHover(ContinueButton, sfinMouse);

  if (sfinMouse.status===PsychoJS.Status.NOT_STARTED){ sfinMouse.status=PsychoJS.Status.STARTED; _sfinPrev = sfinMouse.getPressed(); }
  if (sfinMouse.status===PsychoJS.Status.STARTED){
    const btns = sfinMouse.getPressed();
    if (!_sfinPrev || !btns.every((e,i)=>e===_sfinPrev[i])){
      _sfinPrev = btns;
      if (btns.reduce((a,b)=>a+b)>0){
        function pick(row, setter){
          const hit = row.find(o => o.bg.contains(sfinMouse));
          if (!hit) return;
          row.forEach(o => { o.selected=false; o.bg.setLineColor(new util.Color('black')); o.bg.setFillColor(new util.Color('white')); });
          hit.selected=true; hit.bg.setLineColor(new util.Color('#1565c0')); hit.bg.setFillColor(new util.Color('#e3f2fd'));
          setter(hit.label);
        }
        pick(sfinQ1, v=>sfin_mostExp=v);
        pick(sfinQ2, v=>sfin_memScale=v);
        pick(sfinQ3, v=>sfin_helpStart=v);
        pick(sfinQ4, v=>sfin_helpMid=v);
        pick(sfinQ5, v=>sfin_helpEnd=v);
        pick(sfinQ6, v=>sfin_keyAttr=v);
        pick(sfinQ7, v=>sfin_valueMore=v);

        if ([sfin_mostExp,sfin_memScale,sfin_helpStart,sfin_helpMid,sfin_helpEnd,sfin_keyAttr,sfin_valueMore].every(v=>v!==null) && !sfinContinueEnabled){
          sfinContinueEnabled = true;
          ContinueButton.opacity = 1.0;
        }
        if (sfinContinueEnabled && ContinueButton.contains(sfinMouse)) {
          continueRoutine=false;
        }
      }
    }
  }

  if (!continueRoutine) return Scheduler.Event.NEXT;
  return Scheduler.Event.FLIP_REPEAT;
}}

function surveyFinaleEnd(snapshot){ return async function(){
  psychoJS.experiment.addData('sfin_most_expensive', sfin_mostExp);
  psychoJS.experiment.addData('sfin_memory_1to10', sfin_memScale);
  psychoJS.experiment.addData('sfin_help_start',   sfin_helpStart);
  psychoJS.experiment.addData('sfin_help_middle',  sfin_helpMid);
  psychoJS.experiment.addData('sfin_help_end',     sfin_helpEnd);
  psychoJS.experiment.addData('sfin_key_attribute',sfin_keyAttr);
  psychoJS.experiment.addData('sfin_value_more',   sfin_valueMore);
  const trialDuration = globalClock.getTime() - StartTimeRoutine;
  psychoJS.experiment.addData('TrialDuration', trialDuration);  
  psychoJS.experiment.addData('TypeTrial', 'Survey');
  ContinueButton.setAutoDraw(false);

  for (const c of sfinComponents) if (typeof c.setAutoDraw==='function') c.setAutoDraw(false);
  psychoJS.experiment.nextEntry();
  return Scheduler.Event.NEXT;
}}

//endsurveycode

function importConditions(loopSnapshot) {
  return async () => {
    const trialData = loopSnapshot.getCurrentTrial();

    // --- NUEVO CÓDIGO DE DEPURACIÓN ---
    // Imprime en la consola el objeto completo del trial actual.
    console.log("Contenido completo del trial (trialData):", trialData);
    // Si el objeto existe, imprime una lista limpia de todas las columnas que encontró.
    if (trialData) {
        console.log("Claves (nombres de columnas) encontradas:", Object.keys(trialData));
    }
    // ------------------------------------

    if (trialData) {
      for (const key in trialData) {
        if (trialData.hasOwnProperty(key)) {
            window[key] = trialData[key];
        }
      }
    }
    return Scheduler.Event.NEXT;
  };
}



const COMPLETION_URL = 'https://app.prolific.com/submissions/complete?cc=CE95YNER'
const CANCEL_URL = "https://app.prolific.com/submissions/complete?cc=CE95YNER";
psychoJS.setRedirectUrls(COMPLETION_URL, CANCEL_URL);

async function quitPsychoJS(message, isCompleted) {
  await psychoJS.quit({ message, isCompleted });
  return Scheduler.Event.QUIT;
}

//async function quitPsychoJS(message, isCompleted) {
//  //if (psychoJS.experiment.isEntryEmpty()) {
//  //    psychoJS.experiment.nextEntry();
//  //}
//  //psychoJS.window.close();
//  //psychoJS.quit({ message: message, isCompleted: isCompleted });
//  //return Scheduler.Event.QUIT;
//  // try to save any final data (optional: include expInfo)
//  try { await psychoJS.experiment.save({ attributes: expInfo }); } catch (e) { console.warn(e); }
//
//  // close renderer and tell Pavlovia we’re done (this also uploads logs)
//  psychoJS.window.close();
//  psychoJS.quit({ message: message, isCompleted: isCompleted });
//
//  // redirect shortly after to give the network a moment
//  if (isCompleted) {
//    setTimeout(() => { window.location.href = PROLIFIC_COMPLETION_URL; }, 2700);
//  }
//
//  return Scheduler.Event.QUIT;
//}

