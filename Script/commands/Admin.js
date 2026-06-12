const axios = require("axios");
const fs = require("fs-extra");
const moment = require("moment-timezone");

module.exports.config = {
  name: "admin",
  version: "1.0.0",
  hasPermission: 0,
  credits: "SHAHADAT SAHU",
  description: "Show Owner Info",
  commandCategory: "info",
  usages: "admin",
  cooldowns: 2
};

module.exports.run = async function ({ api, event }) {
  const time = moment().tz("Asia/Dhaka").format("DD/MM/YYYY hh:mm:ss A");

  const cachePath = __dirname + "/cache/owner.jpg";
  fs.ensureDirSync(__dirname + "/cache");

  const callback = () =>
    api.sendMessage(
      {
        body: `
┌───────────────⭓
│ 𝗢𝗪𝗡𝗘𝗥 𝗗𝗘𝗧𝗔𝗜𝗟𝗦
├───────────────
│ 👤 𝐍𝐚𝐦𝐞 : Ariyan khan 
│ 🚹 𝐆𝐞𝐧𝐝𝐞𝐫 : Male
│ ❤️ 𝐑𝐞𝐥𝐚𝐭𝐢𝐨𝐧 : Single
│ 🎂 𝐀𝐠𝐞 : 18+
│ 🕌 𝐑𝐞𝐥𝐢𝐠𝐢𝐨𝐧 : Islam
│ 🎓 𝐄𝐝𝐮𝐜𝐚𝐭𝐢𝐨𝐧 : HSC (2027)
│ 🏡 𝐀𝐝𝐝𝐫𝐞𝐬𝐬 : Mymensingh
└───────────────⭓

┌───────────────⭓
│ 𝗖𝗢𝗡𝗧𝗔𝗖𝗧 𝗟𝗜𝗡𝗞𝗦
├───────────────
│ 📘 Facebook:
│ https://www.facebook.com/profile.php?id=61551510743576
└───────────────⭓

┌───────────────⭓
│ 🕒 𝗨𝗽𝗱𝗮𝘁𝗲𝗱 𝗧𝗶𝗺𝗲
├───────────────
│ ${time}
└───────────────⭓
        `,
        attachment: fs.createReadStream(cachePath)
      },
      event.threadID,
      () => {
        if (fs.existsSync(cachePath)) {
          fs.unlinkSync(cachePath);
        }
      }
    );

  try {
    const response = await axios({
      url: "https://i.imgur.com/idyXtoO.jpeg",
      method: "GET",
      responseType: "stream"
    });

    response.data.pipe(fs.createWriteStream(cachePath)).on("close", callback);
  } catch (err) {
    console.log("Image download error:", err);
    api.sendMessage("❌ Image load fail hoise!", event.threadID);
  }
};
