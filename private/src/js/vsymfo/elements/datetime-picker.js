import DatePicker from 'vsymfo/elements/date-picker';
import _ from 'underscore';
import 'datepicker';
import $ from 'jquery'
import app from 'vsymfo/app';

/**
 * The DateTimePicker control.
 * @author Rafał Mikołajun
 */
export default class DateTimePicker extends DatePicker {
    initialize(options) {
        this._options = options.options || {};
        this._parseFormat = options.parseFormat || 'YYYY-MM-DD HH:mm';
        this._pattern = _.isUndefined(options.pattern) ? '9999-99-99 99:99' : options.pattern;
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
                clearButton: true,
                timepicker: true,
                timeFormat: 'hh:ii'
            })).data('datepicker').selectDate(view._parseDate(input));
            view._initMask(input);
            input.on('change', $.proxy(view._onInput, view));
        });
    }
}
