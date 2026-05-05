"use strict";
  /**
   * أمر الإرسال التلقائي
   * التفعيل: /انسخ ياعبد
   * يرسل رسالة مخصصة كل فترة عشوائية بين 25 و45 ثانية
   */

  const activeTimers = new Map();

  const AUTO_MESSAGE = "𝑨𝑼𝑻𝑶 𝑹𝑬𝑷𝑳𝒀\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵 『༴‌卍⋆‌🕷️👑』⇣؍.َِ\n\n  🕷️𝑳𝑶𝑹𝑫 𝐒𝐏𝐈𝐃𝐄𝐑𝐒 ..➪ 𝑴𝑼𝒁𝑨𝑵 𝑲𝑶𝑵🕷️\n\n  ♕︎ 𝑻𝑯𝑬 𝑩𝑬𝑺𝑻  ♕︎\n\n  𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸\n\n  〘🥊─卍─🥊〙\n\n\n  𝐒𝐏𝐈𝐃𝐄𝐑𝐒 𝑻𝑯𝑬 𝑺𝑻𝑹𝑶𝑵𝑮𝑬𝑺𝑻 𝑶𝑭 𝑨𝑳𝑳 𝑻𝑰𝑴𝑬  『༴‌卍⋆‌🕷️』⇣؍.َِ\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵┊ 🕷️👑』⇣┊ ";

  function scheduleNext(api, threadID) {
    const delay = Math.floor(Math.random() * (45000 - 25000 + 1)) + 25000;

    const timer = setTimeout(() => {
      if (!activeTimers.has(threadID)) return;
      api.sendMessage(AUTO_MESSAGE, threadID, () => {});
      scheduleNext(api, threadID);
    }, delay);

    activeTimers.set(threadID, timer);
  }

  module.exports = {
    config: {
      name: "انسخ",
      aliases: [],
      description: "يرسل رسالة تلقائياً كل فترة عشوائية بين 25-45 ثانية",
      usage: "انسخ ياعبد",
      adminOnly: false,
    },

    async run({ api, event, args, threadID }) {
      if (!args.length || args[0] !== "ياعبد") {
        return api.sendMessage("❌ الأمر الصحيح: /انسخ ياعبد", threadID);
      }

      if (activeTimers.has(threadID)) {
        clearTimeout(activeTimers.get(threadID));
        activeTimers.delete(threadID);
        return api.sendMessage("⛔ تم إيقاف الإرسال التلقائي.", threadID);
      }

      scheduleNext(api, threadID);
      return api.sendMessage(
        "✅ تم تفعيل الإرسال التلقائي!\nسيُرسل البوت الرسالة كل 25-45 ثانية بشكل عشوائي.\nاكتب /انسخ ياعبد مرة أخرى للإيقاف.",
        threadID
      );
    },
  };
  