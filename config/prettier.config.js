/** @type {import("prettier").Config} */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "^src/app/(.*)$",
    "^src/features/(.*)$",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

export default config;
