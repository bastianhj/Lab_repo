#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.0),
    on September 05, 2024, at 16:25
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
Trials1=15
Trials2=15
Trials=Trials1+Trials2
#pid=int(expInfo['participant'])

#locations params
distance_sepx1 = 0.25
distance_sepy = 0.3
distance_sepx2 = (distance_sepx1)*2 + distance_sepx1
xcoord1 = - (distance_sepx2)
xcoord2 = - (distance_sepx1)
xcoord3 = (distance_sepx1)
xcoord4 = (distance_sepx2)
#size params
xsizele = 0.2
ysizele = 0.1
xsizela = 0.25
ysizela = 0.1
xETreg = 0.3
yETreg = 0.2

ycoord1 = 2*(distance_sepy)
ycoord2 = distance_sepy
ycoord3 = 0
ycoord4 = - distance_sepy
ycoord5 = - 2*(distance_sepy)

loc1 = [xcoord1, ycoord2];
loc2 = [xcoord1, ycoord3];
loc3 = [xcoord1, (ycoord4)];
loc4 = [xcoord1, (ycoord5)];

#locations labels - previous ones
#loc1 = [ -0.67, 0.33 ]
#loc2 = [ -0.67, 0 ]
#loc3 = [ -0.67, -0.33 ]
#loc4 = [ -0.67, -0.67 ]
locations = [loc1, loc2, loc3, loc4]
shuffle(locations)

#colors
color1 = [0.8216, 0.7412, 0.2039]
color2 = [0.6471, 0.4118, 0.0980]
color3 = [0.4824, 0.4353, -0.1608] #-0.16
color4 = [1.000, 0.4112, 0.3569]
colors = [color1, color2, color3, color4]
shuffle(colors)

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
    originPath='C:\\Users\\Seba\\Desktop\\TESIS 2024\\Experiment\\Attention_expParameters_lastrun.py',
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
    image='Images_Attention/StartButton.png', mask=None, anchor='center',
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
Color1 = visual.Rect(
    win=win, name='Color1',units='norm', 
    width=(1.8, 0.125)[0], height=(1.8, 0.125)[1],
    ori=0.0, pos=[0,0], anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor=None, fillColor='white',
    opacity=None, depth=0.0, interpolate=True)
Color2 = visual.Rect(
    win=win, name='Color2',units='norm', 
    width=(1.8, 0.125)[0], height=(1.8, 0.125)[1],
    ori=0.0, pos=[0,0], anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor=None, fillColor='white',
    opacity=None, depth=-1.0, interpolate=True)
Color3 = visual.Rect(
    win=win, name='Color3',units='norm', 
    width=(1.8, 0.125)[0], height=(1.8, 0.125)[1],
    ori=0.0, pos=[0,0], anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor=None, fillColor='white',
    opacity=None, depth=-2.0, interpolate=True)
Color4 = visual.Rect(
    win=win, name='Color4',units='norm', 
    width=(1.8, 0.125)[0], height=(1.8, 0.125)[1],
    ori=0.0, pos=[0,0], anchor='center',
    lineWidth=1.0,     colorSpace='rgb',  lineColor=None, fillColor='white',
    opacity=None, depth=-3.0, interpolate=True)
Bus_label = visual.ImageStim(
    win=win,
    name='Bus_label', units='norm', 
    image='Images_Attention/response_Bus.png', mask=None, anchor='center',
    ori=0.0, pos=(xcoord2, ycoord1), size=(xsizela , ysizela),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-4.0)
Metro_label = visual.ImageStim(
    win=win,
    name='Metro_label', units='norm', 
    image='Images_Attention/response_Metro.png', mask=None, anchor='center',
    ori=0.0, pos=(xcoord3, ycoord1), size=(xsizela , ysizela),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-5.0)
RH_label = visual.ImageStim(
    win=win,
    name='RH_label', units='norm', 
    image='Images_Attention/response_RH.png', mask=None, anchor='center',
    ori=0.0, pos=(xcoord4, ycoord1), size=(xsizela , ysizela),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-6.0)
None_2 = visual.ImageStim(
    win=win,
    name='None_2', units='norm', 
    image='Images_Attention/response_None.png', mask=None, anchor='center',
    ori=0.0, pos=(1.5, 1.5), size=(xsizela , ysizela),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=-7.0)
Cost_bus = visual.TextBox2(
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
     name='Cost_bus',
     depth=-8, autoLog=True,
)
Cost_metro = visual.TextBox2(
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
     name='Cost_metro',
     depth=-9, autoLog=True,
)
Cost_RH = visual.TextBox2(
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
     name='Cost_RH',
     depth=-10, autoLog=True,
)
Time_bus = visual.TextBox2(
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
     name='Time_bus',
     depth=-11, autoLog=True,
)
Time_metro = visual.TextBox2(
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
     name='Time_metro',
     depth=-12, autoLog=True,
)
Time_RH = visual.TextBox2(
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
     name='Time_RH',
     depth=-13, autoLog=True,
)
Comfort_bus = visual.TextBox2(
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
     name='Comfort_bus',
     depth=-14, autoLog=True,
)
Comfort_metro = visual.TextBox2(
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
     name='Comfort_metro',
     depth=-15, autoLog=True,
)
Comfort_RH = visual.TextBox2(
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
     name='Comfort_RH',
     depth=-16, autoLog=True,
)
CO2_bus = visual.TextBox2(
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
     name='CO2_bus',
     depth=-17, autoLog=True,
)
CO2_metro = visual.TextBox2(
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
     name='CO2_metro',
     depth=-18, autoLog=True,
)
CO2_RH = visual.TextBox2(
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
     name='CO2_RH',
     depth=-19, autoLog=True,
)
Cost_label = visual.TextBox2(
     win, text='Cost\n(US)', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='white', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor=None, borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Cost_label',
     depth=-20, autoLog=True,
)
Time_label = visual.TextBox2(
     win, text='Time\n(min)', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='white', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor=None, borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Time_label',
     depth=-21, autoLog=True,
)
Comfort_label = visual.TextBox2(
     win, text='Comfort\n(0 to 5 stars)', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='white', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor=None, borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='Comfort_label',
     depth=-22, autoLog=True,
)
CO2_label = visual.TextBox2(
     win, text='Pollution\n(trees)', placeholder='Type here...', font='Open Sans',
     pos=[0,0],units='norm',     letterHeight=0.05,
     size=(xsizele , ysizele), borderWidth=2.0,
     color='white', colorSpace='rgb',
     opacity=None,
     bold=False, italic=False,
     lineSpacing=1.0, speechPoint=None,
     padding=0.0, alignment='center',
     anchor='center', overflow='visible',
     fillColor=None, borderColor=None,
     flipHoriz=False, flipVert=False, languageStyle='LTR',
     editable=False,
     name='CO2_label',
     depth=-23, autoLog=True,
)
mouse = event.Mouse(win=win)
x, y = [None, None]
mouse.mouseClock = core.Clock()
# Run 'Begin Experiment' code from code
print('Exp starting')
pid = int(expInfo['participant']) #id participante
useRows = str(Trials*(pid-1))+':'+str(Trials*(pid-1)+(Trials)) #trials

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

ET_Bus_Label = visual.ROI(win, name='ET_Bus_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-26
    )
ET_Metro_Label = visual.ROI(win, name='ET_Metro_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-27
    )
ET_RH_Label = visual.ROI(win, name='ET_RH_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-28
    )
ET_None_Label = visual.ROI(win, name='ET_None_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-29
    )
ET_Cost_Label = visual.ROI(win, name='ET_Cost_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-30
    )
ET_Time_Label = visual.ROI(win, name='ET_Time_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-31
    )
ET_Comfort_Label = visual.ROI(win, name='ET_Comfort_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-32
    )
ET_CO2_Label = visual.ROI(win, name='ET_CO2_Label', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-33
    )
ET_Bus_Cost = visual.ROI(win, name='ET_Bus_Cost', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-34
    )
ET_Metro_Cost = visual.ROI(win, name='ET_Metro_Cost', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-35
    )
ET_RH_Cost = visual.ROI(win, name='ET_RH_Cost', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-36
    )
ET_Bus_Time = visual.ROI(win, name='ET_Bus_Time', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-37
    )
ET_Metro_Time = visual.ROI(win, name='ET_Metro_Time', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(0.3, 0.2), 
    anchor='center', ori=0.0, depth=-38
    )
