/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "not-to-spec",
      comment:
        "This module depends on a spec (test) file. The sole responsibility of a spec file is to test code. " +
        "If there's something in a spec that's of use to other modules, it doesn't have that single " +
        "responsibility anymore. Factor it out into (e.g.) a separate utility/ helper or a mock.",
      severity: "error",
      from: {},
      to: {
        path: "[.](?:spec|test)[.](?:js|mjs|cjs|jsx|ts|mts|cts|tsx|ls|coffee|litcoffee|coffee[.]md)$",
      },
    },
    // Domain 層が依存してはいけない領域
    {
      name: "no-application-direct-from-domain",
      comment: "Domain 層で Application 層を import してはいけません。",
      severity: "error",
      from: { path: "^src/Domain/.+" },
      to: { path: "^src/Application/.+" },
    },
    {
      name: "no-presentation-direct-from-domain",
      comment: "Domain 層で Presentation 層を import してはいけません。",
      severity: "error",
      from: { path: "^src/Domain/.+" },
      to: { path: "^src/Presentation/.+" },
    },
    {
      name: "no-infrastructure-direct-from-domain",
      comment: "Domain 層で Infrastructure 層を import してはいけません。",
      severity: "error",
      from: { path: "^src/Domain/.+" },
      to: { path: "^src/Infrastructure/.+" },
    },
    // Application 層が依存してはいけない領域
    {
      name: "no-presentation-direct-from-application",
      comment: "Application 層で Presentation 層を import してはいけません。",
      severity: "error",
      from: { path: "^src/Application/!(.+\\.spec\\.ts|.+\\.test\\.ts)" },
      to: { path: "^src/Presentation/.+" },
    },
    {
      name: "no-infrastructure-direct-from-application",
      comment: "Application 層で Infrastructure 層を import してはいけません。",
      severity: "error",
      from: { path: "^src/Application/!(.+\\.spec\\.ts|.+\\.test\\.ts)" },
      to: { path: "^src/Infrastructure/.+" },
    },
  ],
  options: {
    doNotFollow: {
      path: ["node_modules"],
    },
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: "tsconfig.json",
    },
    enhancedResolveOptions: {
      exportsFields: ["exports"],
      conditionNames: ["import", "require", "node", "default", "types"],
    },
    reporterOptions: {
      dot: {
        collapsePattern: "node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },
      archi: {
        collapsePattern:
          "^(?:packages|src|lib(s?)|app(s?)|bin|test(s?)|spec(s?))/[^/]+|node_modules/(?:@[^/]+/[^/]+|[^/]+)",
      },
      text: {
        highlightFocused: true,
      },
    },
  },
};
