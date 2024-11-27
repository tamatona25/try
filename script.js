function convertToBinary() {
  const input = document.getElementById('input').value;
  const output = input
    .split('')
    .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
  document.getElementById('output').value = output || '入力が空です';
}

function convertToText() {
  const input = document.getElementById('input').value;
  try {
    const output = input
      .split(' ')
      .map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('');
    document.getElementById('output').value = output || '入力が空です';
  } catch {
    document.getElementById('output').value = 'バイナリ形式が正しくありません';
  }
}

function copyToClipboard() {
  const output = document.getElementById('output');
  output.select(); // テキストエリア全体を選択
  output.setSelectionRange(0, 99999); // モバイル対応
  navigator.clipboard.writeText(output.value)
    .then(() => {
      alert('コピーしました！');
    })
    .catch(() => {
      alert('コピーに失敗しました');
    });
}
