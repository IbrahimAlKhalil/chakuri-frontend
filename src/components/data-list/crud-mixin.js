import messageBox from 'element-ui/lib/message-box';

export default {
    props: {
        beforeCreate: Function,
        beforeCheck: Function,

        createForm: Array,
        editForm: Array
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
                messageBox.confirm(`আপনি কি সত্যি এটা করতে চান? এই প্রক্রিয়ায় আপনার <strong>নির্বাচিত আইটেমগুলির কিছু ডিলিট হয়ে যেতে পারে।</strong>`, 'সতর্কীকরণ', {
                    confirmButtonText: 'প্রক্রিয়া সম্পন্ন করুন',
                    cancelButtonText: 'বাতিল করুন',
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
            this.editItem = item;
            this.editDialog = true;
        },

        async create() {
            let shouldCreate = await this.callLifeCycle('beforeCreate');

            if (!shouldCreate) {
                return;
            }

            this.createDialog = true;
        },

        addItem(item, unshift) {
            const {items} = this.exposed;

            const add = unshift ? items.unshift : items.push;

            if (this.$props.decorator) {
                add.call(items, this.$props.decorator(item));
            } else {
                add.call(items, item);
            }

            this.exposed.total = this.exposed.total + 1;
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
                    message: 'ডিলিট করার জন্য কমপক্ষে একটি আইটেম নির্বাচন করুন'
                });
            }


            // Confirm about this action before doing
            const confirmed = await this.confirm();


            if (!confirmed) {
                // Canceled
                return false;
            }

            let success;

            if (!multiple) {
                success = await this.removeOne(item);
            } else {
                await this.removeMultiple();
            }

            if (success && !multiple) {
                return this.$notify({
                    type: 'success',
                    message: 'ডিলিট করা হয়েছে'
                });
            } else if (!multiple) {
                // Notify
                this.$notify({
                    type: 'error',
                    message: 'দুঃখিত, এই আইটেমটি ডিলিট করা যায়নি, সম্ভবত কিছু ডেটা / প্রোগ্রাম এই আইটেমের উপর নির্ভরশীল',
                    duration: 8000
                });
            }
        },

        async removeOne(item) {
            const {items} = this.exposed;

            const option = {
                method: 'DELETE'
            };

            const response = await this.$fetch(`${this.endpoint}/${item.id}`, option).response();

            const success = response.status === 200 || response.status === 204;

            if (success) {
                // Remove item from array
                items.splice(items.indexOf(item), 1);
                this.exposed.total = this.exposed.total - 1;

                const methods = {
                    reset: this.reset
                };

                this.$emit('deleted', {
                    data: this.exposed,
                    methods
                })
            }

            return success;
        },

        async removeMultiple() {
            const toBeRemoved = this.exposed.items.filter(item => item.checked);

            // At least one item should be selected
            if (!toBeRemoved.length) {
                return this.$notify({
                    type: 'warning',
                    message: 'ডিলিট করার জন্য কমপক্ষে একটি আইটেম নির্বাচন করুন'
                });
            }

            const result = await Promise.all(toBeRemoved.map(item => this.removeOne(item)));

            const successCount = result.filter(item => !!item).length;
            const failedCount = result.filter(item => !item).length;

            if (successCount) {
                // Notify
                return this.$notify({
                    type: 'success',
                    message: 'ডিলিট করা হয়েছে'
                });
            }

            if (failedCount === toBeRemoved.length) {
                // Notify
                return this.$notify({
                    type: 'error',
                    message: 'দুঃখিত, এই আইটেমগুলি ডিলিট করা যায়নি, সম্ভবত কিছু ডেটা / প্রোগ্রাম এই আইটেমগুলির উপর নির্ভরশীল',
                    duration: 8000
                });
            }

            if (successCount && failedCount) {
                // Notify
                this.$notify({
                    type: 'error',
                    message: 'দুঃখিত, কিছু আইটেম ডিলিট করা যায়নি, সম্ভবত কিছু ডেটা / প্রোগ্রাম এই আইটেমগুলির উপর নির্ভরশীল',
                    duration: 8000
                });
            }
        },

        async updated(value) {
            this.editDialog = false;

            // Notify
            this.$notify({
                type: 'success',
                message: 'আপডেট করা হয়েছে'
            });

            this.$emit('updated', {
                value,
                methods: {
                    reset: this.reset
                }
            });
        },

        created(item) {
            this.createDialog = false;

            this.addItem(item);

            // Notify
            this.$notify({
                type: 'success',
                message: 'তৈরী করা হয়েছে'
            });

            this.$emit('created', item);
        }
    }
};
