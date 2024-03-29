'use client';
import {AutoComplete, Button, DatePicker, Form, FormProps, InputNumber, Space} from "antd";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter} from "next/navigation";


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


export default function Search(terms: SearchQuery) {
   // const searchParams = useSearchParams();
   // const pathname = usePathname();
    const { replace } = useRouter();


    const handleSearch = (searchParams: SearchQuery) => {
        const params = new URLSearchParams();
        const location = searchParams.location

        if (searchParams.location) {
            params.set('location', searchParams.location);
        } else {
            //in case location was already specified delete!
            params.delete('location')
        }

        if (searchParams.dates) {
            params.append('check-in', searchParams.dates[0].format('YYYY-MM-DD'))
            params.append('check-out', searchParams.dates[1].format('YYYY-MM-DD'))
        } else {
            params.delete('check-in')
            params.delete('check-out')
        }

        if (searchParams.numGuests) {
            params.append('guests', searchParams.numGuests.toString())
        } else {
            params.delete('guests')
        }

        replace(`${'/hotels'}?${params.toString()}`);
    }

    const locations = [
        {value: 'toronto'},
        {value: 'vancouver'},
        {value: 'ottawa'},
        {value: 'new york'}];


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