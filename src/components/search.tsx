'use client';
import {AutoComplete, Button, DatePicker, Form, FormProps, InputNumber, Space} from "antd";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {SearchOutlined} from "@ant-design/icons";


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

const onFinish: FormProps<SearchQuery>["onFinish"] = (values) => {
    console.log(values)
}

export default function Search() {
    const locations = [
        {value: 'toronto'},
        {value: 'vancouver'},
        {value: 'ottawa'},
        {value: 'new york'}];


    return (
        <Form onFinish={onFinish}>
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
                <Form.Item<SearchQuery> name={'dates'}>
                    <RangePicker disabledDate={disabledDate} size={'large'}/>
                </Form.Item>
                <Form.Item<SearchQuery> name={'numGuests'}>
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