/** IE9, IE10 and IE11 requires all of the following polyfills. **/
import 'core-js/es6'

/** IE10 and IE11 requires the following for NgClass support on SVG elements */
import 'classlist.js'

/** Evergreen browsers require these. **/
// Used for reflect-metadata in JIT. If you use AOT (and only Angular decorators), you can remove.
import 'core-js/es7/reflect'

/**
 * Web Animations `@angular/platform-browser/animations`
 * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
 * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
 **/
import 'web-animations-js'

import 'zone.js/dist/zone'

if (process.env.ENV === 'production') {
    // Production
} else {
    // Development and test
    Error['stackTraceLimit'] = Infinity
    require('zone.js/dist/long-stack-trace-zone')
}