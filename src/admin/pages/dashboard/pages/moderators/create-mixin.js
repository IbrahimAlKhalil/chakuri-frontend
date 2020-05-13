export default {
    data() {

        const trigger = 'blur';
        const required = this.$store.state.requiredRule;


        return {
            createForm: [
                {
                    name: 'name',
                    label: 'নাম',
                    type: 'text',
                    rules: [required]
                },

                {
                    name: 'mobile',
                    label: 'মোবাইল নম্বর',
                    type: 'text',
                    rules: [
                        // TODO: Reuse validators, DRY
                        required,
                        {
                            validator: (rule, value, callback) => {
                                value = value.toString();

                                const length = value.length;

                                if (/^\+880/.test(value) && length === 14) {
                                    return callback();
                                } else if (length === 11) {
                                    return callback();
                                }


                                callback('দুঃখিত, মোবাইল নম্বর কমপক্ষে ১১ টি অক্ষরের  হতে হবে');
                            }
                        },
                        {
                            validator: async (rule, mobile, callback) => {
                                const response = await this.$fetch('mobile-exists', {
                                    method: 'POST',
                                    body: {
                                        user_type_id: 3,
                                        mobile
                                    }
                                }).response();

                                if (!!response.json()) {
                                    return callback('দুঃখিত, এই নম্বরটি ইতিমধ্যে ব্যবহৃত');
                                }

                                callback();
                            }, trigger: 'blur'
                        }
                    ]
                },

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
                            trigger
                        }
                    ]
                },

                {
                    name: 'password',
                    label: 'পাসওয়ার্ড',
                    type: 'password',
                    rules: [
                        required,
                        {
                            min: 8,
                            message: `দুঃখিত, পাসওয়ার্ড কমপক্ষে ৮ টি অক্ষরের  হতে হবে`,
                            trigger
                        }
                    ]
                },

                {
                    name: 'rePassword',
                    label: 'পাসওয়ার্ড নিশ্চিত করুন',
                    type: 'password',
                    rules: [
                        {required: true, message: 'পাসওয়ার্ডটি আবার দিন'},
                        {
                            validator: (rule, value, callback) => {
                                if (document.getElementById('create-password').value === value) {
                                    return callback();
                                }

                                callback('দুঃখিত, পাসওয়ার্ডটি মিলছে না');
                            },
                            trigger
                        }
                    ]
                }
            ]
        };
    },
}
