<template>
  <div>
    <nav id="mainnav">
      <p id="menuWrap">
        <a id="menu"><span id="menuBtn"></span></a>
      </p>
      <div class="panel">
        <ul>
          <li><a href="#header">TOP</a></li>
          <li><a href="#sec01">VISION</a></li>
          <li><a href="#sec02">MESSAGE</a></li>
          <li><a href="#sec03">SERVICE</a></li>
          <li><a href="#sec04">STORY</a></li>
          <li><a href="#sec05">PROFILE</a></li>
        </ul>
      </div>
    </nav>

    <header id="header">
      <img src="/images/mainImg.jpg" alt="" />
      <div id="slogan">
        <h1>Reunion</h1>
        <h2>人と人を、もう一度つなぐ</h2>
      </div>
    </header>

    <!-- VISION -->
    <section id="sec01">
      <header>
        <h2>VISION</h2>
      </header>
      <div class="vision">
        Reunionは、長らく会っていない友人・知人との再会をサポートするサービスです。人生の大切な縁をもう一度つなぎ、思い出を新たに共有できる場を提供します。
      </div>
    </section>
    <!-- // VISION -->

    <!-- MESSAGE -->
    <section id="sec02">
      <div class="wrap">
        <p class="bg"><img src="/images/sec02_01.jpg" alt="" /></p>
        <div class="txt">
          <div class="vMid">
            <h2>MESSAGE</h2>
            <p>
              離れていても、気持ちは繋がっています。Reunionは、再会のきっかけをテクノロジーでつくり出すことで、あなたの人間関係を豊かにします。
            </p>
          </div>
        </div>
      </div>
      <div id="sec02_02" class="wrap">
        <p class="bg"><img src="/images/sec02_02.jpg" alt="" /></p>
        <div class="txt">
          <div class="vMid">
            <h2>MESSAGE</h2>
            <p>
              Reunionを使えば、再会イベントの企画から連絡、日程調整、参加管理まで一括して行うことができます。思い出をつなぐ一歩を、今ここから。
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- // MESSAGE -->

    <!-- SERVICE -->
    <section id="sec03">
      <div class="inner">
        <ul class="col3">
          <li>
            <h2>イベント作成</h2>
            <img
              src="/images/circleImg01.png"
              width="288"
              height="288"
              alt=""
            />
            <p>
              Reunionでは、誰でも簡単に再会イベントを作成できます。参加者を招待し、開催場所や日時をスムーズに調整できます。
            </p>
          </li>
          <li>
            <h2>決済機能</h2>
            <img
              src="/images/circleImg02.png"
              width="288"
              height="288"
              alt=""
            />
            <p>
              Stripeと連携しており、参加費の事前決済にも対応。参加者も主催者も安心・スムーズに利用可能です。
            </p>
          </li>
          <li>
            <h2>思い出の共有</h2>
            <img
              src="/images/circleImg03.png"
              width="288"
              height="288"
              alt=""
            />
            <p>
              再会後の写真やメッセージを簡単に共有できる機能で、イベント後もつながりが続きます。
            </p>
          </li>
        </ul>
      </div>
    </section>
    <!-- // SERVICE -->

    <!-- STORY -->
    <section id="sec04">
      <div class="inner">
        <ul class="col2">
          <li>
            <h2>利用者の声</h2>
            <p>
              Reunionを使って高校時代の同窓会を開催しました。連絡先が分からなかった友人とも繋がれ、忘れられない一日になりました！（40代・男性）
            </p>
          </li>
          <li>
            <h2>再会の力</h2>
            <p>
              再会を通じて新しいビジネスが始まったり、失われていた絆が戻ったりすることも。Reunionは、そのきっかけを提供します。
            </p>
          </li>
        </ul>
      </div>
    </section>
    <!-- // STORY -->

    <!-- PROFILE -->
    <section id="sec05">
      <header>
        <h2>PROFILE</h2>
      </header>
      <div class="inner">
        <ul class="col2">
          <li>
            <dl>
              <dt>社名</dt>
              <dd>Reunion株式会社</dd>
              <dt>代表取締役</dt>
              <dd>川田 太郎</dd>
              <dt>所在地</dt>
              <dd>東京都渋谷区〇〇1-2-3</dd>
              <dt>連絡先</dt>
              <dd>info@reunion-app.com</dd>
              <dt>設立</dt>
              <dd>2025年4月1日</dd>
              <dt>事業内容</dt>
              <dd>再会支援サービスの提供</dd>
            </dl>
          </li>
          <li>
            <div id="map">
              <!-- GOOGLE MAP -->
              <iframe
                src="https://www.google.com/maps/embed?..."
                allowfullscreen
              ></iframe>
              <!-- // GOOGLE MAP -->
            </div>
          </li>
        </ul>
      </div>
    </section>
    <!-- // PROFILE -->

    <footer id="footer">
      Copyright(c) 2025 Reunion Inc. All Rights Reserved.
    </footer>
  </div>
