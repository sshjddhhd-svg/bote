"use strict";
  /**
   * /انسخ — إرسال تلقائي 20-30 ثانية
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * keepTyping يُجدد مؤشر الكتابة كل 3 ثوانٍ
   * Facebook يُلغي المؤشر بعد ~5 ثوانٍ بدون تجديد
   */

  if (!global._autoSendTimers) global._autoSendTimers = new Map();

  const AUTO_MESSAGE = "𝑨𝑼𝑻𝑶 𝑹𝑬𝑷𝑳𝒀\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵 『༴‌卍⋆‌🕷️👑』⇣؍.َِ\n\n  🕷️𝑳𝑶𝑹𝑫 𝐒𝐏𝐈𝐃𝐄𝐑𝐒 ..➪ 𝑴𝑼𝒁𝑨𝑵 𝑲𝑶𝑵🕷️\n\n  ♕︎ 𝑻𝑯𝑬 𝑩𝑬𝑺𝑻  ♕︎\n\n  𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸\n\n  〘🥊─卍─🥊〙\n\n\n  𝐒𝐏𝐈𝐃𝐄𝐑𝐒 𝑻𝑯𝑬 𝑺𝑻𝑹𝑶𝑵𝑮𝑬𝑺𝑻 𝑶𝑭 𝑨𝑳𝑳 𝑻𝑰𝑴𝑬  『༴‌卍⋆‌🕷️』⇣؍.َِ\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵┊ 🕷️👑』⇣┊ ";

  // ── keepTyping: الإصلاح الجوهري لمشكلة مؤشر الكتابة ─────────────────────────
  function keepTyping(api, threadID, durationMs) {
    return new Promise(resolve => {
      let active = true;
      const sendInd = () => {
        if (!active) return;
        try { api.sendTypingIndicator(threadID, () => {}); } catch (_) {}
      };
      sendInd();
      const iv = setInterval(sendInd, 3000);
      setTimeout(() => { active = false; clearInterval(iv); resolve(); }, durationMs);
    });
  }

  // ── دوال الحماية ─────────────────────────────────────────────────────────────
  const preDelay     = () => Math.floor(Math.random() * 1400) + 400;
  const typingDur    = () => Math.min(Math.max(AUTO_MESSAGE.length * (Math.random() * 0.8 + 0.3), 1200), 4500);
  const postPause    = () => Math.floor(Math.random() * 600);
  const nextInterval = () => Math.max(18000, Math.floor(Math.random() * 10001) + 20000 + Math.floor(Math.random() * 4000) - 2000);

  // ── جدولة الإرسال ─────────────────────────────────────────────────────────────
  function scheduleNext(api, threadID) {
    const delay = nextInterval();
    const timer = setTimeout(async () => {
      if (!global._autoSendTimers || !global._autoSendTimers.has(threadID)) return;

      if (Math.random() < 0.07) { scheduleNext(api, threadID); return; }

      try {
        await new Promise(r => setTimeout(r, preDelay()));
        if (!global._autoSendTimers.has(threadID)) return;

        await keepTyping(api, threadID, typingDur());
        if (!global._autoSendTimers.has(threadID)) return;

        await new Promise(r => setTimeout(r, postPause()));
        if (!global._autoSendTimers.has(threadID)) return;

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
      description: "إرسال تلقائي بشري كل 20-30 ثانية مع مؤشر كتابة متجدد",
      usage: "انسخ",
      adminOnly: false,
    },
    async run({ api, threadID }) {
      if (global._autoSendTimers && global._autoSendTimers.has(threadID)) {
        return api.sendMessage("⚠️ الإرسال التلقائي نشط بالفعل.\nللإيقاف: /توقف", threadID);
      }
      scheduleNext(api, threadID);
      return api.sendMessage(
        "✅ تم تفعيل الإرسال التلقائي!\n"
        + "⏱ يُرسل كل 20-30 ثانية عشوائياً.\n"
        + "✍️ مؤشر الكتابة المتجدد مفعّل.\n"
        + "⛔ للإيقاف: /توقف",
        threadID
      );
    },
  };
  