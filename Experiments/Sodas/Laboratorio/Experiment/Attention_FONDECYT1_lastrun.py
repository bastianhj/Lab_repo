#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.0),
    on May 07, 2025, at 15:41
If you publish work using this script the most relevant publication is:

    Peirce J, Gray JR, Simpson S, MacAskill M, Höchenberger R, Sogo H, Kastman E, Lindeløv JK. (2019) 
        PsychoPy2: Experiments in behavior made easy Behav Res 51: 195. 
        https://doi.org/10.3758/s13428-018-01193-y

"""

import psychopy
psychopy.useVersion('2023.1.0')


# --- Import packages ---
from psychopy import locale_setup
from psychopy import prefs
from psychopy import plugins
plugins.activatePlugins()
from psychopy import sound, gui, visual, core, data, event, logging, clock, colors, layout, iohub, hardware
from psychopy.constants import (NOT_STARTED, STARTED, PLAYING, PAUSED,
                                STOPPED, FINISHED, PRESSED, RELEASED, FOREVER)

import numpy as np  # whole numpy lib is available, prepend 'np.'
from numpy import (sin, cos, tan, log, log10, pi, average,
                   sqrt, std, deg2rad, rad2deg, linspace, asarray)
from numpy.random import random, randint, normal, shuffle, choice as randchoice
import os  # handy system and path functions
import sys  # to get file system encoding

import psychopy.iohub as io
from psychopy.hardware import keyboard

# Run 'Before Experiment' code from code
nLoop=1
phase=1
Trials1=20 #20
Trials2=20 #20
Recurrency = 20
Trials=Trials1+Trials2
mouse_delay = 1.5
last_click_time = -mouse_delay
#pid=int(expInfo['participant'])

#Listas por si acaso:
Products = ['Bohney', 'Colalola', 'Haphy', 'Mohshom', 'Phospho']
AllAttributes = ['Quality', 'Brand_Rep', 'Calories', 'Flavour']
Attributes = ['Calories', 'Quality'] #['Quality', 'Brand_Rep', 'Calories', 'Flavour' ]

#definir largos
n_filas = 5 + len(Attributes)
dist_y = 2 / ( n_filas ) #2/7
dist_x = 0.7

#locations params
#Images
xcoord1 = - dist_x
xcoord2 = 0
xcoord3 = dist_x
ycoord1 = 1 - 2*dist_y
ycoord2 = ycoord1 - 2*dist_y
ycoord3 = ycoord2 - dist_y
ycoord4 = ycoord3 - dist_y
ycoord5 = ycoord4 - dist_y

#locations as vectors
loc1 = [xcoord1, ycoord1]; #Imagen
loc2 = [xcoord1, ycoord2]; #Quality
loc3 = [xcoord1, (ycoord3)]; #Brand_Rep
loc4 = [xcoord1, (ycoord4)]; #Calories
loc5 = [xcoord1, (ycoord5)]; #Flavour
locAtt = [loc2, loc3, loc4, loc5]
element_to_position = {}
position_iter = iter(locAtt)

print(loc1,'-\n',loc2,'-\n',loc3,'-\n',loc4,'-\n',loc5,'-|\n',position_iter)

#new version
#locations = [
#    next(position_iter) if item in Attributes else [2,2]
#    for item in AllAttributes
#]
#print(locations)

for el in Attributes:
    element_to_position[el] = next(position_iter)
print(element_to_position)

locations = []
for item in AllAttributes:
    if item in element_to_position:
        locations.append(element_to_position[item])
    else:
        locations.append([2,2])
print("locations:",locations)

#if len(Attributes) == 2:
#    locations = [loc2, loc3, [2,2], [2,2]]
#elif len(Attributes) == 3:
#    locations = [loc2, loc3, loc4, [2,2]]
#else:
#    locations = [loc2, loc3, loc4, loc5]

#size params
xsizeimg = dist_y
ysizeimg = 2*dist_y
xsizele = 0.2
ysizele = 0.1
xsizela = 0.3
ysizela = 0.2
xETreg = 0.4
yETreg = 0.3

#shuffle locations
#shuffle(locations)

#colors
#color1 = [0.8216, 0.7412, 0.2039]
#color2 = [0.6471, 0.4118, 0.0980]
#color3 = [0.4824, 0.4353, -0.1608] #-0.16
#color4 = [1.000, 0.4112, 0.3569]
#colors = [color1, color2, color3, color4]

#EYETRACKER
from psychopy.iohub import launchHubServer
from psychopy.core import getTime, wait



# Ensure that relative paths start from the same directory as this script
_thisDir = os.path.dirname(os.path.abspath(__file__))
os.chdir(_thisDir)
# Store info about the experiment session
psychopyVersion = '2023.1.0'
expName = 'Exp_attention'  # from the Builder filename that created this script
expInfo = {
    'participant': f"{randint(0, 45):02.0f}",
    'session': '001',
}
# --- Show participant info dialog --
dlg = gui.DlgFromDict(dictionary=expInfo, sortKeys=False, title=expName)
if dlg.OK == False:
    core.quit()  # user pressed cancel
expInfo['date'] = data.getDateStr()  # add a simple timestamp
expInfo['expName'] = expName
expInfo['psychopyVersion'] = psychopyVersion

# Data file name stem = absolute path + name; later add .psyexp, .csv, .log, etc
filename = _thisDir + os.sep + u'data/%s_%s_%s' % (expInfo['participant'], expName, expInfo['date'])

# An ExperimentHandler isn't essential but helps with data saving
thisExp = data.ExperimentHandler(name=expName, version='',
    extraInfo=expInfo, runtimeInfo=None,
    originPath='C:\\Users\\Laptop_4\\Desktop\\FONDECYT\\Attention_FONDECYT1_lastrun.py',
    savePickle=True, saveWideText=True,
    dataFileName=filename)
# save a log file for detail verbose info
logFile = logging.LogFile(filename+'.log', level=logging.EXP)
logging.console.setLevel(logging.WARNING)  # this outputs to the screen, not a file

endExpNow = False  # flag for 'escape' or other condition => quit the exp
frameTolerance = 0.001  # how close to onset before 'same' frame

# Start Code - component code to be run after the window creation

# --- Setup the Window ---
win = visual.Window(
    size=[1920, 1080], fullscr=True, screen=1, 
    winType='pyglet', allowStencil=True,
    monitor='testMonitor', color=[0,0,0.3], colorSpace='rgb',
    backgroundImage='', backgroundFit='scale-down',
    blendMode='avg', useFBO=True, 
    units='norm')
win.mouseVisible = False
# store frame rate of monitor if we can measure it
expInfo['frameRate'] = win.getActualFrameRate()
if expInfo['frameRate'] != None:
    frameDur = 1.0 / round(expInfo['frameRate'])
else:
    frameDur = 1.0 / 60.0  # could not measure, so guess
# --- Setup input devices ---
ioConfig = {}

# Setup eyetracking
ioConfig['eyetracker.hw.tobii.EyeTracker'] = {
    'name': 'tracker',
    'model_name': 'Tobii Pro Spark',
    'serial_number': '',
    'runtime_settings': {
        'sampling_rate': 60.0,
    }
}

# Setup iohub keyboard
ioConfig['Keyboard'] = dict(use_keymap='psychopy')

ioSession = '1'
if 'session' in expInfo:
    ioSession = str(expInfo['session'])
ioServer = io.launchHubServer(window=win, **ioConfig)
eyetracker = ioServer.getDevice('tracker')

# create a default keyboard (e.g. to check for escape)
defaultKeyboard = keyboard.Keyboard(backend='iohub')

# --- Initialize components for Routine "Intro" ---
Intro_ = visual.TextStim(win=win, name='Intro_',
    text="You have to make a trip to your place of work. You'll have to choose between three ways of getting there, or not take any of them. Each has different characteristics, which are shown below their names. Choose the alternative that suits you better, just as you would in real life.",
    font='Open Sans',
    pos=(0, 0.7), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
Attributes_ = visual.TextStim(win=win, name='Attributes_',
    text="'The Attributes are:\nCost: How much does it cost (in USD).\nTime: The length of the travel (in minutes).\nComfort: How comfort the travel will be (0 to 5 stars).\nPollution (trees): How many trees does it need to compensate the CO2 Emissions. The more trees are needed, the more contaminating it is.',",
    font='Open Sans',
    pos=(0, 0.3), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
ButtonIntro_ = visual.TextStim(win=win, name='ButtonIntro_',
    text='To start, press the button down below.',
    font='Open Sans',
    pos=(0, 0 ), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
StartButton = visual.ImageStim(
    win=win,
    name='StartButton', 
    image='pos_junk_food/StartButton.png', mask=None, anchor='center',
    ori=0.0, pos=(0, -0.3), size=(0.25, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-3.0)
mouse_2 = event.Mouse(win=win)
x, y = [None, None]
mouse_2.mouseClock = core.Clock()

# --- Initialize components for Routine "Blank2" ---
Starting_title = visual.TextStim(win=win, name='Starting_title',
    text='Starting in...',
    font='Open Sans',
    pos=(0, 0.25), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);
One_title = visual.TextStim(win=win, name='One_title',
    text='1',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-1.0);
Two_title = visual.TextStim(win=win, name='Two_title',
    text='2',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-2.0);
Three_title = visual.TextStim(win=win, name='Three_title',
    text='3',
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=-3.0);

# --- Initialize components for Routine "trial" ---
ImageProd1 = visual.ImageStim(
    win=win,
    name='ImageProd1', units='norm', 
    image='default.png', mask=None, anchor='center',
    ori=0.0, pos=(xcoord2, ycoord1), size=(xsizeimg , ysizeimg),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
ImageProd2 = visual.ImageStim(
    win=win,
    name='ImageProd2', units='norm', 
    image='default.png', mask=None, anchor='center',
    ori=0.0, pos=(xcoord3, ycoord1), size=(xsizeimg , ysizeimg),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-1.0)
Quality_Label = visual.TextBox2(
     win, text='', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizela , ysizela), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Quality_Label',
     depth=-2, autoLog=True,
)
Brand_Rep_Label = visual.TextBox2(
     win, text='', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizela , ysizela), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Brand_Rep_Label',
     depth=-3, autoLog=True,
)
Calories_Label = visual.TextBox2(
     win, text='', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizela , ysizela), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Calories_Label',
     depth=-4, autoLog=True,
)
Flavour_Label = visual.TextBox2(
     win, text='', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizela , ysizela), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Flavour_Label',
     depth=-5, autoLog=True,
)
Quality1 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Quality1',
     depth=-6, autoLog=True,
)
Brand_Rep1 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Brand_Rep1',
     depth=-7, autoLog=True,
)
Calories1 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Calories1',
     depth=-8, autoLog=True,
)
Flavour1 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Flavour1',
     depth=-9, autoLog=True,
)
Quality2 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Quality2',
     depth=-10, autoLog=True,
)
Brand_Rep2 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Brand_Rep2',
     depth=-11, autoLog=True,
)
Calories2 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Calories2',
     depth=-12, autoLog=True,
)
Flavour2 = visual.TextBox2(
     win, text=None, placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Flavour2',
     depth=-13, autoLog=True,
)
mouse = event.Mouse(win=win)
x, y = [None, None]
mouse.mouseClock = core.Clock()
# Run 'Begin Experiment' code from code
print('Exp starting')
pid = expInfo['participant'] #id participante
useRows = '0:19' #trials

#bases
ImgProd1 = 'Colas/Bohney.png'
ImgProd2 = 'Colas/Colalola.png'

#------------------NEWET------------------------
from psychopy import visual, event, core
import psychopy.visual
import psychopy.event
import tobii_research as tr
found_eyetrackers = tr.find_all_eyetrackers()
my_eyetracker = found_eyetrackers[0]
print("Address: " + my_eyetracker.address)
print("Model: " + my_eyetracker.model)
#print("Name (It's OK if this is empty): " + my_eyetracker.device_name)
#print("Serial number: " + my_eyetracker.serial_number)
#-----------------------------------------------

print('BeginExperment ended------------------------')

ET_Quality1 = visual.ROI(win, name='ET_Quality1', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-16
    )
ET_BrandRep1 = visual.ROI(win, name='ET_BrandRep1', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-17
    )
ET_Calories1 = visual.ROI(win, name='ET_Calories1', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-18
    )
ET_Flavour1 = visual.ROI(win, name='ET_Flavour1', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-19
    )
ET_Quality2 = visual.ROI(win, name='ET_Quality2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-20
    )
ET_Brand_Rep2 = visual.ROI(win, name='ET_Brand_Rep2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-21
    )
ET_Calories2 = visual.ROI(win, name='ET_Calories2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-22
    )
ET_Flavour2 = visual.ROI(win, name='ET_Flavour2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-23
    )
ET_ImageProd1 = visual.ROI(win, name='ET_ImageProd1', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-24
    )
ET_ImageProd2 = visual.ROI(win, name='ET_ImageProd2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-25
    )
ET_Quality_Label = visual.ROI(win, name='ET_Quality_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-26
    )
ET_Brand_Rep_Label = visual.ROI(win, name='ET_Brand_Rep_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-27
    )
ET_Calories_Label = visual.ROI(win, name='ET_Calories_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(0.3, 0.2), 
    anchor='center', ori=0.0, depth=-28
    )
ET_Flavour_Label = visual.ROI(win, name='ET_Flavour_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-29
    )
etRecord = hardware.eyetracker.EyetrackerControl(
    tracker=eyetracker,
    actionType='Start Only'
)

# --- Initialize components for Routine "blank" ---
TextB = visual.TextStim(win=win, name='TextB',
    text=None,
    font='Open Sans',
    pos=(0, 0), height=0.05, wrapWidth=None, ori=0.0, 
    color='white', colorSpace='rgb', opacity=None, 
    languageStyle='LTR',
    depth=0.0);

# --- Initialize components for Routine "End" ---
Msg = visual.TextBox2(
     win, text='Thanks for participating!', placeholder='Type here...', font='Open Sans',
     pos=(0, 0),     letterHeight=0.05,
     size=(0.5, 0.2), borderWidth=2.0,
     color='Gray', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor='white', borderColor='white',
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Msg',
     depth=0, autoLog=True,
)

# Create some handy timers
globalClock = core.Clock()  # to track the time since experiment started
routineTimer = core.Clock()  # to track time remaining of each (possibly non-slip) routine 

# --- Prepare to start Routine "Intro" ---
continueRoutine = True
# update component parameters for each repeat
# setup some python lists for storing info about the mouse_2
mouse_2.x = []
mouse_2.y = []
mouse_2.leftButton = []
mouse_2.midButton = []
mouse_2.rightButton = []
mouse_2.time = []
mouse_2.clicked_name = []
gotValidClick = False  # until a click is received
# Run 'Begin Routine' code from code_4
clicked_things1=[]
clickables1 = [StartButton]
waiting1=False

# keep track of which components have finished
IntroComponents = [Intro_, Attributes_, ButtonIntro_, StartButton, mouse_2]
for thisComponent in IntroComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Intro" ---
routineForceEnded = not continueRoutine
while continueRoutine:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Intro_* updates
    
    # if Intro_ is starting this frame...
    if Intro_.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Intro_.frameNStart = frameN  # exact frame index
        Intro_.tStart = t  # local t and not account for scr refresh
        Intro_.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Intro_, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Intro_.started')
        # update status
        Intro_.status = STARTED
        Intro_.setAutoDraw(True)
    
    # if Intro_ is active this frame...
    if Intro_.status == STARTED:
        # update params
        pass
    
    # *Attributes_* updates
    
    # if Attributes_ is starting this frame...
    if Attributes_.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Attributes_.frameNStart = frameN  # exact frame index
        Attributes_.tStart = t  # local t and not account for scr refresh
        Attributes_.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Attributes_, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Attributes_.started')
        # update status
        Attributes_.status = STARTED
        Attributes_.setAutoDraw(True)
    
    # if Attributes_ is active this frame...
    if Attributes_.status == STARTED:
        # update params
        pass
    
    # *ButtonIntro_* updates
    
    # if ButtonIntro_ is starting this frame...
    if ButtonIntro_.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        ButtonIntro_.frameNStart = frameN  # exact frame index
        ButtonIntro_.tStart = t  # local t and not account for scr refresh
        ButtonIntro_.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(ButtonIntro_, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'ButtonIntro_.started')
        # update status
        ButtonIntro_.status = STARTED
        ButtonIntro_.setAutoDraw(True)
    
    # if ButtonIntro_ is active this frame...
    if ButtonIntro_.status == STARTED:
        # update params
        pass
    
    # *StartButton* updates
    
    # if StartButton is starting this frame...
    if StartButton.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        StartButton.frameNStart = frameN  # exact frame index
        StartButton.tStart = t  # local t and not account for scr refresh
        StartButton.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(StartButton, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'StartButton.started')
        # update status
        StartButton.status = STARTED
        StartButton.setAutoDraw(True)
    
    # if StartButton is active this frame...
    if StartButton.status == STARTED:
        # update params
        pass
    # *mouse_2* updates
    
    # if mouse_2 is starting this frame...
    if mouse_2.status == NOT_STARTED and t >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        mouse_2.frameNStart = frameN  # exact frame index
        mouse_2.tStart = t  # local t and not account for scr refresh
        mouse_2.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(mouse_2, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.addData('mouse_2.started', t)
        # update status
        mouse_2.status = STARTED
        mouse_2.mouseClock.reset()
        prevButtonState = mouse_2.getPressed()  # if button is down already this ISN'T a new click
    if mouse_2.status == STARTED:  # only update if started and not finished!
        buttons = mouse_2.getPressed()
        if buttons != prevButtonState:  # button state changed?
            prevButtonState = buttons
            if sum(buttons) > 0:  # state changed to a new click
                # check if the mouse was inside our 'clickable' objects
                gotValidClick = False
                clickableList = core.getFromNames(StartButton)
                for obj in clickableList:
                    # is this object clicked on?
                    if obj.contains(mouse_2):
                        gotValidClick = True
                        mouse_2.clicked_name.append(obj.name)
                x, y = mouse_2.getPos()
                mouse_2.x.append(x)
                mouse_2.y.append(y)
                buttons = mouse_2.getPressed()
                mouse_2.leftButton.append(buttons[0])
                mouse_2.midButton.append(buttons[1])
                mouse_2.rightButton.append(buttons[2])
                mouse_2.time.append(mouse_2.mouseClock.getTime())
    # Run 'Each Frame' code from code_4
    clickedNum = 0
    for clickable in clickables1:
        if mouse.isPressedIn(clickable):
            clicked_things1.append(clickable.name)
    for clickable in clickables1:
        if clickable.name in clicked_things1:
            clickedNum += 1
        if clickedNum == 1 and not waiting1:
            waiting1 = True
    
    if clickedNum == 1 and waiting1:
        continueRoutine = False
    
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in IntroComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Intro" ---
for thisComponent in IntroComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# store data for thisExp (ExperimentHandler)
thisExp.addData('mouse_2.x', mouse_2.x)
thisExp.addData('mouse_2.y', mouse_2.y)
thisExp.addData('mouse_2.leftButton', mouse_2.leftButton)
thisExp.addData('mouse_2.midButton', mouse_2.midButton)
thisExp.addData('mouse_2.rightButton', mouse_2.rightButton)
thisExp.addData('mouse_2.time', mouse_2.time)
thisExp.addData('mouse_2.clicked_name', mouse_2.clicked_name)
thisExp.nextEntry()
# the Routine "Intro" was not non-slip safe, so reset the non-slip timer
routineTimer.reset()

# --- Prepare to start Routine "Blank2" ---
continueRoutine = True
# update component parameters for each repeat
# keep track of which components have finished
Blank2Components = [Starting_title, One_title, Two_title, Three_title]
for thisComponent in Blank2Components:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "Blank2" ---
routineForceEnded = not continueRoutine
while continueRoutine and routineTimer.getTime() < 4.0:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Starting_title* updates
    
    # if Starting_title is starting this frame...
    if Starting_title.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Starting_title.frameNStart = frameN  # exact frame index
        Starting_title.tStart = t  # local t and not account for scr refresh
        Starting_title.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Starting_title, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Starting_title.started')
        # update status
        Starting_title.status = STARTED
        Starting_title.setAutoDraw(True)
    
    # if Starting_title is active this frame...
    if Starting_title.status == STARTED:
        # update params
        pass
    
    # if Starting_title is stopping this frame...
    if Starting_title.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Starting_title.tStartRefresh + 4.0-frameTolerance:
            # keep track of stop time/frame for later
            Starting_title.tStop = t  # not accounting for scr refresh
            Starting_title.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Starting_title.stopped')
            # update status
            Starting_title.status = FINISHED
            Starting_title.setAutoDraw(False)
    
    # *One_title* updates
    
    # if One_title is starting this frame...
    if One_title.status == NOT_STARTED and tThisFlip >= 3.0-frameTolerance:
        # keep track of start time/frame for later
        One_title.frameNStart = frameN  # exact frame index
        One_title.tStart = t  # local t and not account for scr refresh
        One_title.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(One_title, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'One_title.started')
        # update status
        One_title.status = STARTED
        One_title.setAutoDraw(True)
    
    # if One_title is active this frame...
    if One_title.status == STARTED:
        # update params
        pass
    
    # if One_title is stopping this frame...
    if One_title.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > One_title.tStartRefresh + 1.0-frameTolerance:
            # keep track of stop time/frame for later
            One_title.tStop = t  # not accounting for scr refresh
            One_title.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'One_title.stopped')
            # update status
            One_title.status = FINISHED
            One_title.setAutoDraw(False)
    
    # *Two_title* updates
    
    # if Two_title is starting this frame...
    if Two_title.status == NOT_STARTED and tThisFlip >= 2.0-frameTolerance:
        # keep track of start time/frame for later
        Two_title.frameNStart = frameN  # exact frame index
        Two_title.tStart = t  # local t and not account for scr refresh
        Two_title.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Two_title, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Two_title.started')
        # update status
        Two_title.status = STARTED
        Two_title.setAutoDraw(True)
    
    # if Two_title is active this frame...
    if Two_title.status == STARTED:
        # update params
        pass
    
    # if Two_title is stopping this frame...
    if Two_title.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Two_title.tStartRefresh + 1.0-frameTolerance:
            # keep track of stop time/frame for later
            Two_title.tStop = t  # not accounting for scr refresh
            Two_title.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Two_title.stopped')
            # update status
            Two_title.status = FINISHED
            Two_title.setAutoDraw(False)
    
    # *Three_title* updates
    
    # if Three_title is starting this frame...
    if Three_title.status == NOT_STARTED and tThisFlip >= 1.0-frameTolerance:
        # keep track of start time/frame for later
        Three_title.frameNStart = frameN  # exact frame index
        Three_title.tStart = t  # local t and not account for scr refresh
        Three_title.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Three_title, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Three_title.started')
        # update status
        Three_title.status = STARTED
        Three_title.setAutoDraw(True)
    
    # if Three_title is active this frame...
    if Three_title.status == STARTED:
        # update params
        pass
    
    # if Three_title is stopping this frame...
    if Three_title.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Three_title.tStartRefresh + 1.0-frameTolerance:
            # keep track of stop time/frame for later
            Three_title.tStop = t  # not accounting for scr refresh
            Three_title.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Three_title.stopped')
            # update status
            Three_title.status = FINISHED
            Three_title.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in Blank2Components:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "Blank2" ---
for thisComponent in Blank2Components:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
if routineForceEnded:
    routineTimer.reset()
else:
    routineTimer.addTime(-4.000000)

# set up handler to look after randomisation of conditions etc
trials = data.TrialHandler(nReps=3.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('FondecytValues.csv', selection=useRows),
    seed=None, name='trials')
thisExp.addLoop(trials)  # add the loop to the experiment
thisTrial = trials.trialList[0]  # so we can initialise stimuli with some values
# abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
if thisTrial != None:
    for paramName in thisTrial:
        exec('{} = thisTrial[paramName]'.format(paramName))

for thisTrial in trials:
    currentLoop = trials
    # abbreviate parameter names if possible (e.g. rgb = thisTrial.rgb)
    if thisTrial != None:
        for paramName in thisTrial:
            exec('{} = thisTrial[paramName]'.format(paramName))
    
    # --- Prepare to start Routine "trial" ---
    continueRoutine = True
    # update component parameters for each repeat
    Quality_Label.reset()
    Quality_Label.setPos((xcoord1, locations[0][1]))
    Quality_Label.setText('Quality\n(1-10)')
    Brand_Rep_Label.reset()
    Brand_Rep_Label.setPos((xcoord1, locations[1][1]))
    Brand_Rep_Label.setText('Brand Reputation\n(1-10)')
    Calories_Label.reset()
    Calories_Label.setPos((xcoord1, locations[2][1]))
    Calories_Label.setText('Calories')
    Flavour_Label.reset()
    Flavour_Label.setPos((xcoord1, locations[3][1]))
    Flavour_Label.setText('Flavour\n(1-10)')
    Quality1.reset()
    Quality1.setPos((xcoord2, locations[0][1]))
    Quality1.setText('')
    Brand_Rep1.reset()
    Brand_Rep1.setPos((xcoord2, locations[1][1]))
    Brand_Rep1.setText('')
    Calories1.reset()
    Calories1.setPos((xcoord2, locations[2][1]))
    Calories1.setText('')
    Flavour1.reset()
    Flavour1.setPos((xcoord2, locations[3][1]))
    Flavour1.setText('')
    Quality2.reset()
    Quality2.setPos((xcoord3, locations[0][1]))
    Quality2.setText('')
    Brand_Rep2.reset()
    Brand_Rep2.setPos((xcoord3, locations[1][1]))
    Brand_Rep2.setText('')
    Calories2.reset()
    Calories2.setPos((xcoord3, locations[2][1]))
    Calories2.setText('')
    Flavour2.reset()
    Flavour2.setPos((xcoord3, locations[3][1]))
    Flavour2.setText('')
    # setup some python lists for storing info about the mouse
    mouse.x = []
    mouse.y = []
    mouse.leftButton = []
    mouse.midButton = []
    mouse.rightButton = []
    mouse.time = []
    mouse.clicked_name = []
    gotValidClick = False  # until a click is received
    # Run 'Begin Routine' code from code
    print('Routine starting ',nLoop)
    
    #products
    print(product1,'----------------------------')
    print(product2,'----------------------------')
    
    bkgcolor=[0,0,0.3]
    win.setColor(bkgcolor)
    waiting = False
    ETRECORD_FR = []
    ETRECORD_FRT = []
    ETRECORD_FRT_1970 = []
    LEFTPUPIL_FR = []
    RIGHTPUPIL_FR = []
    TIMEGAZETOB = []
    TIMEGAZE = []
    MOUSEGAZE = []
    TOBIIGAZE = []
    TOBIIGAZEL = []
    TOBIIGAZELT = []
    TOBIIGAZER = []
    StartTimeRoutine = t
    TIMEGAZE_1970 = []
    
    
    #------------------NEWET------------------------
    # This will be called every time there is new gaze data
    def gaze_data_callback(gaze_data):
         #Extract the data we are interested in
        tg = gaze_data.system_time_stamp
        lp = gaze_data.left_eye.pupil.diameter
        rp = gaze_data.right_eye.pupil.diameter
        lx = gaze_data.left_eye.gaze_point.position_on_display_area[0]
        ly = gaze_data.left_eye.gaze_point.position_on_display_area[1]
        lv = gaze_data.left_eye.gaze_point.validity
        rx = gaze_data.right_eye.gaze_point.position_on_display_area[0]
        ry = gaze_data.right_eye.gaze_point.position_on_display_area[1]
        rv = gaze_data.right_eye.gaze_point.validity
        # Add gaze data to the buffer 
        LEFTPUPIL_FR.append(lp)
        RIGHTPUPIL_FR.append(rp)
        TIMEGAZETOB.append(tg)
        TOBIIGAZEL.append( [lx, ly, lv] )
        TOBIIGAZER.append( [rx, ry, lr] )
        TOBIIGAZELT.append( [lx, ly, lv, tg] )
    #---------------------------------------------------
    
    
    
    # Start the callback function-----------
    my_eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    #-----------------------------------------------
    
    #prod1
    Quality1.text = product1_Quality
    Brand_Rep1.text = product1_Brand_Rep
    Calories1.text = product1_Calories
    Flavour1.text = product1_Flavour
    #prod2
    Quality2.text = product2_Quality
    Brand_Rep2.text = product2_Brand_Rep
    Calories2.text = product2_Calories
    Flavour2.text = product2_Flavour
    
    if product1 == 'Bohney':
        ImgProd1 = 'Colas/bohney.png'
    elif product1 == 'Colalola':
        ImgProd1 = 'Colas/colalola.png'
    elif product1 == 'Haphy':
        ImgProd1 = 'Colas/haphy.png'
    elif product1 == 'Mohshom':
        ImgProd1 = 'Colas/mohshom.png'
    else:
        ImgProd1 = 'Colas/phospho.png'
    if product2 == 'Bohney':
        ImgProd2 = 'Colas/bohney.png'
    elif product2 == 'Colalola':
        ImgProd2 = 'Colas/colalola.png'
    elif product2 == 'Haphy':
        ImgProd2 = 'Colas/haphy.png'
    elif product2 == 'Mohshom':
        ImgProd2 = 'Colas/mohshom.png'
    else:
        ImgProd2 = 'Colas/phospho.png'
    
    clicked_things = []
    clickables = [ImageProd1, ImageProd2]
    
    #ImageProd1.setImage(ImgProd1)
    #ImageProd2.setImage(ImgProd2)
    ET_Quality1.setPos((xcoord2, locations[0][1]))
    # clear any previous roi data
    ET_Quality1.reset()
    ET_BrandRep1.setPos((xcoord2, locations[1][1]))
    # clear any previous roi data
    ET_BrandRep1.reset()
    ET_Calories1.setPos((xcoord2, locations[2][1]))
    # clear any previous roi data
    ET_Calories1.reset()
    # clear any previous roi data
    ET_Flavour1.reset()
    ET_Quality2.setPos((xcoord3, locations[0][1]))
    # clear any previous roi data
    ET_Quality2.reset()
    ET_Brand_Rep2.setPos((xcoord3, locations[1][1]))
    # clear any previous roi data
    ET_Brand_Rep2.reset()
    ET_Calories2.setPos((xcoord3, locations[2][1]))
    # clear any previous roi data
    ET_Calories2.reset()
    ET_Flavour2.setPos((xcoord3, locations[3][1]))
    # clear any previous roi data
    ET_Flavour2.reset()
    ET_ImageProd1.setPos((xcoord2, ycoord1))
    # clear any previous roi data
    ET_ImageProd1.reset()
    ET_ImageProd2.setPos((xcoord3, ycoord1))
    # clear any previous roi data
    ET_ImageProd2.reset()
    ET_Quality_Label.setPos((xcoord1, locations[0][1]))
    # clear any previous roi data
    ET_Quality_Label.reset()
    ET_Brand_Rep_Label.setPos((xcoord1, locations[1][1]))
    # clear any previous roi data
    ET_Brand_Rep_Label.reset()
    ET_Calories_Label.setPos((xcoord1, locations[2][1]))
    # clear any previous roi data
    ET_Calories_Label.reset()
    ET_Flavour_Label.setPos((xcoord1, locations[3][1]))
    # clear any previous roi data
    ET_Flavour_Label.reset()
    # keep track of which components have finished
    trialComponents = [ImageProd1, ImageProd2, Quality_Label, Brand_Rep_Label, Calories_Label, Flavour_Label, Quality1, Brand_Rep1, Calories1, Flavour1, Quality2, Brand_Rep2, Calories2, Flavour2, mouse, ET_Quality1, ET_BrandRep1, ET_Calories1, ET_Flavour1, ET_Quality2, ET_Brand_Rep2, ET_Calories2, ET_Flavour2, ET_ImageProd1, ET_ImageProd2, ET_Quality_Label, ET_Brand_Rep_Label, ET_Calories_Label, ET_Flavour_Label, etRecord]
    for thisComponent in trialComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "trial" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *ImageProd1* updates
        
        # if ImageProd1 is starting this frame...
        if ImageProd1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ImageProd1.frameNStart = frameN  # exact frame index
            ImageProd1.tStart = t  # local t and not account for scr refresh
            ImageProd1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ImageProd1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ImageProd1.started')
            # update status
            ImageProd1.status = STARTED
            ImageProd1.setAutoDraw(True)
        
        # if ImageProd1 is active this frame...
        if ImageProd1.status == STARTED:
            # update params
            ImageProd1.setImage(ImgProd1, log=False)
        
        # *ImageProd2* updates
        
        # if ImageProd2 is starting this frame...
        if ImageProd2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ImageProd2.frameNStart = frameN  # exact frame index
            ImageProd2.tStart = t  # local t and not account for scr refresh
            ImageProd2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ImageProd2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ImageProd2.started')
            # update status
            ImageProd2.status = STARTED
            ImageProd2.setAutoDraw(True)
        
        # if ImageProd2 is active this frame...
        if ImageProd2.status == STARTED:
            # update params
            ImageProd2.setImage(ImgProd2, log=False)
        
        # *Quality_Label* updates
        
        # if Quality_Label is starting this frame...
        if Quality_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Quality_Label.frameNStart = frameN  # exact frame index
            Quality_Label.tStart = t  # local t and not account for scr refresh
            Quality_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Quality_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Quality_Label.started')
            # update status
            Quality_Label.status = STARTED
            Quality_Label.setAutoDraw(True)
        
        # if Quality_Label is active this frame...
        if Quality_Label.status == STARTED:
            # update params
            pass
        
        # *Brand_Rep_Label* updates
        
        # if Brand_Rep_Label is starting this frame...
        if Brand_Rep_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Brand_Rep_Label.frameNStart = frameN  # exact frame index
            Brand_Rep_Label.tStart = t  # local t and not account for scr refresh
            Brand_Rep_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Brand_Rep_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Brand_Rep_Label.started')
            # update status
            Brand_Rep_Label.status = STARTED
            Brand_Rep_Label.setAutoDraw(True)
        
        # if Brand_Rep_Label is active this frame...
        if Brand_Rep_Label.status == STARTED:
            # update params
            pass
        
        # *Calories_Label* updates
        
        # if Calories_Label is starting this frame...
        if Calories_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Calories_Label.frameNStart = frameN  # exact frame index
            Calories_Label.tStart = t  # local t and not account for scr refresh
            Calories_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Calories_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Calories_Label.started')
            # update status
            Calories_Label.status = STARTED
            Calories_Label.setAutoDraw(True)
        
        # if Calories_Label is active this frame...
        if Calories_Label.status == STARTED:
            # update params
            pass
        
        # *Flavour_Label* updates
        
        # if Flavour_Label is starting this frame...
        if Flavour_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Flavour_Label.frameNStart = frameN  # exact frame index
            Flavour_Label.tStart = t  # local t and not account for scr refresh
            Flavour_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Flavour_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Flavour_Label.started')
            # update status
            Flavour_Label.status = STARTED
            Flavour_Label.setAutoDraw(True)
        
        # if Flavour_Label is active this frame...
        if Flavour_Label.status == STARTED:
            # update params
            pass
        
        # *Quality1* updates
        
        # if Quality1 is starting this frame...
        if Quality1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Quality1.frameNStart = frameN  # exact frame index
            Quality1.tStart = t  # local t and not account for scr refresh
            Quality1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Quality1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Quality1.started')
            # update status
            Quality1.status = STARTED
            Quality1.setAutoDraw(True)
        
        # if Quality1 is active this frame...
        if Quality1.status == STARTED:
            # update params
            pass
        
        # *Brand_Rep1* updates
        
        # if Brand_Rep1 is starting this frame...
        if Brand_Rep1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Brand_Rep1.frameNStart = frameN  # exact frame index
            Brand_Rep1.tStart = t  # local t and not account for scr refresh
            Brand_Rep1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Brand_Rep1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Brand_Rep1.started')
            # update status
            Brand_Rep1.status = STARTED
            Brand_Rep1.setAutoDraw(True)
        
        # if Brand_Rep1 is active this frame...
        if Brand_Rep1.status == STARTED:
            # update params
            pass
        
        # *Calories1* updates
        
        # if Calories1 is starting this frame...
        if Calories1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Calories1.frameNStart = frameN  # exact frame index
            Calories1.tStart = t  # local t and not account for scr refresh
            Calories1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Calories1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Calories1.started')
            # update status
            Calories1.status = STARTED
            Calories1.setAutoDraw(True)
        
        # if Calories1 is active this frame...
        if Calories1.status == STARTED:
            # update params
            pass
        
        # *Flavour1* updates
        
        # if Flavour1 is starting this frame...
        if Flavour1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Flavour1.frameNStart = frameN  # exact frame index
            Flavour1.tStart = t  # local t and not account for scr refresh
            Flavour1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Flavour1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Flavour1.started')
            # update status
            Flavour1.status = STARTED
            Flavour1.setAutoDraw(True)
        
        # if Flavour1 is active this frame...
        if Flavour1.status == STARTED:
            # update params
            pass
        
        # *Quality2* updates
        
        # if Quality2 is starting this frame...
        if Quality2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Quality2.frameNStart = frameN  # exact frame index
            Quality2.tStart = t  # local t and not account for scr refresh
            Quality2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Quality2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Quality2.started')
            # update status
            Quality2.status = STARTED
            Quality2.setAutoDraw(True)
        
        # if Quality2 is active this frame...
        if Quality2.status == STARTED:
            # update params
            pass
        
        # *Brand_Rep2* updates
        
        # if Brand_Rep2 is starting this frame...
        if Brand_Rep2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Brand_Rep2.frameNStart = frameN  # exact frame index
            Brand_Rep2.tStart = t  # local t and not account for scr refresh
            Brand_Rep2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Brand_Rep2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Brand_Rep2.started')
            # update status
            Brand_Rep2.status = STARTED
            Brand_Rep2.setAutoDraw(True)
        
        # if Brand_Rep2 is active this frame...
        if Brand_Rep2.status == STARTED:
            # update params
            pass
        
        # *Calories2* updates
        
        # if Calories2 is starting this frame...
        if Calories2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Calories2.frameNStart = frameN  # exact frame index
            Calories2.tStart = t  # local t and not account for scr refresh
            Calories2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Calories2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Calories2.started')
            # update status
            Calories2.status = STARTED
            Calories2.setAutoDraw(True)
        
        # if Calories2 is active this frame...
        if Calories2.status == STARTED:
            # update params
            pass
        
        # *Flavour2* updates
        
        # if Flavour2 is starting this frame...
        if Flavour2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Flavour2.frameNStart = frameN  # exact frame index
            Flavour2.tStart = t  # local t and not account for scr refresh
            Flavour2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Flavour2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Flavour2.started')
            # update status
            Flavour2.status = STARTED
            Flavour2.setAutoDraw(True)
        
        # if Flavour2 is active this frame...
        if Flavour2.status == STARTED:
            # update params
            pass
        # *mouse* updates
        
        # if mouse is starting this frame...
        if mouse.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            mouse.frameNStart = frameN  # exact frame index
            mouse.tStart = t  # local t and not account for scr refresh
            mouse.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouse, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('mouse.started', t)
            # update status
            mouse.status = STARTED
            mouse.mouseClock.reset()
            prevButtonState = mouse.getPressed()  # if button is down already this ISN'T a new click
        if mouse.status == STARTED:  # only update if started and not finished!
            buttons = mouse.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    clickableList = core.getFromNames([ImageProd1,ImageProd2])
                    for obj in clickableList:
                        # is this object clicked on?
                        if obj.contains(mouse):
                            gotValidClick = True
                            mouse.clicked_name.append(obj.name)
                    x, y = mouse.getPos()
                    mouse.x.append(x)
                    mouse.y.append(y)
                    buttons = mouse.getPressed()
                    mouse.leftButton.append(buttons[0])
                    mouse.midButton.append(buttons[1])
                    mouse.rightButton.append(buttons[2])
                    mouse.time.append(mouse.mouseClock.getTime())
        # Run 'Each Frame' code from code
        clickedN = 0
        current_time = globalClock.getTime()
        buttonsPressed = mouse.getPressed()
        # check if the mouse is pressed in any of the boxes
        for clickable in clickables:
            if mouse.isPressedIn(clickable):
                clicked_things.append(clickable.name)
        
        for clickable in clickables:
            if clickable.name in clicked_things:
                clickedN += 1
                choice=clickable.name
            if clickedN == 1 and not waiting:
                waiting = True
                startTime=t
        
        if clickedN == 1 and waiting:
            if t > startTime + 1:
                continueRoutine = False
        #elif buttonsPressed[2] and (current_time - last_click_time >= mouse_delay):
        #    choice = 'None'
        #    clicked_things.append(clickable.name)
        #    last_click_time = current_time
        #    continueRoutine = False
            
        
        #EyeGaze
        ETRECORD_FR.append(etRecord.pos)
        MOUSEGAZE.append([mouse.getPos()[0],mouse.getPos()[1]])
        TIMEGAZE.append( t )
        TIMEGAZE_1970.append( psychopy.core.getAbsTime() )
        ETRECORD_FRT.append([etRecord.pos,t])
        ETRECORD_FRT_1970.append([etRecord.pos, psychopy.core.getAbsTime() ])
        
        
        # if ET_Quality1 is starting this frame...
        if ET_Quality1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Quality1.frameNStart = frameN  # exact frame index
            ET_Quality1.tStart = t  # local t and not account for scr refresh
            ET_Quality1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Quality1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Quality1.started')
            # update status
            ET_Quality1.status = STARTED
            ET_Quality1.setAutoDraw(True)
        
        # if ET_Quality1 is active this frame...
        if ET_Quality1.status == STARTED:
            # update params
            pass
            # check whether ET_Quality1 has been looked in
            if ET_Quality1.isLookedIn:
                if not ET_Quality1.wasLookedIn:
                    ET_Quality1.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Quality1.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Quality1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality1.wasLookedIn = True  # if ET_Quality1 is still looked at next frame, it is not a new look
            else:
                if ET_Quality1.wasLookedIn:
                    ET_Quality1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality1.wasLookedIn = False  # if ET_Quality1 is looked at next frame, it is a new look
        else:
            ET_Quality1.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Quality1.wasLookedIn = False  # if ET_Quality1 is looked at next frame, it is a new look
        
        # if ET_BrandRep1 is starting this frame...
        if ET_BrandRep1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_BrandRep1.frameNStart = frameN  # exact frame index
            ET_BrandRep1.tStart = t  # local t and not account for scr refresh
            ET_BrandRep1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_BrandRep1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_BrandRep1.started')
            # update status
            ET_BrandRep1.status = STARTED
            ET_BrandRep1.setAutoDraw(True)
        
        # if ET_BrandRep1 is active this frame...
        if ET_BrandRep1.status == STARTED:
            # update params
            pass
            # check whether ET_BrandRep1 has been looked in
            if ET_BrandRep1.isLookedIn:
                if not ET_BrandRep1.wasLookedIn:
                    ET_BrandRep1.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_BrandRep1.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_BrandRep1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_BrandRep1.wasLookedIn = True  # if ET_BrandRep1 is still looked at next frame, it is not a new look
            else:
                if ET_BrandRep1.wasLookedIn:
                    ET_BrandRep1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_BrandRep1.wasLookedIn = False  # if ET_BrandRep1 is looked at next frame, it is a new look
        else:
            ET_BrandRep1.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_BrandRep1.wasLookedIn = False  # if ET_BrandRep1 is looked at next frame, it is a new look
        
        # if ET_Calories1 is starting this frame...
        if ET_Calories1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Calories1.frameNStart = frameN  # exact frame index
            ET_Calories1.tStart = t  # local t and not account for scr refresh
            ET_Calories1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Calories1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Calories1.started')
            # update status
            ET_Calories1.status = STARTED
            ET_Calories1.setAutoDraw(True)
        
        # if ET_Calories1 is active this frame...
        if ET_Calories1.status == STARTED:
            # update params
            pass
            # check whether ET_Calories1 has been looked in
            if ET_Calories1.isLookedIn:
                if not ET_Calories1.wasLookedIn:
                    ET_Calories1.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Calories1.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Calories1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories1.wasLookedIn = True  # if ET_Calories1 is still looked at next frame, it is not a new look
            else:
                if ET_Calories1.wasLookedIn:
                    ET_Calories1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories1.wasLookedIn = False  # if ET_Calories1 is looked at next frame, it is a new look
        else:
            ET_Calories1.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Calories1.wasLookedIn = False  # if ET_Calories1 is looked at next frame, it is a new look
        
        # if ET_Flavour1 is starting this frame...
        if ET_Flavour1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Flavour1.frameNStart = frameN  # exact frame index
            ET_Flavour1.tStart = t  # local t and not account for scr refresh
            ET_Flavour1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Flavour1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Flavour1.started')
            # update status
            ET_Flavour1.status = STARTED
            ET_Flavour1.setAutoDraw(True)
        
        # if ET_Flavour1 is active this frame...
        if ET_Flavour1.status == STARTED:
            # update params
            ET_Flavour1.setPos((xcoord2, locations[3][1]), log=False)
            # check whether ET_Flavour1 has been looked in
            if ET_Flavour1.isLookedIn:
                if not ET_Flavour1.wasLookedIn:
                    ET_Flavour1.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Flavour1.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Flavour1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour1.wasLookedIn = True  # if ET_Flavour1 is still looked at next frame, it is not a new look
            else:
                if ET_Flavour1.wasLookedIn:
                    ET_Flavour1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour1.wasLookedIn = False  # if ET_Flavour1 is looked at next frame, it is a new look
        else:
            ET_Flavour1.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Flavour1.wasLookedIn = False  # if ET_Flavour1 is looked at next frame, it is a new look
        
        # if ET_Quality2 is starting this frame...
        if ET_Quality2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Quality2.frameNStart = frameN  # exact frame index
            ET_Quality2.tStart = t  # local t and not account for scr refresh
            ET_Quality2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Quality2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Quality2.started')
            # update status
            ET_Quality2.status = STARTED
            ET_Quality2.setAutoDraw(True)
        
        # if ET_Quality2 is active this frame...
        if ET_Quality2.status == STARTED:
            # update params
            pass
            # check whether ET_Quality2 has been looked in
            if ET_Quality2.isLookedIn:
                if not ET_Quality2.wasLookedIn:
                    ET_Quality2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Quality2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Quality2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality2.wasLookedIn = True  # if ET_Quality2 is still looked at next frame, it is not a new look
            else:
                if ET_Quality2.wasLookedIn:
                    ET_Quality2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality2.wasLookedIn = False  # if ET_Quality2 is looked at next frame, it is a new look
        else:
            ET_Quality2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Quality2.wasLookedIn = False  # if ET_Quality2 is looked at next frame, it is a new look
        
        # if ET_Brand_Rep2 is starting this frame...
        if ET_Brand_Rep2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Brand_Rep2.frameNStart = frameN  # exact frame index
            ET_Brand_Rep2.tStart = t  # local t and not account for scr refresh
            ET_Brand_Rep2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Brand_Rep2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Brand_Rep2.started')
            # update status
            ET_Brand_Rep2.status = STARTED
            ET_Brand_Rep2.setAutoDraw(True)
        
        # if ET_Brand_Rep2 is active this frame...
        if ET_Brand_Rep2.status == STARTED:
            # update params
            pass
            # check whether ET_Brand_Rep2 has been looked in
            if ET_Brand_Rep2.isLookedIn:
                if not ET_Brand_Rep2.wasLookedIn:
                    ET_Brand_Rep2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Brand_Rep2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Brand_Rep2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Brand_Rep2.wasLookedIn = True  # if ET_Brand_Rep2 is still looked at next frame, it is not a new look
            else:
                if ET_Brand_Rep2.wasLookedIn:
                    ET_Brand_Rep2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Brand_Rep2.wasLookedIn = False  # if ET_Brand_Rep2 is looked at next frame, it is a new look
        else:
            ET_Brand_Rep2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Brand_Rep2.wasLookedIn = False  # if ET_Brand_Rep2 is looked at next frame, it is a new look
        
        # if ET_Calories2 is starting this frame...
        if ET_Calories2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Calories2.frameNStart = frameN  # exact frame index
            ET_Calories2.tStart = t  # local t and not account for scr refresh
            ET_Calories2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Calories2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Calories2.started')
            # update status
            ET_Calories2.status = STARTED
            ET_Calories2.setAutoDraw(True)
        
        # if ET_Calories2 is active this frame...
        if ET_Calories2.status == STARTED:
            # update params
            pass
            # check whether ET_Calories2 has been looked in
            if ET_Calories2.isLookedIn:
                if not ET_Calories2.wasLookedIn:
                    ET_Calories2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Calories2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Calories2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories2.wasLookedIn = True  # if ET_Calories2 is still looked at next frame, it is not a new look
            else:
                if ET_Calories2.wasLookedIn:
                    ET_Calories2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories2.wasLookedIn = False  # if ET_Calories2 is looked at next frame, it is a new look
        else:
            ET_Calories2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Calories2.wasLookedIn = False  # if ET_Calories2 is looked at next frame, it is a new look
        
        # if ET_Flavour2 is starting this frame...
        if ET_Flavour2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Flavour2.frameNStart = frameN  # exact frame index
            ET_Flavour2.tStart = t  # local t and not account for scr refresh
            ET_Flavour2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Flavour2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Flavour2.started')
            # update status
            ET_Flavour2.status = STARTED
            ET_Flavour2.setAutoDraw(True)
        
        # if ET_Flavour2 is active this frame...
        if ET_Flavour2.status == STARTED:
            # update params
            pass
            # check whether ET_Flavour2 has been looked in
            if ET_Flavour2.isLookedIn:
                if not ET_Flavour2.wasLookedIn:
                    ET_Flavour2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Flavour2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Flavour2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour2.wasLookedIn = True  # if ET_Flavour2 is still looked at next frame, it is not a new look
            else:
                if ET_Flavour2.wasLookedIn:
                    ET_Flavour2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour2.wasLookedIn = False  # if ET_Flavour2 is looked at next frame, it is a new look
        else:
            ET_Flavour2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Flavour2.wasLookedIn = False  # if ET_Flavour2 is looked at next frame, it is a new look
        
        # if ET_ImageProd1 is starting this frame...
        if ET_ImageProd1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_ImageProd1.frameNStart = frameN  # exact frame index
            ET_ImageProd1.tStart = t  # local t and not account for scr refresh
            ET_ImageProd1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_ImageProd1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_ImageProd1.started')
            # update status
            ET_ImageProd1.status = STARTED
            ET_ImageProd1.setAutoDraw(True)
        
        # if ET_ImageProd1 is active this frame...
        if ET_ImageProd1.status == STARTED:
            # update params
            pass
            # check whether ET_ImageProd1 has been looked in
            if ET_ImageProd1.isLookedIn:
                if not ET_ImageProd1.wasLookedIn:
                    ET_ImageProd1.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_ImageProd1.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_ImageProd1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_ImageProd1.wasLookedIn = True  # if ET_ImageProd1 is still looked at next frame, it is not a new look
            else:
                if ET_ImageProd1.wasLookedIn:
                    ET_ImageProd1.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_ImageProd1.wasLookedIn = False  # if ET_ImageProd1 is looked at next frame, it is a new look
        else:
            ET_ImageProd1.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_ImageProd1.wasLookedIn = False  # if ET_ImageProd1 is looked at next frame, it is a new look
        
        # if ET_ImageProd2 is starting this frame...
        if ET_ImageProd2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_ImageProd2.frameNStart = frameN  # exact frame index
            ET_ImageProd2.tStart = t  # local t and not account for scr refresh
            ET_ImageProd2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_ImageProd2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_ImageProd2.started')
            # update status
            ET_ImageProd2.status = STARTED
            ET_ImageProd2.setAutoDraw(True)
        
        # if ET_ImageProd2 is active this frame...
        if ET_ImageProd2.status == STARTED:
            # update params
            pass
            # check whether ET_ImageProd2 has been looked in
            if ET_ImageProd2.isLookedIn:
                if not ET_ImageProd2.wasLookedIn:
                    ET_ImageProd2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_ImageProd2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_ImageProd2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_ImageProd2.wasLookedIn = True  # if ET_ImageProd2 is still looked at next frame, it is not a new look
            else:
                if ET_ImageProd2.wasLookedIn:
                    ET_ImageProd2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_ImageProd2.wasLookedIn = False  # if ET_ImageProd2 is looked at next frame, it is a new look
        else:
            ET_ImageProd2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_ImageProd2.wasLookedIn = False  # if ET_ImageProd2 is looked at next frame, it is a new look
        
        # if ET_Quality_Label is starting this frame...
        if ET_Quality_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Quality_Label.frameNStart = frameN  # exact frame index
            ET_Quality_Label.tStart = t  # local t and not account for scr refresh
            ET_Quality_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Quality_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Quality_Label.started')
            # update status
            ET_Quality_Label.status = STARTED
            ET_Quality_Label.setAutoDraw(True)
        
        # if ET_Quality_Label is active this frame...
        if ET_Quality_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Quality_Label has been looked in
            if ET_Quality_Label.isLookedIn:
                if not ET_Quality_Label.wasLookedIn:
                    ET_Quality_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Quality_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Quality_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality_Label.wasLookedIn = True  # if ET_Quality_Label is still looked at next frame, it is not a new look
            else:
                if ET_Quality_Label.wasLookedIn:
                    ET_Quality_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Quality_Label.wasLookedIn = False  # if ET_Quality_Label is looked at next frame, it is a new look
        else:
            ET_Quality_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Quality_Label.wasLookedIn = False  # if ET_Quality_Label is looked at next frame, it is a new look
        
        # if ET_Brand_Rep_Label is starting this frame...
        if ET_Brand_Rep_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Brand_Rep_Label.frameNStart = frameN  # exact frame index
            ET_Brand_Rep_Label.tStart = t  # local t and not account for scr refresh
            ET_Brand_Rep_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Brand_Rep_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Brand_Rep_Label.started')
            # update status
            ET_Brand_Rep_Label.status = STARTED
            ET_Brand_Rep_Label.setAutoDraw(True)
        
        # if ET_Brand_Rep_Label is active this frame...
        if ET_Brand_Rep_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Brand_Rep_Label has been looked in
            if ET_Brand_Rep_Label.isLookedIn:
                if not ET_Brand_Rep_Label.wasLookedIn:
                    ET_Brand_Rep_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Brand_Rep_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Brand_Rep_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Brand_Rep_Label.wasLookedIn = True  # if ET_Brand_Rep_Label is still looked at next frame, it is not a new look
            else:
                if ET_Brand_Rep_Label.wasLookedIn:
                    ET_Brand_Rep_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Brand_Rep_Label.wasLookedIn = False  # if ET_Brand_Rep_Label is looked at next frame, it is a new look
        else:
            ET_Brand_Rep_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Brand_Rep_Label.wasLookedIn = False  # if ET_Brand_Rep_Label is looked at next frame, it is a new look
        
        # if ET_Calories_Label is starting this frame...
        if ET_Calories_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Calories_Label.frameNStart = frameN  # exact frame index
            ET_Calories_Label.tStart = t  # local t and not account for scr refresh
            ET_Calories_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Calories_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Calories_Label.started')
            # update status
            ET_Calories_Label.status = STARTED
            ET_Calories_Label.setAutoDraw(True)
        
        # if ET_Calories_Label is active this frame...
        if ET_Calories_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Calories_Label has been looked in
            if ET_Calories_Label.isLookedIn:
                if not ET_Calories_Label.wasLookedIn:
                    ET_Calories_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Calories_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Calories_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories_Label.wasLookedIn = True  # if ET_Calories_Label is still looked at next frame, it is not a new look
            else:
                if ET_Calories_Label.wasLookedIn:
                    ET_Calories_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Calories_Label.wasLookedIn = False  # if ET_Calories_Label is looked at next frame, it is a new look
        else:
            ET_Calories_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Calories_Label.wasLookedIn = False  # if ET_Calories_Label is looked at next frame, it is a new look
        
        # if ET_Flavour_Label is starting this frame...
        if ET_Flavour_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Flavour_Label.frameNStart = frameN  # exact frame index
            ET_Flavour_Label.tStart = t  # local t and not account for scr refresh
            ET_Flavour_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Flavour_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Flavour_Label.started')
            # update status
            ET_Flavour_Label.status = STARTED
            ET_Flavour_Label.setAutoDraw(True)
        
        # if ET_Flavour_Label is active this frame...
        if ET_Flavour_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Flavour_Label has been looked in
            if ET_Flavour_Label.isLookedIn:
                if not ET_Flavour_Label.wasLookedIn:
                    ET_Flavour_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Flavour_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Flavour_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour_Label.wasLookedIn = True  # if ET_Flavour_Label is still looked at next frame, it is not a new look
            else:
                if ET_Flavour_Label.wasLookedIn:
                    ET_Flavour_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Flavour_Label.wasLookedIn = False  # if ET_Flavour_Label is looked at next frame, it is a new look
        else:
            ET_Flavour_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Flavour_Label.wasLookedIn = False  # if ET_Flavour_Label is looked at next frame, it is a new look
        # *etRecord* updates
        
        # if etRecord is starting this frame...
        if etRecord.status == NOT_STARTED and t >= 0-frameTolerance:
            # keep track of start time/frame for later
            etRecord.frameNStart = frameN  # exact frame index
            etRecord.tStart = t  # local t and not account for scr refresh
            etRecord.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(etRecord, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('etRecord.started', t)
            # update status
            etRecord.status = STARTED
        
        # if etRecord is stopping this frame...
        if etRecord.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > etRecord.tStartRefresh + 0-frameTolerance:
                # keep track of stop time/frame for later
                etRecord.tStop = t  # not accounting for scr refresh
                etRecord.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.addData('etRecord.stopped', t)
                # update status
                etRecord.status = FINISHED
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in trialComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "trial" ---
    for thisComponent in trialComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # store data for trials (TrialHandler)
    trials.addData('mouse.x', mouse.x)
    trials.addData('mouse.y', mouse.y)
    trials.addData('mouse.leftButton', mouse.leftButton)
    trials.addData('mouse.midButton', mouse.midButton)
    trials.addData('mouse.rightButton', mouse.rightButton)
    trials.addData('mouse.time', mouse.time)
    trials.addData('mouse.clicked_name', mouse.clicked_name)
    # Run 'End Routine' code from code
    #print('Routine ending ',nLoop)
    thisExp.addData('Choice', choice)
    thisExp.addData('Trial', nLoop)
    #if nLoop>=Trials1:
    #    phase=2
    #trial duration
    thisExp.addData('TrialDuration', t - StartTimeRoutine )
    
    #stop recording
    my_eyetracker.unsubscribe_from(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    
    #eyetracker data
    thisExp.addData('ETRECORD_FR', ETRECORD_FR )
    thisExp.addData('ETRECORD_FR_TIME', ETRECORD_FRT )
    thisExp.addData('ETRECORD_1970_TIME', ETRECORD_FRT_1970 )
    thisExp.addData('LEFTPUPIL_FR', LEFTPUPIL_FR )
    thisExp.addData('RIGHTPUPIL_FR', RIGHTPUPIL_FR )
    thisExp.addData('TIME_GAZE', TIMEGAZE )
    thisExp.addData('TIME_GAZE_1970', TIMEGAZE_1970 )
    thisExp.addData('TIME_GAZE_TOBII', TIMEGAZETOB )
    thisExp.addData('MOUSE_GAZE', MOUSEGAZE )
    thisExp.addData('TOBII_GAZE', TOBIIGAZE )
    thisExp.addData('TOBII_GAZE_LEFT', TOBIIGAZEL )
    thisExp.addData('TOBII_GAZE_LEFT_TIME', TOBIIGAZELT )
    thisExp.addData('TOBII_GAZE_RIGHT', TOBIIGAZER )
    
    #eyetracker data
    thisExp.addData('Choice1', ImgProd1 )
    thisExp.addData('Choice2', ImgProd2 )
    thisExp.addData('Choice', choice )
    
    #sizedata
    thisExp.addData('imgsize', [ xsizeimg , ysizeimg ] )
    thisExp.addData('attsize', [ xsizele , ysizele ] )
    thisExp.addData('prodsize', [ xsizela , ysizela ] )
    thisExp.addData('regETsize', [ xETreg, yETreg ] )
    
    #locations labels choices
    thisExp.addData('Product1', product1 )
    thisExp.addData('Product2', product2 )
    
    #locations labels choices
    thisExp.addData('Loc_Img_Prod1', [ xcoord2 , ycoord1 ] )
    thisExp.addData('Loc_Img_Prod1', [ xcoord3 , ycoord1 ] )
    
    #locations labels choices
    thisExp.addData('Loc_Quality_Label', [ xcoord1 , ycoord2 ] )
    thisExp.addData('Loc_Brand_Rep_Label', [ xcoord1 , ycoord3 ] )
    thisExp.addData('Loc_Calories_Label', [ xcoord1 , ycoord4 ] )
    thisExp.addData('Loc_Flavour_Label', [ xcoord1 , ycoord5 ] )
    
    #locations prod1 values
    thisExp.addData('Loc_Quality_Prod1', [ xcoord2 , ycoord2 ] )
    thisExp.addData('Loc_Brand_Rep_Prod1', [ xcoord2 , ycoord3 ] )
    thisExp.addData('Loc_Calories_Prod1', [ xcoord2 , ycoord4 ] )
    thisExp.addData('Loc_Flavour_Prod1', [ xcoord2 , ycoord5 ] )
    
    #locations prod2 values
    thisExp.addData('Loc_Quality_Prod1', [ xcoord3 , ycoord2 ] )
    thisExp.addData('Loc_Brand_Rep_Prod1', [ xcoord3 , ycoord3 ] )
    thisExp.addData('Loc_Calories_Prod1', [ xcoord3 , ycoord4 ] )
    thisExp.addData('Loc_Flavour_Prod1', [ xcoord3 , ycoord5 ] )
    
    #empezar condición para sgte trial
    #if (phase == 2) and (nLoop % Recurrency == 0):
    #    while locations == shuffle(locations):
    #        print(locations)
    #nLoop+=1
    
    trials.addData('ET_Quality1.numLooks', ET_Quality1.numLooks)
    if ET_Quality1.numLooks:
       trials.addData('ET_Quality1.timesOn', ET_Quality1.timesOn)
       trials.addData('ET_Quality1.timesOff', ET_Quality1.timesOff)
    else:
       trials.addData('ET_Quality1.timesOn', "")
       trials.addData('ET_Quality1.timesOff', "")
    trials.addData('ET_BrandRep1.numLooks', ET_BrandRep1.numLooks)
    if ET_BrandRep1.numLooks:
       trials.addData('ET_BrandRep1.timesOn', ET_BrandRep1.timesOn)
       trials.addData('ET_BrandRep1.timesOff', ET_BrandRep1.timesOff)
    else:
       trials.addData('ET_BrandRep1.timesOn', "")
       trials.addData('ET_BrandRep1.timesOff', "")
    trials.addData('ET_Calories1.numLooks', ET_Calories1.numLooks)
    if ET_Calories1.numLooks:
       trials.addData('ET_Calories1.timesOn', ET_Calories1.timesOn)
       trials.addData('ET_Calories1.timesOff', ET_Calories1.timesOff)
    else:
       trials.addData('ET_Calories1.timesOn', "")
       trials.addData('ET_Calories1.timesOff', "")
    trials.addData('ET_Flavour1.numLooks', ET_Flavour1.numLooks)
    if ET_Flavour1.numLooks:
       trials.addData('ET_Flavour1.timesOn', ET_Flavour1.timesOn)
       trials.addData('ET_Flavour1.timesOff', ET_Flavour1.timesOff)
    else:
       trials.addData('ET_Flavour1.timesOn', "")
       trials.addData('ET_Flavour1.timesOff', "")
    trials.addData('ET_Quality2.numLooks', ET_Quality2.numLooks)
    if ET_Quality2.numLooks:
       trials.addData('ET_Quality2.timesOn', ET_Quality2.timesOn)
       trials.addData('ET_Quality2.timesOff', ET_Quality2.timesOff)
    else:
       trials.addData('ET_Quality2.timesOn', "")
       trials.addData('ET_Quality2.timesOff', "")
    trials.addData('ET_Brand_Rep2.numLooks', ET_Brand_Rep2.numLooks)
    if ET_Brand_Rep2.numLooks:
       trials.addData('ET_Brand_Rep2.timesOn', ET_Brand_Rep2.timesOn)
       trials.addData('ET_Brand_Rep2.timesOff', ET_Brand_Rep2.timesOff)
    else:
       trials.addData('ET_Brand_Rep2.timesOn', "")
       trials.addData('ET_Brand_Rep2.timesOff', "")
    trials.addData('ET_Calories2.numLooks', ET_Calories2.numLooks)
    if ET_Calories2.numLooks:
       trials.addData('ET_Calories2.timesOn', ET_Calories2.timesOn)
       trials.addData('ET_Calories2.timesOff', ET_Calories2.timesOff)
    else:
       trials.addData('ET_Calories2.timesOn', "")
       trials.addData('ET_Calories2.timesOff', "")
    trials.addData('ET_Flavour2.numLooks', ET_Flavour2.numLooks)
    if ET_Flavour2.numLooks:
       trials.addData('ET_Flavour2.timesOn', ET_Flavour2.timesOn)
       trials.addData('ET_Flavour2.timesOff', ET_Flavour2.timesOff)
    else:
       trials.addData('ET_Flavour2.timesOn', "")
       trials.addData('ET_Flavour2.timesOff', "")
    trials.addData('ET_ImageProd1.numLooks', ET_ImageProd1.numLooks)
    if ET_ImageProd1.numLooks:
       trials.addData('ET_ImageProd1.timesOn', ET_ImageProd1.timesOn)
       trials.addData('ET_ImageProd1.timesOff', ET_ImageProd1.timesOff)
    else:
       trials.addData('ET_ImageProd1.timesOn', "")
       trials.addData('ET_ImageProd1.timesOff', "")
    trials.addData('ET_ImageProd2.numLooks', ET_ImageProd2.numLooks)
    if ET_ImageProd2.numLooks:
       trials.addData('ET_ImageProd2.timesOn', ET_ImageProd2.timesOn)
       trials.addData('ET_ImageProd2.timesOff', ET_ImageProd2.timesOff)
    else:
       trials.addData('ET_ImageProd2.timesOn', "")
       trials.addData('ET_ImageProd2.timesOff', "")
    trials.addData('ET_Quality_Label.numLooks', ET_Quality_Label.numLooks)
    if ET_Quality_Label.numLooks:
       trials.addData('ET_Quality_Label.timesOn', ET_Quality_Label.timesOn)
       trials.addData('ET_Quality_Label.timesOff', ET_Quality_Label.timesOff)
    else:
       trials.addData('ET_Quality_Label.timesOn', "")
       trials.addData('ET_Quality_Label.timesOff', "")
    trials.addData('ET_Brand_Rep_Label.numLooks', ET_Brand_Rep_Label.numLooks)
    if ET_Brand_Rep_Label.numLooks:
       trials.addData('ET_Brand_Rep_Label.timesOn', ET_Brand_Rep_Label.timesOn)
       trials.addData('ET_Brand_Rep_Label.timesOff', ET_Brand_Rep_Label.timesOff)
    else:
       trials.addData('ET_Brand_Rep_Label.timesOn', "")
       trials.addData('ET_Brand_Rep_Label.timesOff', "")
    trials.addData('ET_Calories_Label.numLooks', ET_Calories_Label.numLooks)
    if ET_Calories_Label.numLooks:
       trials.addData('ET_Calories_Label.timesOn', ET_Calories_Label.timesOn)
       trials.addData('ET_Calories_Label.timesOff', ET_Calories_Label.timesOff)
    else:
       trials.addData('ET_Calories_Label.timesOn', "")
       trials.addData('ET_Calories_Label.timesOff', "")
    trials.addData('ET_Flavour_Label.numLooks', ET_Flavour_Label.numLooks)
    if ET_Flavour_Label.numLooks:
       trials.addData('ET_Flavour_Label.timesOn', ET_Flavour_Label.timesOn)
       trials.addData('ET_Flavour_Label.timesOff', ET_Flavour_Label.timesOff)
    else:
       trials.addData('ET_Flavour_Label.timesOn', "")
       trials.addData('ET_Flavour_Label.timesOff', "")
    # make sure the eyetracker recording stops
    if etRecord.status != FINISHED:
        etRecord.status = FINISHED
    # the Routine "trial" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    
    # --- Prepare to start Routine "blank" ---
    continueRoutine = True
    # update component parameters for each repeat
    TextB.setText('')
    # Run 'Begin Routine' code from code_2
    bkgcolor=[0,0,0.3]
    win.setColor(bkgcolor)
    
    # keep track of which components have finished
    blankComponents = [TextB]
    for thisComponent in blankComponents:
        thisComponent.tStart = None
        thisComponent.tStop = None
        thisComponent.tStartRefresh = None
        thisComponent.tStopRefresh = None
        if hasattr(thisComponent, 'status'):
            thisComponent.status = NOT_STARTED
    # reset timers
    t = 0
    _timeToFirstFrame = win.getFutureFlipTime(clock="now")
    frameN = -1
    
    # --- Run Routine "blank" ---
    routineForceEnded = not continueRoutine
    while continueRoutine and routineTimer.getTime() < 0.5:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *TextB* updates
        
        # if TextB is starting this frame...
        if TextB.status == NOT_STARTED and tThisFlip >= 0-frameTolerance:
            # keep track of start time/frame for later
            TextB.frameNStart = frameN  # exact frame index
            TextB.tStart = t  # local t and not account for scr refresh
            TextB.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(TextB, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'TextB.started')
            # update status
            TextB.status = STARTED
            TextB.setAutoDraw(True)
        
        # if TextB is active this frame...
        if TextB.status == STARTED:
            # update params
            pass
        
        # if TextB is stopping this frame...
        if TextB.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > TextB.tStartRefresh + 0.5-frameTolerance:
                # keep track of stop time/frame for later
                TextB.tStop = t  # not accounting for scr refresh
                TextB.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'TextB.stopped')
                # update status
                TextB.status = FINISHED
                TextB.setAutoDraw(False)
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in blankComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "blank" ---
    for thisComponent in blankComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
    if routineForceEnded:
        routineTimer.reset()
    else:
        routineTimer.addTime(-0.500000)
    thisExp.nextEntry()
    
# completed 3.0 repeats of 'trials'


# --- Prepare to start Routine "End" ---
continueRoutine = True
# update component parameters for each repeat
Msg.reset()
# Run 'Begin Routine' code from code_3
bkgcolor=[0,0,0.2]
win.setColor(bkgcolor)
# keep track of which components have finished
EndComponents = [Msg]
for thisComponent in EndComponents:
    thisComponent.tStart = None
    thisComponent.tStop = None
    thisComponent.tStartRefresh = None
    thisComponent.tStopRefresh = None
    if hasattr(thisComponent, 'status'):
        thisComponent.status = NOT_STARTED
# reset timers
t = 0
_timeToFirstFrame = win.getFutureFlipTime(clock="now")
frameN = -1

# --- Run Routine "End" ---
routineForceEnded = not continueRoutine
while continueRoutine and routineTimer.getTime() < 2.0:
    # get current time
    t = routineTimer.getTime()
    tThisFlip = win.getFutureFlipTime(clock=routineTimer)
    tThisFlipGlobal = win.getFutureFlipTime(clock=None)
    frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
    # update/draw components on each frame
    
    # *Msg* updates
    
    # if Msg is starting this frame...
    if Msg.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
        # keep track of start time/frame for later
        Msg.frameNStart = frameN  # exact frame index
        Msg.tStart = t  # local t and not account for scr refresh
        Msg.tStartRefresh = tThisFlipGlobal  # on global time
        win.timeOnFlip(Msg, 'tStartRefresh')  # time at next scr refresh
        # add timestamp to datafile
        thisExp.timestampOnFlip(win, 'Msg.started')
        # update status
        Msg.status = STARTED
        Msg.setAutoDraw(True)
    
    # if Msg is active this frame...
    if Msg.status == STARTED:
        # update params
        pass
    
    # if Msg is stopping this frame...
    if Msg.status == STARTED:
        # is it time to stop? (based on global clock, using actual start)
        if tThisFlipGlobal > Msg.tStartRefresh + 2-frameTolerance:
            # keep track of stop time/frame for later
            Msg.tStop = t  # not accounting for scr refresh
            Msg.frameNStop = frameN  # exact frame index
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Msg.stopped')
            # update status
            Msg.status = FINISHED
            Msg.setAutoDraw(False)
    
    # check for quit (typically the Esc key)
    if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
        core.quit()
    
    # check if all components have finished
    if not continueRoutine:  # a component has requested a forced-end of Routine
        routineForceEnded = True
        break
    continueRoutine = False  # will revert to True if at least one component still running
    for thisComponent in EndComponents:
        if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
            continueRoutine = True
            break  # at least one component has not yet finished
    
    # refresh the screen
    if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
        win.flip()

# --- Ending Routine "End" ---
for thisComponent in EndComponents:
    if hasattr(thisComponent, "setAutoDraw"):
        thisComponent.setAutoDraw(False)
# using non-slip timing so subtract the expected duration of this Routine (unless ended on request)
if routineForceEnded:
    routineTimer.reset()
else:
    routineTimer.addTime(-2.000000)
# Run 'End Experiment' code from code
#intento no borrar eyetracker
#my_eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
#Test.finished= True

# --- End experiment ---
# Flip one final time so any remaining win.callOnFlip() 
# and win.timeOnFlip() tasks get executed before quitting
win.flip()

# these shouldn't be strictly necessary (should auto-save)
thisExp.saveAsWideText(filename+'.csv', delim='auto')
thisExp.saveAsPickle(filename)
logging.flush()
# make sure everything is closed down
if eyetracker:
    eyetracker.setConnectionState(False)
thisExp.abort()  # or data files will save again on exit
win.close()
core.quit()
