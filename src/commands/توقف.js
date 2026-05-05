"use strict";
  /**
   * /توقف ياعبد — إيقاف الإرسال التلقائي
   */
  module.exports = {
    config: {
      name: "توقف",
      aliases: [],
      description: "إيقاف الإرسال التلقائي",
      usage: "توقف ياعبد",
      adminOnly: false,
    },
    async run({ api, args, threadID }) {
      if (!args.length || args[0] !== "ياعبد") {
        return api.sendMessage("❌ الأمر الصحيح: /توقف ياعبد", threadID);
      }
      if (!global._autoSendTimers || !global._autoSendTimers.has(threadID)) {
        return api.sendMessage("⚠️ لا يوجد إرسال تلقائي نشط في هذه المحادثة.", threadID);
      }
      clearTimeout(global._autoSendTimers.get(threadID));
      global._autoSendTimers.delete(threadID);
      return api.sendMessage("⛔ تم إيقاف الإرسال التلقائي بنجاح.", threadID);
    },
  };
  