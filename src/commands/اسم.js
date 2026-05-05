"use strict";
  /**
   * /اسم <الاسم> — تغيير اسم البوت وقفله كل 8-12 ثانية
   * /اسم ايقاف  — إيقاف قفل الاسم
   * حماية: تأخير عشوائي + محاكاة بشرية
   */

  if (!global._nameLockTimers) global._nameLockTimers = new Map();
  if (!global._nameLockData)   global._nameLockData   = new Map();

  const lockInterval = () => Math.floor(Math.random() * 4000) + 8000; // 8-12s
  const microDelay   = () => Math.floor(Math.random() * 900) + 100;

  function scheduleLock(api, threadID) {
    const timer = setTimeout(async () => {
      if (!global._nameLockTimers || !global._nameLockTimers.has(threadID)) return;
      const data = global._nameLockData.get(threadID);
      if (!data) return;
      try {
        await new Promise(r => setTimeout(r, microDelay()));
        if (!global._nameLockTimers.has(threadID)) return;
        api.changeNickname(data.name, threadID, data.participantID, () => {});
      } catch (_) {}
      scheduleLock(api, threadID);
    }, lockInterval());
    global._nameLockTimers.set(threadID, timer);
  }

  module.exports = {
    config: {
      name: "اسم",
      aliases: [],
      description: "تغيير اسم البوت وقفله تلقائياً كل 8-12 ثانية",
      usage: "اسم <الاسم الجديد> | اسم ايقاف",
      adminOnly: false,
    },
    async run({ api, args, threadID }) {
      if (!args.length) {
        return api.sendMessage(
          "❌ الاستخدام:\n/اسم <الاسم الجديد> — تغيير الاسم وقفله\n/اسم ايقاف — إيقاف قفل الاسم",
          threadID
        );
      }

      // إيقاف القفل
      if (args[0] === "ايقاف") {
        if (!global._nameLockTimers || !global._nameLockTimers.has(threadID)) {
          return api.sendMessage("⚠️ لا يوجد قفل اسم نشط في هذه المحادثة.", threadID);
        }
        clearTimeout(global._nameLockTimers.get(threadID));
        global._nameLockTimers.delete(threadID);
        global._nameLockData.delete(threadID);
        return api.sendMessage("✅ تم إيقاف قفل الاسم.", threadID);
      }

      // تغيير الاسم وتفعيل القفل
      const newName       = args.join(" ");
      const participantID = api.getCurrentUserID();

      try {
        await new Promise((res, rej) =>
          api.changeNickname(newName, threadID, participantID, (e) => e ? rej(e) : res())
        );
      } catch (e) {
        return api.sendMessage("❌ فشل تغيير الاسم: " + (e?.message || e), threadID);
      }

      if (global._nameLockTimers && global._nameLockTimers.has(threadID)) {
        clearTimeout(global._nameLockTimers.get(threadID));
      }

      global._nameLockData.set(threadID, { name: newName, participantID });
      scheduleLock(api, threadID);

      return api.sendMessage(
        "✅ تم تغيير الاسم إلى \"" + newName + "\" وتفعيل القفل.\nيُعاد تعيين الاسم كل 8-12 ثانية تلقائياً.\n⛔ للإيقاف: /اسم ايقاف",
        threadID
      );
    },
  };
  