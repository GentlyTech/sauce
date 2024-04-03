'use client';
import {AutoComplete, Button, DatePicker, Form, FormProps, InputNumber, Select, Slider, Space} from "antd";
import dayjs from "dayjs";
import {RangePickerProps} from "antd/es/date-picker";
import {SearchOutlined} from "@ant-design/icons";
import {useRouter, useSearchParams} from "next/navigation";
import {BaseOptionType} from "rc-select/es/Select";


const {RangePicker} = DatePicker;
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // if date is before yesterday -> grey out
    return current < dayjs().subtract(1, 'day');
};

type FormResults = {
    location?: string;
    chainName?: string;
    dates?: any
    priceRange?: number[];
    rating?: number;
    capacity?: number;
}

export default function Filters(
    {hotelChains, locations}: {
        hotelChains: BaseOptionType[],
        locations: BaseOptionType[],
    }) {

    const {replace} = useRouter();

    const handleSearch = (search: FormResults) => {


        const searchParams = new URLSearchParams();

        if (search.location) {
            searchParams.set('location', search.location);
        } else {
            searchParams.delete('location')
        }

        if (search.chainName) {
            searchParams.set('chainName', search.chainName)
            // searchQuery.chainName = search.chainName
        } else {
            searchParams.delete('chainName')
        }

        if (search.dates) {
            searchParams.append('checkInDate', search.dates[0].format('YYYY-MM-DD'))
            searchParams.append('checkOutDate', search.dates[1].format('YYYY-MM-DD'))
            //
            // searchQuery.checkInDate = search.dates[0].format('YYYY-MM-DD')
            // searchQuery.checkOutDate = search.dates[0].format('YYYY-MM-DD')

        } else {
            searchParams.delete('checkInDate')
            searchParams.delete('checkOutDate')
        }

        if (search.priceRange) {
            searchParams.append('minPrice', search.priceRange[0].toString())
            searchParams.append('maxPrice', search.priceRange[1].toString())

            // searchQuery.priceRange = search.priceRange
        } else {
            searchParams.delete('minPrice')
            searchParams.delete('maxPrice')
        }

        if (search.rating) {
            searchParams.append('rating', search.rating.toString())
            // searchQuery.rating = search.rating
        } else {
            searchParams.delete('rating')
        }

        if (search.capacity) {
            searchParams.append('capacity', search.capacity.toString())
            // searchQuery.capacity = search.capacity
        } else {
            searchParams.delete('capacity')
        }

        replace(`${'/hotels'}?${searchParams}`)
    }

    return (
        <Form onFinish={handleSearch}>
            <Space direction={'vertical'}>
                <Form.Item<FormResults> name={'location'} initialValue={useSearchParams()?.get('location')}>
                    <AutoComplete
                        options={locations}
                        filterOption={(inputValue, option) => {
                            //check that value isn't null and checks if the input is a substring of option.
                            return option?.value?.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }}
                        style={{width: 200}}
                        placeholder={'Destination'}>
                    </AutoComplete>
                </Form.Item>
                <Form.Item<FormResults> name={'chainName'}>
                    <Select
                        allowClear
                        style={{width: '100%'}}
                        placeholder="Hotel Chain"
                        // onChange={handleChange}
                        options={ hotelChains}
                    />
                </Form.Item>
                <Form.Item<FormResults> name={"dates"} initialValue={null}>
                    <RangePicker disabledDate={disabledDate}/>
                </Form.Item>
                <Form.Item<FormResults> name={'capacity'} initialValue={null}>
                    <InputNumber
                        addonBefore={'Guests'}
                        min={'1'}
                    />
                </Form.Item>
                <Form.Item<FormResults> name={'priceRange'} label={'price range'} initialValue={[0, 1000]}>
                    <Slider range
                            min={0}
                            max={1000}
                    />
                </Form.Item>
                <Form.Item<FormResults> name={'rating'} initialValue={null}>
                    <Select placeholder={'rating'} options={[{value: 1, label: "1 Star"}, {value: 2, label: "2 Star"}, {
                        value: 3,
                        label: "3 Star"
                    }, {value: 4, label: "4 Star"}, {value: 5, label: "5 Star"}]}/>
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