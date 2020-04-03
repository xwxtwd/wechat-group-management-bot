const QrcodeTerminal = require('qrcode-terminal');
const {log, ScanStatus} = require('wechaty');

exports = module.exports = function onScan (qrcode, status) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    QrcodeTerminal.generate(qrcode, {small: false});  // show qrcode on console
    const qrcodeImageUrl = [
      'https://api.qrserver.com/v1/create-qr-code/?data=',
      encodeURIComponent(qrcode),
    ].join('');

    log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl);

  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  }
};
