const main = async () => {
  const buttonStart = document.querySelector('#buttonStart');
  const buttonStop = document.querySelector('#buttonStop');
  const audio = document.querySelector('#audio');

  // 引数で指定したメディアを含むトラックを持つMediaStreamを生成するメディア入力を使用する許可をユーザーに求めます。
  // https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia
  const stream = await navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  })

  // ユーザーのブラウザがaudio/webmに対応しているかをチェックする
  if (!MediaRecorder.isTypeSupported('audio/webm')) {
    console.warn('audio/webm is not supported')
  }

  // mediaRecorderインスタンスを作成
  const mediaRecorder = new MediaRecorder(stream, {
    mimeType: 'audio/webm',
  })

  // startをクリックすると収録開始
  buttonStart.addEventListener('click', () => {
    mediaRecorder.start();
    buttonStart.setAttribute('disabled', '');
    buttonStop.removeAttribute('disabled');
  })

  // stopをクリックすると収録終了
  buttonStop.addEventListener('click', () => {
    mediaRecorder.stop();
    buttonStart.removeAttribute('disabled');
    buttonStop.setAttribute('disabled', '');
  })

  // dataavailableイベントにイベントハンドラを追加して収録した音声データを取得します。
  mediaRecorder.addEventListener('dataavailable', event => {
    audio.src = URL.createObjectURL(event.data)
  })
}

main();
