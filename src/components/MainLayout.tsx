import React from 'react';
import { MainLayoutInterface } from '../interface/MainLayout';
import { RouteProps } from 'react-router-dom';
import Toolbar from './Toolbar';
import AudioEffects from './AudioEffects';
import WaveSurfer from 'wavesurfer.js';

const WaveSurferTimeline = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');
const WaveSurferRegions = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

type State = MainLayoutInterface;

class MainLayout extends React.Component<RouteProps, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: 'kick-off',
            wavesurfer: null,
        }
        this.formatTimeCallback = this.formatTimeCallback.bind(this);
        this.timeInterval = this.timeInterval.bind(this);
        this.primaryLabelInterval = this.primaryLabelInterval.bind(this);
        this.secondaryLabelInterval = this.secondaryLabelInterval.bind(this);

    }
    componentDidMount() {
        let wavesurfer = WaveSurfer.create({
            container: '#waveform',
            waveColor: 'black',
            progressColor: 'yellow',
            backend: 'MediaElement',
            plugins: [
                WaveSurferRegions.create({
                    regions: [
                        {
                            start: 0,
                            end: 5,
                            color: 'hsla(400, 100%, 30%, 0.1)'
                        },
                        {
                            start: 10,
                            end: 100,
                            color: 'hsla(200, 50%, 70%, 0.1)'
                        }
                    ]
                }),
                WaveSurferTimeline.create({
                    container: '#timeline',
                    formatTimeCallback: this.formatTimeCallback,
                    timeInterval: this.timeInterval,
                    primaryLabelInterval: this.primaryLabelInterval,
                    secondaryLabelInterval: this.secondaryLabelInterval,
                    primaryColor: 'blue',
                    secondaryColor: 'red',
                    primaryFontColor: 'blue',
                    secondaryFontColor: 'red'
                })
            ]
        });

        this.setState({'wavesurfer': wavesurfer});
        
        wavesurfer.on('ready', function () {
            console.log('ready')
            // wavesurfer.play();
        });

        wavesurfer.on('error', function(e) {
            console.warn(e);
        });

        wavesurfer.load('http://localhost:3000/test.wav');

    }
    formatTimeCallback(seconds: number, pxPerSec: number) {
        seconds = Number(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        // fill up seconds with zeroes
        let secondsStr = Math.round(seconds).toString();
        if (pxPerSec >= 25 * 10) {
            secondsStr = seconds.toFixed(2);
        } else if (pxPerSec >= 25 * 1) {
            secondsStr = seconds.toFixed(1);
        }

        if (minutes > 0) {
            if (seconds < 10) {
                secondsStr = '0' + secondsStr;
            }
            return `${minutes}:${secondsStr}`;
        }
        return secondsStr;
    }

    timeInterval(pxPerSec: number) {
        let retval = 1;
        if (pxPerSec >= 25 * 100) {
            retval = 0.01;
        } else if (pxPerSec >= 25 * 40) {
            retval = 0.025;
        } else if (pxPerSec >= 25 * 10) {
            retval = 0.1;
        } else if (pxPerSec >= 25 * 4) {
            retval = 0.25;
        } else if (pxPerSec >= 25) {
            retval = 1;
        } else if (pxPerSec * 5 >= 25) {
            retval = 5;
        } else if (pxPerSec * 15 >= 25) {
            retval = 15;
        } else {
            retval = Math.ceil(0.5 / pxPerSec) * 60;
        }
        return retval;
    }

    primaryLabelInterval(pxPerSec: number) {
        let retval = 1;
        if (pxPerSec >= 25 * 100) {
            retval = 10;
        } else if (pxPerSec >= 25 * 40) {
            retval = 4;
        } else if (pxPerSec >= 25 * 10) {
            retval = 10;
        } else if (pxPerSec >= 25 * 4) {
            retval = 4;
        } else if (pxPerSec >= 25) {
            retval = 1;
        } else if (pxPerSec * 5 >= 25) {
            retval = 5;
        } else if (pxPerSec * 15 >= 25) {
            retval = 15;
        } else {
            retval = Math.ceil(0.5 / pxPerSec) * 60;
        }
        return retval;
    }

    secondaryLabelInterval(pxPerSec: number) {
        // draw one every 10s as an example
        return Math.floor(10 / this.timeInterval(pxPerSec));
    }

    render() {
        return (
            <div id="main">
              <Toolbar />
              <div className="row">
                  <div className="col-xs-12 col-lg-12">
                      <div className="wrapper">
                        <AudioEffects />
                        <div className="col-md-offset-3 col-md-9 visualizer">
                          <h5 className='no-file-loaded'>+ Load your audio as file, Youtube URL or Microphone</h5>
                          <div id="waveform"></div>
                          <div id="timeline"></div>
                          <div className="controls">
                            <div className="row">
                                <div className="col-sm-7">
                                    <button onClick={() => this.state.wavesurfer && this.state.wavesurfer.playPause()} className="btn btn-primary" data-action="play">
                                        <i className="glyphicon glyphicon-play"></i>
                                        Play
                                        /
                                        <i className="glyphicon glyphicon-pause"></i>
                                        Pause
                                    </button>
                                </div>

                                <div className="col-sm-1">
                                    <i className="glyphicon glyphicon-zoom-in"></i>
                                </div>

                                <div className="col-sm-3">
                                <input data-action="zoom" type="range" min="20" max="5000" value="0" style={{"width": "100%"}} />
                                </div>

                                <div className="col-sm-1">
                                    <i className="glyphicon glyphicon-zoom-out"></i>
                                </div>
                            </div>
                        </div>
                        </div>
                      </div>
                  </div>
              </div>
            </div>
        );
    }
}

export default MainLayout;