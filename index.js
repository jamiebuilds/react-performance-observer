'use strict';

const REACT_PREFIX = '\u269B ';
const WARNING_PREFIX = '\u26D4 ';

const RENDER_LIFECYCLE_NAME = /^(\w+) \[(\w+)\]( Warning: (.*))?$/;
const LIFECYCLE_METHOD_NAME = /^(\w+)\.(\w+)( Warning: (.*))?$/;

function parseEntry(entry) {
  let name = entry.name;
  let isReact = name.startsWith(REACT_PREFIX);
  let isWarning = name.startsWith(WARNING_PREFIX);

  if (isReact || isWarning) {
    let normalized = name.replace(isReact ? REACT_PREFIX : WARNING_PREFIX, '');

    let match =
      normalized.match(RENDER_LIFECYCLE_NAME) ||
      normalized.match(LIFECYCLE_METHOD_NAME);

    if (match) {
      return {
        name,
        componentName: match[1],
        phase: match[2],
        warning: isWarning ? (match[4] || true) : null,
        entryType: entry.entryType,
        startTime: entry.startTime,
        duration: entry.duration,
      };
    }
  }

  return null;
}

function observe(callback) {
  let observer = new window.PerformanceObserver(list => {
    let entries = list.getEntries();
    let measurements = [];

    entries.forEach(entry => {
      let match = parseEntry(entry);
      if (match) {
        measurements.push(match);
      }
    });

    callback(measurements);
  });

  observer.observe({
    entryTypes: ['measure'],
  });
}

exports.parseEntry = parseEntry;
exports.observe = observe;
