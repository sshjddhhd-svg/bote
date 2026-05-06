"use strict";
  /**
   * /انسخ ياعبد — إرسال تلقائي بين 20-30 ثانية
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * أنظمة الحماية:
   *  1. تأخير بشري قبل بدء الكتابة (400-1800ms)
   *  2. مؤشر الكتابة الحقيقي (sendTypingIndicator)
   *  3. مدة كتابة متناسبة مع طول الرسالة + عشوائية
   *  4. micro-pause قبل الإرسال الفعلي (0-600ms)
   *  5. jitter على الفترة الزمنية ±2 ثانية
   *  6. تخطي عشوائي 7% (يكسر النمط الثابت)
   *  7. تأخير "إعادة قراءة" عشوائي (0-300ms) بعد typing
   *  8. كل العمليات محاطة بـ try/catch صامتة
   */

  if (!global._autoSendTimers) global._autoSendTimers = new Map();

  const AUTO_MESSAGE = "𝑨𝑼𝑻𝑶 𝑹𝑬𝑷𝑳𝒀\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵 『༴‌卍⋆‌🕷️👑』⇣؍.َِ\n\n  🕷️𝑳𝑶𝑹𝑫 𝐒𝐏𝐈𝐃𝐄𝐑𝐒 ..➪ 𝑴𝑼𝒁𝑨𝑵 𝑲𝑶𝑵🕷️\n\n  ♕︎ 𝑻𝑯𝑬 𝑩𝑬𝑺𝑻  ♕︎\n\n  𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅝𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅚𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅗𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅛𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅕𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅘𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅡𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸𖢩🅐𖢩👑𖢩𒁢𖢩🕷️𖢩𒁢𖢩🩸\n\n  〘🥊─卍─🥊〙\n\n\n  𝐒𝐏𝐈𝐃𝐄𝐑𝐒 𝑻𝑯𝑬 𝑺𝑻𝑹𝑶𝑵𝑮𝑬𝑺𝑻 𝑶𝑭 𝑨𝑳𝑳 𝑻𝑰𝑴𝑬  『༴‌卍⋆‌🕷️』⇣؍.َِ\n\n  𝑲𝑰𝑵𝑮 𝑴𝑼𝒁𝑨𝑵┊ 🕷️👑』⇣┊ ";

  // ── دوال الحماية ─────────────────────────────────────────────────────────────
  // تأخير بشري أولي (400-1800ms) — محاكاة "انتبه للمحادثة ثم قرر الكتابة"
  const preDelay    = () => Math.floor(Math.random() * 1400) + 400;

  // مدة مؤشر الكتابة: سرعة عشوائية (12-28 ms/حرف) ضمن [800, 5000]
  const typingDur   = (msg) => {
    const speed = Math.floor(Math.random() * 16) + 12;          // 12-28 ms/char
    const raw   = msg.length * speed;
    const jit   = (Math.random() - 0.5) * 600;                  // ±300ms
    return Math.min(Math.max(raw + jit, 800), 5000);
  };

  // micro-pause بعد التوقف عن الكتابة قبل الضغط "إرسال" (0-600ms)
  const postTypePause = () => Math.floor(Math.random() * 600);

  // فترة الإرسال: 20,000-30,000ms + jitter ±2000ms (لا تقل عن 18s)
  const nextDelay   = () => Math.max(
    18000,
    Math.floor(Math.random() * 10001) + 20000          // 20-30s
    + Math.floor(Math.random() * 4000) - 2000          // ±2s jitter
  );

  // ── جدولة الإرسال ────────────────────────────────────────────────────────────
  function scheduleNext(api, threadID) {
    const delay = nextDelay();
    const timer = setTimeout(async () => {
      if (!global._autoSendTimers || !global._autoSendTimers.has(threadID)) return;

      // 7% تخطي عشوائي — يكسر الإيقاع الثابت
      if (Math.random() < 0.07) { scheduleNext(api, threadID); return; }

      try {
        // 1. تأخير بشري أولي
        await new Promise(r => setTimeout(r, preDelay()));
        if (!global._autoSendTimers.has(threadID)) return;

        // 2. إظهار مؤشر الكتابة
        try { api.sendTypingIndicator(threadID); } catch (_) {}

        // 3. انتظر "مدة الكتابة" الحقيقية
        await new Promise(r => setTimeout(r, typingDur(AUTO_MESSAGE)));
        if (!global._autoSendTimers.has(threadID)) return;

        // 4. micro-pause قبل الإرسال
        await new Promise(r => setTimeout(r, postTypePause()));
        if (!global._autoSendTimers.has(threadID)) return;

        // 5. إرسال الرسالة
        api.sendMessage(AUTO_MESSAGE, threadID, () => {});
      } catch (_) {}

      // 6. جدولة الدورة التالية
      scheduleNext(api, threadID);
    }, delay);

    global._autoSendTimers.set(threadID, timer);
  }

  // ── الأمر ─────────────────────────────────────────────────────────────────────
  module.exports = {
    config: {
      name: "انسخ",
      aliases: [],
      description: "إرسال تلقائي بشري كل 20-30 ثانية مع أقوى حماية",
      usage: "انسخ ياعبد",
      adminOnly: false,
    },
    async run({ api, args, threadID }) {
      if (!args.length || args[0] !== "ياعبد") {
        return api.sendMessage("❌ الأمر الصحيح: /انسخ ياعبد", threadID);
      }
      if (global._autoSendTimers && global._autoSendTimers.has(threadID)) {
        return api.sendMessage(
          "⚠️ الإرسال التلقائي نشط بالفعل.\nللإيقاف: /توقف ياعبد",
          threadID
        );
      }
      scheduleNext(api, threadID);
      return api.sendMessage(
        "✅ تم تفعيل الإرسال التلقائي!\n"
        + "⏱ يُرسل كل 20-30 ثانية بشكل عشوائي.\n"
        + "🔒 مؤشر الكتابة البشري مفعّل.\n"
        + "⛔ للإيقاف: /توقف ياعبد",
        threadID
      );
    },
  };
  