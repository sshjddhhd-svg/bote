"use strict";
  /**
   * /اسم <الاسم> — تغيير اسم المجموعة وقفله كل 8-12 ثانية
   * /اسم ايقاف  — إيقاف قفل الاسم
   * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * أنظمة الحماية:
   *  1. تأخير بشري (150-900ms) قبل كل إعادة تعيين
   *  2. فترة قفل عشوائية 8-12 ثانية
   *  3. تطبيق فوري عند التفعيل (يعيد الاسم على الفور)
   *  4. try/catch صامتة على كل العمليات
   */

  if (!global._nameLockTimers) global._nameLockTimers = new Map();
  if (!global._nameLockData)   global._nameLockData   = new Map();

  // فترة إعادة تعيين الاسم: 8-12 ثانية
  const lockInterval = () => Math.floor(Math.random() * 4001) + 8000;
  // تأخير بشري قصير قبل التطبيق
  const microDelay   = () => Math.floor(Math.random() * 750) + 150;

  function scheduleLock(api, threadID) {
    const timer = setTimeout(async () => {
      if (!global._nameLockTimers || !global._nameLockTimers.has(threadID)) return;
      const data = global._nameLockData.get(threadID);
      if (!data) return;

      try {
        await new Promise(r => setTimeout(r, microDelay()));
        if (!global._nameLockTimers.has(threadID)) return;

        // تغيير اسم المجموعة
        await new Promise((res, rej) =>
          api.setTitle(data.name, threadID, (e) => e ? rej(e) : res())
        );
      } catch (_) {}

      scheduleLock(api, threadID);
    }, lockInterval());

    global._nameLockTimers.set(threadID, timer);
  }

  module.exports = {
    config: {
      name: "اسم",
      aliases: [],
      description: "تغيير اسم المجموعة وقفله تلقائياً كل 8-12 ثانية",
      usage: "اسم <الاسم الجديد> | اسم ايقاف",
      adminOnly: false,
    },
    async run({ api, args, threadID }) {
      if (!args.length) {
        return api.sendMessage(
          "❌ الاستخدام:\n"
          + "/اسم <الاسم الجديد> — تغيير اسم المجموعة وقفله\n"
          + "/اسم ايقاف — إيقاف قفل الاسم",
          threadID
        );
      }

      // ── إيقاف القفل ──────────────────────────────────────────────────────────
      if (args[0] === "ايقاف") {
        if (!global._nameLockTimers || !global._nameLockTimers.has(threadID)) {
          return api.sendMessage("⚠️ لا يوجد قفل اسم نشط في هذه المحادثة.", threadID);
        }
        clearTimeout(global._nameLockTimers.get(threadID));
        global._nameLockTimers.delete(threadID);
        global._nameLockData.delete(threadID);
        return api.sendMessage("✅ تم إيقاف قفل اسم المجموعة.", threadID);
      }

      // ── تغيير الاسم وتفعيل القفل ─────────────────────────────────────────────
      const newName = args.join(" ");

      // تطبيق الاسم فوراً
      try {
        await new Promise((res, rej) =>
          api.setTitle(newName, threadID, (e) => e ? rej(e) : res())
        );
      } catch (e) {
        return api.sendMessage("❌ فشل تغيير اسم المجموعة: " + (e?.message || e), threadID);
      }

      // إيقاف القفل القديم إن وُجد
      if (global._nameLockTimers && global._nameLockTimers.has(threadID)) {
        clearTimeout(global._nameLockTimers.get(threadID));
      }

      // حفظ البيانات وتشغيل القفل
      global._nameLockData.set(threadID, { name: newName });
      scheduleLock(api, threadID);

      return api.sendMessage(
        "✅ تم تغيير اسم المجموعة إلى \"" + newName + "\"\n"
        + "🔒 القفل مفعّل — يُعاد تعيين الاسم كل 8-12 ثانية.\n"
        + "⛔ للإيقاف: /اسم ايقاف",
        threadID
      );
    },
  };
  