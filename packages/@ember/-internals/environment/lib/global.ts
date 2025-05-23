/* globals window, self */
declare const mainContext: object | undefined;

// from lodash to catch fake globals
function checkGlobal(value: any | null | undefined): object | undefined {
  return value && value.Object === Object ? value : undefined;
}

// element ids can ruin global miss checks
function checkElementIdShadowing(value: any | null | undefined) {
  return value && value.nodeType === undefined ? value : undefined;
}

declare const global: unknown;

// export real global
export default checkGlobal(checkElementIdShadowing(typeof global === 'object' && global)) ||
  checkGlobal(typeof self === 'object' && self) ||
  checkGlobal(typeof window === 'object' && window) ||
  (typeof mainContext !== 'undefined' && mainContext) || // set before strict mode in Ember loader/wrapper
  new Function('return this')(); // eval outside of strict mode
