const request = require("request");
const fs = require("fs-extra");

module.exports.config = {
  name: "owner",
  version: "2.0.1",
  hasPermssion: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info",
  commandCategory: "Information",
  usages: "owner",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {

  fs.ensureDirSync(__dirname + "/cache");

  const info = `
╔═════════════════════ ✿
║ ✨ 𝗢𝗪𝗡𝗘𝗥 𝗜𝗡𝗙𝗢 ✨
╠═════════════════════ ✿
║ 👑 𝗡𝗮𝗺𝗲 : Ariyan Khan
║ 🧸 𝗡𝗶𝗰𝗸 𝗡𝗮𝗺𝗲 : Ariyan
║ 🎂 𝗔𝗴𝗲 : 18+
║ 💘 𝗥𝗲𝗹𝗮𝘁𝗶𝗼𝗻 : Single
║ 🎓 𝗘𝗱𝘂𝗰𝗮𝘁𝗶𝗼𝗻 : HSC
║ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀 : Mymensingh
╠═════════════════════ ✿
║ 🔗 𝗖𝗢𝗡𝗧𝗔𝗖𝗧
║ 📘 Facebook:
║ https://www.facebook.com/profile.php?id=61551510743576
╚═════════════════════ ✿
`;

  const images = [
    "https://i.imgur.com/8WBso8x.png",
    "https://i.imgur.com/0VZu5eY.png",
    "https://i.imgur.com/bkixgPK.jpeg",
    "https://i.imgur.com/z6G6L4c.jpeg"
  ];

  const randomImg = images[Math.floor(Math.random() * images.length)];
  const path = __dirname + "/cache/owner.jpg";

  const callback = () =>
    api.sendMessage(
      {
        body: info,
        attachment: fs.createReadStream(path)
      },
      event.threadID,
      () => {
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
        }
      }
    );

  try {
    request(encodeURI(randomImg))
      .pipe(fs.createWriteStream(path))
      .on("close", callback)
      .on("error", (err) => {
        console.log(err);
        api.sendMessage("❌ Image load fail hoise!", event.threadID);
      });
  } catch (e) {
    console.log(e);
  }
};
