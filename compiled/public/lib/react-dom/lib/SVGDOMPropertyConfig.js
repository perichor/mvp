/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var NS = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace'
};

// We use attributes for everything SVG so let's avoid some duplication and run
// code instead.
// The following are all specified in the HTML config already so we exclude here.
// - class (as className)
// - color
// - height
// - id
// - lang
// - max
// - media
// - method
// - min
// - name
// - style
// - target
// - type
// - width
var ATTRS = {
  accentHeight: 'accent-height',
  accumulate: 0,
  additive: 0,
  alignmentBaseline: 'alignment-baseline',
  allowReorder: 'allowReorder',
  alphabetic: 0,
  amplitude: 0,
  arabicForm: 'arabic-form',
  ascent: 0,
  attributeName: 'attributeName',
  attributeType: 'attributeType',
  autoReverse: 'autoReverse',
  azimuth: 0,
  baseFrequency: 'baseFrequency',
  baseProfile: 'baseProfile',
  baselineShift: 'baseline-shift',
  bbox: 0,
  begin: 0,
  bias: 0,
  by: 0,
  calcMode: 'calcMode',
  capHeight: 'cap-height',
  clip: 0,
  clipPath: 'clip-path',
  clipRule: 'clip-rule',
  clipPathUnits: 'clipPathUnits',
  colorInterpolation: 'color-interpolation',
  colorInterpolationFilters: 'color-interpolation-filters',
  colorProfile: 'color-profile',
  colorRendering: 'color-rendering',
  contentScriptType: 'contentScriptType',
  contentStyleType: 'contentStyleType',
  cursor: 0,
  cx: 0,
  cy: 0,
  d: 0,
  decelerate: 0,
  descent: 0,
  diffuseConstant: 'diffuseConstant',
  direction: 0,
  display: 0,
  divisor: 0,
  dominantBaseline: 'dominant-baseline',
  dur: 0,
  dx: 0,
  dy: 0,
  edgeMode: 'edgeMode',
  elevation: 0,
  enableBackground: 'enable-background',
  end: 0,
  exponent: 0,
  externalResourcesRequired: 'externalResourcesRequired',
  fill: 0,
  fillOpacity: 'fill-opacity',
  fillRule: 'fill-rule',
  filter: 0,
  filterRes: 'filterRes',
  filterUnits: 'filterUnits',
  floodColor: 'flood-color',
  floodOpacity: 'flood-opacity',
  focusable: 0,
  fontFamily: 'font-family',
  fontSize: 'font-size',
  fontSizeAdjust: 'font-size-adjust',
  fontStretch: 'font-stretch',
  fontStyle: 'font-style',
  fontVariant: 'font-variant',
  fontWeight: 'font-weight',
  format: 0,
  from: 0,
  fx: 0,
  fy: 0,
  g1: 0,
  g2: 0,
  glyphName: 'glyph-name',
  glyphOrientationHorizontal: 'glyph-orientation-horizontal',
  glyphOrientationVertical: 'glyph-orientation-vertical',
  glyphRef: 'glyphRef',
  gradientTransform: 'gradientTransform',
  gradientUnits: 'gradientUnits',
  hanging: 0,
  horizAdvX: 'horiz-adv-x',
  horizOriginX: 'horiz-origin-x',
  ideographic: 0,
  imageRendering: 'image-rendering',
  'in': 0,
  in2: 0,
  intercept: 0,
  k: 0,
  k1: 0,
  k2: 0,
  k3: 0,
  k4: 0,
  kernelMatrix: 'kernelMatrix',
  kernelUnitLength: 'kernelUnitLength',
  kerning: 0,
  keyPoints: 'keyPoints',
  keySplines: 'keySplines',
  keyTimes: 'keyTimes',
  lengthAdjust: 'lengthAdjust',
  letterSpacing: 'letter-spacing',
  lightingColor: 'lighting-color',
  limitingConeAngle: 'limitingConeAngle',
  local: 0,
  markerEnd: 'marker-end',
  markerMid: 'marker-mid',
  markerStart: 'marker-start',
  markerHeight: 'markerHeight',
  markerUnits: 'markerUnits',
  markerWidth: 'markerWidth',
  mask: 0,
  maskContentUnits: 'maskContentUnits',
  maskUnits: 'maskUnits',
  mathematical: 0,
  mode: 0,
  numOctaves: 'numOctaves',
  offset: 0,
  opacity: 0,
  operator: 0,
  order: 0,
  orient: 0,
  orientation: 0,
  origin: 0,
  overflow: 0,
  overlinePosition: 'overline-position',
  overlineThickness: 'overline-thickness',
  paintOrder: 'paint-order',
  panose1: 'panose-1',
  pathLength: 'pathLength',
  patternContentUnits: 'patternContentUnits',
  patternTransform: 'patternTransform',
  patternUnits: 'patternUnits',
  pointerEvents: 'pointer-events',
  points: 0,
  pointsAtX: 'pointsAtX',
  pointsAtY: 'pointsAtY',
  pointsAtZ: 'pointsAtZ',
  preserveAlpha: 'preserveAlpha',
  preserveAspectRatio: 'preserveAspectRatio',
  primitiveUnits: 'primitiveUnits',
  r: 0,
  radius: 0,
  refX: 'refX',
  refY: 'refY',
  renderingIntent: 'rendering-intent',
  repeatCount: 'repeatCount',
  repeatDur: 'repeatDur',
  requiredExtensions: 'requiredExtensions',
  requiredFeatures: 'requiredFeatures',
  restart: 0,
  result: 0,
  rotate: 0,
  rx: 0,
  ry: 0,
  scale: 0,
  seed: 0,
  shapeRendering: 'shape-rendering',
  slope: 0,
  spacing: 0,
  specularConstant: 'specularConstant',
  specularExponent: 'specularExponent',
  speed: 0,
  spreadMethod: 'spreadMethod',
  startOffset: 'startOffset',
  stdDeviation: 'stdDeviation',
  stemh: 0,
  stemv: 0,
  stitchTiles: 'stitchTiles',
  stopColor: 'stop-color',
  stopOpacity: 'stop-opacity',
  strikethroughPosition: 'strikethrough-position',
  strikethroughThickness: 'strikethrough-thickness',
  string: 0,
  stroke: 0,
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeMiterlimit: 'stroke-miterlimit',
  strokeOpacity: 'stroke-opacity',
  strokeWidth: 'stroke-width',
  surfaceScale: 'surfaceScale',
  systemLanguage: 'systemLanguage',
  tableValues: 'tableValues',
  targetX: 'targetX',
  targetY: 'targetY',
  textAnchor: 'text-anchor',
  textDecoration: 'text-decoration',
  textRendering: 'text-rendering',
  textLength: 'textLength',
  to: 0,
  transform: 0,
  u1: 0,
  u2: 0,
  underlinePosition: 'underline-position',
  underlineThickness: 'underline-thickness',
  unicode: 0,
  unicodeBidi: 'unicode-bidi',
  unicodeRange: 'unicode-range',
  unitsPerEm: 'units-per-em',
  vAlphabetic: 'v-alphabetic',
  vHanging: 'v-hanging',
  vIdeographic: 'v-ideographic',
  vMathematical: 'v-mathematical',
  values: 0,
  vectorEffect: 'vector-effect',
  version: 0,
  vertAdvY: 'vert-adv-y',
  vertOriginX: 'vert-origin-x',
  vertOriginY: 'vert-origin-y',
  viewBox: 'viewBox',
  viewTarget: 'viewTarget',
  visibility: 0,
  widths: 0,
  wordSpacing: 'word-spacing',
  writingMode: 'writing-mode',
  x: 0,
  xHeight: 'x-height',
  x1: 0,
  x2: 0,
  xChannelSelector: 'xChannelSelector',
  xlinkActuate: 'xlink:actuate',
  xlinkArcrole: 'xlink:arcrole',
  xlinkHref: 'xlink:href',
  xlinkRole: 'xlink:role',
  xlinkShow: 'xlink:show',
  xlinkTitle: 'xlink:title',
  xlinkType: 'xlink:type',
  xmlBase: 'xml:base',
  xmlns: 0,
  xmlnsXlink: 'xmlns:xlink',
  xmlLang: 'xml:lang',
  xmlSpace: 'xml:space',
  y: 0,
  y1: 0,
  y2: 0,
  yChannelSelector: 'yChannelSelector',
  z: 0,
  zoomAndPan: 'zoomAndPan'
};

