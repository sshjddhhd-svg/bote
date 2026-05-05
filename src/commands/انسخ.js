"use strict";
  /**
   * /انسخ ياعبد — تفعيل الإرسال التلقائي
   * حماية: كتابة بشرية + عشوائية إيقاع + تخطي عشوائي + jitter
   */

  if (!global._autoSendTimers) global._autoSendTimers = new Map();

  const AUTO_MESSAGE = "𝑨𝑼𝑻𝑶 𝑹𝑬𝑷𝑳𝒀\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵 『༴‌卍⋆‌🕷️👑』⇣؍.َِ\n\n  🕷️𝑳𝑶𝑹𝑫 𝐒𝐏𝐈𝐃𝐄𝐑𝐒 ..➪ 𝑴𝑼𝒁𝑨𝑵 𝑲𝑶𝑵🕷️\n\n  ♕︎ 𝑻𝑯𝑬 𝑩𝑬𝑺𝑻  ♕︎\n\n  𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸\n\n  〘🥊─卍─🥊〙\n\n\n  𝐒𝐏𝐈𝐃𝐄𝐑𝐒 𝑻𝑯𝑬 𝑺𝑻𝑹𝑶𝑵𝑮𝑬𝑺𝑻 𝑶𝑭 𝑨𝑳𝑳 𝑻𝑰𝑴𝑬  『༴‌卍⋆‌🕷️』⇣؍.َِ\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵┊ 🕷️👑』⇣┊ ";

  const humanDelay = () => Math.floor(Math.random() * 1500) + 700;
  const typingMs   = (msg) => Math.min(Math.max(msg.length * 18, 800), 4500) * (0.75 + Math.random() * 0.5);
  const nextDelay  = () => Math.max(22000, Math.floor(Math.random() * 20001) + 25000 + Math.floor(Math.random() * 6000) - 3000);

  function scheduleNext(api, threadID) {
    const delay = nextDelay();
    const timer = setTimeout(async () => {
      if (!global._autoSendTimers || !global._autoSendTimers.has(threadID)) return;

      // 6% chance to skip a cycle (human-like)
      if (Math.random() < 0.06) { scheduleNext(api, threadID); return; }

      try {
        await new Promise(r => setTimeout(r, humanDelay()));
        if (!global._autoSendTimers.has(threadID)) return;

        try { api.sendTypingIndicator(threadID); } catch (_) {}
        await new Promise(r => setTimeout(r, typingMs(AUTO_MESSAGE)));
        if (!global._autoSendTimers.has(threadID)) return;

        await new Promise(r => setTimeout(r, Math.random() * 400));
        api.sendMessage(AUTO_MESSAGE, threadID, () => {});
      } catch (_) {}

      scheduleNext(api, threadID);
    }, delay);
    global._autoSendTimers.set(threadID, timer);
  }

  module.exports = {
    config: {
      name: "انسخ",
      aliases: [],
      description: "تفعيل الإرسال التلقائي كل 25-45 ثانية بسلوك بشري",
      usage: "انسخ ياعبد",
      adminOnly: false,
    },
    async run({ api, args, threadID }) {
      if (!args.length || args[0] !== "ياعبد") {
        return api.sendMessage("❌ الأمر الصحيح: /انسخ ياعبد", threadID);
      }
      if (global._autoSendTimers && global._autoSendTimers.has(threadID)) {
        return api.sendMessage("⚠️ الإرسال التلقائي نشط بالفعل.\nللإيقاف: /توقف ياعبد", threadID);
      }
      scheduleNext(api, threadID);
      return api.sendMessage(
        "✅ تم تفعيل الإرسال التلقائي!\nيُرسل كل 25-45 ثانية بسلوك بشري عشوائي.\n⛔ للإيقاف: /توقف ياعبد",
        threadID
      );
    },
  };
  