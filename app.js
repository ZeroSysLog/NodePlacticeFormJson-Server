// 必要なモジュールをインポート
const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

// Expressアプリケーションの作成
const app = express();

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));

// ルートルートの設定
app.get("/", async (req, res) => {
  const response = await axios.get("http://localhost:3001/data");
  res.send(
    `<style>
      .center {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
      }
      form {
        margin-bottom: 1em;
      }
      input {
        margin-bottom: 0.5em;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        margin-bottom: 0.5em;
      }
    </style>
    <div class="center">
    <h1>Practice Form</h1>
      <form method="post">
        <input name="name" placeholder="Name">
        <input name="email" placeholder="Email">
        <input name="age" placeholder="Age">
        <button type="submit">Submit</button>
      </form>
      <ul>${response.data
        .map((item) => `<li>Name: ${item.name}, Email: ${item.email}, Age: ${item.age}</li>`)
        .join("")}</ul>
    </div>`
  );
});

// POSTリクエストのハンドラ
app.post("/", async (req, res) => {
  await axios.post("http://localhost:3001/data", { name: req.body.name, email: req.body.email, age: req.body.age });
  res.redirect("/");
});

// サーバの起動
app.listen(3000, () => console.log("Server is running on port 3000"));