import messageBox from 'element-ui/lib/message-box';

export default {
    methods: {
        confirm() {
            return new Promise(resolve => {
                messageBox.confirm(`আপনি কি নিশ্চিত এটি ডিলিট করতে চান?`, 'সতর্কীকরণ', {
                    confirmButtonText: 'প্রক্রিয়া সম্পন্ন করুন',
                    cancelButtonText: 'বাতিল করুন',
                    type: 'warning',
                    center: true
                }).then(() => {
                    resolve(true);
                }).catch(() => {
                    resolve(false);
                });
            });
        }
    }
};
