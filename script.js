// フォームと結果表示エリアの取得
const form = document.getElementById('airtableForm');
const responseDiv = document.getElementById('response');

// Airtableトークン情報
const AIRTABLE_TOKEN = 'patCyANjnXOJBqqG3'; // ここにトークンを入れる
const BASE_ID = 'chatbot';                     // ここにベースIDを入れる
const TABLE_NAME = 'chatbot1';                      // テーブル名

// フォーム送信時の処理
form.addEventListener('submit', async (event) => {
    event.preventDefault(); // ページのリロードを防ぐ

    // 入力データの取得
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Airtable APIエンドポイント
    const url = `https://api.airtable.com/v0/chatbot/chatbot1`;

    // APIリクエストの送信
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer patCyANjnXOJBqqG3`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                records: [
                    {
                        fields: {
                            Name: name,
                            Message: message,
                        },
                    },
                ],
            }),
        });

        // レスポンスの処理
        if (response.ok) {
            responseDiv.textContent = 'Data saved to Airtable successfully!';
        } else {
            const error = await response.json();
            responseDiv.textContent = `Error: ${error.error.message}`;
        }
    } catch (error) {
        responseDiv.textContent = `Request failed: ${error.message}`;
    }

    // フォームをリセット
    form.reset();
});
