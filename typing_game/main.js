// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;
 
// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById("typed");
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

// 複数のテキストを格納する配列
const textLists = [
    "Hello World","Sounds good","How are you?",
   "It’s a nice day today","Good morning",
   "I am Japanese","Nice to meet you","Long time no see",
  "See you soon","Thank you","How was your weekend?",
  "It’s pretty cold today, isn’t it?","I agree","That’s a good idea",
  "I’m sorry","I went to see a movie yesterday"
  ];


// ランダムなテキストを表示
const createText = () => {
  // 正タイプした文字列をクリア
  typed = '';
  typedfield.textContent = typed;

  // 配列のインデックス数からランダムな数値を生成する
  let random = Math.floor(Math.random()*textLists.length);

  untyped = textLists[random];
  untypedfield.textContent = untyped;
};


// キー入力の判定
const keyPress = e => {

  // 間違った場合
  if(e.key !== untyped.substring(0,1)){
    wrap.classList.add("mistyped");
    // 100ms後に背景色を元に戻す
    setTimeout(() => {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }


  // 正しい場合
  score++;
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;

  // テキストがなくなったら新しいテキストを表示
  if(untyped === '') {
    createText();
  }
};

// タイピングスキルのランクを判定
const rankCheck = score => {

  // スコアの値を返す
  // return `${score}文字打てました！`;

  // テキストを格納する変数
  let text ="";

  // スコアに応じて異なるメッセージを変数textに格納する
  if(score < 100){
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  }else if(score < 200) {
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
   } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
   } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます!`;    
   }
  
   // 生成したメッセージと一緒に文字列を返す
   return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);

  const result = confirm(rankCheck(score));

  // Okボタンをクリックしたらリロード
  if(result == true){
    window.location.reload();
  }
};

// カウントダウンタイマー
const timer = () => {

  //タイマー部分のHTML要素（p要素）を取得する
  let time = count.textContent;

  const id = setInterval(() => {

    // カウントダウン
    time--;
    count.textContent = time;

    // タイマー停止
    if(time <= 0){
      gameOver(id);
    }
  }, 1000);
};


// ゲームスタート時の処理
start.addEventListener('click', () =>{

  // 表示させる
  count.style.display ='';

  //消す
  title.style.display = 'none';

  // カウントダウンタイマーを開始
  timer();
   
  // ランダムなテキストを表示
  createText();

  // 「スタート」ボタンを非表示
  start.style.display = 'none';

  // キーボードのイベント処理
 document.addEventListener('keypress', keyPress);

})

untypedfield.textContent = 'スタートボタンで開始';

