import log4js, { LoggingEvent, Logger } from "log4js";

log4js.configure({
  appenders: {
    out: {
      type: "console",
      layout: {
        type: "pattern",
        pattern: "%[[%d{yyyy-MM-dd hh:mm:ss}] [%p] %x{tag}%] %m",
        tokens: {
          tag: (logEvent: LoggingEvent): string => {
            const contextTag = logEvent.context.tag;
            return contextTag ? `[${contextTag}]` : "[app]";
          }
        }
      },
    },
  },
  categories: { 
    default: { 
      appenders: ["out"], 
      level: "info" 
    } 
  },
});

/**
 * Creates a logger instance pre-configured with a specific contextual tag.
 * @param tagName The tag to inject into the brackets, e.g., 'db'
 */
export const getLogger = (tagName?: string): Logger => {
  const logger = log4js.getLogger();
  if (tagName) {
    logger.addContext("tag", tagName);
  }
  return logger;
};

// Instead of export default, export a standard named "logger" for the default fallback
export const logger = getLogger();
