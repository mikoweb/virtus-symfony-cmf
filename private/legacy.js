define('bootstrap-toggle', ['jquery'], function ($) {
    var toggle = $.fn.bootstrapToggle.Constructor;
    toggle.DEFAULTS.on = '<i class="fa fa-check" aria-hidden="true"></i>';
    toggle.DEFAULTS.off = '-';
    return toggle;
});

define('datepicker', ['jquery'], function ($) {
    return $.fn.datepicker;
});
