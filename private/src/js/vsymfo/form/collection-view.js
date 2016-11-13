import Form from 'backbone.form';
import ItemView from 'vsymfo/form/item-view';
import _ from 'underscore';
import swal from 'sweetalert';
import toastr from 'toastr';

/**
 * Form Collection view.
 * @author Rafał Mikołajun
 */
export default class CollectionView extends Form.CollectionView {
    initialize(options) {
        super.initialize(_.defaults(options, {
            itemView: ItemView,
            editClick: true,
            removeConfirmation: function (view) {
                swal({
                    title: "Are you sure?",
                    text: "You will not be able to recover this!",
                    type: "warning",
                    showCancelButton: true
                }, function () {
                    view.triggerRemove.apply(view);
                });
            },
            closeAlert: function () {
                toastr.warning('Not everything has been saved.');
                return 'Are you sure you want to quit?';
            },
            onRuquestError: function () {
                swal('Oops...', 'There was a problem with the server.', 'error');
            }
        }));

        this.on('server:invalid:message', this._onServerMessage);
    }
    /**
     * @param message
     * @private
     */
    _onServerMessage(message) {
        const title = 'Validation error';
        if (_.isString(message)) {
            sweetAlert(title, message, 'error');
        } else if (_.isArray(message)) {
            let errors = String();
            _.each(message, function (error) {
                if (_.isString(error)) {
                    errors += error + "\n\n";
                }
            });

            if (errors.length) {
                swal(title, errors, 'error');
            }
        }
    }
}