</template>

<style scoped>
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
form,
fieldset,
input,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
address,
caption,
cite,
code,
dfn,
em,
strong,
th,
var {
  font-style: normal;
}
ul {
  list-style: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
caption,
th {
  text-align: left;
}
q:before,
q:after {
  content: '';
}
object,
embed {
  vertical-align: top;
}
legend {
  display: none;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
}
img,
abbr,
acronym,
fieldset {
  border: 0;
}

body {
  font: 14px/1.9 'Noto Sans JP', Arial, Verdana, 游ゴシック, YuGothic,
    'ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', メイリオ, Meiryo,
    sans-serif;
  font-weight: 300;
  -webkit-text-size-adjust: 100%;
  overflow-x: hidden;
  color: #000;
  background: #fff;
}

a {
  color: #0066ff;
  text-decoration: none;
}

a:hover,
.active {
  text-decoration: underline;
}

a:active,
a:focus,
input:active,
input:focus {
  outline: 0;
}

/* ヘッダー
------------------------------------------------------------*/
#header {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 568px;
}

#header img {
  position: absolute;
  left: 50%;
  width: 1280px;
  height: 568px;
  margin-left: -640px;
}

#slogan {
  position: absolute;
  top: 50%;
  width: 100%;
  -webkit-transform: translate(0, -50%);
  transform: translate(0, -50%);
  color: #fff;
  line-height: 1.2;
  text-align: center;
}

#slogan h1 {
  font-size: 40px;
  font-family: 'Pacifico', cursive;
  margin-bottom: 20px;
  font-weight: normal;
}

#slogan h2 {
  font-size: 20px;
  font-weight: normal;
}

/* フッター
------------------------------------------------------------*/
#footer {
  clear: both;
  padding: 50px 10px 50px 0;
  text-align: center;
  font-size: 12px;
}

/* 共通
------------------------------------------------------------*/
h1,
h2 {
  font-family: 'Josefin Sans', 'Noto Sans JP', serif;
}

img {
  width: 100%;
  height: auto;
}

section {
  clear: both;
}

section h2 {
  font-size: 22px;
  font-weight: normal;
  text-align: center;
}

.inner {
  width: 94%;
  margin: 0 auto;
  padding-bottom: 50px;
}

.col2 li {
  display: inline-block;
  width: 100%;
  margin: 20px 0 20px 0;
}

/* SEC01 VISION
------------------------------------------------------------*/

.vision {
  width: 60%;
  margin: 0 auto;
  padding-bottom: 80px;
}

/* SEC02 MESSAGE
------------------------------------------------------------*/
.wrap {
  clear: both;
  width: 100%;
  background: #f6f6f6;
}

.bg {
  line-height: 0;
}

.txt h2 {
  padding: 0 0 20px !important;
}

/* SEC03 SERVICE MESSAGE STORY
------------------------------------------------------------*/
.col3 li {
  margin-bottom: 50px;
}

.col3 img {
  max-width: 288px;
  display: block;
  margin: -5px auto 20px;
}

/* SEC04 STORY & SUCCESS
------------------------------------------------------------*/
#sec04 {
  background: url(../images/bgSec04.jpg) no-repeat 100% 100% fixed;
  background-size: cover;
  -webkit-background-size: cover;
  color: #fff;
}

/* SEC05 PROFILE
------------------------------------------------------------*/
#sec05 {
  padding-top: 50px;
}

#sec05 dl {
  line-height: 1.2;
}

#sec05 dt {
  clear: left;
  float: left;
  display: block;
  width: 30%;
  margin-right: 10%;
  margin-bottom: 20px;
  text-align: right;
  line-height: 1.6em;
}

#sec05 dd {
  width: 60%;
  float: left;
  text-align: left;
  margin-bottom: 15px;
  line-height: 1.6em;
}