ET_RH_Time = visual.ROI(win, name='ET_RH_Time', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-39
    )
ET_Bus_Comfort = visual.ROI(win, name='ET_Bus_Comfort', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-40
    )
ET_Metro_Comfort = visual.ROI(win, name='ET_Metro_Comfort', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-41
    )
ET_RH_Comfort = visual.ROI(win, name='ET_RH_Comfort', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-42
    )
ET_Bus_CO2 = visual.ROI(win, name='ET_Bus_CO2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-43
    )
ET_Metro_CO2 = visual.ROI(win, name='ET_Metro_CO2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-44
    )
ET_RH_CO2 = visual.ROI(win, name='ET_RH_CO2', device=eyetracker,
    debug=False,
    shape='rectangle',
    pos=[0,0], size=(xETreg , yETreg), 
    anchor='center', ori=0.0, depth=-45
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
trials = data.TrialHandler(nReps=1.0, method='sequential', 
    extraInfo=expInfo, originPath=-1,
    trialList=data.importConditions('DataCHP.csv', selection=useRows),
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
    Color1.setFillColor(colors[0])
    Color1.setPos((0, locations[0][1]))
    Color2.setFillColor(colors[1])
    Color2.setPos((0, locations[1][1]))
    Color3.setFillColor(colors[2])
    Color3.setPos((0, locations[2][1]))
    Color4.setFillColor(colors[3])
    Color4.setPos((0, locations[3][1]))
    Cost_bus.reset()
    Cost_bus.setPos((xcoord2, locations[0][1]))
    Cost_bus.setText('')
    Cost_metro.reset()
    Cost_metro.setPos((xcoord3, locations[0][1]))
    Cost_metro.setText('')
    Cost_RH.reset()
    Cost_RH.setPos((xcoord4, locations[0][1]))
    Cost_RH.setText('')
    Time_bus.reset()
    Time_bus.setPos((xcoord2, locations[1][1]))
    Time_bus.setText('')
    Time_metro.reset()
    Time_metro.setPos((xcoord3, locations[1][1]))
    Time_metro.setText('')
    Time_RH.reset()
    Time_RH.setPos((xcoord4, locations[1][1]))
    Time_RH.setText('')
    Comfort_bus.reset()
    Comfort_bus.setPos((xcoord2, locations[2][1]))
    Comfort_bus.setText('')
    Comfort_metro.reset()
    Comfort_metro.setPos((xcoord3, locations[2][1]))
    Comfort_metro.setText('')
    Comfort_RH.reset()
    Comfort_RH.setPos((xcoord4, locations[2][1]))
    Comfort_RH.setText('')
    CO2_bus.reset()
    CO2_bus.setPos((xcoord2, locations[3][1]))
    CO2_bus.setText('')
    CO2_metro.reset()
    CO2_metro.setPos((xcoord3, locations[3][1]))
    CO2_metro.setText('')
    CO2_RH.reset()
    CO2_RH.setPos((xcoord4, locations[3][1]))
    CO2_RH.setText('')
    Cost_label.reset()
    Cost_label.setPos((locations[0][0], locations[0][1]))
    Time_label.reset()
    Time_label.setPos((locations[1][0], locations[1][1]))
    Comfort_label.reset()
    Comfort_label.setPos((locations[2][0], locations[2][1]))
    CO2_label.reset()
    CO2_label.setPos((locations[3][0], locations[3][1]))
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
    bkgcolor=[0,0,0.3]
    win.setColor(bkgcolor)
    clicked_things = []
    clickables = [Bus_label, Metro_label, RH_label]
    waiting = False
    ETRECORD_FR = []
    LEFTPUPIL_FR = []
    RIGHTPUPIL_FR = []
    TIMEGAZE = []
    MOUSEGAZE = []
    StartTimeRoutine = t
    
    #------------------NEWET------------------------
    # This will be called every time there is new gaze data
    def gaze_data_callback(gaze_data):
         #Extract the data we are interested in
        tg = gaze_data.system_time_stamp
        lp = gaze_data.left_eye.pupil.diameter
        rp = gaze_data.right_eye.pupil.diameter
        # Add gaze data to the buffer 
        LEFTPUPIL_FR.append(lp)
        RIGHTPUPIL_FR.append(rp)
        TIMEGAZE.append(tg)
    # Start the callback function-----------
    my_eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    #-----------------------------------------------
    
    Cost_bus.text=Bus_cost
    #Cost_Bus_Shown = Bus_cost
    Cost_metro.text=metro_cost
    #Cost_metro_Shown = metro_cost
    Cost_RH.text=RH_cost
    #Cost_RH_Shown = RH_cost
    
    ## attributes bus-----------------------------
    Time_bus.text=Bus_travel_time#[nLoop]
    Comfort_bus.text=Bus_Comfort#[nLoop]
    CO2_bus.text=Bus_CO2#[nLoop]
    
    ## attributes metro
    Time_metro.text=metro_travel_time#[nLoop]
    Comfort_metro.text=metro_Comfort#[nLoop]
    CO2_metro.text=metro_CO2#[nLoop]
    
    ##atributes RH
    Time_RH.text=RH_travel_time#[nLoop]
    Comfort_RH.text=RH_Comfort#[nLoop]
    CO2_RH.text=RH_CO2#[nLoop]
    
    ET_Bus_Label.setPos((xcoord2, ycoord1))
    # clear any previous roi data
    ET_Bus_Label.reset()
    ET_Metro_Label.setPos((xcoord3, ycoord1))
    # clear any previous roi data
    ET_Metro_Label.reset()
    ET_RH_Label.setPos((xcoord4, ycoord1))
    # clear any previous roi data
    ET_RH_Label.reset()
    # clear any previous roi data
    ET_None_Label.reset()
    ET_Cost_Label.setPos((locations[0][0], locations[0][1]))
    # clear any previous roi data
    ET_Cost_Label.reset()
    ET_Time_Label.setPos((locations[1][0], locations[1][1]))
    # clear any previous roi data
    ET_Time_Label.reset()
    ET_Comfort_Label.setPos((locations[2][0], locations[2][1]))
    # clear any previous roi data
    ET_Comfort_Label.reset()
    ET_CO2_Label.setPos((locations[3][0], locations[3][1]))
    # clear any previous roi data
    ET_CO2_Label.reset()
    ET_Bus_Cost.setPos((xcoord2, locations[0][1]))
    # clear any previous roi data
    ET_Bus_Cost.reset()
    ET_Metro_Cost.setPos(( xcoord3, locations[0][1]))
    # clear any previous roi data
    ET_Metro_Cost.reset()
    ET_RH_Cost.setPos((xcoord4, locations[0][1]))
    # clear any previous roi data
    ET_RH_Cost.reset()
    ET_Bus_Time.setPos((xcoord2, locations[1][1]))
    # clear any previous roi data
    ET_Bus_Time.reset()
    ET_Metro_Time.setPos(( xcoord3, locations[1][1]))
    # clear any previous roi data
    ET_Metro_Time.reset()
    ET_RH_Time.setPos((xcoord4, locations[1][1]))
    # clear any previous roi data
    ET_RH_Time.reset()
    ET_Bus_Comfort.setPos((xcoord2, locations[2][1]))
    # clear any previous roi data
    ET_Bus_Comfort.reset()
    ET_Metro_Comfort.setPos(( xcoord3, locations[2][1]))
    # clear any previous roi data
    ET_Metro_Comfort.reset()
    ET_RH_Comfort.setPos((xcoord4, locations[2][1]))
    # clear any previous roi data
    ET_RH_Comfort.reset()
    ET_Bus_CO2.setPos((xcoord2, locations[3][1]))
    # clear any previous roi data
    ET_Bus_CO2.reset()
    ET_Metro_CO2.setPos(( xcoord3, locations[3][1]))
    # clear any previous roi data
    ET_Metro_CO2.reset()
    ET_RH_CO2.setPos((xcoord4, locations[3][1]))
    # clear any previous roi data
    ET_RH_CO2.reset()
    # keep track of which components have finished
    trialComponents = [Color1, Color2, Color3, Color4, Bus_label, Metro_label, RH_label, None_2, Cost_bus, Cost_metro, Cost_RH, Time_bus, Time_metro, Time_RH, Comfort_bus, Comfort_metro, Comfort_RH, CO2_bus, CO2_metro, CO2_RH, Cost_label, Time_label, Comfort_label, CO2_label, mouse, ET_Bus_Label, ET_Metro_Label, ET_RH_Label, ET_None_Label, ET_Cost_Label, ET_Time_Label, ET_Comfort_Label, ET_CO2_Label, ET_Bus_Cost, ET_Metro_Cost, ET_RH_Cost, ET_Bus_Time, ET_Metro_Time, ET_RH_Time, ET_Bus_Comfort, ET_Metro_Comfort, ET_RH_Comfort, ET_Bus_CO2, ET_Metro_CO2, ET_RH_CO2, etRecord]
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
        
        # *Color1* updates
        
        # if Color1 is starting this frame...
        if Color1.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Color1.frameNStart = frameN  # exact frame index
            Color1.tStart = t  # local t and not account for scr refresh
            Color1.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Color1, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Color1.started')
            # update status
            Color1.status = STARTED
            Color1.setAutoDraw(True)
        
        # if Color1 is active this frame...
        if Color1.status == STARTED:
            # update params
            pass
        
        # *Color2* updates
        
        # if Color2 is starting this frame...
        if Color2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Color2.frameNStart = frameN  # exact frame index
            Color2.tStart = t  # local t and not account for scr refresh
            Color2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Color2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Color2.started')
            # update status
            Color2.status = STARTED
            Color2.setAutoDraw(True)
        
        # if Color2 is active this frame...
        if Color2.status == STARTED:
            # update params
            pass
        
        # *Color3* updates
        
        # if Color3 is starting this frame...
        if Color3.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Color3.frameNStart = frameN  # exact frame index
            Color3.tStart = t  # local t and not account for scr refresh
            Color3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Color3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Color3.started')
            # update status
            Color3.status = STARTED
            Color3.setAutoDraw(True)
        
        # if Color3 is active this frame...
        if Color3.status == STARTED:
            # update params
            pass
        
        # *Color4* updates
        
        # if Color4 is starting this frame...
        if Color4.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Color4.frameNStart = frameN  # exact frame index
            Color4.tStart = t  # local t and not account for scr refresh
            Color4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Color4, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Color4.started')
            # update status
            Color4.status = STARTED
            Color4.setAutoDraw(True)
        
        # if Color4 is active this frame...
        if Color4.status == STARTED:
            # update params
            pass
        
        # *Bus_label* updates
        
        # if Bus_label is starting this frame...
        if Bus_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Bus_label.frameNStart = frameN  # exact frame index
            Bus_label.tStart = t  # local t and not account for scr refresh
            Bus_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Bus_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Bus_label.started')
            # update status
            Bus_label.status = STARTED
            Bus_label.setAutoDraw(True)
        
        # if Bus_label is active this frame...
        if Bus_label.status == STARTED:
            # update params
            pass
        
        # *Metro_label* updates
        
        # if Metro_label is starting this frame...
        if Metro_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Metro_label.frameNStart = frameN  # exact frame index
            Metro_label.tStart = t  # local t and not account for scr refresh
            Metro_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Metro_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Metro_label.started')
            # update status
            Metro_label.status = STARTED
            Metro_label.setAutoDraw(True)
        
        # if Metro_label is active this frame...
        if Metro_label.status == STARTED:
            # update params
            pass
        
        # *RH_label* updates
        
        # if RH_label is starting this frame...
        if RH_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            RH_label.frameNStart = frameN  # exact frame index
            RH_label.tStart = t  # local t and not account for scr refresh
            RH_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(RH_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'RH_label.started')
            # update status
            RH_label.status = STARTED
            RH_label.setAutoDraw(True)
        
        # if RH_label is active this frame...
        if RH_label.status == STARTED:
            # update params
            pass
        
        # *None_2* updates
        
        # if None_2 is starting this frame...
        if None_2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            None_2.frameNStart = frameN  # exact frame index
            None_2.tStart = t  # local t and not account for scr refresh
            None_2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(None_2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'None_2.started')
            # update status
            None_2.status = STARTED
            None_2.setAutoDraw(True)
        
        # if None_2 is active this frame...
        if None_2.status == STARTED:
            # update params
            pass
        
        # *Cost_bus* updates
        
        # if Cost_bus is starting this frame...
        if Cost_bus.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Cost_bus.frameNStart = frameN  # exact frame index
            Cost_bus.tStart = t  # local t and not account for scr refresh
            Cost_bus.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Cost_bus, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Cost_bus.started')
            # update status
            Cost_bus.status = STARTED
            Cost_bus.setAutoDraw(True)
        
        # if Cost_bus is active this frame...
        if Cost_bus.status == STARTED:
            # update params
            pass
        
        # *Cost_metro* updates
        
        # if Cost_metro is starting this frame...
        if Cost_metro.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Cost_metro.frameNStart = frameN  # exact frame index
            Cost_metro.tStart = t  # local t and not account for scr refresh
            Cost_metro.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Cost_metro, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Cost_metro.started')
            # update status
            Cost_metro.status = STARTED
            Cost_metro.setAutoDraw(True)
        
        # if Cost_metro is active this frame...
        if Cost_metro.status == STARTED:
            # update params
            pass
        
        # *Cost_RH* updates
        
        # if Cost_RH is starting this frame...
        if Cost_RH.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Cost_RH.frameNStart = frameN  # exact frame index
            Cost_RH.tStart = t  # local t and not account for scr refresh
            Cost_RH.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Cost_RH, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Cost_RH.started')
            # update status
            Cost_RH.status = STARTED
            Cost_RH.setAutoDraw(True)
        
        # if Cost_RH is active this frame...
        if Cost_RH.status == STARTED:
            # update params
            pass
        
        # *Time_bus* updates
        
        # if Time_bus is starting this frame...
        if Time_bus.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Time_bus.frameNStart = frameN  # exact frame index
            Time_bus.tStart = t  # local t and not account for scr refresh
            Time_bus.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Time_bus, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Time_bus.started')
            # update status
            Time_bus.status = STARTED
            Time_bus.setAutoDraw(True)
        
        # if Time_bus is active this frame...
        if Time_bus.status == STARTED:
            # update params
            pass
        
        # *Time_metro* updates
        
        # if Time_metro is starting this frame...
        if Time_metro.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Time_metro.frameNStart = frameN  # exact frame index
            Time_metro.tStart = t  # local t and not account for scr refresh
            Time_metro.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Time_metro, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Time_metro.started')
            # update status
            Time_metro.status = STARTED
            Time_metro.setAutoDraw(True)
        
        # if Time_metro is active this frame...
        if Time_metro.status == STARTED:
            # update params
            pass
        
        # *Time_RH* updates
        
        # if Time_RH is starting this frame...
        if Time_RH.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Time_RH.frameNStart = frameN  # exact frame index
            Time_RH.tStart = t  # local t and not account for scr refresh
            Time_RH.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Time_RH, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Time_RH.started')
            # update status
            Time_RH.status = STARTED
            Time_RH.setAutoDraw(True)
        
        # if Time_RH is active this frame...
        if Time_RH.status == STARTED:
            # update params
            pass
        
        # *Comfort_bus* updates
        
        # if Comfort_bus is starting this frame...
        if Comfort_bus.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Comfort_bus.frameNStart = frameN  # exact frame index
            Comfort_bus.tStart = t  # local t and not account for scr refresh
            Comfort_bus.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Comfort_bus, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Comfort_bus.started')
            # update status
            Comfort_bus.status = STARTED
            Comfort_bus.setAutoDraw(True)
        
        # if Comfort_bus is active this frame...
        if Comfort_bus.status == STARTED:
            # update params
            pass
        
        # *Comfort_metro* updates
        
        # if Comfort_metro is starting this frame...
        if Comfort_metro.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Comfort_metro.frameNStart = frameN  # exact frame index
            Comfort_metro.tStart = t  # local t and not account for scr refresh
            Comfort_metro.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Comfort_metro, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Comfort_metro.started')
            # update status
            Comfort_metro.status = STARTED
            Comfort_metro.setAutoDraw(True)
        
        # if Comfort_metro is active this frame...
        if Comfort_metro.status == STARTED:
            # update params
            pass
        
        # *Comfort_RH* updates
        
        # if Comfort_RH is starting this frame...
        if Comfort_RH.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Comfort_RH.frameNStart = frameN  # exact frame index
            Comfort_RH.tStart = t  # local t and not account for scr refresh
            Comfort_RH.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Comfort_RH, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Comfort_RH.started')
            # update status
            Comfort_RH.status = STARTED
            Comfort_RH.setAutoDraw(True)
        
        # if Comfort_RH is active this frame...
        if Comfort_RH.status == STARTED:
            # update params
            pass
        
        # *CO2_bus* updates
        
        # if CO2_bus is starting this frame...
        if CO2_bus.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            CO2_bus.frameNStart = frameN  # exact frame index
            CO2_bus.tStart = t  # local t and not account for scr refresh
            CO2_bus.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(CO2_bus, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'CO2_bus.started')
            # update status
            CO2_bus.status = STARTED
            CO2_bus.setAutoDraw(True)
        
        # if CO2_bus is active this frame...
        if CO2_bus.status == STARTED:
            # update params
            pass
        
        # *CO2_metro* updates
        
        # if CO2_metro is starting this frame...
        if CO2_metro.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            CO2_metro.frameNStart = frameN  # exact frame index
            CO2_metro.tStart = t  # local t and not account for scr refresh
            CO2_metro.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(CO2_metro, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'CO2_metro.started')
            # update status
            CO2_metro.status = STARTED
            CO2_metro.setAutoDraw(True)
        
        # if CO2_metro is active this frame...
        if CO2_metro.status == STARTED:
            # update params
            pass
        
        # *CO2_RH* updates
        
        # if CO2_RH is starting this frame...
        if CO2_RH.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            CO2_RH.frameNStart = frameN  # exact frame index
            CO2_RH.tStart = t  # local t and not account for scr refresh
            CO2_RH.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(CO2_RH, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'CO2_RH.started')
            # update status
            CO2_RH.status = STARTED
            CO2_RH.setAutoDraw(True)
        
        # if CO2_RH is active this frame...
        if CO2_RH.status == STARTED:
            # update params
            pass
        
        # *Cost_label* updates
        
        # if Cost_label is starting this frame...
        if Cost_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Cost_label.frameNStart = frameN  # exact frame index
            Cost_label.tStart = t  # local t and not account for scr refresh
            Cost_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Cost_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Cost_label.started')
            # update status
            Cost_label.status = STARTED
            Cost_label.setAutoDraw(True)
        
        # if Cost_label is active this frame...
        if Cost_label.status == STARTED:
            # update params
            pass
        
        # *Time_label* updates
        
        # if Time_label is starting this frame...
        if Time_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Time_label.frameNStart = frameN  # exact frame index
            Time_label.tStart = t  # local t and not account for scr refresh
            Time_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Time_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Time_label.started')
            # update status
            Time_label.status = STARTED
            Time_label.setAutoDraw(True)
        
        # if Time_label is active this frame...
        if Time_label.status == STARTED:
            # update params
            pass
        
        # *Comfort_label* updates
        
        # if Comfort_label is starting this frame...
        if Comfort_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            Comfort_label.frameNStart = frameN  # exact frame index
            Comfort_label.tStart = t  # local t and not account for scr refresh
            Comfort_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Comfort_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Comfort_label.started')
            # update status
            Comfort_label.status = STARTED
            Comfort_label.setAutoDraw(True)
        
        # if Comfort_label is active this frame...
        if Comfort_label.status == STARTED:
            # update params
            pass
        
        # *CO2_label* updates
        
        # if CO2_label is starting this frame...
        if CO2_label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            CO2_label.frameNStart = frameN  # exact frame index
            CO2_label.tStart = t  # local t and not account for scr refresh
            CO2_label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(CO2_label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'CO2_label.started')
            # update status
            CO2_label.status = STARTED
            CO2_label.setAutoDraw(True)
        
        # if CO2_label is active this frame...
        if CO2_label.status == STARTED:
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
                    clickableList = core.getFromNames([Bus_label,Metro_label,RH_label,None_2])
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
        elif buttonsPressed[2]:
            choice = 'None'
            clicked_things.append(clickable.name)
            continueRoutine = False
            
        
        #EyeGaze
        ETRECORD_FR.append(etRecord.pos)
        MOUSEGAZE.append([mouse.getPos()[0],mouse.getPos()[1]])
        
        
        # if ET_Bus_Label is starting this frame...
        if ET_Bus_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Bus_Label.frameNStart = frameN  # exact frame index
            ET_Bus_Label.tStart = t  # local t and not account for scr refresh
            ET_Bus_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Bus_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Bus_Label.started')
            # update status
            ET_Bus_Label.status = STARTED
            ET_Bus_Label.setAutoDraw(True)
        
        # if ET_Bus_Label is active this frame...
        if ET_Bus_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Bus_Label has been looked in
            if ET_Bus_Label.isLookedIn:
                if not ET_Bus_Label.wasLookedIn:
                    ET_Bus_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Bus_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Bus_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Label.wasLookedIn = True  # if ET_Bus_Label is still looked at next frame, it is not a new look
            else:
                if ET_Bus_Label.wasLookedIn:
                    ET_Bus_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Label.wasLookedIn = False  # if ET_Bus_Label is looked at next frame, it is a new look
        else:
            ET_Bus_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Bus_Label.wasLookedIn = False  # if ET_Bus_Label is looked at next frame, it is a new look
        
        # if ET_Metro_Label is starting this frame...
        if ET_Metro_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Metro_Label.frameNStart = frameN  # exact frame index
            ET_Metro_Label.tStart = t  # local t and not account for scr refresh
            ET_Metro_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Metro_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Metro_Label.started')
            # update status
            ET_Metro_Label.status = STARTED
            ET_Metro_Label.setAutoDraw(True)
        
        # if ET_Metro_Label is active this frame...
        if ET_Metro_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Metro_Label has been looked in
            if ET_Metro_Label.isLookedIn:
                if not ET_Metro_Label.wasLookedIn:
                    ET_Metro_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Metro_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Metro_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Label.wasLookedIn = True  # if ET_Metro_Label is still looked at next frame, it is not a new look
            else:
                if ET_Metro_Label.wasLookedIn:
                    ET_Metro_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Label.wasLookedIn = False  # if ET_Metro_Label is looked at next frame, it is a new look
        else:
            ET_Metro_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Metro_Label.wasLookedIn = False  # if ET_Metro_Label is looked at next frame, it is a new look
        
        # if ET_RH_Label is starting this frame...
        if ET_RH_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_RH_Label.frameNStart = frameN  # exact frame index
            ET_RH_Label.tStart = t  # local t and not account for scr refresh
            ET_RH_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_RH_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_RH_Label.started')
            # update status
            ET_RH_Label.status = STARTED
            ET_RH_Label.setAutoDraw(True)
        
        # if ET_RH_Label is active this frame...
        if ET_RH_Label.status == STARTED:
            # update params
            pass
            # check whether ET_RH_Label has been looked in
            if ET_RH_Label.isLookedIn:
                if not ET_RH_Label.wasLookedIn:
                    ET_RH_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_RH_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_RH_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Label.wasLookedIn = True  # if ET_RH_Label is still looked at next frame, it is not a new look
            else:
                if ET_RH_Label.wasLookedIn:
                    ET_RH_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Label.wasLookedIn = False  # if ET_RH_Label is looked at next frame, it is a new look
        else:
            ET_RH_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_RH_Label.wasLookedIn = False  # if ET_RH_Label is looked at next frame, it is a new look
        
        # if ET_None_Label is starting this frame...
        if ET_None_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_None_Label.frameNStart = frameN  # exact frame index
            ET_None_Label.tStart = t  # local t and not account for scr refresh
            ET_None_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_None_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_None_Label.started')
            # update status
            ET_None_Label.status = STARTED
            ET_None_Label.setAutoDraw(True)
        
        # if ET_None_Label is active this frame...
        if ET_None_Label.status == STARTED:
            # update params
            ET_None_Label.setPos((1.5, 1.5), log=False)
            # check whether ET_None_Label has been looked in
            if ET_None_Label.isLookedIn:
                if not ET_None_Label.wasLookedIn:
                    ET_None_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_None_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_None_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_None_Label.wasLookedIn = True  # if ET_None_Label is still looked at next frame, it is not a new look
            else:
                if ET_None_Label.wasLookedIn:
                    ET_None_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_None_Label.wasLookedIn = False  # if ET_None_Label is looked at next frame, it is a new look
        else:
            ET_None_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_None_Label.wasLookedIn = False  # if ET_None_Label is looked at next frame, it is a new look
        
        # if ET_Cost_Label is starting this frame...
        if ET_Cost_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Cost_Label.frameNStart = frameN  # exact frame index
            ET_Cost_Label.tStart = t  # local t and not account for scr refresh
            ET_Cost_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Cost_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Cost_Label.started')
            # update status
            ET_Cost_Label.status = STARTED
            ET_Cost_Label.setAutoDraw(True)
        
        # if ET_Cost_Label is active this frame...
        if ET_Cost_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Cost_Label has been looked in
            if ET_Cost_Label.isLookedIn:
                if not ET_Cost_Label.wasLookedIn:
                    ET_Cost_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Cost_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Cost_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Cost_Label.wasLookedIn = True  # if ET_Cost_Label is still looked at next frame, it is not a new look
            else:
                if ET_Cost_Label.wasLookedIn:
                    ET_Cost_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Cost_Label.wasLookedIn = False  # if ET_Cost_Label is looked at next frame, it is a new look
        else:
            ET_Cost_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Cost_Label.wasLookedIn = False  # if ET_Cost_Label is looked at next frame, it is a new look
        
        # if ET_Time_Label is starting this frame...
        if ET_Time_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Time_Label.frameNStart = frameN  # exact frame index
            ET_Time_Label.tStart = t  # local t and not account for scr refresh
            ET_Time_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Time_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Time_Label.started')
            # update status
            ET_Time_Label.status = STARTED
            ET_Time_Label.setAutoDraw(True)
        
        # if ET_Time_Label is active this frame...
        if ET_Time_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Time_Label has been looked in
            if ET_Time_Label.isLookedIn:
                if not ET_Time_Label.wasLookedIn:
                    ET_Time_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Time_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Time_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Time_Label.wasLookedIn = True  # if ET_Time_Label is still looked at next frame, it is not a new look
            else:
                if ET_Time_Label.wasLookedIn:
                    ET_Time_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Time_Label.wasLookedIn = False  # if ET_Time_Label is looked at next frame, it is a new look
        else:
            ET_Time_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Time_Label.wasLookedIn = False  # if ET_Time_Label is looked at next frame, it is a new look
        
        # if ET_Comfort_Label is starting this frame...
        if ET_Comfort_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Comfort_Label.frameNStart = frameN  # exact frame index
            ET_Comfort_Label.tStart = t  # local t and not account for scr refresh
            ET_Comfort_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Comfort_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Comfort_Label.started')
            # update status
            ET_Comfort_Label.status = STARTED
            ET_Comfort_Label.setAutoDraw(True)
        
        # if ET_Comfort_Label is active this frame...
        if ET_Comfort_Label.status == STARTED:
            # update params
            pass
            # check whether ET_Comfort_Label has been looked in
            if ET_Comfort_Label.isLookedIn:
                if not ET_Comfort_Label.wasLookedIn:
                    ET_Comfort_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Comfort_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Comfort_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Comfort_Label.wasLookedIn = True  # if ET_Comfort_Label is still looked at next frame, it is not a new look
            else:
                if ET_Comfort_Label.wasLookedIn:
                    ET_Comfort_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Comfort_Label.wasLookedIn = False  # if ET_Comfort_Label is looked at next frame, it is a new look
        else:
            ET_Comfort_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Comfort_Label.wasLookedIn = False  # if ET_Comfort_Label is looked at next frame, it is a new look
        
        # if ET_CO2_Label is starting this frame...
        if ET_CO2_Label.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_CO2_Label.frameNStart = frameN  # exact frame index
            ET_CO2_Label.tStart = t  # local t and not account for scr refresh
            ET_CO2_Label.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_CO2_Label, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_CO2_Label.started')
            # update status
            ET_CO2_Label.status = STARTED
            ET_CO2_Label.setAutoDraw(True)
        
        # if ET_CO2_Label is active this frame...
        if ET_CO2_Label.status == STARTED:
            # update params
            pass
            # check whether ET_CO2_Label has been looked in
            if ET_CO2_Label.isLookedIn:
                if not ET_CO2_Label.wasLookedIn:
                    ET_CO2_Label.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_CO2_Label.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_CO2_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_CO2_Label.wasLookedIn = True  # if ET_CO2_Label is still looked at next frame, it is not a new look
            else:
                if ET_CO2_Label.wasLookedIn:
                    ET_CO2_Label.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_CO2_Label.wasLookedIn = False  # if ET_CO2_Label is looked at next frame, it is a new look
        else:
            ET_CO2_Label.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_CO2_Label.wasLookedIn = False  # if ET_CO2_Label is looked at next frame, it is a new look
        
        # if ET_Bus_Cost is starting this frame...
        if ET_Bus_Cost.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Bus_Cost.frameNStart = frameN  # exact frame index
            ET_Bus_Cost.tStart = t  # local t and not account for scr refresh
            ET_Bus_Cost.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Bus_Cost, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Bus_Cost.started')
            # update status
            ET_Bus_Cost.status = STARTED
            ET_Bus_Cost.setAutoDraw(True)
        
        # if ET_Bus_Cost is active this frame...
        if ET_Bus_Cost.status == STARTED:
            # update params
            pass
            # check whether ET_Bus_Cost has been looked in
            if ET_Bus_Cost.isLookedIn:
                if not ET_Bus_Cost.wasLookedIn:
                    ET_Bus_Cost.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Bus_Cost.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Bus_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Cost.wasLookedIn = True  # if ET_Bus_Cost is still looked at next frame, it is not a new look
            else:
                if ET_Bus_Cost.wasLookedIn:
                    ET_Bus_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Cost.wasLookedIn = False  # if ET_Bus_Cost is looked at next frame, it is a new look
        else:
            ET_Bus_Cost.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Bus_Cost.wasLookedIn = False  # if ET_Bus_Cost is looked at next frame, it is a new look
        
        # if ET_Metro_Cost is starting this frame...
        if ET_Metro_Cost.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Metro_Cost.frameNStart = frameN  # exact frame index
            ET_Metro_Cost.tStart = t  # local t and not account for scr refresh
            ET_Metro_Cost.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Metro_Cost, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Metro_Cost.started')
            # update status
            ET_Metro_Cost.status = STARTED
            ET_Metro_Cost.setAutoDraw(True)
        
        # if ET_Metro_Cost is active this frame...
        if ET_Metro_Cost.status == STARTED:
            # update params
            pass
            # check whether ET_Metro_Cost has been looked in
            if ET_Metro_Cost.isLookedIn:
                if not ET_Metro_Cost.wasLookedIn:
                    ET_Metro_Cost.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Metro_Cost.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Metro_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Cost.wasLookedIn = True  # if ET_Metro_Cost is still looked at next frame, it is not a new look
            else:
                if ET_Metro_Cost.wasLookedIn:
                    ET_Metro_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Cost.wasLookedIn = False  # if ET_Metro_Cost is looked at next frame, it is a new look
        else:
            ET_Metro_Cost.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Metro_Cost.wasLookedIn = False  # if ET_Metro_Cost is looked at next frame, it is a new look
        
        # if ET_RH_Cost is starting this frame...
        if ET_RH_Cost.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_RH_Cost.frameNStart = frameN  # exact frame index
            ET_RH_Cost.tStart = t  # local t and not account for scr refresh
            ET_RH_Cost.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_RH_Cost, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_RH_Cost.started')
            # update status
            ET_RH_Cost.status = STARTED
            ET_RH_Cost.setAutoDraw(True)
        
        # if ET_RH_Cost is active this frame...
        if ET_RH_Cost.status == STARTED:
            # update params
            pass
            # check whether ET_RH_Cost has been looked in
            if ET_RH_Cost.isLookedIn:
                if not ET_RH_Cost.wasLookedIn:
                    ET_RH_Cost.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_RH_Cost.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_RH_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Cost.wasLookedIn = True  # if ET_RH_Cost is still looked at next frame, it is not a new look
            else:
                if ET_RH_Cost.wasLookedIn:
                    ET_RH_Cost.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Cost.wasLookedIn = False  # if ET_RH_Cost is looked at next frame, it is a new look
        else:
            ET_RH_Cost.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_RH_Cost.wasLookedIn = False  # if ET_RH_Cost is looked at next frame, it is a new look
        
        # if ET_Bus_Time is starting this frame...
        if ET_Bus_Time.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Bus_Time.frameNStart = frameN  # exact frame index
            ET_Bus_Time.tStart = t  # local t and not account for scr refresh
            ET_Bus_Time.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Bus_Time, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Bus_Time.started')
            # update status
            ET_Bus_Time.status = STARTED
            ET_Bus_Time.setAutoDraw(True)
        
        # if ET_Bus_Time is active this frame...
        if ET_Bus_Time.status == STARTED:
            # update params
            pass
            # check whether ET_Bus_Time has been looked in
            if ET_Bus_Time.isLookedIn:
                if not ET_Bus_Time.wasLookedIn:
                    ET_Bus_Time.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Bus_Time.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Bus_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Time.wasLookedIn = True  # if ET_Bus_Time is still looked at next frame, it is not a new look
            else:
                if ET_Bus_Time.wasLookedIn:
                    ET_Bus_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Time.wasLookedIn = False  # if ET_Bus_Time is looked at next frame, it is a new look
        else:
            ET_Bus_Time.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Bus_Time.wasLookedIn = False  # if ET_Bus_Time is looked at next frame, it is a new look
        
        # if ET_Metro_Time is starting this frame...
        if ET_Metro_Time.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Metro_Time.frameNStart = frameN  # exact frame index
            ET_Metro_Time.tStart = t  # local t and not account for scr refresh
            ET_Metro_Time.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Metro_Time, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Metro_Time.started')
            # update status
            ET_Metro_Time.status = STARTED
            ET_Metro_Time.setAutoDraw(True)
        
        # if ET_Metro_Time is active this frame...
        if ET_Metro_Time.status == STARTED:
            # update params
            pass
            # check whether ET_Metro_Time has been looked in
            if ET_Metro_Time.isLookedIn:
                if not ET_Metro_Time.wasLookedIn:
                    ET_Metro_Time.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Metro_Time.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Metro_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Time.wasLookedIn = True  # if ET_Metro_Time is still looked at next frame, it is not a new look
            else:
                if ET_Metro_Time.wasLookedIn:
                    ET_Metro_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Time.wasLookedIn = False  # if ET_Metro_Time is looked at next frame, it is a new look
        else:
            ET_Metro_Time.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Metro_Time.wasLookedIn = False  # if ET_Metro_Time is looked at next frame, it is a new look
        
        # if ET_RH_Time is starting this frame...
        if ET_RH_Time.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_RH_Time.frameNStart = frameN  # exact frame index
            ET_RH_Time.tStart = t  # local t and not account for scr refresh
            ET_RH_Time.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_RH_Time, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_RH_Time.started')
            # update status
            ET_RH_Time.status = STARTED
            ET_RH_Time.setAutoDraw(True)
        
        # if ET_RH_Time is active this frame...
        if ET_RH_Time.status == STARTED:
            # update params
            pass
            # check whether ET_RH_Time has been looked in
            if ET_RH_Time.isLookedIn:
                if not ET_RH_Time.wasLookedIn:
                    ET_RH_Time.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_RH_Time.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_RH_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Time.wasLookedIn = True  # if ET_RH_Time is still looked at next frame, it is not a new look
            else:
                if ET_RH_Time.wasLookedIn:
                    ET_RH_Time.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Time.wasLookedIn = False  # if ET_RH_Time is looked at next frame, it is a new look
        else:
            ET_RH_Time.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_RH_Time.wasLookedIn = False  # if ET_RH_Time is looked at next frame, it is a new look
        
        # if ET_Bus_Comfort is starting this frame...
        if ET_Bus_Comfort.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Bus_Comfort.frameNStart = frameN  # exact frame index
            ET_Bus_Comfort.tStart = t  # local t and not account for scr refresh
            ET_Bus_Comfort.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Bus_Comfort, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Bus_Comfort.started')
            # update status
            ET_Bus_Comfort.status = STARTED
            ET_Bus_Comfort.setAutoDraw(True)
        
        # if ET_Bus_Comfort is active this frame...
        if ET_Bus_Comfort.status == STARTED:
            # update params
            pass
            # check whether ET_Bus_Comfort has been looked in
            if ET_Bus_Comfort.isLookedIn:
                if not ET_Bus_Comfort.wasLookedIn:
                    ET_Bus_Comfort.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Bus_Comfort.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Bus_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Comfort.wasLookedIn = True  # if ET_Bus_Comfort is still looked at next frame, it is not a new look
            else:
                if ET_Bus_Comfort.wasLookedIn:
                    ET_Bus_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_Comfort.wasLookedIn = False  # if ET_Bus_Comfort is looked at next frame, it is a new look
        else:
            ET_Bus_Comfort.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Bus_Comfort.wasLookedIn = False  # if ET_Bus_Comfort is looked at next frame, it is a new look
        
        # if ET_Metro_Comfort is starting this frame...
        if ET_Metro_Comfort.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Metro_Comfort.frameNStart = frameN  # exact frame index
            ET_Metro_Comfort.tStart = t  # local t and not account for scr refresh
            ET_Metro_Comfort.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Metro_Comfort, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Metro_Comfort.started')
            # update status
            ET_Metro_Comfort.status = STARTED
            ET_Metro_Comfort.setAutoDraw(True)
        
        # if ET_Metro_Comfort is active this frame...
        if ET_Metro_Comfort.status == STARTED:
            # update params
            pass
            # check whether ET_Metro_Comfort has been looked in
            if ET_Metro_Comfort.isLookedIn:
                if not ET_Metro_Comfort.wasLookedIn:
                    ET_Metro_Comfort.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Metro_Comfort.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Metro_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Comfort.wasLookedIn = True  # if ET_Metro_Comfort is still looked at next frame, it is not a new look
            else:
                if ET_Metro_Comfort.wasLookedIn:
                    ET_Metro_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_Comfort.wasLookedIn = False  # if ET_Metro_Comfort is looked at next frame, it is a new look
        else:
            ET_Metro_Comfort.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Metro_Comfort.wasLookedIn = False  # if ET_Metro_Comfort is looked at next frame, it is a new look
        
        # if ET_RH_Comfort is starting this frame...
        if ET_RH_Comfort.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_RH_Comfort.frameNStart = frameN  # exact frame index
            ET_RH_Comfort.tStart = t  # local t and not account for scr refresh
            ET_RH_Comfort.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_RH_Comfort, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_RH_Comfort.started')
            # update status
            ET_RH_Comfort.status = STARTED
            ET_RH_Comfort.setAutoDraw(True)
        
        # if ET_RH_Comfort is active this frame...
        if ET_RH_Comfort.status == STARTED:
            # update params
            pass
            # check whether ET_RH_Comfort has been looked in
            if ET_RH_Comfort.isLookedIn:
                if not ET_RH_Comfort.wasLookedIn:
                    ET_RH_Comfort.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_RH_Comfort.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_RH_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Comfort.wasLookedIn = True  # if ET_RH_Comfort is still looked at next frame, it is not a new look
            else:
                if ET_RH_Comfort.wasLookedIn:
                    ET_RH_Comfort.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_Comfort.wasLookedIn = False  # if ET_RH_Comfort is looked at next frame, it is a new look
        else:
            ET_RH_Comfort.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_RH_Comfort.wasLookedIn = False  # if ET_RH_Comfort is looked at next frame, it is a new look
        
        # if ET_Bus_CO2 is starting this frame...
        if ET_Bus_CO2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Bus_CO2.frameNStart = frameN  # exact frame index
            ET_Bus_CO2.tStart = t  # local t and not account for scr refresh
            ET_Bus_CO2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Bus_CO2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Bus_CO2.started')
            # update status
            ET_Bus_CO2.status = STARTED
            ET_Bus_CO2.setAutoDraw(True)
        
        # if ET_Bus_CO2 is active this frame...
        if ET_Bus_CO2.status == STARTED:
            # update params
            pass
            # check whether ET_Bus_CO2 has been looked in
            if ET_Bus_CO2.isLookedIn:
                if not ET_Bus_CO2.wasLookedIn:
                    ET_Bus_CO2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Bus_CO2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Bus_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_CO2.wasLookedIn = True  # if ET_Bus_CO2 is still looked at next frame, it is not a new look
            else:
                if ET_Bus_CO2.wasLookedIn:
                    ET_Bus_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Bus_CO2.wasLookedIn = False  # if ET_Bus_CO2 is looked at next frame, it is a new look
        else:
            ET_Bus_CO2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Bus_CO2.wasLookedIn = False  # if ET_Bus_CO2 is looked at next frame, it is a new look
        
        # if ET_Metro_CO2 is starting this frame...
        if ET_Metro_CO2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_Metro_CO2.frameNStart = frameN  # exact frame index
            ET_Metro_CO2.tStart = t  # local t and not account for scr refresh
            ET_Metro_CO2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_Metro_CO2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_Metro_CO2.started')
            # update status
            ET_Metro_CO2.status = STARTED
            ET_Metro_CO2.setAutoDraw(True)
        
        # if ET_Metro_CO2 is active this frame...
        if ET_Metro_CO2.status == STARTED:
            # update params
            pass
            # check whether ET_Metro_CO2 has been looked in
            if ET_Metro_CO2.isLookedIn:
                if not ET_Metro_CO2.wasLookedIn:
                    ET_Metro_CO2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_Metro_CO2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_Metro_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_CO2.wasLookedIn = True  # if ET_Metro_CO2 is still looked at next frame, it is not a new look
            else:
                if ET_Metro_CO2.wasLookedIn:
                    ET_Metro_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_Metro_CO2.wasLookedIn = False  # if ET_Metro_CO2 is looked at next frame, it is a new look
        else:
            ET_Metro_CO2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_Metro_CO2.wasLookedIn = False  # if ET_Metro_CO2 is looked at next frame, it is a new look
        
        # if ET_RH_CO2 is starting this frame...
        if ET_RH_CO2.status == NOT_STARTED and tThisFlip >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            ET_RH_CO2.frameNStart = frameN  # exact frame index
            ET_RH_CO2.tStart = t  # local t and not account for scr refresh
            ET_RH_CO2.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(ET_RH_CO2, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'ET_RH_CO2.started')
            # update status
            ET_RH_CO2.status = STARTED
            ET_RH_CO2.setAutoDraw(True)
        
        # if ET_RH_CO2 is active this frame...
        if ET_RH_CO2.status == STARTED:
            # update params
            pass
            # check whether ET_RH_CO2 has been looked in
            if ET_RH_CO2.isLookedIn:
                if not ET_RH_CO2.wasLookedIn:
                    ET_RH_CO2.timesOn.append(routineTimer.getTime()) # store time of first look
                    ET_RH_CO2.timesOff.append(routineTimer.getTime()) # store time looked until
                else:
                    ET_RH_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_CO2.wasLookedIn = True  # if ET_RH_CO2 is still looked at next frame, it is not a new look
            else:
                if ET_RH_CO2.wasLookedIn:
                    ET_RH_CO2.timesOff[-1] = routineTimer.getTime() # update time looked until
                ET_RH_CO2.wasLookedIn = False  # if ET_RH_CO2 is looked at next frame, it is a new look
        else:
            ET_RH_CO2.clock.reset() # keep clock at 0 if roi hasn't started / has finished
            ET_RH_CO2.wasLookedIn = False  # if ET_RH_CO2 is looked at next frame, it is a new look
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
    print('Routine ending ',nLoop)
    thisExp.addData('Choice', choice)
    thisExp.addData('Trial', nLoop)
    if nLoop>=Trials1:
        phase=2
    #trial duration
    thisExp.addData('TrialDuration', t - StartTimeRoutine )
    
    #stop recording
    my_eyetracker.unsubscribe_from(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    
    #Cost shown
    #thisExp.addData('Bus_cost_Shown', Cost_Bus_Shown )
    #thisExp.addData('Metro_cost_Shown', Cost_metro_Shown )
    #thisExp.addData('RH_cost_Shown', Cost_RH_Shown )
    
    #eyetracker data
    thisExp.addData('ETRECORD_FR', ETRECORD_FR )
    thisExp.addData('LEFTPUPIL_FR', LEFTPUPIL_FR )
    thisExp.addData('RIGHTPUPIL_FR', RIGHTPUPIL_FR )
    thisExp.addData('TIME_GAZE', TIMEGAZE )
    thisExp.addData('MOUSE_GAZE', MOUSEGAZE )
    
    #sizedata
    thisExp.addData('attsize', (xsizele , ysizele) )
    thisExp.addData('prodsize', (xsizela , ysizela) )
    thisExp.addData('regETsize', (xETreg, yETreg) )
    
    #locations labels choices
    thisExp.addData('Loc_Bus_label', ( xcoord2 , ycoord1) )
    thisExp.addData('Loc_Metro_label', ( xcoord3 , ycoord1) )
    thisExp.addData('Loc_RH_label', ( xcoord4 , ycoord1) )
    #thisExp.addData('Loc_None_label', (0.67 , ycoord1) )
    
    #locations labels attributes
    thisExp.addData('Loc_Cost_label', (locations[0][0], locations[0][1]) )
    thisExp.addData('Loc_Travel_label', (locations[1][0], locations[1][1]) )
    thisExp.addData('Loc_Comfort_label', (locations[2][0], locations[2][1]) )
    thisExp.addData('Loc_CO2_label', (locations[3][0], locations[3][1]) )
    
    #locations cost
    thisExp.addData('Loc_Bus_cost', ( xcoord2, locations[0][1]) )
    thisExp.addData('Loc_Metro_cost', ( xcoord3, locations[0][1]) )
    thisExp.addData('Loc_RH_cost', ( xcoord4, locations[0][1]) )
    
    #locations travel
    thisExp.addData('Loc_Bus_travel', ( xcoord2, locations[1][1]) )
    thisExp.addData('Loc_Metro_travel', ( xcoord3, locations[1][1]) )
    thisExp.addData('Loc_RH_travel', ( xcoord4, locations[1][1]) )
    
    #locations comfort
    thisExp.addData('Loc_Bus_comfort', ( xcoord2, locations[2][1]) )
    thisExp.addData('Loc_Metro_comfort', ( xcoord3, locations[2][1]) )
    thisExp.addData('Loc_RH_comfort', ( xcoord4, locations[2][1]) )
    
    #locations CO2
    thisExp.addData('Loc_Bus_CO2', ( xcoord2, locations[3][1]) )
    thisExp.addData('Loc_Metro_CO2', ( xcoord3, locations[3][1]) )
    thisExp.addData('Loc_RH_CO2', ( xcoord4, locations[3][1]) )
    
    #locations colors, and colors
    thisExp.addData('Color_1', colors[0] )
    thisExp.addData('Loc_Color_1', (0, locations[0][1]) )
    thisExp.addData('Color_2', colors[1] )
    thisExp.addData('Loc_Color_2', (0, locations[1][1]) )
    thisExp.addData('Color_3', colors[2] )
    thisExp.addData('Loc_Color_3', (0, locations[2][1]) )
    thisExp.addData('Color_4', colors[3] )
    thisExp.addData('Loc_Color_4', (0, locations[3][1]) )
    
    #empezar condición para sgte trial
    if (phase == 2) and (nLoop % 5 == 0):
        while locations == shuffle(locations):
            print(locations)
    nLoop+=1
    
    trials.addData('ET_Bus_Label.numLooks', ET_Bus_Label.numLooks)
    if ET_Bus_Label.numLooks:
       trials.addData('ET_Bus_Label.timesOn', ET_Bus_Label.timesOn)
       trials.addData('ET_Bus_Label.timesOff', ET_Bus_Label.timesOff)
    else:
       trials.addData('ET_Bus_Label.timesOn', "")
       trials.addData('ET_Bus_Label.timesOff', "")
    trials.addData('ET_Metro_Label.numLooks', ET_Metro_Label.numLooks)
    if ET_Metro_Label.numLooks:
       trials.addData('ET_Metro_Label.timesOn', ET_Metro_Label.timesOn)
       trials.addData('ET_Metro_Label.timesOff', ET_Metro_Label.timesOff)
    else:
       trials.addData('ET_Metro_Label.timesOn', "")
       trials.addData('ET_Metro_Label.timesOff', "")
    trials.addData('ET_RH_Label.numLooks', ET_RH_Label.numLooks)
    if ET_RH_Label.numLooks:
       trials.addData('ET_RH_Label.timesOn', ET_RH_Label.timesOn)
       trials.addData('ET_RH_Label.timesOff', ET_RH_Label.timesOff)
    else:
       trials.addData('ET_RH_Label.timesOn', "")
       trials.addData('ET_RH_Label.timesOff', "")
    trials.addData('ET_None_Label.numLooks', ET_None_Label.numLooks)
    if ET_None_Label.numLooks:
       trials.addData('ET_None_Label.timesOn', ET_None_Label.timesOn)
       trials.addData('ET_None_Label.timesOff', ET_None_Label.timesOff)
    else:
       trials.addData('ET_None_Label.timesOn', "")
       trials.addData('ET_None_Label.timesOff', "")
    trials.addData('ET_Cost_Label.numLooks', ET_Cost_Label.numLooks)
    if ET_Cost_Label.numLooks:
       trials.addData('ET_Cost_Label.timesOn', ET_Cost_Label.timesOn)
       trials.addData('ET_Cost_Label.timesOff', ET_Cost_Label.timesOff)
    else:
       trials.addData('ET_Cost_Label.timesOn', "")
       trials.addData('ET_Cost_Label.timesOff', "")
    trials.addData('ET_Time_Label.numLooks', ET_Time_Label.numLooks)
    if ET_Time_Label.numLooks:
       trials.addData('ET_Time_Label.timesOn', ET_Time_Label.timesOn)
       trials.addData('ET_Time_Label.timesOff', ET_Time_Label.timesOff)
    else:
       trials.addData('ET_Time_Label.timesOn', "")
       trials.addData('ET_Time_Label.timesOff', "")
    trials.addData('ET_Comfort_Label.numLooks', ET_Comfort_Label.numLooks)
    if ET_Comfort_Label.numLooks:
       trials.addData('ET_Comfort_Label.timesOn', ET_Comfort_Label.timesOn)
       trials.addData('ET_Comfort_Label.timesOff', ET_Comfort_Label.timesOff)
    else:
       trials.addData('ET_Comfort_Label.timesOn', "")
       trials.addData('ET_Comfort_Label.timesOff', "")
    trials.addData('ET_CO2_Label.numLooks', ET_CO2_Label.numLooks)
    if ET_CO2_Label.numLooks:
       trials.addData('ET_CO2_Label.timesOn', ET_CO2_Label.timesOn)
       trials.addData('ET_CO2_Label.timesOff', ET_CO2_Label.timesOff)
    else:
       trials.addData('ET_CO2_Label.timesOn', "")
       trials.addData('ET_CO2_Label.timesOff', "")
    trials.addData('ET_Bus_Cost.numLooks', ET_Bus_Cost.numLooks)
    if ET_Bus_Cost.numLooks:
       trials.addData('ET_Bus_Cost.timesOn', ET_Bus_Cost.timesOn)
       trials.addData('ET_Bus_Cost.timesOff', ET_Bus_Cost.timesOff)
    else:
       trials.addData('ET_Bus_Cost.timesOn', "")
       trials.addData('ET_Bus_Cost.timesOff', "")
    trials.addData('ET_Metro_Cost.numLooks', ET_Metro_Cost.numLooks)
    if ET_Metro_Cost.numLooks:
       trials.addData('ET_Metro_Cost.timesOn', ET_Metro_Cost.timesOn)
       trials.addData('ET_Metro_Cost.timesOff', ET_Metro_Cost.timesOff)
    else:
       trials.addData('ET_Metro_Cost.timesOn', "")
       trials.addData('ET_Metro_Cost.timesOff', "")
    trials.addData('ET_RH_Cost.numLooks', ET_RH_Cost.numLooks)
    if ET_RH_Cost.numLooks:
       trials.addData('ET_RH_Cost.timesOn', ET_RH_Cost.timesOn)
       trials.addData('ET_RH_Cost.timesOff', ET_RH_Cost.timesOff)
    else:
       trials.addData('ET_RH_Cost.timesOn', "")
       trials.addData('ET_RH_Cost.timesOff', "")
    trials.addData('ET_Bus_Time.numLooks', ET_Bus_Time.numLooks)
    if ET_Bus_Time.numLooks:
       trials.addData('ET_Bus_Time.timesOn', ET_Bus_Time.timesOn)
       trials.addData('ET_Bus_Time.timesOff', ET_Bus_Time.timesOff)
    else:
       trials.addData('ET_Bus_Time.timesOn', "")
       trials.addData('ET_Bus_Time.timesOff', "")
    trials.addData('ET_Metro_Time.numLooks', ET_Metro_Time.numLooks)
    if ET_Metro_Time.numLooks:
       trials.addData('ET_Metro_Time.timesOn', ET_Metro_Time.timesOn)
       trials.addData('ET_Metro_Time.timesOff', ET_Metro_Time.timesOff)
    else:
       trials.addData('ET_Metro_Time.timesOn', "")
       trials.addData('ET_Metro_Time.timesOff', "")
    trials.addData('ET_RH_Time.numLooks', ET_RH_Time.numLooks)
    if ET_RH_Time.numLooks:
       trials.addData('ET_RH_Time.timesOn', ET_RH_Time.timesOn)
       trials.addData('ET_RH_Time.timesOff', ET_RH_Time.timesOff)
    else:
       trials.addData('ET_RH_Time.timesOn', "")
       trials.addData('ET_RH_Time.timesOff', "")
    trials.addData('ET_Bus_Comfort.numLooks', ET_Bus_Comfort.numLooks)
    if ET_Bus_Comfort.numLooks:
       trials.addData('ET_Bus_Comfort.timesOn', ET_Bus_Comfort.timesOn)
       trials.addData('ET_Bus_Comfort.timesOff', ET_Bus_Comfort.timesOff)
    else:
       trials.addData('ET_Bus_Comfort.timesOn', "")
       trials.addData('ET_Bus_Comfort.timesOff', "")
    trials.addData('ET_Metro_Comfort.numLooks', ET_Metro_Comfort.numLooks)
    if ET_Metro_Comfort.numLooks:
       trials.addData('ET_Metro_Comfort.timesOn', ET_Metro_Comfort.timesOn)
       trials.addData('ET_Metro_Comfort.timesOff', ET_Metro_Comfort.timesOff)
    else:
       trials.addData('ET_Metro_Comfort.timesOn', "")
       trials.addData('ET_Metro_Comfort.timesOff', "")
    trials.addData('ET_RH_Comfort.numLooks', ET_RH_Comfort.numLooks)
    if ET_RH_Comfort.numLooks:
       trials.addData('ET_RH_Comfort.timesOn', ET_RH_Comfort.timesOn)
       trials.addData('ET_RH_Comfort.timesOff', ET_RH_Comfort.timesOff)
    else:
       trials.addData('ET_RH_Comfort.timesOn', "")
       trials.addData('ET_RH_Comfort.timesOff', "")
    trials.addData('ET_Bus_CO2.numLooks', ET_Bus_CO2.numLooks)
    if ET_Bus_CO2.numLooks:
       trials.addData('ET_Bus_CO2.timesOn', ET_Bus_CO2.timesOn)
       trials.addData('ET_Bus_CO2.timesOff', ET_Bus_CO2.timesOff)
    else:
       trials.addData('ET_Bus_CO2.timesOn', "")
       trials.addData('ET_Bus_CO2.timesOff', "")
    trials.addData('ET_Metro_CO2.numLooks', ET_Metro_CO2.numLooks)
    if ET_Metro_CO2.numLooks:
       trials.addData('ET_Metro_CO2.timesOn', ET_Metro_CO2.timesOn)
       trials.addData('ET_Metro_CO2.timesOff', ET_Metro_CO2.timesOff)
    else:
       trials.addData('ET_Metro_CO2.timesOn', "")
       trials.addData('ET_Metro_CO2.timesOff', "")
    trials.addData('ET_RH_CO2.numLooks', ET_RH_CO2.numLooks)
    if ET_RH_CO2.numLooks:
       trials.addData('ET_RH_CO2.timesOn', ET_RH_CO2.timesOn)
       trials.addData('ET_RH_CO2.timesOff', ET_RH_CO2.timesOff)
    else:
       trials.addData('ET_RH_CO2.timesOn', "")
       trials.addData('ET_RH_CO2.timesOff', "")
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
    
# completed 1.0 repeats of 'trials'


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
