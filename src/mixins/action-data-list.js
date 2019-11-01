import messageBox from 'element-ui/lib/message-box';

export default {
    methods: {
        decorate(item) {
            item.checked = false;

            return item;
        },

        check(item) {
            item.checked = !item.checked;
        },

        confirmed() {
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

        success() {
            this.$notify({
                type: 'success',
                message: 'Deleted'
            });
        },

        async removeOne(item, notify = true, confirmation = true) {
            if (confirmation && !(await this.confirmed())) {
                return false;
            }

            const option = {
                method: 'DELETE'
            };

            await this.$fetch(`${this.endpoint}/${item.id}`, option).response();

            // Remove item from array
            this.items.splice(this.items.indexOf(item), 1);
            this.total = this.total - 1;

            if (notify) {
                this.success();
            }
        },

        async removeMultiple() {
            const toBeRemoved = this.items.filter(item => item.checked);

            // At least one item should be selected
            if (!toBeRemoved.length) {
                return this.$notify({
                    type: 'warning',
                    message: 'Please select at least one item to be deleted'
                });
            }

            if (!(await this.confirmed())) {
                return false;
            }

            await Promise.all(toBeRemoved.map(item => this.removeOne(item, false, false)));

            this.success();
        },
    }
};
