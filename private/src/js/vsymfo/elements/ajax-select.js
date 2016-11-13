import Mn from 'marionette';
import 'select2';
import _ from 'underscore';

/**
 * The Ajax Select control.
 * @author Rafał Mikołajun
 */
export default class AjaxSelect extends Mn.View {
    template = false;
    initialize(options) {
        if (_.isUndefined(options)) {
            throw new TypeError('Options are required!');
        }

        if (!_.isObject(options.ajax)) {
            throw new TypeError('options.ajax is not object!');
        }

        if (_.isUndefined(options.ajax.url)) {
            throw new TypeError('Not specified options.ajax.url option.');
        }

        if (options.custom && !_.isObject()) {
            throw new TypeError('Custom options is not object.');
        }

        if (options.dataMap && !_.isFunction(options.dataMap)) {
            throw new TypeError('dataMap option is not function.');
        }

        this._initSelect2(options, options.custom || {});
    }
    /**
     * @return {boolean}
     */
    isInput() {
        return this.$el.prop('tagName').toLowerCase() === 'input';
    }
    /**
     * @returns {jQuery}
     */
    getElement() {
        return this.$el;
    }
    /**
     * @param {Object} options
     * @param {Object} custom
     * @private
     */
    _initSelect2(options, custom) {
        const view = this, placeholder = this.$el.attr('placeholder'),
            disabledFocus = options.disabledFocus || true;

        if (view.isInput()) {
            const select = $('<select />');
            select
                .attr('name', this.$el.attr('name'))
                .attr('id', this.$el.attr('id'))
                .attr('class', this.$el.attr('class'))
            ;

            if (this.$el.data('text')) {
                select.attr('data-text', this.$el.data('text'));
            }

            if (this.$el.attr('required')) {
                select.attr('required', this.$el.attr('required'));
            }

            if (this.$el.data('initial-error')) {
                select.attr('data-initial-error', this.$el.data('initial-error'));
            }

            if (this.$el.val()) {
                const option = $('<option />');

                option.attr('value', this.$el.val());

                if (this.$el.data('text')) {
                    option.text(this.$el.data('text'));
                } else {
                    const text = this.$el.val().split('|');

                    if (text[1]) {
                        option.text(text[1]);
                        select.attr('data-text', text[1]);
                    } else {
                        option.text(this.$el.val());
                    }
                }

                option.appendTo(select);
            }

            this.$el.replaceWith(select);
            this.setElement(select);
        }

        this.$el.select2(_.defaults(custom, {
            minimumInputLength: options.minimumInputLength || 2,
            placeholder: placeholder,
            width: '100%',
            allowClear: true,
            ajax: _.defaults({
                dataType: 'json',
                type: 'GET',
                delay: 250,
                processResults: function (data) {
                    let results;

                    if (_.isFunction(options.dataMap)) {
                        results = _.map(data, options.dataMap);
                    } else {
                        results = data;
                    }

                    return {
                        results: results
                    };
                }
            }, options.ajax)
        }));

        if (disabledFocus) {
            //useful to custom validation
            this.$el.off('focus.select2');
        }

        const el = this.$el;
        this.$el.on('select2:select', function(e) {
            el.attr('data-text', e.params.data.text);
        });
    }
}
