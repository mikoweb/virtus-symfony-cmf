import Mn from 'marionette';
import _ from 'underscore';
import 'datepicker';
import VMasker from 'vanilla-masker';
import moment from 'moment';
import $ from 'jquery'
import app from 'vsymfo/app';

/**
 * The DatePicker control.
 * @author Rafał Mikołajun
 */
export default class DatePicker extends Mn.View {
    template = false;
    initialize(options) {
        this._options = options.options || {};
        this._parseFormat = options.parseFormat || 'YYYY-MM-DD';
        this._pattern = _.isUndefined(options.pattern) ? '9999-99-99' : options.pattern;
        this._initDatePicker();
    }
    /**
     * @private
     */
    _initDatePicker() {
        const view = this;
        this.$el.each(function () {
            const input = $(this);
            input.attr('type', 'text').datepicker(_.defaults(view._options, {
                language: app.locale(),
                dateFormat: 'yyyy-mm-dd',
                todayButton: new Date(),
                clearButton: true
            })).data('datepicker').selectDate(view._parseDate(input));
            view._initMask(input);
            input.on('change', $.proxy(view._onInput, view));
        });
    }
    /**
     * @param {jQuery} input
     * @protected
     */
    _initMask(input) {
        if (_.isString(this._pattern)) {
            VMasker(input.get()).maskPattern(this._pattern);
        }
    }
    /**
     * @param {jQuery} input
     *
     * @return {Date}
     * @protected
     */
    _parseDate(input) {
        const date = moment(input.val(), this._parseFormat);
        return date.isValid() ? date.toDate() : new Date();
    }
    /**
     * @param {Event} e
     * @protected
     */
    _onInput(e) {
        const input = $(e.target);
        input.data('datepicker').selectDate(this._parseDate(input));
    }
}
