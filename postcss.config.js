module.exports = {
  options: {
    map: false
  },
  plugins: [
    require("stylelint")({
      configFile: ".stylelintrc",
      configOverrides: {
        "rules": {
          "indentation": null
        }
      }
    }),
    require("autoprefixer")(),
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
