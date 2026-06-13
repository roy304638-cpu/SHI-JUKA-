module.exports.config = {
 name: "tag",
 version: "1.0.0",
 hasPermssion: 2,
 credits: "Shahadat Islam",
 description: "Group এ সবাইকে মেনশন পাঠানো",
 commandCategory: "group",
 usages: "/tag",
 cooldowns: 2
};

module.exports.run = async ({ api, event }) => {
 const threadID = event.threadID;
 const threadInfo = await api.getThreadInfo(threadID);
 const memberIDs = threadInfo.participantIDs;

 const mentions = memberIDs
 .filter(id => id != api.getCurrentUserID())
 .map(id => ({
   tag: "@user",
   id
 }));

 await api.sendMessage({
   body: `📢 সবাইকে মেনশন করা হয়েছে!\n👑 Owner : Ariyan`,
   mentions
 }, threadID);
};
