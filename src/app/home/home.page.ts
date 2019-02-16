import {Component} from '@angular/core';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    percent = 0;
    radius = 100;
    fullTime: any = '00:01:30';
    progress: any = 0;
    timer: any = false;
    minutes = 1;
    seconds: any = 30;


    startTime() {
        const math = require('mathjs');
        this.timer = false;
        this.percent = 0;
        this.progress = 0;

        let timeSplit = this.fullTime.split(':');
        this.minutes = timeSplit[1];
        this.seconds = timeSplit[2];
        let totalSeconds =  Math.floor(this.minutes * 60) + parseInt(this.seconds);

    }
}
