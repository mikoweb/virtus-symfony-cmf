import Form from 'backbone.form';

/**
 * Form Collection Item view.
 * @author Rafał Mikołajun
 */
export default class ItemView extends Form.CollectionItemView {
    onRender() {
        const input = this.$el.find('input.input-toggle');
        if (!input.data('bs.toggle')) {
            input.bootstrapToggle();
        }
    }
}
