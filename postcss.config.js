module.exports = {
  options: {
    map: false
  },
  plugins: [
    require("autoprefixer")(),
    require("postcss-focus")(),
    require("postcss-color-rgba-fallback")({
      properties: [ "background-image" ]
    }),
    require("postcss-clean")({
      compatibility: "*",
      level: 0,
      format: {
        breaks: {
          afterAtRule: true,
          afterBlockBegins: true,
          afterBlockEnds: true,
          afterComment: true,
          afterRuleEnds: true,
          beforeBlockEnds: true
        },
        spaces: {
          beforeBlockBegins: true
        },
        semicolonAfterLastProperty: true
      }
    }),
    require("postcss-reporter")({
      clearReportedMessages: true
    })
  ]
};
