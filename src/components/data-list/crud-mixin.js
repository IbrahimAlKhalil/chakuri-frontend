import messageBox from 'element-ui/lib/message-box';

export default {
    props: {
        beforeCreate: {
            type: Function
        },

        beforeCheck: {
            type: Function
        }
    },

    data() {
        return {
            createDialog: false,
            editDialog: false,
            editItem: null
        };
    },

    methods: {
        confirm() {
            return new Promise(resolve => {
                messageBox.confirm(`This action will <strong>Delete Or Disable</strong> the selected items. Continue?`, 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning',
                    center: true,
                    dangerouslyUseHTMLString: true
                }).then(() => {
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            });
        },

        edit(item) {
            this.editDialog = true;
            this.editItem = item;
        },

        async create() {
            let shouldCreate = await this.callLifeCycle('beforeCreate');

            if (!shouldCreate) {
                return;
            }

            this.createDialog = true;
        },

        // This method is given to the child by scoped slot
        removeItem(item) {
            this.remove(false, item);
        },

        async remove(multiple, item) {

            // At least one item should be checked if multiple items should be deleted
            if (multiple && !this.exposed.items.some(a => a.checked)) {
                // No item selected
                return this.$notify({
                    type: 'warning',
                    message: 'Please select at least one item to be deleted'
                });
            }


            // Confirm about this action before doing
            const confirmed = await this.confirm();


            if (!confirmed) {
                // Canceled
                return false;
            }


            if (!multiple) {
                await this.removeOne(item);
            } else {
                await this.removeMultiple();
            }

            // Notify
            this.$notify({
                type: 'success',
                message: 'Deleted'
            });
        },

        async removeOne(item) {
            const {items, total} = this.exposed;

            const option = {
                method: 'DELETE'
            };

            await this.$fetch(`${this.endpoint}/${item.id}`, option).response();

            // Remove item from array
            items.splice(items.indexOf(item), 1);
            this.exposed.total = total - 1;
        },

        async removeMultiple() {
            const toBeRemoved = this.exposed.items.filter(item => item.checked);

            // At least one item should be selected
            if (!toBeRemoved.length) {
                return this.$notify({
                    type: 'warning',
                    message: 'Please select at least one item to be deleted'
                });
            }

            await Promise.all(toBeRemoved.map(item => this.removeOne(item, false, false)));
        },
    }
};
