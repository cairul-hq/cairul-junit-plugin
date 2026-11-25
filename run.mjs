import { list, option, repeat, reportsIn, selectors, value } from '@cairul/pdk/runner';
import { junit } from '@cairul/pdk/reports';

export default {
  command: ['junit'],
  select: selectors({ packages: list, classes: list, methods: list, suites: list, tags: value }),
  build(select, temp) {
    const scope = [
      ...repeat('--select-package', select.packages),
      ...repeat('--select-class', select.classes),
      ...repeat('--select-method', select.methods),
      ...repeat('--select-class', select.suites),
    ];
    return {
      args: [
        'execute',
        '--reports-dir',
        temp,
        '--disable-ansi-colors',
        ...(scope.length ? scope : ['--scan-class-path']),
        ...option('--include-tag', select.tags),
      ],
      read: reportsIn('.xml', junit),
    };
  },
};
