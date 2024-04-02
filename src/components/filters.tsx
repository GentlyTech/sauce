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

export default function Filters({hotelChains, locations, onSubmit}: { hotelChains: BaseOptionType[], locations: BaseOptionType[], onSubmit?: (searchParams?: RoomQuery) => void}) {
    const handleSearch = (searchParams: RoomQuery) => {
        if (onSubmit != null) onSubmit(searchParams);
    }

    return (
        <Form onFinish={handleSearch}>
            <Space direction={'vertical'}>
                <Form.Item<RoomQuery> name={'location'} initialValue={useSearchParams()!.get('location')}>
                    <AutoComplete
                        options={locations}
                        filterOption={(inputValue, option) => {
                            //check that value isn't null and checks if the input is a substring of option.
                            return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }}
                        style={{width: 200}}
                        placeholder={'Destination'}>
                    </AutoComplete>
                </Form.Item>
                <Form.Item<RoomQuery> name={'chainName'} initialValue={null}>
                    <Select
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Hotel Chain"
                        // onChange={handleChange}
                        options={hotelChains}
                    />
                </Form.Item>
                <Form.Item<RoomQuery> name={"checkInDate"} initialValue={null}>
                    <RangePicker disabledDate={disabledDate}/>
                </Form.Item>
                <Form.Item<RoomQuery> name={'capacity'} initialValue={null}>
                    <InputNumber
                        addonBefore={'Guests'}
                        min={'1'}
                    />
                </Form.Item>
                <Form.Item<RoomQuery> name={'price'} label={'price range'} initialValue={null}>
                    <Slider range
                            min={0}
                            max={1000}
                            defaultValue={[0, 1000]}/>
                </Form.Item>
                <Form.Item<RoomQuery> name={'rating'} initialValue={null}>
                    <Select placeholder={'rating'} options={[{value: "1", label: "1 Star"}, {value: "2", label: "2 Star"}, {value: "3", label: "3 Star"}, {value: "4", label: "4 Star"}, {value: "5", label: "5 Star"}]}/>
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