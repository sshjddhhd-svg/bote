"use strict";
/**
 * أمر الإرسال التلقائي
 * التفعيل: /انسخ ياعبد
 * يرسل "رسالة" كل فترة عشوائية بين 25 و45 ثانية
 */

// تخزين المؤقتات النشطة: threadID → timeoutRef
const activeTimers = new Map();

function scheduleNext(api, threadID) {
  // وقت عشوائي بين 25000 و45000 ميلي ثانية
  const delay = Math.floor(Math.random() * (45000 - 25000 + 1)) + 25000;

  const timer = setTimeout(() => {
    if (!activeTimers.has(threadID)) return; // تم الإيقاف
    api.sendMessage("رسالة", threadID, () => {});
    // جدولة الإرسال التالي
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
    // التحقق من الكلمة الثانية
    if (!args.length || args[0] !== "ياعبد") {
      return api.sendMessage(
        "❌ الأمر الصحيح: /انسخ ياعبد",
        threadID
      );
    }

    // إذا كان هناك إرسال تلقائي نشط في هذا المحادثة → إيقافه
    if (activeTimers.has(threadID)) {
      clearTimeout(activeTimers.get(threadID));
      activeTimers.delete(threadID);
      return api.sendMessage(
        "⛔ تم إيقاف الإرسال التلقائي.",
        threadID
      );
    }

    // تشغيل الإرسال التلقائي
    scheduleNext(api, threadID);
    return api.sendMessage(
      "✅ تم تفعيل الإرسال التلقائي!\nسيُرسل البوت رسالة كل 25-45 ثانية بشكل عشوائي.\nاكتب /انسخ ياعبد مرة أخرى للإيقاف.",
      threadID
    );
  },
};
