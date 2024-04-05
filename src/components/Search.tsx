'use client';
import {AutoComplete, Button, DatePicker, Form, FormProps, InputNumber, Space} from "antd";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";
import {BaseOptionType} from "rc-select/es/Select";


const {RangePicker} = DatePicker;
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // if date is before yesterday -> grey out
    return current < dayjs().subtract(1, 'day');
};


type SearchQuery = {
    location?: string;
    dates?: any;
    numGuests?: number;
}


export default function Search( { locations } : {locations: BaseOptionType[]} ) {
    const { push } = useRouter();

    const handleSearch = (searchParams: SearchQuery) => {
        const params = new URLSearchParams();

        if (searchParams.location) {
            params.set('location', searchParams.location);
        } else {
            //in case location was already specified delete!
            params.delete('location')
        }

        if (searchParams.dates) {
            params.append('checkInDate', searchParams.dates[0].format('YYYY-MM-DD'))
            params.append('checkOutDate', searchParams.dates[1].format('YYYY-MM-DD'))
        } else {
            params.delete('checkInDate')
            params.delete('checkOutDate')
        }

        if (searchParams.numGuests) {
            params.append('capacity', searchParams.numGuests.toString())
        } else {
            params.delete('capacity')
        }

        push(`${'/hotels'}?${params.toString()}`);
    }


    return (
        <Form onFinish={handleSearch}>
            <Space.Compact block direction={'horizontal'}>
                <Form.Item<SearchQuery> name={'location'}>
                    <AutoComplete
                        options={locations}
                        filterOption={(inputValue, option) => {
                            //check that value isn't null and checks if the input is a substring of option.
                            return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }}
                        style={{width:200}}
                        size={'large'}
                        placeholder={'Search locations!'}>
                    </AutoComplete>
                </Form.Item>
                <Form.Item<SearchQuery> name={'dates'} rules={[{ required: true, message: 'Please input a date range!' }]}>
                    <RangePicker disabledDate={disabledDate} size={'large'}/>
                </Form.Item>
                <Form.Item<SearchQuery> name={'numGuests'} initialValue={1}>
                    <InputNumber
                        addonBefore={'Guests'}
                        size={'large'}
                        min={1}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SearchOutlined/>} size={'large'} htmlType={'submit'}>
                        Search
                    </Button>
                </Form.Item>
            </Space.Compact>
        </Form>
    )
}