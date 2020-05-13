export default {
    data() {
        return {
            editForm: [
                {
                    name: 'roles',
                    label: 'ভূমিকা',
                    type: 'select',
                    source: 'dashboard/roles-all',
                    multiple: true,
                    rules: [
                        {
                            validator: (rule, value, callback) => {
                                if (!value || !value.length) {
                                    return callback('কমপক্ষে একটি ভূমিকা নির্বাচন করুন');
                                }

                                callback();
                            },
                            trigger: 'blur'
                        }
                    ]
                }
            ]
        }
    }
}