var SVGDOMPropertyConfig = {
  Properties: {},
  DOMAttributeNamespaces: {
    xlinkActuate: NS.xlink,
    xlinkArcrole: NS.xlink,
    xlinkHref: NS.xlink,
    xlinkRole: NS.xlink,
    xlinkShow: NS.xlink,
    xlinkTitle: NS.xlink,
    xlinkType: NS.xlink,
    xmlBase: NS.xml,
    xmlLang: NS.xml,
    xmlSpace: NS.xml
  },
  DOMAttributeNames: {}
};

Object.keys(ATTRS).forEach(function (key) {
  SVGDOMPropertyConfig.Properties[key] = 0;
  if (ATTRS[key]) {
    SVGDOMPropertyConfig.DOMAttributeNames[key] = ATTRS[key];
  }
});

module.exports = SVGDOMPropertyConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3B1YmxpYy9saWIvcmVhY3QtZG9tL2xpYi9TVkdET01Qcm9wZXJ0eUNvbmZpZy5qcyJdLCJuYW1lcyI6WyJOUyIsInhsaW5rIiwieG1sIiwiQVRUUlMiLCJhY2NlbnRIZWlnaHQiLCJhY2N1bXVsYXRlIiwiYWRkaXRpdmUiLCJhbGlnbm1lbnRCYXNlbGluZSIsImFsbG93UmVvcmRlciIsImFscGhhYmV0aWMiLCJhbXBsaXR1ZGUiLCJhcmFiaWNGb3JtIiwiYXNjZW50IiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZVR5cGUiLCJhdXRvUmV2ZXJzZSIsImF6aW11dGgiLCJiYXNlRnJlcXVlbmN5IiwiYmFzZVByb2ZpbGUiLCJiYXNlbGluZVNoaWZ0IiwiYmJveCIsImJlZ2luIiwiYmlhcyIsImJ5IiwiY2FsY01vZGUiLCJjYXBIZWlnaHQiLCJjbGlwIiwiY2xpcFBhdGgiLCJjbGlwUnVsZSIsImNsaXBQYXRoVW5pdHMiLCJjb2xvckludGVycG9sYXRpb24iLCJjb2xvckludGVycG9sYXRpb25GaWx0ZXJzIiwiY29sb3JQcm9maWxlIiwiY29sb3JSZW5kZXJpbmciLCJjb250ZW50U2NyaXB0VHlwZSIsImNvbnRlbnRTdHlsZVR5cGUiLCJjdXJzb3IiLCJjeCIsImN5IiwiZCIsImRlY2VsZXJhdGUiLCJkZXNjZW50IiwiZGlmZnVzZUNvbnN0YW50IiwiZGlyZWN0aW9uIiwiZGlzcGxheSIsImRpdmlzb3IiLCJkb21pbmFudEJhc2VsaW5lIiwiZHVyIiwiZHgiLCJkeSIsImVkZ2VNb2RlIiwiZWxldmF0aW9uIiwiZW5hYmxlQmFja2dyb3VuZCIsImVuZCIsImV4cG9uZW50IiwiZXh0ZXJuYWxSZXNvdXJjZXNSZXF1aXJlZCIsImZpbGwiLCJmaWxsT3BhY2l0eSIsImZpbGxSdWxlIiwiZmlsdGVyIiwiZmlsdGVyUmVzIiwiZmlsdGVyVW5pdHMiLCJmbG9vZENvbG9yIiwiZmxvb2RPcGFjaXR5IiwiZm9jdXNhYmxlIiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiZm9udFNpemVBZGp1c3QiLCJmb250U3RyZXRjaCIsImZvbnRTdHlsZSIsImZvbnRWYXJpYW50IiwiZm9udFdlaWdodCIsImZvcm1hdCIsImZyb20iLCJmeCIsImZ5IiwiZzEiLCJnMiIsImdseXBoTmFtZSIsImdseXBoT3JpZW50YXRpb25Ib3Jpem9udGFsIiwiZ2x5cGhPcmllbnRhdGlvblZlcnRpY2FsIiwiZ2x5cGhSZWYiLCJncmFkaWVudFRyYW5zZm9ybSIsImdyYWRpZW50VW5pdHMiLCJoYW5naW5nIiwiaG9yaXpBZHZYIiwiaG9yaXpPcmlnaW5YIiwiaWRlb2dyYXBoaWMiLCJpbWFnZVJlbmRlcmluZyIsImluMiIsImludGVyY2VwdCIsImsiLCJrMSIsImsyIiwiazMiLCJrNCIsImtlcm5lbE1hdHJpeCIsImtlcm5lbFVuaXRMZW5ndGgiLCJrZXJuaW5nIiwia2V5UG9pbnRzIiwia2V5U3BsaW5lcyIsImtleVRpbWVzIiwibGVuZ3RoQWRqdXN0IiwibGV0dGVyU3BhY2luZyIsImxpZ2h0aW5nQ29sb3IiLCJsaW1pdGluZ0NvbmVBbmdsZSIsImxvY2FsIiwibWFya2VyRW5kIiwibWFya2VyTWlkIiwibWFya2VyU3RhcnQiLCJtYXJrZXJIZWlnaHQiLCJtYXJrZXJVbml0cyIsIm1hcmtlcldpZHRoIiwibWFzayIsIm1hc2tDb250ZW50VW5pdHMiLCJtYXNrVW5pdHMiLCJtYXRoZW1hdGljYWwiLCJtb2RlIiwibnVtT2N0YXZlcyIsIm9mZnNldCIsIm9wYWNpdHkiLCJvcGVyYXRvciIsIm9yZGVyIiwib3JpZW50Iiwib3JpZW50YXRpb24iLCJvcmlnaW4iLCJvdmVyZmxvdyIsIm92ZXJsaW5lUG9zaXRpb24iLCJvdmVybGluZVRoaWNrbmVzcyIsInBhaW50T3JkZXIiLCJwYW5vc2UxIiwicGF0aExlbmd0aCIsInBhdHRlcm5Db250ZW50VW5pdHMiLCJwYXR0ZXJuVHJhbnNmb3JtIiwicGF0dGVyblVuaXRzIiwicG9pbnRlckV2ZW50cyIsInBvaW50cyIsInBvaW50c0F0WCIsInBvaW50c0F0WSIsInBvaW50c0F0WiIsInByZXNlcnZlQWxwaGEiLCJwcmVzZXJ2ZUFzcGVjdFJhdGlvIiwicHJpbWl0aXZlVW5pdHMiLCJyIiwicmFkaXVzIiwicmVmWCIsInJlZlkiLCJyZW5kZXJpbmdJbnRlbnQiLCJyZXBlYXRDb3VudCIsInJlcGVhdER1ciIsInJlcXVpcmVkRXh0ZW5zaW9ucyIsInJlcXVpcmVkRmVhdHVyZXMiLCJyZXN0YXJ0IiwicmVzdWx0Iiwicm90YXRlIiwicngiLCJyeSIsInNjYWxlIiwic2VlZCIsInNoYXBlUmVuZGVyaW5nIiwic2xvcGUiLCJzcGFjaW5nIiwic3BlY3VsYXJDb25zdGFudCIsInNwZWN1bGFyRXhwb25lbnQiLCJzcGVlZCIsInNwcmVhZE1ldGhvZCIsInN0YXJ0T2Zmc2V0Iiwic3RkRGV2aWF0aW9uIiwic3RlbWgiLCJzdGVtdiIsInN0aXRjaFRpbGVzIiwic3RvcENvbG9yIiwic3RvcE9wYWNpdHkiLCJzdHJpa2V0aHJvdWdoUG9zaXRpb24iLCJzdHJpa2V0aHJvdWdoVGhpY2tuZXNzIiwic3RyaW5nIiwic3Ryb2tlIiwic3Ryb2tlRGFzaGFycmF5Iiwic3Ryb2tlRGFzaG9mZnNldCIsInN0cm9rZUxpbmVjYXAiLCJzdHJva2VMaW5lam9pbiIsInN0cm9rZU1pdGVybGltaXQiLCJzdHJva2VPcGFjaXR5Iiwic3Ryb2tlV2lkdGgiLCJzdXJmYWNlU2NhbGUiLCJzeXN0ZW1MYW5ndWFnZSIsInRhYmxlVmFsdWVzIiwidGFyZ2V0WCIsInRhcmdldFkiLCJ0ZXh0QW5jaG9yIiwidGV4dERlY29yYXRpb24iLCJ0ZXh0UmVuZGVyaW5nIiwidGV4dExlbmd0aCIsInRvIiwidHJhbnNmb3JtIiwidTEiLCJ1MiIsInVuZGVybGluZVBvc2l0aW9uIiwidW5kZXJsaW5lVGhpY2tuZXNzIiwidW5pY29kZSIsInVuaWNvZGVCaWRpIiwidW5pY29kZVJhbmdlIiwidW5pdHNQZXJFbSIsInZBbHBoYWJldGljIiwidkhhbmdpbmciLCJ2SWRlb2dyYXBoaWMiLCJ2TWF0aGVtYXRpY2FsIiwidmFsdWVzIiwidmVjdG9yRWZmZWN0IiwidmVyc2lvbiIsInZlcnRBZHZZIiwidmVydE9yaWdpblgiLCJ2ZXJ0T3JpZ2luWSIsInZpZXdCb3giLCJ2aWV3VGFyZ2V0IiwidmlzaWJpbGl0eSIsIndpZHRocyIsIndvcmRTcGFjaW5nIiwid3JpdGluZ01vZGUiLCJ4IiwieEhlaWdodCIsIngxIiwieDIiLCJ4Q2hhbm5lbFNlbGVjdG9yIiwieGxpbmtBY3R1YXRlIiwieGxpbmtBcmNyb2xlIiwieGxpbmtIcmVmIiwieGxpbmtSb2xlIiwieGxpbmtTaG93IiwieGxpbmtUaXRsZSIsInhsaW5rVHlwZSIsInhtbEJhc2UiLCJ4bWxucyIsInhtbG5zWGxpbmsiLCJ4bWxMYW5nIiwieG1sU3BhY2UiLCJ5IiwieTEiLCJ5MiIsInlDaGFubmVsU2VsZWN0b3IiLCJ6Iiwiem9vbUFuZFBhbiIsIlNWR0RPTVByb3BlcnR5Q29uZmlnIiwiUHJvcGVydGllcyIsIkRPTUF0dHJpYnV0ZU5hbWVzcGFjZXMiLCJET01BdHRyaWJ1dGVOYW1lcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7QUFVQTs7QUFFQSxJQUFJQSxLQUFLO0FBQ1BDLFNBQU8sOEJBREE7QUFFUEMsT0FBSztBQUZFLENBQVQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUlDLFFBQVE7QUFDVkMsZ0JBQWMsZUFESjtBQUVWQyxjQUFZLENBRkY7QUFHVkMsWUFBVSxDQUhBO0FBSVZDLHFCQUFtQixvQkFKVDtBQUtWQyxnQkFBYyxjQUxKO0FBTVZDLGNBQVksQ0FORjtBQU9WQyxhQUFXLENBUEQ7QUFRVkMsY0FBWSxhQVJGO0FBU1ZDLFVBQVEsQ0FURTtBQVVWQyxpQkFBZSxlQVZMO0FBV1ZDLGlCQUFlLGVBWEw7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QUFRdEJzTyxhQUFTdk8sR0FBR0UsR0FSVTtBQVN0QndPLGFBQVMxTyxHQUFHRSxHQVRVO0FBVXRCeU8sY0FBVTNPLEdBQUdFO0FBVlMsR0FGQztBQWN6Qm1QLHFCQUFtQjtBQWRNLENBQTNCOztBQWlCQUMsT0FBT0MsSUFBUCxDQUFZcFAsS0FBWixFQUFtQnFQLE9BQW5CLENBQTJCLFVBQVVDLEdBQVYsRUFBZTtBQUN4Q1AsdUJBQXFCQyxVQUFyQixDQUFnQ00sR0FBaEMsSUFBdUMsQ0FBdkM7QUFDQSxNQUFJdFAsTUFBTXNQLEdBQU4sQ0FBSixFQUFnQjtBQUNkUCx5QkFBcUJHLGlCQUFyQixDQUF1Q0ksR0FBdkMsSUFBOEN0UCxNQUFNc1AsR0FBTixDQUE5QztBQUNEO0FBQ0YsQ0FMRDs7QUFPQUMsT0FBT0MsT0FBUCxHQUFpQlQsb0JBQWpCIiwiZmlsZSI6IlNWR0RPTVByb3BlcnR5Q29uZmlnLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIE5TID0ge1xuICB4bGluazogJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnLFxuICB4bWw6ICdodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2UnXG59O1xuXG4vLyBXZSB1c2UgYXR0cmlidXRlcyBmb3IgZXZlcnl0aGluZyBTVkcgc28gbGV0J3MgYXZvaWQgc29tZSBkdXBsaWNhdGlvbiBhbmQgcnVuXG4vLyBjb2RlIGluc3RlYWQuXG4vLyBUaGUgZm9sbG93aW5nIGFyZSBhbGwgc3BlY2lmaWVkIGluIHRoZSBIVE1MIGNvbmZpZyBhbHJlYWR5IHNvIHdlIGV4Y2x1ZGUgaGVyZS5cbi8vIC0gY2xhc3MgKGFzIGNsYXNzTmFtZSlcbi8vIC0gY29sb3Jcbi8vIC0gaGVpZ2h0XG4vLyAtIGlkXG4vLyAtIGxhbmdcbi8vIC0gbWF4XG4vLyAtIG1lZGlhXG4vLyAtIG1ldGhvZFxuLy8gLSBtaW5cbi8vIC0gbmFtZVxuLy8gLSBzdHlsZVxuLy8gLSB0YXJnZXRcbi8vIC0gdHlwZVxuLy8gLSB3aWR0aFxudmFyIEFUVFJTID0ge1xuICBhY2NlbnRIZWlnaHQ6ICdhY2NlbnQtaGVpZ2h0JyxcbiAgYWNjdW11bGF0ZTogMCxcbiAgYWRkaXRpdmU6IDAsXG4gIGFsaWdubWVudEJhc2VsaW5lOiAnYWxpZ25tZW50LWJhc2VsaW5lJyxcbiAgYWxsb3dSZW9yZGVyOiAnYWxsb3dSZW9yZGVyJyxcbiAgYWxwaGFiZXRpYzogMCxcbiAgYW1wbGl0dWRlOiAwLFxuICBhcmFiaWNGb3JtOiAnYXJhYmljLWZvcm0nLFxuICBhc2NlbnQ6IDAsXG4gIGF0dHJpYnV0ZU5hbWU6ICdhdHRyaWJ1dGVOYW1lJyxcbiAgYXR0cmlidXRlVHlwZTogJ2F0dHJpYnV0ZVR5cGUnLFxuICBhdXRvUmV2ZXJzZTogJ2F1dG9SZXZlcnNlJyxcbiAgYXppbXV0aDogMCxcbiAgYmFzZUZyZXF1ZW5jeTogJ2Jhc2VGcmVxdWVuY3knLFxuICBiYXNlUHJvZmlsZTogJ2Jhc2VQcm9maWxlJyxcbiAgYmFzZWxpbmVTaGlmdDogJ2Jhc2VsaW5lLXNoaWZ0JyxcbiAgYmJveDogMCxcbiAgYmVnaW46IDAsXG4gIGJpYXM6IDAsXG4gIGJ5OiAwLFxuICBjYWxjTW9kZTogJ2NhbGNNb2RlJyxcbiAgY2FwSGVpZ2h0OiAnY2FwLWhlaWdodCcsXG4gIGNsaXA6IDAsXG4gIGNsaXBQYXRoOiAnY2xpcC1wYXRoJyxcbiAgY2xpcFJ1bGU6ICdjbGlwLXJ1bGUnLFxuICBjbGlwUGF0aFVuaXRzOiAnY2xpcFBhdGhVbml0cycsXG4gIGNvbG9ySW50ZXJwb2xhdGlvbjogJ2NvbG9yLWludGVycG9sYXRpb24nLFxuICBjb2xvckludGVycG9sYXRpb25GaWx0ZXJzOiAnY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzJyxcbiAgY29sb3JQcm9maWxlOiAnY29sb3ItcHJvZmlsZScsXG4gIGNvbG9yUmVuZGVyaW5nOiAnY29sb3ItcmVuZGVyaW5nJyxcbiAgY29udGVudFNjcmlwdFR5cGU6ICdjb250ZW50U2NyaXB0VHlwZScsXG4gIGNvbnRlbnRTdHlsZVR5cGU6ICdjb250ZW50U3R5bGVUeXBlJyxcbiAgY3Vyc29yOiAwLFxuICBjeDogMCxcbiAgY3k6IDAsXG4gIGQ6IDAsXG4gIGRlY2VsZXJhdGU6IDAsXG4gIGRlc2NlbnQ6IDAsXG4gIGRpZmZ1c2VDb25zdGFudDogJ2RpZmZ1c2VDb25zdGFudCcsXG4gIGRpcmVjdGlvbjogMCxcbiAgZGlzcGxheTogMCxcbiAgZGl2aXNvcjogMCxcbiAgZG9taW5hbnRCYXNlbGluZTogJ2RvbWluYW50LWJhc2VsaW5lJyxcbiAgZHVyOiAwLFxuICBkeDogMCxcbiAgZHk6IDAsXG4gIGVkZ2VNb2RlOiAnZWRnZU1vZGUnLFxuICBlbGV2YXRpb246IDAsXG4gIGVuYWJsZUJhY2tncm91bmQ6ICdlbmFibGUtYmFja2dyb3VuZCcsXG4gIGVuZDogMCxcbiAgZXhwb25lbnQ6IDAsXG4gIGV4dGVybmFsUmVzb3VyY2VzUmVxdWlyZWQ6ICdleHRlcm5hbFJlc291cmNlc1JlcXVpcmVkJyxcbiAgZmlsbDogMCxcbiAgZmlsbE9wYWNpdHk6ICdmaWxsLW9wYWNpdHknLFxuICBmaWxsUnVsZTogJ2ZpbGwtcnVsZScsXG4gIGZpbHRlcjogMCxcbiAgZmlsdGVyUmVzOiAnZmlsdGVyUmVzJyxcbiAgZmlsdGVyVW5pdHM6ICdmaWx0ZXJVbml0cycsXG4gIGZsb29kQ29sb3I6ICdmbG9vZC1jb2xvcicsXG4gIGZsb29kT3BhY2l0eTogJ2Zsb29kLW9wYWNpdHknLFxuICBmb2N1c2FibGU6IDAsXG4gIGZvbnRGYW1pbHk6ICdmb250LWZhbWlseScsXG4gIGZvbnRTaXplOiAnZm9udC1zaXplJyxcbiAgZm9udFNpemVBZGp1c3Q6ICdmb250LXNpemUtYWRqdXN0JyxcbiAgZm9udFN0cmV0Y2g6ICdmb250LXN0cmV0Y2gnLFxuICBmb250U3R5bGU6ICdmb250LXN0eWxlJyxcbiAgZm9udFZhcmlhbnQ6ICdmb250LXZhcmlhbnQnLFxuICBmb250V2VpZ2h0OiAnZm9udC13ZWlnaHQnLFxuICBmb3JtYXQ6IDAsXG4gIGZyb206IDAsXG4gIGZ4OiAwLFxuICBmeTogMCxcbiAgZzE6IDAsXG4gIGcyOiAwLFxuICBnbHlwaE5hbWU6ICdnbHlwaC1uYW1lJyxcbiAgZ2x5cGhPcmllbnRhdGlvbkhvcml6b250YWw6ICdnbHlwaC1vcmllbnRhdGlvbi1ob3Jpem9udGFsJyxcbiAgZ2x5cGhPcmllbnRhdGlvblZlcnRpY2FsOiAnZ2x5cGgtb3JpZW50YXRpb24tdmVydGljYWwnLFxuICBnbHlwaFJlZjogJ2dseXBoUmVmJyxcbiAgZ3JhZGllbnRUcmFuc2Zvcm06ICdncmFkaWVudFRyYW5zZm9ybScsXG4gIGdyYWRpZW50VW5pdHM6ICdncmFkaWVudFVuaXRzJyxcbiAgaGFuZ2luZzogMCxcbiAgaG9yaXpBZHZYOiAnaG9yaXotYWR2LXgnLFxuICBob3Jpek9yaWdpblg6ICdob3Jpei1vcmlnaW4teCcsXG4gIGlkZW9ncmFwaGljOiAwLFxuICBpbWFnZVJlbmRlcmluZzogJ2ltYWdlLXJlbmRlcmluZycsXG4gICdpbic6IDAsXG4gIGluMjogMCxcbiAgaW50ZXJjZXB0OiAwLFxuICBrOiAwLFxuICBrMTogMCxcbiAgazI6IDAsXG4gIGszOiAwLFxuICBrNDogMCxcbiAga2VybmVsTWF0cml4OiAna2VybmVsTWF0cml4JyxcbiAga2VybmVsVW5pdExlbmd0aDogJ2tlcm5lbFVuaXRMZW5ndGgnLFxuICBrZXJuaW5nOiAwLFxuICBrZXlQb2ludHM6ICdrZXlQb2ludHMnLFxuICBrZXlTcGxpbmVzOiAna2V5U3BsaW5lcycsXG4gIGtleVRpbWVzOiAna2V5VGltZXMnLFxuICBsZW5ndGhBZGp1c3Q6ICdsZW5ndGhBZGp1c3QnLFxuICBsZXR0ZXJTcGFjaW5nOiAnbGV0dGVyLXNwYWNpbmcnLFxuICBsaWdodGluZ0NvbG9yOiAnbGlnaHRpbmctY29sb3InLFxuICBsaW1pdGluZ0NvbmVBbmdsZTogJ2xpbWl0aW5nQ29uZUFuZ2xlJyxcbiAgbG9jYWw6IDAsXG4gIG1hcmtlckVuZDogJ21hcmtlci1lbmQnLFxuICBtYXJrZXJNaWQ6ICdtYXJrZXItbWlkJyxcbiAgbWFya2VyU3RhcnQ6ICdtYXJrZXItc3RhcnQnLFxuICBtYXJrZXJIZWlnaHQ6ICdtYXJrZXJIZWlnaHQnLFxuICBtYXJrZXJVbml0czogJ21hcmtlclVuaXRzJyxcbiAgbWFya2VyV2lkdGg6ICdtYXJrZXJXaWR0aCcsXG4gIG1hc2s6IDAsXG4gIG1hc2tDb250ZW50VW5pdHM6ICdtYXNrQ29udGVudFVuaXRzJyxcbiAgbWFza1VuaXRzOiAnbWFza1VuaXRzJyxcbiAgbWF0aGVtYXRpY2FsOiAwLFxuICBtb2RlOiAwLFxuICBudW1PY3RhdmVzOiAnbnVtT2N0YXZlcycsXG4gIG9mZnNldDogMCxcbiAgb3BhY2l0eTogMCxcbiAgb3BlcmF0b3I6IDAsXG4gIG9yZGVyOiAwLFxuICBvcmllbnQ6IDAsXG4gIG9yaWVudGF0aW9uOiAwLFxuICBvcmlnaW46IDAsXG4gIG92ZXJmbG93OiAwLFxuICBvdmVybGluZVBvc2l0aW9uOiAnb3ZlcmxpbmUtcG9zaXRpb24nLFxuICBvdmVybGluZVRoaWNrbmVzczogJ292ZXJsaW5lLXRoaWNrbmVzcycsXG4gIHBhaW50T3JkZXI6ICdwYWludC1vcmRlcicsXG4gIHBhbm9zZTE6ICdwYW5vc2UtMScsXG4gIHBhdGhMZW5ndGg6ICdwYXRoTGVuZ3RoJyxcbiAgcGF0dGVybkNvbnRlbnRVbml0czogJ3BhdHRlcm5Db250ZW50VW5pdHMnLFxuICBwYXR0ZXJuVHJhbnNmb3JtOiAncGF0dGVyblRyYW5zZm9ybScsXG4gIHBhdHRlcm5Vbml0czogJ3BhdHRlcm5Vbml0cycsXG4gIHBvaW50ZXJFdmVudHM6ICdwb2ludGVyLWV2ZW50cycsXG4gIHBvaW50czogMCxcbiAgcG9pbnRzQXRYOiAncG9pbnRzQXRYJyxcbiAgcG9pbnRzQXRZOiAncG9pbnRzQXRZJyxcbiAgcG9pbnRzQXRaOiAncG9pbnRzQXRaJyxcbiAgcHJlc2VydmVBbHBoYTogJ3ByZXNlcnZlQWxwaGEnLFxuICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAncHJlc2VydmVBc3BlY3RSYXRpbycsXG4gIHByaW1pdGl2ZVVuaXRzOiAncHJpbWl0aXZlVW5pdHMnLFxuICByOiAwLFxuICByYWRpdXM6IDAsXG4gIHJlZlg6ICdyZWZYJyxcbiAgcmVmWTogJ3JlZlknLFxuICByZW5kZXJpbmdJbnRlbnQ6ICdyZW5kZXJpbmctaW50ZW50JyxcbiAgcmVwZWF0Q291bnQ6ICdyZXBlYXRDb3VudCcsXG4gIHJlcGVhdER1cjogJ3JlcGVhdER1cicsXG4gIHJlcXVpcmVkRXh0ZW5zaW9uczogJ3JlcXVpcmVkRXh0ZW5zaW9ucycsXG4gIHJlcXVpcmVkRmVhdHVyZXM6ICdyZXF1aXJlZEZlYXR1cmVzJyxcbiAgcmVzdGFydDogMCxcbiAgcmVzdWx0OiAwLFxuICByb3RhdGU6IDAsXG4gIHJ4OiAwLFxuICByeTogMCxcbiAgc2NhbGU6IDAsXG4gIHNlZWQ6IDAsXG4gIHNoYXBlUmVuZGVyaW5nOiAnc2hhcGUtcmVuZGVyaW5nJyxcbiAgc2xvcGU6IDAsXG4gIHNwYWNpbmc6IDAsXG4gIHNwZWN1bGFyQ29uc3RhbnQ6ICdzcGVjdWxhckNvbnN0YW50JyxcbiAgc3BlY3VsYXJFeHBvbmVudDogJ3NwZWN1bGFyRXhwb25lbnQnLFxuICBzcGVlZDogMCxcbiAgc3ByZWFkTWV0aG9kOiAnc3ByZWFkTWV0aG9kJyxcbiAgc3RhcnRPZmZzZXQ6ICdzdGFydE9mZnNldCcsXG4gIHN0ZERldmlhdGlvbjogJ3N0ZERldmlhdGlvbicsXG4gIHN0ZW1oOiAwLFxuICBzdGVtdjogMCxcbiAgc3RpdGNoVGlsZXM6ICdzdGl0Y2hUaWxlcycsXG4gIHN0b3BDb2xvcjogJ3N0b3AtY29sb3InLFxuICBzdG9wT3BhY2l0eTogJ3N0b3Atb3BhY2l0eScsXG4gIHN0cmlrZXRocm91Z2hQb3NpdGlvbjogJ3N0cmlrZXRocm91Z2gtcG9zaXRpb24nLFxuICBzdHJpa2V0aHJvdWdoVGhpY2tuZXNzOiAnc3RyaWtldGhyb3VnaC10aGlja25lc3MnLFxuICBzdHJpbmc6IDAsXG4gIHN0cm9rZTogMCxcbiAgc3Ryb2tlRGFzaGFycmF5OiAnc3Ryb2tlLWRhc2hhcnJheScsXG4gIHN0cm9rZURhc2hvZmZzZXQ6ICdzdHJva2UtZGFzaG9mZnNldCcsXG4gIHN0cm9rZUxpbmVjYXA6ICdzdHJva2UtbGluZWNhcCcsXG4gIHN0cm9rZUxpbmVqb2luOiAnc3Ryb2tlLWxpbmVqb2luJyxcbiAgc3Ryb2tlTWl0ZXJsaW1pdDogJ3N0cm9rZS1taXRlcmxpbWl0JyxcbiAgc3Ryb2tlT3BhY2l0eTogJ3N0cm9rZS1vcGFjaXR5JyxcbiAgc3Ryb2tlV2lkdGg6ICdzdHJva2Utd2lkdGgnLFxuICBzdXJmYWNlU2NhbGU6ICdzdXJmYWNlU2NhbGUnLFxuICBzeXN0ZW1MYW5ndWFnZTogJ3N5c3RlbUxhbmd1YWdlJyxcbiAgdGFibGVWYWx1ZXM6ICd0YWJsZVZhbHVlcycsXG4gIHRhcmdldFg6ICd0YXJnZXRYJyxcbiAgdGFyZ2V0WTogJ3RhcmdldFknLFxuICB0ZXh0QW5jaG9yOiAndGV4dC1hbmNob3InLFxuICB0ZXh0RGVjb3JhdGlvbjogJ3RleHQtZGVjb3JhdGlvbicsXG4gIHRleHRSZW5kZXJpbmc6ICd0ZXh0LXJlbmRlcmluZycsXG4gIHRleHRMZW5ndGg6ICd0ZXh0TGVuZ3RoJyxcbiAgdG86IDAsXG4gIHRyYW5zZm9ybTogMCxcbiAgdTE6IDAsXG4gIHUyOiAwLFxuICB1bmRlcmxpbmVQb3NpdGlvbjogJ3VuZGVybGluZS1wb3NpdGlvbicsXG4gIHVuZGVybGluZVRoaWNrbmVzczogJ3VuZGVybGluZS10aGlja25lc3MnLFxuICB1bmljb2RlOiAwLFxuICB1bmljb2RlQmlkaTogJ3VuaWNvZGUtYmlkaScsXG4gIHVuaWNvZGVSYW5nZTogJ3VuaWNvZGUtcmFuZ2UnLFxuICB1bml0c1BlckVtOiAndW5pdHMtcGVyLWVtJyxcbiAgdkFscGhhYmV0aWM6ICd2LWFscGhhYmV0aWMnLFxuICB2SGFuZ2luZzogJ3YtaGFuZ2luZycsXG4gIHZJZGVvZ3JhcGhpYzogJ3YtaWRlb2dyYXBoaWMnLFxuICB2TWF0aGVtYXRpY2FsOiAndi1tYXRoZW1hdGljYWwnLFxuICB2YWx1ZXM6IDAsXG4gIHZlY3RvckVmZmVjdDogJ3ZlY3Rvci1lZmZlY3QnLFxuICB2ZXJzaW9uOiAwLFxuICB2ZXJ0QWR2WTogJ3ZlcnQtYWR2LXknLFxuICB2ZXJ0T3JpZ2luWDogJ3ZlcnQtb3JpZ2luLXgnLFxuICB2ZXJ0T3JpZ2luWTogJ3ZlcnQtb3JpZ2luLXknLFxuICB2aWV3Qm94OiAndmlld0JveCcsXG4gIHZpZXdUYXJnZXQ6ICd2aWV3VGFyZ2V0JyxcbiAgdmlzaWJpbGl0eTogMCxcbiAgd2lkdGhzOiAwLFxuICB3b3JkU3BhY2luZzogJ3dvcmQtc3BhY2luZycsXG4gIHdyaXRpbmdNb2RlOiAnd3JpdGluZy1tb2RlJyxcbiAgeDogMCxcbiAgeEhlaWdodDogJ3gtaGVpZ2h0JyxcbiAgeDE6IDAsXG4gIHgyOiAwLFxuICB4Q2hhbm5lbFNlbGVjdG9yOiAneENoYW5uZWxTZWxlY3RvcicsXG4gIHhsaW5rQWN0dWF0ZTogJ3hsaW5rOmFjdHVhdGUnLFxuICB4bGlua0FyY3JvbGU6ICd4bGluazphcmNyb2xlJyxcbiAgeGxpbmtIcmVmOiAneGxpbms6aHJlZicsXG4gIHhsaW5rUm9sZTogJ3hsaW5rOnJvbGUnLFxuICB4bGlua1Nob3c6ICd4bGluazpzaG93JyxcbiAgeGxpbmtUaXRsZTogJ3hsaW5rOnRpdGxlJyxcbiAgeGxpbmtUeXBlOiAneGxpbms6dHlwZScsXG4gIHhtbEJhc2U6ICd4bWw6YmFzZScsXG4gIHhtbG5zOiAwLFxuICB4bWxuc1hsaW5rOiAneG1sbnM6eGxpbmsnLFxuICB4bWxMYW5nOiAneG1sOmxhbmcnLFxuICB4bWxTcGFjZTogJ3htbDpzcGFjZScsXG4gIHk6IDAsXG4gIHkxOiAwLFxuICB5MjogMCxcbiAgeUNoYW5uZWxTZWxlY3RvcjogJ3lDaGFubmVsU2VsZWN0b3InLFxuICB6OiAwLFxuICB6b29tQW5kUGFuOiAnem9vbUFuZFBhbidcbn07XG5cbnZhciBTVkdET01Qcm9wZXJ0eUNvbmZpZyA9IHtcbiAgUHJvcGVydGllczoge30sXG4gIERPTUF0dHJpYnV0ZU5hbWVzcGFjZXM6IHtcbiAgICB4bGlua0FjdHVhdGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rQXJjcm9sZTogTlMueGxpbmssXG4gICAgeGxpbmtIcmVmOiBOUy54bGluayxcbiAgICB4bGlua1JvbGU6IE5TLnhsaW5rLFxuICAgIHhsaW5rU2hvdzogTlMueGxpbmssXG4gICAgeGxpbmtUaXRsZTogTlMueGxpbmssXG4gICAgeGxpbmtUeXBlOiBOUy54bGluayxcbiAgICB4bWxCYXNlOiBOUy54bWwsXG4gICAgeG1sTGFuZzogTlMueG1sLFxuICAgIHhtbFNwYWNlOiBOUy54bWxcbiAgfSxcbiAgRE9NQXR0cmlidXRlTmFtZXM6IHt9XG59O1xuXG5PYmplY3Qua2V5cyhBVFRSUykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gIFNWR0RPTVByb3BlcnR5Q29uZmlnLlByb3BlcnRpZXNba2V5XSA9IDA7XG4gIGlmIChBVFRSU1trZXldKSB7XG4gICAgU1ZHRE9NUHJvcGVydHlDb25maWcuRE9NQXR0cmlidXRlTmFtZXNba2V5XSA9IEFUVFJTW2tleV07XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNWR0RPTVByb3BlcnR5Q29uZmlnOyJdfQ==