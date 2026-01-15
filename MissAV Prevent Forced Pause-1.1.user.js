// ==UserScript==
// @name         MissAV Prevent Forced Pause
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Blocks forced pause on missav
// @match        https://missav.ai/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // pause関数を上書き（偽物に差し替える）
    const originalPause = HTMLMediaElement.prototype.pause;
    HTMLMediaElement.prototype.pause = function(...args) {
        if (!this._allowPause) {
            console.log('[Tampermonkey] Prevented forced pause');
            return;
        }
        return originalPause.apply(this, args);
    };

    // 自分の操作（ユーザークリックなど）では停止できるように設定
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            const video = document.querySelector('video');
            if (video) {
                video._allowPause = true;
                video.pause();
                video._allowPause = false;
            }
        }
    });
})();
