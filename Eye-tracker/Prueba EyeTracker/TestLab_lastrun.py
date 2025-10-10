#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
This experiment was created using PsychoPy3 Experiment Builder (v2023.1.0),
    on October 10, 2025, at 10:28
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

# Run 'Before Experiment' code from codegato
#EYETRACKER IMPORTS
from psychopy.iohub import launchHubServer
from psychopy.core import getTime, wait
import random


#cat árameters
leftright = random.randint(1, 2)
updown = random.randint(1, 2)
positiongato_X = random.uniform(0.25, 0.8)*(-1)**(leftright)
positiongato_Y = random.uniform(0.25, 0.8)*(-1)**(updown)
sizegato_X = random.uniform(0.1, 0.25)
sizegato_Y = random.uniform(0.1, 0.25) 
gradogato = 360*random.uniform(0, 1) 


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
    originPath='C:\\Users\\Laptop_4\\Desktop\\Prueba EyeTracker\\TestLab_lastrun.py',
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
    monitor='testMonitor', color=[0,0,0], colorSpace='rgb',
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
StartButton = visual.ImageStim(
    win=win,
    name='StartButton', 
    image='StartButton.png', mask=None, anchor='center',
    ori=0.0, pos=(0, -0.3), size=(0.25, 0.1),
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
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

# --- Initialize components for Routine "Images" ---
Gatito = visual.ImageStim(
    win=win,
    name='Gatito', 
    image='gatito.png', mask=None, anchor='center',
    ori=1.0, pos=[0,0], size=1.0,
    color=[1,1,1], colorSpace='rgb', opacity=None,
    flipHoriz=False, flipVert=False,
    texRes=128.0, interpolate=True, depth=0.0)
# Run 'Begin Experiment' code from codegato
#PsychoPy Imports (time, etc)
from psychopy import visual, event, core
import psychopy.visual
import psychopy.event
import tobii_research as tr

color1 = random.uniform(0, 1)
color2 = random.uniform(0, 1)
color3 = random.uniform(0, 1)

#background color
bkgcolor=[color1,color2,color3]
win.setColor(bkgcolor)

found_eyetrackers = tr.find_all_eyetrackers()
my_eyetracker = found_eyetrackers[0]
print("Address: " + my_eyetracker.address)
print("Model: " + my_eyetracker.model)


etRecord_3 = hardware.eyetracker.EyetrackerControl(
    tracker=eyetracker,
    actionType='Start Only'
)
mouse_4 = event.Mouse(win=win)
x, y = [None, None]
mouse_4.mouseClock = core.Clock()

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
# keep track of which components have finished
IntroComponents = [StartButton, mouse_2]
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
                if gotValidClick:
                    continueRoutine = False  # end routine on response
    
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
trials = data.TrialHandler(nReps=5.0, method='random', 
    extraInfo=expInfo, originPath=-1,
    trialList=[None],
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
    
    # --- Prepare to start Routine "Images" ---
    continueRoutine = True
    # update component parameters for each repeat
    Gatito.setPos((positiongato_X, positiongato_Y))
    Gatito.setSize((sizegato_X, sizegato_Y))
    Gatito.setOri(gradogato)
    # Run 'Begin Routine' code from codegato
    LEFTPUPIL_FR = []
    RIGHTPUPIL_FR = []
    TOBIIGAZELT = []
    ETRECORD_FR = []
    
    
    #------------------NEWET------------------------
    # This will be called every time there is new gaze data
    #This is the pupil diameter size function
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
        TOBIIGAZELT.append( [lx, ly ] )
    #---------------------------------------------------
    
    
    # Start the callback function-----------
    my_eyetracker.subscribe_to(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    #-----------------------------------------------
    
    
    # setup some python lists for storing info about the mouse_4
    mouse_4.x = []
    mouse_4.y = []
    mouse_4.leftButton = []
    mouse_4.midButton = []
    mouse_4.rightButton = []
    mouse_4.time = []
    mouse_4.clicked_name = []
    gotValidClick = False  # until a click is received
    # keep track of which components have finished
    ImagesComponents = [Gatito, etRecord_3, mouse_4]
    for thisComponent in ImagesComponents:
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
    
    # --- Run Routine "Images" ---
    routineForceEnded = not continueRoutine
    while continueRoutine:
        # get current time
        t = routineTimer.getTime()
        tThisFlip = win.getFutureFlipTime(clock=routineTimer)
        tThisFlipGlobal = win.getFutureFlipTime(clock=None)
        frameN = frameN + 1  # number of completed frames (so 0 is the first frame)
        # update/draw components on each frame
        
        # *Gatito* updates
        
        # if Gatito is starting this frame...
        if Gatito.status == NOT_STARTED and tThisFlip >= 2.0-frameTolerance:
            # keep track of start time/frame for later
            Gatito.frameNStart = frameN  # exact frame index
            Gatito.tStart = t  # local t and not account for scr refresh
            Gatito.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(Gatito, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.timestampOnFlip(win, 'Gatito.started')
            # update status
            Gatito.status = STARTED
            Gatito.setAutoDraw(True)
        
        # if Gatito is active this frame...
        if Gatito.status == STARTED:
            # update params
            pass
        
        # if Gatito is stopping this frame...
        if Gatito.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > Gatito.tStartRefresh + 3.0-frameTolerance:
                # keep track of stop time/frame for later
                Gatito.tStop = t  # not accounting for scr refresh
                Gatito.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.timestampOnFlip(win, 'Gatito.stopped')
                # update status
                Gatito.status = FINISHED
                Gatito.setAutoDraw(False)
        # Run 'Each Frame' code from codegato
        #EyeGaze
        #We append in a list the position of the eye on screen
        ETRECORD_FR.append([etRecord_3.pos,t])
        
        
        # *etRecord_3* updates
        
        # if etRecord_3 is starting this frame...
        if etRecord_3.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            etRecord_3.frameNStart = frameN  # exact frame index
            etRecord_3.tStart = t  # local t and not account for scr refresh
            etRecord_3.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(etRecord_3, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('etRecord_3.started', t)
            # update status
            etRecord_3.status = STARTED
        
        # if etRecord_3 is stopping this frame...
        if etRecord_3.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > etRecord_3.tStartRefresh + 0-frameTolerance:
                # keep track of stop time/frame for later
                etRecord_3.tStop = t  # not accounting for scr refresh
                etRecord_3.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.addData('etRecord_3.stopped', t)
                # update status
                etRecord_3.status = FINISHED
        # *mouse_4* updates
        
        # if mouse_4 is starting this frame...
        if mouse_4.status == NOT_STARTED and t >= 0.0-frameTolerance:
            # keep track of start time/frame for later
            mouse_4.frameNStart = frameN  # exact frame index
            mouse_4.tStart = t  # local t and not account for scr refresh
            mouse_4.tStartRefresh = tThisFlipGlobal  # on global time
            win.timeOnFlip(mouse_4, 'tStartRefresh')  # time at next scr refresh
            # add timestamp to datafile
            thisExp.addData('mouse_4.started', t)
            # update status
            mouse_4.status = STARTED
            mouse_4.mouseClock.reset()
            prevButtonState = mouse_4.getPressed()  # if button is down already this ISN'T a new click
        
        # if mouse_4 is stopping this frame...
        if mouse_4.status == STARTED:
            # is it time to stop? (based on global clock, using actual start)
            if tThisFlipGlobal > mouse_4.tStartRefresh + 5-frameTolerance:
                # keep track of stop time/frame for later
                mouse_4.tStop = t  # not accounting for scr refresh
                mouse_4.frameNStop = frameN  # exact frame index
                # add timestamp to datafile
                thisExp.addData('mouse_4.stopped', t)
                # update status
                mouse_4.status = FINISHED
        if mouse_4.status == STARTED:  # only update if started and not finished!
            buttons = mouse_4.getPressed()
            if buttons != prevButtonState:  # button state changed?
                prevButtonState = buttons
                if sum(buttons) > 0:  # state changed to a new click
                    # check if the mouse was inside our 'clickable' objects
                    gotValidClick = False
                    clickableList = core.getFromNames(StartButton)
                    for obj in clickableList:
                        # is this object clicked on?
                        if obj.contains(mouse_4):
                            gotValidClick = True
                            mouse_4.clicked_name.append(obj.name)
                    x, y = mouse_4.getPos()
                    mouse_4.x.append(x)
                    mouse_4.y.append(y)
                    buttons = mouse_4.getPressed()
                    mouse_4.leftButton.append(buttons[0])
                    mouse_4.midButton.append(buttons[1])
                    mouse_4.rightButton.append(buttons[2])
                    mouse_4.time.append(mouse_4.mouseClock.getTime())
        
        # check for quit (typically the Esc key)
        if endExpNow or defaultKeyboard.getKeys(keyList=["escape"]):
            core.quit()
        
        # check if all components have finished
        if not continueRoutine:  # a component has requested a forced-end of Routine
            routineForceEnded = True
            break
        continueRoutine = False  # will revert to True if at least one component still running
        for thisComponent in ImagesComponents:
            if hasattr(thisComponent, "status") and thisComponent.status != FINISHED:
                continueRoutine = True
                break  # at least one component has not yet finished
        
        # refresh the screen
        if continueRoutine:  # don't flip if this routine is over or we'll get a blank screen
            win.flip()
    
    # --- Ending Routine "Images" ---
    for thisComponent in ImagesComponents:
        if hasattr(thisComponent, "setAutoDraw"):
            thisComponent.setAutoDraw(False)
    # Run 'End Routine' code from codegato
    #stop recording
    my_eyetracker.unsubscribe_from(tr.EYETRACKER_GAZE_DATA, gaze_data_callback)
    
    #Export of the gaze data (and pupils)
    thisExp.addData('ETRECORD_FR', ETRECORD_FR )
    thisExp.addData('LEFTPUPIL_FR', LEFTPUPIL_FR )
    thisExp.addData('RIGHTPUPIL_FR', RIGHTPUPIL_FR )
    #Test if you get the gaze data from pupil funciton
    thisExp.addData('TOBIIGAZELT', TOBIIGAZELT )
    
    #randomize everything
    color1 = random.uniform(0, 1)
    color2 = random.uniform(0, 1)
    color3 = random.uniform(0, 1)
    bkgcolor=[color1,color2,color3]
    win.setColor(bkgcolor)
    leftright = random.randint(1, 2)
    updown = random.randint(1, 2)
    positiongato_X = random.uniform(0.25, 0.8)*(-1)**(leftright)
    positiongato_Y = random.uniform(0.25, 0.8)*(-1)**(updown)
    sizegato_X = random.uniform(0.1, 0.25)
    sizegato_Y = random.uniform(0.1, 0.25) 
    gradogato = 360*random.uniform(0, 1) 
    # make sure the eyetracker recording stops
    if etRecord_3.status != FINISHED:
        etRecord_3.status = FINISHED
    # store data for trials (TrialHandler)
    trials.addData('mouse_4.x', mouse_4.x)
    trials.addData('mouse_4.y', mouse_4.y)
    trials.addData('mouse_4.leftButton', mouse_4.leftButton)
    trials.addData('mouse_4.midButton', mouse_4.midButton)
    trials.addData('mouse_4.rightButton', mouse_4.rightButton)
    trials.addData('mouse_4.time', mouse_4.time)
    trials.addData('mouse_4.clicked_name', mouse_4.clicked_name)
    # the Routine "Images" was not non-slip safe, so reset the non-slip timer
    routineTimer.reset()
    thisExp.nextEntry()
    
# completed 5.0 repeats of 'trials'


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
