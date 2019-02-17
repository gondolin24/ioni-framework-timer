import {Component} from '@angular/core';
import {Insomnia} from '@ionic-native/insomnia/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private insomnia: Insomnia) {

    }

    percent = 0;
    radius = 100;
    fullTime: any = '00:01:30';
    progress: any = 0;
    timer: any = false;
    minutes = 1;
    seconds: any = 30;
    hours: any = 0;
    elapsed: any = {
        h: '00',
        m: '00',
        s: '00',
    };


    subTimer: any = {
        h: '00',
        m: '00',
        s: '00',
    };


    overAllTimer: any = false;

    getTitle() {
        if (this.timer) {
            return this.subTimer.h + ':' + this.subTimer.m + ':' + this.subTimer.s;
        }
        return 'touch to start';
    }

    startTime() {
        let timeSplit = this.fullTime.split(':');



        if (!this.overAllTimer) {
            this.progressTimer();
            this.insomnia.keepAwake();
        }
        this.percent = 0;
        this.progress = 0;

        this.hours = timeSplit[0];
        this.minutes = timeSplit[1];
        this.seconds = timeSplit[2];
        let totalSeconds = Math.floor(this.minutes * 60) + parseInt(this.seconds);

        this.timer = setInterval(() => {

            if (this.percent === this.radius) {
                clearInterval(this.timer);
            }
            // let secondAdd = current.getSeconds() + this.progress;
            this.percent = Math.floor((this.progress / totalSeconds) * 100);
            let distance;

            if (this.progress === 0) {
                distance = 0;
            } else {
                distance = (this.progress - 1) * 1000;

            }

            this.subTimer.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.subTimer.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.subTimer.s = Math.floor((distance % (1000 * 60)) / 1000);

            this.subTimer.h = this.pad(this.subTimer.h, 2);
            this.subTimer.m = this.pad(this.subTimer.m, 2);
            this.subTimer.s = this.pad(this.subTimer.s, 2);
            this.progress++;

        }, 1000);

    }

    progressTimer() {
        let countDownDate = new Date();

        this.overAllTimer = setInterval(() => {
            let distance = Date.now() - countDownDate.getTime();
            this.elapsed.h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            this.elapsed.m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            this.elapsed.s = Math.floor((distance % (1000 * 60)) / 1000);

            this.elapsed.h = this.pad(this.elapsed.h, 2);
            this.elapsed.m = this.pad(this.elapsed.m, 2);
            this.elapsed.s = this.pad(this.elapsed.s, 2);
        }, 1000);


    }

    pad(num, size) {
        let s = num + '';
        while (s.length < size) {
            s = '0' + s;
        }
        return s;
    }

    stopTimer() {
        clearInterval(this.timer);
        clearInterval(this.overAllTimer);
        this.overAllTimer = false;
        this.timer = false;
        this.percent = 0;
        this.progress = 0;
        this.elapsed = {
            h: '00',
            m: '00',
            s: '00'
        };
        this.subTimer = {
            h: '00',
            m: '00',
            s: '00'
        };

        this.insomnia.allowSleepAgain();
    }
}
