'use client';
import {AutoComplete, Button, DatePicker, Form, FormProps, InputNumber, Select, Slider, Space} from "antd";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";
import {BaseOptionType} from "rc-select/es/Select";
import {Base} from "postcss-selector-parser";


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

export default function Filters({hotelChains, locations}: { hotelChains: BaseOptionType[], locations: BaseOptionType[]}) {
    const {replace} = useRouter();
    const [location, setLocation] = useState(useSearchParams()!.get('location'))

    const handleSearch = (searchParams: SearchQuery) => {
        const params = new URLSearchParams();

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


    return (
        <Form onFinish={handleSearch}>
            <Space direction={'vertical'}>
                <Form.Item<SearchQuery> name={'location'} initialValue={useSearchParams()!.get('location')}>
                    <AutoComplete
                        options={locations}
                        filterOption={(inputValue, option) => {
                            //check that value isn't null and checks if the input is a substring of option.
                            return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }}
                        style={{width: 200}}
                        placeholder={'Search locations!'}>
                    </AutoComplete>
                </Form.Item>
                <Form.Item<SearchQuery> name={'dates'}
                                        initialValue={[dayjs(useSearchParams()!.get('check-in')), dayjs(useSearchParams()!.get('check-out'))]}>
                    <RangePicker disabledDate={disabledDate}/>
                </Form.Item>
                <Form.Item<SearchQuery> name={'numGuests'} initialValue={useSearchParams()!.get('guests')}>
                    <InputNumber
                        addonBefore={'Guests'}
                        min={'1'}
                    />
                </Form.Item>
                <Form.Item>
                    <Select
                        mode="multiple"
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Please select"
                        defaultValue={['renting', 'booking']}
                        // onChange={handleChange}
                        // options={options}
                    />
                </Form.Item>
                <Form.Item label={'price range'}>
                    <Slider range
                            min={0}
                            max={1000}
                            defaultValue={[0, 1000]}/>
                </Form.Item>
                <Form.Item>
                    <Select
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Select hotel chain"
                        // onChange={handleChange}
                        options={hotelChains}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SearchOutlined/>} htmlType={'submit'}>
                        Search
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    )
}