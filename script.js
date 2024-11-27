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
