import jQueryApp from 'jquery.app';
import _ from 'underscore';

/**
 * vSymfo Application Class.
 * @author Rafał Mikołajun
 */
class App {
    /**
     * @returns {String}
     */
    getRoot() {
        return jQueryApp.get('root');
    }
    /**
     * @param {String} path
     * @param {Object} [params]
     *
     * @returns {String}
     */
    path(path, params = {}) {
        return _.template('<%= root %>' + path)(_.defaults(params, {
            root: this.getRoot()
        }));
    }
    /**
     * @param {String} name
     *
     * @returns {String}
     */
    dir(name) {
        return jQueryApp.get('path_' + name);
    }
    /**
     * @returns {String}
     */
    locale() {
        return jQueryApp.get('locale');
    }
}

const app = new App();
export default app;
