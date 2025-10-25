/** @type {import("stylelint").Config} */
import propertyGroups from 'stylelint-config-recess-order/groups';

export default {
  "extends": [
    'stylelint-config-standard',
  ],
  plugins: [
    'stylelint-order'
  ],
  "rules": {
    'declaration-empty-line-before': null,
    // Configure the rule manually.
    'order/properties-order': propertyGroups.map((group) => ({
      ...group,
      emptyLineBefore: 'always',
      noEmptyLineBetween: true,
    })),
  }
};