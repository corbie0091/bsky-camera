/* 기기에 설치된 공유 앱으로 사진 파일을 전달합니다. */
(function (global) {
  'use strict';

  function sharePhoto(file) {
    if (!file || typeof navigator.share !== 'function') {
      return Promise.resolve({ status: 'unsupported' });
    }
    try {
      if (typeof navigator.canShare === 'function' && !navigator.canShare({ files: [file] })) {
        return Promise.resolve({ status: 'unsupported' });
      }
      // 호출자의 버튼 터치가 유지되도록 비동기 작업 전에 공유창을 엽니다.
      return navigator.share({ files: [file], title: '비스카이 사진' })
        .then(function () { return { status: 'shared' }; })
        .catch(function (error) {
          return { status: error.name === 'AbortError' ? 'cancelled' : 'failed' };
        });
    } catch (error) {
      return Promise.resolve({ status: error.name === 'AbortError' ? 'cancelled' : 'failed' });
    }
  }

  global.BskyShare = { sharePhoto: sharePhoto };
})(window);
