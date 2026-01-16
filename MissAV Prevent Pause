  // ==UserScript==
  // @name         MissAV Auto-Pause Blocker
  // @namespace    http://tampermonkey.net/
  // @version      1.0
  // @description  別タブに移動しても動画が停止しないようにする
  // @author       You
  // @match        https://missav.ai/*
  // @match        https://missav.com/*
  // @match        https://*.missav.ai/*
  // @match        https://*.missav.com/*
  // @grant        none
  // @run-at       document-idle
  // ==/UserScript==

  (function() {
      'use strict';

      let userAction = false;

      // ユーザー操作を検知
      document.addEventListener('click', () => {
          userAction = true;
          setTimeout(() => userAction = false, 500);
      }, true);

      document.addEventListener('keydown', (e) => {
          if (e.code === 'Space' || e.key === 'k' || e.key === 'K') {
              userAction = true;
              setTimeout(() => userAction = false, 500);
          }
      }, true);

      // window.playerが利用可能になるまで待機してオーバーライド
      const overridePlayerPause = () => {
          if (window.player && !window.player._pauseOverridden) {
              const originalPause = window.player.pause.bind(window.player);
              window.player._pauseOverridden = true;

              window.player.pause = function() {
                  if (userAction) {
                      return originalPause();
                  }
                  // blur等による自動停止を無視
                  console.log('[MissAV] Auto-pause blocked');
              };

              console.log('[MissAV] Pause override applied');
          }
      };

      // 定期的にチェック（プレイヤーが後から読み込まれる場合に対応）
      const interval = setInterval(() => {
          overridePlayerPause();
          if (window.player && window.player._pauseOverridden) {
              clearInterval(interval);
          }
      }, 500);

      // 念のため30秒後にインターバルを停止
      setTimeout(() => clearInterval(interval), 30000);
  })();