#sec05 header {
  display: none;
}

#map {
  position: relative;
  padding-bottom: 75%;
  height: 0;
  overflow: hidden;
}

#map iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100% !important;
  height: 100% !important;
  border: 0;
}

/* RESPONSIVE 設定
------------------------------------------------------------*/

@media only screen and (min-width: 1200px) {
  .inner {
    width: 1024px;
    padding-bottom: 120px;
  }
  section h2 {
    padding: 70px 0 20px;
  }
  .txt h2 {
    padding: 0 0 20px !important;
  }
}

@media only screen and (min-width: 800px) {
  body {
    font-size: 14px;
  }

  a#menu {
    display: none;
  }

  .panel {
    display: block !important;
  }

  #mainnav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 500;
  }

  #mainnav ul {
    text-align: right;
    padding-right: 30px;
  }

  #mainnav li {
    display: inline-block;
    padding: 45px 10px 20px;
    font-size: 14px;
    font-weight: 300;
  }

  #mainnav a {
    color: #000;
  }

  #mainnav.changeNav {
    background: rgba(255, 255, 255, 0.9);
    border-bottom: 1px solid #d1d1d1;
  }

  #mainnav.changeNav li {
    padding: 20px 10px;
  }

  /* SEC02 MESSAGE
	-----------------*/
  .txt,
  .bg {
    width: 50%;
    float: left;
    display: table;
    background: #f6f6f6;
  }

  #sec02_02 .txt,
  #sec02_02 .bg {
    float: right;
  }

  .vMid {
    display: table-cell;
    padding: 0 100px;
    vertical-align: middle;
  }

  /* SEC03 SERVICE MESSAGE STORY
	-----------------*/
  .col3 {
    text-align: center;
  }

  .col3 li {
    display: inline-block;
    width: 30%;
    padding: 0 1.5%;
    margin-bottom: 0;
    vertical-align: top;
    text-align: left;
  }

  /* SEC05 PROFILE
	-----------------*/
  #sec05 {
    padding-top: 120px;
  }

  #footer {
    padding: 30px 10px 70px 0;
  }
}

@media only screen and (min-width: 641px) {
  .col2 li {
    width: 40%;
    padding: 0 3%;
    vertical-align: top;
  }
}

@media only screen and (max-width: 640px) {
  #map iframe {
    width: 96% !important;
    left: 2%;
  }
}

@media only screen and (max-width: 799px) {
  #slogan h1 {
    font-size: 31px;
  }

  #slogan h2 {
    font-size: 16px;
  }

  a#menu {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
    margin: 10px;
  }

  #menuBtn {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 18px;
    height: 2px;
    margin: -1px 0 0 -7px;
    background: #fff;
    transition: 0.2s;
  }

  #menuBtn:before,
  #menuBtn:after {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 18px;
    height: 2px;
    background: #fff;
    transition: 0.3s;
  }

  #menuBtn:before {
    margin-top: -7px;
  }

  #menuBtn:after {
    margin-top: 5px;
  }

  a#menu .close {
    background: transparent;
  }

  a#menu .close:before,
  a#menu .close:after {
    margin-top: 0;
  }

  a#menu .close:before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }

  a#menu .close:after {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  .panel {
    width: 100%;
    display: none;
    overflow: hidden;
    position: relative;
    left: 0;
    top: 0;
    z-index: 100;
  }

  #mainnav {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    text-align: right;
    z-index: 500;
  }

  #mainnav ul {
    border-bottom: 1px solid #ccc;
    background: #fff;
    text-align: left;
  }

  #mainnav li a {
    position: relative;
    display: block;
    padding: 15px 25px;
    border-bottom: 1px solid #ccc;
    color: #000;
    font-weight: 400;
  }

  #mainnav li a:before {
    display: block;
    content: '';
    position: absolute;
    top: 50%;
    left: 5px;
    width: 6px;
    height: 6px;
    margin: -4px 0 0 0;
    border-top: solid 2px #000;
    border-right: solid 2px #000;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  .col3 li {
    margin: 0 auto;
    display: block;
    max-width: 288px;
  }
}

@media only screen and (max-width: 1199px) {
  section h2 {
    padding: 50px 0 20px 0;
  }
  #sec01 h2 {
    padding: 70px 0 20px;
  }
  .vMid {
    padding: 0 20px;
  }
}
</style>
